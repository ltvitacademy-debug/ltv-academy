# Lesson 37 — Performance Considerations

**Chapter 8 · Deployment & Administration · Lesson 37 of 40**

## What you'll learn

- The two-part diagnostic question: is it every report, or one report?
- Why dataset query efficiency is almost always the first place to look
- How the caching strategy from Lesson 36 fits into a performance plan,
  not apart from it
- Why overly complex expressions quietly cost more than people expect

## Start with the diagnostic question

Before changing anything, ask: **is every report slow, or just this one?**
The answer points to a completely different fix.

If **every report** is slow, the problem is almost never any single
report's design — it's infrastructure. Report processing and rendering
are memory-intensive, so under-provisioned hardware shows up everywhere
at once. Hosting the report server and its database on separate machines
tends to outperform cramming both onto one box. And if the whole server
is straining under load, that's the scale-out deployment scenario from
Lesson 34 — multiple report server instances sharing one database, with
load balanced across them.

If it's **one specific report**, the fix lives in that report, and
dataset query efficiency is where to look first.

## Dataset query efficiency, first

A report can only render as fast as its slowest dataset query. Before
reaching for caching or a snapshot, tune the query itself:

- **Filter at the source.** Push filtering into the query's `WHERE`
  clause instead of pulling everything and filtering inside the report
  — every unnecessary row is memory and rendering time you're paying for
  twice.
- **Presort with `ORDER BY`.** Sorting on the data source, in the order
  the report actually needs, is cheaper than sorting after the fact
  inside the report.
- **Aggregate with `GROUP BY`** on the data source when the report only
  ever displays summarized values — don't pull every detail row just to
  average or sum it client-side.
- **Tie parameters to query parameters.** A report parameter linked to
  the dataset's query parameters (Lesson 16) reduces what's retrieved in
  the first place, rather than retrieving everything and filtering it
  client-side.

## Then layer in caching — deliberately, not automatically

Once the query itself is efficient, caching and snapshots (Lesson 36)
become a multiplier, not a substitute. A report with a genuinely slow
underlying query gains far more from a snapshot on a schedule than from
caching alone — caching still pays the full cost on the very first
request; a snapshot never makes a live user wait for it. Reserve caching
for reports that are both efficient to run *and* requested often enough
by enough different people that reuse actually matters, and shared
datasets can be cached independently of the reports that use them.

## Expression complexity has a cost too

Expressions evaluate at render time, once per relevant scope — a heavy
nested `IIF`, or an expression re-deriving the same value in five
different textboxes instead of computing it once in the dataset or a
calculated field, adds real rendering time on a large report,
particularly inside a table or matrix that repeats the expression once
per row. When an expression is doing real work rather than simple
formatting, ask whether it belongs in the query or a calculated field
instead — computed once at the data source, rather than re-evaluated
for every row the report renders.

## Measure before and after

Reporting Services logs how long each report actually took to process
in the report server's **execution log**. Don't guess — check the
execution log before making a change and after, so "this feels faster"
becomes an actual number.

## Key terms

| Term | Meaning |
|---|---|
| Scale-out deployment | The infrastructure-level fix when every report is slow, not just one |
| Query tuning | Filtering, sorting, and aggregating at the data source instead of inside the report |
| Shared dataset caching | Caching a dataset's results independently of any one report that uses it |
| Calculated field | A value computed once at the data source, instead of re-derived by a repeated expression |
| Execution log | Reporting Services' record of how long each report actually took to process |

## Lab

1. Pick a report you've built earlier in this course. Open its main
   dataset's query and check: is there a `WHERE` clause filtering at the
   source, or is filtering happening inside the report body instead?
2. Find one expression in that report that's repeated in more than one
   textbox. Decide whether it belongs in the query, a calculated field,
   or genuinely needs to stay as a report expression — and explain why.

## Check yourself

You're ready for the capstone when you can explain: why is "is it every
report, or just one" the right first question to ask about a slow
report, and why should query tuning come before reaching for caching or
a snapshot, not after?
