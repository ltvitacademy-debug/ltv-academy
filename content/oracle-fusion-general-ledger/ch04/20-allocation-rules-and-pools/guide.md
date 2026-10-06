# Lesson 20 — Allocation Rules and Pools

**Chapter 4 · Automating Journals · Lesson 20 of 37**

## What you'll learn

- The building blocks every allocation rule is made of: point of view, source, basis, target, offset
- What "point of view" actually fixes, and why it simplifies the rest of the rule
- How source, basis, target, and offset map onto Lesson 19's pool example
- Where allocation rules are built, and how they relate to recurring journals

## Allocation Manager: built on the same platform as Fusion's analytics

Oracle Fusion's **Allocation Manager** is the tool behind the allocation rules introduced in Lesson 19. It replaces the older Mass Allocations approach from Oracle E-Business Suite, and runs on the same multidimensional engine (Essbase) that powers Fusion's balances cube from Lesson 2 — which is part of why allocation rules can reference account balances, periods, and hierarchies so flexibly.

## Five building blocks of a rule

| Element | What it defines |
|---|---|
| **Point of View (POV)** | Dimension values held fixed for the whole rule (for example, always Ledger = Solara Fixtures US, Balance Type = Actual), so you don't have to re-specify them on every other element |
| **Source** | Where the pool balance actually lives — the account(s) being allocated from |
| **Basis** | The usage driver that determines each target's share (Lesson 19's "usage factor") |
| **Target** | The account(s) the allocated amount moves *to* |
| **Offset** | The account that relieves the source — usually the credit side when allocating an expense pool |

## Mapping this onto the facilities example

Recall Lesson 19's facilities allocation. In Allocation Manager terms:

```
Point of View:  Ledger = Solara Fixtures US, Period = current, Balance Type = Actual
Source:         Facilities Pool account, $60,000 balance
Basis:          Headcount statistic, by cost center
Target:         Cost Center 100 / 200 / 300, Facilities Allocated Expense account
Offset:         Facilities Pool account (credited to relieve the pool)
```

The **basis** is doing the work Lesson 19 called the usage factor — it's what turns one pool into three proportional target amounts instead of an even three-way split.

## How this connects back to recurring journals

An allocation rule, once built, still has to actually **run** for a period — conceptually the same generate-then-post flow Lesson 18 covered for recurring journals, producing a journal batch (source: Allocation, category: Allocation, as Lesson 7 anticipated) that goes through the same validation, approval, and posting steps as everything else in this course. The rule is reusable infrastructure; running it for March is still a deliberate, period-specific action.

## Key terms

| Term | Meaning |
|---|---|
| Point of View (POV) | Dimension values fixed for the entire rule |
| Source | The account(s) holding the pool to be allocated |
| Basis | The usage driver determining each target's proportional share |
| Target | The account(s) receiving the allocated amount |
| Offset | The account that relieves the source, usually the credit side |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: in the facilities example, which element is the "basis," and what would change about the allocation if the basis were square footage instead of headcount?
