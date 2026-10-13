/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://i.scdn.co/**")],
  },
};

module.exports = nextConfig;
