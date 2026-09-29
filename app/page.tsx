"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import BottomNavigation, { type Tab } from "@/components/BottomNavigation";
import HomePage from "@/components/HomePage";
import DownloaderPage from "@/components/DownloaderPage";
import type { Platform } from "@/lib/validation";

export default function Page() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [platform, setPlatform] = useState<Platform | null>(null);

  const openPlatform = (p: Platform) => {
    setPlatform(p);
    setTab("ftols");
  };

  return (
    <div className="stage">
      <div className="phone" data-platform={tab === "ftols" ? platform ?? "none" : "none"}>
        <div className="bg-glow" aria-hidden />
        {!ready && <SplashScreen onDone={() => setReady(true)} />}
        {ready && (
          <>
            <main className="screen" key={`${tab}-${platform ?? "x"}`}>
              {tab === "home" ? (
                <HomePage onOpen={openPlatform} />
              ) : (
                <DownloaderPage platform={platform} onSelect={setPlatform} />
              )}
            </main>
            <BottomNavigation
              active={tab}
              onChange={(t) => {
                setTab(t);
                if (t === "ftols") setPlatform(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
