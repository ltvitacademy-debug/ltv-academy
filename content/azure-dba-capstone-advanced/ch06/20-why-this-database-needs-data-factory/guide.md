# Lesson 20 — Why This Database Needs Data Factory

**Chapter 6 · The ETL Layer With Data Factory · Lesson 20 of 26**

## What you'll learn

- The real business reason Overlook's database needs an ongoing data feed at all
- Why this capstone adds this fifth piece, beyond the board's original four deliverables
- Why Data Factory, specifically, and not a manual import process
- Why this is built last, in Chapter 6, not earlier

## Where Overlook's appointment data actually comes from

Everything built in Chapters 2-5 secured and protected `OverlookDB` as it already exists. But
Overlook's real appointment scheduling doesn't happen only inside this database — a separate,
existing **scheduling system** (a third-party booking platform patients and front-desk staff
actually use) is where new appointments get created first. For `OverlookDB` to stay useful for
reporting and billing, those appointments need to land in it on an ongoing basis — not as a one-
time import, but as a continuous feed.

## Why this is genuinely Lesson 2's fifth piece, not scope creep

Lesson 2 planned five pieces for this capstone, and named the ETL layer explicitly as the last one,
dependent on everything before it. This isn't an afterthought bolted onto a finished security/DR
project — it's the piece that makes the rest of this platform actually useful day to day. A
perfectly secured, perfectly protected database that never receives new appointment data isn't
solving a real problem for Overlook; it's a museum piece.

## Why Azure Data Factory, not a manual export/import

Overlook could, in theory, have someone manually export a file from the scheduling system and
import it into `OverlookDB` on some schedule. That's exactly the kind of manual, person-dependent
process Lesson 1's mandate exists to eliminate — the same reasoning that justified Chapter 5's
automation applies here. **Azure Data Factory** is Azure's managed ETL/orchestration service,
purpose-built for exactly this: moving data from a source system into a destination like Azure SQL,
on a schedule, without a person running it by hand.

## Why this is built last, in Chapter 6

Lesson 2's dependency chain put this last for a real reason: the ETL pipeline needs somewhere
stable, secured, and protected to write into. Building it before Chapter 2's infrastructure existed
would have had nothing to write to. Building it before Chapter 3's security would mean landing
patient-adjacent appointment data into an unsecured table. Building it before Chapter 4's HA/DR
would mean an ongoing feed into a database with no tested recovery plan. Now that all three exist,
the pipeline has a genuinely stable, secured target.

## What the next two lessons actually build

Lesson 21 builds the real pipeline — a Copy activity moving appointment data from the scheduling
system's export into `OverlookDB`. Lesson 22 covers monitoring that pipeline, so a failed run gets
noticed the same way Chapter 5's health checks get noticed — not discovered days later when a
report looks wrong.

## Key terms

| Term | Meaning |
|---|---|
| Scheduling system | The existing, separate booking platform where Overlook's appointments are actually created |
| Azure Data Factory | Azure's managed ETL/orchestration service for moving data between systems on a schedule |
| ETL | Extract, Transform, Load — the general pattern this chapter's pipeline implements |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why does this capstone's
dependency order put the Data Factory pipeline after infrastructure, security, and HA/DR, rather
than building it first?
