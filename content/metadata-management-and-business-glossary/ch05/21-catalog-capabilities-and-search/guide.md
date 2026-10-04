# Lesson 21 — Catalog Capabilities and Search

**Chapter 5 · Data Catalogs · Lesson 21 of 25**

## What you'll learn

- Why search quality, not storage capacity, is what actually determines whether a catalog gets used
- Four capabilities that separate a genuinely useful catalog from a glorified spreadsheet
- Why faceted search matters more than keyword search alone for a catalog specifically
- A worked example of how one search query should behave in a well-built catalog

## Why search quality is the whole point

A catalog with perfect metadata that nobody can actually find is worthless — this is the same "publish" failure mode from the metadata lifecycle (Lesson 4), specific to catalogs. The entire value of a catalog collapses into one question: when someone searches for something, do they find the right answer quickly? Everything else — how complete the metadata is, how nice the interface looks — is secondary to that one capability.

## Four capabilities that separate a useful catalog from a spreadsheet

1. **Full-text search across both business and technical metadata** — a search for "active customer" should surface the glossary term *and* every dictionary entry whose description references it, not just an exact title match.
2. **Faceted filtering** — the ability to narrow results by owner, by system, by status (approved vs. deprecated, echoing Lesson 8's term lifecycle), or by data sensitivity classification. A flat list of a thousand search results is barely more useful than no search at all.
3. **Relationship navigation** — clicking from a glossary term to the dictionary entries that implement it, and back (the glossary-dictionary link from Lesson 11), without re-searching from scratch.
4. **Usage-based ranking** — when multiple results plausibly match a search, surfacing the one that's actually queried in production dashboards above one nobody has touched in years (the usage information from Lesson 20).

## Why faceted search matters specifically for catalogs

A general web search mostly works on relevance ranking alone, because the web doesn't have a reliable, structured "owner" or "status" field to filter on. A data catalog *does* have that structure — every entry has an owner, a status, a sensitivity classification, a source system — because Chapters 2 through 4 of this course spent enormous effort getting those fields documented consistently. Faceted search is where that upfront structural investment actually pays off: a user can narrow "show me approved, Finance-owned tables containing PII" in three clicks, something a flat keyword search could never do reliably.

## A worked search example

A new analyst searches "customer revenue" in a well-built catalog. A good result set surfaces, in order: the "Net Revenue" glossary term (exact concept match), the `dbo.Orders.OrderTotal` dictionary entry (implements part of that concept, heavily used per Lesson 20's usage data), and a related "Customer Lifetime Value" glossary term (related concept, per Lesson 9's related-term relationship) — with an option to filter further by owner or system if the analyst needs to narrow down. A poorly built catalog returns an unsorted list of every table with "customer" somewhere in its name, forcing the analyst to read through dozens of irrelevant results.

## Key terms

| Term | Meaning |
|---|---|
| Faceted search | Filtering search results by structured attributes (owner, status, sensitivity) rather than keywords alone |
| Usage-based ranking | Prioritizing search results by how actively they're queried in production |

## Lab

Pick a search tool you use regularly (a code search, a document search, a product search on a retail site). List which of the four capabilities above it has, and which it's missing. How does that affect how useful you find it?

## Check yourself

Can you name all four catalog capabilities from this lesson, and explain why faceted search specifically depends on the metadata consistency work from Chapters 2 through 4?
