# Lesson 5 — Cloud vs. Self-Hosted Models

**Chapter 1 · Azure AI Foundry & Cloud AI Concepts · Lesson 5 of 24**

## What you'll learn

- Four legitimate reasons to self-host a model instead of using a cloud AI platform
- The costs of self-hosting that don't show up on a GPU invoice
- A simple decision checklist for picking cloud vs. self-hosted
- Why the cloud AI platform is still the right default for most teams

## Four real reasons to self-host

This chapter has made the case for cloud AI platforms. In fairness, self-hosting is the right call in specific, recognizable situations:

- **Data residency** — regulatory or contractual requirements mean the data legally cannot leave your own infrastructure, full stop.
- **Offline or edge environments** — there's no reliable network path to a cloud endpoint at all (a factory floor, a disconnected field deployment).
- **Deep customization** — you need to modify a model's internals, not just prompt it differently or fine-tune its weights through a managed API.
- **Extreme, sustained scale** — your usage is high and steady enough, around the clock, that owned GPU capacity genuinely beats per-token cloud billing over time.

Notice what's *not* on this list: "it seems cheaper" on its own, or "we want more control" without a specific capability that control unlocks. Those are the reasons teams self-host and regret it.

## The hidden cost of self-hosting

The GPU bill is the visible cost. These are the ones that aren't:

- **An MLOps team** — someone has to patch, scale, and monitor the serving stack, indefinitely, as a standing responsibility, not a one-time setup task.
- **Hardware risk** — GPUs you own depreciate whether you use them or not, and a capacity miscalculation (too much or too little) is now your problem, not a vendor's.
- **You own uptime** — there's no managed SLA behind a self-hosted stack. An outage at 2 a.m. is your team's outage to fix, not a support ticket to file.

## A decision checklist

```python
if legally_required_on_prem or fully_offline:
    self_host()
elif model_needs_architecture_changes:
    self_host()
elif sustained_usage_beats_token_cost():
    self_host()
else:
    use_cloud_ai_platform()  # correct default
```

For most teams, most of the time, the cloud AI platform is the right default — self-hosting is the exception you justify with a specific requirement, not the starting assumption.

## Key terms

| Term | Meaning |
|---|---|
| Data residency | A legal or contractual requirement that data stay within specific infrastructure or geography |
| MLOps | The ongoing operational work of running, scaling, and monitoring a model-serving stack |
| Sustained scale | Usage high and steady enough that owned infrastructure outperforms pay-per-use billing |
| SLA | Service-level agreement — the uptime and performance guarantee a managed provider backs |

## Check yourself

You're ready to start Chapter 2 when you can explain, without looking: what are the four legitimate reasons to self-host a model, and what three costs of self-hosting don't show up on the GPU invoice?
