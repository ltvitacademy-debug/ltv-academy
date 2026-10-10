# Lesson 12 — CRM + Identity Provider: Federation Design

**Chapter 2 · Deep Dives · Lesson 12 of 20**

## What you'll learn

- What specific information a SAML assertion carries, and where Salesforce reads each piece from
- Why a company might need more than one Identity Provider configured at once, and what that implies
- The difference between SAML and OAuth/OIDC-based federation, and when each applies
- Why session security policies are a separate decision from authentication itself

## Going deeper than Lesson 3's SP/IdP roles

Lesson 3 established that Salesforce acts as a Service Provider trusting a corporate Identity Provider's SAML assertion, with Federation ID as the mapping key and Just-in-Time provisioning creating accounts automatically. This lesson goes into the assertion's actual structure and the harder federation questions a growing company runs into once one simple IdP relationship isn't the whole picture anymore.

## What's actually inside a SAML assertion

A SAML assertion is a signed XML document, and Salesforce's SAML SSO configuration defines exactly where within it to look for the pieces it needs:

- **Subject (NameID) or an Attribute element** — carries the actual identity value Salesforce maps against (Federation ID, username, or user ID, per Lesson 3's identity-mapping choice). Salesforce's **Identity Location** setting tells it which of these two places to read from.
- **Issuer** — identifies which IdP sent the assertion, checked against Salesforce's configured expectation so a forged assertion claiming to be from a trusted IdP is rejected.
- **Signature** — cryptographically proves the assertion wasn't altered in transit and actually came from the IdP it claims to be from; Salesforce validates this against the IdP's public certificate configured in the SAML SSO setup.
- **Attribute elements** (optional, beyond the identity value) — can carry additional user details the Just-in-Time handler uses to populate fields on account creation, such as a user's profile or role assignment.

Getting the Identity Location setting wrong — telling Salesforce to look in the Subject when the IdP is actually sending the identity in an Attribute element, or vice versa — is a common real-world SSO misconfiguration, and it fails in a way that looks like "SSO doesn't work" without an obvious error pointing at the actual cause.

## Multiple Identity Providers: not a hypothetical for a growing company

Doverfield's current design assumes one corporate IdP for all employees. That assumption breaks the moment Doverfield acquires a smaller company that runs its own, separate IdP, or spins up a business unit using a different identity system for contractors. Salesforce supports configuring **multiple SAML SSO configurations** in the same org, each with its own Issuer, certificate, and Identity Location settings — but multiple IdPs means Salesforce has to determine, for any given login attempt, which SAML configuration applies. This is typically resolved by routing users to different login endpoints per IdP (so the choice is made before the assertion is even presented, not inferred from its contents afterward), which is a decision that has to be made deliberately as part of the federation design, not discovered as a surprise during an acquisition's IT integration.

## SAML vs. OAuth/OIDC federation

SAML is not the only federation mechanism Salesforce supports, and the choice matters for different use cases. **OAuth 2.0 and OpenID Connect (OIDC)**-based social or external login is a separate mechanism, more commonly used for customer-facing or partner-facing identity (a portal user logging in with a Google or external IdP account) than for workforce SSO, which more commonly uses SAML. Doverfield's employee SSO case (Lesson 3) is a SAML fit; if Doverfield's customer portal (Lesson 4) later wanted to let customers log in with an existing external identity rather than creating a Doverfield-specific portal login, that would point toward an OAuth/OIDC-based external login configuration instead of extending the SAML setup built for employees.

## Session security is a separate decision from authentication

Successfully authenticating a user via SAML answers "who is this," not "how long should their session last, from what network, on what device." Salesforce's session security policies — session timeout, IP restrictions, high-assurance session requirements for sensitive actions — are configured independently of the SSO setup itself, and a federation design review that only covers authentication without also covering session policy has left half the actual security posture undecided.

## Key terms

| Term | Meaning |
|---|---|
| Identity Location | The SAML SSO setting telling Salesforce where in the assertion (Subject or Attribute) to read the identity value |
| Issuer | The field identifying which IdP sent a SAML assertion, validated against Salesforce's configured expectation |
| Multiple SAML configurations | Supporting more than one IdP in the same org, each with its own settings, requiring a way to route each login to the right one |
| OAuth/OIDC federation | A separate federation mechanism from SAML, more typically used for customer- or partner-facing external login |
| Session security policy | Settings governing session duration, network, and device requirements, configured independently of authentication itself |

## Lab

Doverfield acquires a smaller company that runs its own SAML IdP for its 50 employees, who need to keep using their existing IdP login rather than migrating to Doverfield's corporate IdP immediately. Describe what has to be configured in Salesforce to support this (in terms of this lesson's multiple-SAML-configuration concept), and explain what decision has to be made about how a login attempt gets routed to the correct one of the two configurations.

## Check yourself

Can you name the four pieces of a SAML assertion covered in this lesson and what each one is checked for? Can you explain why SAML and OAuth/OIDC are both valid federation mechanisms but typically fit different kinds of users?
