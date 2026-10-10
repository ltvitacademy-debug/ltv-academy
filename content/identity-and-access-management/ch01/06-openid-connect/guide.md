# Lesson 6 — OpenID Connect

**Chapter 1 · Identity Foundations · Lesson 6 of 24**

## What you'll learn

- How OpenID Connect (OIDC) relates to OAuth 2.0 — it's a layer on top, not a competing protocol
- What an ID token is and how it differs from an OAuth access token
- Where Salesforce uses OIDC: Auth. Providers for social/enterprise login, and Salesforce itself as an OIDC provider
- How to reason about when a project needs OIDC specifically, versus plain OAuth or SAML

## OIDC is OAuth plus identity

Lesson 5 established that OAuth 2.0 authorizes access to resources but says nothing, by itself, about *who* the user is — an access token proves "this holder is allowed to call this API," not "this holder is Jane Smith." **OpenID Connect (OIDC)** fixes that gap by adding a standardized identity layer on top of OAuth 2.0's authorization flows. When an app requests the `openid` scope alongside its OAuth scopes, the authorization server returns an additional artifact: an **ID token**.

## ID tokens vs. access tokens

This distinction is one of the most frequently confused points in identity architecture:

| | Access token | ID token |
|---|---|---|
| **Purpose** | Authorizes calls to an API or resource | Proves who the user is |
| **Format** | Often opaque (a string the API understands, not the client) | Always a **JWT** (JSON Web Token) with a defined set of claims |
| **Consumer** | The resource server (the API being called) | The client application itself |
| **Typical claims** | Scopes, expiration | `sub` (subject/user identifier), `iss` (issuer), `aud` (audience), `exp` (expiration), plus identity claims like email or name |

A client application decodes the ID token's JWT to learn who just authenticated — their subject identifier, email, and other claims the issuer chose to include — while it uses the access token purely to make authorized API calls. Conflating the two is a common and risky mistake: an access token should never be assumed to carry trustworthy identity claims the way an ID token does.

## Where Salesforce uses OIDC

Salesforce interacts with OpenID Connect in two directions:

1. **Salesforce as an OIDC relying party** — When you configure an **Auth. Provider** (Setup → Quick Find → "Auth. Providers") using the OpenID Connect provider type, Salesforce becomes a client that trusts an external OIDC issuer (a corporate identity system, or a social provider like Google) to authenticate users and hand back an ID token, which Salesforce then uses to log the user in or run a registration handler for Just-in-Time provisioning (Lesson 12).
2. **Salesforce as an OIDC provider** — Salesforce can also issue its own ID tokens, letting Salesforce-authenticated users single-sign-on into other applications that trust Salesforce as their OIDC issuer — a specific case of Salesforce acting as an identity provider (Lesson 9).

Setting up an Auth. Provider of type OpenID Connect requires registering an app with the external OIDC provider first, collecting its client ID, client secret, and the authorization, token, and user-info endpoint URLs, then entering those into Salesforce's Auth. Provider record. Salesforce then generates a callback URL that must be registered back with the external provider — the trust relationship has to be configured on both sides before any login will succeed.

## Choosing OIDC vs. SAML vs. plain OAuth

A practical way to reason about protocol choice:

- Need to authenticate a user and don't control both sides' legacy enterprise identity stack? **OIDC** is usually the modern, simpler choice — it's JSON/REST-based rather than XML/SOAP-based, and most modern identity providers support it natively.
- Integrating with a large enterprise identity system that's been running since before OIDC existed (many AD FS deployments, older IdP products)? **SAML** is often still the path of least resistance, since that's what the existing infrastructure speaks.
- Only need to call an API on a user's behalf, with no need to learn who that user actually is? **Plain OAuth** (no `openid` scope) is sufficient — don't add OIDC's identity layer if nothing in the integration actually consumes an ID token.

## Key terms

| Term | Meaning |
|---|---|
| OpenID Connect (OIDC) | An identity layer built on top of OAuth 2.0 |
| ID token | A JWT issued by an OIDC provider that proves who the user is |
| `openid` scope | The OAuth scope that triggers issuance of an ID token |
| Auth. Provider | The Salesforce Setup object used to configure trust in an external authentication source, including OIDC issuers |
| Claim | A piece of identity information carried inside an ID token (e.g., email, subject identifier) |

## Lab

Scenario: A client wants their customer-facing mobile app to "Sign in with Google" and have that identity recognized inside a Salesforce Experience Cloud site. Write a short design note (150–250 words) that:

1. Identifies which protocol (SAML, plain OAuth, or OIDC) fits this scenario and explains why.
2. Names the Salesforce Setup object you'd configure to trust Google as the external identity source.
3. Explains what Salesforce would need to do with the ID token's claims the first time a brand-new Google user signs in (hint: connects to Lesson 12).

## Check yourself

- What does an ID token prove that an access token does not?
- Name the two directions Salesforce can participate in an OIDC relationship.
- When would you choose SAML over OIDC for a new enterprise SSO integration, and why?
