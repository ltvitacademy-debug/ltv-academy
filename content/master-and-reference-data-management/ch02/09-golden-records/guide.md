# Lesson 9 — Golden Records

**Chapter 2 · Matching and Consolidation · Lesson 9 of 25**

## What you'll learn

- What a golden record is, precisely — and what it is not
- Why a golden record is usually assembled, not simply chosen
- Physical vs. virtual golden records, tied back to the architecture styles from Lesson 3
- How the golden record relates to the matching and dedup work from Lessons 6–8

## The definition

A **golden record** is the single, trusted, best-available version of a master data entity — built by reconciling the matched, duplicate source records that all refer to the same real-world thing. It's "golden" in the sense of the standard everything else should be measured against: the one record a report, an application, or a person can rely on without having to check three other systems first.

## What a golden record is NOT

- **It is not simply "pick one system's record and use that."** Picking the CRM's version of a customer and ignoring billing and shipping isn't a golden record — it's just privileging one incomplete source over two other incomplete sources.
- **It is not a copy of any single original record.** A golden record is usually assembled field-by-field from multiple sources (which is exactly what survivorship rules in Lesson 10 formalize) — it may not match any one source system's record exactly, attribute for attribute.
- **It is not static.** As source systems update, a well-maintained golden record updates too; it's a continuously-reconciled result, not a one-time snapshot.

## How a golden record gets built

Once matching (Lessons 6–7) has identified that several records refer to the same entity, building the golden record means deciding, attribute by attribute, which source's value is most trustworthy. Phone number might come from the CRM (updated most recently, most reliably). Legal billing address might come from the ERP (the system of record for finance). Email might come from whichever system has the most recently confirmed value. The result is a single record that's often more complete and more accurate than any one of its sources alone — that's the actual value of "golden," earned through reconciliation, not inherited from any one source.

## Physical vs. virtual

Whether a golden record physically exists as stored data, or is computed on the fly, depends on the architecture style from Lesson 3:

- **Registry style** — the golden record is typically **virtual**: computed at query time by following the cross-reference links and pulling the winning value per attribute, without ever storing a separate combined row.
- **Consolidation and centralized styles** — the golden record is typically **physically stored** in the central master data store, since those styles already maintain a central copy.
- **Coexistence style** — usually physical, with the added complexity of keeping it synchronized as source systems change.

## Key terms

| Term | Meaning |
|---|---|
| Golden record | The single, trusted, best-available version of a master data entity, reconciled from matched source records |
| Virtual golden record | A golden record computed at query time rather than physically stored |
| Source record | One system's individual, pre-reconciliation version of an entity |

## Lab

Using the three-system customer example from Lesson 1 (CRM, billing, shipping), sketch what a golden record for that customer would look like — which system's phone number would you use, which system's address, and why? You're informally applying survivorship logic before Lesson 10 formally names it.

## Check yourself

Can you explain why a golden record is not simply "the record from your most trusted system," and describe the difference between a physical and a virtual golden record?
