/** @type {import('next').NextConfig} */
const nextConfig = {
  // The animation components (framer-motion + react-intersection-observer) do not
  // start under React Strict Mode's dev-only double mounting. Next 13.2 had strict
  // mode off for the app router; Next 13.5+ turns it on, so keep it off here.
  // Production builds are unaffected either way.
  reactStrictMode: false,

  // Security headers on every response. The Content-Security-Policy only sets the
  // directives that need no script allow-list (a full script policy would have to
  // allow Google Analytics, the inline JSON-LD and Next's own inline scripts).
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
