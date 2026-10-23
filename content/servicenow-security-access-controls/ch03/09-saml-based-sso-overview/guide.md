# Lesson 9 — SAML-Based SSO: Overview

**Chapter 3 · Authentication & Single Sign-On · Lesson 9 of 24**

## What you'll learn

- What SAML is, and why it's the standard protocol underneath most enterprise SSO
- The two named roles in every SAML exchange: Service Provider and Identity Provider
- What a Multi-Provider SSO configuration record actually holds, and why ServiceNow needs it
- The full login flow, step by step, from the user's first click to a logged-in session
- Why ServiceNow never sees the user's actual password in this model

## SAML: a real, standard protocol, not a ServiceNow invention

Lesson 8 described SSO conceptually — an external Identity Provider
confirms identity instead of ServiceNow checking a password itself.
SAML, Security Assertion Markup Language, is the real, widely-adopted
2.0 protocol most enterprises use to make that actually work. It's
not specific to ServiceNow — SAML 2.0 is an open standard, which is
exactly why it's so common: any SAML-compliant application can trust
any SAML-compliant Identity Provider without custom integration work
for each pairing.

In a SAML exchange, there are always two named parties. ServiceNow
plays the **Service Provider (SP)** — the application the user
actually wants to reach. A separate system plays the **Identity
Provider (IdP)** — commonly a platform like Okta, Microsoft Entra ID
(Azure AD), or Ping Identity. The SP trusts the IdP to vouch for who
the user is, and that trust has to be established and configured
before any of it works.

## The Multi-Provider SSO configuration record

ServiceNow doesn't trust an IdP automatically — that trust is built
from real configuration data stored in a Multi-Provider SSO
configuration record. This record holds the specific pieces of
metadata that let ServiceNow verify that an incoming assertion really
did come from the IdP it claims to come from:

- **Entity ID** — the IdP's unique identifier, so ServiceNow knows
  exactly which IdP it's dealing with.
- **SSO endpoint URL** — the actual address ServiceNow redirects
  users to when they need to authenticate.
- **The IdP's signing certificate** — the cryptographic piece that
  lets ServiceNow verify a SAML assertion was really signed by that
  IdP, and hasn't been tampered with in transit.

Without this record configured correctly, there's no trust
relationship for ServiceNow to lean on at all — it's the entire
foundation the rest of the login flow depends on.

## The login flow, step by step

```
1. User navigates to the ServiceNow instance
2. ServiceNow redirects the browser to the configured IdP's SSO endpoint
3. User authenticates AT THE IdP (password, MFA, whatever it enforces)
4. IdP builds a signed SAML assertion: "this user is confirmed"
5. Browser carries that signed assertion back to ServiceNow
6. ServiceNow validates the signature against the IdP's certificate
7. ServiceNow logs the user in -- their sys_user record, roles, and
   groups take over from here exactly as they always have
```

Notice exactly where the password lives in this sequence: entirely
inside Step 3, entirely at the IdP. ServiceNow is never handed a
password at any point — it only ever receives a signed assertion it
can mathematically verify, in Step 6, using the certificate stored in
its Multi-Provider SSO configuration record. That's the real, concrete
mechanism behind the claim in Lesson 8 that "ServiceNow trusts the
IdP's confirmation" — it isn't blind trust, it's cryptographic
verification of a signed document.

## Why this matters for how you troubleshoot authentication

When a SAML login fails, the two most common real causes trace
directly back to the pieces above: either the signing certificate in
the Multi-Provider SSO record has expired or doesn't match what the
IdP is actually signing with, or the entity ID / endpoint URL is
misconfigured and ServiceNow is redirecting to the wrong place
entirely. Knowing the flow step by step means you know exactly which
configuration record to check first, instead of guessing.

## Key terms

| Term | Meaning |
|---|---|
| SAML (Security Assertion Markup Language) | The open 2.0 protocol most enterprise SSO is built on |
| Service Provider (SP) | ServiceNow's role in the exchange — the application the user wants to reach |
| Identity Provider (IdP) | The external system (Okta, Entra ID, Ping Identity) that confirms identity |
| Multi-Provider SSO configuration record | Holds the entity ID, SSO endpoint URL, and IdP signing certificate that establish trust |
| SAML assertion | The signed document the IdP sends back confirming the user's identity |

## Check yourself

Walk through the seven-step login flow from memory, and point to the
exact step where ServiceNow verifies the SAML assertion's signature —
what configuration record does it check that signature against?
