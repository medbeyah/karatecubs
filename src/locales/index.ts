import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';

export { en, fr, ar };

export type Locale = typeof en;
export type Language = 'en' | 'fr' | 'ar';

export const languages: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية'
};