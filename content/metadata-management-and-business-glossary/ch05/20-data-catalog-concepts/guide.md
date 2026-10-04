# Lesson 20 — Data Catalog Concepts

**Chapter 5 · Data Catalogs · Lesson 20 of 25**

## What you'll learn

- What a data catalog actually is, and how it differs from the glossary and dictionary covered in Chapters 2–3
- Why a catalog is described as an "integration point" rather than a fourth standalone repository
- The three things a catalog entry typically surfaces together, in one place
- How this closes the loop Lesson 5 opened about repository sprawl

## What a data catalog is

A **data catalog** is a searchable inventory of an organization's data assets — tables, reports, dashboards, files — that pulls together business and technical metadata from multiple sources into one place someone can actually search. Where the glossary (Chapter 2) covers business terms and the dictionary (Chapter 3) covers physical structures, the catalog is the layer that surfaces *both* together, plus usage information neither of them tracks on its own.

## Why a catalog is an integration point, not a fourth repository

Lesson 5 warned about repository sprawl: a glossary tool here, a dictionary there, lineage tracked somewhere else entirely. A poorly designed catalog just adds a fourth place metadata has to be separately maintained. A well-designed catalog instead *pulls from* the others — reading business definitions from the glossary, structural metadata from the dictionary (often by connecting directly to `INFORMATION_SCHEMA`, the same source Lesson 12 used), and lineage from pipeline tools — and presents it as one searchable surface, without requiring anyone to re-enter anything that's already documented elsewhere.

## Three things a catalog entry surfaces together

1. **What it is** — the technical structure (from the dictionary): table name, columns, types
2. **What it means** — the business definition (from the glossary): what the data represents, who owns it
3. **How it's actually used** — information neither the glossary nor the dictionary tracks on its own: which reports query this table, how often, and by whom

That third element is what makes a catalog genuinely different from "a glossary and dictionary stapled together." Usage information lets someone searching the catalog see not just what a table is, but whether it's actively relied upon — a strong signal for prioritization (the same impact/likelihood thinking from Lesson 17, applied to "is this worth documenting well at all").

## Closing the loop from Lesson 5

Lesson 5 asked: why do organizations end up with glossaries, dictionaries, and catalogs as separate tools that drift apart? This chapter's answer: they shouldn't stay separate. A catalog that actually integrates with the glossary and dictionary — rather than becoming its own fourth silo — is the practical resolution to the sprawl problem, and it's why most modern metadata tooling (Microsoft Purview, and equivalents from other vendors) is built around exactly this integration pattern rather than being a standalone glossary or dictionary competitor.

## Key terms

| Term | Meaning |
|---|---|
| Data catalog | A searchable inventory combining business metadata, technical metadata, and usage information |
| Integration point | A catalog's role pulling from existing glossary/dictionary/lineage tools rather than duplicating them |

## Lab

Think of a search engine you use daily (a work wiki search, a code search tool, a general web search). List three pieces of information it shows you about a result *before* you click it. How does that compare to the three things a catalog entry is supposed to surface about a dataset?

## Check yourself

Can you name the three things a catalog entry surfaces together, explain why a catalog is called an "integration point" rather than a fourth repository, and connect this back to the sprawl problem from Lesson 5?
