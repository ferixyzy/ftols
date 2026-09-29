import { ProviderError, type DownloadProvider, type MediaOption, type MediaResult } from "./types";
import type { Platform } from "../validation";

/**
 * Generic HTTP provider. Configure DOWNLOAD_API_URL (and optionally DOWNLOAD_API_KEY).
 * It POSTs { url, platform } and expects JSON:
 * { "title": "...", "thumbnail": "https://...",
 *   "options": [{ "quality": "HD", "format": "mp4", "size": "12 MB", "url": "https://..." }] }
 * Adapt mapResponse() if your provider returns a different shape.
 */

function safeHttps(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

function clean(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string" && typeof v !== "number") return undefined;
  const s = String(v).replace(/[<>\u0000-\u001f]/g, "").trim().slice(0, max);
  return s || undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapResponse(data: any, platform: Platform): MediaResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawOptions: any[] = Array.isArray(data?.options) ? data.options : [];
  const options: MediaOption[] = [];
  for (const o of rawOptions.slice(0, 12)) {
    const url = safeHttps(o?.url);
    if (!url) continue;
    options.push({ url, quality: clean(o?.quality, 40), format: clean(o?.format, 20), size: clean(o?.size, 30) });
  }
  if (options.length === 0) throw new ProviderError("unavailable", "This media is unavailable.");
  return {
    title: clean(data?.title) ?? "Untitled media",
    platform,
    thumbnail: safeHttps(data?.thumbnail),
    options,
  };
}

export const httpProvider: DownloadProvider = {
  isConfigured() {
    return Boolean(process.env.DOWNLOAD_API_URL);
  },
  async fetchMedia(url, platform) {
    const endpoint = process.env.DOWNLOAD_API_URL;
    if (!endpoint) throw new ProviderError("not_configured", "Download service is not configured yet.");
    const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
    if (process.env.DOWNLOAD_API_KEY) headers.Authorization = `Bearer ${process.env.DOWNLOAD_API_KEY}`;
    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ url, platform }),
        signal: AbortSignal.timeout(25000),
        cache: "no-store",
      });
    } catch {
      throw new ProviderError("failed", "Media could not be processed.");
    }
    if (res.status === 404 || res.status === 410) throw new ProviderError("unavailable", "This media is unavailable.");
    if (!res.ok) throw new ProviderError("failed", "Media could not be processed.");
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      throw new ProviderError("failed", "Media could not be processed.");
    }
    return mapResponse(data, platform);
  },
};
