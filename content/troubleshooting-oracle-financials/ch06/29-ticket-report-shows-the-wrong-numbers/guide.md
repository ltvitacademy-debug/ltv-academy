# Ticket: Report Shows the Wrong Numbers

**Chapter 6 · Data and Integration Tickets · Lesson 4 of 4**

## What you'll learn

- Why "the report is wrong" is the vaguest possible ticket, and how to make it specific
- A real cause: a report run before period-close activity finished, against live balances
- The final checklist this entire course has been building toward
- A resolution note that closes out the course

## The vaguest ticket you'll get

Every lesson in this course has worked toward narrowing a vague symptom into a specific, provable cause. "The report shows the wrong numbers" is about as vague as a ticket gets — it could be a currency conversion issue, a parameter set wrong, a timing issue (Lesson 14's territory), a reconciliation break (Lessons 11 and 18's territory), or the report genuinely running against incomplete data. The first job isn't to guess which — it's to get a **specific, comparable number** from the person reporting it.

## The ticket

> **Ticket #40849 — LTV Manufacturing Corporation.** Controller reports: "Our Balance Sheet run this morning shows total assets $340,000 higher than what GL shows in Smart View. Which one is right?" Severity: Critical (used for a board report due today).

## Investigating

1. **Get the exact comparison**, not just "it's wrong." Balance Sheet report: $340,000 higher in a specific fixed asset line.
2. **Check when each was run.** The Balance Sheet report ran at 7:00 AM. A large batch of Mass Additions (new manufacturing equipment, similar to Lesson 21's territory) was posted into the active asset register at 7:45 AM the same morning — after the report ran, but the report's "as of" date parameter was today's date regardless of what time it ran.
3. **Check what Smart View was showing.** It reflected GL balances as of the moment it was refreshed, later in the morning — after the 7:45 AM posting. So Smart View already included the new equipment; the earlier Balance Sheet report run did not.

## Root cause

Both numbers were "correct" for the moment they were generated — the Balance Sheet report simply ran before that morning's Mass Additions batch posted, and the gap is exactly the value of the newly posted equipment. This isn't a data error or a broken report; it's a timing difference between when two different views were generated, the same underlying principle as Lesson 14's statement cutoff, just showing up in a different report.

## Resolving it

Re-run the Balance Sheet report now that the Mass Additions batch has posted, confirm the new total matches Smart View, and explain to the controller specifically why the two numbers differed — not just that they now match, but *why* they didn't before.

## Documenting it

> **Ticket #40849 — LTV Manufacturing Corporation.** Balance Sheet report showed total assets $340,000 lower than GL/Smart View the same morning.
> **Root cause:** The Balance Sheet report ran at 7:00 AM, before a $340,000 Mass Additions batch posted at 7:45 AM; Smart View, refreshed later, already reflected the new equipment. A timing difference, not a data or report error.
> **Fix:** Re-ran the Balance Sheet report after confirming the Mass Additions batch had posted.
> **Verified:** Re-run total now matches Smart View exactly.
> **Note:** Recommend board-report runs be scheduled after all morning batch processes (especially Mass Additions and Create Accounting) are confirmed complete, not at a fixed time regardless of batch status.

## Key terms

| Term | Meaning |
|---|---|
| As-of timing | When a report or view was actually generated, which can differ even for the "same" date |
| Timing difference | Two numbers that are each correct for the moment generated, but differ because of what had and hadn't posted yet |

## The checklist this course has been building

Every ticket in this course reduced to the same discipline: get specific, isolate what's actually different about the broken case, check the real evidence (a holds tab, a job log, an interface table, a diagnostic report, a describe endpoint), confirm the theory before fixing it, apply the narrowest correct fix, and document the symptom, cause, fix, and verification plainly and honestly.

## Recap — the course, and what's next

You've now worked 26 realistic production-support tickets across Payables, Receivables, Cash Management, General Ledger, Subledger Accounting, Fixed Assets, Expenses, security, and data integration — and the methodology from Chapter 1 underneath every one of them. That closes Troubleshooting Oracle Financials and the Production Support stage of the Oracle Fusion Financials Consultant path.

Next up is the capstone: **LTV Manufacturing Corporation**. It's January 31. The CFO says the books don't balance and the period won't close. You're the consultant — investigate AP, AR, Assets, Cash Management, Subledger Accounting, and GL, find what's actually wrong, correct it, reconcile the accounts, and complete the month-end close. Everything in this course was preparation for exactly that.
