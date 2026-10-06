# Ticket: Subledger Entries Did Not Transfer to GL

**Chapter 4 · General Ledger and Subledger Tickets · Lesson 4 of 5**

## What you'll learn

- The "Transfer to GL" accounting attribute, and how it's different from the Lesson 8 timing gap
- Why accounting can be Final and still never be intended for GL
- How to find and correct a setup attribute that silently suppresses transfer
- A resolution note distinguishing "intentional" from "misconfigured"

## Not the same problem as Lesson 8

Lesson 8 covered a payment that was Accounted – Final but simply hadn't been picked up by the next scheduled Transfer to GL run yet — a timing gap, resolved by running the program. This ticket looks similar on the surface (an accounted subledger entry, not appearing in GL) but has a completely different cause: an accounting attribute that tells Subledger Accounting **not to transfer** a given entry at all, regardless of how many times the transfer program runs.

## The ticket

> **Ticket #40589 — BrightPath Facilities Group.** GL accountant reports: "A batch of Receivables adjustments has been Accounted – Final for three days. I've run Transfer to GL twice. They never show up in GL." Severity: High.

## Investigating

1. **Confirm accounting status.** All entries in the batch: **Accounted – Final**. (So this isn't an accounting failure like Lesson 18.)
2. **Confirm Transfer to GL has actually run since.** Yes, twice, per the job logs, both completing successfully with no errors.
3. **Check the accounting attribute that controls transfer itself.** The **Transfer to GL** indicator on these specific journal entries is set to **N** — meaning Subledger Accounting intentionally excludes them from any transfer run, by design, not by error.
4. **Find out why that attribute is set to N for this transaction type.** Checking SLA setup: this adjustment type was deliberately configured months ago to stay subledger-only, for a since-discontinued internal reporting process that no longer applies — nobody ever reverted the setting after that process was retired.

## Root cause

The Transfer to GL indicator for this specific Receivables adjustment type was set to N as part of a now-discontinued reporting process, and it was never reset after that process ended — so these entries are being correctly excluded from transfer by a setup value that is simply outdated, not malfunctioning.

## Resolving it

This is not a "re-run the program" fix like Lesson 8, and it's not a missing-rule fix like Lesson 18 — it's a setup attribute that needs to be deliberately changed because the business reason for it no longer exists. Update the Transfer to GL setting for this adjustment type to **Y** (or clear it, so it defaults to transferring), confirm with whoever owns SLA setup that no other process still depends on the old behavior, and then re-run Create Accounting with the Transfer to GL option (or run Transfer Journal Entries to GL) for the affected batch.

## Documenting it

> **Ticket #40589 — BrightPath Facilities Group.** A batch of Receivables adjustments, Accounted – Final for three days, never appeared in GL despite two successful Transfer to GL runs.
> **Root cause:** The Transfer to GL indicator for this adjustment type was set to N during a now-discontinued internal reporting process and was never reverted; entries were being correctly excluded from transfer by design, not by error.
> **Fix:** Updated the Transfer to GL setting for this adjustment type to transfer by default; confirmed with SLA setup owner that no other process depends on the old behavior; re-ran transfer for the affected batch.
> **Verified:** Batch now appears in GL as an unposted journal; posted and confirmed balances.
> **Note:** Recommend a periodic review of any "exclude from transfer" settings tied to discontinued processes, since this kind of setting has no natural expiration.

## Key terms

| Term | Meaning |
|---|---|
| Transfer to GL (attribute) | A per-entry accounting attribute (Y/NULL or N) controlling whether an accounted entry is eligible for transfer at all |
| Accounted – Final, not transferred | A state that can mean either a timing gap (Lesson 8) or an intentional exclusion (this lesson) |

## Check yourself

What specifically told you this was a different kind of problem than Lesson 8's timing gap, even though both tickets started with "Accounted – Final, but not in GL"?
