# Lesson 19 — Allocations and Mass Allocations

**Chapter 4 · Automating Journals · Lesson 19 of 37**

## What you'll learn

- What an allocation is solving that a Formula recurring journal doesn't
- The core allocation formula: pool, usage factor, total usage
- Why "mass" allocation means one definition, many resulting journal lines
- How allocations fit alongside what you already know from Lessons 17-18

## One source, many destinations

Lesson 17's formula recurring journal calculated one amount for one pair of accounts. **Allocations** solve a related but different problem: distributing **one pool of cost or revenue across many targets at once**, in a single definition, based on how much of a shared resource each target actually used.

The classic allocation formula is:

```
Allocation amount (per target) = Cost Pool × (Target's Usage Factor ÷ Total Usage)
```

## A worked example

Suppose Solara Fixtures' facilities department incurs $60,000 in shared building costs in March, and wants to allocate that pool across three cost centers based on headcount:

```
Cost Pool: $60,000 (Facilities, March)
Cost Center 100 (Manufacturing): 80 employees
Cost Center 200 (Sales):         30 employees
Cost Center 300 (Admin):         10 employees
Total headcount (usage): 120

Allocation to Manufacturing = 60,000 × (80 / 120) = 40,000
Allocation to Sales         = 60,000 × (30 / 120) = 15,000
Allocation to Admin         = 60,000 × (10 / 120) =  5,000
```

One allocation definition, run once, generates a journal with a credit line relieving the facilities pool and three debit lines spreading the cost by headcount — rather than someone manually calculating three ratios and typing three journal lines every month.

## Why "mass" allocation

The term **mass allocation** emphasizes that a single rule definition can spread a pool across an entire range of targets — not just three cost centers, but potentially dozens, using a parent/child hierarchy or a range of segment values, so adding a new cost center to the business doesn't require rewriting the allocation rule, only adding it to the range the rule already sweeps across.

## How this differs from what you already know

| | Formula recurring journal (Lesson 17) | Allocation |
|---|---|---|
| Destinations | One journal entry's fixed set of lines | Many targets from one rule, potentially a whole range |
| Typical use | One calculated amount for one relationship | Spreading a shared pool proportionally across many cost centers |

Both remove manual calculation, but allocations are built specifically for the "one pool, many recipients, proportional to usage" shape of problem.

## Key terms

| Term | Meaning |
|---|---|
| Cost pool | The source amount being distributed |
| Usage factor | The driver (headcount, square footage, revenue, etc.) determining each target's share |
| Mass allocation | One rule definition that spreads a pool across a whole range of targets |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: in the facilities cost example, why does Manufacturing receive exactly $40,000 and not some other amount?
