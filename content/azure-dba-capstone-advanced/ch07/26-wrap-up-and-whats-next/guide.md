# Lesson 26 — Wrap-Up: What You Built, and What's Next

**Chapter 7 · The Incident, Presenting, and Wrap-Up · Lesson 26 of 26**

## What you'll learn

- Everything this capstone actually built, chapter by chapter, in one place
- How each piece answers a specific part of the board's original mandate from Lesson 1
- Where this capstone sits in the larger Azure Database Engineer path
- What a real next step looks like, for this platform and for your own skills

## Everything built, in one place

| Chapter | What got built | Answers |
|---|---|---|
| 2 | A Bicep template provisioning Overlook's Azure SQL server and database, parameterized for dev/prod | "Infrastructure as code" |
| 3 | TDE confirmed, column-level masking, server/database auditing, least-privilege roles | "Security and compliance posture" |
| 4 | RPO/RTO targets, a tested failover group, geo-replication, a real DR runbook | "A tested disaster recovery plan" |
| 5 | dbatools health checks, backup verification, and automatic alerting | "Real automation" |
| 6 | A Data Factory pipeline feeding appointment data into the secured, protected database | Keeping the platform genuinely useful day to day |
| 7 | An unannounced DR drill, honestly validated against targets, presented to the board | Proof, not just promises |

Every row in that table traces back to a specific sentence in Lesson 1. That's not a coincidence —
it's the entire discipline this capstone was built to practice: starting from a real business
requirement and building exactly what answers it, nothing invented and nothing skipped.

## Where this sits in the larger path

This Advanced capstone closes out the Azure Database Engineer path's capstone sequence, following
the Beginner capstone's backup discipline and the Intermediate capstone's performance tuning, both
built around this same company. Together, the three capstones trace Overlook's actual maturity
curve: from "does this work at all" to "is this fast" to "is this a platform a board can trust with
patient data" — which is exactly the arc a real database career follows too.

## What a real next step looks like for this platform

A real production platform is never actually "done" — Overlook's next real step would be hardening
the Bicep template further (adding the firewall rules and auditing resources as code, instead of
configured separately from the infrastructure that provisions everything else), extending
monitoring with Azure Monitor dashboards instead of just alerting, and scheduling a recurring DR
drill cadence instead of treating Chapter 7 as a one-time event.

## What a real next step looks like for you

The skills this capstone exercised — IaC review, security posture design, tested HA/DR, scripted
automation, and an ETL feed, all tied to a real business mandate — are exactly what a hiring
manager wants to hear described in an interview, in the same language Lesson 25 used to present it
to the board: outcomes and real numbers, not just a list of Azure services touched.

## Key terms

| Term | Meaning |
|---|---|
| Maturity curve | The progression from "does it work" to "is it fast" to "is it a trustworthy platform" |
| Platform, not project | Infrastructure built to be maintained and extended, not a one-time deliverable |

## Check yourself

You've completed this capstone when you can explain, without looking: which chapter of this
capstone answers which specific sentence from Lesson 1's board mandate, and why none of the five
pieces could have been built in a different order.
