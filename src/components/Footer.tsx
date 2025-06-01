import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { locale } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg font-semibold mb-4 md:mb-0">
            {locale.header.title} &copy; {currentYear}
          </p>
          <div className="flex space-x-4 items-center">
            <a
              href="https://web.facebook.com/profile.php?id=100081279337283&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-400 transition duration-150"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;