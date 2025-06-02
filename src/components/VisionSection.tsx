import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const arabicNumerals = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];

const VisionSection: React.FC = () => {
  const { language, locale, dir } = useLanguage();

  return (
    <section id="vision" className="py-16 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4" style={{direction: 'rtl', textAlign: 'right'}}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800" style={{textAlign: 'right'}}>
          {locale.vision.title}
        </h2>
        <p className="text-lg mb-12" style={{textAlign: 'right'}}>
          {locale.vision.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locale.vision.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex"
              dir={dir}
            >
              <div className={`flex-shrink-0 w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                {language === 'ar' ? arabicNumerals[index] : index + 1}
              </div>
              <div className={language === 'ar' ? 'flex flex-col items-end' : ''}>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
