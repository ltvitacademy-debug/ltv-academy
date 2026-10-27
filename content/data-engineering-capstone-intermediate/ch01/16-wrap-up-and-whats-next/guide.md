# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 16 of 16**

## What you'll learn

- The full 16-lesson arc of this capstone, in order, and why each step existed
- How a real production bug fit into — and tested — everything built before it
- Why `reproduce → isolate → confirm → fix → re-validate` is a repeatable habit, not a one-time trick
- Where this capstone leads next in the Data Engineering learning path

## The arc, start to finish

This course started with two stakeholders asking for two different things, and ended with a real
production incident diagnosed and fixed. Here's the whole shape of it, in order:

1. **The ask grows** — the retail chain's Store Ops team and Regional Manager each needed numbers
   the original pipeline didn't cleanly support.
2. **Planning the incremental design** — a deliberate design pass before writing a line of new
   pipeline code, because a full-reload pipeline couldn't support what either stakeholder needed.
3. **Why a full reload no longer works** — the concrete cost and correctness reasons a
   truncate-and-reload Bronze step had to go.
4. **Building the incremental Bronze ingestion** — `bronze.sales_raw` switched to picking up only
   new source files.
5. **Using `MERGE INTO` for the Silver layer** — the real Delta Lake upsert pattern, matched
   correctly on `transaction_id`, that this whole arc comes back to.
6. **Handling late-arriving data** — making the incremental design actually correct when source
   files show up out of order.
7. **Building the category breakdown table** — `gold.category_breakdown`, for the Regional
   Manager.
8. **Building the daily summary table** — `gold.daily_sales_summary`, for Store Ops.
9. **Validating both Gold tables** — the reconciliation query that compares them against each
   other, built once and reused for the rest of the course.
10. **Connecting Power BI to both tables** — making both Gold tables actually consumable by the
    people who asked for them.
11. **Building the Store Ops page** — the first stakeholder's real report.
12. **Building the Regional Manager page** — the second stakeholder's real report.
13. **The numbers don't match** — a real reconciliation failure reported, reproduced, and narrowed
    to a specific date.
14. **Finding the real cause** — `DESCRIBE HISTORY`, the actual broken `MERGE` statement, and a
    controlled query proving `store_id + sale_date` was never a safe match key.
15. **Fixing and validating** — the real fix, the backfill, and Lesson 9's query re-run clean.
16. **This lesson** — closing the loop.

## What the bug actually tested

Lessons 13 through 15 weren't a detour from the rest of the course — they were the moment
everything built in Lessons 1 through 12 got used for real. The incremental Bronze design from
Lesson 4, the correct `MERGE INTO` pattern from Lesson 5, both Gold tables from Lessons 7 and 8,
and the reconciliation query from Lesson 9 — every one of those pieces is what made it possible to
reproduce the Regional Manager's report, narrow it to March 1st, confirm the exact broken `ON`
clause, fix it, and prove the fix with a clean re-run. A pipeline that's only ever tested while
nothing is broken hasn't really been tested.

## The habit that outlasts this specific bug

`store_id + sale_date` instead of `transaction_id` was this course's specific bug. The method that
found it will outlive it:

- **Reproduce** the reported problem with a known tool, against real data, before touching
  anything.
- **Isolate** one variable at a time — here, the date range — to see exactly where a symptom
  starts and stops.
- **Confirm** the actual cause with a controlled query that returns real evidence, not a guess that
  merely looks plausible.
- **Fix** the smallest thing that's actually wrong, not everything around it.
- **Re-validate** with the same diagnostic tool that caught the problem, so "fixed" means proven,
  not assumed.

That sequence applies to the next MERGE bug, the next mismatched report, and the next pipeline you
didn't build yourself and have to debug under pressure.

## Where this goes next

This course was the **Intermediate Project** — one pipeline, one incremental redesign, one real bug,
worked all the way through. The next, bigger step in this path is the **Data Engineering Career &
Capstone** course: a full 81-lesson, 4-chapter program that takes everything from incremental
pipelines and MERGE-based upserts through career-readiness work and a complete capstone project of
its own. If this course's single pipeline and single bug felt like real work, that course is the
next, larger version of exactly that.

## Key terms

| Term | Meaning |
|---|---|
| Incremental pipeline | A pipeline that only processes new or changed data, instead of fully reprocessing everything each run |
| Reconciliation | Confirming that two independently-derived numbers that should agree, actually do |
| Reproduce / isolate / confirm / fix / re-validate | The repeatable five-step method this course's diagnostic arc followed |

## Lab

Write a one-paragraph incident summary for this course's bug, as if filing it for a real team: what
broke, when it started, the root cause, the fix, and how it was proven fixed. Keep it under 150
words — that's the length a real postmortem needs to be useful.

## Check yourself

Without looking back: name the five-step diagnostic method this course's final arc followed, in
order, and name the specific next course in this path that builds on everything covered here.
