# Lesson 53 — Business Requirements

**Chapter 11 · Capstone Project · Lesson 1 of 6**

## What you'll learn

- The capstone scenario you'll build across the rest of this chapter
- How to translate a business ask into a technical pipeline design
- Which specific course concepts map to which requirement
- Why writing this down first matters, even for a solo project

## The scenario: Northwind Retail

You're the data engineer for **Northwind Retail**, a mid-size company
selling through regional stores. Their nightly sales data currently
sits in an **on-premises SQL Server** database, and it stays there —
nobody outside the store back office can see it until someone
manually exports a spreadsheet the next morning. The business wants
that changed.

## The actual requirements, as given to you

A real capstone starts the way a real project does: with a
stakeholder's plain-language ask, not a technical spec.

> "We need yesterday's sales, cleaned up and totaled by region and
> product category, sitting in our cloud database every morning
> before the 8 AM leadership meeting. It has to run on its own — no
> one should have to remember to kick it off. And whatever you build,
> our security team needs to sign off that no passwords are sitting
> around in plain text anywhere."

Four sentences. Every one of them is a real technical requirement in
disguise.

## Translating the ask into a pipeline design

| Business language | Technical requirement | Course concept |
|---|---|---|
| "Sales data currently on-premises" | Need a bridge from on-prem SQL Server into Azure | Self-hosted integration runtime (Ch. 7) |
| "Cleaned up and totaled by region and category" | Real transformation logic, not just a raw copy | Mapping data flow: filter, aggregate, join (Ch. 5) |
| "Every morning before 8 AM, on its own" | Unattended, scheduled, reliable execution | Schedule trigger + error handling (Ch. 6, Ch. 8) |
| "No passwords sitting around in plain text" | Credential-free authentication | Managed identity + Key Vault (Ch. 10) |

Notice that not one of these four requirements was handed to you as
"build a pipeline with X activity." Real requirements almost never
are — turning them into an actual architecture is genuinely the
skill being tested here, not just remembering activity names.

## The architecture, end to end

```
On-premises SQL Server (self-hosted IR)
        |
        v
  Copy activity  ---->  ADLS Gen2 "raw" zone (Parquet)
        |
        v
  Mapping data flow (filter, derived column, aggregate, join)
        |
        v
  Azure SQL Database "curated" table
        |
        v
  Power BI report, refreshed every morning
```

Five stages, each one mapping directly to a chapter you've already
completed. The rest of this chapter builds every stage of this
diagram for real.

## What "done" actually looks like

A capstone needs a concrete finish line, not a vague sense of
"working." Here's the actual bar, lesson by lesson:

- **Lesson 54** — a Copy activity reliably lands raw sales data in
  ADLS Gen2.
- **Lesson 55** — the pipeline handles a missing source table or a
  transient connection failure without falling over or silently
  losing data.
- **Lesson 56** — a mapping data flow produces genuinely correct,
  aggregated numbers by region and category.
- **Lesson 57** — the whole thing runs unattended, on schedule,
  secured, and observable if it ever breaks at 3 AM.
- **Lesson 58** — you can explain the finished pipeline to someone
  who's never seen it, in under five minutes.

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | Landing storage for data in its original, untransformed shape |
| Curated table | The final, cleaned, business-ready output table |
| Requirement traceability | Being able to point at exactly which pipeline piece satisfies which business ask |

## Lab

1. Write your own one-paragraph stakeholder ask for a hypothetical
   pipeline, in plain business language with no technical terms.
2. Translate it into a table like the one in this lesson — one row
   per requirement, mapped to a course concept.
3. Sketch the end-to-end architecture, stage by stage, the way this
   lesson's diagram does.

## Check yourself

You're ready for Lesson 54 when you can explain, in one sentence, why
translating business language into technical requirements is a real
skill, not just a formality before "the real work" begins.
