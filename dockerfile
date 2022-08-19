# obtained from
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# https://dev.to/maxdemaio/nextjs-and-docker-2496
#
# docker best practice
# https://snyk.io/blog/10-docker-image-security-best-practices/

# Building image
# docker build -t uhunt:dev -f ./dockerfile .

# tldr
# - Stage: builder
#   - copy package.json and package-lock.json to docker image
#   - install npm packages using package.json and package-lock.json
#   - copy source files to docker image
#   - build source files using NextJS
# - Stage: runner
#   - apply docker image label for Github container registry
#   - Set ENV to production
#   - Copy build files from Stage:builder
#   - Switch to the newly created user
#   - Expose port (default to 3000)
#   - Run production server

####################################################################################################

# Base on offical Node.js Alpine image
FROM node:alpine as builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
# check npm help ci
RUN npm clean-install

COPY ./ ./

# Build app
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

####################################################################################################

FROM node:alpine as runner

# label used to connect the docker image to the github repo
# check https://docs.github.com/en/free-pro-team@latest/packages/guides/connecting-a-repository-to-a-container-image#connecting-a-repository-to-a-container-image-on-the-command-line
# LABEL org.opencontainers.image.source https://github.com/username/repo

WORKDIR /usr/app

ENV NODE_ENV production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=node:node /usr/app/public           ./public
COPY --from=builder --chown=node:node /usr/app/package.json     ./package.json
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /usr/app/.next/standalone ./
COPY --from=builder --chown=node:node /usr/app/.next/static     ./.next/static

USER node

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
