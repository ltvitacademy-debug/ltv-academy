# Lesson 22 — Validating Against Power BI and Tableau: The Numbers Don't Match

**Chapter 6 · The Finance Reconciliation Workbook · Lesson 22 of 26**

## What you'll learn

- How to actually run the cross-tool check this capstone's whole
  architecture has been building toward since Lesson 1
- What it looks like, concretely, when three independently-built
  deliverables disagree
- Why a small discrepancy is worse, not better, than a large one for
  diagnosing it
- Why this moment — not Chapter 7 — is where the real investigation
  has to start

## The check

Three numbers now exist for the same real-world quantity — Q3's total
sales — each built by a completely independent path:

| Deliverable | How it's computed | Built in |
|---|---|---|
| Power BI | `[Total Sales (All Territories)]`, DAX `CALCULATE` + `ALL` | Lesson 12 |
| Tableau | `{ FIXED : SUM([Line Total]) }` | Lesson 17 |
| Excel | `SUMIFS` with two date-bound criteria | Lesson 21 |

Open all three side by side — the Power BI dashboard, the published
Tableau workbook, and this Excel file — and compare the quarter total
each one shows.

## What actually happens

Power BI's and Tableau's totals match each other exactly. That's not
a surprise: both query the same `dw.FactProductSales` rows, through
different tools but the same underlying filter logic (a half-open
date range, which Lesson 23 explains properly). Finance's `SUMIFS`
total comes back **slightly higher** than both of them — not by an
order of magnitude, not an obviously broken number, just a real,
specific gap.

## Why a small gap is the hard case, not the easy one

A number that's off by 10x, or negative when it should be positive,
practically announces itself as broken. A gap of a few thousand
dollars on a total in the hundreds of thousands or millions doesn't
announce anything — it's exactly the kind of discrepancy that's easy
to shrug off as "rounding" or "a timing difference" and move on from
without actually resolving it. That instinct is the wrong one here.
Finance's whole reason for existing in this QBR package is to catch
exactly this kind of quiet, small, real error before it reaches the
board or the executives — waving it away would defeat the entire
purpose of building an independent third check in the first place.

## What's actually known at this point

Before Chapter 7 goes looking for a root cause, it's worth being
precise about what Lesson 22 alone has actually established:

- The gap is **real and repeatable** — rerunning all three totals
  produces the same mismatch every time, which rules out a one-off
  fluke or a refresh timing accident.
- The gap is **small relative to the total** — consistent with a
  boundary issue affecting a handful of order lines, not a
  wholesale logic error affecting the whole quarter.
- The gap exists **only in Finance's number** — Power BI and Tableau
  agree with each other, which narrows the search to Excel's formula
  specifically, not the warehouse underneath all three.

That third point is the most important one, and it's worth sitting
with before moving on: if the warehouse itself were wrong, Power BI
and Tableau would disagree with each other too, since they query it
independently. The fact that they match each other while Excel
diverges is itself diagnostic information — it points the Chapter 7
investigation at the one deliverable built on a fundamentally
different mechanism (a `SUMIFS` date-range formula) rather than at the
warehouse all three ultimately share.

## Key terms

| Term | Meaning |
|---|---|
| Cross-tool validation | Comparing the same real-world quantity as computed independently by multiple tools, to catch an error any single tool's output wouldn't reveal alone |
| Repeatable discrepancy | A mismatch that recurs identically on every rerun, ruling out a one-off glitch |

## Lab

1. Record the exact quarter total shown by Power BI, Tableau, and
   your Excel workbook, side by side.
2. Confirm Power BI's and Tableau's totals match each other exactly.
3. Write down, in one sentence, why the fact that Power BI and
   Tableau agree with each other — while Excel doesn't — already
   narrows down where the problem has to be, before you've looked at
   a single formula yet.

## Check yourself

You're ready for Lesson 23 when you can explain why Power BI and
Tableau agreeing with each other points the investigation at Excel's
formula rather than the warehouse, and why a small, repeatable gap is
actually harder to responsibly ignore than a large, obvious one.
