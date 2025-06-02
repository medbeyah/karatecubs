import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Hero: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <div className="pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-red-700">
            {locale.header.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl text-gray-700 px-2 sm:px-0">
            {locale.header.subtitle}
          </p>
          <div className="mt-8 sm:mt-12">
            <img 
              src="/images/coupe.jpg"
              alt="Karate competition trophy"
              className="rounded-lg shadow-lg w-full max-w-5xl mx-auto object-cover h-[250px] sm:h-[350px] md:h-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
