# Lesson 8 — Security Review of Each Design

**Chapter 2 · Reviewing Designs · Lesson 8 of 14**

## What you'll learn

- A short, reusable checklist for the security dimension of an integration review
- How each of Chapter 1's five case studies carries different security risk, and why
- Why "it uses OAuth" is never a complete answer on its own
- How least privilege applies to an integration's credentials, not just to human users

## A security checklist for integrations

Lesson 7 built a checklist for failure modes. Security needs its own, because a design can be fully resilient to timeouts and duplicates and still be a security problem. Four questions recur across almost every integration review:

- **Authentication.** How does each side prove its identity to the other, and is that credential stored and rotated responsibly rather than hardcoded?
- **Authorization scope.** Does the integration's credential have exactly the access it needs, or more? This is least privilege applied to a system account, not a human one — a sync job that only ever reads Accounts and Opportunities has no business holding edit access to Users or Permission Sets.
- **Data in transit and at rest.** Is data encrypted while moving between systems, and does either side store more of it, or for longer, than the integration actually needs?
- **Auditability.** If something goes wrong, is there a usable trail showing what changed, when, and which system or identity initiated it?

## Running the checklist against each case study

**Meridian Fixtures (ERP, Lesson 1).** The Named Credential keeps the ERP's endpoint and authentication out of hardcoded Apex, which answers the authentication question well. The authorization-scope question deserves real scrutiny: the integration user calling the ERP should be able to read catalog, price, inventory, and credit hold — and nothing else the ERP exposes, even if a broader account was easier to provision initially.

**Harborline Capital (financial system, Lesson 2).** This is the case study where auditability matters most of anywhere in the course, because the data is financial. Every applied balance-change event needs to be traceable back to its source transaction ID, not just reflected as a number that changed with no record of why.

**Cascade Outfitters (data warehouse, Lesson 3).** The warehouse-side credential used to consume Salesforce's change events should be scoped to exactly the objects and fields analytics actually needs. A common real-world mistake is provisioning a broad integration user "to avoid having to come back and add more objects later" — which quietly defeats least privilege for convenience, and is exactly the kind of shortcut a reviewer should flag.

**Vantage Utilities (external application, Lesson 4).** This is the case study with the highest stakes on this checklist, because the caller is external and acts on behalf of individual customers. "The portal uses OAuth" answers the authentication question but says nothing about authorization scope — the design still has to prove that a token issued for customer A cannot be used to read customer B's case, which is a design and testing question, not something OAuth grants automatically just by being used.

**Bellwood Apparel (marketing platform, Lesson 5).** Because consent and suppression data moves through this integration, data-in-transit and data-at-rest both matter more here than they first appear to: a sync that's technically working but logs full request and response payloads in plaintext for debugging could end up storing suppression and consent data somewhere it was never supposed to persist.

## Why "it uses OAuth" is never the whole answer

OAuth (or any modern authentication protocol) answers only the authentication question — proving who's calling. It says nothing about what that caller is then permitted to do once authenticated, which is a separate authorization-scope decision the integration's own design has to make and enforce. A review that stops at "we use OAuth, so we're secure" has answered one of this lesson's four questions and left the other three unexamined. This is the same authentication-versus-authorization distinction from Lesson 4, now applied as a standing question against every case study, not just the one it was first introduced on.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege (for integrations) | Giving an integration's credential only the access it actually needs, nothing broader |
| Data in transit | Data actively moving between two systems during an integration call |
| Data at rest | Data stored by either system once an integration call completes |
| Auditability | Whether a usable trail exists showing what changed, when, and by which identity |

## Lab

Harborline Capital's integration user credential, used by the Platform Events subscriber from Lesson 2, was originally provisioned with edit access to every object in the org "just in case it's needed later." Using this lesson's four-question checklist: (1) identify which question this violates and why, (2) propose the specific, narrower access the credential actually needs given what Lesson 2's design does, and (3) describe one way you'd verify the narrower access still lets the integration function before removing the broader grant.

## Check yourself

Can you list this lesson's four security-review questions from memory? Can you explain why "the integration uses OAuth" answers only one of them, and name which one?
