# Matching Rules and Duplicate Rules

**Chapter 3 · Data Quality · Lesson 13 of 20**

Lesson 12 kept the two rule types at arm's length: Matching Rules decide if two records look alike, Duplicate Rules decide what to do about it. This lesson goes inside the Matching Rule — the part that actually does the comparing — and walks through building a custom one, since the three standard rules won't catch everything your org cares about.

## What you'll learn

- Exact vs. fuzzy matching criteria, and when each one is the right call
- How to build a custom matching rule, field by field
- How a duplicate rule references a matching rule once it's built
- Why matching criteria is the thing to loosen first when duplicates slip through

## Exact vs. fuzzy: the core choice

Every field in a matching rule is compared with either **Exact** or **Fuzzy** logic:

![Matching Rule Detail page for Account Name Exact, showing Matching Criteria: Account: Name EXACT MatchBlank = FALSE](/courses/salesforce-data-management/ch03/13-matching-rules-and-duplicate-rules/matching-rule-detail-exact.png)
*Exact matching: "Acme Corp" and "Acme Corporation" are two different strings, so this rule misses them entirely.*

- **Exact** means the field values must be character-for-character identical (case-insensitive). Fast and precise, but brittle — it misses "Acme Corp" vs. "Acme Corporation," or a phone number with different punctuation.
- **Fuzzy** means Salesforce applies an algorithm tuned to the field type — name matching tolerates abbreviations, nicknames, and word order; address matching tolerates "St" vs. "Street." It catches more real duplicates, but can also flag records that are genuinely different.

![Matching Rule Detail page for Account Name Potential Match, showing Matching Criteria: Account: Name FUZZY: COMPANY NAME MatchBlank = FALSE](/courses/salesforce-data-management/ch03/13-matching-rules-and-duplicate-rules/matching-rule-detail-fuzzy.png)
*Fuzzy matching with the Company Name algorithm: this is the rule that actually catches "Acme Corp" against "Acme Corporation."*

Most custom matching rules combine both — an exact match on something reliable like an email domain, paired with a fuzzy match on something human-entered like a company name.

## Building a custom matching rule

From Setup, Quick Find **Matching Rules**, click **New Rule**, and choose the object:

![Setup's Matching Rules list page with the New Rule button circled](/courses/salesforce-data-management/ch03/13-matching-rules-and-duplicate-rules/matching-rules-new-rule-button.png)
*New Rule is the starting point for a custom rule on Account, Contact, or Lead.*

From there you pick one or more fields, a matching method per field (Exact, Fuzzy, or one of the fuzzy sub-algorithms like First Name or Street), and whether blank values should count as a match (almost always **no** — leave `MatchBlank = FALSE`, or two records with empty fields will match each other). Combine fields with AND to require both, which is how the standard rules stay precise despite using fuzzy logic — "fuzzy name AND fuzzy mailing street" catches far fewer false positives than fuzzy name alone.

## Wiring it into a duplicate rule

A matching rule does nothing by itself; a duplicate rule has to reference it:

![A duplicate rule's Matching Rules section, set to Compare Contacts With Contacts, using Custom Contact Matching Fuzzy Mailing Street](/courses/salesforce-data-management/ch03/13-matching-rules-and-duplicate-rules/matching-rule-selection-in-duplicate-rule.png)
*Inside the duplicate rule builder: pick which object to compare against, then which matching rule evaluates the comparison.*

A single duplicate rule can reference more than one matching rule — for example, comparing a new Lead against both existing Leads and existing Contacts, each with its own matching rule, so a rep converting a Lead doesn't accidentally create a second Contact for someone who already exists.

## Tuning when duplicates slip through

When an admin reports "duplicates are getting past the rule," the fix is almost always in the matching criteria, not the duplicate rule:

- **Too strict (Exact only).** Switch the relevant field to Fuzzy, or add a fuzzy field as an alternative match path.
- **Too loose (false positives).** Add an AND condition on a second field, or switch a fuzzy field to one of the narrower fuzzy sub-algorithms.
- **Wrong fields entirely.** A Contact matching rule built only on email won't catch someone re-entered with a work email the first time and a personal email the second — add Name or phone as a second comparison.

## Recap

- Matching Rules compare fields using Exact or Fuzzy logic, field by field, combined with AND.
- Exact is precise but brittle; Fuzzy catches more but risks false positives — most custom rules blend both.
- A duplicate rule references one or more matching rules per object it compares against; it has no matching logic of its own.
- When duplicates slip through, adjust the matching criteria first — that's where the comparison logic actually lives.

## Check yourself

Your duplicate rule is flagging unrelated Contacts as duplicates because it matches on fuzzy Last Name alone. What's the simplest change to tighten it up, in one sentence?
