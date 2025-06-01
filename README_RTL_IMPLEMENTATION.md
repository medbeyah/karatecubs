# RTL Implementation for Arabic Web Applications

This repository contains a comprehensive implementation guide and practical examples for creating right-to-left (RTL) web applications using React, Vite, and Tailwind CSS, specifically optimized for Arabic language support.

## 📁 Project Structure

```
project/
├── RTL_IMPLEMENTATION_GUIDE.md     # Comprehensive implementation guide
├── tailwind-rtl.config.js          # Enhanced Tailwind config with RTL support
├── src/
│   ├── utils/rtlUtils.ts           # RTL utility functions and helpers
│   ├── components/RTLComponents.tsx # RTL-aware React components
│   ├── examples/RTLExamples.tsx    # Practical implementation examples
│   ├── tests/rtl.test.tsx          # Testing suite for RTL functionality
│   ├── contexts/LanguageContext.tsx # Language and direction management
│   └── index.css                   # RTL-optimized CSS styles
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Tailwind CSS for RTL

Replace your `tailwind.config.js` with the enhanced RTL configuration:

```bash
cp tailwind-rtl.config.js tailwind.config.js
```

### 3. Import RTL Utilities

```typescript
import { 
  getRTLClasses, 
  formatNumber, 
  formatCurrency,
  hasArabicText,
  isMixedContent 
} from './utils/rtlUtils';
```

### 4. Use RTL Components

```tsx
import { RTLCard, RTLForm, RTLNavigation } from './components/RTLComponents';

// Example usage
<RTLCard
  title="عنوان البطاقة"
  description="وصف البطاقة"
  onAction={() => console.log('Action clicked')}
  actionLabel="اضغط هنا"
/>
```

## 🎯 Key Features

### ✅ Complete RTL Support
- **Document-level RTL configuration** with automatic direction switching
- **CSS strategies** for universal RTL layout with high specificity selectors
- **Component-level RTL awareness** with conditional styling
- **Mixed content handling** for Arabic/Latin text combinations

### ✅ Typography & Fonts
- **Arabic font optimization** with IBM Plex Sans Arabic
- **Font loading strategies** with fallbacks and performance optimization
- **Text direction detection** for automatic content alignment

### ✅ UI Components
- **RTL-aware form components** with proper validation and error handling
- **Navigation components** with mobile menu support
- **Card layouts** with flexible content arrangement
- **Search functionality** with Arabic text suggestions
- **Social sharing** with proper RTL icon handling

### ✅ Responsive Design
- **Mobile-first RTL breakpoints** with proper flex/grid behavior
- **Cross-device compatibility** with consistent RTL rendering
- **Performance optimization** for RTL-specific resources

### ✅ Accessibility
- **Screen reader compatibility** with proper ARIA labels
- **Keyboard navigation** support in RTL layouts
- **Semantic HTML structure** for better accessibility

## 📖 Implementation Guide

### Basic RTL Setup

1. **HTML Configuration**
```html
<html lang="ar" dir="rtl">
```

2. **CSS Base Styles**
```css
html[lang="ar"] {
  direction: rtl;
  text-align: right;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
}
```

3. **React Context Setup**
```tsx
const { dir, language, locale } = useLanguage();

