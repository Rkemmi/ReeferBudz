# ReeferBudz Guardian v1 Product Specification

Status: Founder-directed specification; implementation not started
Date: August 7, 2026

## 1. Product decision

Guardian is a planned, user-started safety session for ReeferBudz members. It is not continuous account-level tracking, an emergency-response service, a welfare-check service, or a guarantee of safety.

Guardian setup may be required before a member uses a future Guardian-assisted meetup or check-in feature. Guardian setup and location permission must not block basic account creation.

## 2. Member promise

Guardian helps a member:

- name and verify an emergency contact
- start a time-limited safety session
- share location only while that session is active
- receive check-in reminders
- alert the verified contact after a missed check-in and grace period
- stop sharing and end the session at any time

Guardian does not:

- monitor members continuously
- guarantee that an alert is delivered or acted upon
- call 911 automatically in v1
- dispatch ReeferBudz staff or emergency responders
- establish that another member or meetup is safe

## 3. Eligibility and boundaries

- Members must be signed in and have completed 21+ self-attestation.
- Age and identity must not be described as verified unless a real verification provider is integrated.
- A member may create a basic account without Guardian.
- A verified emergency contact is required to start a Guardian session.
- Location access is requested when the member starts Guardian, not during basic account creation.
- The member can deny or revoke location permission and continue using non-Guardian account features.

## 4. Guardian setup flow

### Screen 1: What Guardian is

Explain the session, the alert sequence, limits, data use, and member controls before collecting restricted data.

Primary action: `Set up Guardian`

Secondary action: `Not now`

### Screen 2: Emergency contact

Required fields:

- emergency contact name
- emergency contact phone number in international format

Optional fields:

- emergency contact email address
- relationship label

Required member confirmations:

- `I have permission to list this person as my emergency contact.`
- `I understand ReeferBudz will not send Guardian alerts until this contact accepts.`

### Screen 3: Contact verification

ReeferBudz sends a verification message containing:

- the member's chosen display name
- a plain-language description of Guardian
- an accept link with a short-lived, single-use token
- a decline option
- instructions for opting out later
- a warning that ReeferBudz is not emergency services

Until accepted, the contact status is `pending` and Guardian cannot start.

### Screen 4: Ready state

Show:

- verified contact name
- masked phone number
- optional masked email
- verification date
- update, replace, and remove actions
- link to Guardian privacy and retention details

## 5. Start Guardian flow

The member selects:

- expected session end time
- check-in reminder timing
- an optional private note for the emergency contact

Before the operating-system permission prompt, show a prominent disclosure:

`Guardian uses your location only while you have an active Guardian session. Your verified emergency contact may receive a time-limited location link if you miss your check-in and do not respond during the grace period. You can stop Guardian at any time.`

The member then accepts the current Guardian terms and starts the session. The app requests the minimum location permission needed for the active session.

## 6. Active Guardian screen

The active screen must continuously show:

- `Guardian active`
- start time and expected end time
- next check-in time
- verified contact
- current location-permission state
- latest successful location-update time
- `I'm safe` action
- `Extend session` action
- `End Guardian` action

The system must not silently represent a session as protected when location permission, connectivity, or notification delivery has failed. Display degraded states clearly.

## 7. Alert timeline

Default v1 timeline:

1. Fifteen minutes before the expected end, send the member a check-in reminder.
2. At the expected end, ask the member to confirm `I'm safe`, extend, or end Guardian.
3. If unanswered, begin a ten-minute grace period and notify the member again.
4. During the grace period, retry the member notification through available channels.
5. At the end of the grace period, create an alert event and notify the verified emergency contact.
6. The contact receives the member's display name, session timing, last successful update time, a time-limited location link, and instructions to contact the member or emergency services if they believe help is needed.
7. When the member checks in or ends Guardian, notify the contact that the Guardian alert is resolved.

All timing values must be configurable and tested. V1 does not automatically contact 911.

## 8. Consent language

### Member Guardian consent

`I choose to start a time-limited Guardian session. I understand that ReeferBudz will collect and use my location while this session is active, may send check-in reminders, and may share a time-limited location link with my verified emergency contact if I miss my check-in and do not respond during the grace period. I can end Guardian and stop sharing at any time. Guardian is not emergency services and does not guarantee monitoring, alert delivery, intervention, or safety.`

### Emergency-contact confirmation

`I agree to receive Guardian verification, alert, and resolution messages for this ReeferBudz member. I understand ReeferBudz is not emergency services and does not guarantee monitoring or intervention. I can decline or opt out at any time.`

### Location disclosure

`Allow location during this Guardian session so ReeferBudz can record session updates and, if the alert conditions are met, share a time-limited location link with your verified emergency contact. Location sharing ends when Guardian ends, permission is revoked, or the app can no longer receive location updates.`

These drafts require qualified legal and privacy review before production use.

## 9. Restricted data model

Guardian data must be stored separately from public member-profile data.

### `guardian_contacts`

- id
- member_id
- encrypted contact name
- encrypted phone number
- encrypted optional email
- optional relationship label
- verification status: pending, accepted, declined, revoked, expired
- verification token hash and expiry
- contact consent version, source, and timestamp
- created, updated, removed timestamps

### `guardian_consents`

