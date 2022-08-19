This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `src/pages/api/hello.ts`.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## NPM scripts

- utils

  - `repoStatus`: return string `clean` or `dirty`
    - if repo has uncommited changes it will return `dirty`
    - if repo has **NO** uncomitted changes, it will return `clean`
  - `repoLatestTag`: get the latest git tag or use `version` from `package.json`
  - `generateVersion`: generate tag with following structure
    - <`repoLatestTag`>-dev-<`repoStatus`>
      - Ex: 0.1.0-dev-clean
      - Ex: 0.1.0-dev-dirty
  - `generateBuildId`: get the latest commit sha ID or `development`
    - Ex: 1683a9b
    - Ex: development
  - `generateEnv`: use npm script `generateVersion` and `generateBuildId` and create a `.env.local` file

    - contains the following

      - ```env
        NEXT_PUBLIC_BUILD_VERSION=0.1.0-dev-dirty
        NEXT_PUBLIC_BUILD_ID=1683a9b
        ```

  - `docker:imagename`: the name of docker image. This will run when making docker image
  - `docker:tagname`: the tagname of the docker image. This will run when making docker image

- nextjs
  - `dev`: run script `generateEnv` and start development NextJS server
  - `build`: build NextJS project
  - `start`: start NextJS project using the files generated from script `build`
- lint
  - `lint:eslint`: Run eslint to lint code
  - `lint:tsc`: Run Typescript to lint code
  - `lint`: Run script `lint:eslint` and `lint:tsc`
- docker
  - `docker:build`: builds docker image
    - image name: runs npm script `docker:imagename`
    - image tagname: runs npm script `docker:tagname`
  - `docker:run`: runs the docker image
    - image name: runs npm script `docker:imagename`
    - image tagname: runs npm script `docker:tagname`
  - `docker:stop`: stops docker container
    - container name: runs npm script `docker:imagename`
  - `docker:logs`
    - container name: runs npm script `docker:imagename`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
