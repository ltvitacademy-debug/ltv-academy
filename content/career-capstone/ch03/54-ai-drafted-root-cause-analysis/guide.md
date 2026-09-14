# Lesson 54 — Using an LLM to Draft a Root Cause Analysis

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 54 of 81**

## What you'll learn

- How to feed a pipeline failure's logs and error context to an LLM for a first-pass RCA
- Why that draft is a starting point for investigation, never the final answer
- What to paste in for the draft to be useful at all
- How this compares to the manual RCA process from Course 3

## RCA, revisited with a co-pilot

Fabric & Real-Time Analytics Lesson 58 walked through root cause
analysis step by step: reproduce, isolate, trace back through the
pipeline stages, confirm the actual cause before calling it fixed.
None of that changes here. What an LLM adds is speed on the first
step that process always starts with — reading a wall of logs and
proposing where to look first. Paste in the failed run's error
message, the surrounding log lines, and a short description of what
the pipeline is supposed to do, and a capable LLM will draft a
plausible hypothesis in seconds instead of the ten minutes it takes a
human to scan the same log by eye.

```
What to paste in for a useful draft:
- the exact error message and stack trace
- ~20-30 lines of log immediately before the failure
- the pipeline stage that failed (ingestion? transform? load?)
- what changed recently, if anything (deploy, schema, data volume)
```

## A draft hypothesis, not a verdict

An LLM's RCA draft reads persuasively — confident, well-organized,
citing specific line numbers from the log you gave it. That
confidence is not evidence. The model is pattern-matching your error
against similar-looking failures it has seen in training data; it has
no access to your actual system, your data's real history, or the
deploy that happened an hour ago that isn't in the logs you pasted.
Treat the draft exactly the way Fabric Lesson 58 treats any
hypothesis before it's confirmed: as the first thing to check, not
the conclusion.

```
LLM draft says:  "This looks like a null-pointer from an unhandled
                  empty partition after the upstream schema change."
Still required:  actually check whether the upstream schema changed,
                  actually find the empty partition, actually confirm
                  the null-pointer traces back to that partition —
                  before writing it in the incident report.
```

## Where it earns its keep

The draft's real value is triage speed on high-volume, repetitive
failures — the third "connection timeout" alert this week, where a
human's first instinct is already "probably the same thing as last
time." An LLM can scan the log, confirm or rule out that instinct in
seconds, and free the human's attention for the failures that are
actually novel. It's worth less on a failure nobody has seen before,
where there's no pattern in its training data to match against in
the first place — that's exactly the case Lesson 61 comes back to.

## Key terms

| Term | Meaning |
|---|---|
| RCA draft | An LLM's first-pass hypothesis from logs — a starting point, never a verdict |
| Pattern-matching | What the LLM is actually doing: matching your error to similar-looking ones it has seen before |
| Confirmation step | The mandatory human check that turns a draft hypothesis into an actual finding |

## Check yourself

You're ready for Lesson 55 when you can explain, without looking:
why does an LLM's confident, well-organized RCA draft still require
the same confirmation steps as a human's first guess would?
