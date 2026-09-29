import { httpProvider } from "./providers/http";
import type { DownloadProvider } from "./providers/types";

/** Swap the returned provider to change the downloader backend without touching the UI. */
export function downloadProvider(): DownloadProvider {
  return httpProvider;
}
