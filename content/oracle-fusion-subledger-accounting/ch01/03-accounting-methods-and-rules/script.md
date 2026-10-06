# Script — Accounting Methods and Rules

## Segment 1 (title)

You know SLA works from events classified by event class and event type. This lesson introduces the object that ties those classified events to actual accounting logic: the Subledger Accounting Method, and the family of rules that sit inside it.

## Segment 2 (steps)

A Subledger Accounting Method is the top-level object assigned to a ledger. It doesn't contain logic directly - it's a container that, per subledger application, points to the rules to use whenever that application raises an event for that ledger. Oracle ships seeded methods like Standard Accrual, and most companies start there and customize.

## Segment 3 (steps)

Underneath the method, four rule types do the actual work. Journal line rules decide which lines appear and whether they're debits or credits. Account rules decide which GL account each line posts to. Description rules build a readable description. Supporting references carry extra reference data, like a supplier ID, on the line.

## Segment 4 (code)

These four rule types get bundled into one object: a subledger journal entry rule set, assigned to an event class and optionally an event type. When Create Accounting processes an event, it looks up the rule set for that event's class and type, and runs everything inside it to build the journal entry.

## Segment 5 (steps)

Most ledgers use one accounting method. But a company reporting under two standards for the same transactions - say local GAAP and IFRS - can run a primary ledger under one method and a secondary ledger under a different one. We'll cover that scenario fully in chapter six. For now: the method is what you'd swap for genuinely different treatment of the same events.

## Segment 6 (outro)

So remember: the accounting method is the container, journal entry rule sets are the bundles, and journal line rules, account rules, description rules, and supporting references are what's inside them. Up next, lesson four: subledger applications and their sources.
