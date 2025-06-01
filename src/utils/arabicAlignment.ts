/**
 * Arabic Text Alignment Utilities
 * Comprehensive utilities for handling Arabic text alignment issues
 */

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export type AlignmentType = 'left' | 'center' | 'right' | 'justify';
export type DirectionType = 'ltr' | 'rtl' | 'auto';

/**
 * Get proper text alignment for Arabic content
 */
export const getArabicAlignment = (
  language: string,
  defaultAlignment: AlignmentType = 'left'
): AlignmentType => {
  if (language === 'ar') {
    // Convert center alignment to right for Arabic
    if (defaultAlignment === 'center') return 'right';
    if (defaultAlignment === 'left') return 'right';
    return 'right';
  }
  return defaultAlignment;
};

/**
 * Get CSS classes for Arabic text alignment
 */
export const getArabicAlignmentClasses = (
  language: string,
  baseClasses: string = ''
): string => {
  const arabicClasses = language === 'ar' 
    ? 'text-right direction-rtl arabic-content'
    : 'text-left direction-ltr';
  
  return `${baseClasses} ${arabicClasses}`.trim();
};

/**
 * Get section-specific Arabic alignment classes
 */
export const getSectionArabicClasses = (
  language: string,
  sectionType: 'hero' | 'activities' | 'vision' | 'president' | 'contact' | 'generic' = 'generic'
): string => {
  if (language !== 'ar') return '';
  
  const baseArabicClasses = 'arabic-section arabic-text-container';
  const sectionSpecificClasses = {
    hero: 'hero-section',
    activities: 'activities-section',
    vision: 'vision-section',
    president: 'president-section',
    contact: 'contact-section',
    generic: 'generic-section'
  };
  
  return `${baseArabicClasses} ${sectionSpecificClasses[sectionType]}`;
};

/**
 * Get card/item specific Arabic alignment classes
 */
export const getCardArabicClasses = (language: string): string => {
  if (language !== 'ar') return '';
  return 'arabic-card arabic-content';
};

/**
 * Get title/heading Arabic alignment classes
 */
export const getTitleArabicClasses = (
  language: string,
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2'
): string => {
  if (language !== 'ar') return '';
  return `arabic-title arabic-${level}`;
};

/**
 * Get paragraph Arabic alignment classes
 */
export const getParagraphArabicClasses = (language: string): string => {
  if (language !== 'ar') return '';
  return 'arabic-paragraph arabic-content';
};

/**
 * Get grid container Arabic alignment classes
 */
export const getGridArabicClasses = (language: string): string => {
  if (language !== 'ar') return '';
  return 'arabic-grid';
};

/**
 * Get flex container Arabic alignment classes
 */
export const getFlexArabicClasses = (language: string): string => {
  if (language !== 'ar') return '';
  return 'arabic-flex';
};

/**
 * Override center alignment for Arabic text
 */
export const overrideCenterAlignment = (
  language: string,
  shouldOverride: boolean = true
): string => {
  if (language !== 'ar' || !shouldOverride) return '';
  return 'override-center-arabic';
};

/**
 * Get responsive Arabic alignment classes
 */
export const getResponsiveArabicClasses = (
  language: string,
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'mobile'
): string => {
  if (language !== 'ar') return '';
  
  const responsiveClasses = {
    mobile: 'mobile-arabic-right',
    tablet: 'tablet-arabic-right',
    desktop: 'desktop-arabic-right'
  };
  
  return responsiveClasses[breakpoint];
};

/**
 * Generate inline styles for Arabic alignment
 */
export const getArabicInlineStyles = (
  language: string,
  forceAlignment: boolean = false
): React.CSSProperties => {
  if (language !== 'ar' && !forceAlignment) return {};
  
  return {
    direction: 'rtl',
    textAlign: 'right',
    unicodeBidi: 'embed'
  };
};

/**
 * Get container wrapper styles for Arabic content
 */
export const getArabicContainerStyles = (language: string): React.CSSProperties => {
  if (language !== 'ar') return {};
  
  return {
    direction: 'rtl',
    textAlign: 'right',
    width: '100%'
  };
};

/**
 * Apply Arabic alignment to existing className string
 */
export const applyArabicAlignment = (
  existingClasses: string,
  language: string,
  options: {
    overrideCenter?: boolean;
    forceRight?: boolean;
    addContainer?: boolean;
  } = {}
): string => {
  if (language !== 'ar') return existingClasses;
  
  let arabicClasses = 'arabic-content';
  
  if (options.overrideCenter) {
    arabicClasses += ' override-center-arabic';
  }
  
  if (options.forceRight) {
    arabicClasses += ' always-right';
  }
  
  if (options.addContainer) {
    arabicClasses += ' arabic-text-container';
  }
  
  // Remove conflicting classes
  const cleanedClasses = existingClasses
    .replace(/text-(left|center)/g, '')
    .replace(/direction-(ltr|rtl)/g, '')
    .trim();
  
  return `${cleanedClasses} ${arabicClasses}`.trim();
};

/**
 * Create a wrapper div with proper Arabic alignment
 */
