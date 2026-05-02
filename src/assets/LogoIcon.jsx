const LogoIcon = ({ width = 40, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#16a34a", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#84cc16", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Outer Circle */}
    <circle cx="32" cy="32" r="30" fill="url(#grad1)" opacity="0.1" />

    {/* Lightning Bolt - Left Strike */}
    <path
      d="M32 4 L42 24 L28 24 L42 56 L18 32 L28 32 Z"
      fill="url(#grad1)"
      stroke="url(#grad2)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />

    {/* Accent Circle Elements */}
    <circle cx="32" cy="32" r="28" fill="none" stroke="url(#grad2)" strokeWidth="1" opacity="0.4" />

    {/* Small accent dots */}
    <circle cx="48" cy="20" r="2" fill="url(#grad2)" opacity="0.6" />
    <circle cx="16" cy="45" r="2" fill="url(#grad1)" opacity="0.6" />
  </svg>
);

export default LogoIcon;
