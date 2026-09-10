# Lesson 64 — Capacity Planning

**Chapter 3 · Production Data Engineering · Lesson 64 of 70**

## What you'll learn

- How capacity planning differs from Lesson 55's right-sizing
- Planning for growth vs. planning for a known peak event
- Forecasting from a trend, not just today's snapshot
- Why this lesson closes the loop back to Lesson 54's cost conversation

## A different question than right-sizing

Lesson 55's right-sizing asked "is today's SKU correct for today's
measured load?" — a reactive question, answered from evidence
already collected. **Capacity planning** asks a forward-looking
question instead: "what will the load look like in three months, and
is the current trajectory heading toward a problem before it
actually becomes one?" Both matter; right-sizing keeps the present
correct, capacity planning keeps the future from arriving as a
surprise.

## Two different shapes of "ahead of time"

```
Growth:      the taxi dashboard gets rolled out to 3x as many
             dispatchers over the next quarter -- gradual, predictable
Peak event:  New Year's Eve produces 10x normal trip volume for
             exactly one night -- sudden, temporary, foreseeable
```

Both need planning, but different kinds. Growth is addressed by
projecting a trend forward and adjusting the baseline Fabric
Capacity SKU before the trend actually catches up with it. A known
peak event is better addressed with temporary, deliberate
overprovisioning for that specific window — paying for a larger SKU
for one night is far cheaper than sizing the entire year around a
single evening's traffic.

## Forecasting from a trend

```kql
CapacityMetrics
| where Timestamp > ago(90d)
| summarize AvgCU = avg(ConsumedCU) by bin(Timestamp, 7d)
| render timechart
```

A single day's utilization number, the kind Lesson 55 watches for
right-sizing, says nothing about direction. A 90-day rolling view
of the same metric shows whether consumption is flat, growing
steadily, or accelerating — and a steadily climbing trend is exactly
the signal that says "plan the next SKU increase now, on your own
schedule," instead of waiting for sustained bursting to force the
decision under pressure.

## Closing the loop back to cost

Capacity planning and Lesson 54's cost management are two sides of
the same conversation: planning ahead means the cost of growth is a
deliberate, budgeted decision made in advance, not a surprise bill
discovered after the SKU already had to be bumped up reactively
under pressure. The forecast from this lesson is the input Lesson
54's cost conversation should actually be built around.

## Key terms

| Term | Meaning |
|---|---|
| Capacity planning | Forecasting future load, distinct from right-sizing today's SKU |
| Growth vs. peak event | Gradual trend-driven planning vs. temporary deliberate overprovisioning |
| Trend forecasting | Watching direction over weeks/months, not a single day's snapshot |

## Check yourself

You're ready for Lesson 65 when you can explain, without looking: why
is temporarily overprovisioning for one known peak night cheaper than
sizing the whole year's baseline SKU around it?
