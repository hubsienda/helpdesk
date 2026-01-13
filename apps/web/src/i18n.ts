import {getRequestConfig} from "next-intl/server";
import {locales, defaultLocale, type Locale} from "./i18n/routing";

export default getRequestConfig(async ({locale}) => {
  const safeLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default
  };
});
