# ReeferBudz Data Schema and Member Fields Map

Status: Final
Date: August 7, 2026

## 1. Purpose

This document defines:

- the core member data fields ReeferBudz should use
- what each field is for
- whether each field is public, member-visible, private, or restricted
- which product surfaces use each field
- which fields are required for MVP
- which fields must not be exposed casually or reused outside their intended purpose

Its purpose is to keep ReeferBudz data handling clear, minimal, privacy-conscious, and aligned with the actual product.

## 2. Core Data Rule

Every member field must have:

- a clear product purpose
- a clear visibility rule
- a clear storage category
- a clear reason for existing

If a field does not have a defined purpose, it should not be collected.

If a field does not need to be visible, it should default to private or restricted.

## 3. Visibility Categories

### A. Public Website Data

Data intended for open public pages.
This category must not include member account data.

### B. Member-Visible Data

Data that may be visible to other signed-in members by product design.

### C. Private Account Data

Data tied to the account that should remain private to the member and the platform.

### D. Restricted Safety or Operational Data

Sensitive data that should be access-limited and never treated like normal profile information.

## 4. Core Member Identity Fields

### Member ID

Purpose:
- internal unique member record identifier

Visibility:
- private operational field

Category:
- private account data

Used by:
- account linking
- profile ownership
- settings ownership
- discovery exclusion logic
- internal platform operations

MVP:
- required

### Sign-In Email

Purpose:
- account access identity
- hosted-auth account linking
- member-account ownership

Visibility:
- private only

Category:
- private account data

Used by:
- authentication linkage
- account recovery path through auth provider
- internal member lookup

MVP:
- required

Rule:
- must not be visible to other members
- must not be displayed on public pages
- should not be reused as profile-facing identity by default

### Display Name

Purpose:
- member-facing identity label

Visibility:
- member-visible

Category:
- member-visible data

Used by:
- member home
- profile
- discovery surfaces
- future connection-related features

MVP:
- required

Rule:
- should be treated as the primary visible identity field rather than sign-in email

## 5. Age-Gate and Eligibility Fields

### Birth Date

Purpose:
- support adults-only access requirement

Visibility:
- private only

Category:
- private account data

Used by:
- onboarding
- age-gate handling
- account eligibility logic

MVP:
- required

Rule:
- must not be shown publicly
- must not be shown to other members
- must not be used as decorative profile information

### 21+ Self-Attestation Status

Purpose:
- record that the member explicitly self-attested to being age 21 or older

Visibility:
- private only

Category:
- private account data

Used by:
- onboarding completion state
- age-gate rule tracking

MVP:
- required

Rule:
- should not be described as age verification

### Attestation Timestamp

Purpose:
- record when self-attestation was completed

Visibility:
- private operational field

Category:
- private account data

Used by:
- onboarding records
- internal eligibility auditing

MVP:
- required

## 6. Profile Fields

### Biography

Purpose:
- allow members to describe themselves in their own words

Visibility:
- member-visible

Category:
- member-visible data

Used by:
- profile
- discovery surfaces

MVP:
- required

### Interests

Purpose:
- capture shared-interest data used for profile meaning and compatibility context

Visibility:
- member-visible

Category:
- member-visible data

Used by:
- profile
- discovery surfaces
- future matching or search logic

MVP:
- required

Rule:
- should use a bounded, structured list where possible rather than uncontrolled free-form sprawl

### Friendship Goals

Purpose:
- clarify what kind of community connection the member is looking for

Visibility:
- member-visible

Category:
- member-visible data

Used by:
- profile
- discovery surfaces
- future connection logic

MVP:
- required

Rule:
- must stay friendship-first in wording and usage
- must not drift into romance-coded intent categories

## 7. Location and Visibility Fields

### City

Purpose:
- support location-based context where the member allows it

Visibility:
- dependent on member-selected visibility setting

Category:
- private account field with controlled output

Used by:
- profile display
- discovery display

MVP:
- optional field, if location is part of onboarding/profile design

Rule:
- raw city value should not automatically equal public visibility

### Region or Area

Purpose:
- support broader, lower-risk location context

Visibility:
- dependent on member-selected visibility setting

Category:
- private account field with controlled output

Used by:
- profile display
- discovery display

MVP:
- recommended if location context is used

### Location Visibility Setting

Purpose:
- control how much location detail is shown

Visibility:
- private account setting controlling member-visible output

Category:
- private account data

Used by:
- profile display logic
- discovery display logic

MVP:
- required if location is part of the product

Rule:
- visibility settings must control output, not just store preference passively

### Discovery Opt-In Status

Purpose:
- control whether a member is eligible to appear in discovery surfaces

Visibility:
- private account setting

Category:
- private account data

Used by:
- discover Budz eligibility logic

MVP:
- required

## 8. Account and State Fields

### Onboarding Completion State

Purpose:
- track whether the member has completed required entry steps

Visibility:
- private operational field

Category:
- private account data

Used by:
- access logic
- member-flow routing

MVP:
- required

### Account Status

Purpose:
- track whether the account is active, limited, inactive, or otherwise operationally changed

