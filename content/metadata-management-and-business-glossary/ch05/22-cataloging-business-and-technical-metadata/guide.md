# Lesson 22 — Cataloging Business and Technical Metadata

**Chapter 5 · Data Catalogs · Lesson 22 of 25**

## What you'll learn

- The two practical ways business and technical metadata actually get into a catalog
- Why automated scanning and manual curation are complementary, not competing, approaches
- A worked example showing both paths feeding the same catalog entry
- What happens to a catalog that relies on only one of the two

## Two paths into a catalog

Metadata gets into a catalog one of two ways, and a mature catalog program uses both, deliberately, rather than picking one:

- **Automated scanning** — a catalog tool connects directly to source systems (a SQL Server instance, a Power BI workspace, a data lake) and automatically pulls technical metadata: table names, column names, types, row counts, last-modified dates. This is the same `INFORMATION_SCHEMA`-style extraction from Lesson 12, run automatically and on a schedule rather than by hand.
- **Manual curation** — a human (a steward, per Data Governance Foundations Lesson 14) adds the business layer scanning can never produce on its own: definitions, ownership, business context, links to glossary terms. This is exactly Lesson 2's point that business metadata doesn't generate itself.

## Why both are necessary, not competing

A catalog built on scanning alone is technically comprehensive and completely useless for business users — it can tell you `CustomerId` is an `INT`, but not that it's the primary key every revenue report joins on, or who to ask when it looks wrong. A catalog built on manual curation alone is accurate where someone bothered to write something, and silently empty everywhere else, with no way to even know what's missing. Scanning guarantees *coverage*; curation supplies *meaning*. Neither substitutes for the other.

## A worked example: both paths feeding one entry

For `dbo.Orders.OrderTotal`:

| Field | Source | Value |
|---|---|---|
| Table/column name, type | Automated scan | `DECIMAL(10,2)`, not null |
| Row count, last modified | Automated scan | 2.1M rows, refreshed nightly |
| Business definition | Manual curation (steward) | "Total dollar value of a completed order, including tax and shipping" |
| Glossary link | Manual curation (steward) | Links to the "Order Value" glossary term |
| Owner | Manual curation (steward, assigned per Data Governance Foundations Lesson 14) | Finance Data Steward |

The scan runs nightly without anyone thinking about it; the curated fields were written once and only need updating when the business meaning actually changes (the maintain stage from Lesson 4) — different update cadences for different fields, reflecting how differently each one goes stale.

## What happens with only one path

An organization that only scans ends up with a catalog full of correctly-typed, meaningless entries — technically findable, practically useless. An organization that only curates ends up with gaps nobody notices, because nothing flags an undocumented table as missing; it simply doesn't appear, the same silent-gap problem Lesson 15 described for structural drift in dictionaries. Running both, on their own appropriate schedules, is what makes a catalog genuinely trustworthy rather than just technically accurate or just well-intentioned.

## Key terms

| Term | Meaning |
|---|---|
| Automated scanning | A catalog tool connecting directly to source systems to pull technical metadata automatically |
| Manual curation | A human adding business context, definitions, and ownership that scanning can't produce |

## Lab

For a table you've worked with in this course's earlier labs, list which fields a scan would capture automatically, and which fields genuinely require a human to write — and would therefore sit empty in a scan-only catalog.

## Check yourself

Can you explain why automated scanning and manual curation are complementary rather than redundant, and what specifically goes wrong in a catalog that relies on only one of them?
