# Lesson 15 — Scaling AI Inference

**Chapter 3 · Cloud Infrastructure Basics for AI · Lesson 15 of 24**

## What you'll learn

- Where Azure's Autoscale settings actually live, and how they're scoped
- The difference between manual scale and custom autoscale
- How a scale rule's threshold, duration, and action fit together
- Why AI inference needs different scaling signals than a typical web app

## Stay ahead of demand, not behind it

A model endpoint that handles ten requests a minute fine can fall over at
ten thousand. Scaling inference well means staying ahead of that curve,
not reacting once requests are already queuing and timing out.

## Where scaling settings actually live

Autoscale settings live on the resource's own Scale out page:

![An App Service plan's Scale out page — the same Autoscale settings blade a self-hosted inference API behind App Service scales through.](/courses/azure-ai-cloud/ch03/15-scaling-ai-inference/scale-out-entry.png)

This is scoped to that one resource — an App Service plan here, but the
same Configure button and the same underlying Autoscale settings apply to
any resource that supports it.

## Manual count, or let metrics decide

Clicking Configure offers a real choice:

![Choosing Custom autoscale — scale on a schedule, or on any metric, instead of holding a fixed instance count.](/courses/azure-ai-cloud/ch03/15-scaling-ai-inference/custom-autoscale-choice.png)

Manual scale holds a fixed instance count regardless of what's happening.
Custom autoscale reacts instead — on a schedule, or on metrics — which is
what actually lets an inference service grow and shrink with real demand
instead of guessing at one number up front.

## The rule that actually triggers it

A scale rule is where that reaction gets defined — in one form:

![A scale-in rule: when average CPU drops under 20% for 10 minutes, decrease the instance count by one.](/courses/azure-ai-cloud/ch03/15-scaling-ai-inference/scale-rule-config.png)

Threshold (CPU under 20%), duration (sustained for 10 minutes), and
action (decrease instance count by one) — all three have to agree before
anything actually changes. That duration matters: it stops a brief dip
from triggering a scale-in that then has to scale right back out.

## Why inference scaling is its own problem

```
Web app:        scale on CPU or request count
AI inference:   scale on GPU utilization, queue depth, token throughput
```

A web app's bottleneck is usually CPU or concurrent requests — the
metrics Autoscale offers by default. An AI inference endpoint's
bottleneck is rarely the CPU at all. It's GPU utilization, how deep the
request queue is getting, or how many tokens per second the model is
actually producing — so the rule has to target what's genuinely
saturated, not whatever's easiest to measure out of the box.

## Key terms

| Term | Meaning |
|---|---|
| Scale out | Adding more instances of a resource to handle more load |
| Custom autoscale | Scaling based on a schedule or live metrics, instead of a fixed count |
| Scale rule | A threshold + duration + action definition that triggers a scale event |
| Queue depth | How many pending requests are waiting to be processed — a key inference metric |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
would scaling a GPU-based inference endpoint purely on CPU percentage be
the wrong rule to write?
