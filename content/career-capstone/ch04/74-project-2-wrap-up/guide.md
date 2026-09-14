# Lesson 74 — Project 2: Wrap-Up and Retrospective

**Chapter 4 · Added Projects — Capstones · Lesson 74 of 81**

## What you'll learn

- What Project 2 actually built, end to end, across Lessons 70–73
- Which specific lessons from earlier in the track each piece drew on
- How to run an honest retrospective, not a victory lap
- What carries forward into Project 3

## What got built

Project 2 took a multi-source data warehouse migration from source
assessment through a live cutover:

```
Lesson 70:  Kickoff — scope, sources, and stakeholders defined
Lesson 71:  Source assessment + migration plan — what's moving, in
            what order, with what mapping
Lesson 72:  Target warehouse built — schema, load logic, transformations
Lesson 73:  Cutover — phased/parallel-run, reconciliation, rollback plan
```

None of this was new material invented for the capstone. Lesson 72's
target warehouse leaned directly on the star-schema and grain thinking
from Lesson 8; the incremental load logic drew on Databricks & Delta
Lake's `MERGE INTO` pattern for applying source changes without a full
rewrite; and Lesson 73's cutover leaned on the same freshness-SLA and
go/no-go discipline introduced back in Chapter 1. The project's value
isn't the individual pieces — it's proving those pieces compose into
something a real migration actually needs.

## The honest retrospective

A retrospective that only lists what went well isn't a retrospective —
it's a highlight reel. The useful version answers three questions
specifically, in writing, the same day the project closes (memory of
"what we'd do differently" fades fast):

| Question | What a real answer looks like |
|---|---|
| What worked? | Be specific: "the reconciliation query caught a real timezone bug in the source data before cutover, not after" — not "the migration went fine" |
| What would you change? | A concrete decision you'd make differently, and why — not a vague "communicate more" |
| What surprised you? | Something the plan didn't anticipate — usually where the next project's risk actually lives |

This is worth writing down for a reason beyond honesty: it's also the raw
material for Lesson 80's interview story. "What would you change?" is,
almost word for word, the question an interviewer asks about any project
on a resume — having a real answer ready, instead of inventing one under
pressure, is the entire point of doing this now.

## What carries forward

Project 3 is a different shape of system entirely — a real-time
streaming fraud detector, not a batch warehouse migration — but two
things carry forward directly: the discipline of validating before
trusting a new pipeline (Lesson 73's reconciliation habit reappears as
Lesson 77's alerting-accuracy checks), and the habit of writing the
retrospective down instead of skipping it because the project "obviously"
went fine.

## Key terms

| Term | Meaning |
|---|---|
| Retrospective | A written, specific answer to what worked, what you'd change, and what surprised you — not a highlight reel |
| Composition | Project 2's real value: proving earlier lessons' individual techniques work together on one real system |

## Check yourself

You're ready for Lesson 75 when you can explain, without looking: why
does a retrospective's "what would you change" answer matter just as
much for a future job interview as it does for the project itself?
