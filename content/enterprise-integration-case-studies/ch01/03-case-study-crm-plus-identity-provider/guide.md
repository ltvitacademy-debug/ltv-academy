# Lesson 3 — Case Study: CRM + Identity Provider

**Chapter 1 · Enterprise Integration Case Studies · Lesson 3 of 20**

## What you'll learn

- Why a growing company moves from per-system passwords to a federated identity model, and what problem that actually solves
- How SAML single sign-on positions Salesforce as a Service Provider relative to an Identity Provider
- What Just-in-Time (JIT) provisioning does, and the specific trade-off it makes
- Why the Federation ID, not the username, is the field that makes federated identity work reliably

## The scenario: Doverfield consolidates logins

Doverfield's 400 employees each juggle a separate username and password for Salesforce, their email, and half a dozen other internal tools. IT fields a steady stream of password-reset tickets, and when someone leaves the company, deactivating their account in each system separately is an easy step to forget. Doverfield already runs an identity provider (IdP) — the same tool that controls email and VPN login — and wants Salesforce login to go through it instead of its own separate password.

## Service Provider and Identity Provider roles

In this architecture, the vocabulary matters because it determines who configures what. The **Identity Provider (IdP)** is the system that authenticates the user and vouches for their identity — Doverfield's existing corporate IdP. Salesforce, in this relationship, becomes the **Service Provider (SP)**: it trusts the IdP's vouching and grants access based on it, rather than checking a password of its own. The trust between them is established via **SAML (Security Assertion Markup Language)**: the IdP sends Salesforce a signed assertion saying, in effect, "this user authenticated successfully, and here is who they are," and Salesforce's SAML SSO configuration defines how to validate that assertion and map it to a Salesforce user.

This isn't an either-or replacement for Salesforce's own login — Doverfield can (and typically should) keep a non-SSO administrative fallback path available, in case the IdP itself is ever unreachable.

## Just-in-Time provisioning: automatic accounts, with a trade-off

Doverfield doesn't want IT manually pre-creating a Salesforce user record for every one of its 400 employees before SSO can work for them. **Just-in-Time (JIT) provisioning** solves this: when the SAML SSO configuration's user-provisioning option is enabled, Salesforce creates the user account automatically the first time that person successfully authenticates through the IdP, using the attributes carried in the SAML assertion.

JIT is not free of trade-offs, and an architect has to be explicit about what it does and doesn't cover:

- A user's Salesforce account details and group/role-relevant attributes only get updated when that user actually authenticates via SAML — not continuously.
- JIT cannot be used to *disable* a user. A disabled or deactivated Salesforce user will not complete SAML authentication at all, so the deactivation step has to happen by some other path (typically the same offboarding process that removes the person from the IdP in the first place), not through JIT itself.

## Why Federation ID, not username, carries the mapping

The field that ties a specific IdP identity to a specific Salesforce user is configurable, and the choice matters. Salesforce's SAML configuration lets the identity mapping use the Salesforce username, the **Federation ID** field on the user record, or the internal Salesforce user ID. Doverfield deliberately uses Federation ID rather than username: usernames in Salesforce are often email-shaped and can change if a person's email changes, while a Federation ID is a dedicated field whose only job is holding the stable key the IdP uses for that person — decoupling "how do we recognize this person across systems" from "what does their login email happen to be today."

## Key terms

| Term | Meaning |
|---|---|
| Identity Provider (IdP) | The system that authenticates a user and vouches for their identity to other systems |
| Service Provider (SP) | The system (here, Salesforce) that trusts the IdP's vouching instead of checking its own password |
| SAML | The standard used to pass a signed authentication assertion from IdP to SP |
| Just-in-Time (JIT) provisioning | Automatically creating a Salesforce user record on a person's first successful SSO login |
| Federation ID | A dedicated user-record field used as the stable identity-mapping key between IdP and Salesforce, independent of username |

## Lab

Doverfield's IT team wants to deactivate a departing employee's Salesforce access the moment HR marks them as terminated in the IdP, without waiting for that person's next login attempt. Explain why JIT provisioning, by itself, cannot be the mechanism that does this, and describe what offboarding step has to happen for the deactivation to actually take effect in Salesforce.

## Check yourself

Can you correctly identify which side of the SAML relationship — IdP or SP — Salesforce plays in this scenario, and explain what that trust relationship actually grants? Can you explain why Doverfield chose Federation ID over username as its identity-mapping field, in your own words?
