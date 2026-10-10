# Lesson 3 — Single Sign-On

**Chapter 1 · Identity Foundations · Lesson 3 of 24**

## What you'll learn

- What Single Sign-On (SSO) actually solves, beyond "users don't have to log in twice"
- The two SSO initiation patterns — SP-initiated and IdP-initiated — and how the first click differs between them
- Where Single Sign-On Settings lives in Setup and what federated authentication means there
- Why SSO does not replace Salesforce's authorization model, only its login step

## The problem SSO solves

Without SSO, every application a company uses maintains its own username/password database. That means employees juggle a dozen passwords, IT staffs a password-reset help desk, and — worse from a security standpoint — a breach of any one weak application can expose credentials that get reused everywhere else. Single Sign-On solves this by having **one** system authenticate the user, and having every other system trust that single authentication event instead of asking for credentials again.

Salesforce supports SSO through two main protocol families: **federated authentication using SAML** (Lesson 4) and **OAuth/OpenID Connect-based social or enterprise sign-on** (Lessons 5–6). This lesson covers the SSO concept and configuration surface that both approaches share; the next three lessons go deep on each protocol.

## Where it lives in Setup

From Setup, search the Quick Find box for **Single Sign-On Settings**. This is the central configuration page for federated authentication into Salesforce — it's where you enable SAML, upload the identity provider's certificate, and define the SAML single sign-on settings that tell Salesforce which external IdP to trust and how to validate its assertions.

![The SAML Single Sign-On Settings detail page in Salesforce Setup, showing fields including Issuer, Entity ID, Identity Provider Login URL, Identity Provider Logout URL, Custom Error URL, and Identity Provider Certificate.](/courses/identity-and-access-management/ch01/03-single-sign-on/saml-sso-settings-page.png)
*The SAML Single Sign-On Settings page — the central record Salesforce uses to trust an external identity provider.*

Every field on this page maps to a concept from Lesson 2: the **Issuer** and **Entity ID** identify the IdP and SP respectively, the **Identity Provider Login URL** is where Salesforce redirects unauthenticated users, and the **Identity Provider Certificate** is the cryptographic trust anchor Salesforce uses to validate every assertion it receives.

## SP-initiated vs. IdP-initiated SSO

The two SSO flows differ in **where the user starts**, and this distinction matters enormously for troubleshooting and for exam-style scenario questions:

| Pattern | User starts at... | Flow |
|---|---|---|
| **SP-initiated** | The Salesforce login page or a deep link | Salesforce detects the user isn't authenticated, redirects them to the IdP, the IdP authenticates them and posts an assertion back to Salesforce |
| **IdP-initiated** | The identity provider's own portal (an app tile, a dashboard) | The IdP authenticates the user first, then proactively sends a signed assertion to Salesforce without Salesforce ever redirecting anywhere |

A classic real-world failure mode: an org enables SSO and disables the standard login page, assuming all traffic will be SP-initiated. A deep link to a specific report then breaks, because the user hits Salesforce unauthenticated, gets redirected to the IdP, authenticates, and — depending on configuration — lands on the Salesforce home page instead of the report they originally wanted. Getting the relay state and redirect behavior right for both flow directions is a recurring architecture decision, not a one-time setting.

## SSO changes login, not authorization

It's worth repeating the point from Lesson 1 in this specific context: enabling SSO changes **how** a user proves their identity. It does not touch profiles, permission sets, role hierarchy, or sharing rules. A user who logs in via SSO and a user who logs in with a Salesforce username and password, if assigned the same profile and permission sets, can do exactly the same things once their session exists. Architects sometimes get asked to use SSO as an access-control mechanism ("only let people in through SSO so we can restrict who gets in") — that's a legitimate goal, but it's implemented through **profile-level login restrictions and IP ranges**, not through SSO configuration itself.

## Key terms

| Term | Meaning |
|---|---|
| Single Sign-On (SSO) | Authenticating once and having that authentication trusted by multiple systems |
| Federated authentication | SSO implemented using a protocol like SAML, where an external IdP's assertions are trusted |
| SP-initiated SSO | The login flow starts at the service provider (Salesforce) |
| IdP-initiated SSO | The login flow starts at the identity provider's own portal |
| Single Sign-On Settings | The Setup page where federated SAML authentication is configured |

## Lab

In a free Developer Edition org, go to Setup and search for **Single Sign-On Settings**. Without actually enabling SAML (you'd need a real external IdP to test against), review the fields on the page and write down:

1. Which field would hold the external identity provider's certificate.
2. Which field determines the URL Salesforce redirects unauthenticated users to for SP-initiated login.
3. One sentence explaining what would happen if the Identity Provider Certificate were allowed to expire without being renewed.

## Check yourself

- What is the fundamental problem SSO solves, beyond user convenience?
- Explain the difference between SP-initiated and IdP-initiated SSO using a concrete example of each.
- Why doesn't enabling SSO change what an already-authenticated user is authorized to do in Salesforce?
