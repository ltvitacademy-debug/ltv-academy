# Lesson 25 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 25 of 25**

## What you'll learn

- The full before-and-after of FeedbackScope, start to finish
- How to turn this project into a real interview talking point, not just
  a GitHub repo nobody opens
- What to actually put in the repo and README so the work speaks for itself
- Where the AI Engineer path goes next, and why this course had to come
  before it

## What FeedbackScope actually became

```
Lesson 23: a Dockerfile, one multi-stage build,
           one instance, defaults only

Lesson 24: concurrency-based autoscaling (min 1, max 5),
           a health check that exercises the real model,
           a deliberate decision to skip caching

Result: a containerized, deployed, autoscaled AI service
        where every configuration choice has a stated reason
```

That's the actual deliverable of this course: not "I deployed something
once," but a specific, defensible set of decisions about how it's
packaged, deployed, scaled, and kept reliable — the same decisions a
real production AI service needs, made at a small, learnable scale.

## Turning it into an interview talking point

```
Weak answer:  "I built a sentiment analysis API and deployed it."

Strong answer: "I containerized it with a multi-stage build to keep
  the image small, baked the model weights in at build time to avoid
  a cold-start penalty, and scaled on concurrent requests per instance
  instead of CPU because that's what actually reflected load for this
  workload. I also decided NOT to add semantic caching, because the
  traffic pattern didn't justify the complexity."
```

The second answer works because it shows *decisions*, not just steps —
an interviewer asking "why" gets an immediate, specific answer instead
of "that's just what the tutorial said." That's exactly why Lesson 22
set "explain every choice" as the real success criterion, not "it runs."

## What belongs in the repo

```
README should cover:
  - what the service does, with a real example request/response
  - the Dockerfile, and WHY it's built the way it is
  - the autoscaling policy, with the same justification from Lesson 24
  - one paragraph on what you'd add next with more time/budget
    (e.g. semantic caching if traffic patterns changed)
```

A one-line README ("sentiment API, see code") wastes everything this
capstone built. The reasoning is the portfolio piece — the code alone
doesn't show the judgment calls behind it.

## Where this path goes next

Docker & Deployment for AI Applications closes out the infrastructure
side of the AI Engineer path: your AI app can now actually run somewhere,
survive a release, and scale. The next course, **AI Security, Evaluation
& Monitoring**, picks up exactly where a deployed service's real risks
start — prompt injection, eval datasets, drift detection, hallucination
monitoring, and the governance layer a production AI system needs once
it's live and actually serving real users.

## Key terms

| Term | Meaning |
|---|---|
| Decision-based portfolio story | Explaining why, not just what — the thing an interviewer actually probes |
| README as portfolio piece | Documents the reasoning, not just "how to run this" |

## Check yourself

You've completed Docker & Deployment for AI Applications when you can
explain FeedbackScope's Dockerfile, deployment, and autoscaling policy
out loud, from memory, with a reason for every choice — no notes.
