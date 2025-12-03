import 'i18next';
import en from './src/locales/en.json';
import ko from './src/locales/ko.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      en: {
        translation: typeof en;
      };
      ko: {
        translation: typeof ko;
      };
    };
  }
}
