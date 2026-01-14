export const dynamic = "force-dynamic";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {fetchTicket, type Ticket} from "../../../../lib/api";
import {locales, type Locale} from "../../../../i18n/routing";
import {notFound} from "next/navigation";

function formatDate(locale: string, iso: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function TicketPage({
  params
}: {
  params: {locale: string; id: string};
}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations("ticket");

  let ticket: Ticket | null = null;
  let error: string | null = null;

  try {
    ticket = await fetchTicket(params.id);
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  if (error || !ticket) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">{t("title")}</h1>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="font-medium">{t("cantLoad")}</div>
          <div className="mt-2 text-slate-600">{error ?? t("notFound")}</div>
        </div>
        <Link className="text-sm hover:underline" href={`/${locale}/inbox`}>
          ← {t("title")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Link className="text-sm text-slate-600 hover:underline" href={`/${locale}/inbox`}>
          ← {t("title")}
        </Link>
      </div>

      <div className="rounded-md border p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">{ticket.subject}</h1>
            <p className="text-sm text-slate-600">
              Channel: {ticket.channel} · Status: {ticket.status}
            </p>
          </div>
          <div className="text-xs text-slate-500">{formatDate(locale, ticket.created_at)}</div>
        </div>

        <div className="mt-4 text-sm text-slate-700">{t("next")}</div>
      </div>
    </div>
  );
}
