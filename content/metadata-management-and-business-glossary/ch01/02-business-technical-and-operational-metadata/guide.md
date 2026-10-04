# Lesson 2 — Business, Technical and Operational Metadata

**Chapter 1 · Metadata Foundations · Lesson 2 of 25**

## What you'll learn

- The three standard categories metadata gets split into, and why the split exists
- A worked example showing all three types describing the exact same column
- Who typically produces and maintains each type
- Why mixing the three up causes real governance confusion

## Why split metadata into three types at all

Lesson 1 defined metadata broadly. In practice, metadata practitioners split it into three categories because each type answers a different question, gets produced by a different process, and matters to a different audience.

- **Business metadata** answers *"what does this mean to the business?"* — definitions, business rules, data owners. Produced by business stewards (Data Governance Foundations, Lesson 14). Read by analysts and new hires trying to understand a field.
- **Technical metadata** answers *"what is this, structurally?"* — data type, length, constraints, table/column names. Produced automatically by the database system itself. Read by developers and data engineers writing queries against it.
- **Operational metadata** answers *"what actually happened to this data?"* — when it was last loaded, how many rows moved, which job produced it, how long it took. Produced automatically by pipelines and schedulers. Read by whoever is debugging a late or broken report.

## One column, three descriptions

Take a single column: `CustomerLifetimeValueUSD` in a `dbo.CustomerSummary` table.

| Metadata type | What it says about this column |
|---|---|
| Business | "The total revenue a customer is expected to generate over their relationship with the company, in US dollars. Owned by the Finance data domain. Used in the quarterly board deck." |
| Technical | `DECIMAL(18,2)`, nullable, no default, part of a composite index with `CustomerId` |
| Operational | Last refreshed 2026-10-03 06:12 UTC by the `nightly_customer_load` pipeline; 48,219 rows affected; job ran in 4 minutes 12 seconds |

None of these three descriptions is wrong, and none of them is complete on its own. A developer who only has the technical metadata knows it's a decimal but not what it means. A business user who only has the business definition doesn't know if today's number is fresh or three weeks stale. A good metadata management program captures and surfaces all three together.

## Who produces each type

| Type | Typically produced by | Typically stored in |
|---|---|---|
| Business | Data stewards, subject matter experts | Business glossary (Chapter 2) |
| Technical | The database/system itself, automatically | `INFORMATION_SCHEMA`, data catalogs, data dictionaries (Chapter 3) |
| Operational | Pipeline/orchestration tools, automatically | Job logs, monitoring dashboards, lineage tools |

The pattern worth noticing: technical and operational metadata are largely generated *automatically* by the systems that already exist. Business metadata is the one type that has to be deliberately written by a person — which is exactly why Chapter 2 of this course spends five lessons on how to do that well.

## Where confusion actually happens

A common real-world failure: someone asks "is this table good?" and gets a technical answer ("the schema is well-formed, no nulls where there shouldn't be") when they were actually asking a business question ("does this number mean what I think it means?") or an operational question ("is this today's data or last week's?"). Knowing which of the three types a question is really asking lets you route it to the right person and the right artifact, instead of a technically-correct non-answer.

## Key terms

| Term | Meaning |
|---|---|
| Business metadata | Definitions, rules, and ownership — what data means to the business |
| Technical metadata | Structural facts about data — type, length, constraints |
| Operational metadata | Facts about data's movement and processing — freshness, volume, job history |

## Lab

Pick one table or spreadsheet you use regularly at work or in a personal project. Write one sentence of business metadata (what it means), list two pieces of technical metadata you can already see (column types, for example), and name one piece of operational metadata you'd want but probably don't currently have (like "when was this last updated").

## Check yourself

Given any single column, can you produce one honest example each of its business, technical, and operational metadata — and explain, without looking back, which of the three is usually hardest to generate automatically and why?
