# Accounting Methods and Rules

You now know that SLA works from events classified by event class and event type. This lesson introduces the object that ties classified events to actual accounting logic, and the overall family of rule types you'll build out in detail across the next chapter: the Subledger Accounting Method.

## What you'll learn

- What a Subledger Accounting Method is and what it is a container for
- The four main rule types that get assigned inside it: journal line rules, account rules, description rules, and supporting references
- How a journal entry rule set bundles those rules together for one event class
- Why a single company might use more than one accounting method

## The Subledger Accounting Method

A Subledger Accounting Method is the top-level configuration object you assign to a ledger. It does not contain accounting logic directly. Instead, it is a container that, for each subledger application (Payables, Receivables, Fixed Assets, and so on), points to a set of rules that should be used whenever that application raises an accounting event for that ledger.

Oracle ships seeded accounting methods — for example, "Standard Accrual" — that already contain reasonable rule sets for common accounting scenarios. Most organizations start from a seeded method and customize it (you'll learn exactly how to do that safely in Chapter 3) rather than building one from a blank slate.

## The four rule types

Underneath an accounting method, for a given subledger application, event class, and event type, the actual journal-building logic lives in four kinds of rules, each covered in depth later in this chapter:

- **Journal line rules** decide which lines appear on the journal entry and whether each is a debit or a credit.
- **Account rules** decide which General Ledger account (or account segment) each line should post to.
- **Description rules** build a human-readable description for each line, pulled from transaction data.
- **Supporting references** carry extra reference information on a line — like a supplier ID or a transaction number — beyond the account itself.

## Journal entry rule sets: the bundle

These four rule types do not float around independently. They are bundled together into a **subledger journal entry rule set**, which is assigned to a specific event class (and optionally a more specific event type). When Create Accounting processes an event, it looks up the journal entry rule set assigned to that event's class and type, under the accounting method active for the ledger, and executes the account rules, journal line rules, description rules, and supporting references inside that one rule set to build the complete journal entry.

## Why a company might need more than one method

Most ledgers use a single accounting method. But a company that needs to report under two different accounting standards for the same transactions — say, local GAAP and IFRS — may run a primary ledger under one method and a secondary ledger, recording the same underlying transactions, under a different method with different rules. You'll see this scenario in detail in Chapter 6, when we cover multiple accounting representations. For now, the key idea is that the accounting method is what gets swapped out when a company needs genuinely different accounting treatment of the same business events.

## Recap

A Subledger Accounting Method is the top-level container assigned to a ledger that points, per subledger application, to the journal entry rule sets that should fire for each event class and event type. Each rule set bundles journal line rules, account rules, description rules, and supporting references. Next up, lesson 4: subledger applications and their sources, where you'll see which Oracle Fusion modules are SLA-enabled and what data each one feeds into this engine.