- id
- member_id
- consent type
- document version
- consent status: accepted or withdrawn
- source
- timestamp
- Guardian session id when applicable

### `guardian_sessions`

- id
- member_id
- guardian contact id
- status: scheduled, active, degraded, check_in_due, grace_period, alerted, resolved, ended, cancelled, expired
- start time
- expected end time
- grace-period end time
- last successful location-update time
- ended and resolved timestamps
- resolution reason
- Guardian terms version

### `guardian_location_updates`

- id
- session id
- encrypted latitude and longitude
- accuracy radius
- captured timestamp
- received timestamp
- retention expiry timestamp

Do not store a permanent location trail by default. Consider retaining only the latest successful update plus the minimum event history needed to operate and audit the session.

### `guardian_alert_events`

- id
- session id
- alert type
- recipient type
- channel
- provider reference
- status: queued, sent, delivered, failed, acknowledged
- attempt count
- failure category without sensitive message content
- created, sent, delivered, and acknowledged timestamps

### `guardian_access_audit`

- id
- restricted record type and id
- actor type and actor id
- permitted action
- reason code
- timestamp

Audit logs must not duplicate phone numbers, email addresses, precise coordinates, or message bodies.

## 10. Access controls and security

- Only the member can create, update, replace, or remove their contact.
- Emergency contacts can accept, decline, and opt out through signed, expiring links.
- Other members can never see Guardian records.
- Staff access is denied by default and requires an explicitly defined restricted role and reason.
- All reads and writes derive member identity server-side; client-supplied member ids are not trusted.
- Encrypt transport, restricted fields, coordinates, and backups.
- Keep encryption keys outside the database and rotate them through a documented process.
- Use short-lived, single-use verification tokens and short-lived location-link tokens.
- Rate-limit contact creation, verification, location writes, check-ins, and alert attempts.
- Remove personal data from normal application and provider logs.
- Test authorization boundaries, token replay, enumeration, notification spoofing, and deletion.

## 11. Retention and deletion baseline

Proposed defaults pending legal review:

- pending contact verification: delete after 7 days
- declined or revoked contact details: delete promptly; retain only minimal consent-event evidence when justified
- precise location updates: delete 24 hours after the session resolves
- session operational record: retain 30 days
- alert-delivery and consent records: retain only for the approved legal/security period
- verification and location-link tokens: delete or invalidate immediately after use or expiry

Member controls must support:

- remove or replace emergency contact
- withdraw Guardian consent
- end an active session
- delete eligible completed session data
- request account and associated Guardian-data deletion in app and through a web path

Deletion must cascade to service providers where applicable and produce a completion record without retaining the deleted sensitive values.

## 12. Notification architecture

- Use mobile push for member reminders and state changes.
- Use SMS for contact verification and urgent Guardian alerts.
- Use email only as an optional secondary channel.
- Send notifications from a trusted backend, never directly from the client.
- Record provider status and failure categories.
- Respect contact opt-out immediately.
- Never put precise coordinates directly in SMS or push text; use an authenticated, expiring link.

## 13. Failure and degraded states

Guardian must explicitly handle:

- location permission denied or revoked
- background updates unavailable
- app terminated or device offline
- low accuracy or stale location
- notification permission denied
- push, SMS, or email provider failure
- contact declines or opts out
- session timer-worker delay
- duplicate delivery
- expired or replayed links

The member must see when Guardian is degraded. The product must not display a green or safe state merely because a timer exists.

## 14. Build sequence

1. Approve the Guardian purpose, limits, alert timeline, and retention rules.
2. Obtain qualified privacy, safety, and messaging-consent review.
3. Implement reporting, blocking, moderation ownership, and restricted staff access prerequisites.
4. Build contact entry, verification, update, removal, and opt-out.
5. Build consent records, audit records, and account/Guardian deletion.
6. Build user-started session state and timer orchestration.
7. Build native mobile location capture for active sessions.
8. Add push, SMS, and optional email delivery.
9. Add time-limited contact location view.
10. Run real-device, failure, battery, privacy, accessibility, security, and deletion tests.
11. Run a private beta with test contacts before real-member release.

## 15. Production gates

Guardian must remain unavailable to real members until all of these are evidenced:

- native mobile location behavior works on supported iOS and Android versions
- contact verification and opt-out work end to end
- background, offline, permission-revocation, and stale-location states are accurate
- notification retries do not create misleading or duplicate alerts
- restricted-data authorization and encryption review passes
- retention and deletion run automatically and are tested
- privacy policy, Guardian terms, contact notice, and consent versions are approved
- staff ownership, incident procedures, monitoring, and provider failure alerts exist
- language never promises constant monitoring, guaranteed delivery, intervention, or safety

## 16. Current implementation status

- Product specification: built for founder review
- Consent copy: draft; legal/privacy review required
- Database schema: generated in migrations `0004_guardian_v1.sql` and `0005_guardian_indexes.sql`; hosted application remains pending
- Emergency-contact setup: built and technically verified locally; hosted use pending encryption-key configuration and migration application
- Contact verification: acceptance/decline endpoint and page built; outbound verification delivery not connected
- Guardian session engine: not built
- Background location: not built
- Notifications: not built
- Deletion controls: emergency-contact removal and consent withdrawal built; full account and session-data deletion not built
- Production readiness: blocked by the gates above
