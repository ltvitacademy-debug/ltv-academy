# Script — Error Handling and Run After

## Segment 1 (title)

Every action in a flow can succeed, fail, time out, or get skipped — and by default, one failure anywhere stops the whole flow. Run After is the setting behind everything you're about to see.

## Segment 2 (screenshot)

Every action has a Run After setting with four checkboxes: is successful, has timed out, is skipped, has failed. By default, an action only runs when the previous one succeeded. Check has failed instead, and that action becomes your error path.

## Segment 3 (steps)

Checking boxes action by action doesn't scale, so the standard pattern groups your main logic into one Scope called Try, and your error handling into a second Scope called Catch, with Catch's Run After set to fire when Try has failed. A Scope's own success reflects whether anything inside it failed, so this gives you one clean failure path for an entire block of logic — exactly the shape of try-catch in any language.

## Segment 4 (screenshot)

Here it is wired up: Catch configured to run when Try has failed. For a flow calling an AI classification API, the HTTP call, the Parse JSON, and the database write all live inside Try — if the API rate-limits or returns bad JSON, Catch fires once and logs it, instead of the flow dying silently.

## Segment 5 (screenshot)

Sometimes the right move is to stop outright. Terminate ends the flow immediately and sets a status and message that shows up clearly in run history — so a quiet failure can't masquerade as a completed run.

## Segment 6 (outro)

A model endpoint can rate-limit, time out, or return malformed JSON as normal operating conditions, not bugs — which is why Run After, Scopes, and Terminate are baseline hygiene here, not an advanced topic. That's the chapter — foundations done. Up next, chapter two: introduction to AI Builder.
