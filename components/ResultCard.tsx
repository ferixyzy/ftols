"use client";

import { useState } from "react";
import { AlertCircle, Check, Copy, Download } from "lucide-react";
import { PLATFORM_INFO } from "@/lib/platforms";
import type { MediaResult } from "@/lib/providers/types";

export function ErrorCard({ message }: { message: string }) {
  return (
    <div className="card result error reveal" role="alert">
      <AlertCircle size={22} />
      <p>{message}</p>
    </div>
  );
}

export default function ResultCard({ media }: { media: MediaResult }) {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const option = media.options[selected];

  async function copy() {
    try {
      await navigator.clipboard.writeText(option.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="card result reveal">
      <div className="r-top">
        {media.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.thumbnail} alt="" referrerPolicy="no-referrer" loading="lazy" />
        )}
        <div className="r-meta">
          <strong>{media.title}</strong>
          <small>{PLATFORM_INFO[media.platform].name}</small>
          <small>{[option.quality, option.format?.toUpperCase(), option.size].filter(Boolean).join(" · ")}</small>
        </div>
      </div>
      {media.options.length > 1 && (
        <div className="chips" role="radiogroup" aria-label="Available options">
          {media.options.map((o, i) => (
            <button key={o.url} role="radio" aria-checked={i === selected} className={i === selected ? "chip on" : "chip"} onClick={() => setSelected(i)}>
              {[o.quality, o.format?.toUpperCase()].filter(Boolean).join(" ") || `Option ${i + 1}`}
            </button>
          ))}
        </div>
      )}
      <div className="r-actions">
        <a className="cta small" href={option.url} target="_blank" rel="noopener noreferrer nofollow" download>
          <Download size={18} /> Download
        </a>
        <button className="ghost" onClick={copy}>
          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
