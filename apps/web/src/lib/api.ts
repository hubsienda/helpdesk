export type Ticket = {
  id: string;
  subject: string;
  status: "new" | "open" | "waiting" | "closed";
  channel: "email" | "whatsapp" | "web";
  created_at: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function requireBaseUrl(): string {
  if (!baseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_URL. Set it in Vercel project environment variables."
    );
  }
  return baseUrl.replace(/\/+$/, "");
}

export async function fetchTickets(): Promise<Ticket[]> {
  const url = `${requireBaseUrl()}/tickets`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchTicket(id: string): Promise<Ticket> {
  const url = `${requireBaseUrl()}/tickets/${encodeURIComponent(id)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
