# Lesson 63 — Capstone Overview: What You'll Build

**Chapter 4 · Added Projects — Capstones · Lesson 63 of 81**

## What you'll learn

- The three capstone projects ahead, and why they're sequential, not parallel
- The kickoff → build → wrap-up format every project follows
- Why "portfolio-quality" means citing your own decisions, not just finishing a build
- Where each project's tools come from across the whole Data Engineering track

## Three projects, one track

Chapters 1–3 taught system design (Chapter 1), the DP-700 exam (Chapter 2),
and AI-assisted engineering (Chapter 3) as separate skills. This chapter
doesn't teach anything new — it makes you build three projects that force
those skills, plus everything from the two courses before this one, to work
together on a single system at a time.

```
Project 1 (Lessons 64-69): Real-Time Retail Analytics Platform
  -> in-store + online sales events, dashboard by region/category

Project 2 (Lessons 70-74): Multi-Source Data Warehouse Migration
  -> consolidating legacy systems into one Fabric Data Warehouse

Project 3 (Lessons 75-78): Streaming Fraud Detector
  -> real-time transaction scoring and alerting
```

Each project is a complete, small system — not a toy exercise. You'll make
the same decisions a working data engineer makes: what grain to model at,
which storage engine fits, how fresh the data needs to be, and what breaks
first at scale. Lesson 22's retail inventory case study sketched a system
like Project 1 in miniature; this time you build the whole thing instead of
whiteboarding it.

## The format: kickoff, build, wrap-up

Every project runs the same shape:

```
Kickoff   -- requirements + Chapter 1's system-design process applied
Build     -- ingestion -> transformation -> serving, one lesson per layer
Hardening -- production concerns: errors, monitoring, alerting
Wrap-up   -- retrospective: what was built, what would change at 10x scale
```

Project 1 gets the full five-lesson treatment (Lessons 64-69) because it's
your first pass through the whole loop. Project 2 and Project 3 compress the
build lessons but keep the same kickoff-then-retrospective bookends, because
that bookend is the habit this chapter is actually training.

## Why the citations matter

Every build lesson in this chapter names the specific prior lesson a
decision comes from — "the medallion bronze/silver/gold pattern," not just
"clean the data in stages." That's not decoration. A capstone project you
can't explain in terms of specific, named techniques is a project you built
by copying steps, not one you can defend in an interview. Lesson 24's
whiteboarding practice is exactly the skill you're rehearsing here: being
able to say *why* you chose Delta MERGE over a full rewrite, or a Fabric
Eventstream over a batch job, using the vocabulary from the courses that
taught you those tools.

## What "portfolio-quality" means here

None of these three projects are graded pass/fail. They're built to be
described out loud, in a real interview, the way Lesson 24 rehearsed. That
means each wrap-up lesson matters as much as the build lessons — a project
you can't retrospect honestly (what would break first, what you'd redo) is
a project you haven't actually understood yet.

## Key terms

| Term | Meaning |
|---|---|
| Kickoff | Applying Chapter 1's system-design process to scope one project before building it |
| Build lessons | One lesson per architectural layer: ingestion, transformation, serving, hardening |
| Retrospective | An honest wrap-up: what was built, which named tools it used, what breaks at 10x scale |

## Check yourself

You're ready for Lesson 64 when you can name, without looking: the three
capstone projects in order, and the one layer each project's build lessons
will always cover first.
