/**
 * RTL Utilities for Arabic Web Applications
 * Comprehensive helper functions for RTL layout and styling
 */

export type Direction = 'ltr' | 'rtl';
export type Language = 'en' | 'fr' | 'ar';

/**
 * Get RTL-aware CSS classes based on direction
 */
export const getRTLClasses = (dir: Direction) => ({
  textAlign: dir === 'rtl' ? 'text-right' : 'text-left',
  textAlignReverse: dir === 'rtl' ? 'text-left' : 'text-right',
  flexDirection: dir === 'rtl' ? 'flex-row-reverse' : 'flex-row',
  spaceReverse: dir === 'rtl' ? 'space-x-reverse' : '',
  marginStart: dir === 'rtl' ? 'mr-4' : 'ml-4',
  marginEnd: dir === 'rtl' ? 'ml-4' : 'mr-4',
  paddingStart: dir === 'rtl' ? 'pr-4' : 'pl-4',
  paddingEnd: dir === 'rtl' ? 'pl-4' : 'pr-4',
  borderStart: dir === 'rtl' ? 'border-r' : 'border-l',
  borderEnd: dir === 'rtl' ? 'border-l' : 'border-r',
  roundedStart: dir === 'rtl' ? 'rounded-r' : 'rounded-l',
  roundedEnd: dir === 'rtl' ? 'rounded-l' : 'rounded-r',
  floatStart: dir === 'rtl' ? 'float-right' : 'float-left',
  floatEnd: dir === 'rtl' ? 'float-left' : 'float-right',
});

/**
 * Get spacing classes for RTL layouts
 */
export const getRTLSpacing = (dir: Direction, size: string = '4') => ({
  marginX: dir === 'rtl' ? `mr-${size}` : `ml-${size}`,
  paddingX: dir === 'rtl' ? `pr-${size}` : `pl-${size}`,
  spaceX: dir === 'rtl' ? `space-x-${size} space-x-reverse` : `space-x-${size}`,
});

/**
 * Detect if text contains Arabic characters
 */
export const hasArabicText = (text: string): boolean => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
};

/**
 * Detect if text contains Latin characters
 */
export const hasLatinText = (text: string): boolean => {
  return /[a-zA-Z]/.test(text);
};

/**
 * Detect mixed content (both Arabic and Latin)
 */
export const isMixedContent = (text: string): boolean => {
  return hasArabicText(text) && hasLatinText(text);
};

/**
 * Get appropriate direction for content
 */
export const getContentDirection = (text: string, defaultDir: Direction = 'ltr'): Direction => {
  if (isMixedContent(text)) {
    return 'auto' as Direction;
  }
  if (hasArabicText(text)) {
    return 'rtl';
  }
  return defaultDir;
};

/**
 * Format numbers for RTL locales
 */
export const formatNumber = (
  number: number,
  language: Language,
  options?: Intl.NumberFormatOptions
): string => {
  const localeMap: Record<Language, string> = {
    ar: 'ar-SA',
    fr: 'fr-FR',
    en: 'en-US',
  };

  return new Intl.NumberFormat(localeMap[language], {
    useGrouping: true,
    ...options,
  }).format(number);
};

/**
 * Format currency for RTL locales
 */
export const formatCurrency = (
  amount: number,
  language: Language,
  currency: string = 'USD'
): string => {
  return formatNumber(amount, language, {
    style: 'currency',
    currency,
  });
};

/**
 * Format date for RTL locales
 */
