# Lesson 15 — Rolling Updates

**Chapter 3 · Deployment Patterns · Lesson 15 of 25**

## What you'll learn

- How a rolling update differs from blue-green's two-full-environments approach
- What "max surge" and "max unavailable" actually control during the rollout
- Why a rolling update briefly runs old and new versions side by side,
  and what that means for an AI app specifically
- When rolling updates are the better default over blue-green

## Replace instances a few at a time, not all at once

Where blue-green stands up a second full environment, a rolling update
replaces a running service's instances gradually, inside the same
environment:

```
Start:  [old] [old] [old] [old]          4 instances, all old version

Step 1: [new] [old] [old] [old]          1 replaced, 3 still serving
Step 2: [new] [new] [old] [old]          2 replaced, 2 still serving
Step 3: [new] [new] [new] [old]          3 replaced, 1 still serving
Step 4: [new] [new] [new] [new]          done -- no second environment
```

At every step, the load balancer (Lesson 13) is routing to whatever
instances are currently healthy — a mix of old and new during the
rollout, all old version instances by the end. There's never a moment
with zero capacity, but there's also never a full standby copy sitting
idle the way blue-green keeps one.

## The two dials: max surge, max unavailable

Two settings control how aggressive the rollout is:

```
Max surge:       how many EXTRA instances can exist temporarily
                  above your normal count, while rolling out
                  (e.g. +1 extra instance during the swap)

Max unavailable: how many instances can be DOWN at once
                  during the rollout (e.g. 0 -- never drop capacity)
```

A conservative rollout sets max unavailable to 0 (capacity never drops)
and a small max surge (barely any extra cost) — slow, but safe. A faster
rollout allows more of both, finishing sooner at the cost of a bigger
capacity swing mid-rollout.

## The side-by-side window, and why it matters more for AI

During the rollout, old and new versions are genuinely serving traffic
*at the same time* — not a brief instant like blue-green's cutover, but
for the whole duration of the rollout, which can be minutes. For a
stateless CRUD service, that's usually invisible to users. For an AI app,
it means two different model behaviors can be live simultaneously:

```
During rollout, at the SAME moment:
  Request A -> old instance -> old model checkpoint's answer
  Request B -> new instance -> new model checkpoint's answer

Same question, asked twice during rollout, can get two
different (both "correct") answers from two different checkpoints.
```

That's usually fine for a single stateless completion. It's a real problem
for anything expecting consistency across a session — a chat thread that
hits a different instance each turn mid-rollout can feel like the
assistant changed its mind, when the explanation is just load balancing.

## Key terms

| Term | Meaning |
|---|---|
| Rolling update | Replaces instances a few at a time, inside one environment |
| Max surge | Extra instances allowed above normal count during rollout |
| Max unavailable | Instances allowed to be down at once during rollout |
| Side-by-side window | The period where old and new versions both serve real traffic |

## Check yourself

You're ready for Lesson 16 when you can explain: why can a rolling update
briefly produce two different "correct" answers to the exact same
question, in a way blue-green's instant cutover generally avoids?
