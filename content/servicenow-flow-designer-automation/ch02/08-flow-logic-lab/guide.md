# Lesson 8 — Flow Logic Lab

**Chapter 2 · Flow Logic & Data · Lesson 8 of 27**

## What you'll learn

- How to combine flow variables, data pills, If/Else, and For Each in a single real flow
- How to design the flow before building a single step in Flow Designer
- How to decide which pieces of data need a flow variable vs. a data pill
- Where the If/Else and For Each constructs each belong in the finished design
- How to walk the design end to end and verify it against the scenario

## The scenario

Equipment Requests, a common catalog process, works like this at
most organizations: an employee submits a Request for one or more
pieces of equipment (a laptop, a monitor, a headset), each submitted
as a separate Requested Item under that one Request. Once a manager
approves the Request, two things need to happen. First, any
Requested Item costing more than $1,000 needs an extra approval step
from IT Asset Management before it can be fulfilled — cheaper items
skip straight to fulfillment. Second, every approved Requested Item,
regardless of cost, needs its own fulfillment task created so the
hardware team knows exactly what to prepare and ship.

This lesson designs the flow logic for that process in writing,
using the exact four building blocks from this chapter: the trigger
and its data pills, a flow variable for the cost threshold, an
If/Else to branch on cost, and a For Each to loop over every
Requested Item on the Request.

## Step 1 — Define the trigger and its data pills

The flow triggers on **Request Approved** (a record trigger on the
Request table, condition: Approval = Approved — the same
field/operator/value pattern from Lesson 6). The trigger immediately
exposes pills for the Request record itself: Requested For, Number,
and so on. None of the Requested Item detail lives on this trigger
record directly — that has to be pulled separately, which is exactly
what Step 2 is for.

## Step 2 — Define the flow variable

Before building any logic, define one flow variable:
`extra_approval_threshold`, type Integer, default value 1000. This
value doesn't come from any record — it's a business rule the
organization sets, so it belongs in the Flow Variables panel, not as
something pulled from a trigger or action output. Defining it once
here means every later step that needs the threshold references the
same variable, instead of the number 1000 being retyped (and
potentially mistyped) in multiple places.

## Step 3 — Look up the Requested Items

Add a **Look Up Records** action: table Requested Item, filter
Request = [trigger record's Number pill]. This produces a
multi-record pill — call it `requested_items_list` — holding every
Requested Item tied to the approved Request. This pill is what Step 4's
For Each will iterate over.

## Step 4 — The For Each loop

Add a **For Each** step, iterating over `requested_items_list`. Every
action placed inside this loop body runs once per Requested Item, and
on each pass, Flow Designer exposes a current-item pill for that
specific item's fields — Price, Short Description, and so on.

## Step 5 — The If/Else inside the loop

Inside the For Each's loop body, add an **If/Else** step with the
condition: current item's Price **is greater than**
`extra_approval_threshold` (the flow variable from Step 2, not a
hard-coded 1000). The If branch (true — item costs more than the
threshold) runs an "Ask for Approval" action addressed to the IT
Asset Management group. The Else branch (false — item costs
$1,000 or less) skips straight past approval.

## Step 6 — Create the fulfillment task

Still inside the For Each, after the If/Else branches reconverge (or
as the final action in each branch), add a **Create Record** action
on the Task table, with Short Description built from the current
item's description pill, and Assignment Group set to the hardware
team. Because this action sits inside the loop body, it runs once
per Requested Item — one fulfillment task per item, every time,
regardless of how many items the Request contained.

## Walking the design end to end

A Request with three Requested Items — a $400 monitor, a $1,500
laptop, and a $250 headset — gets approved. The trigger fires once.
The Look Up Records step returns all three items as one list pill.
The For Each loop runs three times. On the $400 and $250 passes, the
If/Else evaluates false against the threshold and skips the extra
approval; on the $1,500 pass, it evaluates true and routes to IT
Asset Management first. All three passes end by creating their own
fulfillment task — three tasks total, one approval request, zero
retyped logic.

## Key terms

| Term | Meaning |
|---|---|
| Record trigger | A flow trigger firing on a table condition, here Request with Approval = Approved |
| extra_approval_threshold | The flow variable defined once to hold the $1,000 cost cutoff |
| requested_items_list | The multi-record pill from Look Up Records that the For Each iterates over |
| Current item | The per-pass pill inside the For Each representing one specific Requested Item |

## Check yourself

Walk through the design once more on your own: for a Request with
one $2,000 laptop and one $50 cable, how many times does the For
Each loop run, how many times does the If branch fire versus the
Else branch, and how many fulfillment tasks exist once the flow
finishes?
