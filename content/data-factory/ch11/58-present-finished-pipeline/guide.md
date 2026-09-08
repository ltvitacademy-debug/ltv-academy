# Lesson 58 — Present the Finished Pipeline

**Chapter 11 · Capstone Project · Lesson 6 of 6**

## What you'll learn

- How to walk someone through this pipeline in under five minutes
- Tying every piece back to the original stakeholder ask
- Turning this capstone into a real portfolio artifact
- Where to go next from here

## Why presenting the work is part of the work

A pipeline nobody can explain is a pipeline nobody else can safely
maintain. In a real job, the person reviewing your work — a
teammate, a manager, an interviewer — almost never has time to read
every activity's configuration themselves. The five-minute walkthrough
you can give *is* often the actual deliverable, as much as the
pipeline itself.

## The five-minute structure

Every strong technical walkthrough follows roughly the same shape.
Here it is, mapped directly onto this capstone:

1. **The problem, in one sentence.** "Northwind's sales data was
   stuck on-premises, with no automated way to see it before the
   morning leadership meeting."
2. **The architecture, at a glance.** Walk the five-stage diagram
   from Lesson 53 — on-prem SQL Server, Copy activity, raw zone, data
   flow, curated table.
3. **One deliberate design decision, explained.** Don't list every
   choice — pick one genuinely interesting one. The Filter-before-Join
   ordering from Lesson 56 is a good candidate: it's a real decision
   with a real reason, not an arbitrary default.
4. **How it fails safely.** The three-layer error handling from
   Lesson 55 — retry, log, alert — is exactly the kind of thing that
   separates a demo from something production-ready.
5. **How you'd know if it broke.** Point at the Log Analytics query
   from Lesson 57. "I don't have to guess if this is reliable — I can
   query it."

## Tying every piece back to the original ask

The strongest way to close a walkthrough is a direct callback to
Lesson 53's four requirements — proof, not assertion, that the
finished pipeline actually satisfies what was asked:

| Original ask | What actually satisfies it |
|---|---|
| "Data currently on-premises" | Self-hosted IR, Lesson 54 |
| "Cleaned up and totaled" | Filter → Join → Aggregate, Lesson 56 |
| "Every morning, on its own" | 5 AM schedule trigger + error handling, Lessons 55 & 57 |
| "No exposed passwords" | Key Vault on both source and sink, Lessons 54 & 57 |

Four requirements, four checkmarks — a genuinely satisfying way to
end any technical presentation.

## Turning this into a real portfolio artifact

This capstone is worth more than a completed checklist once the
course ends:

- **Write it up.** A short README — the business problem, the
  architecture diagram, and two or three of the real design decisions
  from this chapter — turns this from "a course exercise" into
  something you can point an interviewer at directly.
- **Keep the JSON.** Pipeline, data flow, and trigger definitions,
  even without live Azure resources behind them, are concrete
  evidence of real, applied skill — not just course completion.
- **Practice the five-minute version.** The structure in this lesson
  works for any pipeline you build after this course, not just this
  one specific capstone.

## What you've actually built, across this entire course

Eleven chapters, fifty-eight lessons, and one finished, production-
patterned pipeline: integration runtimes and connectors, pipelines
and control flow, mapping data flows, triggers of every real type,
monitoring and error handling that actually holds up overnight,
Fabric Data Factory's re-imagined architecture, and a genuine CI/CD
story from a developer's laptop to production. That's the real shape
of the job, not just a tour of ADF's feature list.

## Key terms

| Term | Meaning |
|---|---|
| Requirement callback | Explicitly tying a finished feature back to the original ask that justified it |
| Portfolio artifact | Work product kept and presentable beyond the course itself |

## Lab

1. Write your own five-minute walkthrough script for this capstone,
   following the five-part structure in this lesson.
2. Draft the README you'd actually publish alongside this project.
3. Pick the one design decision from this chapter you'd highlight to
   an interviewer, and write two sentences explaining why you'd
   choose that one specifically.

## Check yourself

You've finished this course when you can deliver this lesson's
five-minute walkthrough, out loud, from memory — not reading it off
the screen.
