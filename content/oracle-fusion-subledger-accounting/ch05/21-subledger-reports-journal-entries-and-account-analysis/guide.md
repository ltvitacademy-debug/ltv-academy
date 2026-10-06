# Subledger Reports: Journal Entries and Account Analysis

Chapter 4 was about producing and moving accounting. Chapter 5 is about reading it back out, at scale — the reports a consultant, controller, or auditor actually runs, rather than clicking into one entry at a time on the Review Journal Entries page. This lesson covers the two most foundational: the Journal Entries Report and the Account Analysis Report.

## What you'll learn

- What the Journal Entries Report shows, and when you'd run it
- What the Account Analysis Report shows, and how it differs
- Why accounting class and description rules (from Chapter 2) directly determine how useful these reports are
- How to choose between them for a given task

## The Journal Entries Report

The **Journal Entries Report** lists subledger journal entries for a given ledger, subledger application, and date range (or batch), essentially giving you, in report form, everything you could see one entry at a time on the Review Journal Entries page from lesson 17 — headers, lines, accounts, amounts, and descriptions — but across potentially thousands of entries at once. This is the report you'd run to review an entire period's worth of Payables accounting at a glance, to sample-check a batch before transfer, or to hand to an auditor who needs a complete listing of a specific period's subledger activity.

## The Account Analysis Report

The **Account Analysis Report** takes a different angle: instead of organizing by transaction, it organizes by GL account. For a chosen account (or range of accounts) and period, it lists every subledger journal line that posted to that account, in effect letting you answer "show me everything that hit this account this period" rather than "show me this invoice's accounting." This is the report a controller reaches for when a GL account balance looks unexpected and they need to see the detail behind it — exactly the kind of drill-back scenario you learned about in lesson 17, but for an entire account's activity rather than one transaction.

## Why Chapter 2's rules matter here

Both reports are only as useful as the configuration choices made back in Chapter 2. A well-built description rule (lesson 8) means every line on these reports tells a reader something specific — which supplier, which invoice — instead of a repeated generic label. A thoughtfully assigned accounting class (lesson 5) means the Account Analysis Report can meaningfully group and label lines by type (Invoice, Tax, Freight) instead of showing an undifferentiated list. None of this is automatic; it's the direct payoff of the rule-building discipline from earlier in the course.

## Choosing between them

Use the Journal Entries Report when your starting point is a transaction, a batch, or a time period, and you want everything about that scope. Use the Account Analysis Report when your starting point is a GL account and you want to know what drove its activity. In practice, a consultant often moves between both: starting broad with the Journal Entries Report to spot something unusual, then narrowing to the Account Analysis Report for the specific account involved.

## Recap

The Journal Entries Report lists subledger activity by transaction, batch, or period; the Account Analysis Report lists subledger activity by GL account. Both depend directly on the description rules and accounting classes configured back in Chapter 2 to be genuinely useful. Next up, lesson 22: open account balances listings, a report focused specifically on what's still open, not just what posted.
