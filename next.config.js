/** @type {import('next').NextConfig} */
const nextConfig = {
  // The animation components (framer-motion + react-intersection-observer) do not
  // start under React Strict Mode's dev-only double mounting. Next 13.2 had strict
  // mode off for the app router; Next 13.5+ turns it on, so keep it off here.
  // Production builds are unaffected either way.
  reactStrictMode: false,
};

module.exports = nextConfig;
