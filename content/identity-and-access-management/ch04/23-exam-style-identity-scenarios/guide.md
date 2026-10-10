# Lesson 23 — Exam-Style Identity Scenarios

**Chapter 4 · Review and Practice · Lesson 23 of 24**

## What you'll learn

- How Salesforce architect-level scenario questions are typically structured
- A worked method for breaking down a dense, multi-constraint scenario into its component identity decisions
- Four practice scenarios, each isolating a specific decision point from earlier chapters
- Common wrong-answer traps and why they're tempting

## How to read a scenario question

Architect-level scenario questions (whether on a certification exam or in a client discovery call) pack several independent decisions into one narrative. The reliable method: **extract each decision point separately before trying to answer anything.** Re-read the scenario once just to list every noun that represents a system, a population, or a constraint, then address each one against the specific lesson concept it maps to, rather than trying to intuit one holistic answer.

## Practice scenario 1 — protocol choice

*"A client's identity team uses an on-premises Active Directory Federation Services (AD FS) deployment that has never been updated to support OpenID Connect. They want employees to SSO into Salesforce using their existing AD FS logins."*

**Decision point:** Protocol choice (Lessons 4, 6). **Correct reasoning:** AD FS supports SAML natively; without OIDC support, SAML is the only viable federation option here — this is a case where "use the newer protocol" (a reasonable general default) is wrong because the existing infrastructure doesn't speak it.

## Practice scenario 2 — IdP vs. SP role

*"A client wants employees, once logged into Salesforce, to be able to single-sign-on into a separate internal expense-reporting tool without logging in again."*

**Decision point:** IdP vs. SP (Lessons 8–10). **Correct reasoning:** Salesforce must be the **IdP** here, since the expense tool is relying on a Salesforce login, not the other way around — a common trap is defaulting to "Salesforce is always the SP" because that's the more commonly discussed direction in most training material.

## Practice scenario 3 — the lockout trap

*"An admin configures SAML SSO, tests successfully with their own account, and immediately disables the standard login page for all profiles to 'enforce' SSO adoption."*

**Decision point:** SP configuration risk (Lesson 10). **Correct reasoning:** This is the lockout failure mode. The admin tested with their *own* account before disabling anything — but if the IdP has any issue afterward, there is no break-glass path left for *anyone*, including that same admin. The trap is assuming "it worked once for me" proves the configuration is safe to lock in for everyone.

## Practice scenario 4 — provisioning gap

*"A client enables SAML JIT provisioning so new SSO users are created automatically, and considers this sufficient for their full user lifecycle management needs."*

**Decision point:** Provisioning (Lesson 12). **Correct reasoning:** JIT only covers creation (and update) at login time — it does nothing for deactivation, and nothing for a user who should exist before their first login (e.g., pre-provisioned access on day one). The trap is treating "automatic provisioning" as a complete lifecycle solution when it only covers one slice of it.

## The general pattern in these traps

Looking across all four: each trap comes from over-generalizing a true statement from earlier in the course ("prefer modern protocols," "Salesforce is often the SP," "JIT automates provisioning") into a universal rule, without checking whether this specific scenario's stated constraints make the general case inapplicable. The skill being tested isn't memorizing facts — it's checking a scenario's specific details against the general rule before applying it.

## Key terms

| Term | Meaning |
|---|---|
| Decision point | A single identity-architecture choice embedded within a larger scenario |
| Over-generalization trap | Applying a generally-true rule to a scenario whose specific details make it inapplicable |

## Lab

Write one new exam-style scenario of your own (100–150 words) that embeds exactly one decision point from any lesson in Chapters 1–3, plus a plausible wrong-answer trap a rushed reader might fall into. Then write the correct answer and explain, in 2–3 sentences, why the trap is tempting but wrong.

## Check yourself

- In Practice Scenario 1, why is SAML correct even though OIDC is often the more modern choice?
- In Practice Scenario 3, what specific testing gap made the admin's "it worked for me" reasoning unsafe?
- Describe, in your own words, the general pattern behind all four wrong-answer traps in this lesson.
