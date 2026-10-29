# Lesson 3 — Single Sign-On and How SAML and OIDC Actually Work

**Chapter 1 · Identity Architecture at Enterprise Scale · Lesson 3 of 4**

## What you'll learn

- What SAML actually is — an XML-based protocol exchanging signed assertions — and how its login flow really works
- What OIDC actually is — a JSON/REST-based protocol built on OAuth 2.0 — and how its login flow really works
- Why OIDC has become the default for modern web and API-based apps while SAML remains common in enterprise and legacy integrations
- How to recognize which protocol a given SSO integration is using, and why that matters

## SAML: signed XML assertions between two trusted parties

**SAML** (Security Assertion Markup Language) is an XML-based protocol built around one idea:
the **identity provider (IdP)** makes a signed statement about a user's identity, and the
**service provider (SP)** — the app the user is trying to reach — trusts that statement because
it can verify the signature. A simplified, SP-initiated SAML flow looks like this:

1. The user tries to reach the app (the SP).
2. The SP redirects the user to the IdP with a SAML authentication request.
3. The user authenticates at the IdP — password, MFA, whatever the IdP's policy requires.
4. The IdP returns a signed **assertion** (an XML document) to the SP's Assertion Consumer
   Service URL, usually via an HTTP POST through the user's browser.
5. The SP validates the assertion's digital signature and, if it checks out, trusts the identity
   claims inside it and starts a session.

A real assertion, trimmed down, looks something like this:

```
<saml:Assertion>
  <saml:Issuer>https://idp.example.com</saml:Issuer>
  <saml:Subject>
    <saml:NameID>jane.doe@company.com</saml:NameID>
  </saml:Subject>
  <saml:AttributeStatement>
    <saml:Attribute Name="Department">Finance</saml:Attribute>
  </saml:AttributeStatement>
</saml:Assertion>
```

Notice what the SP never sees: a password. It only ever sees the IdP's signed claim.

## OIDC: JSON tokens built on OAuth 2.0

**OIDC** (OpenID Connect) solves the same problem differently, by adding an identity layer on
top of **OAuth 2.0** — a framework originally built for delegated API access, not logins. A
simplified Authorization Code flow looks like this:

1. The app (the client) redirects the user to the IdP's authorization endpoint.
2. The user authenticates at the IdP.
3. The IdP returns a short-lived authorization code to the app's redirect URI.
4. The app exchanges that code, at the IdP's token endpoint, for an **ID token** — a signed JWT
   — plus an access token.
5. The app validates the ID token's signature against the IdP's published keys and reads the
   claims inside it to know who the user is.

Decoded, an ID token's payload is plain JSON:

```
{
  "iss": "https://idp.example.com",
  "sub": "a1b2c3d4-user-id",
  "aud": "app-client-id",
  "email": "jane.doe@company.com",
  "exp": 1732550400
}
```

## Why OIDC is now the default, while SAML persists

OIDC's JSON-over-REST shape is lighter than SAML's XML and browser-POST redirects, and it works
naturally with mobile apps and public APIs — which is exactly why modern web, mobile, and
SaaS-native apps tend to default to it. SAML hasn't gone anywhere, though: a large share of
long-established enterprise and legacy applications built their SSO support on SAML years ago,
and there's no reason to rebuild something that already works. In practice, most enterprise
IdPs — including Entra ID, Okta, and Ping Identity from Lesson 2 — support both protocols side by
side, precisely because both are still in active use across a typical company's app portfolio.

## Key terms

| Term | Meaning |
|---|---|
| SAML | XML-based protocol exchanging signed assertions between an IdP and a service provider |
| OIDC | JSON/REST-based identity layer built on top of OAuth 2.0, using an ID token (JWT) |
| Assertion | The signed XML statement a SAML IdP issues about a user's identity |
| ID token | The JWT an OIDC IdP issues containing claims about the authenticated user |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking, the one-sentence difference
between what a SAML assertion is and what an OIDC ID token is.
