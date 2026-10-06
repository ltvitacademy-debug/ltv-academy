# Configuring Ledger, Legal Entity and Business Units

**Chapter 1 · Design and Configuration · Lesson 4 of 25**

Lesson 3 designed it. This lesson builds it — the hands-on configuration steps for LTV's two legal entities, two primary ledgers, and two business units in your own Oracle Fusion practice environment.

## What you'll learn

- The order configuration actually has to happen in: legal entity, then ledger, then business unit
- The exact values to enter for each of LTV's two stacks
- Why the ledger's calendar and chart of accounts are only assigned, not built, in this lesson
- A quick way to verify the structure is wired correctly before moving on

## The build order

Configuration order matters here, because each object references the one before it:

1. **Legal entity first.** A legal entity is a standalone setup object — it doesn't yet reference a ledger or chart of accounts.
2. **Primary ledger second**, because creating a ledger requires assigning it a legal entity, a chart of accounts structure, a calendar, and a currency. (Lesson 5 builds the actual chart of accounts and calendar; for now, you're assigning placeholders you'll finish there.)
3. **Business unit last**, because a business unit requires an existing primary ledger to reference.

## Configuring the two legal entities

In the Legal Entity setup task, create:

- **LTV Manufacturing Corporation** — country United States, legal entity identifier matching a US registration format, set as the **primary balancing entity** for the US ledger.
- **LTV Manufacturing Canada ULC** — country Canada, legal entity identifier matching a Canadian registration format, set as the primary balancing entity for the Canada ledger.

Both get flagged to use Subledger Accounting and to participate in intercompany transactions — this second flag is what later allows the Company segment's intercompany restriction (lesson 5) to work correctly.

## Configuring the two primary ledgers

In the Manage Primary Ledgers task:

| Field | LTV US Primary Ledger | LTV Canada Primary Ledger |
|---|---|---|
| Chart of accounts | LTV Manufacturing COA (lesson 5) | LTV Manufacturing COA (same structure) |
| Calendar | LTV Corporate Calendar (lesson 5) | LTV Corporate Calendar (same calendar) |
| Currency | USD | CAD |
| Accounting method | Accrual | Accrual |
| Legal entity | LTV Manufacturing Corporation | LTV Manufacturing Canada ULC |

Both ledgers reference the **same** chart of accounts structure and calendar object by design (lesson 3's reasoning) — you are not building two different charts of accounts, just assigning the one shared design to each ledger.

## Configuring the two business units

In the Manage Business Units task:

- **US Manufacturing & Distribution BU** — assigned to LTV US Primary Ledger, set as the default business unit for the US legal entity's Procurement, Payables, and Receivables transactions.
- **Canada Operations BU** — assigned to LTV Canada Primary Ledger, set as the default business unit for the Canadian legal entity's Procurement, Payables, and Receivables transactions.

Each business unit is also assigned a default **ledger set** reference back to its own primary ledger — this is the field that will make every transaction you enter in Chapter 2 land in the right ledger automatically.

## Verifying the structure

Before moving on, open the Manage Primary Ledgers task and confirm both ledgers show a legal entity assigned, and open Manage Business Units to confirm both business units show their ledger assignment. A business unit with no ledger, or a ledger with no legal entity, will silently block transaction entry later — catching it now is far cheaper than catching it in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| Primary balancing entity | The legal entity whose balancing segment value must net to zero within its own ledger |
| Ledger set | A grouping that lets a business unit, report, or process reference a specific ledger by default |

## Recap

Configuration order is legal entity, then primary ledger, then business unit, because each references the one before it. LTV now has two complete stacks — US and Canada — sharing one chart of accounts design and calendar but with their own currency, legal entity, and business unit. Next up, lesson 5: configuring the chart of accounts and calendar that both ledgers reference.
