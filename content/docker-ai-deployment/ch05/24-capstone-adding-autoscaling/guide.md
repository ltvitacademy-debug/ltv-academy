# Lesson 24 — Capstone: Adding Autoscaling

**Chapter 5 · Capstone · Lesson 24 of 25**

## What you'll learn

- A real autoscaling policy for FeedbackScope, with every number justified
- Why its scaling signal is request concurrency, not CPU (Lesson 17, applied)
- The health check that makes autoscaling and load balancing both work
- Where caching fits for this specific app, and where it deliberately
  doesn't

## Picking the signal: concurrency, not CPU

FeedbackScope's sentiment model is small enough to run on CPU, so unlike
a large-model GPU service, CPU usage here does roughly track load. But
this capstone scales on **concurrent requests per instance** instead,
because it's a more direct measure of "is this instance keeping up" than
CPU percentage is, and it's the same signal that generalizes cleanly to
a future, bigger model that *would* need a GPU:

```
Scaling signal: concurrent requests per instance
  target: 10 concurrent requests per instance

  < 10 concurrent per instance across the fleet -> stay put
  > 10 sustained                                -> add an instance
```

## The policy, with every number justified

```
min_instances: 1
  reason: a 1-2 second cold start (CPU model, no GPU wait)
          is tolerable for this low-traffic demo service

max_instances: 5
  reason: hard ceiling on cost -- this is a portfolio project,
          not a production service with real budget approval

target_concurrency: 10 requests/instance
  reason: measured from a local load test -- this is where
          p95 latency started climbing past 500ms
```

Min stays low because this app's cold start is genuinely short (Lesson
18's logic, applied to a CPU-only model instead of a GPU one — context
changes the right answer). Max stays low because this is a learning
project with a real (small) cloud bill attached to it. Neither number is
a framework default left untouched — that's the whole point, per Lesson
22's success criteria.

## The health check that ties it together

```
GET /health
  -> loads a tiny test sentence through the model
  -> 200 OK only if the model actually returns a result,
     not just "the process is running"
```

A health check that only confirms the process is alive would pass even
if the model failed to load — this one actually exercises the model,
so a broken deploy gets caught by the platform (and kept out of rotation)
instead of silently serving errors to real requests.

## Why this app skips semantic caching

```
FeedbackScope's inputs: short, highly varied customer feedback
  -> low repeat rate, low semantic overlap between requests
  -> a semantic cache would rarely hit, for real cost/complexity

A FAQ bot's inputs: the same handful of questions, reworded
  -> HIGH repeat rate -> semantic caching earns its keep there
```

Lesson 19 covered caching as a real cost lever — and also that it's not
automatically the right call for every app. FeedbackScope's traffic
pattern is exactly the case where the complexity isn't worth it: that's
a deliberate decision, not a missing feature.

## Key terms

| Term | Meaning |
|---|---|
| Concurrency-based scaling | Scaling on concurrent requests per instance, not raw CPU |
| Justified min/max | Each number tied to a measured reason, not a framework default |
| Real health check | Exercises the model itself, not just process liveness |

## Check yourself

You're ready for Lesson 25 when you can explain: why was skipping
semantic caching for FeedbackScope the right call, when Lesson 19 argued
caching usually saves real money for AI apps?
