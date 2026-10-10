# Lesson 2 — Case Study: Financial Services Onboarding

**Chapter 1 · Technical Architect Case Studies · Lesson 2 of 21**

## What you'll learn

- How a regulated industry's data model (Financial Services Cloud) changes the standard CRM shape and why that matters architecturally
- How to design a defensible PII encryption strategy that still lets the business run reports and searches
- Why segregation-of-duties in an approval process is a security-architecture decision, not just a business-process one
- How identity and integration design differ when a client-facing portal and a third-party verification vendor are both in scope

## The scenario

Alder Trust Bank wants to let prospective wealth-management clients start onboarding online instead of only in a branch: enter personal and financial information, consent to e-signature, and have a relationship manager (RM) review and approve the new account. The bank must run Know Your Customer (KYC) and Anti-Money-Laundering (AML) checks through a third-party verification vendor before any account opens. Compliance requires that no single RM can approve an account above a certain exposure threshold without a second reviewer, and that sensitive fields — Social Security numbers, account balances, income — are encrypted, not just access-restricted. The bank already licenses Financial Services Cloud (FSC) but has only used it for existing-client relationship management, never a public-facing intake flow.

## Why the data model isn't a standard CRM

FSC reshapes the object model around a client's financial life rather than the standard sales objects: instead of Opportunities and Products driving the design, Financial Accounts and Financial Holdings represent what a client actually owns, and Client relationship objects model households and the people connected to them. A Technical Architect dropping a generic onboarding Flow onto this model without understanding that shift will build objects that duplicate what FSC already models, or — worse — skip the FSC objects entirely and lose everything the bank already gets from them for existing clients. The onboarding design has to extend the existing FSC data model (new Financial Account records created through the intake flow, linked to the prospect's Person Account) rather than inventing a parallel one.

## Encryption that doesn't break the business

Shield Platform Encryption is the right tool for protecting fields like SSN at rest, but it comes with a real trade-off: not every encryption scheme supports the same operations. A field encrypted with a case-sensitive, non-deterministic scheme gives the strongest protection but can't be used in a report filter or a list-view sort; a deterministic scheme allows exact-match filtering but is slightly weaker. The defensible design doesn't encrypt every field identically — SSN and account-number fields that nobody needs to filter or sort on get the strongest non-deterministic protection, while a field the compliance team genuinely needs to query on uses the deterministic option, with that trade-off written down and justified rather than discovered by surprise when a report breaks in production. Shield's Field Audit Trail is added on top for the fields regulators expect a long audit history on, since standard field history tracking doesn't retain history nearly as long.

## Segregation of duties in the approval flow

The exposure-threshold rule — no single RM can approve above a set dollar amount alone — is a segregation-of-duties control, and it belongs in the record's approval process and sharing model, not just as a polite instruction to RMs. The Flow that handles the onboarding submission routes any account above the threshold into a two-step approval process requiring a second approver who is not the original RM, enforced by the approval step's assigned-approver logic rather than left to the RM's judgment. This closes the same kind of gap a single person approving their own work always creates, regardless of industry.

## Identity and integration: two different trust boundaries

The prospect-facing intake experience runs on Experience Cloud, which is a different identity boundary than the bank's internal FSC org — prospects authenticate as external users with access scoped only to their own in-progress application, never to another client's data. The KYC/AML vendor call is a server-to-server integration, not something the prospect's browser ever touches directly; it's made through a Named Credential so the vendor's API key and endpoint are stored once, centrally, and the calling Apex or Flow never has secrets embedded in it. Together, the portal identity boundary and the named-credential-based vendor call mean a compromised prospect session can't reach the KYC vendor's credentials, and a change to the vendor's endpoint or key is a one-time configuration update, not a code change.

## Key terms

| Term | Meaning |
|---|---|
| Financial Services Cloud (FSC) | Salesforce's industry data model built around Financial Accounts, Holdings, and client relationships rather than standard sales objects |
| Shield Platform Encryption | Salesforce Shield's at-rest encryption for sensitive fields, with different schemes trading off searchability against protection strength |
| Field Audit Trail | A Shield feature that extends field-history retention well beyond standard field history tracking |
| Segregation of duties | A control ensuring no single person can both create and approve the same sensitive transaction alone |
| Named Credential | A stored, reusable authentication configuration for calling an external API, keeping secrets out of code |

## Lab

Alder Trust's compliance officer asks you to justify, in writing, why the SSN field uses non-deterministic encryption while the account-balance field (which the compliance team needs to filter reports on) uses deterministic encryption. Write that justification as you would for a review-board panelist, naming the specific trade-off each scheme makes.

## Check yourself

Can you explain why extending FSC's existing Financial Account object is the right move instead of building new custom objects for the onboarding flow? Can you state, in one sentence, what breaks if a field is encrypted with the wrong Shield scheme for how the business needs to use it?
