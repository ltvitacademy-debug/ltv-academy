# Reconciling Subledgers to General Ledger

You now have the two reports (Journal Entries, Account Analysis) and the open-items report (Open Account Balances Listing) in your toolkit. This lesson puts them to work in the activity they most directly support: the formal, periodic process of proving that a subledger's own records agree with what landed in the General Ledger.

## What you'll learn

- Why subledger-to-GL reconciliation is a necessary, recurring control, not a one-time check
- The basic reconciliation logic: subledger total versus GL balance
- What a reconciling difference usually indicates
- How the reports from this chapter fit into a reconciliation workflow

## Why reconciliation is necessary

Even with a well-built, well-tested Subledger Accounting configuration, companies still perform subledger-to-GL reconciliation as a recurring control, typically at month-end. The reason is straightforward: the subledger application (say, Payables) maintains its own record of what it believes is owed to suppliers, built from invoices and payments directly. The General Ledger, separately, holds a balance on the AP Trade account, built from the journal entries that Subledger Accounting generated and transferred. In a healthy system these two numbers should always agree — but "should always agree" is a claim worth proving, not assuming, especially after any rule change, data correction, or unusual transaction volume.

## The basic reconciliation logic

At its core, reconciliation compares two numbers: the subledger's own balance for a control account (in Payables, this comes from the subledger's own open-items data, conceptually similar to what the Open Account Balances Listing shows) against the GL balance on the corresponding control account (AP Trade) for the same ledger and period. If the two match, the subledger and GL are considered "in balance" for that account, and the reconciliation is complete for that period.

## What a difference usually indicates

When the two numbers don't match, the difference almost always traces back to one of a small number of causes: a subledger journal entry that was created but never transferred to GL (check lesson 19's transfer eligibility), a manual journal entry posted directly to the GL control account outside of Subledger Accounting (which subledger-to-GL reconciliation is specifically designed to catch, since manual postings to a control account bypass the subledger's own record entirely), or a timing difference where a transaction was accounted in one period but the corresponding GL transfer happened in a different period. Finding which of these applies is exactly the kind of investigation the Journal Entries Report and Account Analysis Report support.

## How the Chapter 5 reports fit together

In practice, a reconciliation workflow typically starts with the two headline numbers (subledger balance vs. GL balance), and if they disagree, moves to the Account Analysis Report to see everything that posted to the GL control account for the period, cross-referenced against the subledger's own open-items detail (what the Open Account Balances Listing shows), to isolate exactly which item or items are causing the gap.

## Recap

Subledger-to-GL reconciliation is a recurring control that compares a subledger application's own balance against the GL control account balance for the same period, with differences usually tracing to a missed transfer, a manual GL journal bypassing the subledger, or a timing gap. The Account Analysis Report and Open Account Balances Listing are the primary tools for isolating the cause. Next up, lesson 24: accounting attribute assignments, a more technical layer of SLA configuration that affects exactly which values end up on a journal entry header and lines.
