# Lesson 7 — For-Each Loops in a Flow

**Chapter 2 · Flow Logic & Data · Lesson 7 of 27**

## What you'll learn

- What For Each does, natively, inside Flow Designer
- Where a For Each gets its list of items to loop over
- How actions inside the loop run once per item, not once total
- A real example: one task created per approved Requested Item
- How For Each differs from, and can combine with, If/Else

## Looping without a script

If/Else branches a flow's path once. Plenty of real processes need
more than a single branch — they need to repeat the same set of
actions multiple times, once for every item in a list. Flow
Designer's native **For Each** construct does exactly that: point it
at a list or array, and it runs its defined actions once per item in
that list, with no scripting required.

## Where the list comes from

A For Each always needs something to iterate over, and that
something is itself a data pill — typically the output of an earlier
step that returned multiple records rather than one. A "Look Up
Records" action configured to return every Requested Item associated
with a Request produces exactly that kind of list output. Drag that
multi-record pill into the For Each step's input, and the loop now
has something to iterate.

## What happens inside the loop

Everything placed inside a For Each's loop body runs once per item,
and on each pass, Flow Designer exposes a new pill representing
"the current item in this iteration" — so an action inside the loop
can reference that specific Requested Item's price, short
description, or any other field, exactly the way it would reference
a trigger's data pill. If the Request has three Requested Items, the
loop body runs three separate times, once with each item bound as
the current item.

## A real example

Picture a flow triggered when a Request moves to an approved state.
A "Look Up Records" step returns every Requested Item tied to that
Request. A For Each loop takes that list, and inside its loop body a
single "Create Record" action builds a fulfillment task — one task
per Requested Item, referencing that specific item's current-item
pill for the task's short description and assignment group. A
Request with five approved items ends the flow having created five
separate fulfillment tasks, without the flow needing five separately
built, hand-copied sets of steps.

## Combining For Each with If/Else

For Each and If/Else aren't mutually exclusive — an If/Else can live
inside a For Each's loop body, branching differently for each item on
every pass. A loop over Requested Items might include an If/Else
checking each item's cost against a threshold: items under the
threshold get a fulfillment task immediately, items over the
threshold get routed to an extra approval step first — all within the
same loop, evaluated fresh for each item.

## Key terms

| Term | Meaning |
|---|---|
| For Each | A native Flow Designer construct that runs its actions once per item in a list |
| List/array pill | A data pill representing multiple records, typically from a "Look Up Records" step |
| Current item | The pill representing the specific item bound during one pass through the loop |
| Loop body | The set of actions placed inside the For Each that runs on every iteration |

## Check yourself

A Request has four approved Requested Items. A For Each loop
contains a single "Create Record" action. Without looking back: how
many fulfillment task records does the flow end up creating, and
what pill does each Create Record action reference to fill in that
task's details?
