# Lesson 24 — Presenting Your Capstone

**Chapter 5 · Wrap-Up · Lesson 24 of 25**

## What you'll learn

- A five-part structure for walking an interviewer or portfolio
  reviewer through this exact finished project, in order
- What to actually put on screen during a live screen-share, versus
  what to summarize out loud
- How to talk about a deliberate scope decision — like leaving
  `Production.Location` out of the model — as evidence of judgment,
  not as a confession of something left unfinished

## Why this lesson exists

Chapter 4 built the materials a job search runs on: a resume, a
portfolio strategy, answers to common questions. This lesson is where
those materials meet the actual project you spent Chapters 1 through 3
building. A finished pipeline that nobody can explain clearly in five
minutes doesn't get you hired — the ability to walk someone through it,
confidently and in the right order, is a skill in its own right, and
it's the last technical skill this program teaches.

## The five-part walkthrough

Every strong project walkthrough follows the same shape, whether it's
a live interview, a recorded portfolio video, or a hiring manager
reading a written case study. Structure this capstone's presentation
in this order, every time:

| Part | What you say | What this capstone's version is |
|---|---|---|
| 1. Business problem | What real-world question does this solve? | "Track manufacturing work orders end to end — planned versus actual output, and why units get scrapped" |
| 2. Architecture | What tools, in what order? | `stg.WorkOrder` -> `WorkOrderETL.dtsx` -> `dw.FactWorkOrder` + dimensions -> `WorkOrderProductionSummary.rdl` + Power BI |
| 3. Design decisions | What choices did you make, and why? | The accumulating snapshot fact, the role-playing date keys, the scoped-out `Location` table |
| 4. The finished result | What does it actually produce? | The SSRS report's grouped scrap-rate view, the Power BI dashboard's trend and on-time visuals |
| 5. What you'd improve next | What's the honest next iteration? | Slowly changing dimension tracking on `DimProduct`, incremental loads instead of full reloads, alerting on scrap-rate spikes |

Notice that part 5 isn't optional. Interviewers ask "what would you do
differently" whether you volunteer it or not — having a real,
specific answer ready, instead of improvising one under pressure,
is the difference between sounding reflective and sounding caught
off guard.

## What to actually screen-share

Screen time is scarce and attention is short. Don't scroll through
every SSIS package or every SQL script live — pick the three or four
things that prove the project works, and narrate the rest from memory:

- **The architecture diagram** (Lesson 2's, redrawn or recreated) —
  orient the viewer before showing any tool
- **One control flow view of `WorkOrderETL.dtsx`** — enough to show
  the package actually does something, not a line-by-line tour
- **The `WorkOrderProductionSummary.rdl` report, rendered** — the
  grouped-by-product view with the scrap rate column visible
- **The Power BI dashboard**, specifically the scrap-rate trend and
  the on-time-versus-late visual — these are the two visuals a
  paginated report couldn't produce, so they're the ones worth
  dwelling on

Everything else — the staging table's DDL, the individual dimension
tables, the deployment scripts — gets described in a sentence, not
demonstrated on screen. A reviewer remembers what they watched happen,
not what scrolled past.

## Talking about scope as a strength

`Production.Location` is the single best example in this whole
capstone of a decision worth explaining out loud, because it shows
judgment rather than gaps. The wrong way to describe it: "I didn't get
to Location." The right way: "Location lives at the WorkOrderRouting
grain, one level finer than the work-order grain I chose for this fact
table. Modeling it would have meant either fanning the fact table out
past its intended grain, or picking one location per work order
arbitrarily — so I scoped it out and documented why." The second
version is a sentence about a modeling decision. The first is an
apology. Interviewers are listening for the second one, because it's
the same reasoning they'll want you to apply on their own team's real,
messy data.

The same reframing applies to the accumulating snapshot fact and the
role-playing date keys: don't just name them, explain *why* the design
needed them — three lifecycle dates that had to update in place, three
roles for one date dimension instead of three redundant tables. A
name without a reason sounds memorized. A reason sounds understood.

## Key terms

| Term | Meaning |
|---|---|
| Project walkthrough | A structured explanation of a finished project — problem, architecture, decisions, result, next steps — used in interviews and portfolio reviews |
| Scope decision | A deliberate choice to leave something out of a project's boundaries, made and documented on purpose rather than left unfinished |

## Lab

1. Using Lesson 2's architecture and the five-part structure above,
   write out your own two-to-three-sentence answer for each of the
   five parts, in your own words. Time yourself reading it aloud — a
   full walkthrough should land in two to three minutes, not ten.
2. Write one sentence explaining the `Production.Location` scope
   decision the way this lesson recommends — reasoning, not apology.
   Reuse the sentence you wrote about role-playing date keys back in
   Lesson 2's lab if it helps.
3. Pick the one visual from the Power BI dashboard you'd spend the
   most screen time on if you only had thirty seconds, and write down
   why that one and not the others.

## Check yourself

You're ready for Lesson 25 when you can deliver the five-part
walkthrough for this capstone out loud, in under three minutes,
without reading from notes — and when your explanation of the
`Production.Location` decision sounds like a design choice, not an
excuse.
