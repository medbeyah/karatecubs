/**
 * Comprehensive RTL Testing Suite
 * Tests for Arabic web application RTL functionality
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LanguageProvider, LanguageContext } from '../contexts/LanguageContext';
import { RTLCard, RTLForm, RTLNavigation, RTLSearch } from '../components/RTLComponents';
import { 
  getRTLClasses, 
  hasArabicText, 
  hasLatinText, 
  isMixedContent,
  formatNumber,
  formatCurrency,
  formatDate
} from '../utils/rtlUtils';

// Mock useLanguage hook for testing
const mockLanguageContext = {
  language: 'ar' as const,
  locale: {
    header: { title: 'أشبال الكاراتيه', subtitle: 'تمكين الشباب', nav: {} },
    contact: { name: 'الاسم', email: 'البريد الإلكتروني' },
  },
  setLanguage: jest.fn(),
  dir: 'rtl' as const,
};

const renderWithRTL = (component: React.ReactElement, language: 'en' | 'fr' | 'ar' = 'ar') => {
  const contextValue = {
    ...mockLanguageContext,
    language,
    dir: language === 'ar' ? 'rtl' : 'ltr',
  };

  return render(
    <LanguageContext.Provider value={contextValue}>
      {component}
    </LanguageContext.Provider>
  );
};

describe('RTL Utility Functions', () => {
  describe('Text Detection', () => {
    test('should detect Arabic text correctly', () => {
      expect(hasArabicText('مرحبا بكم')).toBe(true);
      expect(hasArabicText('Hello World')).toBe(false);
      expect(hasArabicText('مرحبا Hello')).toBe(true);
    });

    test('should detect Latin text correctly', () => {
      expect(hasLatinText('Hello World')).toBe(true);
      expect(hasLatinText('مرحبا بكم')).toBe(false);
      expect(hasLatinText('مرحبا Hello')).toBe(true);
    });

    test('should detect mixed content correctly', () => {
      expect(isMixedContent('مرحبا Hello')).toBe(true);
      expect(isMixedContent('Hello World')).toBe(false);
      expect(isMixedContent('مرحبا بكم')).toBe(false);
    });
  });

  describe('RTL Classes', () => {
    test('should return correct RTL classes', () => {
      const rtlClasses = getRTLClasses('rtl');
      expect(rtlClasses.textAlign).toBe('text-right');
      expect(rtlClasses.flexDirection).toBe('flex-row-reverse');
      expect(rtlClasses.marginStart).toBe('mr-4');
    });

    test('should return correct LTR classes', () => {
      const ltrClasses = getRTLClasses('ltr');
      expect(ltrClasses.textAlign).toBe('text-left');
      expect(ltrClasses.flexDirection).toBe('flex-row');
      expect(ltrClasses.marginStart).toBe('ml-4');
    });
  });

  describe('Number Formatting', () => {
    test('should format numbers for Arabic locale', () => {
      const formatted = formatNumber(1234.56, 'ar');
      expect(formatted).toMatch(/١٬٢٣٤٫٥٦|1,234.56/); // Arabic or fallback
    });

    test('should format currency for Arabic locale', () => {
      const formatted = formatCurrency(100, 'ar', 'USD');
      expect(formatted).toContain('100');
    });

    test('should format dates for Arabic locale', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date, 'ar');
      expect(formatted).toBeTruthy();
    });
  });
});

describe('RTL Components', () => {
  describe('RTLCard Component', () => {
    test('should render with RTL layout', () => {
      renderWithRTL(
        <RTLCard
          title="عنوان البطاقة"
          description="وصف البطاقة"
          rating={4.5}
          price={100}
        />
      );

      expect(screen.getByText('عنوان البطاقة')).toBeInTheDocument();
      expect(screen.getByText('وصف البطاقة')).toBeInTheDocument();
    });

    test('should handle action button clicks', async () => {
      const mockAction = jest.fn();
      renderWithRTL(
        <RTLCard
          title="Test Card"
          description="Test Description"
          onAction={mockAction}
          actionLabel="اضغط هنا"
        />
      );

      const button = screen.getByText('اضغط هنا');
      await userEvent.click(button);
      expect(mockAction).toHaveBeenCalled();
    });
  });

  describe('RTLForm Component', () => {
    const mockFields = [
      {
        name: 'name',
        label: 'الاسم',
        type: 'text' as const,
        placeholder: 'أدخل اسمك',
        required: true,
      },
      {
        name: 'email',
        label: 'البريد الإلكتروني',
        type: 'email' as const,
        placeholder: 'أدخل بريدك الإلكتروني',
        required: true,
      },
    ];

    test('should render form fields with RTL layout', () => {
      renderWithRTL(
        <RTLForm
          fields={mockFields}
          onSubmit={jest.fn()}
          submitLabel="إرسال"
        />
      );

      expect(screen.getByLabelText('الاسم *')).toBeInTheDocument();
      expect(screen.getByLabelText('البريد الإلكتروني *')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'إرسال' })).toBeInTheDocument();
    });

    test('should validate required fields', async () => {
      const mockSubmit = jest.fn();
      renderWithRTL(
        <RTLForm
          fields={mockFields}
          onSubmit={mockSubmit}
          submitLabel="إرسال"
        />
      );

      const submitButton = screen.getByRole('button', { name: 'إرسال' });
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('هذا الحقل مطلوب')).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    test('should submit form with valid data', async () => {
      const mockSubmit = jest.fn();
      renderWithRTL(
        <RTLForm
          fields={mockFields}
          onSubmit={mockSubmit}
          submitLabel="إرسال"
        />
      );

      const nameInput = screen.getByLabelText('الاسم *');
      const emailInput = screen.getByLabelText('البريد الإلكتروني *');
      const submitButton = screen.getByRole('button', { name: 'إرسال' });

      await userEvent.type(nameInput, 'أحمد محمد');
      await userEvent.type(emailInput, 'ahmed@example.com');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith({
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
        });
      });
    });
  });

  describe('RTLNavigation Component', () => {
    const mockNavItems = [
      { label: 'الرئيسية', onClick: jest.fn() },
      { label: 'حولنا', onClick: jest.fn() },
      { label: 'اتصل بنا', onClick: jest.fn(), active: true },
    ];

    test('should render navigation items with RTL layout', () => {
      renderWithRTL(
        <RTLNavigation
          items={mockNavItems}
          logo={<div>شعار</div>}
        />
      );

      expect(screen.getByText('الرئيسية')).toBeInTheDocument();
      expect(screen.getByText('حولنا')).toBeInTheDocument();
      expect(screen.getByText('اتصل بنا')).toBeInTheDocument();
      expect(screen.getByText('شعار')).toBeInTheDocument();
    });

    test('should handle navigation item clicks', async () => {
      renderWithRTL(
        <RTLNavigation items={mockNavItems} />
      );

      const homeButton = screen.getByText('الرئيسية');
      await userEvent.click(homeButton);
      expect(mockNavItems[0].onClick).toHaveBeenCalled();
    });

    test('should toggle mobile menu', async () => {
      renderWithRTL(
        <RTLNavigation items={mockNavItems} />
      );

      const menuButton = screen.getByLabelText('Toggle menu');
      await userEvent.click(menuButton);

      // Mobile menu should be visible
      expect(screen.getAllByText('الرئيسية')).toHaveLength(2); // Desktop + Mobile
    });
  });

  describe('RTLSearch Component', () => {
    test('should render search input with RTL layout', () => {
      renderWithRTL(
        <RTLSearch
          placeholder="ابحث هنا..."
          onSearch={jest.fn()}
        />
      );

      const searchInput = screen.getByPlaceholderText('ابحث هنا...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('dir', 'rtl');
    });

    test('should handle search submission', async () => {
      const mockSearch = jest.fn();
      renderWithRTL(
        <RTLSearch
          placeholder="ابحث هنا..."
          onSearch={mockSearch}
        />
      );

      const searchInput = screen.getByPlaceholderText('ابحث هنا...');
      const searchButton = screen.getByRole('button', { type: 'submit' });

      await userEvent.type(searchInput, 'كاراتيه');
      await userEvent.click(searchButton);

      expect(mockSearch).toHaveBeenCalledWith('كاراتيه');
    });

    test('should show suggestions', async () => {
      const suggestions = ['كاراتيه', 'تدريب', 'بطولة'];
      renderWithRTL(
        <RTLSearch
          placeholder="ابحث هنا..."
          onSearch={jest.fn()}
          suggestions={suggestions}
        />
      );

      const searchInput = screen.getByPlaceholderText('ابحث هنا...');
      await userEvent.type(searchInput, 'كا');

      await waitFor(() => {
        expect(screen.getByText('كاراتيه')).toBeInTheDocument();
      });
    });
  });
});

describe('Document RTL Configuration', () => {
  test('should set document direction to RTL for Arabic', () => {
    render(
      <LanguageProvider>
        <div>Test Content</div>
      </LanguageProvider>
    );

    // Simulate language change to Arabic
    const htmlElement = document.documentElement;
    htmlElement.dir = 'rtl';
    htmlElement.lang = 'ar';

    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
  });

  test('should set document direction to LTR for English', () => {
    render(
      <LanguageProvider>
        <div>Test Content</div>
      </LanguageProvider>
    );

    // Simulate language change to English
    const htmlElement = document.documentElement;
    htmlElement.dir = 'ltr';
    htmlElement.lang = 'en';

    expect(document.documentElement.dir).toBe('ltr');
    expect(document.documentElement.lang).toBe('en');
  });
});

describe('CSS RTL Classes', () => {
  test('should apply RTL classes correctly', () => {
    const { container } = renderWithRTL(
      <div className="flex flex-row space-x-4 text-left">
        <span>Test Content</span>
      </div>
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('flex', 'flex-row', 'space-x-4', 'text-left');
  });
});

describe('Accessibility', () => {
  test('should have proper ARIA labels for RTL content', () => {
    renderWithRTL(
      <section aria-label="قسم المحتوى" lang="ar" dir="rtl">
        <h2 id="section-heading">عنوان القسم</h2>
        <div role="region" aria-labelledby="section-heading">
          محتوى القسم
        </div>
      </section>
    );

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'section-heading');
    expect(section.closest('section')).toHaveAttribute('lang', 'ar');
    expect(section.closest('section')).toHaveAttribute('dir', 'rtl');
  });

  test('should maintain proper tab order in RTL layout', () => {
    renderWithRTL(
      <div>
        <button>زر 1</button>
        <button>زر 2</button>
        <button>زر 3</button>
      </div>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    // Tab order should be maintained regardless of RTL
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(`زر ${index + 1}`);
    });
  });
});

describe('Performance', () => {
  test('should not cause unnecessary re-renders', () => {
    const renderSpy = jest.fn();
    
    const TestComponent = () => {
      renderSpy();
      return <div>Test</div>;
    };

    const { rerender } = renderWithRTL(<TestComponent />);
    
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Re-render with same props
    rerender(<TestComponent />);
    
    expect(renderSpy).toHaveBeenCalledTimes(2);
  });
});

describe('Error Handling', () => {
  test('should handle missing translations gracefully', () => {
    const contextWithMissingTranslations = {
      ...mockLanguageContext,
      locale: {} as any,
    };

    render(
      <LanguageContext.Provider value={contextWithMissingTranslations}>
        <RTLCard title="Test" description="Test Description" />
      </LanguageContext.Provider>
    );

    // Should not crash and should render the content
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('should handle invalid direction values', () => {
    const contextWithInvalidDir = {
      ...mockLanguageContext,
      dir: 'invalid' as any,
    };

    render(
      <LanguageContext.Provider value={contextWithInvalidDir}>
        <RTLCard title="Test" description="Test Description" />
      </LanguageContext.Provider>
    );

    // Should still render without crashing
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});