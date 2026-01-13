# Helpdesk (Email + WhatsApp-ready)

Monorepo:
- apps/web  -> Next.js dashboard (deploy on Vercel)
- apps/api  -> FastAPI backend (deploy on a container host)

## Env vars

### Vercel (apps/web)
- NEXT_PUBLIC_API_URL = https://<your-api-host>

### API host (apps/api)
- CORS_ORIGINS = https://<your-vercel-domain>
- PORT = (provided by host)
