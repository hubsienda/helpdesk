import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always"
});

export const config = {
  matcher: [
    // Exclude Next internals + API + common static files + anything with a dot
    "/((?!api|_next|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)"
  ]
};
