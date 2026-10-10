# Lesson 6 — Query Optimization at Scale

**Chapter 1 · Working at Scale · Lesson 6 of 16**

## What you'll learn

- How to assemble Lessons 3–5 into a repeatable query-optimization sequence
- What divisions are, and the specific pre-filtering benefit they add for very large single-object orgs
- The eligibility and enablement constraints on divisions, including that they can't be turned off once enabled
- How to decide, for a real slow query, which lever (index, skinny table, division) actually applies

## A repeatable sequence, not a grab-bag of tricks

Lessons 3 through 5 each covered one lever: indexing (what's indexed and why), selectivity (what makes a filter actually use an index), and skinny tables/custom indexes (the Support-provisioned escalation once self-service design isn't enough). At LDV scale, these aren't independent tricks to apply at random — they form a sequence an architect should work through in order whenever a query, report, or list view against a large object is underperforming:

1. Confirm the filter is built against an indexed field (automatically-indexed, from Lesson 3).
2. Confirm the filter condition itself is selective under the relevant threshold (Lesson 4) — rewriting away from negative operators, null checks, or leading wildcards where possible.
3. If the query genuinely can't be made selective enough with available fields, evaluate whether a custom index on a different field would help, and whether the standard/custom field join itself (not just the filter) is the bottleneck, in which case a skinny table (Lesson 5) is the right ask.
4. Only after exhausting 1–3, treat Support engagement (custom index or skinny table request) as the next step — backed by the actual query and volume data Support needs to evaluate it.

Most query performance problems at LDV scale are resolved somewhere in steps 1–2. Steps 3–4 are genuinely less common, reserved for objects where the data access pattern itself, not just a fixable filter, is the issue.

## Divisions: pre-filtering an entire object before a query even runs

**Divisions** are a distinct, org-level partitioning feature aimed at a different kind of problem: an org whose single object has grown so large that even well-indexed, selective queries are working against a bigger overall row set than the business actually needs for most use cases. A division assigns every record in the org to one partition — Salesforce's example is a customer base split into regional divisions like US, EMEA, and APAC — and every record carries a Division field recording which one it belongs to. A user is assigned a default division, and (depending on setup) can switch which division's data they're searching, reporting on, or querying against.

The performance benefit is that division membership can be used to scope searches, reports, and SOQL/SOSL *before* any other filter is evaluated — in SOSL specifically, a `WITH` clause scoping by division is generally faster than putting the equivalent condition in a `WHERE` clause, because the platform can exclude an entire division's data up front rather than filtering it out row by row.

## Eligibility, enablement, and real constraints

Divisions aren't for every org. They're intended for organizations with well over a million records in a single object and a meaningfully sized user base, and — like custom indexes and skinny tables — they're enabled by Salesforce Customer Support, not through a Setup checkbox. Once enabled, every org automatically gets a global default division, and any record that isn't otherwise assigned lands there.

There are real constraints to plan around before requesting divisions: they cannot be disabled once enabled, which makes this a one-way architectural decision rather than something to try experimentally. Shared records on objects like Account and Opportunity can't belong to more than one division at once, which matters for orgs where the same account record legitimately needs visibility across regions. And divisions are explicitly **not** a security or visibility control — they partition data for performance scoping, not for hiding records from users who shouldn't see them; that job still belongs to the sharing model.

## Choosing the right lever for a real problem

Faced with a slow query against an LDV-scale object, the diagnostic question is which of these tools actually addresses the cause: if the issue is a specific filter condition not being selective, that's Lessons 3–4's territory (indexing and selectivity). If the issue is the standard/custom field join itself once the filter is already selective, that's a skinny table (Lesson 5). If the issue is that the object's total row count is simply too large for even a well-targeted query to stay fast, and the business naturally segments into partitions (regions, business units), that's when divisions become the right conversation to have with Salesforce — understanding going in that it's a one-way, org-wide decision.

## Key terms

| Term | Meaning |
|---|---|
| Division | An org-level partition (e.g., by region) that every record is assigned to, used to pre-scope searches, reports, and SOQL/SOSL before other filtering |
| Global default division | The division every org automatically gets once divisions are enabled; unassigned records land here |
| WITH (SOSL) | A SOSL clause that scopes a search by division before other filtering, generally faster than an equivalent WHERE condition |

## Lab

A global retailer's Account object has 12 million records, cleanly separable into three regions that rarely need to be queried together. Reports scoped to "my region's accounts" are slow even though the underlying filters are selective and backed by standard indexes. Using this lesson's sequence, explain why steps 1–3 (indexing, selectivity, skinny tables) likely won't fully solve this, why divisions might be the right next step, and name two constraints the architect must accept before recommending it to the client.

## Check yourself

Can you walk through the four-step query-optimization sequence this lesson lays out, in order? Can you explain what a division does differently from a WHERE-clause filter, and name one constraint that makes enabling divisions a one-way decision?
