# Lesson 6 — Business Glossary Concepts

**Chapter 2 · Business Glossary · Lesson 6 of 25**

## What you'll learn

- What a business glossary is, and what it deliberately leaves out
- The difference between a glossary term and a technical metadata entry
- Why a glossary is organized around business concepts, not tables or columns
- A first look at what a real glossary entry contains

## What a business glossary is

A **business glossary** is a curated, approved list of business terms and their definitions — the shared vocabulary an organization agrees to use. "Active Customer," "Net Revenue," "Churn," "Fiscal Quarter" — each gets exactly one official definition, owned by a specific person or team, that everyone in the organization is expected to use instead of inventing their own.

It deliberately leaves out *how* something is implemented. The glossary entry for "Active Customer" says what the term means in business terms ("a customer with a purchase in the last 90 days"); it does not say which column, table, or SQL query calculates it. That implementation detail belongs in the data dictionary (Chapter 3) — the glossary and dictionary are usually linked together, but they answer different questions.

## Glossary term vs. technical metadata entry

| | Business glossary term | Technical metadata entry |
|---|---|---|
| Example | "Active Customer" | `dbo.Customer.IsActiveFlag` |
| Answers | What does this concept mean to the business? | What is this specific column, structurally? |
| Owned by | A business steward or subject matter expert | The system/database, often |
| Can map to | Multiple tables or systems | One specific physical location |

This is the business/technical metadata split from Lesson 2, applied specifically to the glossary vs. dictionary relationship that structures the rest of this chapter and the next.

## Organized around concepts, not tables

The most common mistake when starting a glossary: building it one table at a time, so it ends up as a thin restatement of the database schema. A good glossary is organized the other way — around the concepts the *business* actually talks about, regardless of how many tables or systems happen to implement them. "Customer Lifetime Value" might be calculated from five different tables across two systems; it's still exactly one glossary term, with exactly one agreed definition.

## What a real glossary entry contains

A minimal, usable glossary entry includes:

- **Term** — the name, written the way people actually say it
- **Definition** — one to three sentences, in plain business language, no jargon a newcomer wouldn't understand
- **Owner** — who is accountable for keeping this definition accurate
- **Status** — approved, draft, or deprecated
- **Related terms** — other glossary entries this one connects to or is often confused with

This maps directly onto the six core metadata fields from Lesson 3 — a glossary entry is simply a standardized metadata record, applied specifically to a business concept.

## Key terms

| Term | Meaning |
|---|---|
| Business glossary | A curated, approved list of business terms and their shared definitions |
| Glossary term | One entry in the glossary — a business concept, not a database object |
| Glossary vs. dictionary | The glossary covers meaning; the data dictionary (Chapter 3) covers structure |

## Lab

Pick three terms your own team or organization uses regularly that could mean slightly different things to different people (examples: "customer," "revenue," "active user"). For each, write a one-sentence definition specific enough that two different people applying it would get the same answer.

## Check yourself

Can you explain, without looking back, the difference between a glossary term and a technical metadata entry — and why a glossary should be organized around business concepts rather than database tables?
