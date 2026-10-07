# Script — Setting SLOs for Inference

## Segment 1 (title)

The last lesson covered measuring a serving stack honestly. This lesson covers turning those measurements into a commitment — a concrete target for what good enough actually means, so capacity and alerting decisions have something precise to aim at.

## Segment 2 (steps)

This vocabulary comes straight from site reliability engineering. The SLI is the actual measured number, like p99 time to first token. The SLO is the internal target for that number. The SLA is the external, often contractual promise, usually set looser than the internal target to leave margin.

## Segment 3 (steps)

A good inference SLO is a percentile, not an average, because an average can look fine while a real slice of users wait far too long. It ties to a concrete user-facing effect, not just a round number. And it's set against realistic, loaded traffic, not a single quiet benchmark run that will be missed constantly once real concurrency arrives.

## Segment 4 (code)

Here's a concrete SLO definition: p99 time to first token under 500 milliseconds, met 99.9% of the time, measured over a rolling 30-day window — a real, checkable commitment.

## Segment 5 (steps)

If the SLO allows 99.9% success, the remaining 0.1% is the error budget — a deliberate, pre-approved allowance. Teams can spend it on a risky deploy or a cost experiment while budget remains; a nearly exhausted budget means reliability work takes priority; and a fast burn rate is something to page on before the SLO is actually breached.

## Segment 6 (outro)

A good inference SLO is a percentile tied to a real effect, set under real load, and the error budget it implies turns reliability into a spendable allowance. Up next, lesson thirty-two: once you know what you're committing to, how many GPUs does it actually take to hold it?
