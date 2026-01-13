import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {fetchTickets, type Ticket} from "../../../lib/api";
import {locales, type Locale} from "../../../i18n/routing";
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

export default async function InboxPage({params}: {params: {locale: string}}) {
  const locale = params.locale as Locale;
  if (!locales.includes(locale)) notFound();

  const t = await getTranslations("inbox");

  let tickets: Ticket[] = [];
  let error: string | null = null;

  try {
    tickets = await fetchTickets();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-slate-600">{t("subtitle")}</p>
        </div>

        <div className="text-xs text-slate-500">
          {process.env.NEXT_PUBLIC_API_URL ? t("apiConfigured") : t("apiNotConfigured")}
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="font-medium">{t("apiWarningTitle")}</div>
          <div className="mt-1 text-slate-700">{t("apiWarningBody")}</div>
          <div className="mt-2 text-slate-600">Error: {error}</div>
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-md border p-4 text-sm text-slate-700">{t("empty")}</div>
      ) : (
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left">{t("table.subject")}</th>
                <th className="px-3 py-2 text-left">{t("table.channel")}</th>
                <th className="px-3 py-2 text-left">{t("table.status")}</th>
                <th className="px-3 py-2 text-left">{t("table.created")}</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tk) => (
                <tr key={tk.id} className="border-t">
                  <td className="px-3 py-2">
                    <Link className="hover:underline" href={`/${locale}/tickets/${tk.id}`}>
                      {tk.subject}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{tk.channel}</td>
                  <td className="px-3 py-2">{tk.status}</td>
                  <td className="px-3 py-2">{formatDate(locale, tk.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
