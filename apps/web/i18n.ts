import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './src/i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;

  const locale =
    requested && locales.includes(requested as (typeof locales)[number])
      ? (requested as (typeof locales)[number])
      : defaultLocale;

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
});
