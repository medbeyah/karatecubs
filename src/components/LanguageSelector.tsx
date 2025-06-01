import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language, languages } from '../locales';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, locale } = useLanguage();

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">{locale.language}</label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent cursor-pointer"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