export const createArabicWrapper = (
  children: React.ReactNode,
  language: string,
  wrapperType: 'section' | 'div' | 'article' = 'div'
): React.ReactElement => {
  if (language !== 'ar') {
    return React.createElement(wrapperType, {}, children);
  }
  
  const props = {
    className: 'arabic-text-container',
    dir: 'rtl',
    style: {
      textAlign: 'right' as const,
      direction: 'rtl' as const
    }
  };
  
  return React.createElement(wrapperType, props, children);
};

/**
 * Fix text alignment for specific content types
 */
export const getContentTypeArabicClasses = (
  language: string,
  contentType: 'title' | 'subtitle' | 'paragraph' | 'list' | 'button' | 'link'
): string => {
  if (language !== 'ar') return '';
  
  const contentTypeClasses = {
    title: 'arabic-title',
    subtitle: 'arabic-subtitle',
    paragraph: 'arabic-paragraph',
    list: 'arabic-list',
    button: 'arabic-button',
    link: 'arabic-link'
  };
  
  return `arabic-content ${contentTypeClasses[contentType]}`;
};

/**
 * Generate Tailwind classes for Arabic alignment
 */
export const getTailwindArabicClasses = (
  language: string,
  baseClasses: string = ''
): string => {
  if (language !== 'ar') return baseClasses;
  
  // Replace common Tailwind classes with RTL equivalents
  const rtlClasses = baseClasses
    .replace(/text-left/g, 'text-right')
    .replace(/text-center/g, 'text-right')
    .replace(/ml-/g, 'mr-')
    .replace(/pl-/g, 'pr-')
    .replace(/border-l/g, 'border-r')
    .replace(/rounded-l/g, 'rounded-r')
    .replace(/flex-row/g, 'flex-row-reverse');
  
  return `${rtlClasses} dir-rtl`.trim();
};

/**
 * Check if element needs Arabic alignment fix
 */
export const needsArabicAlignmentFix = (
  element: HTMLElement,
  language: string
): boolean => {
  if (language !== 'ar') return false;
  
  const computedStyle = window.getComputedStyle(element);
  const textAlign = computedStyle.textAlign;
  const direction = computedStyle.direction;
  
  // Check if element has center alignment or LTR direction
  return textAlign === 'center' || direction === 'ltr';
};

/**
 * Apply Arabic alignment fix to DOM element
 */
export const applyArabicAlignmentFix = (
  element: HTMLElement,
  language: string,
  options: {
    preserveCenter?: boolean;
    addClasses?: boolean;
  } = {}
): void => {
  if (language !== 'ar') return;
  
  if (options.addClasses) {
    element.classList.add('arabic-content');
  }
  
  if (!options.preserveCenter) {
    element.style.textAlign = 'right';
  }
  
  element.style.direction = 'rtl';
  element.setAttribute('dir', 'rtl');
};

/**
 * Batch apply Arabic alignment to multiple elements
 */
export const batchApplyArabicAlignment = (
  selectors: string[],
  language: string,
  options: {
    preserveCenter?: boolean;
    addClasses?: boolean;
  } = {}
): void => {
  if (language !== 'ar') return;
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        applyArabicAlignmentFix(element, language, options);
      }
    });
  });
};

/**
 * Create CSS-in-JS styles for Arabic alignment
 */
export const createArabicAlignmentStyles = (language: string) => ({
  section: {
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'left'
  } as React.CSSProperties,
  
  title: {
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'center'
  } as React.CSSProperties,
  
  paragraph: {
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'left',
    lineHeight: language === 'ar' ? '1.8' : '1.6'
  } as React.CSSProperties,
  
  card: {
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'left'
  } as React.CSSProperties,
  
  grid: {
    direction: language === 'ar' ? 'rtl' : 'ltr'
  } as React.CSSProperties
});

/**
 * Debug function to identify alignment issues
 */
export const debugArabicAlignment = (language: string): void => {
  if (language !== 'ar') return;
  
  console.group('Arabic Alignment Debug');
  
  // Check document direction
  console.log('Document direction:', document.documentElement.dir);
  console.log('Document language:', document.documentElement.lang);
  
  // Find elements with center alignment
  const centerAligned = document.querySelectorAll('[style*="text-align: center"], .text-center');
  console.log('Center-aligned elements:', centerAligned.length);
  
  // Find elements without RTL direction
  const ltrElements = document.querySelectorAll('[dir="ltr"], [style*="direction: ltr"]');
  console.log('LTR elements:', ltrElements.length);
  
  console.groupEnd();
};

/**
 * Custom hook for Arabic alignment
 */
export const useArabicAlignment = (
  sectionType: 'hero' | 'activities' | 'vision' | 'president' | 'contact' | 'generic' = 'generic'
) => {
  const { language } = useLanguage();
  
  return {
    sectionClasses: getSectionArabicClasses(language, sectionType),
    titleClasses: getTitleArabicClasses(language),
    paragraphClasses: getParagraphArabicClasses(language),
    cardClasses: getCardArabicClasses(language),
    gridClasses: getGridArabicClasses(language),
    styles: createArabicAlignmentStyles(language),
    isArabic: language === 'ar'
  };
};