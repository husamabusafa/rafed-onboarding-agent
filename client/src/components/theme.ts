/**
 * Centralized Theme Configuration
 * 
 * This file contains all color palettes, styling constants, and theme-related
 * values used across components. Update this file to change the theme globally.
 * 
 * Theme Colors: Dark and White
 */

// Dark and white color palette
export const brandColors = {
  // Main colors
  primary: '#000000',      // Black
  primaryDark: '#1a1a1a',  // Dark Gray
  
  // Secondary palette
  lightGray: '#e5e5e5',    // Light Gray
  teal: '#666666',         // Medium Gray
  skyBlue: '#cccccc',      // Light Gray
  green: '#4a4a4a',        // Dark Gray
  gold: '#999999',         // Medium Gray
  
  // Neutral colors for text and backgrounds
  white: '#FFFFFF',
  lightBg: '#F8FAFC',      // Light background
  darkBg: '#000000',       // Dark background
  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#000000',
  }
}

// Derived color variations for different states
export const colors = {
  // Primary colors with light/dark variants
  primary: {
    light: 'bg-black/10 text-black',
    base: 'bg-black text-white',
    dark: 'bg-black/80 text-white',
  },
  navy: {
    light: 'bg-gray-800/10 text-gray-800',
    base: 'bg-gray-800 text-white',
    dark: 'bg-gray-900 text-white',
  },
  // Secondary colors
  teal: {
    light: 'bg-gray-600/10 text-gray-600',
    base: 'bg-gray-600 text-white',
    dark: 'bg-gray-700 text-white',
  },
  skyBlue: {
    light: 'bg-gray-300/10 text-gray-700',
    base: 'bg-gray-300 text-gray-900',
    dark: 'bg-gray-400 text-gray-900',
  },
  green: {
    light: 'bg-gray-700/10 text-gray-700',
    base: 'bg-gray-700 text-white',
    dark: 'bg-gray-800 text-white',
  },
  gold: {
    light: 'bg-gray-500/10 text-gray-700',
    base: 'bg-gray-500 text-white',
    dark: 'bg-gray-600 text-white',
  },
}

// Component-specific theme classes using dark and white colors
export const theme = {
  // Card/Container styling
  card: {
    base: 'bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6',
    compact: 'bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4',
  },
  
  // Header sections
  header: {
    icon: 'p-3 rounded-2xl',
    title: 'text-2xl font-bold text-black dark:text-white',
    subtitle: 'text-sm text-gray-600 dark:text-gray-400',
  },
  
  // Gradient backgrounds
  gradient: {
    primary: 'bg-gradient-to-r from-black/10 to-gray-800/10 dark:from-black/20 dark:to-gray-900/40',
    coral: 'bg-gradient-to-r from-gray-700/10 to-gray-500/10 dark:from-gray-700/20 dark:to-gray-600/30',
    ocean: 'bg-gradient-to-r from-gray-600/10 to-gray-400/10 dark:from-gray-600/20 dark:to-gray-500/20',
    success: 'bg-gradient-to-r from-gray-700/10 to-gray-600/10 dark:from-gray-700/20 dark:to-gray-600/20',
  },
  
  // Item cards
  item: {
    base: 'p-4 bg-gray-100/20 dark:bg-gray-900/40 rounded-3xl hover:bg-white dark:hover:bg-gray-900/60 hover:shadow-xl transition-all border border-gray-200/50 dark:border-gray-700/20 dark:hover:border-gray-600/40 group',
    compact: 'p-3 bg-white dark:bg-gray-900/50 rounded-2xl hover:shadow-lg dark:hover:bg-gray-900/70 transition-all border border-gray-200 dark:border-gray-700/30 group',
  },
  
  // Section backgrounds
  section: {
    light: 'bg-gray-100/20 dark:bg-gray-900/30',
    base: 'p-4 bg-gray-100/20 dark:bg-gray-900/30',
  },
  
  // Badge/Tag styling
  badge: {
    base: 'text-xs px-2 py-1 rounded-full border',
    primary: 'bg-black/10 dark:bg-black/20 text-black dark:text-white border-black/30 dark:border-white/40',
    navy: 'bg-gray-800/10 dark:bg-gray-800/30 text-gray-800 dark:text-gray-300 border-gray-800/30 dark:border-gray-400/40',
    teal: 'bg-gray-600/10 dark:bg-gray-600/20 text-gray-600 dark:text-gray-400 border-gray-600/30 dark:border-gray-400/40',
    green: 'bg-gray-700/10 dark:bg-gray-700/20 text-gray-700 dark:text-gray-400 border-gray-700/30 dark:border-gray-400/40',
    gold: 'bg-gray-500/10 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30 dark:border-gray-400/40',
  },
  
  // Text colors
  text: {
    primary: 'text-black dark:text-white',
    secondary: 'text-black/80 dark:text-gray-300',
    muted: 'text-gray-600 dark:text-gray-400',
    subtle: 'text-gray-600/70 dark:text-gray-400/70',
  },
  
  // Icon colors by category
  icon: {
    primary: 'text-black dark:text-white',
    secondary: 'text-gray-800 dark:text-gray-300',
    teal: 'text-gray-600 dark:text-gray-400',
    green: 'text-gray-700 dark:text-gray-400',
    gold: 'text-gray-500 dark:text-gray-400',
    muted: 'text-gray-600/60 dark:text-gray-400/60',
  },
  
  // Table styling
  table: {
    container: 'overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700/30',
    header: 'border-b border-gray-200 dark:border-gray-700/30 bg-gray-100/30 dark:bg-gray-900/50',
    headerCell: 'text-left py-3 px-4 text-xs font-semibold text-black dark:text-gray-300',
    body: 'bg-white dark:bg-gray-900/80',
    row: 'border-b border-gray-200/50 dark:border-gray-700/20 last:border-0 hover:bg-gray-100/20 dark:hover:bg-gray-900/60 transition-colors',
    cell: 'py-3 px-4 text-sm',
  },
  
  // Info boxes
  infoBox: {
    base: 'p-3 rounded-2xl border',
    primary: 'bg-black/10 dark:bg-black/20 border-black/30 dark:border-white/40',
    success: 'bg-gray-700/10 dark:bg-gray-700/20 border-gray-700/30 dark:border-gray-400/40',
    info: 'bg-gray-400/10 dark:bg-gray-400/20 border-gray-400/30 dark:border-gray-400/40',
    warning: 'bg-gray-500/10 dark:bg-gray-500/20 border-gray-500/30 dark:border-gray-400/40',
  },
}

