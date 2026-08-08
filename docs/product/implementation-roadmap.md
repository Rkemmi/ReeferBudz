# ReeferBudz Implementation Roadmap

Status: Final
Date: August 7, 2026

## 1. Purpose

This document defines the implementation order for ReeferBudz.

It identifies:

- what is already defined
- what is already partially built
- what should be built next
- what depends on other work
- what is blocked until rules or systems are complete
- where founder decisions are still required

Its purpose is to turn the locked brand, product, safety, data, and launch documents into a practical build sequence.

## 2. Roadmap Rule

ReeferBudz should be built in layers.

Each new layer should:

- support the product identity already defined
- respect the launch and MVP boundaries already defined
- avoid introducing higher-risk interaction before required safety and data rules are in place
- avoid rebuilding the same foundation repeatedly

If a feature depends on unfinished privacy, safety, moderation, or storage rules, it should not move ahead of those prerequisites.

## 3. What Is Already Locked

The following foundation documents are already finalized:

- brand foundation
- product concept
- launch and MVP decision matrix
- auth, age gate, and data storage rules
- safety, moderation, and emergency contact rules
- website vs app sitemap and feature map
- data schema and member fields map

This means ReeferBudz already has a locked direction for:

- brand identity
- product category
- MVP scope
- website vs app structure
- account and age-gate rules
- data visibility rules
- safety boundaries
- feature sequencing rules

## 4. What Already Exists in the Product

Based on the current project state, the following areas already exist in some form:

### Public Website Exists

- homepage
- our story
- how it works
- safety
- contact
- privacy
- terms
- accessibility
- community guidelines
- early access
- shop

### Member App Exists

- sign-up entry
- onboarding
- member home
- profile
- settings
- discover Budz

### Existing Technical Foundation Exists

- hosted-auth direction
- D1 member data structure
- protected member routes
- brand assets and page-scene system
- tests and workstream docs

This means the roadmap should prioritize refinement, completion, and safe expansion rather than pretending the product is starting from zero.

## 5. Build Order Overview

ReeferBudz should move in this order:

1. Foundation lock and doc alignment
2. Public website launch-readiness
3. MVP member-app completion
4. MVP safety enforcement completion
5. MVP production-readiness checks
6. Post-MVP expansion features

## 6. Phase 1: Foundation Lock and Doc Alignment

### Goal

Make sure the real codebase and real product decisions follow the locked documents.

### Work in This Phase

- align product language across existing pages with the brand foundation
- align public and member flows with the product concept
- align onboarding, settings, and discovery behavior with auth and data rules
- align safety messaging with the safety and moderation rules
- align current member fields with the data schema document

### Why First

The documents are now stronger than some parts of the existing implementation. The product should not keep building on top of outdated assumptions.

### Status

- partially complete
- requires implementation audit and correction pass

## 7. Phase 2: Public Website Launch-Readiness

### Goal

Make the public website ready to represent the product clearly and credibly.

### Required Work

- final homepage polish against the locked homepage rules
- confirm all public pages match the final product positioning
- confirm the website does not drift into dating-app or marketplace language
- complete responsive and browser review
- complete accessibility review
- complete metadata, link, and legal-page review
- confirm public account-entry path is clear and correct

### Required Before Completion

- final public copy alignment
- final visual alignment with the locked brand document
- accessibility verification
- launch-readiness QA pass

### Status

- partially built
- not fully launch-ready yet

## 8. Phase 3: MVP Member-App Completion

### Goal

Finish the first stable member experience already defined in MVP.

### MVP Member Surfaces

- sign-in entry
- sign-up entry
- onboarding
- member home
- profile
- settings
- discover Budz

### Required Work

- confirm onboarding matches the final age-gate and data rules
- confirm profile fields match the locked data schema
- confirm settings reflect real visibility and account controls
- confirm discover Budz only uses approved visible fields
- confirm protected routes behave consistently
- confirm member navigation is coherent and brand-consistent

### Required Before Completion

- implementation audit against the locked architecture and data docs
- final visibility-rule verification
- discovery-rule verification

### Status

- partially built
- needs refinement and verification

## 9. Phase 4: MVP Safety Enforcement Completion

### Goal

