# Designing for Millions of Requests: Latency, Load & Cost Budgets

Lesson 1 named cost as one of the four dimensions that changes at scale. This lesson makes that concrete with real arithmetic: a per-request decision that looks free in a code review can turn into a seven-figure line item once multiplied by production volume. Designing at scale means setting explicit budgets for latency, load, and cost up front — and treating any design choice that blows through them as a real finding, not a rounding error.

## What you'll learn

- Why per-request costs that look negligible in isolation are the actual budget line at scale
- A worked example: how a "small" system-prompt change costs Northbeam real money per year
- Latency budgets: splitting a target end-to-end latency across every component in the request path
- Why setting these budgets BEFORE building, not after, is what actually prevents this class of problem

## The arithmetic nobody runs until it's too late

Northbeam's support assistant serves 2,000,000 requests per day at steady state — a believable number for a mid-size company's customer-facing AI feature. Each request averages 800 input tokens and 200 output tokens. At realistic illustrative API pricing ($3 per million input tokens, $15 per million output tokens):

```python
requests_per_day = 2_000_000
input_tokens_per_req = 800
output_tokens_per_req = 200
cost_per_million_input = 3.00
cost_per_million_output = 15.00

daily_input_tokens = requests_per_day * input_tokens_per_req
daily_output_tokens = requests_per_day * output_tokens_per_req

daily_cost = (daily_input_tokens / 1e6) * cost_per_million_input \
           + (daily_output_tokens / 1e6) * cost_per_million_output

print(f"Daily cost: ${daily_cost:,.2f}")
print(f"Annual cost: ${daily_cost * 365:,.2f}")
```

```
Daily cost: $10,800.00
Annual cost: $3,942,000.00
```

Nearly $4M a year, at steady state, for a feature that looked "basically free" when it was a 50-user pilot processing a handful of requests a day. This is the exact moment Lesson 1 described: a cost that was invisible at prototype scale becomes a board-level number at production scale — not because anything changed about the system's logic, just because of volume.

## Why a "small" prompt change isn't small

Now suppose an engineer adds 400 extra tokens to the system prompt — a few more examples, a longer style guide, some extra instructions that seemed harmless in a pull request:

```python
extra_input_tokens = 400
daily_extra_input_tokens = requests_per_day * extra_input_tokens
daily_extra_cost = (daily_extra_input_tokens / 1e6) * cost_per_million_input

print(f"Extra daily cost: ${daily_extra_cost:,.2f}")
print(f"Extra annual cost: ${daily_extra_cost * 365:,.2f}")
```

```
Extra daily cost: $2,400.00
Extra annual cost: $876,000.00
```

**A 400-token addition to a system prompt — something that would pass code review without a second glance — costs Northbeam an extra $876,000 a year**, purely from being multiplied by 2 million requests a day. This is precisely why a Staff/Principal engineer's review of a prompt change at this scale has to include "what does this cost at our real volume," a question a junior engineer's prototype-scale instincts would never think to ask, because at prototype scale the answer genuinely doesn't matter.

## Latency budgets: splitting a target across the whole request path

Cost isn't the only thing that needs an explicit number before building. If product has committed to a 2-second end-to-end response time, that 2 seconds has to be allocated across every component the request actually passes through — otherwise each team optimizes their own piece in isolation and the sum still blows the target:

| Component | Latency budget |
|---|---|
| Embed the query | 50 ms |
| Vector search | 100 ms |
| Re-ranking | 150 ms |
| LLM generation (streamed, time to first token) | 1,200 ms |
| Network + overhead | 500 ms |
| **Total** | **2,000 ms** |

Writing this table down, before any of these components are built, turns a vague goal ("make it fast") into a concrete constraint each team can be held to individually. If the vector search team ships something that takes 300ms instead of 100ms, that's now a measurable, specific problem against an agreed number — not a vague, late-discovered "the whole thing feels slow."

## Why these budgets have to be set before building, not after

Setting cost and latency budgets after a system is already built means every fix is now a redesign — ripping out a chosen vector database, renegotiating a model choice, or rearchitecting a pipeline that was never built with the real constraint in mind. Setting them before building means the constraint shapes the design from the start: a team that knows their latency budget is 100ms for vector search will choose a different index type than one that discovers that constraint six months after launch. This is the practical reason Staff/Principal review happens at the design stage, not just at the code-review stage — by the time code exists, the expensive decisions are usually already locked in.

## Key terms

| Term | Meaning |
|---|---|
| Cost at volume | The real financial impact of a per-request cost once multiplied by production request count |
| Latency budget | An explicit time allocation split across every component in a request's path, summing to a target end-to-end latency |

## Check yourself

Why does a 400-token system prompt addition that "would pass code review without a second glance" actually deserve real scrutiny at Northbeam's production volume?
