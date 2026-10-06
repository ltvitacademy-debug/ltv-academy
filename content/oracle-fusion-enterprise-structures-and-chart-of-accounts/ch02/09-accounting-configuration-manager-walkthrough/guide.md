# Accounting Configuration Manager Walkthrough

You have now met legal entities, primary ledgers, secondary ledgers, reporting currencies, and ledger sets as separate concepts. This lesson walks through the guided tool Oracle Fusion gives you to actually assemble them: the **Accounting Configuration Manager**, reached through the "Specify Ledger and Legal Entity Relationships" and related primary ledger tasks.

## What you'll learn

- What the Accounting Configuration Manager is for
- The order it walks you through: ledger, then legal entities, then business units
- What "ledger options" and "accounting options" configure
- Why this tool exists instead of creating each piece in total isolation

## Why a guided tool, not isolated screens

You could, in theory, create a chart of accounts, a calendar, a legal entity, and a ledger as four completely separate tasks and then manually wire them together. Oracle Fusion instead gives consultants a connected flow for the most common path — building a primary ledger and attaching the legal entities and business units that use it — because that combination is configured together so often, and because doing it in isolation makes it easy to forget a required link.

## The guided sequence

The Accounting Configuration Manager walkthrough, run from the **Manage Primary Ledgers** task (sometimes called "Specify Ledger Options" once a ledger exists), generally proceeds in this order:

```
1. Create/select the Primary Ledger
     - assign chart of accounts, calendar, currency, accounting method
2. Specify Ledger Options
     - sequencing, rounding, balancing options, journal approval rules
3. Assign Legal Entities
     - attach the legal entities this ledger will account for
4. Assign/Review Balancing Segment Values per Legal Entity
     - map each legal entity to its primary balancing segment value(s)
5. Assign Business Units (handled fully in Chapter 3)
```

## Ledger options vs. accounting options

Two terms show up constantly in this flow, and it helps to keep them apart:

- **Ledger options** are the operational settings of the ledger itself — things like how journals get their sequence numbers, rounding rules, and whether journal approval is required.
- **Accounting options**, by contrast, usually refer to subledger accounting behavior — how transactions from Payables, Receivables, and other subledgers get translated into journal entries for this specific ledger.

Both sit "underneath" the ledger you created, refining how it behaves once legal entities and business units start sending it transactions.

## Why the legal-entity-to-balancing-segment link matters

The step that trips up new consultants most is assigning each legal entity to a specific primary balancing segment value. This link is what allows a single ledger to produce a separate, in-balance trial balance *per legal entity*, even though all of them post into the same ledger. Skip or misconfigure this step, and the ledger can no longer cleanly separate one legal entity's financial position from another's — which defeats much of the purpose of multi-entity accounting in the first place.

## Recap

The Accounting Configuration Manager is the guided path from a primary ledger, through ledger and accounting options, to assigned legal entities and their balancing segment values. Chapter 2 is complete: legal entities, the three ledger types, ledger sets, and the tool that connects them. Chapter 3 moves to business units and reference data — the layer that actually processes transactions into this structure.