// Apply RTL classes conditionally
<div className={`flex ${dir === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
```

### Advanced RTL Patterns

#### 1. Form Handling
```tsx
<input
  dir={getContentDirection(value, dir)}
  className={`${dir === 'rtl' ? 'text-right' : 'text-left'}`}
/>
```

#### 2. Icon Direction
```tsx
<ArrowRight 
  className={`${dir === 'rtl' ? 'transform scale-x-[-1]' : ''}`}
/>
```

#### 3. Mixed Content
```tsx
<div dir="auto" className={dir === 'rtl' ? 'text-right' : 'text-left'}>
  {mixedArabicEnglishText}
</div>
```

## 🛠 Utility Functions

### Text Detection
```typescript
hasArabicText('مرحبا بكم')     // true
hasLatinText('Hello World')   // true
isMixedContent('مرحبا Hello') // true
```

### Number Formatting
```typescript
formatNumber(1234.56, 'ar')           // ١٬٢٣٤٫٥٦
formatCurrency(100, 'ar', 'USD')      // US$ ١٠٠٫٠٠
formatDate(new Date(), 'ar')          // ١ يناير ٢٠٢٤
```

### RTL Classes
```typescript
const rtlClasses = getRTLClasses('rtl');
// Returns: { textAlign: 'text-right', flexDirection: 'flex-row-reverse', ... }
```

## 🎨 Tailwind CSS RTL Utilities

### Custom RTL Classes
```css
.rtl-flip          /* Horizontally flip elements */
.rtl-margin-start  /* Logical margin start */
.rtl-padding-end   /* Logical padding end */
.rtl-border-start  /* Logical border start */
.text-start        /* Text align start */
.text-end          /* Text align end */
```

### Component Classes
```css
.rtl-card          /* RTL-aware card component */
.rtl-form-input    /* RTL-aware form input */
.rtl-nav           /* RTL-aware navigation */
.rtl-flex          /* RTL-aware flex container */
```

## 🧪 Testing

### Running Tests
```bash
# Install testing dependencies first
npm install --save-dev @testing-library/react @testing-library/user-event @types/jest

# Run tests
npm test
```

### Test Coverage
- ✅ RTL utility functions
- ✅ Component rendering in RTL mode
- ✅ Form validation and submission
- ✅ Navigation interaction
- ✅ Search functionality
- ✅ Accessibility compliance
- ✅ Performance optimization

## 📱 Browser Support

| Browser | RTL Support | Notes |
|---------|-------------|-------|
| Chrome  | ✅ Full     | Best performance |
| Firefox | ✅ Full     | Good performance |
| Safari  | ✅ Full     | iOS/macOS optimized |
| Edge    | ✅ Full     | Windows optimized |

## 🔧 Troubleshooting

### Common Issues

#### 1. Font Not Loading
```css
/* Ensure proper font declaration */
@font-face {
  font-family: 'IBM Plex Sans Arabic';
  src: url('./fonts/IBMPlexSansArabic-Regular.woff2') format('woff2');
  font-display: swap;
}
```

#### 2. Spacing Issues
```css
/* Fix Tailwind spacing in RTL */
[dir="rtl"] .space-x-4 {
  --tw-space-x-reverse: 1;
}
```

#### 3. Mixed Content Alignment
```tsx
// Use dir="auto" for mixed content
<div dir="auto">{mixedContent}</div>
```

#### 4. Icon Direction
```tsx
// Flip directional icons in RTL
<ArrowRight className={dir === 'rtl' ? 'transform scale-x-[-1]' : ''} />
```

## 📚 Resources

### Documentation
- [RTL_IMPLEMENTATION_GUIDE.md](./RTL_IMPLEMENTATION_GUIDE.md) - Complete implementation guide
- [src/examples/RTLExamples.tsx](./src/examples/RTLExamples.tsx) - Live examples
- [src/utils/rtlUtils.ts](./src/utils/rtlUtils.ts) - Utility functions

### External Resources
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [RTL Styling Best Practices](https://rtlstyling.com/)
- [Arabic Typography Guidelines](https://www.w3.org/International/articles/arabic-type/)

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Run tests: `npm test`

### Code Style
- Use TypeScript for type safety
- Follow RTL-first design principles
- Include accessibility considerations
- Add tests for new functionality

### Pull Request Guidelines
1. Ensure all tests pass
2. Add tests for new features
3. Update documentation
4. Follow existing code patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **IBM Plex Sans Arabic** for excellent Arabic typography
- **Tailwind CSS** for flexible utility-first styling
- **React** for component-based architecture
- **Vite** for fast development experience

---

## 📞 Support

For questions or issues related to RTL implementation:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review the [implementation guide](./RTL_IMPLEMENTATION_GUIDE.md)
3. Examine the [examples](./src/examples/RTLExamples.tsx)
4. Create an issue with detailed reproduction steps

---

**Made with ❤️ for the Arabic web development community**