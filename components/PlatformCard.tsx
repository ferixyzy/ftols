"use client";

import { ArrowRight } from "lucide-react";
import { PlatformIcon } from "./Icons";
import { PLATFORM_INFO } from "@/lib/platforms";
import type { Platform } from "@/lib/validation";

export default function PlatformCard({ platform, index, onClick }: { platform: Platform; index: number; onClick: () => void }) {
  const info = PLATFORM_INFO[platform];
  return (
    <button className="card platform-card enter" style={{ animationDelay: `${index * 70}ms` }} onClick={onClick}>
      <span className="p-icon"><PlatformIcon platform={platform} size={30} /></span>
      <span className="p-text">
        <strong>{info.name}</strong>
        <small>{info.short}</small>
      </span>
      <ArrowRight size={18} className="p-arrow" />
    </button>
  );
}
