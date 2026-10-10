# Lesson 12 — Identity Architecture

**Chapter 2 · Core Architecture · Lesson 12 of 33**

## What you'll learn

- How LTV Global's 10,000 internal users authenticate through Okta as Salesforce's identity provider
- Why external identity for dealers and end customers deliberately does NOT reuse the same Okta relationship
- The hybrid federation model that lets large dealers bring their own identity provider
- Why this split resolves one of the rejected alternatives you'll defend in Chapter 6

## Workforce identity: Okta as IdP, Salesforce as Service Provider

LTV Global already runs **Okta** as its corporate identity provider, managing workforce identity and single sign-on into the company's other internal applications (Lesson 4). For Salesforce's roughly 10,000 internal users, this design makes Salesforce a **Service Provider** in a standard SAML SSO relationship: a user authenticates once against Okta, and Okta asserts that identity to Salesforce, which trusts the assertion rather than managing a separate password of its own for that user. This directly satisfies the target-state vision's single-sign-on commitment from Lesson 5 — one login reaches every tool, Salesforce included — and it means LTV Global's existing identity governance (password policy, employee lifecycle, deprovisioning when someone leaves) continues to be the authoritative source for workforce access, rather than Salesforce maintaining a competing, parallel notion of who's still employed.

My Domain is a prerequisite for this relationship and is configured before SSO is enabled, and Salesforce's own multi-factor authentication requirement for direct UI logins is satisfied here specifically because the burden shifts to Okta: when a user authenticates through SP-initiated SSO, Salesforce's own MFA requirement doesn't independently fire for that login — which is only safe because Okta itself is confirmed, not assumed, to enforce MFA for every workforce user. An architect who accepted "we use SSO" as automatically satisfying MFA, without checking that Okta-side enforcement explicitly, would be making exactly the design error this course's identity-and-access-management material warns against.

## Why external identity is deliberately a different model

Dealers (thousands of external business users) and end customers (millions of individual logins) are explicitly **not** routed through the same corporate Okta relationship that serves LTV Global's workforce. This is a deliberate architectural decision, not an oversight: Okta's workforce licensing and identity governance model is built and priced for a company's own employees, not for being the login system for millions of consumers who have no employment relationship with LTV Global at all. Forcing all external identity through corporate Okta would mean renegotiating licensing at a scale and cost structure Okta's workforce product was never designed for, and it would tie consumer-facing portal availability to the same identity infrastructure that, if disrupted, would also lock out the entire internal workforce.

## The hybrid external identity model

Instead, external identity uses a hybrid model matched to how dealers and end customers actually differ in scale and sophistication: **large dealer groups**, which often already run their own corporate identity provider, may **federate** that IdP into the dealer-facing Experience Cloud site via SAML — a delegated-identity pattern that lets a large dealer's own IT team manage its employees' access centrally, the same federation concept Lesson 4's landscape analysis anticipated. **Smaller dealers and the millions of individual end customers** instead self-register and authenticate natively through Experience Cloud's own login, with no federation relationship required — appropriate given there's no existing corporate identity system on the other end to federate with for an individual equipment owner.

## This decision as a rejected alternative

The alternative LTV Global's architect considered and rejected — routing all external identity through corporate Okta for consistency — gets explicitly named and defended in Chapter 6: it was rejected because Okta's workforce-sized licensing model doesn't fit millions of consumer logins, not because federation is technically impossible. Naming the rejected alternative and the real reason it was rejected, rather than just describing the chosen design, is exactly what separates a defensible architecture decision from a decision that merely happened to work.

## Key terms

| Term | Meaning |
|---|---|
| Identity Provider (IdP) | The system that authenticates a user and asserts that identity to other systems |
| Service Provider (SP) | The system that trusts an IdP's assertion instead of managing its own credentials for that user |
| SAML SSO | The federation protocol used here between Okta and Salesforce, and optionally between a large dealer's IdP and Experience Cloud |
| Federated identity | Delegating authentication to an external identity provider rather than managing credentials natively |
| My Domain | The Salesforce feature required as a prerequisite for configuring SSO |

## Lab

A new stakeholder asks, "why don't we just make every dealer and customer log in through our corporate Okta too, so it's all one system?" Using this lesson's reasoning (not a generic security answer), write three or four sentences explaining the specific licensing and scale mismatch that makes this the wrong default, and what LTV Global does instead for large dealers versus everyone else.

## Check yourself

Can you explain, in your own words, why Salesforce's own MFA requirement doesn't independently fire for workforce users logging in via SSO, and what has to be separately true (and verified) for that to actually be safe? Can you state the two different external-identity paths LTV Global uses, and which kind of external user gets each one?
