const DEFAULT_SITE_URL = "https://reeferbudz.com";

export function isPublicLaunchMode() {
  return process.env.PUBLIC_LAUNCH_MODE !== "false";
}

export function getSiteUrl() {
  return process.env.APP_BASE_URL || DEFAULT_SITE_URL;
}
