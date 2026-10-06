# Expense Policies and Limits

Expense types tell the system what an employee can claim. Policies and limits tell the system (and the employee) how much is acceptable. This lesson covers how Oracle Fusion Expenses enforces dollar limits, how a violation is handled differently from a hard block, and how policies vary by employee attributes like grade or location.

## What you'll learn

- The difference between a policy limit and a hard validation
- How policy violations are handled — warning versus block versus flag for audit
- How policies can vary by role, grade, or geography
- How receipt and justification requirements tie into policy

## Policy limits are not always hard stops

A common misconception is that an Oracle Fusion policy limit works like a form validation that refuses to let an employee submit. In practice, Castellan Supply Co. configures most policy limits as **soft limits**: an employee can still enter $320 for a hotel room against a $275 policy limit, but the system flags the overage, requires a justification comment, and routes the item to the audit list for a human to evaluate. A true hard limit, which blocks submission entirely, is reserved for a small number of expense types where Castellan's finance leadership decided no justification should be possible — for example, a company car policy that prohibits any personal mileage reimbursement whatsoever.

This matters because it shapes how a consultant designs policy: most limits should guide behavior and create a paper trail, not stop a legitimate exception (a client dinner that ran long, a hotel booked on short notice in a city during a conference) from ever being recorded.

## How policy varies by who's asking

Policies in Expenses are not always a single number for a given expense type. They can vary by:

- **Employee grade or role** — a Castellan regional sales director might have a $350/night hotel limit while a field technician's limit is $140/night, reflecting both travel patterns and company hierarchy norms.
- **Geography** — a per diem meal allowance for Toronto is reasonably higher than for a small town in Ohio; policies can be built on rate schedules keyed to destination, which we cover in lesson 7.
- **Time** — Castellan can adjust its mileage reimbursement rate annually to track a government-published standard rate, without touching anything else in the policy.

```
Hotel policy limit — Castellan Supply Co. (illustrative)
  Field technician     : $140 / night
  Sales representative : $200 / night
  Regional director    : $350 / night
  Senior leadership     : no fixed cap, VP pre-approval required above $500
```

## Receipts and justification as part of policy

Policy is not only about the dollar ceiling. It also governs:

- **Receipt requirements** — Castellan requires an itemized receipt for any single expense item over $25, and specifically for all hotel folios regardless of amount, since a folio often bundles multiple expense types.
- **Justification requirements** — when a policy limit is exceeded, or when an expense type is inherently judgment-based (client entertainment, gifts), the employee must type a business purpose into a justification field before the report can be submitted.
- **Non-reimbursable flags** — some expense types are tracked for visibility but never reimbursed, like alcohol at certain client events under some corporate cultures, or personal items accidentally run through a corporate card.

## A worked example

Marcus Webb, a Castellan sales rep, takes a client to dinner and the bill comes to $410 for two people against a "Business Meal — Client Present" policy limit of $300. Here is what happens:

1. Marcus enters the expense item; the system flags it immediately as over policy.
2. Marcus is required to type a justification — he notes that the client flew in for a single meeting and the dinner was the only time available.
3. The item still submits, but it is marked for mandatory audit review (lesson 10 covers exactly how that flag gets attached).
4. His manager sees the overage and the justification together during approval and can approve, reject, or ask for more detail.

Nothing stopped Marcus from eating the meal or claiming it — but nothing let the overage pass invisibly, either.

## Recap

Policy limits in Expenses are usually soft guardrails that trigger justification and audit review rather than hard blocks, with a small number of true hard limits reserved for company-wide prohibitions. Policies can vary by grade, geography, and time, and receipt and justification rules are just as much a part of "policy" as the dollar ceiling itself. This closes out Chapter 1. Next up, Chapter 2 begins with lesson 5: actually creating an expense report from the employee's point of view.