Make sure the MVP is not visually polished but operationally weak.

### Required Work

- implement or formalize reporting flow direction
- implement or formalize block-rule direction before higher-risk features expand
- define moderation access and enforcement behavior
- confirm safety language across the app matches actual capabilities
- confirm sensitive data stays separate from visible profile data

### Important Rule

This phase must be complete before:

- messages
- real-time activity
- broader direct member-to-member interaction

### Status

- policy direction locked
- product implementation incomplete

## 10. Phase 5: MVP Production-Readiness Checks

### Goal

Confirm the actual launchable product matches the defined MVP and does not overreach.

### Required Work

- verify the public website and member app feel like one coherent product
- confirm all MVP pages are working
- confirm no blocked feature has leaked into launch scope
- confirm auth flow matches the documented model
- confirm visibility and privacy rules are actually enforced
- confirm no sensitive field is exposed accidentally
- confirm copy and UI do not overclaim verification, safety, or capability

### Required Output

- final MVP readiness review
- founder sign-off checklist

### Status

- not complete

## 11. Phase 6: Post-MVP Expansion

### Goal

Add later-phase features in the correct order instead of adding them all at once.

### Recommended Order

1. connection requests
2. search users
3. events
4. profile-photo uploads
5. messages
6. matches
7. live Budz
8. recently live Budz
9. emergency contacts

### Why This Order

- connection requests and search are lower-risk than messages
- profile photos require storage and moderation rules first
- messages require reporting, blocking, and moderation readiness
- live-status features increase privacy sensitivity
- emergency contacts require the most careful operational definition

## 12. Blocked Items

The following items should remain blocked until their dependencies are complete:

### Messages

Blocked until:

- reporting rules are implemented
- blocking behavior is defined or implemented
- moderation handling is defined or implemented

### Matches

Blocked until:

- friendship-first logic is protected
- product language prevents romance drift

### Live Budz and Recently Live Budz

Blocked until:

- visibility and privacy rules are operationally clear
- activity exposure rules are defined

### Profile Photo Uploads

Blocked until:

- storage rules are finalized
- moderation rules are finalized
- deletion behavior is finalized

### Emergency Contacts

Guardian is now founder-directed as planned post-MVP work, with a v1 specification in `docs/product/guardian-v1-product-spec.md`.

Implementation remains blocked until:

- qualified privacy, safety, and messaging-consent review is recorded
- reporting, blocking, moderation ownership, and restricted staff access prerequisites are operational
- restricted storage, access, encryption, retention, audit, and deletion controls are implemented
- contact verification and opt-out work end to end
- native mobile active-session location behavior is supported and tested
- notification delivery, retry, degradation, and incident procedures are tested

## 13. Founder Decision Checkpoints

The following decisions still need explicit founder approval before related implementation is considered complete:

- whether self-attested 21+ remains sufficient for launch
- whether shop remains in the public website experience
- whether city-level visibility remains allowed at launch
- whether profile-photo uploads are part of post-MVP phase one or later
- approve or revise the Guardian v1 operating rules, alert timing, retention periods, and production gates
- what exact minimum protections are required before direct messaging goes live

## 14. Immediate Next Build Priorities

The next practical build priorities should be:

1. align the existing codebase with the locked docs
2. finish public website launch-readiness
3. finish MVP member-app refinement
4. complete safety-enforcement implementation prerequisites
5. run MVP production-readiness review

This is the cleanest order because it respects both what already exists and what still needs to be made real.

## 15. Roadmap Do's

ReeferBudz should:

- build in layers
- treat blocked features as truly blocked
- use the locked docs as implementation rules, not inspiration
- finish MVP clearly before expanding scope
- protect privacy and safety decisions from being bypassed by speed

## 16. Roadmap Don'ts

ReeferBudz must not:

- build blocked features early because they seem exciting
- let visuals outrun operational rules
- let member interaction expand faster than moderation and privacy controls
- rebuild foundational decisions that are already locked
- confuse partial implementation with launch readiness

## 17. Short Roadmap Statement

ReeferBudz should finish by aligning the current codebase with the locked product rules, completing the public website and MVP member experience, and only then expanding into higher-risk or higher-complexity community features in a controlled order.
