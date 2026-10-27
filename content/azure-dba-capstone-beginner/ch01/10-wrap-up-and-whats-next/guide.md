# Lesson 10 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 10 of 10**

## What you'll learn

- A full recap of what you actually built across this project, lesson by lesson
- Why this specific project was the right first capstone for an Azure DBA path
- What's deliberately still missing, and why that's the honest boundary of a beginner project
- Where the Intermediate tier picks up from here

## What you actually built

Nine lessons ago, Priya asked a vague question: what happens if this
database disappears? Here's the specific, real thing you built in answer:

| Lesson | What you did |
|---|---|
| 1 | Turned a vague fear into one specific, testable requirement |
| 2 | Planned a real backup strategy — full, differential, log — with a deliberate RPO/RTO trade-off |
| 3 | Deployed the real Azure SQL Database the plan protects |
| 4 | Confirmed Azure's automated full backup, and why `BACKUP DATABASE` doesn't apply here |
| 5 | Confirmed the differential backup chain, and why it stays cheap even as it grows |
| 6 | Confirmed the log backup chain — the one that makes point-in-time recovery possible |
| 7 | Actually restored the database to a point in time, and verified the result |
| 8 | Wrote a two-part health check — session activity and backup-chain currency |
| 9 | Documented all of it as a runbook a teammate could actually follow |

That's not a toy exercise. It's a real, working answer to Priya's question
— one a team member could hand to an auditor, a new hire, or themselves at
2am during an actual incident.

## Why this was the right first project

Notice what made this project effective: it was **small, real, and
tested**. One database, not a company-wide audit. Real Azure CLI commands
and real DMV queries, not hypothetical ones. And critically, Lesson 7
wasn't optional — the restore actually happened, which is the one thing
Overlook's original maintenance plan never did. A beginner DBA capstone
that skipped the actual restore test would have taught the same T-SQL
concepts without proving the one thing that matters most: does this
actually work.

## What's honestly still missing

This project was scoped deliberately, and it's worth naming what's still
out of bounds, not pretending it's complete:

- **No high-availability or geo-replication** — Overlook's database still
  has a single point of failure at the region level.
- **No automated alerting** — Lesson 8's health check is something a human
  runs, not something that pages anyone automatically.
- **Only one database** — Overlook almost certainly has other systems that
  deserve the same treatment eventually.
- **No performance tuning** — this project was entirely about recoverability,
  not speed.

None of these are failures of this project. They're the honest edge of
"beginner," and naming them is itself part of professional scoping — the
same skill Lesson 1 taught at the very start.

## What's next: the Intermediate project

The Intermediate-tier capstone picks up exactly where this one leaves off:
Overlook now has two departments and a growing performance problem, not
just a recoverability one. Where this project asked "can we get the data
back," the next one asks a harder question: "can the system keep up, and
can two teams share it safely." The backup discipline you built here
doesn't go away — it's the foundation the next project is built on top of.

## Key terms

| Term | Meaning |
|---|---|
| Scoping | Deliberately deciding what's in and out of a project — and naming what's left out, honestly |
| High availability (HA) | Architecture that keeps a system running through a failure — a real topic, out of scope for this project |
| Recoverability | Whether a system's data can be restored after loss — this project's entire focus |

## Lab

Write your own one-paragraph summary of what you built, as if explaining it
to Priya directly: what exists now that didn't before, what you tested, and
what's still explicitly out of scope. This is good practice for how you'd
actually report finished work to a real stakeholder.

## Check yourself

You've completed the Beginner Capstone when you can explain, from memory,
every row of the recap table above, and state clearly why Lesson 7's actual
restore test was the one non-negotiable step in the whole project.
