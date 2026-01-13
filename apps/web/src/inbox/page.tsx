import Link from "next/link";
import { fetchTickets } from "@/lib/api";

export default async function InboxPage() {
  let tickets = [];
  let error: string | null = null;

  try {
    tickets = await fetchTickets();
  } catch (e: any) {
    error = e?.message ?? "Unknown error";
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Inbox</h1>
          <p className="text-sm text-slate-600">
            Shared queue (Email now; WhatsApp later via BSP).
          </p>
        </div>

        <div className="text-xs text-slate-500">
          {process.env.NEXT_PUBLIC_API_URL ? "API connected" : "API not configured"}
        </div>
      </div>

      {error ? (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="font-medium">Can’t reach the API yet.</div>
          <div className="mt-1 text-slate-700">
            Set <code className="px-1 py-0.5 rounded bg-white border">NEXT_PUBLIC_API_URL</code>{" "}
            in Vercel, and ensure the API is deployed.
          </div>
          <div className="mt-2 text-slate-600">Error: {error}</div>
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-md border p-4 text-sm text-slate-700">
          No tickets yet. (We’ll add “Create ticket” next.)
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-2 text-left">Subject</th>
                <th className="px-3 py-2 text-left">Channel</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t: any) => (
                <tr key={t.id} className="border-t">
                  <td className="px-3 py-2">
                    <Link className="hover:underline" href={`/tickets/${t.id}`}>
                      {t.subject}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{t.channel}</td>
                  <td className="px-3 py-2">{t.status}</td>
                  <td className="px-3 py-2">{new Date(t.created_at).toLocaleString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
