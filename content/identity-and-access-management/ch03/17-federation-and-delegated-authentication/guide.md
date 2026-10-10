# Lesson 17 — Federation and Delegated Authentication

**Chapter 3 · Access at Scale · Lesson 17 of 24**

## What you'll learn

- The formal definition of federated identity, and how SAML/OIDC SSO (Lessons 3–10) are specific implementations of it
- What delegated authentication is, mechanically, and how it differs fundamentally from federation
- Why delegated authentication is considered a legacy approach today, and what replaced it
- How to choose between the two when reviewing an older org's existing configuration

## Federation: trust without sharing secrets

**Federated identity** is the general architectural pattern behind everything in Lessons 3–10: multiple systems agree to trust a common identity, verified by signed, cryptographic assertions or tokens, without any system ever transmitting the user's actual password to another. SAML and OIDC are both federation protocols — they differ in format and era, but both work by the IdP vouching through a signed artifact that the SP validates against a previously-established trust (a certificate or public key), instead of the SP ever seeing a credential directly.

## Delegated authentication: a different mechanism entirely

**Delegated authentication** predates most of the federation protocols covered in this course and works completely differently. Instead of exchanging signed assertions, Salesforce makes a real-time **SOAP web service callout** to a client-hosted authentication endpoint every time a user attempts to log in with a username and password. That endpoint — code the client's own IT team writes and hosts — receives the username and password Salesforce collected on its login form, checks them against the client's own authentication system (an LDAP directory, for example), and returns a simple true/false: authenticated or not.

This is architecturally very different from federation in one critical way: **the user's actual password passes through Salesforce's login form and gets sent (over the callout) to the client's endpoint.** Compare this to SAML/OIDC, where Salesforce never even sees the password — the user enters it directly on the external IdP's own page, and only a signed assertion crosses back to Salesforce.

## Why delegated authentication is largely legacy today

Delegated authentication was a reasonable solution before SAML and OIDC were widely supported by enterprise identity systems — it let organizations plug their existing authentication system into Salesforce's login form without building out a full SAML trust relationship. But it has real downsides that modern federation avoids:

- The client has to build, host, and maintain their own authentication web service indefinitely — ongoing engineering burden federation doesn't require.
- Because the password flows through Salesforce's login form on its way to the callout, it doesn't offer the same "Salesforce never sees the password" security property that SAML/OIDC provide.
- It doesn't naturally support modern MFA flows, social sign-on buttons, or the broader login-page branding options covered in Lesson 13, all of which assume a federation-style redirect model.

For these reasons, new identity designs today default to SAML or OIDC federation, and delegated authentication mostly shows up in legacy orgs that configured it years ago and never migrated. An architect reviewing an older org's configuration should recognize delegated authentication when they see it (a checkbox on the user's profile, paired with an Apex or external endpoint URL in Single Sign-On Settings) and treat migrating it to federated SSO as a modernization opportunity, not assume it needs to stay exactly as-is forever.

## Choosing between them in a review

| | Federation (SAML/OIDC) | Delegated authentication |
|---|---|---|
| Password seen by Salesforce? | No | Yes, briefly, in transit to the client's endpoint |
| Ongoing maintenance | Trust configuration (certs, metadata) | A custom web service the client must host and maintain |
| Modern MFA/social login support | Yes, natively | No, not without significant extra engineering |
| Typical use today | New designs, default choice | Legacy orgs, rarely a new recommendation |

## Key terms

| Term | Meaning |
|---|---|
| Federated identity | Trust established via signed assertions/tokens, without sharing passwords |
| Delegated authentication | Salesforce calling a client-hosted web service with the raw username/password for validation |
| SOAP callout | The real-time web service call Salesforce makes during a delegated-authentication login attempt |

## Lab

Scenario: during a system audit, you discover a client's org has delegated authentication enabled for a subset of profiles, pointing to a web service endpoint that hasn't been touched by the client's engineering team in three years. Write a short risk memo (150–250 words) covering:

1. What specific security property delegated authentication lacks compared to SAML/OIDC.
2. Why an unmaintained, years-old authentication endpoint is itself a risk, independent of the delegated-authentication mechanism.
3. A recommended next step: migrate to federation, or leave as-is, with your reasoning.

## Check yourself

- What is the core mechanical difference between how delegated authentication and SAML/OIDC each validate a user's password?
- Name two downsides of delegated authentication that led to it becoming a legacy approach.
- If you found delegated authentication configured in a client's org today, what would you recommend, and why?
