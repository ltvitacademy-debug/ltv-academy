# Procure-to-Pay Troubleshooting Practice

LTV Manufacturing Corporation's bearing transaction was clean from end to end. Real support tickets rarely are. This lesson is a practice run through the troubleshooting instinct this entire course has been building: starting from a symptom and tracing it back to a cause, using the checkpoints from lesson 22 as your map.

## What you'll learn

- A repeatable method for tracing a P2P symptom back to its cause
- Three realistic support scenarios and how to work through each one
- Which lesson in this course covers the mechanism behind each scenario
- Why "where in the chain are we" is always the first question

## A method, not a memorized list

Every P2P problem a consultant is handed starts as a symptom reported by someone who only sees their own stage of the process — "my requisition disappeared," "this invoice won't pay," "the numbers don't match." The method is always the same: identify which document is actually being asked about, identify its current status, and walk backward (or forward) along the chain of document numbers — requisition, purchase order, receipt, invoice — until you find the specific checkpoint that has not resolved the way lesson 22 describes as clean.

## Scenario 1: "My requisition has been sitting there for three days"

A requester reports this, convinced something is broken. Start with status: is the requisition still Pending Approval? If so, this is almost certainly sitting in an approver's worklist (lesson 7), not lost — the fix is finding out who the approver is and following up with them, not touching the requisition itself. If instead it shows Approved but no purchase order exists, the next place to check is whether it has been picked up in a buyer's Process Requisitions queue yet (lesson 9).

## Scenario 2: "This invoice from one of our suppliers won't pay"

An AP processor reports this. The first question is whether the invoice has a hold, and what kind. A **matching hold** (lesson 19) means the invoice fell outside tolerance against the purchase order or receipt — check whether the invoiced quantity or price actually differs from what was ordered or received, and whether a receipt even exists yet for the full quantity. If there is no matching hold but the invoice still will not pay, check for other holds from validation (lesson 20), such as a tax calculation issue or an incomplete distribution.

## Scenario 3: "There's an accrual balance that won't go away"

A controller reports this during close. Following lesson 22's accrual reconciliation approach, the first step is identifying which specific receipt the lingering balance belongs to, then checking whether an invoice for it exists anywhere in the system. If no invoice exists, the supplier likely has not billed yet — a question for the buyer, not an accounting error. If an invoice does exist but hasn't been accounted, it is likely sitting on a hold somewhere, which loops back to scenario 2's checklist.

## Why "where in the chain" is always the first question

All three scenarios resolve the same way: find the document, find its status, and compare that status against what lesson 22 described as the clean path. A consultant who has internalized the full chain — requisition, purchase order, receipt, invoice, payment, GL — can answer "where is this stuck and why" far faster than one who only knows their own module well.

## Recap

Troubleshooting P2P issues is a repeatable method: identify the document, find its actual status, and compare it to the clean checkpoints from lesson 22 to locate where the chain diverged. The three scenarios practiced here — a stuck requisition, an unpaid invoice, and a lingering accrual — each map back to a specific earlier lesson's mechanism. Next up, Chapter 6: replaying the full cycle in one sitting, then working through exception scenarios where things genuinely go wrong.
