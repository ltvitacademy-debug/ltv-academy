# Lesson 45 — Reading Execution Plans for Performance Problems

**Chapter 8 · Query Performance Tuning · Lesson 45 of 95**

## What you'll learn

- How to turn on and capture a real graphical execution plan in SSMS
- What the thick and thin arrows between operators actually represent
- Why the percentages on each operator are relative costs, not absolute time
- How to read a real, multi-operator plan the way a DBA does under pressure

## Where this picks up from T-SQL Development

T-SQL Development's Lesson 90 introduced execution plans at the
scans-vs-seeks level, and Lessons 91–92 covered `SET STATISTICS
TIME/IO` output for a single query. That's a fine starting point for
one query you're actively writing. This lesson goes further: reading
a full graphical plan, under time pressure, when you didn't write the
query and don't know yet what's wrong with it. That's the DBA-level
version of the same skill.

## Turning on the actual execution plan

SSMS has two kinds of plan: **estimated** (what the optimizer expects
to happen, without running the query) and **actual** (what really
happened, including real row counts). For a performance problem, you
almost always want the actual plan, because estimated vs. actual row
counts diverging sharply is itself one of the most common causes of a
bad plan:

![The SSMS toolbar with the "Include Actual Execution Plan" button highlighted (Ctrl+M), shown above a query editor with a simple SELECT statement ready to run.](/courses/azure-dba/ch08/45-reading-execution-plans-for-performance-problems/actual-execution-plan-toolbar.png)

That single toolbar button — or `Ctrl+M` — is the switch. Turn it on,
run the query, and a new **Execution plan** tab appears next to
**Results** and **Messages** showing exactly what ran.

## Reading a real plan

Here's a real graphical plan for a multi-table join, the kind you'll
actually see in production, not a simplified textbook example:

![A real SSMS graphical execution plan for a multi-table join query, showing SELECT flowing left from several Hash Match joins, Compute Scalar operators, and Index Scan operators on EmailAddress, PhoneNumberType, PersonPhone, and CountryRegion, each operator labeled with a cost percentage and row counts.](/courses/azure-dba/ch08/45-reading-execution-plans-for-performance-problems/actual-execution-plan.png)

Plans read **right to left, top to bottom** — data flows from the
scan operators on the right toward the `SELECT` on the far left. Three
things to check, in order of how much time they save you:

- **Cost percentage.** Every operator shows "Cost: N%" relative to
  the whole query (always sums to 100% for the batch). The operator
  with the highest percentage is where the optimizer thinks the time
  is going — in this plan, the top `Hash Match (Right Outer Join)` at
  18% is the most expensive single operator, well ahead of any of the
  index scans feeding it.
- **Arrow thickness.** The line between two operators is drawn
  thicker the more rows flow through it. A thick arrow feeding into a
  small operator is a red flag — it means a huge number of rows got
  read and then thrown away downstream, which is wasted I/O.
  Hover any arrow in SSMS and it shows the exact row count, like the
  "19972 of 19972 (100%)" under the `EmailAddress` index scan here.
  Estimated vs. actual row counts diverging sharply on the same
  arrow is one of the clearest signs of a stale statistics problem.
- **Operator icon and name.** `Index Scan` vs. `Clustered Index Scan`
  vs. `Hash Match` vs. `Compute Scalar` each mean something specific
  — Lesson 46 covers what each one is telling you about how the data
  was actually retrieved.

## Why this is the anchor of the whole chapter

Every other tool in this chapter — Query Store (Lessons 48–49),
missing-index DMVs (Lesson 47), blocking analysis (Lesson 50) —
eventually points you back to a plan like this one to confirm the fix
actually worked. Learning to read one accurately, fast, under
pressure, is the single highest-leverage skill in Chapter 8.

## Key terms

| Term | Meaning |
|---|---|
| Actual execution plan | The graphical plan captured from a query that actually ran, with real row counts (vs. estimated) |
| Cost % | Each operator's relative share of the total query cost, summing to 100% across the whole plan |
| Arrow thickness | Visual encoding of row count flowing between two operators — thicker means more rows |

## Check yourself

You're ready for Lesson 46 when you can explain, without looking: what
does a thick arrow feeding a small operator usually indicate, and why
do you want the *actual* plan rather than the *estimated* one when
troubleshooting a real performance problem?
