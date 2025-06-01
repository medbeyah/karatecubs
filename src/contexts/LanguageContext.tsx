import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Locale, Language, en, fr, ar } from '../locales';

type LanguageContextType = {
  language: Language;
  locale: Locale;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  locale: en,
  setLanguage: () => {},
  dir: 'ltr',
});

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [locale, setLocale] = useState<Locale>(en);
  
  useEffect(() => {
    // Detect browser language
    const detectLanguage = (): Language => {
      const browserLang = navigator.language.split('-')[0];
      
      if (browserLang === 'fr') return 'fr';
      if (browserLang === 'ar') return 'ar';
      
      // Default to English
      return 'en';
    };
    
    setLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    // Update document direction for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update document language attribute
    document.documentElement.lang = language;
    
    // Update locale based on selected language
    switch(language) {
      case 'fr':
        setLocale(fr);
        break;
      case 'ar':
        setLocale(ar);
        break;
      default:
        setLocale(en);
    }
  }, [language]);

  const contextValue: LanguageContextType = {
    language,
    locale,
    setLanguage,
    dir: language === 'ar' ? 'rtl' : 'ltr'
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};