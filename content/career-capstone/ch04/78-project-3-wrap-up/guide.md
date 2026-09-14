# Lesson 78 — Project 3: Wrap-Up and Retrospective

**Chapter 4 · Added Projects — Capstones · Lesson 78 of 81**

## What you'll learn

- What Project 3 built, end to end, across Lessons 75–77
- How much of the entire 4-course track this one project actually touched
- Running the same honest retrospective format from Lesson 74
- The transition from technical projects to the career-focused closing
  lessons

## What got built

```
Lesson 75:  Kickoff — scenario, latency budget, Kappa fit, serving-layer
            requirement, all fixed before any tool was chosen
Lesson 76:  Streaming ingestion (Eventstream) + rolling feature
            computation on a sliding window, with a deliberate
            watermark trade-off
Lesson 77:  Threshold scoring + Activator-driven alerting, made
            idempotent with a keyed MERGE
```

Three projects into this capstone chapter, the pattern should be obvious:
every project is a *composition* exercise, not a place where brand-new
theory gets introduced. Project 3 in particular reached across all four
courses in the track at once — Kappa architecture and idempotency from
this course's own Chapter 1, Eventstreams and windowing from Fabric &
Real-Time Analytics, the `MERGE INTO` upsert pattern from Databricks &
Delta Lake, and the back-of-the-envelope estimation habit from Data
Engineering Foundations, all in three lessons.

## The retrospective, one more time

Same three questions as Lesson 74, applied to a very different kind of
system — which is exactly the point of asking them again:

| Question | What it looks like for this project |
|---|---|
| What worked? | The sliding-window feature computation caught the intended fraud pattern reliably in testing — specific evidence, not "it worked" |
| What would you change? | Maybe the watermark trade-off — accepting more staleness for stricter accuracy, or vice versa, once real latency numbers came in |
| What surprised you? | How much of the design was decided at kickoff (Lesson 75), before any pipeline code — the numbers ruled out entire approaches early |

Writing this down for a streaming system is more valuable, not less, than
for the warehouse migration — real-time systems fail in ways that are
harder to notice after the fact, so the retrospective is often the only
place the near-misses get recorded at all.

## From technical to career-focused

The three capstone projects are now complete. What's left in this chapter
is a genuine turn: Lessons 79 and 80 aren't technical lessons at all —
they're about taking Project 1's retail platform, Project 2's warehouse
migration, and Project 3's fraud detector, and turning them into a
portfolio and an interview story that actually gets a hiring manager's
attention. The retrospectives written for both projects are the raw
material for exactly that.

## Key terms

| Term | Meaning |
|---|---|
| Composition exercise | What every capstone project actually is — proving earlier lessons combine, not teaching new theory |
| Cross-course reach | Project 3 alone drew on all four courses in the Data Engineering track |

## Check yourself

You're ready for Lesson 79 when you can explain, without looking: why
does this lesson say a retrospective matters *more*, not less, for a
real-time streaming system than for a batch migration?
