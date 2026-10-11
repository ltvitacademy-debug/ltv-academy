# Script — Preventing Runaway Agents

## Segment 1 (title)

Runaway doesn't mean hostile. It means an agent loop that keeps running without making progress — retrying the same failed call, bouncing between tools, never recognizing it's stuck. Anthropic's own guidance on building agents is explicit: include stopping conditions, like a maximum number of iterations, to maintain control.

## Segment 2 (code: three limits)

One counter isn't enough, because a runaway loop blows past a budget in different ways. Max iterations catches a loop doing different things but never converging. Max wall-clock time catches one that's slow per step even within budget. Max repeat calls catches the narrow, common case — literally retrying the same failing call — and that one should trip fastest.

## Segment 3 (steps: when a limit trips)

Hitting a limit should never be silent. The loop stops, but the system reports what the agent was trying to do, how far it got, and which limit caught it. A stopped state has to be as legible as a normal completion, not a confusing half-finished result.

## Segment 4 (steps: complements approval, doesn't replace it)

And this isn't a replacement for Chapter 4's approval checkpoints — it's a different layer. Approval stops one risky action. These limits stop the loop itself from running forever, even if every individual call was safe and pre-approved. Unbounded time and cost is its own risk.

## Segment 5 (outro)

Limiting how long an agent can run is only half the budget question. Next up: limiting what it can spend and do while it runs — cost and action limits.
