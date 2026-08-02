import * as React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "h-9 w-9", size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="smsaad-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>

      {/* Rounded Purple Container Box */}
      <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#smsaad-logo-grad)" />

      {/* Perfectly Centered White 'D' Bookmark Icon */}
      {/* Horizontally centered from X=28 to X=72 (Center X=50), Vertically centered from Y=24.5 to Y=75.5 (Center Y=50) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35 25 C31 25 28 28 28 32 V68 C28 72 31 75 35 75 H50 C63 75 72 65 72 50 C72 35 63 25 50 25 H35 Z M42 25 V43 L37.5 39 L33 43 V25 H42 Z"
        fill="#FFFFFF"
      />

      {/* Top-Right 4-Pointed Sparkle Star */}
      <path
        d="M82 14 C82 17.5 79.5 20 76 20 C79.5 20 82 22.5 82 26 C82 22.5 84.5 20 88 20 C84.5 20 82 17.5 82 14 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default Logo;
