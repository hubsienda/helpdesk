import "../globals.css";
import Link from "next/link";
import type {Metadata} from "next";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations} from "next-intl/server";
import {locales, type Locale} from "../../i18n/routing";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app");
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
  params: {locale: string};
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations("app");

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
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
                {t("footer", {year: new Date().getFullYear()})}
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
