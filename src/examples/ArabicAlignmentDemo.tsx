/**
 * Arabic Alignment Demo
 * Demonstrates before/after examples of Arabic text alignment fixes
 */

import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
  getSectionArabicClasses,
  getTitleArabicClasses,
  getParagraphArabicClasses,
  getCardArabicClasses,
  createArabicAlignmentStyles,
  useArabicAlignment
} from '../utils/arabicAlignment';

// Before: Problematic center-aligned Arabic text
const ProblematicSection: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
          <h3 className="text-lg font-bold text-red-800 mb-2">❌ BEFORE: Problematic Center Alignment</h3>
          <p className="text-red-700">Arabic text appears center-aligned instead of right-aligned</p>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          {locale.activities.title}
        </h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-700"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// After: Fixed right-aligned Arabic text
const FixedSection: React.FC = () => {
  const { locale, language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);

  return (
    <section 
      className={`py-16 bg-green-50 ${getSectionArabicClasses(language, 'activities')}`}
      style={styles.section}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-green-100 border border-green-300 rounded-lg">
          <h3 className="text-lg font-bold text-green-800 mb-2">✅ AFTER: Fixed Right Alignment</h3>
          <p className="text-green-700">Arabic text is properly right-aligned using utility functions</p>
        </div>
        
        <h2 
          className={`text-3xl font-bold mb-4 text-gray-800 ${getTitleArabicClasses(language, 'h2')}`}
          style={styles.title}
        >
          {locale.activities.title}
        </h2>
        <p 
          className={`text-lg mb-12 max-w-3xl mx-auto ${getParagraphArabicClasses(language)}`}
          style={styles.paragraph}
        >
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-green-700 ${getCardArabicClasses(language)}`}
              style={styles.card}
            >
              <h3 
                className={`text-xl font-semibold mb-3 text-gray-800 ${getTitleArabicClasses(language, 'h3')}`}
                style={styles.title}
              >
                {item.title}
              </h3>
              <p 
                className={`text-gray-600 ${getParagraphArabicClasses(language)}`}
                style={styles.paragraph}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CSS-only solution example
const CSSOnlyFixedSection: React.FC = () => {
  const { locale, language } = useLanguage();

  return (
    <section className={`py-16 bg-blue-50 ${language === 'ar' ? 'arabic-section' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
          <h3 className="text-lg font-bold text-blue-800 mb-2">🎨 CSS-Only Solution</h3>
          <p className="text-blue-700">Using pure CSS classes for Arabic alignment</p>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 text-gray-800 ${language === 'ar' ? 'arabic-title' : 'text-center'}`}>
          {locale.activities.title}
        </h2>
        <p className={`text-lg mb-12 max-w-3xl mx-auto ${language === 'ar' ? 'arabic-paragraph' : 'text-center'}`}>
          {locale.activities.description}
        </p>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${language === 'ar' ? 'arabic-grid' : ''}`}>
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-700 ${language === 'ar' ? 'arabic-card' : ''}`}
            >
              <h3 className={`text-xl font-semibold mb-3 text-gray-800 ${language === 'ar' ? 'arabic-title' : ''}`}>
                {item.title}
              </h3>
              <p className={`text-gray-600 ${language === 'ar' ? 'arabic-paragraph' : ''}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Hook-based solution example
const HookBasedSection: React.FC = () => {
  const { locale } = useLanguage();
  const {
    sectionClasses,
    titleClasses,
    paragraphClasses,
    cardClasses,
    styles,
    isArabic
  } = useArabicAlignment('activities');

  return (
    <section className={`py-16 bg-purple-50 ${sectionClasses}`} style={styles.section}>
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-purple-100 border border-purple-300 rounded-lg">
          <h3 className="text-lg font-bold text-purple-800 mb-2">🪝 Hook-Based Solution</h3>
          <p className="text-purple-700">Using custom hook for Arabic alignment</p>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 text-gray-800 ${titleClasses}`} style={styles.title}>
          {locale.activities.title}
        </h2>
        <p className={`text-lg mb-12 max-w-3xl mx-auto ${paragraphClasses}`} style={styles.paragraph}>
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-700 ${cardClasses}`}
              style={styles.card}
            >
              <h3 className={`text-xl font-semibold mb-3 text-gray-800 ${titleClasses}`} style={styles.title}>
                {item.title}
              </h3>
              <p className={`text-gray-600 ${paragraphClasses}`} style={styles.paragraph}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline styles solution example
const InlineStylesSection: React.FC = () => {
  const { locale, language } = useLanguage();
  
  const sectionStyle: React.CSSProperties = {
    direction: language === 'ar' ? 'rtl' : 'ltr',
    textAlign: language === 'ar' ? 'right' : 'left'
  };
  
  const titleStyle: React.CSSProperties = {
    textAlign: language === 'ar' ? 'right' : 'center',
    direction: language === 'ar' ? 'rtl' : 'ltr'
  };
  
  const cardStyle: React.CSSProperties = {
    textAlign: language === 'ar' ? 'right' : 'left',
    direction: language === 'ar' ? 'rtl' : 'ltr'
  };

  return (
    <section className="py-16 bg-yellow-50" style={sectionStyle}>
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">💅 Inline Styles Solution</h3>
          <p className="text-yellow-700">Using inline styles for Arabic alignment</p>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-gray-800" style={titleStyle}>
          {locale.activities.title}
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto" style={titleStyle}>
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-700"
              style={cardStyle}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800" style={titleStyle}>
                {item.title}
              </h3>
              <p className="text-gray-600" style={cardStyle}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tailwind utility classes solution
const TailwindUtilitySection: React.FC = () => {
  const { locale, language } = useLanguage();

  return (
    <section className={`py-16 bg-indigo-50 ${language === 'ar' ? 'dir-rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 p-4 bg-indigo-100 border border-indigo-300 rounded-lg">
          <h3 className="text-lg font-bold text-indigo-800 mb-2">🎨 Tailwind Utility Classes</h3>
          <p className="text-indigo-700">Using custom Tailwind utilities for Arabic alignment</p>
        </div>
        
        <h2 className={`text-3xl font-bold mb-4 text-gray-800 ${
          language === 'ar' ? 'text-right arabic-text-right' : 'text-center'
        }`}>
          {locale.activities.title}
        </h2>
        <p className={`text-lg mb-12 max-w-3xl mx-auto ${
          language === 'ar' ? 'text-right arabic-text-right' : 'text-center'
        }`}>
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-700 ${
                language === 'ar' ? 'arabic-text-right' : ''
              }`}
            >
              <h3 className={`text-xl font-semibold mb-3 text-gray-800 ${
                language === 'ar' ? 'text-right' : ''
              }`}>
                {item.title}
              </h3>
              <p className={`text-gray-600 ${
                language === 'ar' ? 'text-right' : ''
              }`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main demo component
export const ArabicAlignmentDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const { language } = useLanguage();
  
  const demos = [
    { name: language === 'ar' ? 'المشكلة: محاذاة وسط' : 'Problem: Center Aligned', component: ProblematicSection },
    { name: language === 'ar' ? 'الحل: دوال المساعدة' : 'Solution: Utility Functions', component: FixedSection },
    { name: language === 'ar' ? 'حل CSS فقط' : 'CSS-Only Solution', component: CSSOnlyFixedSection },
    { name: language === 'ar' ? 'حل Hook' : 'Hook-Based Solution', component: HookBasedSection },
    { name: language === 'ar' ? 'أنماط مضمنة' : 'Inline Styles', component: InlineStylesSection },
    { name: language === 'ar' ? 'فئات Tailwind' : 'Tailwind Utilities', component: TailwindUtilitySection },
  ];
  
  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Selector */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'عرض توضيحي لمحاذاة النص العربي' : 'Arabic Text Alignment Demo'}
          </h1>
          
          <div className={`flex flex-wrap gap-2 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
            {demos.map((demo, index) => (
              <button
                key={index}
                onClick={() => setActiveDemo(index)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  activeDemo === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {demo.name}
              </button>
            ))}
          </div>
          
          <div className={`mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg ${
            language === 'ar' ? 'text-right' : 'text-left'
          }`}>
            <p className="text-sm text-blue-800">
              {language === 'ar' 
                ? 'قم بتبديل اللغة إلى العربية لرؤية مشاكل المحاذاة والحلول'
                : 'Switch language to Arabic to see alignment issues and solutions'
              }
            </p>
          </div>
        </div>
      </div>
      
      {/* Active Demo */}
      <div>
        <ActiveComponent />
      </div>
      
      {/* Implementation Code Display */}
      <div className="bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h3 className={`text-lg font-bold mb-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {language === 'ar' ? 'مثال على الكود:' : 'Implementation Code:'}
          </h3>
          <pre className={`bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm ${
            language === 'ar' ? 'text-right' : 'text-left'
          }`}>
            <code>
{`// ${demos[activeDemo].name}
import { 
  getSectionArabicClasses,
  getTitleArabicClasses,
  getParagraphArabicClasses 
} from '../utils/arabicAlignment';

const FixedSection = () => {
  const { language, locale } = useLanguage();
  
  return (
    <section className={\`py-16 \${getSectionArabicClasses(language, 'activities')}\`}>
      <h2 className={\`text-3xl font-bold \${getTitleArabicClasses(language, 'h2')}\`}>
        {locale.activities.title}
      </h2>
      <p className={\`text-lg \${getParagraphArabicClasses(language)}\`}>
        {locale.activities.description}
      </p>
    </section>
  );
};`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ArabicAlignmentDemo;