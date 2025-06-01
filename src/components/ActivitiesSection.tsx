import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const ActivitiesSection: React.FC = () => {
  const { locale, dir } = useLanguage();

  return (
    <section id="activities" className="py-16">
      <div className="container mx-auto px-4">
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-700"
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

export default ActivitiesSection;
