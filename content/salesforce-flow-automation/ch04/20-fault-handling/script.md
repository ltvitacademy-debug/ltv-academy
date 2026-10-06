# Script — Fault Handling

## Segment 1 (title)

Flows fail. Not because your logic is wrong — a validation rule blocks the save, a required field is empty, a duplicate rule steps in. Fault paths are how you decide what happens the instant that failure hits, instead of letting your user see a generic, unhelpful error.

## Segment 2 (steps: the three-part shape of fault handling)

Get Records, Create Records, Update Records, Delete Records, and Action elements can all fail at run time, and each one can carry a fault path — a second connector, separate from its normal success path. When the element throws an unhandled fault, the flow follows that red dashed connector instead of crashing with a generic message. What you build on the other end is up to you — usually a Display Text screen or a log step that actually tells someone what happened.

## Segment 3 (screenshot: fault path on canvas)

Here it is on a real canvas: Create Opportunity has two ways out — the normal connector continuing to End, and a second red dashed Fault connector running to its own End. That second path only runs if the create actually fails.

## Segment 4 (screenshot: Add Fault Path menu)

You attach it from the element's own menu — the same one with Copy, Cut, and Delete. Add Fault Path is right there, and clicking it draws that second connector for you to build out.

## Segment 5 (screenshot: FaultMessage display text)

And this is the part that actually matters: a Display Text element reading the $Flow.FaultMessage global variable. That's not a paraphrase — it's the real system error, REQUIRED_FIELD_MISSING or whatever actually happened, shown to whoever needs to see it.

## Segment 6 (outro)

One more thing worth saying out loud: handling a fault isn't the same as hiding it. A path that quietly shows "something went wrong, try again" fixes the crash but not the problem — nobody ever finds out a required field is missing. Decide, deliberately, who sees the real message. Next up: Flow Testing and Debugging, for catching these failures before your users ever do.
