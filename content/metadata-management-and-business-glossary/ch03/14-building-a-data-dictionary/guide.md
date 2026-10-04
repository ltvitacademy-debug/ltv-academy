# Lesson 14 — Building a Data Dictionary

**Chapter 3 · Data Dictionaries · Lesson 14 of 25**

## What you'll learn

- A concrete, repeatable process for building a dictionary, mirroring Lesson 10's glossary process
- Why starting from the database schema (not a blank spreadsheet) is the right entry point
- A worked example combining everything from this chapter into one small, real dictionary
- How to decide what to document first when facing an entire database

## The process, step by step

1. **Pull the schema, don't start from a blank page.** Run the `INFORMATION_SCHEMA.COLUMNS` query from Lesson 12 against your target tables first — you get names, types, nullability, and defaults for free, and you're documenting *real* columns instead of guessing what might exist.
2. **Prioritize the tables people actually query.** The same scoping logic from Lesson 10's glossary process applies here: don't try to document every table in the database at once. Start with the handful that show up in the most dashboards, reports, or support tickets.
3. **Write descriptions, enforcing Lesson 13's three standards** as you go — fix naming issues you find, require a real description for every column (no skipping the confusing ones), and match the glossary's terminology.
4. **Attach descriptions with extended properties** (Lesson 12), so the documentation lives with the database rather than in a document that will drift.
5. **Link to the glossary** (Lesson 11) wherever a column implements a business concept that already has — or should have — a glossary entry.
6. **Publish it somewhere searchable** — the same publish discipline from the metadata lifecycle (Lesson 4) and the glossary process (Lesson 10) applies here too.

## A worked mini-dictionary: three columns from `dbo.Customer`

| Column | Type | Nullable | Description | Glossary link |
|---|---|---|---|---|
| `CustomerId` | `INT` | No | Unique identifier for the customer record. Primary key. | — |
| `IsActiveFlag` | `BIT` | No | True when the customer qualifies as an Active Customer. Recalculated nightly. | → "Active Customer" |
| `LastPurchaseDate` | `DATE` | Yes | Date of the customer's most recent completed order. Null if no orders exist. | — |

Three columns, each with real structural metadata (pulled from the schema), a standards-compliant description, and a glossary link where one applies. This is small on purpose — a real, trustworthy three-column dictionary beats an aspirational hundred-table one that's half-finished and half-wrong.

## What to document first, facing an entire database

When a database has hundreds of tables and documenting all of them feels impossible, use this priority order: tables referenced in existing reports or dashboards first, then tables with the most confusing or ambiguous column names, then everything else, roughly in order of how often it actually gets queried. A table nobody has queried in two years can wait; a table five different reports depend on cannot.

## Key terms

| Term | Meaning |
|---|---|
| Schema-first documentation | Starting from the real, queried schema rather than a blank template |
| Dictionary priority order | Documenting the most-used, most-confusing tables first, not alphabetically |

## Lab

Using the six-step process above, build a three-to-five-column mini-dictionary entry for one real table you have access to (or one from a public sample dataset). Include type, nullability, a standards-compliant description, and note whether any column should link to a glossary term.

## Check yourself

Can you walk through all six steps from memory, and explain why starting from `INFORMATION_SCHEMA` beats starting from a blank spreadsheet template?
