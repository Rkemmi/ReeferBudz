import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { cleanText, isValidEmail } from "../app/api/_shared/request.ts";

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
  ["/login", "Your circle is right where you left it"],
  ["/shop", "Founding Budz Drop"],
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

test("login page provides a truthful hosted-auth entry", async () => {
  const [page, chrome, menu] = await Promise.all([
    readFile(new URL("../app/login/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/mobile-site-menu.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /\/signin-with-chatgpt\?return_to=%2Fmember/);
  assert.match(page, /never\s+receives or stores your password/i);
  assert.match(page, /self-attested/i);
  assert.doesNotMatch(page, /verified age|age verified|identity verified/i);
  assert.match(chrome, /href=["']\/login["']/);
  assert.match(menu, /["']Log In["'],["']\/login["']/);
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

test("mobile navigation closes on scroll and early-access submission is implemented", async () => {
  const [chrome, menu, form, route] = await Promise.all([
    readFile(new URL("../app/components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/mobile-site-menu.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/early-access-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/early-access/route.ts", import.meta.url), "utf8"),
  ]);
  assert.match(chrome, /<MobileSiteMenu/);
  assert.match(menu, /<details className="mobile-menu"/);
  assert.match(menu, /addEventListener\("scroll"/);
  assert.match(form, /fetch\\?|\bfetch\(["']\/api\/early-access/);
  assert.match(route, /INSERT INTO early_access_signups/);
  assert.match(route, /adultConsent/);
});

test("sticker pack reservations are persisted without collecting payment", async () => {
  const [page, form, route, schema] = await Promise.all([
    readFile(new URL("../app/shop/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/sticker-reservation-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/shop-interest/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Reserve a \$10 pack/);
  assert.match(page, /No money today/);
  assert.match(form, /fetch\(["']\/api\/shop-interest/);
  assert.match(form, /not a purchase/i);
  assert.match(route, /INSERT INTO sticker_pack_reservations/);
  assert.match(route, /adultConsent/);
  assert.match(schema, /stickerPackReservations/);
  assert.doesNotMatch(`${page}\n${form}`, /card number|checkout|payment method/i);
});

test("public form input helpers bound and validate stored data", () => {
  assert.equal(cleanText("  Rachel\u0000  ", 80), "Rachel");
  assert.equal(cleanText("abcdef", 4), "abcd");
  assert.equal(cleanText(null, 20), "");
  assert.equal(isValidEmail("hello@example.com"), true);
  assert.equal(isValidEmail("not-an-email"), false);
  assert.equal(isValidEmail(`${"a".repeat(245)}@example.com`), false);
});

test("worker applies baseline browser security headers", async () => {
  const worker = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8");
  for (const header of [
    "Cross-Origin-Opener-Policy",
    "Permissions-Policy",
    "Referrer-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
  ]) {
    assert.match(worker, new RegExp(header));
  }
});
