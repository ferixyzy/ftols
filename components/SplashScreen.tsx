"use client";

import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setLeaving(true), 1900);
    const b = setTimeout(onDone, 2500);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div className={`splash ${leaving ? "splash-out" : ""}`} role="status" aria-label="Loading FTOLS">
      <h1 className="splash-logo">FTOLS</h1>
    </div>
  );
}
