"use client";

import { Layers, MonitorSmartphone, Sparkles, UserX, Zap, Settings } from "lucide-react";
import PlatformCard from "./PlatformCard";
import { PLATFORMS, type Platform } from "@/lib/validation";

const FEATURES = [
  { icon: Sparkles, title: "Simple interface", text: "Paste a link and go." },
  { icon: Layers, title: "HD when available", text: "Quality depends on the source." },
  { icon: Zap, title: "Fast processing", text: "Results shown when ready." },
  { icon: MonitorSmartphone, title: "Mobile optimized", text: "Built for your phone." },
  { icon: UserX, title: "No registration", text: "No account needed." },
];

export default function HomePage({ onOpen }: { onOpen: (p: Platform) => void }) {
  return (
    <div className="page">
      <header className="home-head enter">
        <div>
          <h1 className="brand">FTOLS</h1>
          <p className="sub">Download your media quickly and easily.</p>
        </div>
        <span className="gear" aria-hidden><Settings size={22} /></span>
      </header>

      <section className="card info enter" style={{ animationDelay: "60ms" }}>
        <span className="info-icon"><Zap size={26} fill="currentColor" /></span>
        <div>
          <strong>Simple &amp; quick</strong>
          <p>FTOLS provides a simple interface for downloading publicly accessible media from supported platforms, where permitted.</p>
        </div>
      </section>

      <h2 className="section-title">Platforms</h2>
      <div className="stack">
        {PLATFORMS.map((p, i) => (
          <PlatformCard key={p} platform={p} index={i + 2} onClick={() => onOpen(p)} />
        ))}
      </div>

      <h2 className="section-title">Features</h2>
      <div className="features">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="card feature enter" style={{ animationDelay: `${(i + 6) * 60}ms` }}>
            <Icon size={20} />
            <strong>{title}</strong>
            <small>{text}</small>
          </div>
        ))}
      </div>
      <p className="fine">Availability and quality depend on the source and the configured provider. Only download media you have the right to save.</p>
    </div>
  );
}
