/**
 * RTL Implementation Examples
 * Practical examples demonstrating RTL best practices
 */

import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { 
  getRTLClasses, 
  getRTLFormClasses, 
  getRTLCardClasses,
  formatNumber,
  formatCurrency,
  formatDate,
  getIconTransform
} from '../utils/rtlUtils';
import { 
  RTLCard, 
  RTLForm, 
  RTLNavigation, 
  RTLSearch,
  RTLSocialShare,
  RTLBreadcrumb
} from '../components/RTLComponents';
import { 
  Star, 
  Heart, 
  Share2, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Example 1: Basic RTL Layout
export const BasicRTLExample: React.FC = () => {
  const { dir, language, locale } = useLanguage();
  const rtlClasses = getRTLClasses(dir);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${rtlClasses.textAlign}`}>
          {language === 'ar' ? 'أمثلة على التخطيط RTL' : 'RTL Layout Examples'}
        </h1>
        
        {/* Basic Flex Layout */}
        <div className={`flex gap-4 mb-8 ${rtlClasses.flexDirection}`}>
          <div className="flex-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'المحتوى الرئيسي' : 'Main Content'}
            </h2>
            <p className={rtlClasses.textAlign}>
              {language === 'ar' 
                ? 'هذا مثال على المحتوى الرئيسي في تخطيط RTL. يتم محاذاة النص إلى اليمين ويتدفق من اليمين إلى اليسار.'
                : 'This is an example of main content in RTL layout. Text is aligned to the right and flows from right to left.'
              }
            </p>
          </div>
          
          <div className="w-64 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">
              {language === 'ar' ? 'الشريط الجانبي' : 'Sidebar'}
            </h3>
            <ul className="space-y-2">
              <li className={`p-2 bg-gray-100 rounded ${rtlClasses.textAlign}`}>
                {language === 'ar' ? 'عنصر 1' : 'Item 1'}
              </li>
              <li className={`p-2 bg-gray-100 rounded ${rtlClasses.textAlign}`}>
                {language === 'ar' ? 'عنصر 2' : 'Item 2'}
              </li>
              <li className={`p-2 bg-gray-100 rounded ${rtlClasses.textAlign}`}>
                {language === 'ar' ? 'عنصر 3' : 'Item 3'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example 2: Form with RTL Support
export const RTLFormExample: React.FC = () => {
  const { language } = useLanguage();
  
  const formFields = [
    {
      name: 'name',
      label: language === 'ar' ? 'الاسم الكامل' : 'Full Name',
      type: 'text' as const,
      placeholder: language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name',
      required: true,
    },
    {
      name: 'email',
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email Address',
      type: 'email' as const,
      placeholder: language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email',
      required: true,
    },
    {
      name: 'phone',
      label: language === 'ar' ? 'رقم الهاتف' : 'Phone Number',
      type: 'tel' as const,
      placeholder: language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number',
    },
    {
      name: 'message',
      label: language === 'ar' ? 'الرسالة' : 'Message',
      type: 'textarea' as const,
      placeholder: language === 'ar' ? 'اكتب رسالتك هنا' : 'Write your message here',
      required: true,
    },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    console.log('Form submitted:', data);
    alert(language === 'ar' ? 'تم إرسال النموذج بنجاح!' : 'Form submitted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'ar' ? 'نموذج اتصال RTL' : 'RTL Contact Form'}
      </h2>
      
      <RTLForm
        fields={formFields}
        onSubmit={handleSubmit}
        submitLabel={language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
      />
    </div>
  );
};

// Example 3: Card Grid with RTL Support
export const RTLCardGridExample: React.FC = () => {
  const { language } = useLanguage();
  
  const activities = [
    {
      title: language === 'ar' ? 'التدريب الأسبوعي' : 'Weekly Training',
      description: language === 'ar' 
        ? 'جلسات تدريبية منتظمة لجميع المستويات، تركز على التقنية والشكل والانضباط.'
        : 'Regular training sessions for all levels, focusing on technique, form, and discipline.',
      icon: <Star size={24} />,
      rating: 4.8,
      price: 50,
      date: new Date(),
    },
    {
      title: language === 'ar' ? 'ورش العمل' : 'Workshops',
      description: language === 'ar'
        ? 'ورش عمل خاصة يقودها مدربون دوليون لتعريض أعضائنا لأساليب ومناهج مختلفة.'
        : 'Special workshops led by international instructors to expose our members to different styles and approaches.',
      icon: <Calendar size={24} />,
      rating: 4.9,
      price: 75,
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    {
      title: language === 'ar' ? 'البطولات المحلية' : 'Local Tournaments',
      description: language === 'ar'
        ? 'مسابقات محلية منتظمة لبناء الثقة والروح التنافسية بين أعضائنا.'
        : 'Regular local competitions to build confidence and competitive spirit among our members.',
      icon: <Heart size={24} />,
      rating: 4.7,
      price: 25,
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {language === 'ar' ? 'أنشطة الكاراتيه' : 'Karate Activities'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity, index) => (
          <RTLCard
            key={index}
            title={activity.title}
            description={activity.description}
            icon={activity.icon}
            rating={activity.rating}
            price={activity.price}
            date={activity.date}
            onAction={() => console.log(`Action for ${activity.title}`)}
            actionLabel={language === 'ar' ? 'اشترك الآن' : 'Register Now'}
          />
        ))}
      </div>
    </div>
  );
};

// Example 4: Navigation with RTL Support
export const RTLNavigationExample: React.FC = () => {
  const { language } = useLanguage();
  
  const navItems = [
    {
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      onClick: () => console.log('Home clicked'),
      active: true,
    },
    {
      label: language === 'ar' ? 'الأنشطة' : 'Activities',
      onClick: () => console.log('Activities clicked'),
    },
    {
      label: language === 'ar' ? 'حولنا' : 'About',
      onClick: () => console.log('About clicked'),
    },
    {
      label: language === 'ar' ? 'اتصل بنا' : 'Contact',
      onClick: () => console.log('Contact clicked'),
    },
  ];

  return (
    <div className="mb-8">
      <RTLNavigation
        items={navItems}
        logo={
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              K
            </div>
            <span className="font-bold text-xl">
              {language === 'ar' ? 'أشبال الكاراتيه' : 'Karate Cubs'}
            </span>
          </div>
        }
        actions={
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            {language === 'ar' ? 'انضم إلينا' : 'Join Us'}
          </button>
        }
      />
    </div>
  );
};

// Example 5: Search with Suggestions
export const RTLSearchExample: React.FC = () => {
  const { language } = useLanguage();
  
  const suggestions = language === 'ar' 
    ? ['كاراتيه', 'تدريب', 'بطولة', 'ورشة عمل', 'مدرب']
    : ['karate', 'training', 'tournament', 'workshop', 'instructor'];

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    alert(`${language === 'ar' ? 'البحث عن' : 'Searching for'}: ${query}`);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'البحث مع الاقتراحات' : 'Search with Suggestions'}
      </h3>
      
      <RTLSearch
        placeholder={language === 'ar' ? 'ابحث عن الأنشطة...' : 'Search for activities...'}
        onSearch={handleSearch}
        suggestions={suggestions}
      />
    </div>
  );
};

// Example 6: Social Sharing
export const RTLSocialShareExample: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'مشاركة اجتماعية' : 'Social Sharing'}
      </h3>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2">
          {language === 'ar' ? 'انضم إلى أشبال الكاراتيه' : 'Join Karate Cubs'}
        </h4>
        <p className="text-gray-600 mb-4">
          {language === 'ar' 
            ? 'تعلم فنون الدفاع عن النفس وابني شخصيتك مع أفضل المدربين'
            : 'Learn martial arts and build character with the best instructors'
          }
        </p>
        
        <RTLSocialShare
          url="https://karatecubs.com"
          title={language === 'ar' ? 'أشبال الكاراتيه' : 'Karate Cubs'}
          description={language === 'ar' 
            ? 'تعلم فنون الدفاع عن النفس'
            : 'Learn martial arts'
          }
        />
      </div>
    </div>
  );
};

// Example 7: Breadcrumb Navigation
export const RTLBreadcrumbExample: React.FC = () => {
  const { language } = useLanguage();
  
  const breadcrumbItems = [
    {
      label: language === 'ar' ? 'الرئيسية' : 'Home',
      onClick: () => console.log('Home clicked'),
    },
    {
      label: language === 'ar' ? 'الأنشطة' : 'Activities',
      onClick: () => console.log('Activities clicked'),
    },
    {
      label: language === 'ar' ? 'التدريب الأسبوعي' : 'Weekly Training',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <RTLBreadcrumb items={breadcrumbItems} />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'التدريب الأسبوعي' : 'Weekly Training'}
        </h1>
        <p>
          {language === 'ar'
            ? 'تفاصيل حول برنامج التدريب الأسبوعي وكيفية الانضمام إليه.'
            : 'Details about the weekly training program and how to join.'
          }
        </p>
      </div>
    </div>
  );
};

// Example 8: Mixed Content Handling
export const RTLMixedContentExample: React.FC = () => {
  const { dir, language } = useLanguage();
  
  const mixedContent = [
    {
      text: language === 'ar' ? 'البريد الإلكتروني: admin@karatecubs.com' : 'Email: admin@karatecubs.com',
      hasEmail: true,
    },
    {
      text: language === 'ar' ? 'الهاتف: +1-555-0123' : 'Phone: +1-555-0123',
      hasPhone: true,
    },
    {
      text: language === 'ar' ? 'العنوان: 123 Main Street, City' : 'Address: 123 Main Street, City',
      hasAddress: true,
    },
    {
      text: language === 'ar' ? 'السعر: $50 USD' : 'Price: $50 USD',
      hasPrice: true,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'التعامل مع المحتوى المختلط' : 'Mixed Content Handling'}
      </h3>
      
      <div className="space-y-4">
        {mixedContent.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p dir="auto" className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {item.text}
            </p>
            
            {/* Extract and display LTR parts separately */}
            {item.hasEmail && (
              <div className="mt-2 text-sm text-gray-600">
                <span className={dir === 'rtl' ? 'float-left' : 'float-right'} dir="ltr">
                  admin@karatecubs.com
                </span>
                <div className="clear-both"></div>
              </div>
            )}
            
            {item.hasPhone && (
              <div className="mt-2 text-sm text-gray-600">
                <span className={dir === 'rtl' ? 'float-left' : 'float-right'} dir="ltr">
                  +1-555-0123
                </span>
                <div className="clear-both"></div>
              </div>
            )}
            
            {item.hasPrice && (
              <div className="mt-2 text-sm text-gray-600">
                <span className={dir === 'rtl' ? 'float-left' : 'float-right'} dir="ltr">
                  $50 USD
                </span>
                <div className="clear-both"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Examples Component
export const RTLExamples: React.FC = () => {
  const [activeExample, setActiveExample] = useState(0);
  const { language } = useLanguage();
  
  const examples = [
    { name: language === 'ar' ? 'تخطيط أساسي' : 'Basic Layout', component: BasicRTLExample },
    { name: language === 'ar' ? 'نموذج RTL' : 'RTL Form', component: RTLFormExample },
    { name: language === 'ar' ? 'شبكة البطاقات' : 'Card Grid', component: RTLCardGridExample },
    { name: language === 'ar' ? 'التنقل' : 'Navigation', component: RTLNavigationExample },
    { name: language === 'ar' ? 'البحث' : 'Search', component: RTLSearchExample },
    { name: language === 'ar' ? 'المشاركة' : 'Social Share', component: RTLSocialShareExample },
    { name: language === 'ar' ? 'التنقل التفصيلي' : 'Breadcrumb', component: RTLBreadcrumbExample },
    { name: language === 'ar' ? 'المحتوى المختلط' : 'Mixed Content', component: RTLMixedContentExample },
  ];
  
  const ActiveComponent = examples[activeExample].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Example Selector */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'أمثلة تطبيق RTL' : 'RTL Implementation Examples'}
          </h1>
          
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeExample === index
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Active Example */}
      <div className="py-8">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default RTLExamples;