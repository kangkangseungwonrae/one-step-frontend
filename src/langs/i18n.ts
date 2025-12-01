import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_settings from './resources/en/settings.json';
import ko_settings from './resources/ko/settings.json';

const resources = {
  'ko-KR': {
    settings: ko_settings,
  },
  'en-US': {
    settings: en_settings,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'ko-KR', // 기본 언어 설정
});

export default i18n;
