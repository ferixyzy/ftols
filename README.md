# FTOLS

Mobile-first social media downloader UI (TikTok, YouTube, Instagram, Pinterest) built with Next.js 14, React, TypeScript and Lucide icons. Plain CSS, no Tailwind.

## Run
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Provider setup
The UI calls `POST /api/download` with `{ "url", "platform" }`. The server validates the link, rate-limits by IP, then calls `downloadProvider()` (`lib/downloader.ts`).
Without `DOWNLOAD_API_URL` the API returns "Download service is not configured yet." (HTTP 503); nothing is faked.

`lib/providers/http.ts` posts `{ url, platform }` to `DOWNLOAD_API_URL` (optional `DOWNLOAD_API_KEY` as Bearer token) and expects:
```json
{ "title": "...", "thumbnail": "https://...", "options": [{ "quality": "HD", "format": "mp4", "size": "12 MB", "url": "https://..." }] }
```
Edit `mapResponse()` to match another provider, or implement `DownloadProvider` (`lib/providers/types.ts`) and return it from `downloadProvider()`.
Use only a provider that is legal for your use and respects platform terms. Quality and watermark availability depend on the provider and source.

## Deploy to Vercel
Push to Git, import in Vercel, add `DOWNLOAD_API_URL`, `DOWNLOAD_API_KEY`, `RATE_LIMIT_PER_MINUTE` as environment variables. The in-memory rate limiter is per instance; use Upstash/Redis for strict limits.

## Security notes
Secrets stay server-side; links are host-allowlisted per platform; provider metadata is sanitized (https-only URLs, stripped text); errors are generic.