Visibility:
- private operational field

Category:
- private account data

Used by:
- access control
- discovery eligibility
- moderation or trust-and-safety actions

MVP:
- required

Rule:
- should not be shown casually to other members

### Community Guidelines Acceptance Status

Purpose:
- record that the member accepted the applicable guidelines state

Visibility:
- private only

Category:
- private account data

Used by:
- onboarding
- platform enforcement records

MVP:
- required

### Guidelines Acceptance Timestamp

Purpose:
- record when guidelines acceptance occurred

Visibility:
- private operational field

Category:
- private account data

Used by:
- onboarding records
- policy tracking

MVP:
- required

## 9. Future Profile-Identity Fields

### Profile Photo

Purpose:
- strengthen visible member identity if later approved

Visibility:
- member-visible only if feature is launched

Category:
- member-visible asset with restricted storage controls

Used by:
- profile
- discovery
- future connection surfaces

MVP:
- not required
- blocked until storage, moderation, deletion, and access rules are finalized

### Additional Profile Attributes

Purpose:
- expand compatibility or self-expression only if product need is clear

Visibility:
- depends on field purpose

Category:
- member-visible or private depending on design

Used by:
- future profile expansion

MVP:
- not required unless explicitly approved

Rule:
- new profile fields should not be added for novelty alone

## 10. Future Social and Interaction Fields

### Connection State

Purpose:
- track future member-to-member connection-request status

Visibility:
- not public
- may affect member-facing UI state

Category:
- private interaction data

Used by:
- future connection-request system

MVP:
- not required

### Message Data

Purpose:
- support future direct communication

Visibility:
- restricted to participating members and platform operations as defined later

Category:
- restricted interaction data

Used by:
- future messaging system

MVP:
- not required
- blocked until reporting, blocking, and moderation dependencies are complete

### Match or Compatibility Signals

Purpose:
- support future compatibility surfacing if later approved

Visibility:
- member-facing only if launched

Category:
- member-visible derived data or private ranking logic

Used by:
- future match-related features

MVP:
- not required

Rule:
- must remain friendship-first and must not drift into romance-coded logic

## 11. Safety and Restricted Fields

### Emergency Contact Data

Purpose:
- support a future safety feature only if later approved and fully defined

Visibility:
- restricted only

Category:
- restricted safety data

Used by:
- future emergency-contact feature only

MVP:
- not required
- blocked until feature purpose, storage, access, retention, and operational rules are finalized

### Reporting Records

Purpose:
- record submitted safety or conduct reports

Visibility:
- restricted only

Category:
- restricted safety data

Used by:
- moderation and trust-and-safety review

MVP:
- reporting structure required before deeper interaction expands

### Block Records

Purpose:
- record member-to-member block relationships

Visibility:
- restricted operational and member-state data

Category:
- restricted safety data

Used by:
- future boundary enforcement
- future discovery or interaction exclusion logic

MVP:
- not required for initial discovery-only MVP
- required before deeper interaction features expand

### Moderation Records

Purpose:
- record reviews, enforcement actions, and internal safety decisions

Visibility:
- restricted only

Category:
- restricted safety data

Used by:
- moderation operations
- enforcement logic

MVP:
- foundational structure required before higher-risk features expand

## 12. Field-to-Surface Map

### Public Website Uses

The public website should use:
- no member account data
- no member-visible profile data
- no restricted safety data

### Member Home Uses

The member home may use:
- display name
- onboarding completion state
- limited profile readiness signals
- selected visibility-controlled location output

### Profile Uses

The profile may use:
- display name
- biography
- interests
- friendship goals
- approved profile identity fields
- visibility-controlled location output

### Settings Uses

Settings may use:
- visibility settings
- discovery opt-in
- internal account preferences
- account-state-related information meant for the member

### Discover Budz Uses

Discover Budz may use:
- display name
- biography
- interests
- friendship goals
- approved profile identity fields
- visibility-controlled location output

Discover Budz must not expose:
- sign-in email
- birth date
- restricted safety records
- internal account-state details beyond what is explicitly intended

## 13. Data Minimization Rules

ReeferBudz should:

- collect only fields the product actually uses
- avoid collecting sensitive data without a defined need
- avoid creating fields just in case
- avoid turning restricted data into visible profile material
- avoid letting convenience override privacy boundaries

## 14. Data Schema Do's

ReeferBudz should:

- define every field before launch
- assign every field a visibility rule
- keep profile data separate from account data
- keep account data separate from restricted safety data
- treat sensitive fields as restricted by design
- use derived visibility output instead of exposing raw values unnecessarily

## 15. Data Schema Don'ts

ReeferBudz must not:

- collect fields with no clear product purpose
- expose private account fields to other members
- expose restricted safety data to member-facing surfaces
- use birth date as profile-facing information
- launch profile-photo or emergency-contact fields without finalized operational rules
- allow raw stored data to become visible just because it exists

## 16. Short Data Statement

ReeferBudz uses a privacy-conscious member data structure built around clear separation between member-visible profile fields, private account fields, and restricted safety or operational data.
