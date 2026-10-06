# Ticket: Accounting Period Will Not Close

**Chapter 4 · General Ledger and Subledger Tickets · Lesson 5 of 5**

## What you'll learn

- The period status values, and what each one actually allows
- Why a period-close failure is almost always a symptom of something covered in Lessons 16-19, not a new kind of problem
- How to read a Close Monitor / period close checklist to find which prerequisite is actually missing
- A resolution note that closes out this chapter by tying everything together

## Status values, precisely

| Status | Meaning |
|---|---|
| **Never Opened (N)** | No transactions can be entered |
| **Future Enterable (F)** | Journal entry allowed, posting is not |
| **Open (O)** | Full transaction activity allowed |
| **Closed (C)** | No new transactions; can potentially be reopened |
| **Permanently Closed (P)** | Closed with no path back to Open |

Closing a period isn't a single action — it's a checklist. Every subledger needs its transactions accounted and transferred, every GL journal for the period needs to be posted, and (where the business requires it) reconciliations need to be complete. The period literally cannot close while any of those prerequisites is outstanding.

## The ticket

> **Ticket #40612 — Thornfield Materials Holdings.** Controller reports: "I'm trying to close October for the Fixtures Division ledger and it won't close. No idea which of our subsidiaries is the problem." Severity: Critical (blocks consolidated close).

## Investigating

1. **Open the Close Monitor / period close checklist for this ledger and period.** It shows exactly which prerequisite is unmet, rather than a single opaque "can't close."
2. **Read the specific blocker.** Two items are flagged: (1) 6 Receivables journals for October are still **unposted**, and (2) one Payables subledger batch shows **Accounted – Final** but never transferred to GL.
3. **Recognize these as familiar tickets.** The 6 unposted journals are a Lesson 16-type situation — check whether they're unbalanced, reference a disabled account, or are still pending approval. The untransferred Payables batch is a Lesson 8 or Lesson 19-type situation — check whether it's a timing gap or an intentionally excluded Transfer to GL setting.
4. **Resolve each specifically.** The 6 journals: one references a disabled account (same pattern as Lesson 16) — corrected and posted. The Payables batch: confirmed a genuine timing gap (Lesson 8 pattern) — Transfer to GL run manually, then posted.

## Root cause

The period could not close because two independent prerequisites were unmet: unposted journals (caused by one disabled-account line) and an untransferred Payables batch (a timing gap). Neither was a new kind of problem — both were variations of tickets already worked earlier in this chapter, just discovered through the period-close checklist instead of an individual complaint.

## Resolving it

Work each blocker using the specific method appropriate to it (not a generic "just try closing again"), confirm the Close Monitor shows all prerequisites met, then close the period.

## Documenting it

> **Ticket #40612 — Thornfield Materials Holdings.** October period would not close for the Fixtures Division ledger.
> **Root cause:** Two unmet prerequisites — 6 unposted GL journals (one referencing a disabled account) and one Payables batch accounted Final but not yet transferred to GL (a timing gap).
> **Fix:** Corrected the disabled-account journal and posted all 6; ran Transfer to GL manually for the Payables batch and posted the resulting journal.
> **Verified:** Close Monitor shows all prerequisites met; period closed successfully.
> **Note:** Recommend reviewing the Close Monitor checklist a day before the target close date going forward, rather than discovering blockers on close day itself.

## Key terms

| Term | Meaning |
|---|---|
| Close Monitor | The dashboard/checklist showing which prerequisites are met or outstanding for closing a period |
| Period-close prerequisite | A specific condition (all subledgers transferred, all GL journals posted, etc.) that must be satisfied before close |

## Recap — and the end of Chapter 4

A period-close ticket is rarely a new category of problem — it's usually one or more of the tickets already covered in this chapter, surfaced by the close checklist instead of an individual complaint. That's the real reason this lesson comes last: once you can diagnose a stuck journal, a failed import, a failed accounting run, and a transfer gap individually, a stuck period close is just finding out which of those is currently true. Next up, Chapter 5: Assets, Expenses and Setup tickets, starting with depreciation that didn't run.
