import ejs from "ejs";
import type { Response } from "express";
import fs from "fs/promises";

export async function renderHtmlContent(htmlPath: string): Promise<string> {
  const htmlContent = await fs.readFile(htmlPath, "utf-8");
  return ejs.render(htmlContent, {
    gitCommit: JSON.stringify(process.env.GIT_COMMIT ?? "undefined"),
    instanceId: JSON.stringify(process.env.INSTANCE_ID ?? "undefined"),
    sklikRetargetingId: JSON.stringify(
      process.env.SKLIK_RETARGETING_ID ?? "undefined",
    ),
    sklikConversionId: JSON.stringify(
      process.env.SKLIK_CONVERSION_ID ?? "undefined",
    ),
    googleAdsId: JSON.stringify(process.env.GOOGLE_ADS_ID ?? "undefined"),
    googleAnalyticsId: JSON.stringify(
      process.env.GOOGLE_ANALYTICS_ID ?? "undefined",
    ),
  });
}

export function setHtmlNoCacheHeaders(res: Response): void {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("ETag", "");
  res.setHeader("Content-Type", "text/html");
}

export async function renderHtml(
  res: Response,
  htmlPath: string,
): Promise<void> {
  const rendered = await renderHtmlContent(htmlPath);
  setHtmlNoCacheHeaders(res);
  res.send(rendered);
}
