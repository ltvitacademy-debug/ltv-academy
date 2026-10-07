# Serving at the Edge vs. Centrally

Every lesson in this chapter so far has assumed inference happens in a datacenter or cloud region. That's true for most large-model serving, but it isn't the only option. This lesson looks at the other end of the spectrum — running inference on or near the device itself — and when that trade-off actually makes sense.

## What you'll learn

- What "central" serving optimizes for, and what it costs you
- What "edge" serving optimizes for, and what it costs you
- Why edge serving almost always means a smaller, more compressed model
- How hybrid architectures split work between the two instead of picking one

## Central serving: optimized for scale

Central serving means requests travel over the network to a datacenter or cloud region packed with powerful GPUs. This is the default model this entire course has assumed so far, and for good reason:

- **Batching across many users** — a central pool of GPUs can batch requests from many different users together (Lesson 3), which is where most of the cost efficiency in this course comes from
- **High GPU utilization** — concentrating demand in one place means fewer idle GPUs
- **Simple operations** — one fleet to monitor, patch, and scale, instead of thousands of scattered devices
- **No device hardware constraints** — the model can be as large and capable as the budget allows

The costs: every request pays a network round trip, which adds latency a purely local computation wouldn't have; the user's data has to leave their device to reach the model; and if the central service has an outage, every user depending on it is affected at once.

## Edge serving: optimized for locality

Edge serving runs the model on or very near the device making the request — a phone's neural processing unit, a local gateway, an on-premises appliance. It flips the trade-offs:

- **Lower latency** — no network round trip for the model call itself
- **Works offline or on flaky connectivity** — the model doesn't need a live connection to answer
- **Privacy by construction** — if inference never leaves the device, sensitive data never has to either
- **No cross-user batching** — each device serves its own requests alone, so GPU/accelerator utilization is inherently low compared to a shared pool

The catch: edge hardware is far more memory- and compute-constrained than a datacenter GPU, so edge-served models are almost always smaller and more heavily quantized (Lessons 12–13) than their central counterparts — there's a real quality ceiling that comes with the locality benefit. Updating the model also means pushing a new version out to every device in the fleet, not just redeploying one service.

## Hybrid: splitting the work

Many real systems don't pick one side — they route based on which side fits the request:

- **Edge handles the common case** — simple, latency-critical requests are answered locally by a small on-device model
- **Central handles the hard case** — anything the edge model is uncertain about, or any request that needs a larger model's quality, escalates to the central service
- **Policy, not just capability, can decide the split** — some organizations route based on data sensitivity (never let certain data leave the device) rather than purely on request difficulty

This looks structurally like the cascade routing from Lesson 26, except the two tiers are in different physical locations instead of just different model sizes in the same datacenter.

## Key terms

| Term | Meaning |
|---|---|
| Central serving | Inference run in a datacenter/cloud region, reached over the network |
| Edge serving | Inference run on or near the requesting device itself |
| Batching across users | Central serving's main cost advantage — not available at the edge |
| Hybrid routing | Splitting requests between a local edge model and a central fallback |

## Recap

Central serving wins on batching, utilization, and raw model capability; edge serving wins on latency, offline resilience, and privacy, at the cost of a much smaller model and fleet-wide update complexity — and hybrid designs split requests between the two rather than choosing just one. Next up, Lesson 28: what happens to all of this when traffic spikes far beyond what was planned for?
