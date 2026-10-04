# Lesson 5 — Metadata Repositories

**Chapter 1 · Metadata Foundations · Lesson 5 of 25**

## What you'll learn

- What a metadata repository is, and how it differs from a database that stores actual data
- The four common shapes a metadata repository takes in practice
- Why organizations usually end up with more than one, and what that costs them
- How this closes out Chapter 1 and sets up the rest of the course

## What a metadata repository actually is

A **metadata repository** is a system built specifically to store, organize, and serve metadata — not the underlying data itself. The distinction matters: a `Customers` table in a production database holds customer *data*. A metadata repository holds the *description* of that table — its columns, its owner, its definition, its lineage — separately from the table itself, so that description can be searched and maintained without ever touching production.

## Four common shapes

In practice, "metadata repository" isn't one single product category — it shows up as four different kinds of tooling, each covered in more depth later in this course:

1. **Business glossary tools** (Chapter 2) — store business terms and definitions, usually with an approval workflow
2. **Data dictionaries** (Chapter 3) — store technical, table-and-column-level metadata, often generated partly from the database schema itself
3. **Data catalogs** (Chapter 5) — combine business and technical metadata into one searchable inventory, often with lineage and usage statistics layered on top
4. **Purpose-built metadata registries** — standards-compliant systems built specifically around a model like ISO/IEC 11179 (Lesson 3), more common in regulated industries like healthcare and finance

A mature organization usually ends up using several of these at once — a glossary tool for business terms, a catalog for searchable technical inventory — rather than one tool doing everything.

## Why organizations end up with more than one, and what that costs

Different teams adopt different tools at different times, for different reasons: the BI team picks a catalog bundled with their reporting platform; the compliance team maintains a separate glossary for regulatory terms; a data engineering team tracks lineage in yet another system. Each tool is individually reasonable. Together, they create the exact problem this whole chapter has been building toward solving: metadata about the *same* table now lives in three places, and nothing keeps them in sync.

This is why data catalogs (Chapter 5) increasingly try to be the single integration point — pulling business definitions from the glossary tool, technical metadata from the database, and lineage from pipeline tools, into one searchable place — rather than being yet another standalone repository competing with the others.

## Closing out Chapter 1

This chapter covered what metadata is (Lesson 1), the three types it comes in (Lesson 2), the standards that keep it consistent (Lesson 3), the lifecycle it moves through (Lesson 4), and now where it actually lives (Lesson 5). The rest of this course builds the two artifacts you'll construct most often in a real metadata role: a business glossary (Chapter 2) and a data dictionary (Chapter 3) — then layers on critical data elements (Chapter 4) and data catalogs (Chapter 5) on top of that foundation.

## Key terms

| Term | Meaning |
|---|---|
| Metadata repository | A system built to store and serve metadata, separate from the underlying data |
| Business glossary tool | A repository focused on business terms and definitions with an approval workflow |
| Data dictionary | A repository focused on technical, table/column-level metadata |

## Lab

List every place at your organization (or in a personal project) where you currently keep any kind of documentation about your data — spreadsheets, wiki pages, code comments, a formal catalog tool. How many separate places did you find? That count is your current "metadata repository sprawl."

## Check yourself

Can you name all four common shapes a metadata repository takes, and explain — in your own words — why organizations usually end up with more than one, and what problem that sprawl creates?
