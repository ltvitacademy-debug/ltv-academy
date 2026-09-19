# Portfolio & Interview Prep

This is the last lesson of AWS Capstone — and the last lesson of the entire AWS Data Engineer
career path. Everything from AWS Fundamentals through AWS Data Engineering through this capstone
converges here: writing this project up so it gets you the interview, and prepping for the
questions it's going to draw once you're in the room.

## What you'll learn

- How to write the Northfield project for a resume and portfolio
- A real bank of likely interview questions this capstone prepares you to answer
- What "done" means for the whole AWS Data Engineer path, both stages

## Writing it up for a resume

A project bullet should name the real architecture and a real outcome, not just list service
names:

> Built a serverless AWS data pipeline (S3, Glue, Redshift Serverless, Step Functions, Athena)
> for a simulated mid-size retailer, replacing a manual nightly export with an automated,
> monitored pipeline delivering same-day sales and inventory visibility; added CI/CD,
> least-privilege IAM, and a documented DR plan (RTO/RPO) to production-harden the build.

That single bullet has an architecture, a before/after outcome, and proof of production
maturity — the three things a resume screener and a technical interviewer both look for.

## Portfolio write-up structure

For a portfolio page or GitHub README, the five-beat story arc from Lesson 14 becomes the
document structure directly: **Business Problem**, **Architecture** (the diagram from Lesson 2),
**Build** (real code snippets: the PySpark transform, the ASL state machine, the Redshift DDL),
**Production Practices** (monitoring, IAM, CI/CD, cost, DR — each with the specific resource
names from this course), **Results**. Link the GitHub repo (`northfield-data-platform`) so a
reviewer can read the actual Glue script and state machine definition, not just a description of
them.

## Interview question bank

Questions this capstone specifically prepares you to answer, because you built the actual
decision, not just the AWS feature:

- *"Walk me through your data pipeline architecture."* — the Lesson 2 diagram, end to end.
- *"Why Redshift Serverless instead of a provisioned cluster?"* — Northfield's bursty, month-end
  query pattern (Lesson 6).
- *"How do you handle pipeline failures?"* — Step Functions' `Catch` states plus two independent
  CloudWatch alarms (Lessons 8-9).
- *"How is this secured?"* — three IAM roles, each scoped to exact resource ARNs, not broad
  service access (Lesson 10).
- *"How do changes get deployed?"* — GitHub Actions assuming a role via OIDC, no stored AWS keys
  (Lesson 11).
- *"What's your disaster recovery plan?"* — stated RTO/RPO per failure scenario, backed by real
  versioning, CRR, and snapshot retention (Lesson 13).
- *"What would you change at scale?"* — DMS for CDC ingestion, Redshift concurrency scaling, a
  tighter RPO (Lesson 14).

Every answer traces back to a real lesson, a real resource name, and a real trade-off you can
defend under a follow-up question — because you're not describing a tutorial, you're describing
decisions you made.

## What "done" means, both stages

This closes out **both** stages of the AWS Data Engineer career path: the **Job Ready** stage
(AWS Fundamentals for Data Engineers, then AWS Data Engineering, teaching every individual
service) and the **Advanced** stage that this capstone completes, where every one of those
services got assembled into one monitored, secured, cost-optimized, disaster-recovery-planned
project. You now have both halves of what an interview actually tests: fluency with the
individual AWS services, and a finished, defensible project built with them.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio write-up | A structured document (README/page) presenting a project's architecture and outcome |
| Interview question bank | A set of anticipated questions mapped to specific, defensible answers |
| Job Ready stage | The AWS Data Engineer path's foundational courses on individual services |
| Advanced stage | This capstone — assembling those services into one production-grade project |

## Check yourself

Why does a resume bullet for this project name specific outcomes (same-day visibility, CI/CD,
documented DR) instead of just listing the AWS services used (S3, Glue, Redshift, Step
Functions)?
