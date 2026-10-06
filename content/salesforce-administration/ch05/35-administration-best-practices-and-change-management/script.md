# Script — Administration Best Practices and Change Management

## Segment 1 (title)

Every lesson so far has covered one feature. This one is different — it's about how those features actually get used together, day to day, by an admin trying not to break anything. None of it is a new button. It's judgment, built from everything already covered.

## Segment 2 (steps: the full loop)

The pieces chain together into one loop: build and test in a sandbox, never production. Move it with a Change Set, deliberately, reviewed. Watch for Release Updates that might interact with what just shipped. And if anything looks off afterward, Setup Audit Trail and Login History are the fastest way to confirm what actually happened.

## Segment 3 (steps: three questions)

Change management, stripped down, is three questions asked before every change, not after. What exactly is changing, and why — specifically, not vaguely. Who else does this affect, beyond the one team that asked for it. And how would this get rolled back if it's wrong — if the honest answer is "not sure," that's a reason to slow down.

## Segment 4 (steps: documentation)

A setting changed six months ago with no note why is a trap for the next admin — including a future version of the same admin. A change log entry, a Flow comment, a filled-in description field costs almost nothing now and saves real time the first time someone has to ask why it's there.

## Segment 5 (outro)

Next up, the final lesson of this course: a case study pulling everything together — onboarding a new sales team from the ground up.
