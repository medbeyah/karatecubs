import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { locale, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const handleScroll = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className={`flex items-center space-x-4 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
          <a href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt={locale.header.title}
              className="h-12 md:h-16 w-auto"
            />
          </a>
          <div className="flex flex-col">
            <h1 className={`text-xl md:text-3xl font-bold text-red-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
              {locale.header.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap" dir={dir}>
              {locale.header.subtitle}
            </p>
          </div>
        </div>
        
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-700 hover:text-red-700 transition duration-150"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className={`hidden lg:flex items-center space-x-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
          <button 
            onClick={() => handleScroll('activities')} 
            className="text-gray-800 hover:text-red-700 transition duration-150"
          >
            {locale.header.nav.activities}
          </button>
          <button 
            onClick={() => handleScroll('vision')} 
            className="text-gray-800 hover:text-red-700 transition duration-150"
          >
            {locale.header.nav.vision}
          </button>
          <button 
            onClick={() => handleScroll('president')} 
            className="text-gray-800 hover:text-red-700 transition duration-150"
          >
            {locale.header.nav.president}
          </button>
          <button 
            onClick={() => handleScroll('contact')} 
            className="text-gray-800 hover:text-red-700 transition duration-150"
          >
            {locale.header.nav.contact}
          </button>
          <LanguageSelector />
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => handleScroll('activities')}
              className={`text-gray-800 hover:text-red-700 transition duration-150 py-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {locale.header.nav.activities}
            </button>
            <button
              onClick={() => handleScroll('vision')}
              className={`text-gray-800 hover:text-red-700 transition duration-150 py-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {locale.header.nav.vision}
            </button>
            <button
              onClick={() => handleScroll('president')}
              className={`text-gray-800 hover:text-red-700 transition duration-150 py-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {locale.header.nav.president}
            </button>
            <button
              onClick={() => handleScroll('contact')}
              className={`text-gray-800 hover:text-red-700 transition duration-150 py-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              {locale.header.nav.contact}
            </button>
            <div className="py-2">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
