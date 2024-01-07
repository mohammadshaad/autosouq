// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome to AutoSouq",
          // Add more keys and translations as needed
        }
      },
      es: {
        translation: {
          "Welcome": "Bienvenido a AutoSouq",
          // Add more keys and translations as needed
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;