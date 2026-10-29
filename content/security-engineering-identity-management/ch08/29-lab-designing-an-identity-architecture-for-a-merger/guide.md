# Lesson 29 — Lab: Designing an Identity Architecture for a Merger

**Chapter 8 · Capstone: Engineering an Identity & Hardening Program · Lesson 29 of 32**

## What you'll learn

- How to decide between federating two existing identity providers and migrating one into the
  other, using a real merger as the forcing function
- What actually has to change, app by app, when a SAML-only system and an OIDC-only system both
  have to trust a new identity provider
- How to design a phased MFA rollout for two organizations that started from very different
  places, instead of flipping one switch on day one
- Why the sequencing of an identity merger matters as much as the end state

## The scenario: two identity providers, one company

Castellan Specialty Insurance has just acquired Thornbury Underwriting Partners, and the combined
entity will operate under the Castellan name. Castellan runs 2,400 employees on **Microsoft Entra
ID**: Conditional Access is enforced org-wide, standard users sign in with Microsoft Authenticator
push, and administrators are required onto FIDO2 hardware keys. Thornbury runs 380 employees on
**Okta**, with no Conditional Access at all and roughly 60% of its users still authenticating with
SMS one-time codes — the weakest common MFA factor, and one Chapter 2 already covered as the
first thing a real rollout tries to retire. Day one of integration, every Thornbury employee still
needs to get their work done. The security engineering team has to decide how.

## Decision one: federate first, migrate second

The two options are to **federate** the identity providers — have one trust the other temporarily,
so users keep signing into their existing IdP while apps gradually move — or to **migrate**
Thornbury's users and app integrations into Entra ID immediately and retire Okta on day one. A
full day-one migration sounds cleaner, but Thornbury has roughly forty applications integrated
against Okta, several with SAML metadata and certificates that would all need to be reissued at
once, during the exact weeks underwriters are also learning a new org chart. That's a real outage
risk for no urgent gain. The team chooses to **federate first**: Entra ID becomes the surviving
identity plane (the centralized system every other control depends on, per Lesson 2), Okta is
kept running as a downstream broker for Thornbury's apps during the transition, and each app is
migrated to Entra ID on its own schedule over the next two quarters. Okta is decommissioned only
once the last app has cut over — not before.

## Decision two: SAML and OIDC, app by app

Federation doesn't make the app-level work disappear — it just lets the team do it one app at a
time instead of all at once. Two of Thornbury's systems show the real difference between the two
SSO standards Lesson 3 covered:

- **PolicyTrack**, Thornbury's policy administration system, only supports **SAML 2.0**. Moving it
  means configuring a new entity ID and Assertion Consumer Service (ACS) URL in Entra ID, and
  tracking that Okta's existing signing certificate for this integration expires in seven months —
  a hard deadline the migration plan has to beat, or PolicyTrack logins break on their own
  regardless of the merger.
- **ClaimLine**, Thornbury's claims-processing SaaS, uses **OIDC**. Moving it means registering a
  new application in Entra ID with its own client ID and redirect URI. ClaimLine's vendor contract
  restricts how quickly the identity source can change, so the team keeps Okta as a short-term
  broker for this one app specifically, rather than forcing it onto the same two-quarter timeline
  as everything else.

## Decision three: a phased MFA rollout, not a single cutover

Castellan and Thornbury don't start from the same place, so Lesson 6's rollout model gets applied
in three phases instead of one flip of a switch:

1. **Phase 1 (30 days)** — a pilot group of Thornbury's IT team moves to Entra ID with
   Authenticator push, running under a **report-only** Conditional Access policy that logs what
   would be blocked without blocking anything yet (the same audit-before-enforce discipline
   Chapter 7 teaches for any control).
2. **Phase 2 (90 days)** — every remaining Thornbury standard user is required onto Authenticator
   push, and SMS is disabled as a registered MFA method once the cutover is confirmed complete.
3. **Phase 3 (120 days)** — Thornbury administrators and anyone with access to policy or claims
   systems are required onto FIDO2 hardware keys, matching the bar Castellan's own admins already
   clear.

## Key terms

| Term | Meaning |
|---|---|
| Federation | Two identity providers trusting each other so users keep their existing sign-in while systems migrate on their own schedule |
| Identity plane | The centralized IdP every other security control (SSO, Conditional Access, Zero Trust) depends on |
| Report-only mode | Running a policy so it logs what it would do without enforcing it yet, to catch mistakes before they affect real users |

## Check yourself

Why does federating the two identity providers first, instead of migrating every Thornbury app to
Entra ID on day one, reduce real risk during the merger — and what would go wrong if the team
tried to force PolicyTrack and ClaimLine onto the same migration timeline?
