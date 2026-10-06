# Assigning Methods to Ledgers

You now have a complete accounting method built from AADs built from rules. This lesson closes the loop: how that method actually gets connected to a real ledger, and what that means when a company has more than one ledger.

## What you'll learn

- Where the accounting method assignment lives on a ledger's setup
- Why this assignment happens at the ledger level, not the business unit level
- How primary and secondary ledgers can each carry their own accounting method
- What happens, practically, after this assignment is made

## Where the assignment happens

You learned, back in your General Ledger course, that a ledger is defined by four things: a Chart of Accounts, a calendar, a currency, and an accounting method. That fourth element is exactly what this course has spent twelve lessons building toward. When a ledger is defined (or edited) in Oracle Fusion, one of its core attributes is the Subledger Accounting Method it uses — you select the method, by name, the same way you'd select a calendar or a currency.

This is a ledger-level assignment, not a business-unit-level one. Multiple business units can share a single ledger, and all of their subledger transactions that post to that ledger will use the one accounting method assigned there. You do not assign a separate accounting method per business unit.

## Why ledger-level, not business-unit-level

Accounting method assignment happens at the ledger because the ledger is what actually gets debited and credited — the Chart of Accounts, the calendar, and the trial balance all live at the ledger level. A business unit is mainly an operational and security construct (who processes transactions, under what rules) layered on top of the financial structure. Since the accounting method determines how transactions become GL journal entries, and GL journal entries live in a ledger, that's where the assignment naturally belongs.

## Primary and secondary ledgers, each with their own method

A company can have a primary ledger and one or more secondary ledgers recording the exact same business transactions, usually for a different reporting purpose — different accounting standard, different currency representation, or a different level of detail. Each of those ledgers is defined independently, and each carries its own accounting method assignment. It's entirely possible, and common, for the primary ledger to use one accounting method (say, built around local GAAP needs) while a secondary ledger uses a different accounting method (say, built around IFRS needs) for the exact same underlying subledger transactions. You'll study this scenario in full in Chapter 6's lesson on multiple accounting representations.

## What happens after assignment

Once a ledger has an accounting method assigned, every accounting event that any subledger raises for that ledger gets processed using that method's AADs. Change the method assignment on a ledger (a significant, carefully-controlled action, not something done casually), and you change how every future transaction for that ledger gets accounted, across every subledger application — which is exactly why this single setting carries so much weight.

## Recap

The accounting method is one of a ledger's core defining attributes, assigned at the ledger level, not the business-unit level. A company's primary and secondary ledgers can each carry a different accounting method, which is how the same transactions can be accounted differently for different reporting needs. This closes out the configuration side of Chapter 3. Next up, lesson 14: validating and activating definitions, the final check before any of this configuration can actually be used.
