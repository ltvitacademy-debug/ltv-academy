# Lesson 19 — Named Credentials and Identity

**Chapter 3 · Access at Scale · Lesson 19 of 24**

## What you'll learn

- What Named Credentials solve: outbound authentication from Salesforce to external systems
- The difference between Named Principal and Per-User identity types
- How Named Credentials relate to the External Credentials model and Legacy vs. current schema
- Why Named Credentials are the "mirror image" of everything else in this course

## Flipping the direction: outbound identity

Every lesson so far has covered **inbound** identity: an external party or Salesforce itself vouching for a user logging *into* Salesforce. **Named Credentials** solve the opposite problem: when Apex code, a Flow, or an external service callout needs to authenticate *outbound*, from Salesforce *to* an external system (a third-party API, another Salesforce org, an internal enterprise service), Named Credentials store and manage that outbound authentication so developers don't have to hardcode a URL, token, or password inside Apex.

A Named Credential bundles together the **endpoint URL** and an **authentication configuration**, so a callout like `HttpRequest.setEndpoint('callout:My_Named_Credential/resource')` lets Salesforce handle the authentication transparently — no credentials appear anywhere in the Apex code itself, and an admin can rotate the underlying secret without touching a single line of code.

## Named Principal vs. Per-User

Every Named Credential's identity type answers one question: **whose identity is used for the outbound call?**

- **Named Principal** — all users share one single, fixed identity for outbound calls through this credential, regardless of which Salesforce user triggered the callout. This is the right choice for a true system-to-system integration, where the external system doesn't need or want to distinguish between individual Salesforce users.
- **Per-User** — each Salesforce user authenticates individually with the external system (often via their own OAuth tokens, stored per-user), and the callout happens *as that specific user*. This is the right choice when the external system needs to enforce its own, user-specific authorization — for example, calling an external calendar API where each user should only see their own calendar data.

Choosing wrong here is a frequent architecture mistake: using Named Principal for a scenario that actually needs per-user accountability on the external system's side (an audit log that should show which individual employee pulled a given record) silently collapses everyone's activity into one shared identity, defeating any downstream accountability the external system might otherwise provide.

## Legacy vs. current schema: External Credentials

Named Credentials have evolved. The original (**Legacy**) schema bundled authentication directly into the Named Credential record itself. The current model splits this into two separate objects: the **Named Credential** (just the endpoint and callout options) and a separate **External Credential** (the actual authentication protocol — OAuth 2.0, JWT Bearer Flow, custom header, or password authentication — and its Named Principal/Per-User identity type). This separation lets the same External Credential be reused across multiple Named Credentials pointing at different endpoints of the same external system, and it's the recommended model for new integrations; several of the Legacy schema's OAuth- and JWT-related fields are already deprecated.

## Why this is the mirror image of the rest of the course

Every protocol covered earlier — OAuth (Lesson 5), JWT Bearer (Lesson 12's provisioning context, and again here), certificate-based trust (Lesson 4's SAML) — reappears inside Named Credentials and External Credentials, just facing outward instead of inward. An architect who deeply understands inbound SSO and OAuth flows already has nearly all the conceptual tools needed to design outbound authentication correctly; the main new judgment call is the Named Principal vs. Per-User decision, since that's a choice with no real inbound equivalent.

## Key terms

| Term | Meaning |
|---|---|
| Named Credential | A Salesforce record bundling an endpoint URL and authentication configuration for outbound callouts |
| External Credential | The current-schema object holding the actual authentication protocol and identity type, referenced by one or more Named Credentials |
| Named Principal | All users share one fixed identity for outbound calls |
| Per-User | Each user authenticates individually; the callout happens as that specific user |

## Lab

Scenario: a client needs an Apex integration that calls an external expense-report API. The external API needs to know exactly which individual employee is submitting each expense report, for its own approval-routing logic. Write a short design justification (150–200 words) that:

1. Chooses Named Principal or Per-User for this scenario, and explains why using the wrong one would break the external system's approval routing.
2. Names the two objects (in the current schema) you'd configure, and what each one is responsible for.
3. Identifies one authentication protocol from this course that could plausibly back this integration.

## Check yourself

- What problem do Named Credentials solve, and how is that different from everything covered in Lessons 3–18?
- Explain the difference between Named Principal and Per-User, with an example of when each is the right choice.
- What are the two objects in the current Named Credential schema, and what does each one hold?
