from __future__ import annotations

from datetime import datetime, timezone
from typing import Dict, List, Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import os

Channel = Literal["email", "whatsapp", "web"]
Status = Literal["new", "open", "waiting", "closed"]

app = FastAPI(title="Helpdesk API", version="0.1.0")

# CORS: set CORS_ORIGINS on your API host to your Vercel domain(s), comma-separated.
origins_env = os.getenv("CORS_ORIGINS", "")
origins = [o.strip() for o in origins_env.split(",") if o.strip()] or ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory storage (v0) ---
# This is just to get the full pipeline working.
# Next step: replace with PostgreSQL tables.
TICKETS: Dict[str, dict] = {}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class TicketOut(BaseModel):
    id: str
    subject: str
    status: Status
    channel: Channel
    created_at: str


class TicketCreate(BaseModel):
    subject: str = Field(min_length=3, max_length=200)
    channel: Channel = "email"


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "helpdesk-api"}


@app.get("/tickets", response_model=List[TicketOut])
def list_tickets() -> List[TicketOut]:
    return [TicketOut(**t) for t in TICKETS.values()]


@app.post("/tickets", response_model=TicketOut)
def create_ticket(payload: TicketCreate) -> TicketOut:
    tid = str(uuid4())
    ticket = {
        "id": tid,
        "subject": payload.subject,
        "status": "new",
        "channel": payload.channel,
        "created_at": now_iso(),
    }
    TICKETS[tid] = ticket
    return TicketOut(**ticket)


@app.get("/tickets/{ticket_id}", response_model=TicketOut)
def get_ticket(ticket_id: str) -> TicketOut:
    ticket = TICKETS.get(ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return TicketOut(**ticket)
