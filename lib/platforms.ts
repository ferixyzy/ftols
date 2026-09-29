import type { Platform } from "./validation";

export interface PlatformInfo {
  id: Platform;
  name: string;
  short: string;
  description: string;
  hint: string;
  steps: string[];
  accent: string;
}

export const PLATFORM_INFO: Record<Platform, PlatformInfo> = {
  tiktok: {
    id: "tiktok", name: "TikTok", short: "Save public TikTok videos.",
    description: "Paste a public TikTok link below.", hint: "Paste TikTok link here...",
    steps: ["Open the TikTok app", "Copy the video link", "Paste it in the field above", "Tap Download"],
    accent: "linear-gradient(90deg,#14d4e6,#ff2d72)",
  },
  youtube: {
    id: "youtube", name: "YouTube", short: "Save public videos and audio.",
    description: "Paste a public YouTube link below.", hint: "Paste YouTube link here...",
    steps: ["Open the YouTube video", "Copy the link", "Paste it in the field above", "Tap Download"],
    accent: "linear-gradient(90deg,#ef1f1f,#ff3b30)",
  },
  instagram: {
    id: "instagram", name: "Instagram", short: "Save public photos, videos and reels.",
    description: "Paste a public Instagram media link below.", hint: "Paste Instagram link here...",
    steps: ["Open the Instagram post", "Copy the link", "Paste it in the field above", "Tap Download"],
    accent: "linear-gradient(90deg,#a63cf5,#ff9f1c)",
  },
  pinterest: {
    id: "pinterest", name: "Pinterest", short: "Save public images and videos.",
    description: "Paste a public Pinterest link below.", hint: "Paste Pinterest link here...",
    steps: ["Open the Pinterest pin", "Copy the link", "Paste it in the field above", "Tap Download"],
    accent: "linear-gradient(90deg,#d8112f,#f0284a)",
  },
};
