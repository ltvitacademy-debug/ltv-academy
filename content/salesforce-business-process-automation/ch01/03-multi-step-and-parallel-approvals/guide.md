# Lesson 3 — Multi-Step and Parallel Approvals

**Chapter 1 · Declarative Business Logic · Lesson 3 of 18**

## What you'll learn

- How to add an individual **Approval Step** to an approval process, and what Step Criteria controls
- The difference between a **serial** (multi-step) and a **parallel** approval, and how to configure each
- How "approve or reject based on first response" differs from "require unanimous approval"
- How queues fit into approval routing when a role, not one specific person, should approve

## One approval step is rarely the whole story

Lesson 2 built the process-level configuration — entry criteria, editability, notification template — but a process with zero approval steps doesn't actually route to anyone. Each **Approval Step** you add is its own mini-configuration: its own criteria for which records reach it, and its own assigned approver.

For our discount approval example: a 10-20% discount might only need the sales manager's sign-off. A discount over 20% should also need the VP of Sales. That's two steps, run in sequence — a **serial** approval.

## Specify Step Criteria

Every approval step after the first starts with Step Criteria: should *all* records reaching this step enter it, or only records matching a condition? This is what makes multi-step approvals possible at all — Step 2 can require `Discount_Percent__c > 20`, so only the biggest discounts continue past the sales manager to the VP. Records at 15% stop after Step 1 and are simply approved.

## Select Assigned Approver — and parallel approval

The Assigned Approver screen is also where **parallel approval** gets configured. A single step can route to more than one approver at once — not one after another, but simultaneously. When a step has multiple approvers, you choose how their responses combine:

- **Approve or reject based on the FIRST response** — whichever approver responds first decides the outcome for that step. Fastest, but any one approver can single-handedly approve or reject.
- **Require UNANIMOUS approval from all selected approvers** — every assigned approver has to approve before the step passes; a single rejection stops it.

This is the real distinction between **serial** and **parallel**: serial is step 1, then step 2, then step 3 — different people, one after another. Parallel is multiple people assigned within the *same* step, responding independently.

You can combine both in one process: Step 1 might require unanimous approval from Legal and Finance in parallel, and only after both sign off does the record move to Step 2 for a single VP approval in serial.

## Assigning to a queue instead of a person

Rather than hard-coding one person's name as an approver (who goes on vacation, changes roles, or leaves the company), you can assign a step to a **Queue** — a group of users who share responsibility for a type of work. Any queue member can act on the request. This is the same Queues feature used for case and lead assignment, reused here for approval routing, and it's usually the more maintainable choice for any team larger than one person.

## Recap

- Each Approval Step has its own Step Criteria, which is what makes sequential, conditional routing (multi-step) possible.
- Parallel approval means multiple approvers on *one* step, resolved by first-response or unanimous rules.
- Serial and parallel aren't mutually exclusive — a real process often nests parallel approval inside one step of a multi-step sequence.
- Assigning a step to a Queue avoids hard-coding a single person's name into the process.

## Try it yourself

Add a second Approval Step to the discount approval process from Lesson 2. Set its Step Criteria to only enter when `Discount_Percent__c > 20`, and assign it to a Queue rather than an individual user.

## Check yourself

Your process has one step with two approvers set to "require unanimous approval." One approver rejects immediately; the other hasn't responded yet. What happens to the record?
