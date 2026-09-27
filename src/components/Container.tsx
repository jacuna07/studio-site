/**
 * The page grid. Mobile: 24px side margins (unchanged). From md up: 32px
 * side margins, and the content grows with the screen up to 1920px wide
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
    <div className={`mx-auto w-full max-w-content px-6 md:px-8 ${className}`}>
      {children}
    </div>
  );
}
