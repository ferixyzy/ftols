export type Platform = "tiktok" | "youtube" | "instagram" | "pinterest";

export const PLATFORMS: Platform[] = ["tiktok", "youtube", "instagram", "pinterest"];

const HOSTS: Record<Platform, string[]> = {
  tiktok: ["tiktok.com", "vm.tiktok.com", "vt.tiktok.com"],
  youtube: ["youtube.com", "youtu.be", "m.youtube.com", "music.youtube.com"],
  instagram: ["instagram.com", "instagr.am"],
  pinterest: ["pinterest.com", "pin.it", "pinterest.co.uk", "pinterest.ca", "pinterest.fr", "pinterest.de", "pinterest.co.id"],
};

export function isPlatform(v: unknown): v is Platform {
  return typeof v === "string" && (PLATFORMS as string[]).includes(v);
}

export type UrlCheck = { ok: true; url: string } | { ok: false; error: string };

export function validateUrl(input: string, platform: Platform): UrlCheck {
  const raw = (input ?? "").trim();
  if (!raw || raw.length > 2048) return { ok: false, error: "Invalid link." };
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, error: "Invalid link." };
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return { ok: false, error: "Invalid link." };
  if (parsed.username || parsed.password) return { ok: false, error: "Invalid link." };
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  const match = HOSTS[platform].some((h) => host === h || host.endsWith("." + h));
  if (!match) return { ok: false, error: `This is not a valid ${platform} link.` };
  return { ok: true, url: parsed.toString() };
}
