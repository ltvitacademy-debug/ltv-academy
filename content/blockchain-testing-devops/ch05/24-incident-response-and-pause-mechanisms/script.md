# Script — Incident Response & Pause Mechanisms

## Segment 1 (title)

Lesson 23 got an alert into a human's inbox. This lesson is about what happens in the minutes after that -- because an alert firing is the start of an incident response process, not the end of one.

## Segment 2 (screenshot: alert detail, disable / trigger test)

The first real step isn't code -- it's a person looking at exactly what fired, deciding whether it's a real incident or a false positive, and only then deciding what to do next. Disabling a noisy rule and escalating a real one are both actions taken from this same screen.

## Segment 3 (screenshot: alert history)

A full, timestamped history of everything that's fired -- not just the most recent alert -- is what lets a team reconstruct what actually happened, in what order, once the immediate fire is out. That record becomes the raw material for Lesson 25's postmortem.

## Segment 4 (screenshot: alert destinations / PagerDuty)

Not every alert deserves the same urgency. A routine check-in can go to email. Something that needs a human awake and responding right now goes to PagerDuty or an on-call rotation -- severity-based routing, not every alert treated identically.

## Segment 5 (steps: what a pause mechanism buys)

A pause mechanism -- a circuit breaker built into the contract -- doesn't fix anything; it buys time, stopping new deposits and withdrawals while the team investigates. Who can actually pull it matters just as much: Chapter 3, Lesson 16's case for multisig-controlled deployments applies here too, not a single engineer's key. And it has limits -- funds already moved before the pause stay moved.

## Segment 6 (outro)

The pause bought the team time to investigate and stopped the bleeding. What it hasn't done yet is tell anyone -- users, other teams, the public -- what actually happened. Lesson 25 covers that: post-incident communication and the postmortem itself.
