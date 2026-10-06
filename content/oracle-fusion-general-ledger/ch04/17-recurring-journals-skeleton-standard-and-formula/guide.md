# Lesson 17 — Recurring Journals: Skeleton, Standard and Formula

**Chapter 4 · Automating Journals · Lesson 17 of 37**

## What you'll learn

- Why recurring journals exist, and what they save you from repeating
- The three recurring journal types and exactly how each one differs
- What inputs a formula entry can actually use
- Which type fits which real-world situation

## The problem: the same journal, month after month

Some journals repeat with almost no variation — a monthly rent allocation, a straight-line depreciation entry that isn't handled through Fixed Assets, a fixed intercompany service charge. Re-typing the same accounts (and sometimes the same amounts) every period is pure repetition. A **recurring journal** is defined once and then **generated** each period it applies to (Lesson 18 covers that generation step).

## Three types, three different jobs

| Type | Accounts | Amounts | Typical use |
|---|---|---|---|
| **Skeleton** | Same every period | Different every period — entered manually after generating | A monthly entry whose structure never changes but whose dollar amount does |
| **Standard** | Same every period | Same every period | A fixed monthly charge, like a flat intercompany service fee |
| **Formula** | Same every period | Calculated from a formula | An amount that varies in a way that's actually derivable from other balances |

**Skeleton** entries are the lightest-touch option: generate the journal, and the accounts are already filled in — you just type in this period's amount on each line before completing it. **Standard** entries need nothing typed in at all; the same amount posts every time. **Formula** entries are the most powerful: they calculate the amount from fixed values and/or account balances, so no one manually types anything, yet the amount can still change period to period.

## What a formula can actually reference

A formula journal entry can combine:

- **Fixed amounts** — constants built into the formula
- **Account balances** — standard, end-of-day, or average balances
- **Actual or budget amounts**
- **Statistics** — non-monetary units tracked alongside dollar balances (headcount, square footage)
- **Period-to-date or year-to-date balances**, from the current period, the prior period, or the same period last year

```
Formula example — Solara Fixtures allocating IT cost by headcount:
  IT cost allocation to Sales = (Sales headcount statistic / Total company headcount statistic)
                                  × Total IT department actual expense (current period)
```

This is a fictional illustration, but it shows the key idea: a formula entry can pull a statistic (headcount) and an actual balance (IT expense) from the ledger itself, rather than anyone calculating and typing a number.

## Choosing the right type

Use Standard when the amount truly never changes. Use Skeleton when the accounts are fixed but you want (or need) a human to confirm this period's amount before it posts. Use Formula when the amount is derivable from data already in the ledger — it removes manual calculation and the errors that come with it.

## Key terms

| Term | Meaning |
|---|---|
| Skeleton journal | Fixed accounts, manually entered amount each period |
| Standard journal | Fixed accounts and fixed amount every period |
| Formula journal | Fixed accounts, amount calculated from balances and/or constants |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why would a company choose a Formula recurring journal over a Skeleton one for the same conceptual entry?
