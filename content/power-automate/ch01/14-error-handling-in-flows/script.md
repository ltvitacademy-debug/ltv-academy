# Script — Error Handling: Configure Run After and Try/Catch Patterns

## Segment 1 (title)

Every flow you've built so far assumed the happy path. Castlebridge Logistics' freight-claim flow writes a status back to Dataverse as its last step, and that step can fail — a timeout, a throttled connection, a permission nobody warned you about. Lesson 14 covers Configure run after and the try, catch pattern built on top of it.

## Segment 2 (screenshot)

Every action has a Configure run after setting, and by default it only runs when the previous step succeeds. Uncheck that and tick has failed instead, and the same action becomes an error branch — exactly how Castlebridge Logistics turns a plain notification email into one that only fires when the Dataverse update actually breaks.

## Segment 3 (screenshot)

Run After handles one action at a time. For a whole sequence, group your main steps into a scope named Try, add a second scope named Catch, and set Catch's Run After to trigger when Try has failed. That's a try, catch pattern, built entirely out of scopes and run after settings.

## Segment 4 (steps)

There are four Run After conditions in total: is successful, has failed, is skipped, and has timed out, and you can tick more than one on the same action. Inside a Catch scope, the result function returns exactly what failed inside Try, so your notification can say what actually broke instead of just that something did.

## Segment 5 (outro)

You can now build a flow that notices its own failures instead of failing silently. That's also the last new skill before Chapter 1 wraps — Lesson 15 covers scheduled and recurring flows, and then Business Process Automation is complete.
