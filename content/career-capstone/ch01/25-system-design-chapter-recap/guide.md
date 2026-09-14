# Lesson 25 — System Design Chapter Recap

**Chapter 1 · System Design for Data Engineers · Lesson 25 of 81**

## What you'll learn

- The full arc of this chapter's 24 lessons, in one pass
- How the four case studies each recombined the same building blocks differently
- Why this chapter's skill is a process, not a memorized set of answers
- What comes next: DP-700 Certification Prep

## The arc, start to finish

This chapter built one connected argument, not 24 separate topics.
Each lesson supplied a piece the next one needed:

```
Lessons 1-3:   what system design even is; gathering requirements as
               functional vs. non-functional; estimating scale
Lessons 4-5:   choosing storage (OLTP/OLAP/object); choosing a
               processing model (batch/streaming/hybrid)
Lessons 6-7:   Lambda's two codepaths; Kappa's one, and what it costs
Lesson 8:      the star schema, revisited as a scale problem
Lessons 9-10:  partitioning a fact table; sharding a live store
Lessons 11-12: designing for idempotency; delivery guarantees
Lessons 13-15: the ingestion, transformation, and serving layers
Lesson 16:     caching strategies for a read-heavy serving layer
Lessons 17-19: multi-tenancy; freshness SLAs; the CAP theorem
Lessons 20-23: four case studies, recombining all of the above
Lesson 24:     presenting a design out loud, under interview pressure
```

## Four case studies, one toolbox, four different answers

The clearest proof this was one connected skill, not a checklist:
every case study drew from the *same* toolbox and still landed on a
different design, because the requirements differed.

```
Ride-sharing (20):   Kappa fit naturally -- one replayable pipeline,
                     two grains, two SLAs on one platform
Fraud detection (21): streaming-only, no batch path at all --
                     idempotent scoring, leaning AP on purpose
Retail inventory (22): Lambda actually justified -- two genuinely
                     different computations, shared tenancy required
Social media (23):   volume was the whole problem -- content_id
                     sharding, a cached leaderboard, leaning AP
```

Same 19 lessons' worth of tools, four different combinations, because
four different sets of requirements produced four different correct
answers. That's the actual point of Lesson 2's opening argument,
proven four times over.

## The real skill was never memorization

Nothing in this chapter was meant to be memorized as a fixed answer.
The transferable skill is Lesson 24's four-step process — clarify,
estimate, propose, discuss trade-offs — applied with this chapter's
vocabulary (grain, partitioning, sharding, idempotency, delivery
guarantees, freshness, CAP) as the material that fills steps 3 and 4.
A new scenario, never seen before, gets the same treatment: ask what's
actually required, then reach into this same toolbox.

## Chapter 1 is complete

That closes System Design for Data Engineers — 25 lessons, four fully
worked case studies, and one repeatable process for presenting a
design out loud. **Chapter 2, DP-700 Certification Prep, is next**,
turning this same underlying knowledge — much of it already covered
across the Data Engineering track's first three courses — toward the
specific exam domains, weighting, and question patterns of Microsoft's
DP-700 certification.

## Key terms

| Term | Meaning |
|---|---|
| The toolbox | Grain, storage, processing model, partitioning, sharding, reliability, layers, CAP |
| Recombination | The same toolbox producing different designs for different requirements |
| Chapter 2 | DP-700 Certification Prep — next in this course |

## Check yourself

Before starting Chapter 2, make sure you can do this without notes:
given a one-sentence description of a new system, run Lesson 24's
four-step process on it out loud, reaching into this chapter's
toolbox as needed.
