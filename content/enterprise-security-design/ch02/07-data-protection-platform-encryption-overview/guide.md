# Lesson 7 — Data Protection: Platform Encryption Overview

**Chapter 2 · Applying Security Architecture · Lesson 7 of 15**

## What you'll learn

- What Shield Platform Encryption actually is, and how it differs from the older Classic Encryption
- The two encryption schemes it offers — probabilistic and deterministic — and the real functional tradeoff each one makes
- Which kinds of fields and operations are affected by encryption, so a design doesn't get surprised late
- Why "turn on encryption" is a design decision with real consequences, not a checkbox with no side effects

## Classic Encryption vs. Shield Platform Encryption

Salesforce has offered two generations of field-level encryption. **Classic Encryption** is an older, more limited capability: it covers a narrow set of custom text field types, uses weaker encryption, and cannot encrypt files or attachments. **Shield Platform Encryption** (part of the Salesforce Shield add-on) is the modern, far more capable option: strong AES-256 encryption, broader coverage across standard fields, custom fields, and files/attachments, and support for customer-controlled key material. When an architect designs an encryption-at-rest strategy for a current Salesforce org, Shield Platform Encryption is the capability actually being designed around — not Classic Encryption, which exists mainly for backward compatibility with older orgs.

**Key management** underneath Shield follows a layered model: Salesforce manages a root-level secret through tightly controlled internal security processes, while the org's own **tenant secrets** — the layer that actually determines what your org's data is encrypted with — are generated, rotated, and managed by your own administrators through Setup. This is what lets an organization genuinely control (and, if required, destroy) its own encryption key material independent of Salesforce.

## Two schemes, one real tradeoff: can you filter on it?

Shield Platform Encryption offers a choice of **encryption scheme**, field by field, and the choice is really about one practical question: do you need to query, filter, or sort on this field?

- **Probabilistic encryption** (the default) introduces randomness into the algorithm, so encrypting the same plaintext twice produces different ciphertext each time. This is the stronger option against certain analysis techniques, but the real-world consequence is that a probabilistically encrypted field generally cannot be used in a `WHERE` clause filter, a `GROUP BY`, or sorting — the platform literally can't compare encrypted values to find a match.
- **Deterministic encryption** always produces the same ciphertext for the same plaintext (given the same key), which is what makes exact-match filtering, list view filters, and some report filtering possible on an encrypted field. It comes in a case-sensitive variant and a case-insensitive exact-match variant. The tradeoff runs the other way: because equal values always produce identical ciphertext, deterministic encryption is more exposed to certain pattern-based inference than probabilistic encryption is — a real security/functionality tradeoff an architect has to make explicitly, not by default.

An architect typically ends up mixing both: a `National_ID__c` field that the business genuinely needs to search on might use deterministic encryption deliberately, while a `Notes__c` field with free-text sensitive content that's never filtered on uses probabilistic.

## What breaks, and what to check before committing to a design

Several real consequences follow from choosing to encrypt a field, and they belong in the design conversation up front, not discovered during testing:

- Encrypted fields can interact poorly with **search** — a field used as search criteria, in certain standard search handlers, may require specific configuration or simply isn't supported as search input once encrypted.
- **Formula fields** referencing an encrypted field, and certain **sorting/pattern-matching operations**, may not behave as they would on an unencrypted field.
- Some field types have **never been encryptable** at all (this changes over releases, so the current list has to be checked against Salesforce's own Platform Encryption documentation at design time, not assumed from memory).
- **Managed packages** that were never built with encrypted fields in mind can behave unpredictably, or block installation outright, once a field they rely on is encrypted.
- Disabling encryption on a field later does not necessarily remove every restriction that was introduced while it was encrypted — some downstream effects can persist, which is a real argument for testing an encryption rollout thoroughly in a sandbox before enabling it in production.

## Key terms

| Term | Meaning |
|---|---|
| Shield Platform Encryption | Salesforce's modern AES-256 field/file encryption capability, part of the Shield add-on |
| Classic Encryption | The older, more limited text-field-only encryption capability, now largely superseded |
| Tenant secret | The customer-controlled layer of key material that determines what an org's data is actually encrypted with |
| Probabilistic encryption | Scheme where identical plaintext produces different ciphertext each time; strongest, but not filterable |
| Deterministic encryption | Scheme where identical plaintext always produces identical ciphertext; filterable, with a different exposure tradeoff |

## Lab

A law firm wants to encrypt its `Case_Notes__c` field (long free-text notes, never searched or filtered on) and its `Client_SSN__c` field (which paralegals need to search by exact match when a client calls in). Recommend an encryption scheme for each field, and justify your choice using the probabilistic/deterministic tradeoff from this lesson. Then list three things you would test in a sandbox before enabling either encryption in production, based on this lesson's "what breaks" section.

## Check yourself

Can you explain the real functional difference between probabilistic and deterministic encryption, in terms of what each one lets you do and gives up? Can you name at least two real side effects of encrypting a field that an architect needs to check for before committing to a design, rather than discovering in production?
