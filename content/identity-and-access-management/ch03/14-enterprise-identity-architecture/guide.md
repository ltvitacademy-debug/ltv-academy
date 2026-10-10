# Lesson 14 — Enterprise Identity Architecture

**Chapter 3 · Access at Scale · Lesson 14 of 24**

## What you'll learn

- How to think about identity as an enterprise-wide architecture concern, not a per-app checkbox
- The concept of an Identity and Access Management (IAM) hub, and where Salesforce typically sits relative to one
- How to map an organization's identity landscape before proposing a Salesforce identity design
- The trade-offs between centralizing identity in one IdP versus distributing trust across several

## From single integration to enterprise landscape

Every lesson so far has looked at one relationship at a time: Salesforce and one SP, Salesforce and one IdP, one Connected App. Real enterprises have dozens of applications, each needing authentication, and the architecture question shifts from "how do I configure SSO for this one app" to **"what is the overall identity landscape, and where does Salesforce sit inside it?"**

A mature enterprise IAM landscape typically has:

- One or a small number of **authoritative identity sources** — often an HR system (Workday, SAP SuccessFactors) feeding a directory (Active Directory, Entra ID) that represents the "source of truth" for who's an employee and what their role is.
- A central **IAM hub or broker** (Okta, Ping Identity, Entra ID, ForgeRock) that every downstream application, Salesforce included, trusts as its IdP rather than each app maintaining independent trust relationships with every other app.
- Downstream **relying applications** — Salesforce, email, HR self-service portals, expense tools — that are all SPs relative to the hub.

## Why a hub-and-spoke model beats point-to-point trust

If every application trusted every other application directly, the number of trust relationships grows combinatorially — ten applications wanting direct SSO with each other would need up to 45 separate pairwise trust configurations. A hub-and-spoke model, where every application trusts one central IdP, needs only ten relationships (one per app to the hub), and — just as importantly — centralizes the enforcement of MFA, session policy, and deactivation in one place. This is precisely why Lesson 8's warning about Salesforce becoming "the authoritative identity source for other systems" is usually the wrong default: in most enterprise landscapes, a dedicated IAM hub should be the authoritative IdP, with Salesforce acting as an SP (Lesson 10) for standard employee access, and only acting as an IdP itself (Lesson 9) for a narrower set of downstream apps that specifically need to launch from inside Salesforce.

## Mapping the landscape before designing

Before proposing any Salesforce-side identity configuration, an architect needs answers to a standard set of discovery questions:

1. What system is the enterprise's authoritative identity source today, and does it already have a Salesforce connector?
2. Is there an existing IAM hub, and does it support SAML, OIDC, or both?
3. Which populations need access — internal employees, external customers (Lesson 15), partners, or guest users — and do any of them need different identity treatment?
4. What's the organization's MFA policy, and is it enforced at the hub or expected from Salesforce directly?
5. What's the deactivation process, and how quickly does a termination in the authoritative source need to propagate to Salesforce access?

Skipping this discovery and jumping straight to "let's configure SAML SSO Settings" is the single most common root cause of identity projects that need significant rework later — the technical configuration from Lessons 3–13 is usually the easy part; getting the landscape and trust boundaries right is the actual architecture work.

## Key terms

| Term | Meaning |
|---|---|
| Authoritative identity source | The system treated as the source of truth for who a person is and their role |
| IAM hub / broker | A central identity system that downstream applications trust, rather than trusting each other directly |
| Hub-and-spoke trust model | An architecture where every application trusts one central IdP instead of each other directly |
| Point-to-point trust | Each application maintaining independent trust relationships with every other application |

## Lab

Scenario: a mid-size company currently has five applications, each independently configured with direct SSO trust to every other application that needs it (a point-to-point model). They're adding a sixth application and ask whether to configure five new direct trust relationships or introduce a central IdP. Write a short recommendation (200–300 words) that:

1. Calculates how many pairwise trust relationships the point-to-point model would need at 6 applications, versus a hub-and-spoke model.
2. Recommends one of the two approaches and justifies it using at least one concept from this lesson beyond relationship count (for example, centralized MFA/deactivation enforcement).
3. Identifies one migration risk in moving from the existing point-to-point model to a hub.

## Check yourself

- Why does a hub-and-spoke identity model scale better than point-to-point trust as an organization adds applications?
- Name three of the five discovery questions an architect should ask before designing a Salesforce identity integration.
- In most enterprise landscapes, should Salesforce usually be the authoritative IdP, or an SP relative to a dedicated hub? Justify your answer.
