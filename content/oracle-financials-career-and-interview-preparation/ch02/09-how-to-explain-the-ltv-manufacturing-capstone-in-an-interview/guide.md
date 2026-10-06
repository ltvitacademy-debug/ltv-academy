# How to Explain the LTV Manufacturing Capstone in an Interview

**Chapter 2 · Resume, Capstone Story and Certification · Lesson 9 of 15**

Every resume bullet from lesson 8 ultimately points back to one project: the LTV Manufacturing Corporation capstone. This lesson is about turning that project into a single, well-structured interview story using the STAR format — Situation, Task, Action, Result — so you can tell it in under two minutes or unpack any piece of it for five more.

A reminder before we start: **LTV Manufacturing Corporation is a fictional, illustrative company** built for this training path. You should describe it honestly as the capstone project from your Oracle Fusion Financials training, not as a real employer or client — the same way you framed training work in lesson 8.

## What you'll learn

- How to structure the capstone as a STAR story, with the real details from your own hands-on work
- The six real root causes you can use as concrete talking points, not generic placeholders
- How to answer a follow-up that digs into just one of the six problems

## Situation

LTV Manufacturing Corporation is a fictional industrial equipment manufacturer with a US parent in Savannah, Georgia and a Canadian subsidiary in Windsor, Ontario — roughly 450 employees, two full legal entities, and a two-entity enterprise structure you configured yourself, including a shared chart of accounts design with a balancing segment supporting intercompany elimination. On January 31, the day the company's first-ever month-end close was supposed to finish, the CFO, Elena Marsh, called with six specific symptoms: an AP aging report that didn't match the GL, a customer invoice that looked overdue despite being paid (while something else looked overpaid), heavier-than-expected depreciation on new equipment, an open $9,200 bank reconciliation item, Receivables transactions that never reached the GL, and intercompany balances between the US and Canada that didn't tie.

## Task

Your job was to translate "the books don't balance" — a CFO's phrase, not a diagnosis — into six specific, provable root causes, fix each one correctly, reconcile every subledger back to the GL, and close the period before the board meeting two days later.

## Action — six root causes, investigated and fixed

Use these as your concrete talking points. You don't need to recite all six in a short answer — pick one or two and go deep if asked.

1. **AP — unreversed GRNI accrual.** A goods-received-not-invoiced accrual on a Meridian Bearing Supply Co. purchase order never auto-reversed when the real invoice posted, leaving both the accrual and the invoice on the books at once. **Fix:** entered a manual reversing journal and verified the account balance zeroed out, matching AP aging to the GL again.
2. **AR — misapplied cash receipt.** A payment from Harborview Industrial Supply had been applied to the wrong invoice, making one invoice look paid that wasn't and one look overdue that was actually settled. **Fix:** unapplied the receipt and reapplied it to the correct invoice; verified both invoices showed accurate balances afterward.
3. **Fixed Assets — wrong category on a new asset.** A newly capitalized asset (a lathe) had been set up under the wrong category and cost center, which gave it the wrong useful life and overstated its monthly depreciation. **Fix:** processed a reclassification to the correct category and cost center, corrected the depreciation calculation, and verified the adjusted depreciation history.
4. **Cash Management — a bank-side duplicate.** A $9,200 ACH transmission had been sent twice by the bank, not by LTV — a reconciling item that looked like an internal error but wasn't. **Fix:** confirmed with the bank in writing, recorded their reversal, and completed the reconciliation — the one fix that required no GL correction at all, only documentation.
5. **Subledger Accounting — a missing account rule.** A batch of Receivables transactions for freight charges had no account rule mapping, so Create Accounting couldn't turn them into journals and they sat at status Incomplete instead of Final. **Fix:** added the missing mapping, reran Create Accounting for the affected batch, and confirmed every transaction moved to Final and posted to the GL.
6. **General Ledger — an unposted intercompany journal.** An intercompany allocation between the US and Canadian entities had never been submitted for posting, so each side's intercompany balance didn't tie. **Fix:** reviewed the allocation for accuracy and posted it, confirming both entities' intercompany balances netted to zero in consolidation.

## Result

All six root causes were resolved and independently verified before the period closed — not just patched. Every subledger (Payables, Receivables, Fixed Assets, Cash Management) reconciled to its GL control account, the intercompany elimination tied out across both entities, and the period closed in both ledgers in time for the CFO's board meeting. The real skill demonstrated isn't any single fix — it's the discipline of translating a vague complaint into six specific, provable problems and resolving every one correctly before declaring the close complete.

## Key terms

| Term | Meaning |
|---|---|
| STAR format | Situation, Task, Action, Result — a structured way to tell a work story in an interview |
| Root cause | The actual originating error, as opposed to the symptom a stakeholder first reports |

## Lab

Pick one of the six root causes above and write a 60-second spoken version of it alone, as if a follow-up question asked you to "go deeper on just that one."

## Check yourself

- Why describe LTV Manufacturing Corporation honestly as a training capstone rather than implying it was a real client?
- Which of the six root causes required no GL correction at all, and why?
- What is the one sentence that summarizes what this whole story is really demonstrating?
