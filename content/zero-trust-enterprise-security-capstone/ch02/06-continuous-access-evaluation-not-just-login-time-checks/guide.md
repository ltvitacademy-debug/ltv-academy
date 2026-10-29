# Lesson 6 — Continuous Access Evaluation, Not Just Login-Time Checks

**Chapter 2 · Verifying Identity Explicitly · Lesson 2 of 4**

## What you'll learn

- Why a standard OAuth access token is a problem for zero trust: once
  issued, it's normally honored until it expires, regardless of what
  changes in between
- What Continuous Access Evaluation (CAE) actually is in Microsoft
  Entra ID, and which critical events it reacts to in near-real time
- How CAE changes the enforcement timeline from "wait for token
  expiry" to "revoke within minutes"
- Why CAE is what makes "verify explicitly" true throughout a session,
  not just at the moment of sign-in

## The problem CAE exists to solve

In standard OAuth 2.0 / OpenID Connect flows, a user signs in once and
Microsoft Entra ID issues an access token that client applications
present on every subsequent call to prove who the user is, without
having to sign in again each time. That's good for usability, but it
has a real security cost: the access token is normally valid, and
honored by the resource it's presented to, for its entire lifetime —
commonly on the order of an hour — no matter what happens to the
user's account in the meantime.

Picture the scenario you'd actually see in an incident: an admin
disables a compromised account the moment they spot it in the sign-in
logs. Without any additional mechanism, that doesn't matter to a
token the attacker already holds — the resource provider has no way
to know the account status changed, and keeps honoring that token
until it naturally expires. In a zero-trust design built on "verify
explicitly," that gap is unacceptable: verification that only happens
at token-issuance time isn't continuous, it's a snapshot.

## What Continuous Access Evaluation actually does

Continuous Access Evaluation closes that gap by creating a near-real-time
channel between Microsoft Entra ID and the resource provider (Microsoft
Graph, Exchange Online, SharePoint Online, and Teams are the primary
CAE-enabled services). Instead of the resource provider blindly trusting
a token until its signed expiry time, CAE lets Entra ID push a small set
of critical events to the resource provider as they happen, so the
resource can revoke access immediately — typically within a few minutes
— instead of waiting out the rest of the token's lifetime.

The critical events CAE reacts to include:

- **The user account is disabled or deleted** in Microsoft Entra ID
- **A user's password is changed or reset**
- **An administrator explicitly revokes all refresh tokens** for a user
- **Microsoft Entra ID Protection evaluates the user's risk as high**,
  based on signals like impossible travel or leaked credentials

Microsoft has also extended CAE toward location-aware enforcement, so a
Conditional Access named-location policy can be re-checked in near real
time when a session's network location changes mid-session, rather than
only at the next token refresh. The core idea stays the same across all
of these: a condition the policy cares about changed, so re-evaluate now
instead of waiting.

## Why this matters architecturally, not just operationally

CAE is the piece that makes continuous verification literally true,
rather than aspirational. Login-time checks — Conditional Access
evaluating device, location, and risk at sign-in — answer "was this
request trustworthy when it was made?" CAE answers the harder question:
"is this session still trustworthy right now?" Those are different
questions, and a zero-trust architecture needs both answered, because a
session that was legitimate at 9:00am can become illegitimate at 9:15am
if the account gets compromised, disabled, or flagged as high-risk in
between.

This also reframes how you think about token lifetime as a security
control. Without CAE, shortening token lifetime is one of the few levers
you have to limit the damage window after a compromise — but shorter
tokens mean more re-authentication traffic and worse user experience.
With CAE, the resource provider can hold a longer-lived token with
confidence, because revocation doesn't depend on the token expiring —
it depends on Entra ID pushing the signal the moment it has one.

## Key terms

| Term | Meaning |
|---|---|
| Continuous Access Evaluation (CAE) | A near-real-time channel between Microsoft Entra ID and supported resource providers that revokes access on critical events instead of waiting for token expiry |
| Access token | A credential issued after sign-in that a client presents to prove identity on each API call, normally honored until a signed expiry time |
| Critical event | One of a defined set of signals (account disabled/deleted, password change, explicit token revocation, high user risk) that CAE propagates immediately |
| CAE-enabled service | A resource provider (Microsoft Graph, Exchange Online, SharePoint Online, Teams) that participates in the CAE channel and can revoke access on a pushed signal |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what
happens to an attacker's already-issued access token the instant an
admin disables the compromised account, with CAE enabled versus without
it?