export const formatDate = (
  date: Date,
  language: Language,
  options?: Intl.DateTimeFormatOptions
): string => {
  const localeMap: Record<Language, string> = {
    ar: 'ar-SA',
    fr: 'fr-FR',
    en: 'en-US',
  };

  return new Intl.DateTimeFormat(localeMap[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
};

/**
 * Get icon transformation for RTL
 */
export const getIconTransform = (dir: Direction, shouldFlip: boolean = false): string => {
  if (shouldFlip && dir === 'rtl') {
    return 'transform scale-x-[-1]';
  }
  return '';
};

/**
 * Generate RTL-aware grid classes
 */
export const getRTLGridClasses = (dir: Direction, cols: number = 3) => ({
  container: `grid grid-cols-1 md:grid-cols-${cols} gap-6`,
  item: dir === 'rtl' ? 'text-right' : 'text-left',
  direction: dir === 'rtl' ? 'rtl' : 'ltr',
});

/**
 * Get form field classes for RTL
 */
export const getRTLFormClasses = (dir: Direction, hasError: boolean = false) => ({
  label: `block text-sm font-medium mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`,
  input: `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
    dir === 'rtl' ? 'text-right' : 'text-left'
  } ${hasError ? 'border-red-500' : 'border-gray-300'}`,
  error: `text-red-500 text-sm mt-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`,
  helpText: `text-gray-600 text-sm mt-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`,
});

/**
 * Get navigation classes for RTL
 */
export const getRTLNavClasses = (dir: Direction) => ({
  container: `flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-6`,
  item: 'text-gray-800 hover:text-red-700 transition duration-150',
  mobileContainer: 'flex flex-col space-y-4',
  mobileItem: `text-gray-800 hover:text-red-700 transition duration-150 py-2 ${
    dir === 'rtl' ? 'text-right' : 'text-left'
  }`,
});

/**
 * Get card layout classes for RTL
 */
export const getRTLCardClasses = (dir: Direction) => ({
  container: `bg-white rounded-lg shadow-md p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`,
  header: `flex items-start ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'} gap-4`,
  content: 'flex-1',
  icon: 'flex-shrink-0',
});

/**
 * Get responsive layout classes for RTL
 */
export const getRTLResponsiveClasses = (dir: Direction) => ({
  flexContainer: `flex flex-col lg:flex-row gap-6 ${
    dir === 'rtl' ? 'lg:flex-row-reverse' : ''
  }`,
  mainContent: 'flex-1',
  sidebar: 'lg:w-80',
  mobileStack: dir === 'rtl' ? 'flex-col-reverse' : 'flex-col',
});

/**
 * Utility to create RTL-aware className strings
 */
export const createRTLClassName = (
  baseClasses: string,
  rtlClasses: string,
  dir: Direction
): string => {
  return `${baseClasses} ${dir === 'rtl' ? rtlClasses : ''}`.trim();
};

/**
 * Get animation classes that work with RTL
 */
export const getRTLAnimationClasses = (dir: Direction) => ({
  slideIn: dir === 'rtl' ? 'animate-slide-in-right' : 'animate-slide-in-left',
  slideOut: dir === 'rtl' ? 'animate-slide-out-left' : 'animate-slide-out-right',
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
});

/**
 * Validate RTL text input
 */
export const validateRTLInput = (text: string, language: Language): boolean => {
  if (language === 'ar') {
    // Check if text contains appropriate Arabic characters
    return hasArabicText(text) || text.trim() === '';
  }
  return true;
};

/**
 * Clean and normalize Arabic text
 */
export const normalizeArabicText = (text: string): string => {
  return text
    .replace(/[\u200E\u200F\u202A-\u202E]/g, '') // Remove directional marks
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

/**
 * Get appropriate font family for language
 */
export const getFontFamily = (language: Language): string => {
  const fontMap: Record<Language, string> = {
    ar: 'IBM Plex Sans Arabic, Noto Sans Arabic, sans-serif',
    fr: 'Poppins, Segoe UI, sans-serif',
    en: 'Poppins, Segoe UI, sans-serif',
  };
  
  return fontMap[language];
};

/**
 * Generate CSS custom properties for RTL
 */
export const generateRTLCSSProperties = (dir: Direction) => ({
  '--text-align': dir === 'rtl' ? 'right' : 'left',
  '--flex-direction': dir === 'rtl' ? 'row-reverse' : 'row',
  '--margin-start': dir === 'rtl' ? '0 1rem 0 0' : '0 0 0 1rem',
  '--margin-end': dir === 'rtl' ? '0 0 0 1rem' : '0 1rem 0 0',
  '--border-radius-start': dir === 'rtl' ? '0 0.5rem 0.5rem 0' : '0.5rem 0 0 0.5rem',
  '--border-radius-end': dir === 'rtl' ? '0.5rem 0 0 0.5rem' : '0 0.5rem 0.5rem 0',
});

/**
 * Hook-like utility for RTL state management
 */
export const createRTLState = (initialDir: Direction = 'ltr') => {
  let currentDir = initialDir;
  
  return {
    getDirection: () => currentDir,
    setDirection: (dir: Direction) => {
      currentDir = dir;
      document.documentElement.dir = dir;
    },
    toggleDirection: () => {
      currentDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.dir = currentDir;
    },
    isRTL: () => currentDir === 'rtl',
    getClasses: () => getRTLClasses(currentDir),
  };
};