# Lesson 15 — Customer and Partner Identity

**Chapter 3 · Access at Scale · Lesson 15 of 24**

## What you'll learn

- Why customer and partner identity (CIAM) is a fundamentally different problem than employee (workforce) identity
- The different license and licensing-cost implications of external users at scale
- How self-registration, social sign-on, and progressive profiling fit into a CIAM strategy
- Why partner identity sits architecturally between pure workforce and pure customer identity

## Workforce identity vs. CIAM

Everything through Lesson 14 implicitly assumed a workforce identity scenario: a known, bounded population of employees, provisioned through HR, each needing exactly one well-defined account. **Customer Identity and Access Management (CIAM)** is a different problem entirely, and conflating the two leads to bad architecture:

| | Workforce identity | Customer/partner identity (CIAM) |
|---|---|---|
| **Population size** | Bounded, known in advance (headcount) | Potentially unbounded, grows organically |
| **Onboarding** | Centrally provisioned (HR → IdP → apps) | Self-service registration, often first-touch |
| **Identity source of truth** | Corporate directory | Often the application itself, or a social IdP |
| **Primary risk** | Insider access, over-provisioning | Account takeover, fraud, bot signups |
| **Experience priority** | Security and compliance first | Low-friction, conversion-optimized first |

Customers and partners aren't employees — they didn't go through an HR onboarding process, they often arrive via self-registration on a public-facing Experience Cloud site (Lesson 16), and the top design priority shifts from "lock this down tightly" to "make this frictionless without becoming a security liability."

## Self-registration and social sign-on

For a customer-facing site, requiring a brand-new customer to create and remember yet another password is a conversion killer. Two patterns address this directly:

- **Self-registration** — the customer creates their own account directly on the site, typically backed by a registration handler similar in spirit to the JIT provisioning pattern from Lesson 12, but triggered by an explicit sign-up action rather than an SSO login.
- **Social sign-on** (Lesson 6's Auth. Providers, applied to a customer-facing context) — letting the customer authenticate with an existing Google, Facebook, or Apple account instead of creating yet another password. This directly reduces registration friction and offloads password-security risk to providers who specialize in it.

**Progressive profiling** is the complementary pattern: instead of demanding a customer fill out a long registration form up front, the application collects identity attributes gradually, over multiple visits or interactions, as the relationship deepens — a practice borrowed from marketing/CIAM platforms and increasingly relevant to Experience Cloud site design.

## Partner identity: the middle ground

Partners (resellers, system integrators, distributors) sit architecturally between employees and customers:

- Like customers, partners are external to the organization and often self-register or get invited rather than provisioned through internal HR.
- Like employees, partners frequently need **persistent, role-based access** to real business data — deal registration, inventory, case management — not just a lightweight customer self-service experience.
- Partner organizations often want **their own users managed by their own admin**, which is why Salesforce's partner-focused licenses support a delegated administration model: a partner's designated admin can manage their own organization's users, rather than every partner user requiring direct management by the host company's Salesforce admins.

This delegated-admin pattern is a recurring theme across the next lesson (Experience Cloud) and is one of the clearest architectural signals that a client's "customer portal" request is actually a partner-relationship-management request in disguise — the two have very different identity designs.

## Key terms

| Term | Meaning |
|---|---|
| CIAM | Customer Identity and Access Management — identity for external, often self-registering, unbounded populations |
| Self-registration | A user creating their own account directly on a public-facing site |
| Progressive profiling | Collecting identity attributes gradually over time rather than all at once |
| Delegated administration | Letting an external organization's own admin manage its own users |

## Lab

Scenario: a manufacturer wants to give both end-customers (who buy products directly) and resale partners (who sell the products on the manufacturer's behalf and need deal-registration access) a Salesforce-backed portal. Write a short identity-design memo (200–300 words) that:

1. Explains why these two populations should NOT be given the same identity treatment.
2. Proposes one onboarding pattern appropriate for the end-customers.
3. Proposes one access/administration pattern appropriate for the resale partners, referencing delegated administration.

## Check yourself

- Name three ways workforce identity and CIAM differ in priorities or population characteristics.
- What problem does progressive profiling solve, and why does it matter for a public-facing site's conversion rate?
- Why does partner identity sit between pure employee and pure customer identity, rather than matching either one exactly?
