// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Not necessary but can help clarify to Vercel
  // basePath: '', // Only if you've changed base path
};

module.exports = nextConfig;
