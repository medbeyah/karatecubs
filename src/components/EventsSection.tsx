import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import VideoPlayer from './VideoPlayer';

const EventsSection: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          {locale.events.title}
        </h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          {locale.events.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locale.events.items.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  alt={item.caption}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <VideoPlayer 
                  src={item.src}
                  caption={item.caption}
                  className="w-full h-64"
                />
              )}
              <div className="p-4 bg-white">
                <p className="text-gray-600">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
