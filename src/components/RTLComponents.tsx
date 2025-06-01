/**
 * Enhanced RTL-Aware Components
 * Demonstrating best practices for Arabic web applications
 */

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
  getRTLClasses, 
  getRTLFormClasses, 
  getRTLCardClasses,
  getRTLNavClasses,
  formatNumber,
  formatCurrency,
  formatDate,
  getIconTransform,
  isMixedContent,
  getContentDirection
} from '../utils/rtlUtils';
import { 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Star,
  Heart,
  Share2
} from 'lucide-react';

// Enhanced Card Component with RTL Support
export const RTLCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
  rating?: number;
  price?: number;
  date?: Date;
  onAction?: () => void;
  actionLabel?: string;
}> = ({ title, description, icon, rating, price, date, onAction, actionLabel }) => {
  const { dir, language, locale } = useLanguage();
  const cardClasses = getRTLCardClasses(dir);
  
  return (
    <div className={cardClasses.container}>
      <div className={cardClasses.header}>
        {icon && (
          <div className={cardClasses.icon}>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              {icon}
            </div>
          </div>
        )}
        <div className={cardClasses.content}>
          <h3 className="text-xl font-semibold mb-2" dir={getContentDirection(title, dir)}>
            {title}
          </h3>
          <p className="text-gray-600 mb-4" dir={getContentDirection(description, dir)}>
            {description}
          </p>
          
          {/* Rating Display */}
          {rating && (
            <div className={`flex items-center gap-2 mb-2 ${
              dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {formatNumber(rating, language, { minimumFractionDigits: 1 })}
              </span>
            </div>
          )}
          
          {/* Price Display */}
          {price && (
            <div className="mb-2">
              <span className="text-lg font-bold text-red-600" dir="ltr">
                {formatCurrency(price, language)}
              </span>
            </div>
          )}
          
          {/* Date Display */}
          {date && (
            <div className="text-sm text-gray-500 mb-4">
              <Calendar size={14} className="inline mr-1" />
              {formatDate(date, language)}
            </div>
          )}
          
          {/* Action Button */}
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${
                dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <span>{actionLabel}</span>
              <ArrowRight 
                size={16} 
                className={getIconTransform(dir, true)}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Form Component with RTL Support
export const RTLForm: React.FC<{
  onSubmit: (data: Record<string, string>) => void;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    placeholder?: string;
    required?: boolean;
    validation?: (value: string) => string | null;
  }>;
  submitLabel: string;
}> = ({ onSubmit, fields, submitLabel }) => {
  const { dir, language, locale } = useLanguage();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      const value = formData[field.name] || '';
      
      if (field.required && !value.trim()) {
        newErrors[field.name] = language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
      } else if (field.validation) {
        const error = field.validation(value);
        if (error) newErrors[field.name] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(formData);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map(field => {
        const formClasses = getRTLFormClasses(dir, !!errors[field.name]);
        const fieldValue = formData[field.name] || '';
        
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className={formClasses.label}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                value={fieldValue}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                dir={getContentDirection(fieldValue, dir)}
                className={`${formClasses.input} min-h-[100px] resize-vertical`}
                rows={4}
              />
            ) : (
              <div className="relative">
                <input
                  id={field.name}
                  type={field.type}
                  value={fieldValue}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  dir={field.type === 'email' || field.type === 'tel' ? 'ltr' : getContentDirection(fieldValue, dir)}
                  className={formClasses.input}
                />
                
                {/* Field Icons */}
                <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                  dir === 'rtl' ? 'left-3' : 'right-3'
                }`}>
                  {field.type === 'email' && <Mail size={16} className="text-gray-400" />}
                  {field.type === 'tel' && <Phone size={16} className="text-gray-400" />}
                  {field.type === 'text' && field.name.includes('name') && 
                    <User size={16} className="text-gray-400" />}
                </div>
              </div>
            )}
            
            {errors[field.name] && (
              <div className={formClasses.error} role="alert">
                {errors[field.name]}
              </div>
            )}
          </div>
        );
      })}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
          dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>{submitLabel}</span>
            <ArrowRight size={16} className={getIconTransform(dir, true)} />
          </>
        )}
      </button>
    </form>
  );
};

// Enhanced Navigation Component
export const RTLNavigation: React.FC<{
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ items, logo, actions }) => {
  const { dir } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navClasses = getRTLNavClasses(dir);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {logo && (
            <div className={`flex items-center ${dir === 'rtl' ? 'order-3' : 'order-1'}`}>
              {logo}
            </div>
          )}
          
          {/* Desktop Navigation */}
          <div className={`hidden md:flex ${navClasses.container} ${dir === 'rtl' ? 'order-1' : 'order-2'}`}>
            {items.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`${navClasses.item} ${
                  item.active ? 'text-red-700 font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className={`flex items-center ${dir === 'rtl' ? 'order-2' : 'order-3'}`}>
              {actions}
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 bg-gray-600 transition-transform ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`} />
              <span className={`block h-0.5 bg-gray-600 transition-opacity ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block h-0.5 bg-gray-600 transition-transform ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`} />
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className={navClasses.mobileContainer}>
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${navClasses.mobileItem} ${
                    item.active ? 'text-red-700 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Search Component with RTL Support
export const RTLSearch: React.FC<{
  placeholder: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
}> = ({ placeholder, onSearch, suggestions = [] }) => {
  const { dir, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (query && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [query, suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          dir={getContentDirection(query, dir)}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
            dir === 'rtl' ? 'pr-12 text-right' : 'pl-12 text-left'
          }`}
        />
        <button
          type="submit"
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            dir === 'rtl' ? 'left-3' : 'right-3'
          } text-gray-400 hover:text-red-600 transition-colors`}
        >
          <Search size={20} />
        </button>
      </form>
      
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className={`absolute top-full ${
          dir === 'rtl' ? 'right-0' : 'left-0'
        } w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50`}>
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
                setShowSuggestions(false);
              }}
              className={`w-full px-4 py-2 text-sm hover:bg-gray-50 ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${
                index === filteredSuggestions.length - 1 ? 'rounded-b-lg' : ''
              }`}
              dir={getContentDirection(suggestion, dir)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Social Share Component with RTL Support
export const RTLSocialShare: React.FC<{
  url: string;
  title: string;
  description?: string;
}> = ({ url, title, description }) => {
  const { dir, locale, language } = useLanguage();
  
  const shareButtons = [
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
      <span className="text-sm text-gray-600">
        {language === 'ar' ? 'مشاركة' : language === 'fr' ? 'Partager' : 'Share'}:
      </span>
      
      {/* Native Share (if supported) */}
      {'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Share"
        >
          <Share2 size={16} className="text-gray-600" />
        </button>
      )}
      
      {/* Social Media Buttons */}
      {shareButtons.map((button) => (
        <button
          key={button.name}
          onClick={() => handleShare(button.url)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={`Share on ${button.name}`}
        >
          <span className="text-lg">{button.icon}</span>
        </button>
      ))}
    </div>
  );
};

// Breadcrumb Component with RTL Support
export const RTLBreadcrumb: React.FC<{
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}> = ({ items }) => {
  const { dir } = useLanguage();
  
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex items-center space-x-2 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ArrowRight 
                size={14} 
                className={`mx-2 text-gray-400 ${getIconTransform(dir, true)}`}
              />
            )}
            {index === items.length - 1 ? (
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              <button
                onClick={item.onClick}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};