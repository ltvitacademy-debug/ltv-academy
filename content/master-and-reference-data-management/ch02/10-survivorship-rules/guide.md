# Lesson 10 — Survivorship Rules

**Chapter 2 · Matching and Consolidation · Lesson 10 of 25**

## What you'll learn

- What a survivorship rule is, precisely
- The common survivorship strategies, and when each makes sense
- Why survivorship rules have to be defined per attribute, not as one global rule
- How survivorship rules get documented and governed

## The definition

A **survivorship rule** is the explicit, documented logic that decides which source's value wins for a specific attribute when building a golden record (Lesson 9) out of multiple matched records. Lesson 9 described golden records as "assembled, attribute by attribute" — survivorship rules are the actual rules that make each of those attribute-level decisions, instead of leaving it to whoever happens to be merging the record that day.

## Common survivorship strategies

- **Most recent wins.** The value from whichever source last updated the field is used — sensible for anything that changes over time, like a phone number or an email address.
- **Trusted source wins.** A specific source is designated as authoritative for a specific attribute regardless of recency — for example, the ERP is always trusted for legal billing address, because that's the system finance actually relies on and corrects.
- **Most complete wins.** When one source has a populated value and another has a blank, the populated (non-null) value wins by default — a simple but often-necessary rule.
- **Most frequent wins.** When the same value appears in more than one source, that level of agreement itself can be used as evidence it's correct — useful when there's no clear "most trusted" source for an attribute.

## Why rules must be defined per attribute, not globally

A single, blanket rule like "the CRM always wins" sounds simple but is usually wrong in practice: the CRM might be the best source for contact information but the worst source for billing address, because sales reps update contact details constantly and never touch billing fields. Real survivorship logic is defined **attribute by attribute** — phone number might use "most recent wins," legal address might use "trusted source: ERP wins," and a custom segmentation field might use "most complete wins" because it's rarely filled in anywhere. Treating survivorship as one global rule is one of the more common mistakes in a first MDM implementation.

## Documenting and governing survivorship rules

Survivorship rules belong in the written MDM policy from Lesson 5 — documented per attribute, per domain, with a named owner who can approve changes. Undocumented survivorship logic buried in code is fragile: nobody outside the engineering team can audit why a particular value won, and a well-intentioned code change can silently flip a rule's behavior for every record in the system.

## Key terms

| Term | Meaning |
|---|---|
| Survivorship rule | The documented logic deciding which source's value wins for a specific attribute |
| Trusted source | A source system designated as authoritative for a specific attribute |
| Attribute-level survivorship | Defining a separate rule per field, rather than one blanket rule for the whole record |

## Lab

For the three-system customer example from Lesson 1 (CRM, billing, shipping), write one survivorship rule per field — phone, address, email — stating which strategy (most recent, trusted source, most complete, most frequent) you'd use for each, and why.

## Check yourself

Can you name the four common survivorship strategies from this lesson, and explain why "the CRM always wins" is usually the wrong way to define survivorship for an entire record?
