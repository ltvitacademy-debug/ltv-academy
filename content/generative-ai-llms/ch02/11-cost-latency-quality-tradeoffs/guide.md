# Lesson 11 — Cost, Latency & Quality Trade-offs

**Chapter 2 · The LLM Landscape · Lesson 11 of 31**

## What you'll learn

- Why cost, latency, and quality behave like a three-way trade-off, not three independent dials
- Real, verified per-token pricing across one provider's tiers, and what it actually costs to run a workload
- How batch processing and prompt caching change the math
- How to reason about this trade-off without needing to memorize prices that will change

## The triangle

Across every provider in this course, three things move together: how much a request costs, how
fast it responds, and how good the output is. You can generally improve any one of them — but
usually by giving something up on one of the other two. A faster, cheaper model is rarely also the
most capable one. The most capable model is rarely the fastest or cheapest. This isn't a law of
physics, but it's been true across every current model lineup this course checked.

## Real numbers, not hypotheticals

Checked directly against Anthropic's own pricing documentation (October 2026), per million
tokens, input/output:

| Tier | Input | Output | Comparative latency |
|---|---|---|---|
| Claude Haiku 4.5 | $1 | $5 | Fastest |
| Claude Sonnet 5.5 | $2 | $10 | Fast |
| Claude Opus 5.5 | $4 | $20 | Moderate |
| Claude Fable 5.1 | $10 | $50 | Slower |

## Doing the actual math

Pricing per million tokens is abstract until you run a real workload through it. Say an
application sends 1 million input tokens and generates 200,000 output tokens over a day —
roughly a mid-sized production workload:

- **On Haiku 4.5**: (1M × $1) + (0.2M × $5) = $1.00 + $1.00 = **$2.00/day**
- **On Opus 5.5**: (1M × $4) + (0.2M × $20) = $4.00 + $4.00 = **$8.00/day**
- **On Fable 5.1**: (1M × $10) + (0.2M × $50) = $10.00 + $10.00 = **$20.00/day**

That's a 10x cost spread for the exact same token volume, purely from tier choice — which is why
Lesson 10's "test before you commit to a tier" matters at real scale, not just in theory.

## Two levers that change the math

Pricing isn't fixed once you pick a tier — two mechanisms shift it further, per Anthropic's own
documentation:

- **Batch processing** — requests that don't need an immediate response run at roughly 50% off
  standard pricing, in exchange for asynchronous (not instant) turnaround.
- **Prompt caching** — repeated context (a long system prompt, a reused document) can be cached so
  re-reading it costs a small fraction of the normal input price on subsequent requests, often as
  little as 10% (or less, for some current flagship-tier models) of standard input cost.

Both are ways to buy back some of the cost side of the triangle without changing which model
you're using at all.

## Reasoning about this without memorizing prices

These exact dollar figures will be stale soon — that's the point of Lesson 12. What doesn't go
stale: cost and latency scale together across a provider's tiers, the spread between the cheapest
and most capable tier is usually large (often 10x or more), and batching/caching are two
provider-agnostic levers worth checking for any real workload before assuming the sticker price is
final.

## Key terms

| Term | Meaning |
|---|---|
| The triangle | Cost, latency, and quality moving together — improving one usually costs on another |
| Batch processing | Asynchronous requests, typically discounted vs. standard real-time pricing |
| Prompt caching | Reusing previously-sent context at a fraction of standard input price |

## Check yourself

Before Lesson 12, you're ready to move on when you can explain, without looking: why might a team
use batch processing and prompt caching before ever considering a cheaper model tier?
