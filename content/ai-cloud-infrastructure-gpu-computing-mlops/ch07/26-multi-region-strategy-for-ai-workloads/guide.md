# Lesson 26 — Multi-Region Strategy for AI Workloads

**Chapter 7 · Scaling and Reliability for AI Infrastructure · Lesson 2 of 4**

## What you'll learn

- Why training and inference pull a multi-region strategy in opposite
  directions, instead of sharing one regional footprint
- How GPU availability, data gravity, and cost should drive where
  training runs — and why user proximity barely enters that decision
- How user latency, global traffic routing, and data residency should
  drive where inference runs — and why GPU scarcity is a real
  constraint on that decision too
- How to reconcile both into one coherent regional strategy instead of
  picking a single "our region" answer

## One workload, two regional problems

Earlier courses in this path treated "multi-region" mostly as one
question: where should the application run so it's close to users and
resilient to a regional outage? AI infrastructure splits that into two
genuinely different questions, because training and inference don't
share the same constraints.

- **Training** is a batch-shaped, compute-bound problem. Nobody is
  waiting on a response from a training job in real time, so training
  can run wherever it's most practical to run — which usually means
  wherever the needed GPU capacity actually exists, and wherever the
  training data already lives, rather than wherever your users are.
- **Inference** is a request/response problem a real person or
  downstream system is waiting on. Every network hop between the
  caller and the model adds to the latency the caller feels, so
  inference strategy has to account for *where the users are*, not
  just where the GPUs are.

Treating these as the same problem leads to one of two mistakes:
over-centralizing inference (fast to build, bad latency for distant
users) or over-replicating training (expensive, and often blocked by
the same GPU scarcity covered in Lesson 25 anyway).

## Choosing training regions: capacity and data gravity first

A training run's regional home should be driven by three questions,
roughly in this order: where is the GPU capacity (and the SKU) you
actually need available; where does the training data already live,
since moving large datasets repeatedly is slow and can be expensive;
and which region gives you the best cost for that capacity once the
first two questions narrow the field. User proximity almost never
makes this list — the people waiting on a trained model are waiting on
*when it finishes*, not on network latency to the training cluster.

This is why it's common, and reasonable, to centralize training in one
or two regions chosen for GPU availability and data residency, even
when the resulting model will ultimately serve users worldwide.

## Choosing inference regions: users and routing first

Inference flips the priority order. The questions that matter are:
where are the users (or the services) actually calling this endpoint;
what's the real latency budget for the SLOs covered in Lesson 27; and
does any data residency requirement force serving to happen inside a
particular region regardless of where it would otherwise be cheapest.
A global routing layer — Azure Front Door or Traffic Manager, AWS
Global Accelerator — then directs each caller to the nearest healthy
regional deployment rather than one central endpoint everyone hits:

```
# Illustrative: routing a region's traffic to its nearest
# healthy inference endpoint, falling back on health probes
# rather than a single fixed destination
az network front-door create \
  --resource-group ai-inference-rg \
  --name global-inference-fd \
  --backend-address us-east-infer.internal \
  --backend-address eu-west-infer.internal
```

Every additional inference region is also an additional GPU footprint
to provision, scale, and pay for — so this decision connects straight
back to the cost discipline from Chapter 6: you replicate inference
into a region because real users there need the latency, not by
default.

## Data residency can override both

Regulatory requirements sometimes make the decision for you: if a
jurisdiction requires certain data to stay within its borders, both
the training data that touches it and the inference endpoint serving
predictions from it may need to live in-region, independent of where
GPU capacity is cheapest or where most of your users are. When that
applies, you're effectively running a separate, smaller training-and-
inference stack for that region rather than folding it into the global
pattern above.

## Key terms

| Term | Meaning |
|---|---|
| Data gravity | The tendency for compute to be pulled toward where large datasets already live, because moving the data repeatedly is slow and costly |
| Global traffic routing | A layer (Front Door, Traffic Manager, Global Accelerator) that directs each caller to the nearest healthy regional endpoint instead of one fixed destination |
| Data residency | A regulatory requirement that certain data, and often the compute touching it, stay within a specific geographic or jurisdictional boundary |
| Regional footprint | The set of regions where a workload actually runs; for inference, every added region is added GPU capacity to provision and pay for |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
does a training job's regional placement get decided mostly by GPU
availability and data gravity, while an inference endpoint's
placement gets decided mostly by user latency and routing — and what
can force both onto the same region regardless?
