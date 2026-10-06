# Reviewing Subledger Journal Entries

Create Accounting produces journal entries whether you ever look at them or not. This lesson is about actually looking: the screens and the habits a consultant uses to inspect what SLA built, both to confirm it's correct and to investigate when something looks off.

## What you'll learn

- Where to go to review a subledger journal entry
- What information is visible on a reviewed entry
- How to drill from a General Ledger journal back to its originating subledger entry
- Why reviewing entries routinely matters, not just when something breaks

## The Review Journal Entries page

Oracle Fusion provides a dedicated inquiry page, generally called Review Journal Entries (or found through the Subledger Accounting work area), where you can search for subledger journal entries by ledger, subledger application, event class, date range, transaction number, or batch. Opening a specific entry shows you its header information — accounting date, status (Draft or Final), currency, and the subledger application and event it came from — along with every individual line: the account, the debit or credit amount, the description your description rule built, and any supporting references attached.

This page is where you confirm, concretely, that everything from Chapters 1 through 3 worked as designed: did the right lines generate, did they hit the right accounts, does the description read the way you intended, is the entry balanced.

## Drilling from GL back to the subledger

One of the most useful habits a consultant can build is drilling in the opposite direction: starting from a General Ledger journal entry (which you already know how to review from your General Ledger course) and tracing it back to the specific subledger transaction that generated it. Because every subledger journal entry carries a reference back to its originating transaction, Oracle Fusion supports this drill-down directly from the GL journal inquiry screens, through to the subledger journal entry, and from there to the actual source transaction (the invoice, the receipt, the asset) itself.

This matters enormously in practice: when a controller asks "why does this GL account have this balance," or "what is this $4,200 journal line," the answer is almost never visible from the GL journal alone — it's visible once you drill back through Subledger Accounting to the originating transaction.

## Why review routinely, not just reactively

It's tempting to think of journal entry review as something you only do when troubleshooting a problem (covered directly in lesson 18 and again in Chapter 5). But reviewing a sample of entries routinely, especially right after implementing or changing a rule, catches mistakes while they're still easy to fix — before dozens of periods' worth of transactions have used a flawed rule. Routine review is cheap; discovering a systemic account-rule error after six months of postings is expensive.

## Recap

The Review Journal Entries page lets you inspect a subledger journal entry's header and lines in detail, and drilling from a GL journal back through Subledger Accounting to the originating transaction is one of the most valuable troubleshooting and audit skills a consultant can build. Reviewing routinely, not just reactively, catches problems early. Next up, lesson 18: accounting errors and corrections, what to do when that review turns up something wrong.
