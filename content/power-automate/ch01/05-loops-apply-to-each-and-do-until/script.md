# Script — Loops: Apply to Each and Do Until

## Segment 1 (title)

Every flow so far has acted on one item, one request, one approval. Castlebridge Logistics' dispatch team needs more: check every unread email in a shared inbox, not just the first one. That's what a loop does — repeats a set of actions, once per item, or until a condition is finally met. Power Automate gives you two: Apply to each, and Do until.

## Segment 2 (screenshot)

Apply to each takes an array and runs its inner actions once per item. Here, a scheduled flow gets the last 10 unread inbox messages, then loops through each one, checking its subject and sender, with a condition from last lesson nested right inside the loop.

## Segment 3 (screenshot)

But the array has to exist before the loop can run on it. Here's the Get emails action configured to fetch unread messages from the inbox, with Top set to 10. That Top value is exactly the array Apply to each will loop over — ten emails, ten iterations.

## Segment 4 (screenshot)

Do until is the other loop. Instead of a fixed list, it repeats until a condition you specify becomes true, checking again after every pass. This one loops until a number equals 100, with Count and Timeout set as safety limits so it can't run forever if that number never arrives.

## Segment 5 (outro)

Already have a list? Apply to each. Waiting on a one-time state to change, with no list involved? Do until. Up next, Lesson 6: variables, where you'll start holding values a flow can read and update as it runs.
