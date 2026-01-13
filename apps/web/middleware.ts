import createMiddleware from "next-intl/middleware";
import {locales, defaultLocale} from "./src/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always"
});

export const config = {
  matcher: ["/", "/(en|es|it)/:path*"]
};
