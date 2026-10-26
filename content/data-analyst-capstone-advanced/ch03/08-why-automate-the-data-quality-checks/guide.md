# Lesson 8 — Why Automate the Data-Quality Checks

**Chapter 3 · Python Data-Quality Automation · Lesson 8 of 26**

## What you'll learn

- Why the manual row-count check from Lesson 6 isn't enough once this
  warehouse runs on a schedule
- The real cost of a stale manual check — what actually happens the
  first night nobody re-verifies it by hand
- The four categories of data-quality problem this capstone's Python
  layer is built to catch
- Why this check has to run in Python, against the warehouse directly,
  rather than inside any one of the three front-end tools

## What Lesson 6 already proved — and its real limit

Lesson 6 ran a `SELECT COUNT(*)` parity check by hand, once, right
after building the warehouse. That caught a real class of problem —
rows silently dropped by an `INNER JOIN` — at the moment the warehouse
was first loaded. But this warehouse isn't a one-time build. In a real
BI role, a warehouse like this refreshes **nightly**, pulling in
whatever new orders landed in `Sales.SalesOrderDetail` since the last
run. Lesson 6's check only ever proved the warehouse was correct once,
on the day it was written.

## The real cost of a stale manual check

Imagine this warehouse refreshes every night at 2 AM, unattended. On
night 40, a source-system change quietly introduces a batch of orders
with a `TerritoryID` that doesn't resolve to any row in
`dw.DimTerritory` — maybe a new territory was added upstream and
hasn't been added to the dimension yet. Nobody is awake at 2 AM to
re-run Lesson 6's `COUNT(*)` check by hand. By the time Executives,
the Board, and Finance all open their respective tools the next
morning, all three are quietly under-reporting the same missing
orders — and nobody notices, because nobody re-checked.

That's the real cost: not that a mistake happens, but that it happens
**silently**, to all three deliverables at once, with no human in the
loop to catch it before the business sees it.

## Four categories this layer has to catch

| Category | What it means here | Real pandas technique |
|---|---|---|
| Row-count parity | The warehouse has a different number of rows than the source | `len(df)` comparisons between source and warehouse extracts |
| Unexpected nulls | A column that should always have a value doesn't, for some rows | `.isna().sum()` |
| Duplicate rows | The same source row got loaded into the warehouse more than once | `.duplicated()` |
| Orphaned keys | A fact row's foreign key doesn't actually exist in its dimension | Set difference between the fact's key column and the dimension's key column |

Every one of these is a real, specific failure mode — not a vague
"something might be wrong" check. Chapter 2's lessons already showed
you *why* each of these can happen: an `INNER JOIN` that drops rows
(parity), a source column that's legitimately nullable (nulls), a
re-run load that doesn't clear old data first (duplicates), or a late
schema change that outpaces the dimension it depends on (orphans).

## Why this has to be Python, against the warehouse directly

Power BI, Tableau, and Excel are all **read-only consumers** of this
warehouse, by design (Lesson 2). None of them is the right place to
validate the warehouse itself — a validation check that only runs
inside one front-end would never catch a problem before the *other*
two front-ends also displayed it. The validation has to sit between
the warehouse and all three consumers, running against the warehouse
directly, independent of any one tool. That's exactly the role
pandas plays here: a script that connects straight to SQL Server,
reads the same tables every front-end will read, and checks them
*before* any front-end gets a chance to.

## Key terms

| Term | Meaning |
|---|---|
| Silent data-quality failure | A data problem that produces no error, only a quietly wrong number, until someone manually notices |
| Orphaned key | A foreign key value on a fact row that doesn't exist in its dimension table |
| Read-only consumer | A front-end tool that only ever queries the warehouse, never validates or writes back into it |

## Lab

1. Write, in your own words, what would actually happen to the
   Executive Power BI dashboard, the Board's Tableau deck, and
   Finance's Excel workbook on the morning after the night-40 scenario
   above, if nothing caught it.
2. Match each of the four data-quality categories above to the
   specific Chapter 2 lesson where you saw exactly that failure mode
   happen (or get prevented) for the first time.
3. Write one sentence explaining why this validation script can't
   simply live inside the Power BI data model.

## Check yourself

You're ready for Lesson 9 when you can name all four data-quality
categories from memory, explain why a nightly-refreshing warehouse
needs an automated check instead of a manual one, and explain why that
check has to run independently of all three front-end tools.
