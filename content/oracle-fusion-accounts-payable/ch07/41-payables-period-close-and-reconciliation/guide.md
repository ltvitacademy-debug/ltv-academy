# Lesson 41 — Payables Period Close and Reconciliation

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 41 of 42**

## What you'll learn

- The sequence of steps required to close a Payables period
- Why Payables won't let a period close with certain items outstanding
- What the Payables-to-Ledger Reconciliation report actually proves
- What happens to the next period once the current one closes

## The close sequence

Closing a Payables period isn't a single button — it's a checklist, and each step exists because skipping it would leave something unaccounted for:

1. **Complete invoice entry and validation** — every invoice for the period should be entered and validated; stragglers either get processed now or deliberately pushed to next period
2. **Resolve holds** — outstanding holds (Chapter 4) on invoices dated in this period need resolving or deliberately carrying forward
3. **Complete payment processing** — any payment runs intended for this period need to finish, including quick payments
4. **Run Create Accounting in Final mode** — every remaining unaccounted transaction for the period gets accounted (Lesson 37)
5. **Transfer and post to GL** — those journal batches move to GL and get posted (Lesson 38)
6. **Reconcile Payables to GL** — confirm the subledger and the ledger agree
7. **Close the period** in Payables, then move to the next

## Why Payables blocks a close

Oracle Fusion Payables won't let a period close if there are unaccounted transactions dated in that period, or invoices still sitting unresolved on hold with no deliberate decision made about them. This isn't a bureaucratic inconvenience — it's the system refusing to let a period "close" while numbers inside it are still moving, which would make any reporting based on that period unreliable the moment it changed after the fact.

## The Payables-to-Ledger Reconciliation report

Before actually closing, this report compares the ending AP liability balance according to the Payables subledger against the ending balance of the AP liability account in the General Ledger. In a healthy close, these two numbers **tie** — any difference means something was accounted in one system but not fully reflected in the other (an unposted batch, a transaction that errored during Create Accounting, etc.), and it has to be explained before the period closes, not after.

## Illustrative example

**Solace Robotics** (fictional, reused from Lesson 27) is closing its monthly Payables period. The checklist: all invoices entered and validated, zero open holds remaining, the final weekly payment run completed, Create Accounting run in Final mode with nothing left unaccounted, and both journal batches posted in GL. The Payables-to-Ledger Reconciliation report shows:

| | Amount |
|---|---|
| AP liability per Payables subledger | $142,600 |
| AP liability per General Ledger | $142,600 |
| **Difference** | **$0** |

With a zero difference and nothing outstanding, the period closes cleanly, and the next period opens for new activity.

## What a mismatch would mean instead

If those two numbers didn't match — say, GL showed $140,200 instead — the gap of $2,400 points directly back to the three-state pipeline from Lesson 38: something was accounted in Payables but never transferred, or transferred but never posted. The reconciliation report is what makes that gap visible before the period closes, rather than discovering it months later.

## Key terms

| Term | Meaning |
|---|---|
| Period close checklist | The sequence of steps required before a Payables period can close |
| Payables-to-Ledger Reconciliation report | Compares the AP liability balance in the subledger against the GL |

## Check yourself

You're ready for Lesson 42 when you can answer, without looking: what does a non-zero difference on the Payables-to-Ledger Reconciliation report usually indicate?
