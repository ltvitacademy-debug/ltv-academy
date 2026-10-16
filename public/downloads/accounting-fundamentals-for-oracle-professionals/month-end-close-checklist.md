# Month-End Close Checklist

A ready-to-use checklist built from Lesson 29 (Month-End and Year-End Close Overview). Copy this
into your own close procedure and fill in actual dates and owners for your organization or your
Oracle Fusion Financials client.

## Month-end close (every period)

- [ ] **1. Cut off transaction entry.** Lock new postings to the period being closed so the
      numbers hold still while under review.
- [ ] **2. Complete subledger close.** Confirm Payables, Receivables, and other subledgers have
      processed all activity and summarized it to the General Ledger (see "the general ledger
      and subledgers," Lesson 16).
- [ ] **3. Record adjusting entries.** Accruals, deferrals, and depreciation (Lessons 15, 22, 23)
      for anything without a natural paper trail yet.
- [ ] **4. Reconcile key accounts.** Confirm account balances — Cash especially — match external
      sources like bank statements.
- [ ] **5. Review the trial balance.** Confirm debits equal credits, and that balances look
      reasonable given what you know about the business (Lessons 17–18). If it doesn't balance,
      use the troubleshooting checklist below before moving on.
- [ ] **6. Generate financial statements.** Income statement, balance sheet, and cash flow
      statement (Lessons 25–27).
- [ ] **7. Management review.** Someone reviews the statements for anything that looks wrong
      before they're finalized.
- [ ] **8. Close the period.** Lock it against further postings (Lesson 21).
- [ ] **9. Post reversing entries.** For the new period, where applicable (Lesson 15).

## Additional steps at year-end only

- [ ] **Close temporary accounts.** Zero out revenue and expense accounts, rolling their net
      effect into Retained Earnings (Lesson 11), so the new fiscal year's income statement starts
      from zero.
- [ ] **Run deeper annual reconciliations and reviews**, often including external audit
      involvement.
- [ ] **Permanently close older periods** that are unlikely to ever need adjustment again
      (Lesson 21).
- [ ] **Prepare annual financial statements and disclosures**, often to a more rigorous standard
      than monthly internal reporting.

## If the trial balance doesn't balance (Lesson 18)

1. Re-add both trial balance columns — rule out a simple addition mistake first.
2. Compare this period's trial balance to last period's — did an account that's usually there go
   missing, or did a new, unexpected account appear?
3. Scan for one-sided entries — a journal line with no apparent counterpart.
4. Divide the dollar difference by 9 — a whole-number result suggests a transposition error
   (digits swapped when keying an amount).
5. Divide the dollar difference by 2 — a whole-number result suggests an amount posted entirely
   to the wrong side instead of being split correctly.
6. As a last resort, re-verify each journal entry's own internal balance, one at a time, starting
   with the most recent and largest.

## Why close speed and accuracy matter

A "fast close" — completing this checklist accurately within a few business days of period-end —
is one of the most visible signs of a well-run accounting department and a well-configured
accounting system. This is exactly the kind of problem Oracle Fusion Financials implementations
are brought in to solve: automating subledger-to-GL summarization, automating reversing entries,
standardizing reconciliation reporting, and giving a close team visibility into exactly where they
are in this checklist at any moment.
