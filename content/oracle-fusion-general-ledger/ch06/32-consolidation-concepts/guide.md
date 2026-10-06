# Consolidation Concepts

**Chapter 6 · Multi-Currency and Multi-Entity · Lesson 32 of 37**

## What you'll learn

- The two main consolidation methods in Oracle Fusion General Ledger
- How a consolidation uses translation and intercompany balances together
- What an elimination entry does, and the three basic types
- Why "consolidated" numbers are not simply the sum of each entity's numbers

## Bringing every lesson in this chapter together

Chapter 6 built toward this lesson one piece at a time. Foreign currency journals (28) got non-functional amounts into a ledger. Revaluation (29) kept open foreign-currency balances current. Translation (30) restated an entire subsidiary ledger into the parent's reporting currency. Intercompany transactions (31) kept each entity's own books balanced when a transaction crossed entities. **Consolidation** is where all four come together to produce one set of financial statements for the group as a whole.

## Two consolidation methods

Oracle Fusion supports two primary approaches, chosen based on how similar the entities being combined are structurally:

- **Reporting-only consolidation** — used when the subsidiary and the corporate ledger already share the same chart of accounts and calendar. Because the structures already line up, this is largely a matter of combining balances directly, with far less mapping work.
- **Balance transfer consolidation** — used when entities have *different* charts of accounts and/or calendars, which is the far more common real-world case. This method maps the subsidiary's chart of accounts to the corporate chart of accounts, imports the mapped balances into the corporate consolidation ledger (via journal import and summary journals), and posts them there.

## Why LTV Manufacturing Corporation needs balance transfer

LTV Manufacturing UK Ltd almost certainly doesn't use the exact same chart of accounts as the US parent — different statutory reporting requirements alone would make that unlikely. So the consolidation path is: translate UK Ltd's GBP balances into USD (lesson 30), map its UK chart of accounts structure to the corporate chart of accounts, and transfer the mapped, translated balances into the corporate consolidation ledger.

## Eliminations: removing what shouldn't be double-counted

Once every entity's balances sit in the consolidation ledger, they cannot simply be added together as-is. **Elimination entries** remove the effects of transactions between entities within the group, because those transactions represent the group doing business with itself, not with the outside world. There are three basic types:

1. **Elimination of intercompany stock ownership** — removing the parent's investment in the subsidiary against the subsidiary's equity, so the group's equity isn't counted twice
2. **Elimination of intercompany debt** — removing the intercompany receivable/payable pairs from lesson 31, since from the group's perspective, the company doesn't owe itself money
3. **Elimination of intercompany revenue and expense** — removing a sale from one group entity to another, since the group hasn't actually sold anything to an outside party yet

For LTV Manufacturing Corporation, the $4,000 IT allocation from lesson 31 is real from each entity's own perspective, but from the *group's* perspective it is money moving from one pocket to another — it must be eliminated so consolidated expense isn't overstated.

## The result: one coherent set of statements

After translation, balance transfer, and eliminations, the corporate consolidation ledger produces financial statements representing the group as a genuinely unified entity — not a simple sum of each subsidiary's reports, but each one's real contribution, net of internal transactions that would otherwise double-count. This is the conceptual foundation; building and running a full consolidation is covered in more depth where it belongs in this path's Reporting & Data stage.

## Key terms

| Term | Meaning |
|---|---|
| Reporting-only consolidation | Combining balances directly when chart of accounts and calendar already match |
| Balance transfer consolidation | Mapping and transferring balances when structures differ |
| Elimination entry | A journal removing the effect of an intra-group transaction from consolidated results |

## Recap

Consolidation brings translation, balance transfer, and elimination entries together to produce one coherent set of financial statements for a group, specifically removing intercompany stock, debt, and revenue/expense so nothing is double-counted. This closes Chapter 6. Chapter 7 shifts to Period Close, starting with lesson 33: the Period-End Close Checklist.
