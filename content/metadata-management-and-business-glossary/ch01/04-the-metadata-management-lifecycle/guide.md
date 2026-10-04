# Lesson 4 — The Metadata Management Lifecycle

**Chapter 1 · Metadata Foundations · Lesson 4 of 25**

## What you'll learn

- The five stages real metadata goes through, from creation to retirement
- Why metadata rots exactly the same way data quality rots without upkeep
- The single most commonly skipped stage, and why skipping it is so costly
- How this lifecycle maps onto the rest of this course

## The five stages

Metadata isn't written once and left alone — it moves through a lifecycle, the same way the data quality lifecycle (Data Quality Management, Lesson 5) does:

1. **Capture** — metadata gets created, either automatically (technical/operational) or by a person (business metadata, usually a steward)
2. **Store** — it's recorded somewhere searchable — a glossary, a dictionary, a catalog (Chapters 2, 3, and 5)
3. **Publish** — it's made visible to the people who need it, not left in a private spreadsheet
4. **Maintain** — it gets reviewed and updated as the underlying data, systems, or business rules change
5. **Retire** — when the thing it describes is deprecated or deleted, the metadata entry is marked retired too, not just silently abandoned

## Metadata rots exactly like data quality does

A glossary entry written three years ago, for a column that's since been renamed, resized, and repurposed, is now actively *wrong* — worse than having no entry at all, because a wrong definition is trusted by whoever reads it. This is the same timeliness problem Data Quality Management, Lesson 16 covered for data itself: metadata has a shelf life, and nobody manages it as a one-time project and calls it done.

## The stage everyone skips: Maintain

Capture gets attention because it's required to launch a glossary or catalog project. Publish gets attention because a hidden glossary nobody can see is an obvious, visible failure. **Maintain is the stage that gets skipped**, because nothing visibly breaks the day an entry goes stale — it just quietly becomes less trustworthy, one small drift at a time, until eventually someone finds a clearly wrong definition and stops trusting the whole glossary.

Practical signs maintain is being skipped:
- Entries with no "last reviewed" date, or one that's years old
- An owner field pointing to someone who left the company
- A definition that doesn't match what the column actually contains anymore

## How this maps onto the rest of this course

| Lifecycle stage | Where this course covers it |
|---|---|
| Capture | Chapter 2 (writing good definitions) |
| Store | Chapters 2, 3 (glossary, data dictionary) |
| Publish | Chapter 5 (data catalogs) |
| Maintain | Chapter 2, Lesson 8 (glossary governance and approval) and Chapter 5, Lesson 23 (metadata quality) |
| Retire | Touched on throughout — a deprecated term or column should always be marked, not deleted outright, so historical references still resolve |

## Key terms

| Term | Meaning |
|---|---|
| Metadata lifecycle | Capture → store → publish → maintain → retire |
| Stale metadata | A metadata entry that no longer accurately describes the thing it's attached to |
| Retirement (metadata) | Marking an entry as no longer current, rather than silently deleting it |

## Lab

Find any piece of documentation you've written (a README, a wiki page, a comment) that's more than six months old. Which of the five lifecycle stages has it actually gone through? Is it still in "maintain," or has it quietly drifted without anyone noticing?

## Check yourself

Can you list all five lifecycle stages in order, and explain — without looking back — why "maintain" is the stage most programs skip, and what that skip actually costs?
