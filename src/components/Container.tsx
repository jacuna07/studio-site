/**
 * The page grid. Mobile: 24px side margins (unchanged). Side margins 48px
 * on tablets (md) and 64px from lg up (raised from 32px on 2026-10-05:
 * too tight on a MacBook Pro), and the content grows with the screen up
 * to 1920px wide
 * (max-w-content, see tailwind.config.ts), then centers.
 *
 * Note: passing another max-w-* in `className` does NOT narrow it
 * (max-w-content is generated later in the CSS and wins). To cap a
 * section, wrap its contents in a div with its own max-w-* instead.
 */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
