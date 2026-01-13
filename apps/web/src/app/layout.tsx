import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helpdesk",
  description: "Unified inbox (Email + WhatsApp-ready)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <div className="min-h-screen">
          <header className="border-b">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">Helpdesk</div>
              <nav className="text-sm text-slate-600">
                <a className="hover:text-slate-900" href="/inbox">Inbox</a>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
