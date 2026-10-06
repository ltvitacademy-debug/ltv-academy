# Lesson 14 — Tracking Cost & Latency

**Chapter 3 · Monitoring AI in Production · Lesson 14 of 25**

## What you'll learn

- Why cost and latency are production metrics, not launch-day afterthoughts
- What a cost/latency dashboard actually needs to show to be useful
- How cost and latency break down per session, not just per call
- Two concrete levers — caching and model choice — that move both numbers at once

## Why these two metrics, specifically

Every other lesson in this chapter — drift, hallucinations, alerting — is about catching something going *wrong*. Cost and latency are different: they're almost always working exactly as designed, and they still need watching, because "working as designed" at ten times last month's traffic can mean a bill that triples and a response time that makes the product feel broken. Unlike a traditional API call, an LLM call's cost and latency both scale with how much text goes in and comes out — a longer conversation, a bigger retrieved context, a more verbose system prompt all cost more and take longer, often without anyone changing a line of code.

## What a useful dashboard actually shows

A single running total isn't enough to act on. A real dashboard needs requests, cost, and latency broken out over time and by dimension (model, country, top request), so a spike is traceable to a cause instead of just a number that went up:

![Helicone's dashboard overview — requests, costs, latency, and error breakdowns by model and country, all over a selectable time window — the shape a useful cost/latency view actually takes.](/courses/ai-security-eval-monitoring/ch03/14-tracking-cost-and-latency/intro-dashboard.webp)

## Per-call numbers hide the real pattern

A single call's cost and latency are rarely the number that matters — a multi-step agent session (Lesson 17's alerting depends on exactly this shape of data) can rack up a dozen calls before it ever returns an answer. Looking at the session as a whole, not just its last call, is what tells you whether a specific workflow is actually expensive or slow:

![A session's cost and duration distribution in Helicone — average cost and duration per session, not just per individual call, which is where a multi-step agent's real expense actually shows up.](/courses/ai-security-eval-monitoring/ch03/14-tracking-cost-and-latency/session-metrics.webp)

## Lever one: caching

If the same (or a near-identical) prompt is sent repeatedly, caching the response skips the model call entirely on a repeat — cutting both cost and latency to nearly zero for that request:

![A cache dashboard showing cache hits, all-time dollar savings, and total time saved — caching is one of the few levers that reduces cost and latency at the same time, for free, on repeat traffic.](/courses/ai-security-eval-monitoring/ch03/14-tracking-cost-and-latency/caching.webp)

## Lever two: knowing what each model actually costs

The other lever is choosing the right model for the job, which starts with actually knowing the per-million-token price difference between providers — a gap that's often 5-10x between a frontier model and a smaller one for the same task:

![Per-provider input/output pricing per million tokens — the reference data behind the decision to route a simple classification task to a cheaper model instead of defaulting every call to the most expensive one.](/courses/ai-security-eval-monitoring/ch03/14-tracking-cost-and-latency/model-selection.webp)

## Key terms

| Term | Meaning |
|---|---|
| Latency | Time from sending a request to receiving the full response |
| Token-based cost | Cost that scales with input + output token count, not a flat per-call price |
| Cache hit | A repeated (or near-duplicate) request served from a stored response instead of a new model call |

## Lab

Pick any AI feature you've used recently (a chatbot, a coding assistant, a summarizer). Estimate: roughly how many tokens does a typical request send and receive? At the provider's published per-million-token price, what would 10,000 uses a day cost per month? You don't need exact numbers — the point is noticing that cost at the call level and cost at business scale are two very different conversations.

## Check yourself

Can you explain why a dashboard showing only "total cost this month" is less useful than one broken out by model, by session, and over time — and name one production decision each breakdown would let you make that the single total wouldn't?
