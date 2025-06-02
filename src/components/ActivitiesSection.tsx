import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const ActivitiesSection: React.FC = () => {
  const { locale, dir } = useLanguage();

  return (
    <section id="activities" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center text-gray-800">
          {locale.activities.title}
        </h2>
        <p className="text-base sm:text-lg text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-2 sm:px-0">
          {locale.activities.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locale.activities.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-700"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">
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

export default ActivitiesSection;
