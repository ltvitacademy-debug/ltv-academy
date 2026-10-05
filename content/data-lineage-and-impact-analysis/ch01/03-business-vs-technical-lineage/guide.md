# Lesson 3 — Business vs. Technical Lineage

**Chapter 1 · Lineage Concepts · Lesson 3 of 25**

## What you'll learn

- The difference between business lineage and technical lineage, and who each one is actually for
- Why a single data journey needs both views instead of picking one
- A worked comparison of the same data flow shown both ways
- How to recognize which view you're looking at when someone hands you a lineage diagram

## Two views of the same journey

The exact same flow of data — from a source system through transformations to a final report — can be shown at two very different altitudes, and conflating them is a common mistake.

**Business lineage** describes that journey in terms a non-technical stakeholder already understands: domain concepts, system names, and plain-language steps. "Customer Lifetime Value on the executive dashboard comes from the CRM and the billing system, combined in the data warehouse." No tables, no column names, no code — just enough to answer "where does this come from and can I trust it" for someone who will never open a query editor.

**Technical lineage** describes the same journey at the level engineers actually need to debug or change it: specific tables, specific columns, specific transformation logic, specific job names. "`dbo.CLV_Summary.LifetimeValueUSD` is computed in `sp_CalculateCLV` by summing `Billing.Invoices.AmountPaid` joined to `CRM.Accounts` on `AccountID`, filtered to `Status = 'Active'`." This is precise enough to actually trace a bug or assess a schema change, but meaningless to most business stakeholders.

## Why you need both, not one

Picking only technical lineage leaves business stakeholders unable to answer basic trust questions themselves — every "where does this number come from" question becomes a ticket to the data team. Picking only business lineage leaves engineers without enough detail to actually perform impact analysis or root cause analysis (Lesson 2) — "the warehouse" isn't a specific enough answer when a specific column breaks. Mature lineage practices maintain both views over the *same* underlying journey, usually generating the business view as a simplified roll-up of the technical one rather than maintaining two unrelated sets of documentation.

## The same flow, both ways

| | Business lineage | Technical lineage |
|---|---|---|
| Audience | Executives, analysts, auditors | Data engineers, analysts writing SQL |
| Vocabulary | Domain terms ("Customer Lifetime Value") | Object names (`dbo.CLV_Summary.LifetimeValueUSD`) |
| Granularity | System-to-system, or system-to-report | Table-to-table, column-to-column |
| Typical use | "Can I trust this number, roughly where is it from?" | "Exactly what breaks if I change this column?" |
| Example statement | "CLV comes from the CRM and billing system" | "`LifetimeValueUSD` sums `AmountPaid` joined on `AccountID`" |

## Recognizing which view you're looking at

A quick test: if a diagram's boxes are named things like "CRM," "Billing System," and "Executive Dashboard," you're looking at business lineage. If the boxes are named things like `dbo.Accounts`, `stg.Invoices_Clean`, and `sp_CalculateCLV`, you're looking at technical lineage. Neither is "better" — they're built for different readers, and a complete lineage practice produces both from the same underlying truth.

## Key terms

| Term | Meaning |
|---|---|
| Business lineage | A lineage view in plain-language, domain-level terms, for non-technical stakeholders |
| Technical lineage | A lineage view in specific object-level terms (tables, columns, jobs), for engineers |
| Roll-up | Simplifying a detailed technical lineage view into a readable business-level summary |

## Lab

Take the hop list you wrote in Lesson 1's lab (the report or number you trace regularly). Write it once as business lineage (plain system and domain names only) and once as technical lineage (as specific as you can get — table names, column names, or at least specific tool/process names). Notice how much more specific the second version has to be to actually be useful for debugging.

## Check yourself

Can you describe, in your own words, who business lineage is built for versus who technical lineage is built for, and explain why a mature lineage practice needs both rather than choosing one?
