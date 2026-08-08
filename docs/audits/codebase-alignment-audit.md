# ReeferBudz Codebase Alignment Audit

Status: Final
Date: August 7, 2026

## 1. Purpose

This audit compares the current ReeferBudz codebase against the finalized project documents.

It is intended to answer:

- what already aligns
- what is partially aligned
- what conflicts with the locked product rules
- what should be fixed first

This is an alignment audit, not a full implementation audit of every file.

## 2. Documents Used as the Source of Truth

The audit uses these finalized documents as the baseline:

- brand foundation
- product concept
- launch and MVP decision matrix
- implementation roadmap
- auth, age gate, and data storage rules
- data schema and member fields map
- safety, moderation, and emergency contact rules
- website vs app sitemap and feature map

## 3. Audit Summary

### Strongly Aligned Areas

- hosted-auth signup direction on the current main signup page
- self-attested 21+ language in onboarding
- profile fields used in onboarding, profile, and discovery
- visibility-controlled location concept
- member settings privacy controls
- discover Budz as a privacy-conscious MVP feature

### Partially Aligned Areas

- member schema, which is strong for MVP but not yet fully aligned with every final document distinction
- settings, which acknowledges future safety/account controls but does not implement them yet
- member experience structure, which is mostly aligned but still includes older preview-era remnants in the codebase

### Misaligned Areas

- legacy preview signup flow still asks for passwords directly
- legacy preview emergency-contact flow introduces a blocked later-phase feature as part of signup
- some settings/account-control surfaces present future functionality too concretely before it exists

## 4. Highest-Priority Findings

### Finding 1: Legacy preview signup flow conflicts with the locked hosted-auth model

Files:
- [signup-form.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/components/signup-form.tsx:18>)
- [signup/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/signup/page.tsx:57>)

Issue:

The legacy `SignupForm` still contains direct fields for:

- username
- email
- phone
- password
- date of birth

The current `/signup` page, however, says ReeferBudz uses hosted sign-in and does not receive or store passwords.

Why this matters:

This is a direct conflict with:

- the finalized auth document
- the product concept
- the launch scope

If both flows remain in the codebase, they create ambiguity about how accounts actually work.

Priority:
- highest

Recommended action:
- remove or retire the legacy preview signup and password flow
- keep the hosted-auth flow as the only valid signup direction

### Finding 2: Legacy emergency-contact preview flow conflicts with the locked roadmap

File:
- [signup-form.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/components/signup-form.tsx:65>)

Issue:

The legacy preview flow says the user must provide an emergency contact during signup and references a hangout check-in emergency scenario.

Why this matters:

The finalized roadmap, safety rules, launch matrix, and data documents all place emergency contacts in a blocked later phase, not in MVP onboarding.

This preview flow creates product expectations that are not aligned with the locked scope.

Priority:
- highest

Recommended action:
- remove emergency-contact signup preview language from the active product path
- keep emergency contacts blocked until the feature is fully approved and defined

### Finding 3: Settings presents future controls before they are implemented

File:
- [settings/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/member/settings/page.tsx:11>)

Issue:

The settings screen includes “Blocked members,” “Report history,” and “Delete or export your account” as visible sections or placeholders.

Why this matters:

The finalized documents treat these as incomplete or pre-launch-required areas, not finished product controls.

This is not a fatal issue, but the UI currently acknowledges them more concretely than the implementation supports.

Priority:
- medium-high

Recommended action:
- either downgrade these to clearer “coming later” placeholders with less functional framing
- or implement the minimum real workflows needed before public member launch

### Finding 4: The member schema is strong for MVP but still only partially aligned with the final architecture set

File:
- [schema.ts](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/db/schema.ts:23>)

Issue:

The `members` table includes the main MVP fields:

- email
- display name
- birth date
- self-attestation timestamp
- guidelines acceptance data
- bio
- interests
- friendship goals
- city
- region
- location visibility
- discoverable
- status

Why this matters:

This aligns well with the MVP data model, but it does not yet reflect the fuller document set around:

- onboarding completion state as a distinct concern
- future restricted safety categories
- clearer structural separation for future operational data

Priority:
- medium

Recommended action:
- keep the current schema for MVP continuity
- plan a schema-alignment pass before deeper post-MVP features

## 5. Strong Alignment Areas

### Hosted Auth Direction

Files:
- [signup/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/signup/page.tsx:57>)
- [onboarding/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/onboarding/page.tsx:17>)

What aligns:

- hosted sign-in is clearly presented
- the UI avoids claiming direct password handling
- onboarding distinguishes email confirmation from identity or age verification

### Age-Gate and Self-Attestation

File:
- [member-onboarding-form.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/components/member-onboarding-form.tsx:50>)

What aligns:

- birth date is collected
- 21+ self-attestation is explicit
- the copy clearly states this is not verified identity or age

### Profile and Discovery Field Use

Files:
- [member-onboarding-form.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/components/member-onboarding-form.tsx:67>)
- [profile/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/member/profile/page.tsx:11>)
- [discover/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/member/discover/page.tsx:11>)

What aligns:

- display name, bio, interests, friendship goals, and location output are used appropriately
- discovery does not appear to expose birth date or email
- privacy-controlled location output is already part of the member experience

### Settings Privacy Controls

Files:
- [settings/page.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/member/settings/page.tsx:11>)
- [member-settings-form.tsx](</Users/rachel.kemmett/Library/Mobile Documents/com~apple~CloudDocs/ReeferBudz App/reeferbudz-web/app/components/member-settings-form.tsx:1>)

What aligns:

- location visibility choices are present
- discoverability control is present
- the copy reinforces that street addresses are not requested

## 6. Immediate Fix Order

The cleanest fix order is:

1. remove or retire the legacy preview signup and emergency-contact flow
2. align settings placeholders with what is truly implemented versus future
3. run a schema-alignment pass against the final data docs
4. continue the audit across the rest of the public-site pages and shared navigation

## 7. Overall Status

### Public Website

- partially aligned
- brand and page structure exist, but a full page-by-page audit is still needed

### Member App MVP

- mostly aligned at the MVP level
- strongest areas are onboarding, profile, settings privacy, and discovery

### Auth and Safety Foundations

- mostly aligned in the current main flow
- weakened by legacy preview artifacts that should be removed or retired

## 8. Audit Conclusion

The current ReeferBudz codebase is not starting from zero and is not fundamentally off track.

Its strongest alignment is in the newer hosted-auth, onboarding, profile, settings, and discovery flow.

Its biggest problem is not the core direction. Its biggest problem is that older preview-era flows still exist and conflict with the locked product and safety rules.

The next highest-value implementation step is to remove those conflicting legacy flows and bring the active codebase fully in line with the finalized foundation documents.
