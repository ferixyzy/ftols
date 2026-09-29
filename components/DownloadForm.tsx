"use client";

import { useState } from "react";
import { Download, Link2, Loader2 } from "lucide-react";
import ResultCard, { ErrorCard } from "./ResultCard";
import { PLATFORM_INFO } from "@/lib/platforms";
import { validateUrl, type Platform } from "@/lib/validation";
import type { MediaResult } from "@/lib/providers/types";

export default function DownloadForm({ platform }: { platform: Platform }) {
  const info = PLATFORM_INFO[platform];
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<MediaResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setMedia(null);
    const check = validateUrl(url, platform);
    if (!check.ok) return setError(check.error);
    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: check.url, platform }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) setError(data?.error ?? "Media could not be processed.");
      else setMedia(data.media as MediaResult);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function paste() {
    try {
      const t = await navigator.clipboard.readText();
      if (t) setUrl(t.trim());
    } catch {
      /* clipboard permission denied: ignore */
    }
  }

  return (
    <>
      <form onSubmit={submit} className="form enter" style={{ animationDelay: "60ms" }} noValidate>
        <label className="field">
          <Link2 size={20} />
          <input
            type="url"
            inputMode="url"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder={info.hint}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-label={`${info.name} link`}
          />
          <button type="button" className="paste" onClick={paste}>Paste</button>
        </label>
        <button type="submit" className="cta" style={{ background: info.accent }} disabled={loading}>
          {loading ? <Loader2 size={20} className="spin" /> : <Download size={20} />}
          {loading ? "Processing..." : "Download"}
        </button>
        {loading && <div className="progress" aria-hidden><i /></div>}
      </form>
      {error && <ErrorCard message={error} />}
      {media && <ResultCard media={media} />}
    </>
  );
}
