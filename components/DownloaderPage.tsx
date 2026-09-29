"use client";

import { ChevronLeft, Info } from "lucide-react";
import PlatformCard from "./PlatformCard";
import DownloadForm from "./DownloadForm";
import { PlatformIcon } from "./Icons";
import { PLATFORM_INFO } from "@/lib/platforms";
import { PLATFORMS, type Platform } from "@/lib/validation";

export default function DownloaderPage({ platform, onSelect }: { platform: Platform | null; onSelect: (p: Platform | null) => void }) {
  if (!platform) {
    return (
      <div className="page">
        <header className="enter">
          <h1 className="brand">FTOLS</h1>
          <p className="sub">Choose a platform to start downloading.</p>
        </header>
        <div className="stack" style={{ marginTop: 22 }}>
          {PLATFORMS.map((p, i) => (
            <PlatformCard key={p} platform={p} index={i} onClick={() => onSelect(p)} />
          ))}
        </div>
      </div>
    );
  }

  const info = PLATFORM_INFO[platform];
  return (
    <div className="page">
      <button className="back" onClick={() => onSelect(null)} aria-label="Back to platforms">
        <ChevronLeft size={26} />
      </button>
      <header className="dl-head enter">
        <PlatformIcon platform={platform} size={54} />
        <h1>Download {info.name}</h1>
        <p>{info.description}</p>
      </header>
      <DownloadForm key={platform} platform={platform} />
      <section className="card howto enter" style={{ animationDelay: "120ms" }}>
        <strong><Info size={15} /> How to use</strong>
        <ol>
          {info.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
