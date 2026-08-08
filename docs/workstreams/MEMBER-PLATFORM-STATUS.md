# Member Platform Workstream Status

## Product objective

Build the first usable signed-in ReeferBudz experience for adults who self-attest they are 21+, centered on safe friendship and community. It must not facilitate cannabis sales, delivery, transactions, dating, hookups, unsafe consumption, or impaired driving.

## Architecture

- Vinext/Next server-rendered application on the existing Cloudflare Sites runtime.
- Dispatch-owned hosted sign-in; ReeferBudz does not receive or store passwords.
- Server-side authentication uses trusted forwarded identity headers through `app/chatgpt-auth.ts`.
- Cloudflare D1 stores structured member records. API routes derive ownership from the authenticated header rather than client input.
- Protected pages are dynamic and noindex. Public website routes and chrome remain separate.
- Decision record: `docs/architecture/ADR-001-member-auth-and-onboarding.md`.

## Database schema

`members`: UUID primary key; unique normalized email; display name; private birth date; 21+ attestation timestamp; email-confirmation timestamp/source; accepted Guidelines version/timestamp; biography; JSON interests; friendship goals; optional city/region; location-visibility setting; discovery opt-in; lifecycle status; created/updated timestamps. Discovery and email indexes are included. Migration: `drizzle/0002_brown_northstar.sql`.

## Features completed

- Welcome-email delivery foundation: first completed onboarding triggers a one-time, idempotent Resend request with branded HTML/plain-text content. Delivery is non-blocking and remains disabled until the required hosted secrets and verified sender are configured.
- Dedicated branded `/login` entry with returning-member messaging, hosted sign-in handoff, password-privacy explanation, 21+ self-attestation disclosure, and create-account/help paths.
- Secure hosted sign-in entry from Create Account; no application password collection.
- Authenticated email confirmation clearly scoped to control of the sign-in email.
- Birthday collection, server-side 21+ calculation, and explicit self-attestation.
- Versioned Community Guidelines acceptance and prohibited-use reminder.
- Durable member profile creation with biography, interests, and friendship goals.
- Location privacy choices (city/region, region only, hidden) and discovery opt-in.
- Protected Member Home with member card, profile readiness, privacy-respecting location, safety reminder, and sign-out.
- Protected Profile page with a member-facing preview and durable editing for display name, biography, interests, and friendship goals.
- Protected Settings page with account status, durable location-visibility and Discover preferences, safety links, and clear future account-control states.
- Protected Discover Budz page backed by real member data, prioritizing same-region profiles and excluding the current member, inactive/deleted members, members who opted out, and profiles with hidden locations.

## Features in progress

- Configure and verify a ReeferBudz sending domain, then add `RESEND_API_KEY`, `WELCOME_EMAIL_FROM`, and `APP_BASE_URL` to the hosted environment before live email testing.
- Connection requests are the next product slice after privacy-safe member discovery.

## Guardian planned work

- Founder directed Guardian as a planned safety feature on 2026-08-07.
- `docs/product/guardian-v1-product-spec.md` defines the user-started session, emergency-contact verification, alert timeline, draft consent language, restricted-data model, retention/deletion baseline, security controls, and production gates.
- Guardian does not block basic account creation. A verified contact and active-session location permission may be required before starting Guardian.
- Protected Guardian setup, required contact name/phone, optional email, versioned member/contact consent events, hashed expiring verification tokens, AES-GCM restricted-field encryption, verification accept/decline, contact removal, and consent withdrawal are built.
- Production build and ten member/Guardian tests pass. Migrations `0004_guardian_v1.sql` and `0005_guardian_indexes.sql` are generated and inspected.
- Hosted encryption-key configuration, outbound SMS delivery, provider opt-out synchronization, Guardian sessions, background location, alerts, retention automation, full account deletion, and production readiness remain unimplemented or unverified.

## Security and privacy decisions

- No passwords are collected or stored by ReeferBudz.
- Client-supplied email/member IDs are never trusted for authorization.
- Birth date and email are not rendered on public member surfaces.
- Age is self-attested and date-derived only; no claim of legal identity or verified age is made.
- Location defaults to region-only and exact addresses are neither requested nor stored.
- Guidelines acceptance records a version and timestamp.
- User-generated fields have server-enforced length and format limits; interests use a bounded list.
- Protected member pages are dynamic and excluded from search indexing.

## Tests and verification

- 2026-08-07: Production build passed with `/login` included.
- 2026-08-07: Login/auth assertions, all member-platform tests, scoped lint, and diff checks passed. The broader public-site suite still has two pre-existing shared-chrome expectation failures (early-access link and former footer-logo asset) unrelated to `/login`.
- Drizzle schema generation completed; migration `0002_brown_northstar.sql` created and inspected.
- Production build, lint, site tests, and member-flow static tests: pending after implementation pass.
- Hosted end-to-end sign-in requires the deployed dispatch environment and remains pending.

## Files changed

- `app/email/welcome-email.ts`
- `app/login/page.tsx`
- `app/signup/page.tsx`
- `app/onboarding/page.tsx`
- `app/member/page.tsx`
- `app/api/member/onboarding/route.ts`
- `app/components/member-onboarding-form.tsx`
- `app/components/member-shell.tsx`
- `app/globals.css` (member-specific styles appended; concurrent public-site changes preserved)
- `db/schema.ts`
- `db/members.ts`
- `drizzle/0002_brown_northstar.sql`
- `drizzle/meta/0002_snapshot.json`
- `drizzle/meta/_journal.json`
- `docs/architecture/ADR-001-member-auth-and-onboarding.md`
- `docs/workstreams/MEMBER-PLATFORM-STATUS.md`

## Known risks

- Self-attestation does not establish legal identity or verified age.
- Dispatch sign-in behavior and identity headers need verification in the hosted environment.
- Runtime schema initialization is defensive; migration application must remain the deployment source of truth.
- Abuse throttling, reporting, blocking, moderation, deletion, and retention controls are not yet built.
- Profile editing, discovery, connections, messaging, Circles, and notifications are not yet available.
- A concurrent public-website workstream has uncommitted changes; those files must remain preserved and separately attributable.

## Exact next milestone

For Guardian: connect a legally reviewed emergency-contact verification delivery provider and hosted encryption key, then verify contact acceptance/removal end to end. Connection requests remain the next general member-product slice.

## Founder decisions needed

- Decide before public member launch whether 21+ self-attestation is sufficient or whether to evaluate a real age-assurance provider with legal/privacy counsel.
- Approve the exact Community Guidelines version identifier once the policy enters formal version control.
- Decide whether city-level visibility should remain available at launch or whether region-only should be the maximum precision.

## Last-updated date

2026-08-07
