# Account Hierarchies and Trees

A flat list of cost centers or accounts is enough to record transactions, but it is not enough to *report* them the way a business actually thinks about itself — "all of Manufacturing," "all of North America," "all operating expenses." That rollup capability comes from **trees**, the hierarchy structure this lesson covers.

## What you'll learn

- What a tree is, and how it relates to a value set
- Parent (summary) values vs. child (detail) values, revisited in the hierarchy context
- What a tree version is, and why trees can have more than one
- How trees get used beyond just reporting

## What a tree is

A **tree** is a hierarchical structure built from the values in a value set, organizing those values into parent-child relationships for rollup purposes. Oracle Fusion lets you build a tree from any independent value set whose data type is character — so a Cost Center value set, for example, can have a tree that groups individual cost centers under regional or divisional parents, which themselves roll up to an enterprise-wide total.

```
Example Cost Center Tree:
  Total Company (summary)
    ├─ Manufacturing (summary)
    │    ├─ 410 - Assembly (detail)
    │    └─ 420 - Fabrication (detail)
    └─ Corporate (summary)
         ├─ 510 - Finance (detail)
         └─ 520 - HR (detail)
```

## Parent and child values, in the hierarchy

Recall from Lesson 22 that a value can be marked **Summary**. In a tree, a summary value becomes a **parent node**, and the detail values beneath it become its **children**. Transactions post only to detail (child) values with posting allowed; the parent values exist purely so a report can say "show me all of Manufacturing" and have Oracle Fusion automatically total every child beneath that node, without anyone having to list them out by hand.

## Tree versions

A single tree can have multiple **tree versions**, each with its own effective date range. This matters because organizational hierarchies change — a cost center moves from one division to another, a new region gets created — and a tree version lets you capture *when* a given hierarchy shape was true, rather than forcing one permanent structure or forcing you to destroy history every time the org chart changes. Reports and allocations can be run against a specific tree version, which is what lets a company look at last year's numbers through last year's hierarchy, and this year's numbers through this year's.

## Why hierarchies matter beyond reporting

Account hierarchies aren't purely a reporting convenience. They also reduce maintenance in two other places this course has already covered: **cross-validation rules** (Lesson 24) can reference a hierarchy instead of listing every individual value, so a rule written against "all of Manufacturing" automatically covers a new cost center added under that parent later; and allocation rules in later Financials courses frequently target a parent node, letting new children added underneath inherit allocation behavior automatically.

## Recap

A tree organizes a value set's values into parent-child hierarchies for rollup reporting, with tree versions capturing how that hierarchy shape changes over time, and with hierarchies reducing maintenance elsewhere, including cross-validation rules. Next up, lesson 24: cross-validation rules, the mechanism that actually prevents invalid account combinations from ever being created.
