# Cost-per-Token Economics

Chapter 5 was about keeping inference running under varying, unpredictable load. Chapter 6 turns to the numbers underneath those decisions — starting with the most basic question of all: what does serving a token actually cost, and what makes that number go up or down?

## What you'll learn

- The core formula connecting GPU cost, throughput, and cost per token
- Why utilization, not raw GPU speed, is usually the biggest lever on that number
- Why input (prompt) tokens and output (generated) tokens cost different amounts
- Why self-hosting and pay-per-token APIs break even at different utilization levels

## The core formula

At its simplest, cost per token comes from two numbers you already know from earlier chapters:

```
cost per token = (GPU $/hour) / (tokens/sec throughput × 3,600 seconds/hour)
```

Teams usually scale this up and report **cost per million tokens**, since a single token's cost is a tiny, hard-to-reason-about fraction of a cent. If a GPU costs roughly $2/hour to rent and sustains around 2,000 output tokens/sec under realistic load, that's about $2 ÷ 7,200,000 tokens ≈ $0.00000028/token, or roughly $0.28 per million tokens — illustrative numbers, since real figures depend heavily on the specific GPU, model, and workload.

```python
def cost_per_million_tokens(gpu_dollars_per_hour, tokens_per_sec):
    tokens_per_hour = tokens_per_sec * 3600
    cost_per_token = gpu_dollars_per_hour / tokens_per_hour
    return cost_per_token * 1_000_000

# Example (illustrative, not a vendor quote):
print(cost_per_million_tokens(2.00, 2000))  # ≈ $0.28 / million tokens
```

## Utilization is the hidden multiplier

That formula hides an important trap: it assumes the GPU is actually running at that throughput continuously. A GPU costs the same per hour whether it's processing requests at full tilt or sitting mostly idle waiting for the next one — so a GPU running at 20% average utilization doesn't just waste 80% of its capacity, it roughly *multiplies* the effective cost per token by five, because the same hourly bill is now spread across a fifth of the tokens.

This is exactly why batching (Lesson 3), autoscaling that doesn't over-provision (Lesson 23), and multi-model sharing (Lesson 25) all matter economically, not just operationally — every one of them is, underneath, a way of raising sustained utilization and therefore lowering real cost per token.

## Input tokens vs. output tokens

Prefill (processing the prompt) and decode (generating the response) cost very different amounts of compute for the same number of tokens, as Lesson 4 covered:

- **Prefill is parallel** — the whole prompt is processed in one pass, so it's computationally cheap per token
- **Decode is sequential** — each output token depends on the one before it, generated one step at a time, which is why it dominates cost for long generations

This asymmetry is exactly why commercial LLM APIs typically price input and output tokens differently, usually charging noticeably more per output token than per input token — it reflects the real compute asymmetry underneath, not an arbitrary markup.

## Self-hosted vs. pay-per-token

Self-hosting shifts cost onto fixed GPU-hours regardless of how busy the GPU actually is — you pay for the GPU whether it's at 10% or 90% utilization. A pay-per-token API shifts the risk the other way: the provider manages utilization across all of its customers, and you only pay for tokens actually generated. Whichever is cheaper depends on how consistently you can keep a self-hosted GPU busy — at low, spiky utilization, a pay-per-token API is often cheaper; at high, sustained utilization, self-hosting usually wins.

## Key terms

| Term | Meaning |
|---|---|
| Cost per million tokens | The standard unit for reporting inference cost, since a single token's cost is vanishingly small |
| Utilization | The share of time a GPU is actually doing useful work, versus idle |
| Prefill / decode asymmetry | Input tokens are cheap (parallel); output tokens are expensive (sequential) |
| Break-even utilization | The utilization level at which self-hosting becomes cheaper than pay-per-token pricing |

## Recap

Cost per token comes from GPU price divided by sustained throughput, and utilization is the hidden multiplier that makes that number swing wildly in practice — with output tokens costing more than input tokens because decode is sequential and prefill isn't. Next up, Lesson 30: you can't manage any of these numbers without first measuring them properly — benchmarking a serving stack.
