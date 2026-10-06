# Segment Labels: Balancing, Cost Center and Natural Account

A segment named "Company" is just a name until you tell Oracle Fusion what that segment actually *means* to the accounting engine. That meaning comes from a **segment label** (also called a segment qualifier) — and this lesson covers the labels that matter most: balancing, cost center, natural account, and intercompany.

## What you'll learn

- Why a segment label is different from a segment's name
- What the balancing segment label does, and why primary balancing is mandatory
- What the cost center and natural account labels enable
- What makes the intercompany label special, and its one hard restriction

## Labels vs. names

You can name a segment anything you want — "Company," "Division," "Entity" — but the **label** assigned to that segment is what actually tells Oracle Fusion's accounting engine how to treat it. Two companies might both have a segment literally named "Company," but if only one of them assigns it the balancing segment label, only that one gets balancing behavior out of it. The label, not the name, drives behavior.

## The balancing segment label

The **balancing** label ensures that journals balance (debits equal credits) for each distinct value, or combination of values, of the segments carrying this label — critical for producing a trial balance and financial statements per entity. There are three balancing labels available: **primary**, **second**, and **third** balancing segment. The primary balancing segment label is **mandatory** — every chart of accounts must have exactly one segment carrying it, and it is what gets mapped to legal entities (recall Lesson 9's balancing-segment-value assignment). Second and third balancing segments are optional, used when a company needs balance by more than one dimension at once — for example, by legal entity *and* by a separate internal "fund" concept.

## The cost center label

The **cost center** label marks a segment as representing a functional grouping of expenses — a department, team, or location that incurs cost. Cost center is optional at the chart-of-accounts level in general, but it becomes effectively required if the business uses Oracle Assets (for depreciation and asset additions) or Oracle Expenses (for storing approval limits), since both of those products expect a cost center segment to exist.

## The natural account label

The **natural account** label is mandatory and marks the segment that classifies a transaction into one of the five fundamental account types from Accounting Fundamentals: asset, liability, equity, revenue, or expense. This is the segment that answers "what kind of thing is this, accounting-wise" — independent of which company, department, or product is involved.

## The intercompany label

The **intercompany** label marks a segment used to track "due to" and "due from" balances between trading entities within the same enterprise. It has one hard restriction worth remembering: a segment carrying the intercompany label **cannot** also carry any of the three balancing labels, and its value set must mirror the primary balancing segment's values, since intercompany tracking is fundamentally about identifying *which other entity* a transaction is really with.

```
Segment Labels Summary:
  Balancing (primary) — mandatory, one per chart of accounts
  Balancing (second/third) — optional, for extra balance dimensions
  Cost Center — optional, required in practice for Assets/Expenses
  Natural Account — mandatory, the asset/liability/equity/revenue/expense classifier
  Intercompany — optional, cannot also be a balancing segment
```

## Recap

A segment label, not its name, determines its behavior: balancing enables per-entity trial balances, cost center groups expenses functionally, natural account classifies the fundamental account type, and intercompany tracks inter-entity balances with its own restriction against also being a balancing segment. Next up, lesson 22: value sets and values, the actual lists of values that live inside each labeled segment.
