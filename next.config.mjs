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
  async redirects() {
    return [
      // The About page was renamed Studio and moved to /studio; old
      // links (bookmarks, shared URLs) land on the new address.
      { source: "/about", destination: "/studio", permanent: true },
    ];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Next.js hydration/runtime relies on inline scripts; no external
      // script hosts are allowed.
      "script-src 'self' 'unsafe-inline'",
      // A handful of components use inline style attributes (gradient
      // overlays, animation delays), so style-src needs 'unsafe-inline'
      // too. No external stylesheets are loaded (fonts are self-hosted
      // via next/font, not fetched from Google at runtime).
      "style-src 'self' 'unsafe-inline'",
      // data: for the nav pill's glass edge, whose displacement map is
      // drawn in the browser and handed to an SVG filter as an inline PNG
      // (Nav.tsx, glassMap). Images can't run code, so this is low risk.
      "img-src 'self' data:",
      "font-src 'self'",
      // The contact form posts to Formspree.
      "connect-src 'self' https://formspree.io",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
