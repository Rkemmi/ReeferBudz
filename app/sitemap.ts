import type { MetadataRoute } from "next";
import { getSiteUrl, isPublicLaunchMode } from "./launch-mode";

const routes = [
  "",
  "/how-it-works",
  "/safety",
  "/our-story",
  "/community-guidelines",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/early-access",
  "/shop",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const activeRoutes = isPublicLaunchMode() ? [""] : routes;

  return activeRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/early-access" ? 0.9 : 0.7,
  }));
}
