# Expense Report Corrections and Resubmission

Not every report sails cleanly through audit and approval. This lesson closes out Chapter 3 by covering what actually happens when a report gets sent back, and the practical difference between a rejection, a request for more information, and a correction after the fact — three situations that look similar but behave differently.

## What you'll learn

- What happens to a rejected report, mechanically
- How "request more information" differs from a full rejection
- How to correct a report that was already approved or even paid
- Why corrections matter for audit trail integrity

## Rejection sends the report all the way back

When an approver (or an audit rule configured to reject automatically) rejects an expense report, the report returns to the employee in an editable state with the rejection reason attached. Nothing about this report has posted anywhere yet, since rejection happens before accounting in the lifecycle. The employee can edit any item, add a missing receipt, correct an amount, or remove a questionable item entirely, then resubmit. Resubmission restarts the audit and approval stages from the beginning — a rejected-then-resubmitted report is not assumed to be fine just because it was reviewed once already.

## Request more information is a lighter touch

"Request more information" does not return full editing rights the way rejection does. Instead, it pauses the report and asks the employee a specific question — "please attach the itemized hotel folio" or "please clarify the business purpose of this entertainment expense." The employee responds (often just by attaching a document or adding a comment), and the report resumes at the point it paused, rather than restarting the entire audit and approval sequence. Castellan's approvers use this for small clarifications, and reserve full rejection for when something is actually wrong with the report, not just unclear.

## Correcting a report that already posted

The harder case is a report that has already been approved, accounted, or even paid, and then someone discovers an error — say, a Hotel item that was coded with the wrong GL account, or a per diem calculated against the wrong number of days. Oracle Fusion Expenses does not let anyone simply edit a posted transaction. Instead:

1. If the report has been accounted but not yet paid, standard practice is to put the specific invoice on hold in Payables and work the correction through Expenses before releasing it, rather than letting an incorrect payment go out.
2. If the report has already been paid, the correction happens through a reversing entry, not an edit: the original accounting entry is reversed (or adjusted through Subledger Accounting) and a corrected expense item or a separate adjustment is entered and run through its own mini-lifecycle.
3. An overpayment (say, a duplicate hotel item accidentally submitted twice) is typically recovered the same way an advance overage was handled in lesson 8 — a deduction against a future reimbursement or a manual repayment, tracked so finance can see it clearly.

```
Correction example - already-paid duplicate item (illustrative)
  Original: Hotel $825.00 (paid)
  Duplicate: Hotel $825.00 (paid in error, same trip)
  Correction: $825.00 deducted from employee's NEXT approved expense report,
              with a note explaining why
```

## Why this discipline matters

Every correction preserves a full audit trail — what was originally submitted, what was flagged, what changed, and why — rather than silently overwriting history. For Castellan's external auditors and for Oracle Fusion's own accounting integrity, a transaction that has already posted to the General Ledger is never simply edited; it is reversed and replaced, the same discipline you've already seen in Payables and General Ledger courses.

## Recap

Rejection restarts the full audit-and-approval cycle after the employee edits the report. Request more information is a lighter pause-and-resume that doesn't restart the whole sequence. Corrections to a report that has already posted or paid happen through holds or reversing entries, never a silent edit, to preserve the audit trail. This closes Chapter 3. Next up, Chapter 4 begins with lesson 14: how Expenses actually builds the accounting entries we've been assuming happen all along.
