# Bank Reconciliation

**Chapter 2 · Running the Business · Lesson 16 of 25**

January's bank statement arrives. This lesson loads it into Cash Management and reconciles it against the Regions Bank account's GL activity — surfacing, but not yet resolving, the duplicate EFT from lesson 11. That resolution waits for Chapter 3.

## What you'll learn

- How Grace Olsen loads and reconciles January's bank statement
- What matches automatically, and what doesn't
- The unexplained $9,200.00 variance this reconciliation uncovers
- Why this lesson stops short of fixing it

## Loading the statement

Grace Olsen, LTV's treasury and cash management analyst, loads the January bank statement for Regions Bank account ...7734 into Cash Management on **February 1**. The statement covers every deposit and debit the bank actually processed in January, independent of what Oracle Fusion's own records say.

## What reconciles automatically

Cash Management's automatic matching rules clear almost everything without a second look: Harborview's $55,100.00 deposit (lesson 13) matches the bank's $55,100.00 credit on January 28 exactly. PMT-21094's $18,400.00 EFT to Meridian matches a single $18,400.00 debit. Routine smaller transactions throughout the month match cleanly, one bank line to one GL line.

## What doesn't reconcile

One line refuses to match cleanly: the bank statement shows **two** $9,200.00 EFT debits in January, dated January 10 and January 11, both referencing the same payment file identifier tied to PMT-21087. Oracle Fusion's Cash Management records, and the GL, show exactly **one** $9,200.00 disbursement for PMT-21087 — because that's what actually happened on LTV's side (lesson 11).

Grace's reconciliation ends the day with:

- **GL cash balance (book):** reflects one $9,200.00 disbursement
- **Bank statement balance:** reflects two $9,200.00 debits
- **Unreconciled variance:** **$9,200.00**, flagged as an open reconciling item, not yet explained

## Why this lesson doesn't resolve it

Grace can see the variance clearly — it's not hidden — but resolving it requires contacting Regions Bank to confirm whether the second debit was a genuine duplicate transmission (which it is) and, if so, getting the bank to reverse it. That conversation, and the formal write-up of what happened, is exactly the kind of cross-system investigation Chapter 3 is built around. For now, the item sits open on LTV's bank reconciliation worksheet, carried forward into the January 31 close.

## Why this matters going into Chapter 3

This is the first of the six problems that is **visible before the CFO ever calls**. Unlike the GRNI accrual (invisible until someone checks the December journal) or the AR misapplication (invisible in any total-balance report), a $9,200.00 unreconciled bank variance shows up the moment anyone runs a bank reconciliation — which is exactly why Elena Marsh's January 31 call treats it as one of the symptoms she already knows about, not a surprise Chapter 3 has to discover from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Bank statement balance | The ending balance and transaction detail the bank itself reports |
| Reconciling item | A difference between book and bank balances still open at the time of reconciliation |

## Recap

January's bank reconciliation clears almost everything automatically, except a $9,200.00 variance caused by the bank statement showing PMT-21087 debited twice while the GL shows it once — flagged, but not yet resolved. Next up, lesson 17: subledger accounting and General Ledger posting, where a missing SLA rule and an unposted intercompany journal round out this chapter's set of problems.
