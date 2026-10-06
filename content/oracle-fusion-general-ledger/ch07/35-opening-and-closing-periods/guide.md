# Opening and Closing Periods

**Chapter 7 · Period Close · Lesson 35 of 37**

## What you'll learn

- The five period statuses General Ledger uses, and what each one permits
- Where period status is managed, and who typically controls it
- What reopening a closed period actually involves, and why it's disruptive
- How this connects to the accounting calendar from Chapter 1

## Five statuses, not just open and closed

Chapter 1 introduced the accounting calendar — periods laid out in advance for a fiscal year. Each period in that calendar carries a **status** that controls exactly what can happen to it, and there are five, not two:

- **Never Opened** — the default for any period preceding the first period ever opened, or one defined but not yet future-enterable; no journal entry or posting is allowed
- **Future Enterable** — journal entry is allowed (useful for pre-entering journals dated in an upcoming period), but posting is not, because the period isn't actually open yet
- **Open** — full journal entry and posting allowed; this is the normal working status for the current period
- **Closed** — no new journal entry or posting; the period can still be reopened if something is discovered
- **Permanently Closed** — the final state; cannot be reopened under any circumstances

## Where this is managed

A controller manages period status from **General Accounting > Period Close > Manage Accounting Period**, choosing a ledger and seeing every period's current status at a glance. Changing an Open period to Closed is the final action of lesson 33's close checklist — it's the formal declaration that the period's books are final, made only after unposted journals are cleared (lesson 34) and reconciliation is complete.

## Why reopening is disruptive, not just inconvenient

Oracle Fusion allows a Closed period to be reopened — but doing so means every report, reconciliation, and downstream consumer of that period's numbers (anything from a management report already distributed, to a translated balance feeding a consolidation that already ran) is now potentially stale. For **LTV Manufacturing Corporation**, if an auditor finds a missing accrual in March after March has already closed and April is underway, reopening March means:

1. Reopening the period (status back to Open)
2. Entering and posting the correcting journal
3. Re-running any trial balance, translation, or consolidation that depended on March's numbers
4. Re-closing the period
5. Communicating to anyone who already used the original (now wrong) numbers

This is exactly why lesson 34's discipline — catching problems *before* close — pays for itself; reopening is always more expensive than not needing to.

## Permanently Closed is a one-way door

Unlike a regular Closed period, a **Permanently Closed** period cannot be reopened by anyone, for any reason, within Oracle Fusion. Companies typically apply this status to periods well outside any plausible audit or restatement window — closing that door deliberately, once there's no remaining reason a transaction would need to post there.

## Key terms

| Term | Meaning |
|---|---|
| Future Enterable | Journal entry allowed, posting not yet allowed |
| Closed | No new entry or posting; can still be reopened |
| Permanently Closed | Final state; cannot be reopened under any circumstances |
| Manage Accounting Period | The page used to view and change a period's status |

## Recap

General Ledger periods move through five statuses — Never Opened, Future Enterable, Open, Closed, and Permanently Closed — each controlling exactly what's allowed, and reopening a Closed period is always disruptive enough that avoiding the need for it is the real goal of everything in lesson 34. Next up, lesson 36: Year-End Close and Opening Balances, where this same status mechanism does something additional once a year.
