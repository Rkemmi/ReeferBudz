import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routes = [
  ["/", "Find Your"],
  ["/how-it-works", "Come as you are"],
  ["/safety", "Safer connections"],
  ["/our-story", "Cleveland roots"],
  ["/community-guidelines", "Make the circle safer"],
  ["/contact", "keep the conversation open"],
  ["/privacy", "Clear choices"],
  ["/terms", "Terms for using"],
  ["/accessibility", "easier for everyone"],
  ["/early-access", "Your future circle"],
  ["/signup", "Your circle is forming"],
  ["/signup/emergency-contact", "Choose someone"],
  ["/welcome", "Your seat is waiting"],
];

test("all public ReeferBudz routes contain useful page content", async () => {
  for (const [route, expected] of routes) {
    const pagePath = route === "/" ? "../app/page.tsx" : `../app${route}/page.tsx`;
    const source = await readFile(new URL(pagePath, import.meta.url), "utf8");
    assert.match(source, new RegExp(expected, "i"), route);
    assert.match(source, /export default function/, route);
  }
});

test("shared chrome links only to real public destinations", async () => {
  const chrome = await readFile(
    new URL("../app/components/site-chrome.tsx", import.meta.url),
    "utf8",
  );
  const chromeRoutes = routes
    .slice(1, 10)
    .map(([route]) => route);
  for (const route of chromeRoutes) {
    assert.match(chrome, new RegExp(`href=["']${route.replaceAll("-", "\\-")}`));
  }
  assert.doesNotMatch(chrome, /href=["']\/?#(?:privacy|terms|contact|story|guidelines)/);
});

test("brand implementation uses approved tokens, assets, and weights", async () => {
  const [css, chrome, home] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /--rb-brand-forest:/);
  assert.match(css, /--rb-brand-lake-blue:\s*#2f6f8f/);
  assert.doesNotMatch(css, /orange|#ff6b1a/i);
  assert.match(css, /--rb-weight-extrabold:\s*800/);
  assert.doesNotMatch(css, /\b(?:linear|radial|conic)-gradient\(/);
  assert.doesNotMatch(css, /font-weight:\s*(?:900|1000)\b/);
  assert.match(chrome, /reeferbudz-wordmark\.svg/);
  assert.match(chrome, /reeferbudz-primary-on-dark\.svg/);
  assert.match(home, /reeferbudz-mascots\.svg/);
  assert.doesNotMatch(`${chrome}\n${home}`, /reeferbudz-(?:wordmark|primary-logo|mascots)\.png/);
});

test("mobile navigation and early-access submission are implemented", async () => {
  const [chrome, form, route] = await Promise.all([
    readFile(new URL("../app/components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/early-access-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/early-access/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(chrome, /<details className="mobile-menu">/);
  assert.match(form, /fetch\\?|\bfetch\(["']\/api\/early-access/);
  assert.match(route, /INSERT INTO early_access_signups/);
  assert.match(route, /adultConsent/);
});
