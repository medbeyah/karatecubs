import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const PresidentSection: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section id="president" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img 
              src="/images/president.jpg"
              alt="President Ahmed El Ketab"
              className="rounded-full w-64 h-64 object-cover shadow-lg mx-auto border-4 border-red-700"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">
              {locale.president.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {locale.president.bio}
            </p>
            <div className="flex justify-center md:justify-start gap-2">
              <img src="/images/flags/mr.svg" alt="Mauritania" className="w-8 h-6 rounded-sm shadow" />
              <img src="/images/flags/sn.svg" alt="Senegal" className="w-8 h-6 rounded-sm shadow" />
              <img src="/images/flags/cm.svg" alt="Cameroon" className="w-8 h-6 rounded-sm shadow" />
              <img src="/images/flags/tn.svg" alt="Tunisia" className="w-8 h-6 rounded-sm shadow" />
              <img src="/images/flags/tr.svg" alt="Turkey" className="w-8 h-6 rounded-sm shadow" />
              <img src="/images/flags/us.svg" alt="United States" className="w-8 h-6 rounded-sm shadow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresidentSection;
