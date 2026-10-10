# Lesson 6 — Mappings

**Chapter 2 · Designing the Migration · Lesson 6 of 18**

## What you'll learn

- What a field-level mapping document actually contains, beyond "source field goes to target field"
- Why type mismatches have to be resolved on paper before any load, not discovered during one
- How picklist value translation works as its own mapping problem
- Who should sign off on a mapping document and why

## From scope to a concrete mapping

Chapter 1 ended with an agreed, signed-off scope: specific objects, specific fields, a specific historical range. Chapter 2 turns that scope into something a tool can actually execute against, and the first and most foundational artifact of that design work is the **mapping document** — a field-by-field record of exactly where every piece of source data goes in the target Salesforce schema. A mapping document is not a casual spreadsheet thrown together the morning of the load; it's the single source of truth that transformation design (Lesson 7), sequencing (Lesson 8), and validation (Lesson 12) all build on top of.

## What a real mapping document contains

A usable mapping document goes well past "Source.CustomerName maps to Account.Name." For each field, it should capture: the source field's name and location (which system, which table/object); the target Salesforce field's API name (not just its label, since labels can be renamed without changing the underlying field the load actually references); both fields' data types; whether the target field is required; and any transformation rule that applies to that specific field (covered in depth next lesson, but referenced here so the mapping document and the transformation design stay in sync rather than drifting apart as two separate documents nobody reconciles). Treating this as a living data dictionary — not a one-time export — means that when someone asks six months after go-live "where did this field's data actually come from," there's a real answer.

## Type mismatches have to be resolved before the load, not during it

The source and target almost never agree perfectly on data types, and every mismatch has to get an explicit resolution written into the mapping document. A classic example: a legacy "State" field that's free text in the source system (so it might contain "California," "CA," "Calif.," or a typo) mapping onto a Salesforce picklist field that only accepts a fixed, exact set of values. Loading free text directly into a strict picklist either fails the record outright or, worse, silently creates unexpected values if the target field happens to be a picklist that allows unrestricted additions. The mapping document has to state, for that field, exactly how free text becomes a valid picklist value — which is a **picklist value translation**: an explicit lookup table (every known source value mapped to one specific target picklist value, with a documented fallback for anything unrecognized) that gets built once, during design, rather than guessed at record-by-record during the load.

Other common mismatches that belong in the mapping document the same way: a source date stored as text in an inconsistent format landing on a true Salesforce Date/DateTime field; a source numeric field stored as text landing on a Currency or Number field; and multiple source fields that need to combine into one target field (or vice versa) — which starts to shade into transformation logic, exactly why Lesson 7 follows this one directly.

## Sign-off, again

Just as scope needed formal sign-off in Lesson 4, the mapping document needs sign-off too — but from a different, more technical audience. Scope sign-off answers "is this the right data to move." Mapping sign-off answers "is this exactly where and how it's moving," and it should involve whoever actually understands the source data's real-world meaning (often a business analyst or a long-time user of the source system) checking the document line by line, not just the architect who built it. A mapping error caught in this review is a five-minute edit to a spreadsheet; the same error caught during validation in Chapter 3 means re-running part of a load.

## Key terms

| Term | Meaning |
|---|---|
| Mapping document | The field-by-field record of exactly where every piece of source data goes in the target schema |
| Target field API name | The underlying Salesforce field name a load actually references, as opposed to its (renameable) display label |
| Type mismatch | A difference in data type or format between a source field and its mapped target field that has to be explicitly resolved |
| Picklist value translation | An explicit lookup table mapping every known source value to one valid target picklist value, with a documented fallback |

## Lab

A legacy system stores "Lead Source" as free text, and reps have typed in at least a dozen variants over the years: "Web," "website," "Web Form," "referral," "Referral - Partner," "cold call," "Trade Show," "tradeshow," and others. The target Salesforce Lead Source picklist has exactly five values: Web, Referral, Partner, Trade Show, Other. Build a short picklist value translation table mapping at least eight of the legacy variants to one of the five target values, and state what you'd do with any value you can't confidently map to one of the five.

## Check yourself

Can you list the five things a usable mapping document captures for each field, beyond just "source field → target field"? Can you explain, with an example, why a type mismatch has to be resolved in the mapping document before the load rather than left for the load tool to figure out?
