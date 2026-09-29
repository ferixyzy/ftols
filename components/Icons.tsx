import type { Platform } from "@/lib/validation";

export function PlatformIcon({ platform, size = 28 }: { platform: Platform; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (platform) {
    case "tiktok":
      return (
        <svg {...p} fill="none">
          <path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.2" stroke="#25f4ee" strokeWidth="2.6" strokeLinecap="round" transform="translate(-.8 .6)" />
          <path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.2" stroke="#fe2c55" strokeWidth="2.6" strokeLinecap="round" transform="translate(.8 -.6)" />
          <path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.2M14 4c.4 2.3 2 3.8 4.4 4" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...p}>
          <rect x="2" y="5" width="20" height="14" rx="4.5" fill="#ff1d1d" />
          <path d="M10 9.2v5.6l5-2.8z" fill="#fff" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...p} fill="none">
          <defs>
            <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#feda75" />
              <stop offset=".4" stopColor="#fa7e1e" />
              <stop offset=".7" stopColor="#d62976" />
              <stop offset="1" stopColor="#962fbf" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="url(#ig)" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2.2" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#fa7e1e" />
        </svg>
      );
    case "pinterest":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" fill="#e60023" />
          <path d="M12.2 5.8c-3 0-4.6 2-4.6 4.100 0 1 .4 2.100 1.400 2.500.2.100.3 0 .3-.2l.2-.8c0-.2 0-.3-.2-.5-.3-.4-.5-.9-.5-1.600 0-2 1.500-3.600 3.500-3.600 1.800 0 2.900 1.100 2.900 2.700 0 2-.9 3.700-2.200 3.700-.7 0-1.300-.6-1.100-1.300.2-.8.600-1.700.6-2.300 0-.5-.3-1-.9-1-.7 0-1.300.8-1.300 1.900 0 .7.2 1.100.2 1.100l-.9 3.800c-.3 1-.1 2.400 0 3h.2c.4-.5 1.300-1.700 1.600-2.900l.6-2.100c.3.600 1.200 1.100 2.100 1.100 2.700 0 4.500-2.400 4.500-5.600 0-2.400-2-4.600-5.400-4.600z" fill="#fff" />
        </svg>
      );
  }
}
