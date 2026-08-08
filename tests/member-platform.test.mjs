import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("member pages require server-side authentication and stay out of search", async () => {
  const pages = await Promise.all([read("../app/onboarding/page.tsx"), read("../app/member/page.tsx"), read("../app/member/profile/page.tsx"), read("../app/member/settings/page.tsx"), read("../app/member/discover/page.tsx")]);
  for (const source of pages) {
    assert.match(source, /requireChatGPTUser/);
    assert.match(source, /dynamic = "force-dynamic"/);
    assert.match(source, /index: false/);
  }
});

test("Discover Budz excludes unsafe or private member records", async () => {
  const members = await read("../db/members.ts");
  assert.match(members, /id != \?/);
  assert.match(members, /status = 'active'/);
  assert.match(members, /discoverable = 1/);
  assert.match(members, /location_visibility != 'hidden'/);
  assert.match(members, /LIMIT 24/);
});

test("profile and settings writes derive ownership from authenticated identity", async () => {
  const routes = await Promise.all([read("../app/api/member/profile/route.ts"), read("../app/api/member/settings/route.ts")]);
  for (const route of routes) {
    assert.match(route, /getChatGPTUser/);
    assert.match(route, /findMemberByEmail\(user\.email\)/);
    assert.doesNotMatch(route, /data\.email|data\.memberId/);
  }
});

test("member profile keeps sensitive identity fields out of the member preview", async () => {
  const profile = await read("../app/member/profile/page.tsx");
  assert.match(profile, /email, birthday/);
  assert.doesNotMatch(profile, /member\.email|member\.birth_date/);
});

test("onboarding clearly distinguishes self-attestation from verification", async () => {
  const [form, signup] = await Promise.all([read("../app/components/member-onboarding-form.tsx"), read("../app/signup/page.tsx")]);
  assert.match(form, /self-attestation, not verified identity or age/i);
  assert.match(signup, /does not currently verify legal identity or age/i);
  assert.doesNotMatch(`${form}\n${signup}`, /age verified|identity verified/i);
});

test("member writes derive identity server-side and persist required consent", async () => {
  const route = await read("../app/api/member/onboarding/route.ts");
  assert.match(route, /getChatGPTUser/);
  assert.match(route, /adultAttestation !== true/);
  assert.match(route, /guidelinesAcceptance !== true/);
  assert.match(route, /CURRENT_GUIDELINES_VERSION/);
  assert.doesNotMatch(route, /data\.email|data\.memberId/);
});

test("friendship-first safety boundaries appear in onboarding and Member Home", async () => {
  const [form, home] = await Promise.all([read("../app/components/member-onboarding-form.tsx"), read("../app/member/page.tsx")]);
  for (const source of [form, home]) {
    assert.match(source, /sales/);
    assert.match(source, /delivery/);
    assert.match(source, /dating|hookup/);
    assert.match(source, /impaired driving/);
  }
});

test("first completed onboarding triggers a non-blocking welcome email", async () => {
  const [route, email] = await Promise.all([
    read("../app/api/member/onboarding/route.ts"),
    read("../app/email/welcome-email.ts"),
  ]);
  assert.match(route, /if \(!existing\)/);
  assert.match(route, /sendWelcomeEmail/);
  assert.match(route, /welcomeEmail/);
  assert.match(email, /https:\/\/api\.resend\.com\/emails/);
  assert.match(email, /idempotency-key/i);
  assert.match(email, /RESEND_API_KEY|apiKey/);
  assert.match(email, /friendship-first community/i);
  assert.doesNotMatch(email, /dating matches|buy cannabis|delivery available/i);
});

test("Guardian contact setup is protected, consented, encrypted, and removable", async () => {
  const [page, route, storage, schema] = await Promise.all([
    read("../app/guardian/page.tsx"),
    read("../app/api/member/guardian/contact/route.ts"),
    read("../db/guardian.ts"),
    read("../db/schema.ts"),
  ]);
  assert.match(page, /requireChatGPTUser/);
  assert.match(page, /dynamic = "force-dynamic"/);
  assert.match(route, /getChatGPTUser/);
  assert.match(route, /listingConsent !== true/);
  assert.match(route, /verificationConsent !== true/);
  assert.match(route, /export async function DELETE/);
  assert.doesNotMatch(route, /data\.memberId|data\.member_id/);
  assert.match(route, /memberId: member\.id/);
  assert.match(storage, /AES-GCM/);
  assert.match(storage, /GUARDIAN_DATA_KEY/);
  assert.match(storage, /verification_token_hash/);
  assert.match(storage, /removed_at/);
  assert.match(schema, /guardian_contacts/);
  assert.match(schema, /guardian_consent_events/);
});

test("Guardian verification records contact choice without claiming live monitoring", async () => {
  const [verificationRoute, verificationPage, spec] = await Promise.all([
    read("../app/api/guardian/contact-verification/route.ts"),
    read("../app/guardian/contact/verify/page.tsx"),
    read("../docs/product/guardian-v1-product-spec.md"),
  ]);
  assert.match(verificationRoute, /accepted/);
  assert.match(verificationRoute, /declined/);
  assert.match(verificationPage, /not emergency services/i);
  assert.match(verificationPage, /does not guarantee monitoring/i);
  assert.match(spec, /implementation not started/i);
  assert.doesNotMatch(`${verificationPage}\n${spec}`, /guaranteed safety|constant monitoring is active/i);
});
