import type { MetadataRoute } from "next";
import { getSiteUrl, isPublicLaunchMode } from "./launch-mode";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: isPublicLaunchMode()
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/how-it-works", "/safety", "/our-story", "/community-guidelines", "/contact", "/privacy", "/terms", "/accessibility", "/early-access", "/signup", "/login", "/shop", "/member-preview"] }
      : { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
