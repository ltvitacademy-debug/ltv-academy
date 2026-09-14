# Lesson 57 — Cost and Latency Trade-offs of AI-Augmented Pipelines

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 57 of 81**

## What you'll learn

- Why an LLM call has a real, per-call token cost and latency, unlike a deterministic function
- What happens to both when that call runs per-row inside a production pipeline
- How to recognize when a cheaper deterministic rule beats an LLM call outright
- Where an LLM call is still worth its cost, even at scale

## Every call has a price and a wait

A deterministic transformation — a `CASE` statement, a regex, a
lookup against a reference table — costs a few CPU cycles and returns
in microseconds. An LLM call is different: it costs tokens (both the
prompt you send and the response you get back), and it takes real
wall-clock time to return, typically hundreds of milliseconds to a
few seconds depending on the model and the response length. Both of
those numbers are fine for a one-off task like drafting test cases in
Lesson 53. They become the whole problem the moment the call moves
inside a loop.

```
Deterministic rule:  ~microseconds, ~$0, runs inline
LLM call:             hundreds of ms to seconds, real $ per call,
                       and that's PER CALL, not per pipeline run
```

## What per-row scales into

A pipeline that calls an LLM once per row sounds reasonable in a demo
with 50 rows. At the volumes this track has used throughout — the
retail order-fact tables and real-time event streams from Chapter 1
and Fabric & Real-Time Analytics — a "per row" LLM call turns into
millions of calls a day. At even a fraction of a cent and a few
hundred milliseconds each, that's real dollars and a pipeline that
can no longer hit the latency targets Fabric Lesson 56's SLAs and
SLOs actually require.

```
1,000,000 rows/day x $0.001/call  = $1,000/day just in LLM cost
1,000,000 rows/day x 300ms/call   = impossible sequentially;
                                     even parallelized, a real
                                     bottleneck against an SLA
```

## When a deterministic rule wins outright

Most of what looks like a job for an LLM inside a pipeline is
actually a job for a lookup table, a regex, or a small rules engine —
and those win on cost, latency, and predictability every time they
apply. Classifying a transaction as "domestic" or "international"
from a country code is a one-line rule, not a prompt. Normalizing a
phone number format is a regex, not an LLM call. Save the LLM for the
genuinely ambiguous, low-volume cases a rule can't cover — and prefer
running it once, outside the hot path, over running it per row inside
it.

```
Use a rule when:            Use an LLM when:
- the logic is a lookup     - the input is unstructured text
- the cases are enumerable  - judgment calls vary case by case
- volume is high            - volume is low, or it runs offline
```

## Where the cost is still worth it

None of this rules out LLMs in pipelines — it just says where. A
one-time batch job that classifies a backlog of unstructured support
tickets, or an offline documentation pass like Lesson 48's, pays the
token cost once and never touches the pipeline's live latency budget
at all. The trade-off isn't "never use an LLM in a pipeline" — it's
"never put an LLM call where a cheaper rule would do, and never put
one in a path that has to hit a real-time SLA."

## Key terms

| Term | Meaning |
|---|---|
| Per-call cost | The token cost and latency an LLM call incurs every single time it runs |
| Per-row scaling | What happens when a per-call cost gets multiplied by every row in a high-volume pipeline |
| Deterministic rule | A lookup, regex, or rules engine that handles enumerable cases without any LLM call at all |

## Check yourself

You're ready for Lesson 58 when you can explain, without looking:
why does a "per row" LLM call that looks cheap in a demo become a
real cost and latency problem at production scale?
