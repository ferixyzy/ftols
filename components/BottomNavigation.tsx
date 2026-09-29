"use client";

import { Home, Link2 } from "lucide-react";

export type Tab = "home" | "ftols";

export default function BottomNavigation({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <span className="nav-pill" style={{ transform: active === "home" ? "translateX(0)" : "translateX(100%)" }} aria-hidden />
      <button className={`nav-item ${active === "home" ? "on" : ""}`} onClick={() => onChange("home")} aria-current={active === "home" ? "page" : undefined}>
        <Home size={24} strokeWidth={2.2} />
        <span>HOME</span>
      </button>
      <button className={`nav-item ${active === "ftols" ? "on" : ""}`} onClick={() => onChange("ftols")} aria-current={active === "ftols" ? "page" : undefined}>
        <Link2 size={24} strokeWidth={2.2} />
        <span>FTOLS</span>
      </button>
    </nav>
  );
}
