import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Facebook } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-gray-800">
          {locale.contact.title}
        </h2>

        <div className="max-w-4xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-base"
                  placeholder={locale.contact.placeholders.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder={locale.contact.placeholders.email}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {locale.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder={locale.contact.placeholders.message}
                />
              </div>
              <button
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition duration-150 ease-in-out text-base"
              >
                {locale.contact.submit}
              </button>
              
              {status === 'success' && (
                <p className="text-green-600 mt-2">{locale.contact.success}</p>
              )}
              {status === 'error' && (
                <p className="text-red-700 mt-2">{locale.contact.error}</p>
              )}
            </form>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-4">{locale.contact.followUs}</h3>
            <a
              href="https://web.facebook.com/profile.php?id=100081279337283&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-150"
            >
              <Facebook size={24} className="mr-2" />
              Facebook
            </a>
            
            <div className="mt-8">
              <img 
                src="https://images.pexels.com/photos/7045551/pexels-photo-7045551.jpeg"
                alt="Karate training"
                className="rounded-lg shadow-md h-48 sm:h-64 w-full object-cover mt-6 sm:mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
