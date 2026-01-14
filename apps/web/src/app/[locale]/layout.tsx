import Link from "next/link";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "../../i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  // Enables static rendering when Next tries to prerender routes
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  // Important: bind translations to the locale (don’t rely on headers)
  const t = await getTranslations({ locale, namespace: "app" });

  return {
    title: t("name"),
    description: "Unified inbox (Email + WhatsApp-ready)"
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  // This removes the “used headers” static-render crash with next-intl
  // (and makes prerendering deterministic).
  setRequestLocale(locale);

  // Important: bind messages to the locale (don’t rely on headers)
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: "app" });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-white text-slate-900">
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href={`/${locale}`} className="font-semibold tracking-tight">
              {t("name")}
            </Link>

            <nav className="flex items-center gap-4 text-sm text-slate-600">
              <Link className="hover:text-slate-900" href={`/${locale}/inbox`}>
                {t("nav.inbox")}
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-xs text-slate-500">
          <div className="border-t pt-4">
            {t("footer", { year: new Date().getFullYear() })}
          </div>
        </footer>
      </div>
    </NextIntlClientProvider>
  );
}
