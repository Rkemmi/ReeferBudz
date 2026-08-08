import type { MetadataRoute } from "next";

const baseUrl = "https://reeferbudz-community.rkemmi.chatgpt.site";
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
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/early-access" ? 0.9 : 0.7,
  }));
}
