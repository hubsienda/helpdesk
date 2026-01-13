import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Unified Inbox</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          A minimal helpdesk for handling requests across channels — starting with email,
          then upgrading to WhatsApp workflows when you’re ready.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/inbox"
            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Open Inbox
          </Link>

          <Link
            href="/inbox"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            View tickets →
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">Clean queue</div>
          <div className="mt-1 text-xs text-slate-600">Assign, tag, track, close.</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">Fast replies</div>
          <div className="mt-1 text-xs text-slate-600">Templates and draft replies.</div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-medium">Workflow-ready</div>
          <div className="mt-1 text-xs text-slate-600">Escalation and audit trails.</div>
        </div>
      </div>
    </div>
  );
}
