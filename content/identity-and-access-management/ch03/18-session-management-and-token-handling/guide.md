# Lesson 18 — Session Management and Token Handling

**Chapter 3 · Access at Scale · Lesson 18 of 24**

## What you'll learn

- How Salesforce session settings control timeout, security, and lockout behavior
- The Session Security Levels mechanism in full, connecting back to Lessons 1 and 11
- How OAuth access and refresh tokens should be stored, rotated, and revoked
- The architecture-level discipline of treating every token as a credential with a blast radius

## Session settings: the other half of authentication

Authenticating once doesn't mean authenticated forever. **Session Settings** (Setup → Quick Find → "Session Settings") control how long a session stays valid, what happens on inactivity, and whether a session is pinned to the browser/IP that created it. Key settings include:

- **Session timeout** — how long a session stays valid without activity before the user must re-authenticate.
- **Lock sessions to the IP address from which they originated** — prevents a stolen session token (or cookie) from being reused from a different network.
- **Force logout on session timeout** — determines whether a timed-out session is cleanly terminated or merely stops being trusted for new requests.

These settings apply org-wide by default but can be refined at the profile level, letting an architect set stricter session rules for high-privilege profiles (System Administrator) than for a low-risk, self-service external profile.

## Session Security Levels, revisited

Lesson 1 introduced the concept, and Lesson 11 applied it specifically to MFA. The full picture: every session carries a **security level** — **Standard** or **High Assurance** — determined by which authentication method was used to establish it. The **Session Security Levels** section of Session Settings lets an admin assign each authentication method (password only, password + MFA, SSO via a specific identity provider, etc.) to one of the two tiers.

This matters because specific Salesforce features and configurations can require **High Assurance** before they're permitted — for example, requiring a High Assurance session before a user can view a report containing sensitive fields, or before changing their own MFA registration. If a session was established at Standard level, the user is prompted to step up their authentication (often via MFA) before Salesforce allows the High-Assurance-gated action — the session's security level can increase mid-session without a full re-login, a pattern called **step-up authentication**.

## Tokens: access, refresh, and the discipline of treating them as credentials

Lesson 5 covered OAuth access and refresh tokens functionally; this lesson covers how to handle them responsibly once issued:

- **Access tokens should be short-lived.** They're used on every API call, so if one leaks, the exposure window should be as small as possible — minutes to hours, not months.
- **Refresh tokens are long-lived and more sensitive**, because a leaked refresh token lets an attacker mint new access tokens indefinitely. They should be stored encrypted at rest, never logged, and never placed in a URL (which can end up in server logs or browser history).
- **Revocation matters as much as issuance.** When a user is deactivated, or an integration is decommissioned, the corresponding tokens and the connected app's authorization need to be explicitly revoked (via **Setup → Connected Apps OAuth Usage**, or by revoking the user's individual authorization) — simply deactivating the Salesforce user doesn't necessarily invalidate every outstanding token an integration might be holding for API-only access patterns, which is a common gap in deprovisioning checklists.
- **Treat every token like a credential, with a blast radius proportional to its scope.** This directly connects back to Lesson 5's point about narrow OAuth scopes: a leaked token scoped only to read Account data is a contained problem; a leaked token with `full` access scope is a much larger one.

## Key terms

| Term | Meaning |
|---|---|
| Session timeout | How long a session stays valid without activity |
| Session Security Level | Standard vs. High Assurance classification for a session |
| Step-up authentication | Increasing a session's security level mid-session, without a full re-login |
| Access token | A short-lived credential used on each API call |
| Refresh token | A long-lived, higher-sensitivity credential used to mint new access tokens |

## Lab

Scenario: during an offboarding review, you discover that when employees are deactivated, their Salesforce user record is disabled immediately, but no one checks whether any connected app had previously issued that user a refresh token for a mobile integration. Write a short remediation plan (150–250 words) that:

1. Explains why deactivating the user record alone might not be sufficient.
2. Names the Setup area where outstanding OAuth authorizations/tokens can be reviewed and revoked.
3. Proposes one process change to make token revocation a standard part of the offboarding checklist going forward.

## Check yourself

- What's the difference between session timeout and session security level?
- Explain step-up authentication in your own words, using the High Assurance concept from Lesson 11.
- Why should refresh tokens be treated as more sensitive than access tokens, and what follows from that for how they're stored?
