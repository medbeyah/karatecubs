/**
 * Fixed Arabic Components
 * Components with proper Arabic text alignment solutions
 */

import React from 'react';
import coupeImage from '../assets/images/coupe.jpg?url';
import presidentImage from '../assets/images/president.jpg?url';
import { useLanguage } from '../hooks/useLanguage';
import { 
  getArabicAlignmentClasses,
  getSectionArabicClasses,
  getCardArabicClasses,
  getTitleArabicClasses,
  getParagraphArabicClasses,
  getGridArabicClasses,
  createArabicAlignmentStyles
} from '../utils/arabicAlignment';

// Fixed Hero Section with proper Arabic alignment
export const FixedHeroSection: React.FC = () => {
  const { locale, language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);

  return (
    <div className={`pt-24 pb-16 md:pt-32 md:pb-24 ${getSectionArabicClasses(language, 'hero')}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col items-center ${language === 'ar' ? 'text-right' : 'text-center'}`}>
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-red-700 ${getTitleArabicClasses(language, 'h1')}`}
            style={styles.title}
          >
            {locale.header.title}
          </h1>
          <p 
            className={`text-xl md:text-2xl max-w-3xl text-gray-700 ${getParagraphArabicClasses(language)}`}
            style={styles.paragraph}
          >
            {locale.header.subtitle}
          </p>
          <div className="mt-12">
            <img 
              src={coupeImage}
              alt="Karate competition trophy" 
              className="rounded-lg shadow-lg w-full max-w-5xl mx-auto object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed Activities Section with proper Arabic alignment
export const FixedActivitiesSection: React.FC = () => {
  const { locale, language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);

  return (
    <section 
      id="activities" 
      className={`py-16 ${getSectionArabicClasses(language, 'activities')}`}
      style={styles.section}
    >
      <div className="container mx-auto px-4">
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
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${getGridArabicClasses(language)}`}>
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-700 ${getCardArabicClasses(language)}`}
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

// Fixed Vision Section with proper Arabic alignment
export const FixedVisionSection: React.FC = () => {
  const { language, locale } = useLanguage();
  const styles = createArabicAlignmentStyles(language);
  const arabicNumerals = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];

  return (
    <section 
      id="vision" 
      className={`py-16 bg-gray-50 ${getSectionArabicClasses(language, 'vision')}`}
      style={styles.section}
    >
      <div className="container mx-auto px-4">
        <h2 
          className={`text-3xl font-bold mb-4 text-gray-800 ${getTitleArabicClasses(language, 'h2')}`}
          style={styles.title}
        >
          {locale.vision.title}
        </h2>
        <p 
          className={`text-lg mb-12 max-w-3xl mx-auto ${getParagraphArabicClasses(language)}`}
          style={styles.paragraph}
        >
          {locale.vision.description}
        </p>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${getGridArabicClasses(language)}`}>
          {locale.vision.items.map((item, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex ${getCardArabicClasses(language)} ${
                language === 'ar' ? 'flex-row-reverse' : 'flex-row'
              }`}
              style={styles.card}
            >
              <div className={`flex-shrink-0 w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                language === 'ar' ? 'ml-4' : 'mr-4'
              }`}>
                {language === 'ar' ? arabicNumerals[index] : index + 1}
              </div>
              <div className={`${language === 'ar' ? 'flex flex-col items-end text-right' : 'flex flex-col items-start text-left'}`}>
                <h3 
                  className={`text-xl font-semibold mb-2 text-gray-800 ${getTitleArabicClasses(language, 'h3')}`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fixed President Section with proper Arabic alignment
export const FixedPresidentSection: React.FC = () => {
  const { locale, language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);

  return (
    <section 
      id="president" 
      className={`py-16 ${getSectionArabicClasses(language, 'president')}`}
      style={styles.section}
    >
      <div className="container mx-auto px-4">
        <div className={`flex flex-col lg:flex-row items-center gap-12 ${
          language === 'ar' ? 'lg:flex-row-reverse' : ''
        }`}>
          <div className="lg:w-1/2">
            <img 
              src={presidentImage}
              alt="President Ahmed Alketab" 
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </div>
          <div className={`lg:w-1/2 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <h2 
              className={`text-3xl font-bold mb-6 text-gray-800 ${getTitleArabicClasses(language, 'h2')}`}
              style={styles.title}
            >
              {locale.president.title}
            </h2>
            <p 
              className={`text-lg text-gray-600 leading-relaxed ${getParagraphArabicClasses(language)}`}
              style={styles.paragraph}
            >
              {locale.president.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fixed Contact Section with proper Arabic alignment
export const FixedContactSection: React.FC = () => {
  const { locale, language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);

  return (
    <section 
      id="contact" 
      className={`py-16 bg-gray-50 ${getSectionArabicClasses(language, 'contact')}`}
      style={styles.section}
    >
      <div className="container mx-auto px-4">
        <h2 
          className={`text-3xl font-bold mb-12 text-gray-800 ${getTitleArabicClasses(language, 'h2')}`}
          style={styles.title}
        >
          {locale.contact.title}
        </h2>
        
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${getGridArabicClasses(language)}`}>
          <div className={getCardArabicClasses(language)} style={styles.card}>
            <form className="space-y-6">
              <div>
                <label 
                  htmlFor="name" 
                  className={`block text-sm font-medium text-gray-700 mb-2 ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  style={styles.paragraph}
                >
                  {locale.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  placeholder={locale.contact.placeholders.name}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  style={language === 'ar' ? { textAlign: 'right' } : {}}
                />
              </div>
              
              <div>
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium text-gray-700 mb-2 ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  style={styles.paragraph}
                >
                  {locale.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  placeholder={locale.contact.placeholders.email}
                  dir="ltr" // Email should always be LTR
                />
              </div>
              
              <div>
                <label 
                  htmlFor="message" 
                  className={`block text-sm font-medium text-gray-700 mb-2 ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  style={styles.paragraph}
                >
                  {locale.contact.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical ${
                    language === 'ar' ? 'text-right' : 'text-left'
                  }`}
                  placeholder={locale.contact.placeholders.message}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  style={language === 'ar' ? { textAlign: 'right' } : {}}
                />
              </div>
              
              <button
                type="submit"
                className={`w-full bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition duration-300 font-semibold ${
                  language === 'ar' ? 'text-right' : 'text-left'
                }`}
                style={styles.paragraph}
              >
                {locale.contact.submit}
              </button>
            </form>
          </div>
          
          <div className={`space-y-6 ${getCardArabicClasses(language)}`} style={styles.card}>
            <div>
              <h3 
                className={`text-xl font-semibold mb-4 text-gray-800 ${getTitleArabicClasses(language, 'h3')}`}
                style={styles.title}
              >
                {locale.contact.followUs}
              </h3>
              <div className={`flex space-x-4 ${language === 'ar' ? 'space-x-reverse justify-end' : 'justify-start'}`}>
                <a href="#" className="text-red-700 hover:text-red-800 transition duration-300">
                  Facebook
                </a>
                <a href="#" className="text-red-700 hover:text-red-800 transition duration-300">
                  Instagram
                </a>
                <a href="#" className="text-red-700 hover:text-red-800 transition duration-300">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Wrapper component that applies Arabic alignment fixes
export const ArabicAlignmentWrapper: React.FC<{
  children: React.ReactNode;
  sectionType?: 'hero' | 'activities' | 'vision' | 'president' | 'contact' | 'generic';
  className?: string;
}> = ({ children, sectionType = 'generic', className = '' }) => {
  const { language } = useLanguage();
  const styles = createArabicAlignmentStyles(language);
  
  return (
    <div 
      className={`${getSectionArabicClasses(language, sectionType)} ${className}`}
      style={styles.section}
    >
      {children}
    </div>
  );
};

// Higher-order component for automatic Arabic alignment
export const withArabicAlignment = <P extends object>(
  Component: React.ComponentType<P>,
  sectionType: 'hero' | 'activities' | 'vision' | 'president' | 'contact' | 'generic' = 'generic'
) => {
  return (props: P) => {
    const { language } = useLanguage();
    const styles = createArabicAlignmentStyles(language);
    
    return (
      <div 
        className={getSectionArabicClasses(language, sectionType)}
        style={styles.section}
      >
        <Component {...props} />
      </div>
    );
  };
};

// Hook for Arabic alignment classes
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
