/**
 * Color palette for the Todos Mobile app
 * Based on a dark theme with customizable primary color
 */

export const colors = {
  // Primary brand color
  primary: {
    DEFAULT: '#3b82f6', // Blue
    foreground: '#ffffff',
    muted: '#60a5fa',
  },

  // Background colors
  background: {
    DEFAULT: '#121212',
    card: '#1a1a1a',
    cardHover: '#1f1f1f',
    elevated: '#242424',
  },

  // Text colors
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    muted: '#71717a',
    inverse: '#18181b',
  },

  // Semantic colors
  success: {
    DEFAULT: '#22c55e',
    foreground: '#ffffff',
  },
  warning: {
    DEFAULT: '#f59e0b',
    foreground: '#ffffff',
  },
  destructive: {
    DEFAULT: '#ef4444',
    foreground: '#ffffff',
  },

  // Border colors
  border: {
    DEFAULT: '#27272a',
    muted: '#3f3f46',
  },
} as const;

// Shadow styles for iOS
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
} as const;

// Elevation for Android
export const elevation = {
  sm: 2,
  md: 4,
  lg: 8,
} as const;
