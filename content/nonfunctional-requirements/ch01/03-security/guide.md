# Lesson 3 — Security

**Chapter 1 · Nonfunctional Requirements · Lesson 3 of 18**

## What you'll learn

- Security as an NFR: confidentiality, integrity, and availability (the CIA triad) applied to a Salesforce org
- Where Salesforce's layered sharing and security model sits relative to a security NFR
- What Salesforce Shield adds on top of the base platform, and when an architect needs to recommend it
- Why "secure" is not a binary state but a set of specific, testable requirements

## Security is a quality attribute, not a checkbox

Treated as an NFR, security breaks into the same three properties used across the security industry generally: **confidentiality** (only authorized people or systems can see the data), **integrity** (the data is accurate and hasn't been tampered with, by an attacker, a bug, or an honest mistake), and **availability** (authorized users can get to the data and functionality when they legitimately need it). A security NFR for a Salesforce org should name which of these properties matters for which data, rather than stating "the system must be secure," which is as untestable as "the system must be fast."

A concrete security NFR looks like: "Only users with the Claims Adjuster or Claims Manager profile may view the SSN field on the Claimant object; field access must be enforced at the platform layer, not only in the UI; and every view of that field must be logged." That's confidentiality (restricted visibility), enforced where it actually matters (platform-layer, not just hiding a field in the page layout, which a user could bypass through the API or a report), with an auditability requirement attached.

## The base platform already does a lot of this

Salesforce's built-in security model is layered, and an architect designing to a security NFR should know which layer enforces which property before reaching for an add-on product:

- **Organization-wide defaults, role hierarchy, sharing rules, and manual sharing** control record-level access — who can see which rows.
- **Profiles and permission sets** control object- and field-level access, and which features and Apex classes a user can touch at all.
- **Field-level security** can hide a field from a profile or permission set entirely, enforced consistently across the UI, API, and reports — unlike a page-layout change, which only hides the field in that one layout.
- **Session settings, login IP ranges, and multi-factor authentication** control how and from where a user can authenticate in the first place. Multi-factor authentication is a baseline Salesforce requires for all direct UI logins, not an optional add-on.

For most orgs, correctly configuring these layers satisfies a large share of a realistic security NFR without buying anything extra. The architect's first job on security is making sure these base layers are actually used correctly — a common finding in security reviews is permission sets granting far more than a role needs, which is a security-NFR failure even though nothing was "hacked."

## Where Salesforce Shield comes in

**Salesforce Shield** is a bundle of additional security and compliance tooling layered on top of the base platform, typically reached for when a security NFR demands something the base platform doesn't provide on its own:

- **Platform Encryption** encrypts specific fields and files at rest using an encryption scheme the customer controls the keys for, addressing a confidentiality requirement that goes beyond field-level security (which controls who can see a field, not what format it's stored in).
- **Event Monitoring** captures detailed events — logins, API calls, report exports, and more — into a queryable log, which is how a security NFR that requires "we must be able to detect anomalous data access" actually gets satisfied; events can be queried after the fact through the EventLogFile object or streamed in near-real time to feed transaction security policies that can alert on or block suspicious activity.
- **Field Audit Trail** extends how long field-level history is retained beyond the base platform's default tracking, which matters when a compliance-driven security NFR requires multi-year audit history.

Shield is a licensing decision, not a free configuration toggle — recommending it is an architectural judgment call that should be driven by a specific NFR it satisfies, not reached for by default.

## Key terms

| Term | Meaning |
|---|---|
| CIA triad | Confidentiality, integrity, and availability — the three properties a security requirement usually protects |
| Field-level security | Platform-enforced control over which profiles or permission sets can see or edit a specific field, consistent across UI, API, and reports |
| Salesforce Shield | An additional licensed bundle (Platform Encryption, Event Monitoring, Field Audit Trail) addressing security and compliance needs beyond the base platform |
| Platform Encryption | A Shield feature that encrypts specific fields and files at rest under customer-controlled encryption |
| Event Monitoring | A Shield feature that logs detailed platform events for after-the-fact query or near-real-time alerting |

## Lab

A health-insurance client states a security requirement as: "Member health data must be secure." Rewrite it as three separate, testable NFRs, each naming confidentiality, integrity, or availability explicitly, a specific field or object, and how it would be enforced (base platform feature vs. Shield feature). For at least one of the three, justify whether Shield is actually necessary or whether the base platform's security model already satisfies it.

## Check yourself

Can you define confidentiality, integrity, and availability and give a Salesforce-specific example of each? Can you name which base-platform feature enforces field-level access consistently across UI, API, and reports, and explain why a page-layout change alone would not satisfy the same requirement?
