# Account Inspector

**Chapter 5 · Balances, Inquiries and Monitoring · Lesson 24 of 37**

## What you'll learn

- What Account Inspector is for, and how it connects to Account Monitor
- How multidimensional, pivot-style analysis differs from a flat balance lookup
- How to slice a balance by multiple chart of accounts segments at once
- Where Account Inspector hands off to journal-line and subledger drill-down

## The tool you open after a flag

Lesson 23 ended with Account Monitor flagging an account — Travel & Entertainment running over tolerance. Flagging is not explaining. The next question is always "why," and **Account Inspector** is the tool built to answer it. It is fully integrated with Account Monitor: from a flagged line, a user opens Account Inspector directly, carrying the same account context forward instead of starting a fresh inquiry from scratch.

## Multidimensional analysis, not a single number

Where Inquire on Detail Balances (lesson 22) returns one balance for one account combination, Account Inspector behaves like an **online, multidimensional pivot table**. A user can take a flagged total and immediately slice it — by cost center, by department, by project, by any chart of accounts segment that's part of the ledger's structure — to see which slice of the total is actually driving the overage.

For the Travel & Entertainment flag at **LTV Manufacturing Corporation**, a flat balance says "$16,940 PTD, over tolerance." Account Inspector lets a user pivot that same $16,940 by cost center and immediately see that $11,200 of it sits in the Sales cost center alone — a single department, not an even overrun across the company. That reframes the investigation: the question changes from "why is T&E high" to "what happened in Sales in March."

## Charts and drill, from the same data

Account Inspector doesn't just present numbers in a grid. A user can review the same data as a **chart**, and drill in either direction — from any parent value down to the next level, or from any child-level balance straight through to the detail balances, journal lines, and subledger transactions behind it. That means Account Inspector is not a separate silo from the drill-down path covered later in lesson 27 — it's one of the entry points into it, just reached by pivoting first rather than drilling immediately.

## When to reach for which tool

- **Inquire on Detail Balances** — "I know exactly which account I want, give me the number."
- **Account Monitor** — "Tell me automatically when any of these accounts cross a line."
- **Account Inspector** — "Something's flagged or looks off, let me slice it to find where it's really coming from."

Each tool is best for ad hoc balance queries and multidimensional analysis in its own way, but they build on the same underlying balance data — nothing here requires re-entering or re-extracting figures; it's the same numbers, viewed differently depending on the question being asked.

## Key terms

| Term | Meaning |
|---|---|
| Account Inspector | An online multidimensional analysis tool for pivoting and charting balance data |
| Pivot | Reorganizing a balance by a different chart of accounts segment to see what's driving it |
| Drill (parent/child) | Moving between hierarchy levels, or from a balance down into its journal lines |

## Recap

Account Inspector takes a flagged or suspicious balance and lets you pivot it across chart of accounts segments, chart it, and drill in either direction — turning "this number is off" into "this is specifically where it's coming from." Next up, lesson 25: Trial Balance Reports, the formal, point-in-time report that pulls these same balances together for review and for the books.
