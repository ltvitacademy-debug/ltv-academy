# Lesson 18 — Handling Cold Starts

**Chapter 4 · Scaling & Reliability · Lesson 18 of 25**

## What you'll learn

- What actually happens, step by step, during a cold start
- Why an AI service's cold start is dramatically longer than a typical
  web service's
- The three practical mitigations, and the real trade-off each one makes
- How this connects back to Lesson 17's min-instances floor

## What a cold start actually is

A "cold start" is the delay between a new instance being asked to start
and that instance being ready to actually serve a request — paid by
whichever request triggers the scale-out:

```
1. Platform decides to start a new instance
2. Pull the container image (Lesson 6's registry)   <- bigger image = slower
3. Start the container, run the application
4. Load the model weights into memory (or GPU memory)  <- the big one
5. Any warmup inference pass, if the app does one
6. NOW ready to serve the triggering request
```

A typical stateless web service skips most of step 4 entirely — there's
no multi-gigabyte model to load, so cold start is close to "start the
container, done." An AI service's cold start is dominated by step 4:
model weights can be gigabytes, and loading them into GPU memory is
measured in seconds to low minutes, not milliseconds.

## Why it's worse for AI specifically

```
Web service cold start:   roughly 1-5 seconds
AI service cold start:    roughly 30 seconds - 2+ minutes
  (multi-GB image pull + multi-GB model load into GPU memory)
```

That gap is the whole reason Lesson 17 said "scale to zero" is often the
wrong call for a latency-sensitive AI service: a user who triggers a cold
start isn't waiting a second or two, they're waiting long enough to
plausibly give up and leave.

## Three mitigations, three trade-offs

```
1. Keep a min-instances floor above zero (Lesson 17)
   Trade-off: you pay for idle capacity around the clock

2. Pre-warm / provisioned concurrency
   Start replacement instances BEFORE traffic needs them
   Trade-off: still costs idle capacity, plus added complexity

3. Smaller, faster-loading models or quantized weights
   Trade-off: a real quality/latency trade-off in the model itself,
   not just an infra knob
```

None of these make cold starts disappear — they trade one cost (money,
complexity, or model quality) for a shorter or less-frequent delay. Which
trade-off is worth making depends entirely on how latency-sensitive the
workload actually is: a user-facing chat assistant can't tolerate a
two-minute wait; an overnight batch job genuinely doesn't care.

## Key terms

| Term | Meaning |
|---|---|
| Cold start | The startup delay a new instance pays before serving its first request |
| Model load time | The step (loading weights into memory/GPU) that dominates an AI cold start |
| Pre-warming / provisioned concurrency | Starting instances ahead of demand instead of reactively |
| Quantization | Compressing model weights, trading some quality for smaller size / faster load |

## Check yourself

You're ready for Lesson 19 when you can explain: why doesn't a bigger
`min instances` floor actually eliminate cold starts — what still causes
one, even with a healthy floor in place?
