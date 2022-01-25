import * as i18n from 'i18next';
import * as HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpApi) // load translation using XMLHttpRequest or the fetch API. -> see /public/locales — https://github.com/i18next/i18next-http-backend
  .use(initReactI18next) // init i18next - https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      loadPath: '/app/locales/{{lng}}/{{ns}}.json',
    },
    // debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    /**
     * Added in version 20.0.0 where it is set to to true by default.
     *
     * For now we use the old behavior by setting this to false.
     *
     * @see https://github.com/i18next/i18next/blob/master/CHANGELOG.md#2000
     */
    ignoreJSONStructure: false,
    lng: 'en',
    defaultNS: 'SERVICE_NAME',
    // N.B. Do not conflict with existing Name Spaces
    ns: [
      'SERVICE_NAME' /* 'common', 'countries', 'navigation', 'forms', 'Client', 'GPAdmin', 'Professional', 'Wizard', 'QMF', 'Reports', 'billingTransactionTypes'*/,
    ],
  });

export default i18n;
