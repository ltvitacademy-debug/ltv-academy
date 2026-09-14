# Script — Cost and Latency Trade-offs of AI-Augmented Pipelines

## Segment 1 (title)

A deterministic rule costs microseconds and basically nothing. An LLM call costs real tokens and real wall-clock time — fine for a one-off task, and the whole problem the moment it moves inside a loop.

## Segment 2 (code: per-row scaling)

A pipeline that calls an LLM once per row looks fine with 50 demo rows. At a million rows a day, even a fraction of a cent and a few hundred milliseconds per call adds up to real dollars and a latency bottleneck against any SLA.

## Segment 3 (code: when a rule wins)

Most of what looks like an LLM's job inside a pipeline is actually a lookup table or a regex — and those win on cost, latency, and predictability every time the logic is enumerable and the volume is high.

## Segment 4 (steps: where the cost still pays off)

None of this rules out LLMs in pipelines. A one-time batch job or an offline documentation pass pays the token cost once, outside the live latency budget entirely — the rule is where you put the call, not whether you ever use one.

## Segment 5 (outro)

Cheap and fast where a rule applies; the LLM reserved for genuinely ambiguous, low-volume, or offline work. Next up: how to actually evaluate whether AI output is correct.