// Status color mappings using dark and white colors
export const statusColors = {
  // Attendance status
  attendance: {
    present: 'bg-gray-700/10 text-gray-700 dark:bg-gray-400/20 dark:text-gray-300',
    absent: 'bg-black/10 text-black dark:bg-gray-900/20 dark:text-white',
    late: 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    on_leave: 'bg-gray-400/10 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400',
    remote: 'bg-gray-600/10 text-gray-600 dark:bg-gray-600/20 dark:text-gray-400',
    PRESENT: 'bg-gray-700/10 text-gray-700 dark:bg-gray-400/20 dark:text-gray-300',
    ABSENT: 'bg-black/10 text-black dark:bg-gray-900/20 dark:text-white',
    LATE: 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    ON_LEAVE: 'bg-gray-400/10 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400',
    REMOTE: 'bg-gray-600/10 text-gray-600 dark:bg-gray-600/20 dark:text-gray-400',
  },
  
  // Caffeine levels
  caffeine: {
    None: 'bg-gray-200 text-black dark:bg-gray-900/50 dark:text-gray-300',
    Low: 'bg-gray-700/10 text-gray-700 dark:bg-gray-700/20 dark:text-gray-400',
    Medium: 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400',
    High: 'bg-black/10 text-black dark:bg-black/20 dark:text-white',
  },
}

// Component-specific icon background colors
export const iconBackgrounds = {
  primary: 'bg-black/10 dark:bg-black/20',
  navy: 'bg-gray-800/10 dark:bg-gray-800/30',
  teal: 'bg-gray-600/10 dark:bg-gray-600/20',
  green: 'bg-gray-700/10 dark:bg-gray-700/20',
  gold: 'bg-gray-500/10 dark:bg-gray-500/20',
  skyBlue: 'bg-gray-400/10 dark:bg-gray-400/20',
}

// Border styles
export const borders = {
  light: 'border-gray-200/50 dark:border-gray-700/20',
  base: 'border-gray-200 dark:border-gray-700/30',
  subtle: 'border-gray-200 dark:border-gray-900/50',
  primary: 'border-black/30 dark:border-white/40',
  teal: 'border-gray-600/30 dark:border-gray-600/40',
  green: 'border-gray-700/30 dark:border-gray-700/40',
}
