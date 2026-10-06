# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

This lesson wraps up FeedbackScope and turns it into a real portfolio piece — not just a project that runs, but one you can actually explain.

## Segment 2 (steps: what it became)

Lesson 23 gave it a multi-stage Dockerfile, one instance, and platform defaults. Lesson 24 added concurrency-based autoscaling, a health check that actually exercises the model, and a deliberate decision to skip caching. The result is a containerized, deployed, autoscaled service where every configuration choice has a stated reason.

## Segment 3 (code: the interview talking point)

"I built a sentiment API and deployed it" is a weak answer. "I scaled on concurrency instead of CPU because that's what actually reflected load, and skipped caching because the traffic pattern didn't justify the complexity" is a strong one — it shows decisions, not just steps.

## Segment 4 (code: the README)

The README should cover what the service does, with a real example request and response, the Dockerfile and why it's built that way, the autoscaling policy with its justification, and one paragraph on what you'd add next with more time or budget. The reasoning is the actual portfolio piece — the code alone doesn't show the judgment calls behind it.

## Segment 5 (outro)

This course closes out the infrastructure side of the AI Engineer path — your app can now run somewhere, survive a release, and scale. Next up: AI Security, Evaluation & Monitoring, picking up exactly where a deployed service's real risks start.
