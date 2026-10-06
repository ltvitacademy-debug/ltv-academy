# Sales Pipeline Reporting

**Chapter 4 · Business Analytics · Lesson 19 of 22**

Everything in Chapters 1 through 3 was a tool. This chapter puts those tools to work on the questions a real sales organization actually asks. Pipeline reporting is the most common of them: how much is in the pipeline, how healthy is it, and is it moving fast enough to hit the number.

## What you'll learn

- The core pipeline questions a sales leader needs answered
- Building a pipeline-by-stage report
- Stage duration and the "stuck deal" problem
- Turning pipeline reports into a dashboard a sales manager actually uses

## The questions pipeline reporting answers

A sales leader isn't asking for data for its own sake — they're asking four specific things: **How much is open?** (total pipeline value), **Is it enough?** (pipeline vs. quota, usually expressed as pipeline coverage — a 3x-4x multiple of quota is a common target), **Is it moving?** (stage velocity, how long deals sit at each stage), and **What's at risk?** (deals past their expected close date, or stalled at one stage too long).

## Building the pipeline-by-stage report

Start from an **Opportunities** report type, filtered to open opportunities only (`Stage` not in Closed Won/Closed Lost). Group by **Stage**, summarize **Sum of Amount**, and you have the foundation: every open deal, bucketed by where it sits in the sales process. A **Matrix** format adds a second grouping — by **Owner** or **Close Month** — to see not just total pipeline, but whose pipeline, and when it's expected to close.

## Stage duration and stuck deals

Pipeline value alone hides a real problem: a deal that's been sitting in "Negotiation" for 90 days looks the same on a pipeline-by-stage report as one that arrived yesterday. Reporting on **days in current stage** (available as a standard field on Opportunity) surfaces exactly this — filter for deals with unusually long stage duration, and you've built an early-warning report instead of just a snapshot.

## From reports to a pipeline dashboard

A working pipeline dashboard usually combines: a **funnel chart** (pipeline by stage, visualizing the expected drop-off), a **metric widget** (total open pipeline, a single number), a **table** (deals at risk — past close date or stuck too long), and often a **bar chart** by owner or team, so a manager can see both the aggregate picture and where to focus coaching conversations.

## Recap

- Pipeline reporting answers four questions: how much, is it enough, is it moving, what's at risk.
- The foundation is an Opportunities report grouped by Stage, filtered to open deals.
- Days-in-stage reporting catches stuck deals that a simple pipeline total hides.
- A pipeline dashboard combines a funnel, a key metric, an at-risk table, and usually an owner breakdown.

## Check yourself

A pipeline-by-stage report shows healthy total pipeline value, but the sales VP is still worried. What report, built on top of the same data, would reveal a problem the stage totals alone can't show?
