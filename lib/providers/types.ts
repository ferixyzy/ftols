import type { Platform } from "../validation";

export interface MediaOption {
  quality?: string;
  format?: string;
  size?: string;
  url: string;
}

export interface MediaResult {
  title: string;
  platform: Platform;
  thumbnail?: string;
  options: MediaOption[];
}

export class ProviderError extends Error {
  code: "not_configured" | "unavailable" | "failed";
  constructor(code: "not_configured" | "unavailable" | "failed", message: string) {
    super(message);
    this.code = code;
  }
}

export interface DownloadProvider {
  isConfigured(): boolean;
  fetchMedia(url: string, platform: Platform): Promise<MediaResult>;
}
