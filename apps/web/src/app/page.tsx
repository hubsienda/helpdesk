import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Unified Inbox</h1>
      <p className="text-slate-700">
        This is the dashboard shell. Next step: tickets + messages + workflows.
      </p>
      <Link
        href="/inbox"
        className="inline-flex rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
      >
        Go to Inbox
      </Link>
    </div>
  );
}
