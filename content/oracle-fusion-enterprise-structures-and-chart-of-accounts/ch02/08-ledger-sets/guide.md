# Ledger Sets

Imagine a company with five primary ledgers that all happen to share the same chart of accounts and the same calendar — maybe five subsidiaries on a common accounting policy, each just needing its own currency or legal entity grouping. Opening and closing periods, and running reports, one ledger at a time, five separate times, every month, is exactly the kind of repetitive busywork Oracle Fusion lets you collapse into one action. That is what a ledger set is for.

## What you'll learn

- What a ledger set is and the one hard requirement for building one
- What tasks a ledger set actually simplifies
- The difference between a ledger set and a secondary ledger
- Why ledger sets are a reporting and management convenience, not a new accounting entity

## The one hard requirement

A ledger set can group any combination of ledger types — primary ledgers, secondary ledgers, and reporting currencies — but every member must share the **same chart of accounts and the same calendar (or period type) combination**. This is not a soft recommendation; it is the rule. If two ledgers use different charts of accounts, Oracle Fusion will not let you add them to the same ledger set, because there would be no coherent way to open a period or run a combined report across structurally different account classifications.

```
Ledger Set membership requires:
  - Identical chart of accounts across every member ledger
  - Identical calendar / period type across every member ledger
  - Members may be primary ledgers, secondary ledgers, or reporting currencies
```

## What a ledger set actually simplifies

Ledger sets exist to make two categories of work faster:

- **Period management.** Instead of opening or closing an accounting period in five separate ledgers, you open or close the period once for the entire ledger set.
- **Reporting.** Many Oracle Fusion reports accept a ledger set as a parameter, letting you produce one combined report across every ledger in the set instead of running the same report five times and stitching results together manually.

## Not a new accounting entity

It is easy to mistake a ledger set for "one big combined ledger," but that is not what it is. A ledger set is a **management and reporting convenience** layered on top of ledgers that already exist independently. Each ledger inside the set keeps its own currency, its own legal entity assignments, and its own balances. The set does not merge their data into a single accounting entity — it just lets you act on all of them, or report across all of them, with one command instead of several.

## How this differs from a secondary ledger

A secondary ledger, from the previous lesson, creates an *alternative accounting representation* tied to one specific primary ledger — it can have a different chart of accounts, calendar, or currency. A ledger set does the opposite: it groups ledgers that are already *structurally identical* in chart of accounts and calendar, purely to save repetitive clicks. One adds a new accounting view; the other saves time managing views that already exist.

## Recap

A ledger set groups ledgers that share an identical chart of accounts and calendar, to simplify period opening/closing and reporting — without merging their underlying balances into one entity. Next up, lesson 9: a walkthrough of the Accounting Configuration Manager, the tool that ties legal entities, ledgers, and chart of accounts together in one guided flow.
