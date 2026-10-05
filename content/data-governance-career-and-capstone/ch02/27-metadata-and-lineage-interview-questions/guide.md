# Lesson 27 — Metadata and Lineage Interview Questions

**Chapter 2 · Career Preparation · Lesson 27 of 35**

## What you'll learn

- Four realistic metadata and lineage interview questions, each mapped to a specific concept earlier in this path
- Strong example answers you can adapt and practice
- How these "explain the concept" questions differ from the open scenario questions in Lesson 25
- What a weak answer to each question sounds like, so you can recognize and avoid it

## How these questions differ from scenario questions

Lesson 25 practiced open-ended "how would you handle..." scenarios. Metadata and lineage questions are often more direct: "explain the difference between X and Y," or "walk me through this artifact." Be ready to point at your own glossary, dictionary, or lineage diagram from the capstone and explain one real entry in specific detail — a generic textbook definition alone sounds thin next to a candidate who can also say "and here's the actual term I wrote."

## Question 1: "What's the difference between a business glossary and a data dictionary?"

**Weak answer:** "The glossary is for business people and the dictionary is for IT." True, but it doesn't explain *why*.

**Strong answer:** A business glossary captures what a concept means to the business — one term, one agreed definition, owned by a business steward, and it can span many tables or even multiple systems. "Customer Lifetime Value" might be one glossary term calculated from five tables across two systems. A data dictionary captures technical structure — one row per actual column, documenting its data type, nullability, and source — usually owned by whichever system contains it. The glossary answers "what does this mean"; the dictionary answers "what is this, structurally" (Metadata Management and Business Glossary, Lesson 6).

## Question 2: "How would you identify which data elements are 'critical' for a new regulatory report?"

**Weak answer:** "I'd mark the important-looking fields as critical." Vague, and doesn't name a process.

**Strong answer:** Start from what the report actually calculates and discloses, then trace every field it pulls from back through its lineage. Any field whose error would misstate a regulated number, or cause the organization to violate a disclosure rule, gets flagged as a critical data element — with a named owner and a stricter quality threshold than a typical field (Metadata Management and Business Glossary, Chapter 4: Critical Data Elements, and specifically Lesson 19 on critical data elements and regulatory reporting).

## Question 3: "A report changed and three downstream dashboards broke. How would you have caught that beforehand?"

**Weak answer:** "I'd have tested the report more carefully before shipping it." Doesn't name a repeatable process.

**Strong answer:** Before changing an upstream object, walk downstream through documented lineage to list everything that actually consumes it — this is impact analysis, not root-cause analysis (the mirror image covered in Lesson 25's dashboard scenario). For each dependency found, assess how exposed it is to the specific change, notify its owner ahead of time, and only make the change once those owners have had a chance to react (Data Lineage and Impact Analysis, Lessons 14 and 15: Impact Analysis and Change Impact Assessment).

## Question 4: "How do you decide between column-level and table-level lineage for a given system?"

**Weak answer:** "Column-level is always better, so I'd always use it." Ignores the real trade-off.

**Strong answer:** Table-level lineage is cheaper and faster to build and maintain, and it's enough to answer simple "where did this table come from" questions. Column-level lineage costs more to build and maintain, but it's necessary when a single table has many columns transformed differently from different sources — a wide fact table, for example — and you need to trace one specific number's formula, not just its source table in general (Data Lineage and Impact Analysis, Lesson 4: Column-Level vs. Table-Level Lineage).

## Key terms

| Term | Meaning |
|---|---|
| Business glossary vs. data dictionary | Glossary covers business meaning; dictionary covers technical structure — different owners, different questions answered |
| Critical data element (CDE) | A data element whose error would misstate a regulated or business-critical number |
| Column-level lineage | Lineage traced to the individual column and transformation, not just the table level |

## Lab

Pick one of this lesson's four questions. Answer it twice: once in two sentences, and once walking through a specific, real example from your own capstone artifacts.

## Check yourself

Can you explain, without looking back, why column-level lineage costs more to maintain than table-level lineage, and when that extra cost is actually worth paying?
