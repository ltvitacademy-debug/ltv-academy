# Lesson 18 — Catalog Automation Lab

**Chapter 5 · Service Catalog Automation · Lesson 18 of 27**

## What you'll learn

- How to trace a full catalog fulfillment flow from trigger to final outcome, on paper first
- How to decide, with real numbers, when a request needs one approval stage or two
- How to wire a cost-based If/Else to the right approval path for each case
- How to handle the rejected path without leaving the requester or the record in limbo
- Why planning the whole flow before opening Flow Designer catches gaps a canvas won't

## The scenario

You're automating fulfillment for "New Software License Request," a
catalog item from Course 3's Chapter 3 with two variables: Software
Name (single-line text) and License Cost (currency). The business
rule you're told to implement: a license under $500 needs only
Manager approval. A license of $500 or more needs Manager approval,
and only after that, a separate Finance approval. Either rejection —
Manager's or Finance's — should notify the requester and close out
the request instead of leaving it open. This lab walks the flow
end to end before you'd ever open the Flow Designer canvas, the same
way you'd sketch logic before writing code.

## Step 1 — Wire the trigger

Following Lesson 16, the flow's trigger is a Service Catalog trigger
set to "Requested Item Created," with its condition filtering on
`cat_item` equal to "New Software License Request." That filter is
what keeps this flow from firing on every other catalog item in the
system — a request for a laptop or a monitor never touches this
flow at all. The triggering Requested Item record is now available
to every step that follows, carrying both variables as data pills.

## Step 2 — Read the License Cost variable

The flow's next step reads the License Cost variable off the
triggering Requested Item, exposing it as a data pill the rest of the
flow can reference. Nothing is calculated yet — this step only makes
the requester's actual answer available, the same way Lesson 16
described variable values flowing from the catalog item into the
flow.

## Step 3 — Branch on cost with If/Else

An If/Else condition compares the License Cost pill against 500,
using "is less than." Under $500, the If branch runs a single
Approval action targeting the requester's manager — one stage,
exactly the shape from Lesson 17's "sequential chain of one." At
$500 or more, the Else branch runs the same Manager Approval action
first, but this time followed by a second If/Else checking that
outcome: approved routes into a Finance Approval action (configured
as "all," since the business wants every finance approver to sign
off on an expensive license), while rejected skips Finance entirely
and drops straight into the rejection path built in Step 4. This is
the sequential chaining pattern from Lesson 17, applied to a real
threshold instead of a hypothetical one.

## Step 4 — Handle rejection, wherever it happens

Both the under-$500 branch and the $500-plus branch can end in
rejection — Manager rejects the cheap license, or Manager approves
but Finance rejects the expensive one. Rather than building two
separate rejection sequences, both paths route into one shared
rejection path: a notification action (Lesson 9) tells the requester
their request was not approved, and an Update Record action closes
the Requested Item instead of leaving it open indefinitely. A
Requested Item that's rejected but never closed is a real support
burden later — someone eventually has to notice it and close it by
hand, which this flow avoids entirely.

## Step 5 — Trace the approved path to fulfillment

When every applicable approval stage is approved — Manager alone for
the cheap license, or Manager then Finance for the expensive one —
both paths converge on the same fulfillment step: an Update Record
action marks the Requested Item as fulfilled, and a notification
action confirms the license is ready. The business rule is fully
satisfied with exactly one flow, one trigger, and one threshold
check, instead of two separate catalog items doing nearly identical
work.

## Key terms

| Term | Meaning |
|---|---|
| Threshold branch | An If/Else comparing a numeric variable (like License Cost) against a fixed value to choose an approval path |
| Shared rejection path | One rejection sequence reused by every branch that can end in rejection, instead of duplicating it |
| Fulfillment step | The Update Record and notification actions that run once every required approval has cleared |
| Sequential chain of one | A single Approval action used alone, with no second stage chained after it |

## Check yourself

Walk through the $500-plus branch out loud, naming every step in
order: trigger condition, variable read, first approval, the check on
its outcome, the second approval, and both of its possible outcomes.
If you can't name all six without looking back, re-read Step 3 before
moving to Chapter 6.
