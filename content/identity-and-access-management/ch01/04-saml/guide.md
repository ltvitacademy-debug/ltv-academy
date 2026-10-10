# Lesson 4 — SAML

**Chapter 1 · Identity Foundations · Lesson 4 of 24**

## What you'll learn

- What SAML actually is: an XML-based standard for exchanging authentication and authorization data
- The anatomy of a SAML assertion, and what claims it typically carries
- How the SAML Web Single Sign-on Browser POST profile works, step by step
- How to read and configure the key fields on a Salesforce SAML Single Sign-On Setting record

## What SAML is

SAML (Security Assertion Markup Language) is an XML-based open standard for exchanging authentication and authorization data between an identity provider and a service provider. It's one of the oldest and most widely deployed federation protocols in the enterprise world — most large organizations' corporate identity systems (Active Directory Federation Services, Okta, Ping Identity, Azure AD/Entra ID) can issue SAML assertions, and Salesforce can act as either the IdP or SP side of a SAML exchange (Lessons 9 and 10).

## The anatomy of a SAML assertion

A SAML assertion is a signed XML document the IdP generates after authenticating a user. It typically contains:

- **Subject** — who the assertion is about, usually expressed as a **Federation ID**, username, or email, depending on how Salesforce is configured to match the assertion to a user record.
- **Conditions** — a validity window (NotBefore/NotOnOrAfter timestamps) that limits how long the assertion can be used, preventing replay attacks.
- **AuthnStatement** — when and how the authentication happened (for example, which authentication method the IdP used).
- **AttributeStatement** (optional) — additional claims about the user, such as their email or a custom attribute, which can drive **Just-in-Time provisioning** (Lesson 12).
- **Digital signature** — the cryptographic proof, verifiable against the IdP's certificate, that the assertion hasn't been tampered with and genuinely came from the trusted IdP.

## The SAML Web Browser SSO POST flow

Salesforce documentation describes the standard flow as using the **SAML Web Single Sign-on Browser POST profile**. In practice:

1. The user's browser is directed to the IdP (either because Salesforce redirected them — SP-initiated — or because they started at the IdP's portal — IdP-initiated).
2. The IdP authenticates the user through whatever method it uses (password, MFA, certificate).
3. The IdP builds a signed SAML assertion and returns it to the browser inside an auto-submitting HTML form.
4. The browser POSTs that form to the SP's **Assertion Consumer Service (ACS) URL**.
5. The SP (Salesforce, if acting as SP) validates the signature against the trusted certificate, checks the conditions haven't expired, matches the subject to a user record, and establishes a session.

Nothing in this flow ever transmits the user's actual password to Salesforce — only the signed assertion. If troubleshooting is needed, Salesforce provides the **SAML Assertion Validator** tool on the Single Sign-On Settings page specifically to decode and check a captured assertion against the org's configuration.

## Configuring the key fields

Building on the Single Sign-On Settings page from Lesson 3, the fields that matter most for a SAML configuration are:

![A SAML Single Sign-On Setting detail page with sample values filled in for the Identity Provider Login URL and related SAML fields.](/courses/identity-and-access-management/ch01/04-saml/saml-sso-setting-idp-login-url.png)
*A configured SAML SSO Setting — Issuer, Entity ID, and Identity Provider Login URL populated with real values from the identity-provider side of the trust relationship.*

| Field | Purpose |
|---|---|
| **Issuer** (Entity ID of the IdP) | Must exactly match the value the IdP puts in its assertions, or Salesforce rejects them |
| **Identity Provider Login URL** | Where Salesforce redirects users for SP-initiated login |
| **Identity Provider Certificate** | Used to validate the assertion's signature |
| **SAML Identity Type** | How to find the matching Salesforce user: by Federation ID, Username, or Salesforce user ID |
| **Service Provider Initiated Request Binding** | Whether Salesforce sends the SP-initiated request via HTTP Redirect or HTTP POST |

A mismatch on any of these — especially the Issuer value or the Identity Type mapping — is the most common cause of SSO failures architects troubleshoot in practice, and it's exactly why the SAML Assertion Validator exists.

## Key terms

| Term | Meaning |
|---|---|
| SAML | XML-based standard for exchanging authentication/authorization data between IdP and SP |
| Assertion | The signed XML statement an IdP issues after authenticating a user |
| Assertion Consumer Service (ACS) URL | The SP endpoint that receives the POSTed SAML assertion |
| Federation ID | A user attribute used to match an incoming SAML subject to a Salesforce user record |
| SAML Assertion Validator | Salesforce's built-in tool for decoding and troubleshooting a captured SAML assertion |

## Lab

Scenario: a client's SAML SSO integration suddenly starts failing for all users with the error "Your request has been blocked because we believe it is an automated attempt to access the login page," or a generic SAML-related login failure. Using what this lesson covered about assertion validity windows and the Issuer field, write a short troubleshooting checklist (4–6 items) an architect should walk through before escalating to the identity provider's support team. Include at least one item related to clock synchronization between the IdP and Salesforce.

## Check yourself

- What are the main components of a SAML assertion, and which one prevents replay attacks?
- Walk through the SAML Web Browser SSO POST flow in your own words, for an SP-initiated login.
- Why must the Issuer field in Salesforce's SAML Single Sign-On Setting exactly match the IdP's configuration?
