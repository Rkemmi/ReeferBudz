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
  ["/contact", "We’d love to hear from you"],
  ["/privacy", "How ReeferBudz handles information"],
  ["/terms", "Terms for using"],
  ["/accessibility", "easier for everyone"],
  ["/early-access", "first 100 Founding Budz"],
  ["/signup", "Access your account securely"],
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

test("homepage can switch into a single launch-mode experience", async () => {
  const [page, launchPage, proxy] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/launch-mode-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../proxy.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /isPublicLaunchMode\(\)/);
  assert.match(launchPage, /REEFERBUDZ™ IS COMING\./);
  assert.match(launchPage, /Friendship first\. Community always\./);
  assert.match(launchPage, /Not a dispensary\./);
  assert.match(launchPage, /Not a cannabis marketplace\./);
  assert.match(launchPage, /Not a delivery service\./);
  assert.match(proxy, /PUBLIC_LAUNCH_MODE/);
  assert.match(proxy, /\/signup/);
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
  assert.match(menu, /["']Sign In["'],["']\/login["']/);
});

test("brand implementation uses approved tokens, assets, and launch-mode content", async () => {
  const [css, chrome, launchPage] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-chrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/launch-mode-page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /--rb-brand-forest:/);
  assert.match(css, /--rb-brand-lake-blue:\s*#2f6f8f/);
  assert.doesNotMatch(css, /orange|#ff6b1a/i);
  assert.match(css, /--rb-weight-extrabold:\s*800/);
  assert.doesNotMatch(css, /font-weight:\s*(?:900|1000)\b/);
  assert.match(chrome, /reeferbudz-primary-logo\.png/);
  assert.match(chrome, /reeferbudz-primary-transparent-v2\.png/);
  assert.match(launchPage, /reeferbudz-mascots\.svg/);
  assert.match(launchPage, /Friendship first\. Community always\./);
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
  assert.match(form, /Founding Budz 2026/);
  assert.match(form, /name="postalCode"/);
  assert.match(form, /name="neighborhood"/);
  assert.match(form, /name="find"/);
  assert.match(route, /CREATE TABLE IF NOT EXISTS founding_budz_waitlist/);
  assert.match(route, /INSERT INTO founding_budz_waitlist/);
  assert.match(route, /adultConsent/);
});

test("launch list form persists email-only launch notifications", async () => {
  const [form, route, schema, envExample] = await Promise.all([
    readFile(new URL("../app/components/launch-list-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/launch-list/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);
  assert.match(form, /KEEP ME POSTED/);
  assert.match(form, /type="email"/);
  assert.match(form, /adultConsent/);
  assert.match(route, /CREATE TABLE IF NOT EXISTS launch_list_signups/);
  assert.match(route, /INSERT INTO launch_list_signups/);
  assert.match(schema, /launchListSignups/);
  assert.match(envExample, /PUBLIC_LAUNCH_MODE=true/);
});

test("sticker pack reservations are persisted without collecting payment", async () => {
  const [page, form, route, schema] = await Promise.all([
    readFile(new URL("../app/shop/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/sticker-reservation-form.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/shop-interest/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Reserve a \$10 pack/);
  assert.match(page, /No payment today/);
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

test("early-access page presents the Cleveland-first Founding Budz waitlist clearly", async () => {
  const [page, privacy, schema] = await Promise.all([
    readFile(new URL("../app/early-access/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);
  assert.match(page, /first 100 Founding Budz/i);
  assert.match(page, /Cleveland-first/i);
  assert.match(page, /not dating or transactions/i);
  assert.match(privacy, /Founding Budz waitlist/);
  assert.match(schema, /foundingBudzWaitlist/);
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
