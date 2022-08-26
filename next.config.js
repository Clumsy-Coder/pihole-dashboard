/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,           // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  generateBuildId: async () => {    // https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
    return process.env.NEXT_PUBLIC_BUILD_ID || "development"
  },
  // for running in docker. 
  // https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  output: 'standalone', 
  // loading svg
  // obtained from https://github.com/vercel/next.js/blob/canary/examples/svg-components/next.config.js
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
