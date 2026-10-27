# Lesson 9 — Documenting the Backup Plan

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 9 of 10**

## What you'll learn

- Why a backup plan that only exists in one person's head isn't actually a plan
- What a real backup/restore runbook contains, section by section
- How to write Overlook's runbook using what you've actually built in Lessons 2-8
- The difference between documentation written to look thorough and documentation someone can actually follow at 2am

## The gap a runbook closes

Lesson 1 opened with a real failure mode: a maintenance plan nobody on the
team had ever tested, trusted mostly because nobody had looked closely
enough to doubt it. Lessons 2 through 8 closed the *technical* half of
that gap — a real schedule, a confirmed backup chain, a tested restore, a
health check. This lesson closes the other half: making sure what you know
doesn't leave the building when you do. A plan that lives only in your head
is exactly as fragile as the maintenance plan that started this whole
project.

## What a real runbook contains

A backup/restore runbook isn't a slide deck or a wiki page restating
Microsoft's documentation — it's a specific, actionable reference for
*this* database, written by someone who actually built and tested the plan.
At minimum, it needs:

| Section | What goes in it |
|---|---|
| System overview | What `db-overlook-core` is, which applications depend on it, who to contact if it's down |
| Backup schedule | The real schedule from Lesson 2 — full weekly, differential daily, log every 5-10 minutes (Azure's actual cadence from Lesson 6) |
| Retention window | What `earliestRestoreDate` currently shows, and how to re-check it |
| Restore procedure | The exact Portal steps and CLI command from Lesson 7, with the real resource group, server, and database names filled in — not placeholders |
| Last tested restore | The date of the Lesson 7 test, how long it took, and what was verified afterward |
| Health check | The two-part query and command from Lesson 8, with what a normal result looks like |
| Escalation | Who to contact, and in what order, if a restore doesn't go as expected |

## Writing it for the worst moment, not the best one

The real test of a runbook isn't whether it reads well on a calm Tuesday —
it's whether a stressed, unfamiliar teammate could follow it during an
actual incident, with the Patients and Billing tables potentially at risk
and Priya asking for an update. That means:

- **Exact commands, not descriptions.** "Run the restore CLI command" is
  useless at 2am; the actual `az sql db restore` command, with real names
  filled in, is usable.
- **No assumed context.** Someone who's never touched this database before
  should be able to follow it, start to finish.
- **A clear "how do I know it worked" step** — point to Lesson 7's
  verification approach (row counts, spot-checking recent records), not
  just "the restore finished."

## This is also the deliverable Priya actually asked for

Go back to Lesson 1's final requirement: *"a short runbook anyone on the
team could follow."* Everything else in this capstone — the schedule, the
deployment, the three backup types, the tested restore, the health check —
exists to make this document true and specific instead of aspirational.
Writing it is not a formality after the real work; it *is* the real work,
made durable.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A written, step-by-step reference for operating and recovering a specific system, usable by someone other than its author |
| Escalation path | Who to contact, and in what order, when a procedure doesn't go as expected |
| Last tested restore | The documented date and result of the most recent real restore test — the single most important line in the runbook |

## Lab

Write Overlook's actual runbook, using the seven sections above, filled in
with the real values from your own Lessons 2-8 work (your actual resource
group name, server name, restore test date and duration, and what a normal
health-check result looks like for your database).

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why does
a runbook need exact commands instead of descriptions, and what makes the
"last tested restore" line the single most important entry in the whole
document?
