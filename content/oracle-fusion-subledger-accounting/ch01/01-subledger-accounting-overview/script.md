# Script — Subledger Accounting Overview

## Segment 1 (title)

Welcome to Oracle Fusion Subledger Accounting. You've already configured General Ledger, Payables, and Receivables, and walked transactions through Procure-to-Pay and Order-to-Cash. Now we open up the engine that turned those transactions into journal entries: Subledger Accounting, or SLA.

## Segment 2 (steps)

In older systems, each module hardcodes its own journal-building logic. Oracle Fusion does something different. Payables, Receivables, Assets, and the other subledgers don't build journal entries themselves. They record a business event and hand it to one shared, rules-based engine: Subledger Accounting.

## Segment 3 (steps)

Think of SLA as a translator every subledger calls with the same request: here's a business event, tell me what journal entry it should produce. The engine looks up configurable rules for that subledger, that event, and that ledger, and builds a complete, balanced journal entry. Change the rules, and every subledger using them changes, with no code changes.

## Segment 4 (steps)

Here's where SLA sits. A subledger captures a transaction and raises an accounting event. SLA applies rules and produces a subledger journal entry, reviewable in draft. Once finalized, SLA transfers that journal to General Ledger, where it posts into the trial balance you already know how to read.

## Segment 5 (steps)

That also means General Ledger never talks directly to Payables or Receivables. Every number that ever lands in GL from any subledger passed through this one engine first. Learn SLA once, and you can read and troubleshoot accounting in every subledger application in Oracle Fusion.

## Segment 6 (outro)

So remember this: one shared, rules-based engine stands between every subledger and the General Ledger. Up next, lesson two: accounting events and event classes, the raw input Subledger Accounting actually works from.
