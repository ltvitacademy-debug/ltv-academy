# Lesson 7 — Privacy and Consent Concepts

**Chapter 2 · Policies and Compliance · Lesson 7 of 14**

## What you'll learn

- The difference between privacy (a right) and consent (one specific mechanism for respecting that right)
- Why opt-in and opt-out are opposite default assumptions, and how that difference plays out on real Salesforce fields
- The role Salesforce's Individual object and related privacy/consent fields play in bringing together a person's privacy preferences
- Why "restriction of processing" is a different request from "consent withdrawal," and why that distinction matters
- Why consent has to be tracked as data, not just acted on once

## Privacy is the right; consent is one way of respecting it

**Privacy**, in a data-governance context, is a person's right to control what happens to their personal data. **Consent** is just one mechanism — a specific, documented permission — for an organization to lawfully process that data in situations where consent is the required legal basis. Not every lawful use of personal data requires consent (a company can often process data needed to fulfill a contract without separately asking permission), but where consent *is* the basis being relied on, it has to be real: freely given, specific to a purpose, informed, and unambiguous — not a pre-checked box or a buried clause in a long terms-of-service document.

## Two opposite defaults: opt-in vs. opt-out

The practical difference between major privacy regimes often comes down to which way the default points. Under an **opt-in** model (the GDPR approach), processing personal data requires an affirmative legal basis *before* it happens — the default is "no," until the organization establishes a basis such as specific consent. Under an **opt-out** model (the CCPA approach), collection and sale of personal information is allowed by default, and the individual has to actively exercise a right (such as opting out of sale or sharing) to stop it. These aren't minor implementation details — they're opposite starting assumptions, and a Salesforce org operating under both regimes at once (common for any company with customers in both the EU and California) needs fields and processes that can represent both models simultaneously, rather than picking one and hoping it covers the other.

## Where this lives in Salesforce: the Individual object

Salesforce's data-protection tooling centers on the **Individual** object, intended as the place that consolidates a person's privacy-relevant preferences across the records that represent them (a Lead, Contact, or Person Account can be linked to an Individual). A person's privacy footprint commonly includes fields capturing things like a "do not process" flag and links to records describing the specific purposes data is being used for and the legal basis relied on for each. The exact field names and setup steps vary by release and by what an org has configured, so when implementing this for a real client, the current Salesforce Help documentation for "Data Protection and Privacy" in Setup should be checked rather than assumed — this course teaches the concept (a consolidated, queryable record of a person's consent and restriction status) rather than a fixed field-by-field recipe.

## Restriction vs. consent withdrawal — a real distinction

Two requests that sound similar are legally and operationally different. **Withdrawing consent** means the individual is revoking the specific permission they previously gave for a specific purpose — if consent was the only legal basis for that processing, the organization generally has to stop. **Restricting processing** is a narrower, temporary request: the individual isn't necessarily withdrawing anything, they're asking the organization to pause active use of their data (for example, while a dispute about its accuracy is being resolved) without necessarily deleting it. Salesforce's own GDPR guidance notes that when someone restricts processing and consent was the underlying basis, the organization may also need to consider whether the restriction should be reflected in that person's consent preferences too — the two concepts are related but not interchangeable, and a privacy process that only has one button ("delete everything" or "do nothing") can't actually represent either one correctly.

## Consent is data, not a one-time action

The easiest mistake in this area is treating consent as something you ask for once and then forget about. A real privacy program tracks consent as a *record* — what was asked, when, in what context, and whether it was given, withdrawn, or restricted — because an organization has to be able to prove its basis for processing someone's data at any later point, not just remember that it probably asked at some point. This is exactly why the Individual object (and whatever custom fields/objects extend it in a given org) needs to be treated with the same rigor as any other governed data: it has an owner, it has quality expectations, and it needs to be kept current — the same discipline Chapter 1 applied to Account and Contact data applies here too.

## Key terms

| Term | Meaning |
|---|---|
| Privacy | An individual's right to control what happens to their personal data |
| Consent | One specific legal basis for processing personal data, requiring it to be freely given, specific, informed, and unambiguous |
| Opt-in model | Default is "no" processing until an affirmative legal basis (e.g., consent) is established -- the GDPR approach |
| Opt-out model | Default is "yes" processing/sale, until the individual actively exercises a right to stop it -- the CCPA approach |
| Individual object | Salesforce's object intended to consolidate a person's privacy preferences, consent status, and restriction requests |
| Restriction of processing | A request to pause active use of data without necessarily withdrawing consent or deleting the data |

## Lab

A customer emails asking the company to "stop using my data while you investigate the billing error on my account, but don't delete my account yet since I still want the service." Identify which concept from this lesson (consent withdrawal or restriction of processing) this request actually represents, explain why calling it the wrong one would lead the company to take the wrong action, and describe what should be recorded against this person's Individual-linked record so the company can prove, later, what was requested and when.

## Check yourself

Can you explain, in your own words, why "privacy" and "consent" are not the same concept? Can you describe a situation where restriction of processing and consent withdrawal would require genuinely different actions from the company?
