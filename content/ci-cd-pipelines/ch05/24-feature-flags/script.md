# Script — Feature Flags

## Segment 1 (title)

Lesson 23 made deploying safer by controlling how much traffic reaches new code. A feature flag controls something different — whether a feature is actually turned on at all, independent of whether it's deployed. Northbridge Retail deploys constantly, but a new feature might sit dormant for days before anyone flips it on.

## Segment 2 (steps)

Without flags, deploying and releasing are the same event — merge it, deploy it, it's live for everyone. A flag splits that in two. A new checkout feature can be merged and deployed to production today, completely inert, and turned on next week, or for five percent of customers first, or just internal staff.

## Segment 3 (code)

Here's a real flag check in application code: is_enabled asks the flag service, at request time, whether this flag is on for this specific user — not whether the code exists, which it already does on every running pod. The context dictionary is what lets a flag target a subset of users without touching this code again.

## Segment 4 (steps)

This changes what deploy means. Code can ship dark — present, flag off, nothing visible changes — which makes the deployment itself lower risk. A broken feature can be turned off instantly, no rollback or new build required. And a flag can be enabled just for staff in production, testing real infrastructure before any customer sees it.

## Segment 5 (steps)

Flags aren't free. Every flag is a branch in the code that has to be maintained, and one left behind after a feature fully ships is dead code with a decision buried in it. Northbridge Retail tracks an owner and a removal date for every flag at creation time.

## Segment 6 (outro)

A flag flip handles a feature that's misbehaving. It doesn't handle a deployment that's broken at a deeper level. That's rollbacks and recovery, next.
