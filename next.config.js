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
}

module.exports = nextConfig
