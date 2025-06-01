# Comprehensive RTL Implementation Guide for Arabic Web Applications

## Table of Contents
1. [Global HTML Configuration](#global-html-configuration)
2. [CSS Strategies for RTL Layout](#css-strategies-for-rtl-layout)
3. [React Component Examples](#react-component-examples)
4. [Tailwind CSS RTL Utilities](#tailwind-css-rtl-utilities)
5. [Dynamic Language Switching](#dynamic-language-switching)
6. [Responsive Design Considerations](#responsive-design-considerations)
7. [Font Optimization for Arabic Typography](#font-optimization-for-arabic-typography)
8. [Accessibility Best Practices](#accessibility-best-practices)
9. [Performance Optimization](#performance-optimization)
10. [Integration with UI Frameworks](#integration-with-ui-frameworks)
11. [Testing Strategies](#testing-strategies)
12. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## 1. Global HTML Configuration

### Document-Level RTL Setup

The foundation of RTL support starts with proper HTML document configuration:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Karate Cubs</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### Dynamic Language and Direction Setting

```typescript
// contexts/LanguageContext.tsx
useEffect(() => {
  // Update document direction for RTL support
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  
  // Update document language attribute
  document.documentElement.lang = language;
  
  // Optional: Update page title direction
  document.title = language === 'ar' ? 'أشبال الكاراتيه' : 'Karate Cubs';
}, [language]);
```

### Meta Tags for RTL Support

```html
<meta name="dir" content="rtl">
<meta name="language" content="ar">
<meta property="og:locale" content="ar_SA">
```

---

## 2. CSS Strategies for RTL Layout

### Universal RTL Selectors

```css
/* Base RTL styling */
html[lang="ar"],
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Comprehensive font application */
html[lang="ar"] *,
html[lang="ar"] body,
[lang="ar"],
[dir="rtl"] {
  font-family: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', sans-serif !important;
}
```

### Component-Specific RTL Styling

```css
/* Navigation RTL adjustments */
[dir="rtl"] .nav-item {
  margin-left: 0;
  margin-right: 1rem;
}

/* Form elements RTL */
[dir="rtl"] input,
[dir="rtl"] textarea {
  text-align: right;
  padding-right: 12px;
  padding-left: 40px; /* For icons */
}

/* Flexbox RTL corrections */
[dir="rtl"] .flex-row {
  flex-direction: row-reverse;
}

/* Grid RTL adjustments */
[dir="rtl"] .grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
  direction: rtl;
}
```

### Tailwind Space Utilities RTL Fix

```css
/* Fix Tailwind spacing for RTL */
[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

[dir="rtl"] .space-x-6 {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-8 {
  --tw-space-x-reverse: 1;
}
```

### Text Alignment Overrides

```css
/* Override left alignment for RTL */
html[lang="ar"] .text-left {
  text-align: right !important;
}

html[lang="ar"] .text-right {
  text-align: left !important;
}

/* Preserve center alignment */
html[lang="ar"] .text-center {
  text-align: center !important;
}
```

---

## 3. React Component Examples

### Basic RTL-Aware Component

```tsx
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const RTLComponent: React.FC = () => {
  const { dir, locale } = useLanguage();
  
  return (
    <div className={`flex ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`text-${dir === 'rtl' ? 'right' : 'left'}`}>
        {locale.content}
      </div>
    </div>
  );
};
```

### Advanced Header Component with RTL Support

```tsx
const Header: React.FC = () => {
  const { locale, dir } = useLanguage();
  
  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo section with RTL alignment */}
        <div className={`flex flex-col ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-red-700">
            {locale.header.title}
          </h1>
          <p className="text-sm text-gray-600">{locale.header.subtitle}</p>
        </div>
        
        {/* Navigation with RTL spacing */}
        <nav className={`hidden lg:flex items-center space-x-6 ${
          dir === 'rtl' ? 'space-x-reverse' : ''
        }`}>
          {/* Navigation items */}
        </nav>
      </div>
    </header>
  );
};
```

### Form Component with RTL Support

```tsx
const ContactForm: React.FC = () => {
  const { locale, dir } = useLanguage();
  
  return (
    <form className="space-y-4">
      <div>
        <label className={`block text-sm font-medium mb-2 ${
          dir === 'rtl' ? 'text-right' : 'text-left'
        }`}>
          {locale.contact.name}
        </label>
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}
          placeholder={locale.contact.placeholders.name}
          dir={dir}
        />
      </div>
    </form>
  );
};
```

### Card Component with RTL Layout

```tsx
const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { dir } = useLanguage();
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${
      dir === 'rtl' ? 'text-right' : 'text-left'
    }`}>
      <div className={`flex items-start ${
        dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
      } gap-4`}>
        <div className="flex-shrink-0">
          <Icon className="w-8 h-8 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
          <p className="text-gray-600">{activity.description}</p>
        </div>
      </div>
    </div>
  );
};
```

---

## 4. Tailwind CSS RTL Utilities

### Enhanced Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
      },
      spacing: {
        'rtl-safe': '0.5rem',
      },
    },
  },
  plugins: [
    // RTL Plugin (optional)
    require('tailwindcss-rtl'),
  ],
};
```

### Custom RTL Utility Classes

```css
/* Custom RTL utilities */
@layer utilities {
  .rtl-flip {
    transform: scaleX(-1);
  }
  
  .rtl-margin-start {
    margin-inline-start: 1rem;
  }
  
  .rtl-margin-end {
    margin-inline-end: 1rem;
  }
  
  .rtl-padding-start {
    padding-inline-start: 1rem;
  }
  
  .rtl-padding-end {
    padding-inline-end: 1rem;
  }
  
  .rtl-border-start {
    border-inline-start: 1px solid;
  }
  
  .rtl-border-end {
    border-inline-end: 1px solid;
  }
}
```

### Directional Utility Helper

```tsx
// utils/rtlUtils.ts
export const getRTLClasses = (dir: 'ltr' | 'rtl') => ({
  textAlign: dir === 'rtl' ? 'text-right' : 'text-left',
  flexDirection: dir === 'rtl' ? 'flex-row-reverse' : 'flex-row',
  spaceReverse: dir === 'rtl' ? 'space-x-reverse' : '',
  marginStart: dir === 'rtl' ? 'mr-4' : 'ml-4',
  marginEnd: dir === 'rtl' ? 'ml-4' : 'mr-4',
  paddingStart: dir === 'rtl' ? 'pr-4' : 'pl-4',
  paddingEnd: dir === 'rtl' ? 'pl-4' : 'pr-4',
});

// Usage in components
const { textAlign, flexDirection } = getRTLClasses(dir);
```

---

## 5. Dynamic Language Switching

### Enhanced Language Context

```tsx
// contexts/LanguageContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: Language;
  locale: Locale;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  toggleDirection: () => void;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [locale, setLocale] = useState<Locale>(en);
  
  useEffect(() => {
    // Persist language preference
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') setLanguage('ar');
      else if (browserLang === 'fr') setLanguage('fr');
      else setLanguage('en');
    }
  }, []);

  useEffect(() => {
    // Update document attributes
    const isRTL = language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update body class for styling
    document.body.className = isRTL ? 'rtl' : 'ltr';
    
    // Save preference
    localStorage.setItem('preferred-language', language);
    
    // Update locale
    switch(language) {
      case 'fr': setLocale(fr); break;
      case 'ar': setLocale(ar); break;
      default: setLocale(en);
    }
  }, [language]);

  const contextValue: LanguageContextType = {
    language,
    locale,
    setLanguage,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    isRTL: language === 'ar',
    toggleDirection: () => setLanguage(language === 'ar' ? 'en' : 'ar')
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
```

### Language Selector Component

```tsx
// components/LanguageSelector.tsx
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, dir } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  return (
    <div className="relative group">
      <button className={`flex items-center space-x-2 ${
        dir === 'rtl' ? 'space-x-reverse' : ''
      } px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors`}>
        <Globe size={16} />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === language)?.flag}
        </span>
      </button>
      
      <div className={`absolute top-full ${
        dir === 'rtl' ? 'right-0' : 'left-0'
      } mt-2 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={`flex items-center space-x-3 ${
              dir === 'rtl' ? 'space-x-reverse' : ''
            } w-full px-4 py-2 text-sm hover:bg-gray-50 ${
              language === lang.code ? 'bg-red-50 text-red-700' : 'text-gray-700'
            } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

## 6. Responsive Design Considerations

### RTL-Aware Responsive Grid

```css
/* Responsive grid with RTL support */
.responsive-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

[dir="rtl"] .responsive-grid {
  direction: rtl;
}

/* Mobile-first RTL breakpoints */
@media (max-width: 768px) {
  [dir="rtl"] .mobile-stack {
    flex-direction: column-reverse;
  }
  
  [dir="rtl"] .mobile-text {
    text-align: center;
  }
}

@media (min-width: 769px) {
  [dir="rtl"] .desktop-row {
    flex-direction: row-reverse;
  }
}
```

### Flexbox RTL Patterns

```tsx
// Responsive component with RTL support
const ResponsiveLayout: React.FC = () => {
  const { dir } = useLanguage();
  
  return (
    <div className={`
      flex flex-col lg:flex-row gap-6
      ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}
    `}>
      <div className="flex-1">
        <MainContent />
      </div>
      <div className="lg:w-80">
        <Sidebar />
      </div>
    </div>
  );
};
```

### Grid Layout RTL Adjustments

```css
/* CSS Grid RTL support */
.grid-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}

[dir="rtl"] .grid-layout {
  grid-template-areas: 
    "header header"
    "main sidebar"
    "footer footer";
}
```

---

## 7. Font Optimization for Arabic Typography

### Web Font Loading Strategy

```css
/* Optimized font loading */
@font-face {
  font-family: 'IBM Plex Sans Arabic';
  src: url('./fonts/IBMPlexSansArabic-Regular.woff2') format('woff2'),
       url('./fonts/IBMPlexSansArabic-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Sans Arabic';
  src: url('./fonts/IBMPlexSansArabic-Bold.woff2') format('woff2'),
       url('./fonts/IBMPlexSansArabic-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Font Fallback Strategy

```css
/* Comprehensive font stack */
:root {
  --font-arabic: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Tahoma', 'Arial Unicode MS', sans-serif;
  --font-latin: 'Poppins', 'Segoe UI', 'Roboto', sans-serif;
}

html[lang="ar"] {
  font-family: var(--font-arabic);
}

html[lang="en"],
html[lang="fr"] {
  font-family: var(--font-latin);
}
```

### Font Loading Hook

```tsx
// hooks/useFontLoader.ts
import { useEffect, useState } from 'react';

export const useFontLoader = (fontFamily: string) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  useEffect(() => {
    if ('fonts' in document) {
      document.fonts.load(`1em ${fontFamily}`).then(() => {
        setFontLoaded(true);
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => setFontLoaded(true), 100);
    }
  }, [fontFamily]);
  
  return fontLoaded;
};

// Usage in component
const ArabicText: React.FC = () => {
  const fontLoaded = useFontLoader('IBM Plex Sans Arabic');
  
  return (
    <div className={`transition-opacity duration-300 ${
      fontLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Arabic content */}
    </div>
  );
};
```

---

## 8. Accessibility Best Practices

### Screen Reader Support

```tsx
// Accessible RTL component
const AccessibleContent: React.FC = () => {
  const { locale, dir, language } = useLanguage();
  
  return (
    <section 
      aria-label={locale.section.title}
      lang={language}
      dir={dir}
    >
      <h2 id="section-heading">
        {locale.section.title}
      </h2>
      <div 
        role="region" 
        aria-labelledby="section-heading"
        className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}
      >
        {locale.section.content}
      </div>
    </section>
  );
};
```

### Keyboard Navigation RTL

```css
/* Focus indicators for RTL */
[dir="rtl"] *:focus {
  outline-offset: 2px;
}

/* Tab order adjustments */
[dir="rtl"] .tab-container {
  flex-direction: row-reverse;
}

[dir="rtl"] .tab-item:focus {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}
```

### ARIA Labels for RTL

```tsx
const AccessibleForm: React.FC = () => {
  const { locale, dir } = useLanguage();
  
  return (
    <form role="form" aria-label={locale.form.title}>
      <div className="form-group">
        <label 
          htmlFor="name-input"
          className={`block text-sm font-medium ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          {locale.form.name}
        </label>
        <input
          id="name-input"
          type="text"
          dir={dir}
          aria-describedby="name-help"
          aria-required="true"
          className={`w-full px-4 py-2 border rounded-lg ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}
        />
        <div 
          id="name-help" 
          className="text-sm text-gray-600 mt-1"
          role="note"
        >
          {locale.form.nameHelp}
        </div>
      </div>
    </form>
  );
};
```

---

## 9. Performance Optimization

### Lazy Loading for RTL Fonts

```tsx
// utils/fontLoader.ts
export const loadArabicFont = async (): Promise<void> => {
  if ('fonts' in document) {
    const font = new FontFace(
      'IBM Plex Sans Arabic',
      'url(/fonts/IBMPlexSansArabic-Regular.woff2) format("woff2")'
    );
    
    try {
      await font.load();
      document.fonts.add(font);
    } catch (error) {
      console.warn('Failed to load Arabic font:', error);
    }
  }
};

// Component with lazy font loading
const ArabicSection: React.FC = () => {
  const { language } = useLanguage();
  const [fontReady, setFontReady] = useState(false);
  
  useEffect(() => {
    if (language === 'ar') {
      loadArabicFont().then(() => setFontReady(true));
    }
  }, [language]);
  
  if (language === 'ar' && !fontReady) {
    return <div className="animate-pulse">Loading...</div>;
  }
  
  return <div>{/* Arabic content */}</div>;
};
```

### Code Splitting for RTL Components

```tsx
// Lazy load RTL-specific components
const ArabicCalendar = lazy(() => import('./ArabicCalendar'));
const ArabicDatePicker = lazy(() => import('./ArabicDatePicker'));

const ConditionalRTLComponents: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {language === 'ar' && (
        <>
          <ArabicCalendar />
          <ArabicDatePicker />
        </>
      )}
    </Suspense>
  );
};
```

### Optimized CSS Loading

```css
/* Critical RTL styles - inline in HTML */
html[lang="ar"] {
  direction: rtl;
  text-align: right;
  font-family: system-ui; /* System fallback */
}

/* Non-critical RTL styles - load async */
@media print {
  [dir="rtl"] .print-layout {
    direction: rtl;
  }
}
```

---

## 10. Integration with UI Frameworks

### Material-UI RTL Integration

```tsx
// MUI RTL setup
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

const RTLThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { dir } = useLanguage();
  
  const theme = createTheme({
    direction: dir,
    typography: {
      fontFamily: dir === 'rtl' 
        ? 'IBM Plex Sans Arabic, sans-serif'
        : 'Poppins, sans-serif',
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={dir === 'rtl' ? cacheRtl : cacheLtr}>
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
};
```

### Ant Design RTL

```tsx
import { ConfigProvider } from 'antd';
import arEG from 'antd/locale/ar_EG';
import enUS from 'antd/locale/en_US';

const AntdRTLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language, dir } = useLanguage();
  
  return (
    <ConfigProvider
      direction={dir}
      locale={language === 'ar' ? arEG : enUS}
    >
      {children}
    </ConfigProvider>
  );
};
```

### Chakra UI RTL

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const rtlTheme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: 'IBM Plex Sans Arabic, sans-serif',
    body: 'IBM Plex Sans Arabic, sans-serif',
  },
});

const ChakraRTLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { dir } = useLanguage();
  
  return (
    <ChakraProvider theme={dir === 'rtl' ? rtlTheme : defaultTheme}>
      {children}
    </ChakraProvider>
  );
};
```

---

## 11. Testing Strategies

### RTL Layout Testing

```typescript
// __tests__/rtl.test.tsx
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../contexts/LanguageContext';

const renderWithRTL = (component: ReactElement, language: Language = 'ar') => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('RTL Layout Tests', () => {
  test('should apply RTL direction for Arabic', () => {
    renderWithRTL(<Header />, 'ar');
    
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });
  
  test('should reverse flex direction in RTL', () => {
    renderWithRTL(<Navigation />, 'ar');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('flex-row-reverse');
  });
});
```

### Visual Regression Testing

```javascript
// playwright.config.js
module.exports = {
  testDir: './tests',
  projects: [
    {
      name: 'RTL Tests',
      use: {
        locale: 'ar-SA',
        timezoneId: 'Asia/Riyadh',
      },
    },
  ],
};

// tests/rtl-visual.spec.ts
import { test, expect } from '@playwright/test';

test('RTL layout visual test', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-testid="language-selector"]').click();
  await page.locator('[data-testid="arabic-option"]').click();
  
  await expect(page).toHaveScreenshot('arabic-homepage.png');
});
```

### Cross-Browser RTL Testing

```typescript
// cypress/integration/rtl.spec.ts
describe('RTL Cross-Browser Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should handle RTL in different browsers', () => {
    cy.get('[data-testid="language-selector"]').click();
    cy.get('[data-testid="arabic-option"]').click();
    
    cy.get('html').should('have.attr', 'dir', 'rtl');
    cy.get('html').should('have.attr', 'lang', 'ar');
    
    // Test text alignment
    cy.get('.main-content').should('have.css', 'text-align', 'right');
    
    // Test flex direction
    cy.get('.navigation').should('have.css', 'flex-direction', 'row-reverse');
  });
});
```

---

## 12. Troubleshooting Common Issues

### Mixed LTR/RTL Content

```tsx
// Component for handling mixed content
const MixedContent: React.FC<{ content: string }> = ({ content }) => {
  const { dir } = useLanguage();
  
  // Detect if content contains both Arabic and Latin characters
  const hasArabic = /[\u0600-\u06FF]/.test(content);
  const hasLatin = /[a-zA-Z]/.test(content);
  const isMixed = hasArabic && hasLatin;
  
  return (
    <div 
      className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}
      dir={isMixed ? 'auto' : dir}
    >
      {content}
    </div>
  );
};
```

### Number Formatting Issues

```typescript
// utils/numberFormatter.ts
export const formatNumber = (
  number: number, 
  language: Language,
  options?: Intl.NumberFormatOptions
): string => {
  const locale = language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US';
  
  return new Intl.NumberFormat(locale, {
    ...options,
    // Force LTR for numbers in RTL context
    useGrouping: true,
  }).format(number);
};

// Component usage
const PriceDisplay: React.FC<{ price: number }> = ({ price }) => {
  const { language } = useLanguage();
  
  return (
    <span dir="ltr" className="inline-block">
      {formatNumber(price, language, { 
        style: 'currency', 
        currency: 'USD' 
      })}
    </span>
  );
};
```

### Embedded Media Alignment

```css
/* Fix for embedded content in RTL */
[dir="rtl"] iframe,
[dir="rtl"] video,
[dir="rtl"] img {
  max-width: 100%;
  height: auto;
}

[dir="rtl"] .media-container {
  text-align: center; /* Center media in RTL */
}

/* YouTube embed RTL fix */
[dir="rtl"] .youtube-embed {
  direction: ltr; /* Keep video controls LTR */
  text-align: center;
}
```

### Icon Direction Issues

```tsx
// Icon component with RTL awareness
const DirectionalIcon: React.FC<{ 
  icon: ReactElement; 
  shouldFlip?: boolean 
}> = ({ icon, shouldFlip = false }) => {
  const { dir } = useLanguage();
  
  return (
    <span className={`inline-block ${
      shouldFlip && dir === 'rtl' ? 'transform scale-x-[-1]' : ''
    }`}>
      {icon}
    </span>
  );
};

// Usage
<DirectionalIcon 
  icon={<ArrowRight />} 
  shouldFlip={true} 
/>
```

### Form Validation RTL

```tsx
const RTLFormValidation: React.FC = () => {
  const { locale, dir } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  return (
    <div className="form-group">
      <input
        className={`w-full px-4 py-2 border rounded-lg ${
          errors.email ? 'border-red-500' : 'border-gray-300'
        } ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
        dir={dir}
      />
      {errors.email && (
        <div 
          className={`text-red-500 text-sm mt-1 ${
            dir === 'rtl' ? 'text-right' : 'text-left'
          }`}
          role="alert"
        >
          {errors.email}
        </div>
      )}
    </div>
  );
};
```

### CSS Specificity Issues

```css
/* High specificity RTL overrides */
html[lang="ar"] body .component,
html[dir="rtl"] body .component {
  font-family: 'IBM Plex Sans Arabic', sans-serif !important;
  text-align: right !important;
}

/* Use CSS custom properties for easier overrides */
:root {
  --text-align: left;
  --flex-direction: row;
}

[dir="rtl"] {
  --text-align: right;
  --flex-direction: row-reverse;
}

.component {
  text-align: var(--text-align);
  flex-direction: var(--flex-direction);
}
```

---

## Best Practices Summary

1. **Always test with real Arabic content** - Lorem ipsum doesn't reveal RTL issues
2. **Use semantic HTML** - Proper structure helps with RTL rendering
3. **Implement progressive enhancement** - Start with basic RTL, add advanced features
4. **Test across devices** - RTL behavior can vary on different screen sizes
5. **Consider performance** - Load RTL resources only when needed
6. **Validate with native speakers** - Ensure cultural and linguistic accuracy
7. **Use CSS logical properties** - `margin-inline-start` instead of `margin-left`
8. **Test keyboard navigation** - Ensure tab order works correctly in RTL
9. **Handle mixed content carefully** - Use `dir="auto"` for dynamic content
10. **Document RTL patterns** - Create a style guide for your team

This comprehensive guide provides the foundation for implementing robust RTL support in React applications with Vite and Tailwind CSS, ensuring your Arabic web applications provide an excellent user experience.