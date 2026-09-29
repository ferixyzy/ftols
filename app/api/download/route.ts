import { NextResponse } from "next/server";
import { downloadProvider } from "@/lib/downloader";
import { ProviderError } from "@/lib/providers/types";
import { isPlatform, validateUrl } from "@/lib/validation";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (error: string, status: number, code: string) => NextResponse.json({ ok: false, error, code }, { status });

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const limit = Math.max(1, Number(process.env.RATE_LIMIT_PER_MINUTE) || 10);
  if (!rateLimit(ip, limit)) return fail("Too many requests. Please wait a moment.", 429, "rate_limited");

  let body: { url?: unknown; platform?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request.", 400, "bad_request");
  }
  if (!isPlatform(body.platform)) return fail("Unsupported platform.", 400, "bad_platform");
  if (typeof body.url !== "string") return fail("Invalid link.", 400, "bad_url");

  const check = validateUrl(body.url, body.platform);
  if (!check.ok) return fail(check.error, 400, "bad_url");

  const provider = downloadProvider();
  if (!provider.isConfigured()) return fail("Download service is not configured yet.", 503, "not_configured");

  try {
    const media = await provider.fetchMedia(check.url, body.platform);
    return NextResponse.json({ ok: true, media });
  } catch (e) {
    if (e instanceof ProviderError) {
      const status = e.code === "unavailable" ? 404 : e.code === "not_configured" ? 503 : 502;
      return fail(e.message, status, e.code);
    }
    return fail("Media could not be processed.", 500, "failed");
  }
}
