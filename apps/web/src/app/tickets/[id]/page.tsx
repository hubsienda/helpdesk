import Link from "next/link";
import { fetchTicket } from "@/lib/api";

export default async function TicketPage({ params }: { params: { id: string } }) {
  let ticket: any = null;
  let error: string | null = null;

  try {
    ticket = await fetchTicket(params.id);
  } catch (e: any) {
    error = e?.message ?? "Unknown error";
  }

  if (error) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Ticket</h1>
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="font-medium">Can’t load ticket.</div>
          <div className="mt-2 text-slate-600">Error: {error}</div>
        </div>
        <Link className="text-sm hover:underline" href="/inbox">← Back to Inbox</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Link className="text-sm text-slate-600 hover:underline" href="/inbox">
          ← Back to Inbox
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
          <div className="text-xs text-slate-500">
            {new Date(ticket.created_at).toLocaleString("en-GB")}
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-700">
          Next: message timeline + internal notes + reply composer.
        </div>
      </div>
    </div>
  );
}
