# Lesson 18 — Generating Recurring Journals

**Chapter 4 · Automating Journals · Lesson 18 of 37**

## What you'll learn

- The difference between defining a recurring journal and generating it
- What happens, type by type, when you run Generate
- Why a generated batch still needs the same review, validation, and posting as any other
- How to handle a period where the recurring entry shouldn't run at all

## Defining is not generating

Lesson 17 covered **defining** a recurring journal entry — its accounts, and depending on type, its amount or formula. That definition sits dormant until someone (or a schedule) runs **Generate Recurring Journals** for a specific period. Generation is the step that actually turns the standing definition into a real, editable journal batch for that period.

```
Definition (created once):
  Recurring Journal "Monthly IT Allocation" — Formula type, accounts fixed

Generate Recurring Journals, Period = March:
  → Creates a new journal batch, source = "Recurring," dated in March
  → Formula evaluates against March's actual balances and statistics
  → Batch appears in Manage Journals, status Unposted (or Incomplete if it needs review)
```

## What happens per type when you generate

- **Standard** — the batch generates fully populated, amount and all, ready to complete and post with no further input.
- **Skeleton** — the batch generates with accounts in place but amount fields blank (or carried from last time, depending on configuration); someone edits in this period's real amount before completing it.
- **Formula** — the batch generates with the amount already calculated from whatever balances and statistics the formula references for that period; like Standard, it's ready to complete, but unlike Standard, the number itself can differ from last time.

## It's still a journal — all the earlier chapters still apply

A generated batch is not special or exempt from anything covered in Chapters 2 and 3: it still has to **validate** (balanced, valid accounts, open period), it still routes through **approval** if a rule matches its source and category, and it still has to be **posted** — manually or through an AutoPost criteria set scoped to the Recurring source. Nothing about automation at the definition stage removes the controls further downstream.

## Skipping a period

Sometimes a recurring entry genuinely shouldn't run for one particular period — a quarterly true-up that doesn't apply mid-quarter, or a charge that's been temporarily suspended. Rather than generating the batch and deleting it, the recurring journal definition itself can be given an **end date**, or simply not generated for that period — leaving no batch, and no cleanup, behind.

## Key terms

| Term | Meaning |
|---|---|
| Define | Set up the recurring journal's accounts and amount/formula logic, once |
| Generate | Create an actual journal batch from the definition, for a specific period |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: after generating a Formula recurring journal for March, does it still need to pass validation before it can post?
