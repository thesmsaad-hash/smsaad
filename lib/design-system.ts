/**
 * SMSAAD UI Foundation v1.0 - Design Tokens Definition
 * Standardized Design Tokens for colors, radius, grid spacing, blur, and animation.
 */

export const tokens = {
  colors: {
    background: "#09090B",
    surface: "#111827",
    border: "#27272A",
    primary: "#7C3AED",
    accent: "#22D3EE",
    text: "#FFFFFF",
    muted: "#A1A1AA",
  },
  radius: {
    sm: "0.25rem",  // 4px
    md: "0.5rem",   // 8px
    lg: "0.75rem",  // 12px
    xl: "1rem",     // 16px
    "2xl": "1.25rem", // 20px (Design System specification)
  },
  spacing: {
    grid: "8px",
  },
  animation: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
  },
  blur: {
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
  shadow: {
    glowPurple: "0 0 50px -10px rgba(124, 58, 237, 0.25)",
    glowCyan: "0 0 50px -10px rgba(34, 211, 238, 0.2)",
    soft: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
  },
} as const;

export type DesignTokens = typeof tokens;
