# Lesson 1 — The Business Ask: "What Happens If This Database Disappears?"

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 1 of 10**

## What you'll learn

- How a real backup project actually starts — not with a ticket, but with a scare
- Why "we have a maintenance plan" and "we have a tested backup plan" are not the same claim
- The one specific, testable requirement this whole capstone exists to satisfy

## The scare

You're the newest member of the small IT team at **Overlook Medical Group**, a
regional healthcare provider network running patient records, appointment
scheduling, and billing on a single Azure SQL Database. Last Tuesday, a
developer on the scheduling-app team ran a cleanup script against what they
thought was their local test environment. It was not. A staging table on the
shared database got dropped — no patient data was lost, because it was a
disposable scratch table, but for about ten minutes nobody in the room could
say for certain whether that was true.

The IT Director, Priya, walks over to your desk Thursday morning with the
question that actually matters:

> "We have a maintenance plan that's supposedly been running for two years.
> Nobody on this team has ever restored from it. If that table had been
> `Patients` instead of a scratch table, could we have gotten it back — and
> how fast? Honestly, I don't know. Find out, and fix it if the answer is no."

## Why "we have a maintenance plan" isn't an answer

This is the trap every DBA eventually walks into: a backup job appearing
green in a job history log is not the same claim as "this database can be
recovered." A backup that has never been restored is a *hypothesis*, not a
plan. The only way to know whether a backup actually works is to restore it
— and nobody at Overlook has ever done that, for this database or any other.

Priya's vague fear — "what happens if this disappears" — is a real and
reasonable one for a healthcare provider network to have. `Patients`,
`Appointments`, and `Billing` aren't just tables; they're the only record
some of this data has. But a vague fear doesn't tell you what to build.
Turning it into a specific, testable requirement is this lesson's whole job.

## Turning the fear into a requirement

A follow-up conversation with Priya gets you to something concrete:

- **One database, to start.** Overlook's single Azure SQL Database holding
  `Patients`, `Appointments`, and `Billing` — not every system in the
  company. Small and real beats broad and theoretical for a first project.
- **Backups that are explained, not just scheduled.** Priya wants to know
  *why* each backup type exists, not just that something runs at 2am.
- **A restore that has actually been tested.** Not "the backup completed
  successfully" — an honest, end-to-end restore, done once, with the result
  written down.
- **A plan that survives you leaving the room.** Written down well enough
  that another team member could follow it during an actual incident,
  without you there to explain it.

Written as one sentence, the real ask becomes:

> *"Build and test one real backup and restore plan for Overlook's Azure SQL
> Database — full, differential, and log backups on a sensible schedule, a
> proven point-in-time restore, a basic health check, and a short runbook
> anyone on the team could follow."*

## What you're NOT building (yet)

This project deliberately stays small:

- **One database**, not a company-wide backup audit across every system.
- **No high-availability or geo-replication architecture** — that's a
  real and important topic, but it's a different project from "can we
  restore what we already have."
- **No automation framework or custom alerting pipeline** — the goal here
  is a plan a human can run and trust, not a fully automated system.

## Key terms

| Term | Meaning |
|---|---|
| Maintenance plan | A scheduled SQL Server job that runs backups automatically — says nothing about whether a restore actually works |
| Restore test | Actually restoring a backup to confirm it's usable, not just confirming the backup job reported success |
| Runbook | A written, step-by-step plan a team member could follow during a real incident without the original author present |
| Recovery point objective (RPO) | How much data loss is acceptable, measured in time — it's what decides how often you take log backups |

## Lab

Write your own one-paragraph version of Priya's real requirement, in your
own words: which database, which backup types, what "tested" means, and what
the final written plan needs to contain. You'll build toward exactly this
requirement over the next nine lessons.

## Check yourself

You're ready for Lesson 2 when you can explain, from memory, why a backup
job that has never been restored is a hypothesis rather than a plan — and
state the one sentence that turns Overlook's vague fear into a specific,
buildable requirement.
