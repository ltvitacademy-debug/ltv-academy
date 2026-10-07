# Script — Capstone: Build It

## Segment 1 (title)

You have a plan from the last lesson. Now you execute it — metrics first, then logs, then a trace, then the dashboard, then alerts last, because alerts without a working dashboard to validate them are just guesses.

## Segment 2 (steps)

Instrument metrics first: a request counter by endpoint and status, a duration histogram, and one saturation metric on your dependency — the same golden-signals shape from earlier in the course, not a new framework to learn. Then structured JSON logs with a correlation ID on every line for a given request, logged at the boundaries: request in, dependency called, request finished. Then one trace span around the call to your dependency, so you can see how much of the total time it ate.

## Segment 3 (steps)

Build four to six dashboard panels, no more — a wall of twenty panels nobody reads is worse than a focused one nobody has to hunt through. Traffic, latency at p50, p95, p99, errors by status code, saturation on your one dependency, and a breakdown by endpoint or job type if you have more than one. An optional panel pulling the top error messages from your logs rounds it out nicely.

## Segment 4 (code)

Alerts come last, built from your plan. Here's one example: p99 latency over one and a half seconds for five minutes pages someone, with a runbook linked right in the alert so the responder isn't improvising. Write two or three of these, one per golden signal that actually mattered, with a threshold you derived from watching your own service — not a guess, not copied from a tutorial.

## Segment 5 (outro)

That's a real, working observable service. Next up, lesson thirty-one: turning this finished build into something you can actually show in an interview.
