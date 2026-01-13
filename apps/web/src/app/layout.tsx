import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Helpdesk",
  description: "Unified inbox (Email + WhatsApp-ready)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="min-h-screen bg-white text-slate-900">
          <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight">
                Helpdesk
              </Link>

              <nav className="flex items-center gap-4 text-sm text-slate-600">
                <Link className="hover:text-slate-900" href="/inbox">
                  Inbox
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

          <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-xs text-slate-500">
            <div className="border-t pt-4">© {new Date().getFullYear()} Helpdesk</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
