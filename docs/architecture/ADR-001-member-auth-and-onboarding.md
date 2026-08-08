# ADR-001: Member authentication and onboarding

- Status: Accepted
- Date: 2026-08-06

## Context

The existing Vinext application is deployed through the Sites/Cloudflare stack, already exposes dispatch-owned sign-in helpers, and uses D1 for durable structured data. The first member slice needs secure authentication, email confirmation, 21+ gating, Community Guidelines acceptance, profile creation, privacy controls, and a protected Member Home.

## Decision

- Use dispatch-owned sign-in for authentication. ReeferBudz never receives or stores member passwords.
- Treat the authenticated email header as confirmation that the member controls the email asserted by the sign-in provider. Do not represent it as legal identity verification.
- Collect date of birth and a separate 21+ self-attestation. Do not label either as verified age because no age-verification provider is integrated.
- Enforce all member writes and reads server-side from the authenticated email header; never accept member identity from client input.
- Persist member onboarding in D1 with timestamps and the accepted Community Guidelines version.
- Default location display to region-only and discovery to enabled, while allowing city/region, region-only, or hidden location visibility.
- Keep birth date and email private; expose only the member-selected location precision.
- Mark signed-in pages as dynamic and noindex.

## Consequences

This provides a secure, deployable first journey using the existing hosting architecture and avoids introducing password storage. It does not provide legal identity or age verification. Before a public launch, the founder must decide whether self-attestation is sufficient or select a specialist age-assurance provider after legal/privacy review.
