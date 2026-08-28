/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder case-study imagery is SVG (generated locally, no
    // untrusted input) until real photography replaces it — Next.js
    // blocks SVG through the image optimizer by default, so it's
    // explicitly allowed here with a strict CSP on the optimizer output.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
