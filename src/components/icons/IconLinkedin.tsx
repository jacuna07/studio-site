export default function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" strokeLinecap="round" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4" strokeLinecap="round" />
      <line x1="11.5" y1="10.5" x2="11.5" y2="16.5" strokeLinecap="round" />
    </svg>
  );
}
