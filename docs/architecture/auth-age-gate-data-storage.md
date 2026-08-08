# ReeferBudz Auth, Age Gate, and Data Storage

Status: Final
Date: August 7, 2026

## 1. Purpose

This document defines the operating rules for:

- account entry
- authentication
- sign-in and sign-out
- password handling
- age-gate language
- birth-date handling
- member-data storage
- future profile-photo storage
- future emergency-contact storage
- public, private, and restricted data visibility

Its purpose is to keep identity-related and sensitive-data decisions clear, consistent, and aligned with the actual product.

## 2. Core Position

ReeferBudz is an adults-only friendship and community platform. Because of that, account access, age-gate handling, and personal-data handling must be privacy-conscious, clearly described, and limited to what the product can actually support.

ReeferBudz must not:

- claim identity verification if identity is not actually verified
- claim age verification if age is not actually verified
- imply safety outcomes the product cannot support
- expose sensitive information casually
- create confusion about what data is public, private, or restricted

## 3. Authentication Model

### Current Direction

The current ReeferBudz direction is:

- account entry is handled through a hosted authentication flow
- ReeferBudz does not directly collect or store member passwords
- authenticated member access is tied to trusted server-side identity information
- signed-in pages are handled separately from the public website experience

### What This Means

ReeferBudz is responsible for:

- controlling access to member-only areas
- associating the authenticated account with the correct member record
- protecting member-only routes and member-only data

ReeferBudz should not describe itself as directly storing passwords or directly owning password recovery if those functions are handled by the hosted authentication provider.

## 4. Sign-In, Sign-Out, and Password Position

### Sign-In

Members enter the member experience through the hosted sign-in flow connected to the ReeferBudz platform.

### Sign-Out

Members must be able to sign out clearly from the member experience. Sign-out should end access to member-only surfaces in a predictable way.

### Password Handling

If hosted authentication remains the selected model, ReeferBudz should maintain the position that it does not directly collect or store passwords.

### Password Reset

If hosted authentication remains the selected model, password reset should be handled through that provider’s supported recovery flow rather than through a separate ReeferBudz-built password system.

### Rule

ReeferBudz must not describe password handling in a way that suggests direct password storage, direct password reset ownership, or password-verification responsibility if those actions are actually handled by the authentication provider.

## 5. Age Gate Position

### Current Position

ReeferBudz is intended only for adults age 21 and older.

The current product direction includes:

- collection of birth-date information
- separate 21+ self-attestation
- adults-only platform messaging
- restricted member onboarding tied to the age requirement

### What ReeferBudz Can Truthfully Say Now

If the current flow remains unchanged, ReeferBudz can truthfully say:

- the platform is intended only for adults age 21 and older
- users are required to provide birth-date information
- users are required to self-attest that they are 21 or older

### What ReeferBudz Must Not Say Unless the System Changes

ReeferBudz must not say:

- that age is verified
- that identity is verified
- that legal age has been independently confirmed
- that the platform performs formal age assurance if it does not

### Safe Language

Safe language includes:

- adults-only
- 21+ required
- self-attested 21+
- birth date collected during onboarding

Unsafe language, unless the system changes, includes:

- verified age
- age-confirmed identity
- identity-verified adult
- independently age-checked member

## 6. Birth-Date Handling

### Role of Birth Date

Birth date is sensitive account information. It should be collected only for the limited platform purpose of adults-only access and related account requirements.

### Storage Position

Birth date should be stored as private account information and must not be displayed on public pages, member-facing profiles, discovery surfaces, or profile previews.

### Visibility Rule

Birth date must be:

- private
- restricted from other members
- unavailable on public pages
- unavailable in discovery or profile-preview surfaces

### Use Limitation

Birth date should not be reused for decorative profile display, public-facing age signals, marketing logic, or any nonessential member-facing purpose.

## 7. Data Categories

ReeferBudz data should be separated into clear visibility categories.

### A. Public Website Data

Information intended for the open website, such as:

- marketing copy
- public brand pages
- public contact information
- legal and policy pages

This category must not include member-sensitive account information.

### B. Member-Visible Data

Information that may be visible to other members by product design, such as:

- display name
- biography
- interests
- friendship goals
- selected location output based on visibility settings
- other intentionally shared profile information

This category must not automatically include sensitive account or safety information.

### C. Private Account Data

Information that belongs to the member account and should remain private, such as:

- sign-in email
- birth date
- internal account state
- settings values not intended for other members
- future profile-management details not intended for discovery or member visibility

### D. Restricted Safety and Operational Data

Information requiring tighter control, such as:

- future emergency-contact information
- moderation records
- reporting records
- block records
- internal review notes
- abuse-prevention or security-related records

