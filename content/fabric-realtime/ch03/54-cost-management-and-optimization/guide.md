# Lesson 54 — Cost Management and Optimization

**Chapter 3 · Production Data Engineering · Lesson 54 of 70**

## What you'll learn

- Turning Lesson 14's Capacity Units into an actual cost conversation
- The specific cost drivers unique to a real-time pipeline
- Retention policies — the KQL Database's biggest lever
- Why "cost-aware" (Lesson 43) means knowing why, not just how much

## From Capacity Units to a real bill

Lesson 14 introduced Capacity Units (CUs) as the currency every
Fabric operation spends — a KQL query, an Eventstream, a notebook
run, all draw from the same capacity pool. Cost management is the
practice of actually watching that consumption, understanding which
parts of a real-time pipeline draw the most, and deciding
deliberately whether that spend is justified.

## What actually drives cost in a real-time pipeline

```
High cost driver:   a hopping window (Lesson 31) recomputing overlapping
                    aggregates continuously, touching each event several times
Lower cost driver:  a tumbling window (Lesson 30), touching each event once
High cost driver:   long KQL Database retention (every event kept indefinitely)
Lower cost driver:  a retention policy that ages out data nobody queries anymore
```

Lesson 31 already flagged that a hopping window costs more to
compute than a tumbling one — this lesson is where that becomes a
real dollar figure, not just an abstract tradeoff. The same is true
of retention: every day of KQL Database history costs storage, and
most queries only ever look at the last few hours or days.

## Retention policies — the KQL Database's biggest lever

```kql
.alter-merge table RawTripEvents policy retention
    softdelete = 30d
    recoverability = disabled
```

A retention policy tells the KQL Database to age out data past a
certain point automatically, rather than keeping every event
forever by default. Thirty days might be generous for a dashboard
that only ever looks at "the last hour," or genuinely necessary for
a compliance requirement — the right number depends on how the
data actually gets used, not a guess.

## Cost-aware means knowing why, not just how much

Lesson 43 listed "cost-aware" as one of six production-readiness
qualities. Knowing this month's Fabric bill was $4,200 tells you
almost nothing on its own. Knowing that the hopping-window dashboard
tile accounts for 60% of that, and that switching it to a tumbling
window with a 1-minute refresh would cut it by half with barely
noticeable UX impact — that's the actual, actionable version of
being cost-aware.

## Key terms

| Term | Meaning |
|---|---|
| Capacity Units (CUs) | The shared currency every Fabric operation spends (Lesson 14) |
| Retention policy | Automatically aging out data past a defined point |
| Cost-aware | Knowing which specific choices drive cost, not just the total |

## Check yourself

You're ready for Lesson 55 when you can explain, without looking: why
does a hopping window's overlap (Lesson 31) translate directly into
higher Capacity Unit consumption?
