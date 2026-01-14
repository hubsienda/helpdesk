export const dynamic = "force-dynamic";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {locales, type Locale} from "../../i18n/routing";
import {notFound} from "next/navigation";

export default async function HomePage({params}: {params: {locale: string}}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations("home");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t("subtitle")}</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/inbox`}
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            {t("openInbox")}
          </Link>

          <Link
            href={`/${locale}/inbox`}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            {t("viewTickets")}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">{t("cards.cleanQueueTitle")}</div>
          <div className="mt-1 text-xs text-slate-600">{t("cards.cleanQueueBody")}</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">{t("cards.fastRepliesTitle")}</div>
          <div className="mt-1 text-xs text-slate-600">{t("cards.fastRepliesBody")}</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">{t("cards.workflowReadyTitle")}</div>
          <div className="mt-1 text-xs text-slate-600">{t("cards.workflowReadyBody")}</div>
        </div>
      </div>
    </div>
  );
}