This category should be treated as limited-access operational information, not standard profile information.

## 8. Member Data Storage

### Current Direction

The current product direction is that structured member records are stored in D1.

This includes account-linked member profile information and onboarding-related member state.

### Storage Rules

Member data storage must follow these rules:

- store only information needed for the actual product experience
- separate visible profile data from private account data
- avoid exposing private fields to public or member-facing surfaces by default
- treat sensitive fields as restricted by design
- make visibility rules explicit rather than implied

### Privacy Default Rule

If a field does not need to be public or member-visible, ReeferBudz should default toward private handling.

## 9. Profile Photo Storage

### Current Position

Profile-photo handling is not yet finalized as a storage decision.

### Required Future Decision

Before profile-photo upload is launched, ReeferBudz must define:

- where images are stored
- who can access them
- what moderation rules apply
- what deletion behavior applies
- whether they are visible publicly or only inside member surfaces
- what type, size, and safety restrictions apply

### Rule

Profile-photo upload must not launch without a documented storage, moderation, access, and deletion position.

## 10. Emergency-Contact Storage

### Current Position

Emergency-contact handling is not yet finalized as a product or storage decision.

### Required Future Decision

Before emergency-contact functionality is launched, ReeferBudz must define:

- what information is collected
- why it is collected
- where it is stored
- who can access it
- when it is used
- whether the feature is optional or required
- how it is updated or removed
- whether it creates legal or operational expectations beyond the product’s actual capacity

### Rule

Emergency-contact information must be treated as restricted safety data, not ordinary profile data.

It must not be collected without a documented purpose, access rule, and retention rule.

## 11. Public, Private, and Restricted Visibility Rules

ReeferBudz must define visibility intentionally rather than by convenience.

### Likely Member-Visible

- display name
- biography
- interests
- friendship goals
- selected location output based on visibility settings

### Likely Private

- sign-in email
- birth date
- account-status details
- internal preferences not meant for other members
- future emergency-contact information

### Likely Restricted

- reporting history
- moderation history
- block records
- internal trust-and-safety notes
- abuse-prevention or review data

### Visibility Standard

A sensitive field must not become visible simply because it exists in the same record as profile information.

## 12. Privacy and Safety Language Rules

ReeferBudz should describe privacy and safety carefully.

It can say:

- privacy-conscious
- adults-only
- 21+ required
- self-attested age requirement
- visible safety awareness
- privacy controls
- member visibility settings

It should not say, unless the product truly supports it:

- verified identity
- verified age
- guaranteed safety
- misuse-proof
- background-checked members
- independently confirmed adult status

## 13. Account Lifecycle Requirements

ReeferBudz should define clear rules for account lifecycle handling, even if every flow is not yet fully built.

This includes:

- account creation
- onboarding completion state
- sign-in access
- sign-out
- password recovery through hosted auth if that model remains in use
- future account update flow
- future account deletion or deactivation flow

### Rule

No account-related experience should be described as complete unless the real product path exists or is clearly identified as future functionality.

## 14. Minimum Rules Before Expanded Social Features

Before ReeferBudz expands into deeper social or real-time features, it must have clear answers for:

- who is allowed into the platform
- what age-gate language is truthful
- what information is visible
- what information is private
- how sensitive fields are restricted
- how account access is handled
- how reporting, blocking, and moderation records will be treated

Without those rules, product expansion increases ambiguity and risk.

## 15. Operational Standards

ReeferBudz should operate from these standards:

- collect only information the product can justify
- keep sensitive information private by default
- separate profile data from restricted safety data
- avoid overstating identity, age, or safety claims
- document storage and visibility decisions before launching sensitive new features
- treat authentication, age-gate, and sensitive-data language as product infrastructure, not marketing filler

## 16. Auth, Age Gate, and Data Storage Do's

ReeferBudz should:

- keep adults-only language clear
- describe self-attestation truthfully
- keep password handling aligned with the real authentication model
- keep birth date private
- document storage before launching sensitive new features
- separate public, member-visible, private, and restricted data clearly
- default toward privacy when visibility is not necessary

## 17. Auth, Age Gate, and Data Storage Don'ts

ReeferBudz must not:

- claim verified age unless age is actually verified
- claim verified identity unless identity is actually verified
- imply safety outcomes the product cannot support
- expose birth date, sign-in email, or restricted safety records to other members
- launch photo or emergency-contact features without documented storage rules
- blur profile data with restricted operational or safety data
- describe hosted-auth behavior inaccurately

## 18. Short System Statement

ReeferBudz uses an adults-only, privacy-conscious account model built around hosted authentication, self-attested 21+ access requirements, private birth-date handling, and clear separation between member-visible profile data and restricted account or safety data.
