# Lesson 5 — OAuth Flows

**Chapter 1 · Identity Foundations · Lesson 5 of 24**

## What you'll learn

- What OAuth 2.0 actually authorizes (access to resources via tokens), as distinct from SAML's focus on authentication
- The main OAuth flows Salesforce supports, and which real-world scenario each one fits
- Why the Username-Password flow is being retired, and what Salesforce recommends instead
- How OAuth scopes limit exactly what a connected app's token can do

## OAuth is about authorization, not identity

SAML (Lesson 4) is fundamentally about proving *who someone is*. OAuth 2.0 is fundamentally about *authorizing access to a resource* — issuing a token that lets an application act on a user's (or a system's) behalf, without ever handing that application the user's actual password. OpenID Connect (Lesson 6) then layers identity information on top of OAuth's authorization machinery. Keeping this distinction straight is one of the most commonly tested points in Salesforce identity architecture.

## The flows that matter in practice

Salesforce supports several OAuth 2.0 flows, each suited to a different trust and automation scenario:

| Flow | Used when | Key trait |
|---|---|---|
| **Web Server (Authorization Code)** | A user is present in a browser and needs to grant consent, server-side app holds a client secret | The most common flow for traditional web apps; should be paired with PKCE for public clients |
| **User-Agent (Implicit)** | Legacy browser-only JavaScript apps with no backend | Returns the access token directly in the redirect URL; largely superseded by Authorization Code + PKCE |
| **JWT Bearer** | Unattended, server-to-server automation with no user present | The app signs a JWT with a pre-registered X.509 certificate; an admin pre-authorizes the integration user, and there's no refresh token to manage because the certificate itself re-authenticates each call |
| **Client Credentials** | Server-to-server integration representing the application itself, not an individual user | Uses the connected app's consumer key and secret directly; Salesforce's recommended replacement for most machine-to-machine integrations |
| **Device Flow** | Input-constrained devices (CLI tools, TVs) | The device displays a code the user enters on a separate browser/device to complete authorization; Salesforce has restricted it because a flow startable with only a client ID is a social-engineering target |
| **Username-Password** | Legacy direct-credential exchange | Being retired — Salesforce has a release update retiring this flow for connected apps, since passing a raw username/password/security token defeats much of what modern OAuth and MFA are meant to prevent |
| **Refresh Token** | Renewing an expired access token without re-prompting the user | Issued alongside an access token when the `refresh_token` (offline_access) scope is granted |

For new integrations today, the practical guidance is: use **Web Server (Authorization Code) with PKCE** when a human user needs to grant consent through a browser, and **JWT Bearer** or **Client Credentials** for unattended server-to-server automation. Avoid Username-Password and plain Implicit flows in new designs.

## Scopes: limiting what the token can do

Every OAuth token is granted with a specific set of **scopes** — permissions that define exactly what the token holder can request. Common Salesforce scopes include `api` (access the REST/SOAP/Bulk APIs), `refresh_token`/`offline_access` (allow renewing the token without the user present), `web` (use the token for web-based access), and `full` (broad access, generally discouraged in favor of the narrowest scope that does the job). This screenshot, from a Connected App's OAuth configuration, shows the scope-selection interface where an admin picks exactly which of these a given app is entitled to request:

![The Connected App OAuth settings screen in App Manager, showing the Selected OAuth Scopes list with 'Full access (full)' chosen from the available scopes.](/courses/identity-and-access-management/ch01/05-oauth-flows/oauth-scopes-selection.jpg)
*OAuth scope selection on a Connected App — the moment an admin decides exactly how much access this integration's tokens will carry.*

Scoping tokens narrowly is a core security practice: an integration that only needs to read Account records should never be issued a token scoped for `full` access, because a leaked token is only as dangerous as the scope it carries.

## Key terms

| Term | Meaning |
|---|---|
| OAuth 2.0 | A protocol for authorizing access to a resource via tokens, without sharing passwords |
| Access token | A credential representing granted authorization, used on each API call |
| Refresh token | A long-lived credential used to obtain new access tokens without re-prompting the user |
| Scope | A specific permission a token is granted, limiting what it can be used for |
| JWT Bearer flow | An unattended OAuth flow using a signed certificate instead of user interaction |

## Lab

Scenario: a client needs a nightly batch job (no user present) to pull Opportunity data from Salesforce into their data warehouse. Using the table above, write a short recommendation memo (150–200 words) that:

1. Names the OAuth flow you'd recommend and explains why Username-Password and Authorization Code are both poor fits here.
2. Lists the minimum OAuth scopes the connected app should request.
3. Explains, in your own words, why avoiding a full-access scope matters even for a trusted internal integration.

## Check yourself

- What's the core difference between what SAML and OAuth each accomplish?
- Which OAuth flow would you choose for a CLI tool with no browser, and which for an unattended nightly integration job?
- Why is the Username-Password OAuth flow being phased out?
