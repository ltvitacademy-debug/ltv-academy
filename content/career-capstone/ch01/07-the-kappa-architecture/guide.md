# Lesson 7 — The Kappa Architecture

**Chapter 1 · System Design for Data Engineers · Lesson 7 of 81**

## What you'll learn

- Kappa's core idea: one codepath instead of Lambda's two
- Reprocessing by replaying the stream, not running a separate batch job
- What Kappa actually requires to work at all
- Choosing between Lambda and Kappa for a real design

## One codepath, not two

Lesson 6 ended on Lambda's real cost: two separate implementations
of the same logic, in two different engines, that can quietly
drift apart. **Kappa architecture** solves that specific problem by
refusing to have two codepaths in the first place — everything,
including full historical reprocessing, runs through the *same*
streaming logic.

```
Lambda:  speed layer (streaming code) + batch layer (batch code) --
         two implementations of the same aggregation
Kappa:   one streaming pipeline, used for both live processing
         AND historical reprocessing (by replaying the stream
         from an earlier point)
```

## Reprocessing by replay, not a separate job

```kql
// Conceptually: re-run the SAME Eventstream logic against
// historical events, instead of a separate PySpark job

.ingest into table RawTripEvents (
    h'https://.../yellow_tripdata_2024-01.csv'
) with (format='csv')
-- then let the SAME KQL aggregation queries process it,
-- exactly as they would live events
```

Fabric Lesson 27 already showed both ingestion paths landing in the
*same* table, queried identically either way. Kappa generalizes
that idea: if you ever need to fix a bug or reprocess history,
you replay old events back through the one streaming pipeline that
already exists, rather than standing up a second, batch-shaped
implementation of the same logic just to handle that case.

## What Kappa actually requires

Kappa only works if the source can actually be replayed — the
event source needs enough retention (Fabric Lesson 54's retention
policy discussion) to go back far enough, or the raw events need to
already be durably stored somewhere replayable (object storage,
Lesson 4). Without that, there's nothing to replay, and Kappa
simply isn't an option.

## Choosing between Lambda and Kappa

```
Choose Lambda when:  the speed layer's approximate answer and the
                     batch layer's exact answer genuinely need
                     different logic or engines
Choose Kappa when:   one streaming logic can correctly serve both
                     live and historical needs, and the source
                     data is durably replayable
```

Kappa is usually the simpler, preferred choice when it's actually
available, precisely because it avoids Lambda's codepath-drift
risk entirely. Lambda remains the right answer when the two paths
genuinely need to compute things differently — not every problem
reduces cleanly to "one logic, replayed."

## Key terms

| Term | Meaning |
|---|---|
| Kappa architecture | One streaming codepath for both live and historical processing |
| Replay | Reprocessing history by re-running old events through the live pipeline |
| Replayability | The real requirement Kappa depends on — a durable, replayable source |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
does Kappa architecture require the event source to be durably
replayable, specifically?
