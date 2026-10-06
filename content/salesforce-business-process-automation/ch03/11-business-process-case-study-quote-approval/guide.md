# Lesson 11 — Business Process Case Study: Quote Approval

**Chapter 3 · Applied Automation · Lesson 11 of 18**

## What you'll learn

- How to take a vague business complaint and turn it into approval-process requirements
- A full worked design for a discount approval process, using only tools from Chapters 1-2
- Why entry criteria, approver assignment, and locking have to be decided together, not one at a time
- What an audit trail actually buys the business once the process is live

> **Fictional case study.** Harborline Industrial Supply is an invented company used to walk through a realistic scenario. No real company, data, or Salesforce org is represented.

## The business problem

Harborline Industrial Supply sells bulk fasteners and hardware to contractors. Sales reps could discount a quote by any amount, and "approval" meant forwarding an email to a manager and waiting. Finance had three complaints: deals stalled for days waiting on a reply, two reps were discounting 30%+ without anyone above them signing off, and there was no record of who approved what. None of that is a Salesforce problem yet — it's a business problem. The job of this lesson is translating it into one.

## Turning the complaint into requirements

Three complaints became three requirements:

- Any quote with a discount over 10% must be approved before it can be sent to the customer.
- A deeper discount (over 25%) needs a more senior approver than a first-line manager.
- Every approval and rejection must be logged automatically, with no extra data entry.

That maps directly onto the Approval Process and multi-step approval tools from Lessons 2 and 3 — this case study doesn't need anything new, just a correct design.

## The approval design

```
Approval Process: "Quote Discount Approval"
Entry Criteria:
  Quote.Status = "Submitted"
  AND Quote.Discount_Percent__c > 10

Approval Steps:
  Step 1  Discount 10-25%   -> Approver: Quote Owner's Manager
  Step 2  Discount > 25%    -> Approver: Sales Director (specific user)

Record Locking:  ON while pending
Final Approval:   Status = "Approved", unlock record
Final Rejection:  Status = "Rejected", unlock record, email alert to owner
```

A quote under 10% never enters the process at all — the entry criteria is the first line of defense, and it's cheaper to get it right than to fix it after reps start filing tickets about quotes that shouldn't have been routed.

## Why the design holds together

Locking isn't an afterthought here — if the record stayed editable while pending, a rep could change the discount after submitting it and the approver would be reviewing stale numbers. Unlocking only happens in the two final actions, approval or rejection, so there's never a gap where the record is both "pending" and editable. The two-step structure also means a 12% discount never reaches the Sales Director's queue — only deals large enough to justify their attention do, which is the entire point of tiering approvers by severity instead of routing everything to the top.

## The result

Every approval decision now lives in the Quote's Approval History related list automatically — no separate log, no manual entry. Average turnaround dropped from days to under one business day once managers had the request sitting in their own approval queue instead of an email they could lose track of.

## Key terms

| Term | Meaning |
|---|---|
| Entry criteria | The condition that decides whether a record enters an approval process at all |
| Approval step | One tier of a multi-step process, with its own criteria and approver |
| Record locking | Preventing edits to a record while an approval is pending |

## Check yourself

You're ready for Lesson 12 when you can explain why Harborline's entry criteria checks `Discount_Percent__c > 10` instead of just routing every submitted quote through both approval steps.
