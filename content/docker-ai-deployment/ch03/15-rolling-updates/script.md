# Script — Rolling Updates

## Segment 1 (title)

Where blue-green stands up a second full environment, a rolling update replaces a running service's instances gradually, inside the same environment.

## Segment 2 (code: a few instances at a time)

Starting from four old instances, each step swaps one more for the new version. The load balancer from Lesson 13 routes to whatever's currently healthy. There's never a moment with zero capacity — but there's also never a full standby copy sitting idle the way blue-green keeps one.

## Segment 3 (code: the two dials)

Two settings control how aggressive the rollout is. Max surge is how many extra instances can exist temporarily above your normal count. Max unavailable is how many can be down at once. A conservative rollout keeps unavailable at zero and surge small — slower, but capacity never drops.

## Segment 4 (code: the side-by-side window)

During the rollout, old and new versions genuinely serve traffic at the same time — for the whole duration, which can be minutes, not a brief instant. For an AI app, that means two different model checkpoints can be live and answering requests simultaneously.

## Segment 5 (outro)

The same question, asked twice during a rollout, can get two different — both technically correct — answers from two different checkpoints. That's usually fine for a one-off completion, but a real problem for anything expecting consistency across a session. Next up: what to actually do when the new version turns out to be the problem — rollback strategies.
