# Capstone: Wrap-Up & Portfolio Presentation

The Meridian Outfitters capstone is done: a real symptom, a measured baseline, a specific
diagnosis, a targeted fix, a verified result, and a write-up someone else could act on.
That's the entire arc of this course, run once, start to finish. This closing lesson ties
it together and points to where you go next.

## What you'll learn

- How the six capstone lessons map back onto every chapter in this course
- How to turn this capstone into a portfolio piece
- Where this course sits in the SQL Server Database Administrator career path

## The full arc, mapped back to the course

Every chapter you studied showed up somewhere in this scenario, not as trivia but as the
actual tool that solved a real step:

- **Chapter 1** — the measure→identify→change→verify loop structured all six lessons.
- **Chapter 2** — reading the actual execution plan found the Key Lookup operator.
- **Chapter 3** — covering indexes and included columns designed the fix.
- **Chapter 5** — wait-stat analysis (`PAGEIOLATCH_SH`) confirmed the plan's story.
- **Chapters 4, 6, 7, 8** — query rewrites, tempdb/memory tuning, Query Store, and
  configuration tuning were the other tools in the kit this particular bottleneck didn't
  need — and knowing *that* (not reaching for `MAXDOP` or a query rewrite when the real
  problem was a missing index) is itself part of the methodology.

Notice that last point: a real diagnosis doesn't just find a fix, it rules out the fixes
that *wouldn't* have helped. That's the difference between "I tried a bunch of things and
one worked" and "I knew which chapter's tool applied before I touched anything."

## Turning this into a portfolio piece

An interviewer asking "tell me about a performance problem you solved" wants exactly the
shape of Lesson 51's write-up: symptom, root cause, change, verified result. Walking
through the Meridian Outfitters scenario — a non-covering index causing Key-Lookup-at-
scale for high-volume accounts, confirmed by plan and wait stats, fixed with a specific
`CREATE INDEX`, verified with a 300x drop in both duration and logical reads — demonstrates
the full loop, not just a T-SQL snippet. That's a stronger answer than "I added an index
once and it got faster," because it shows *how* you knew which index, and *how* you knew
it worked.

## Where this course sits in your path

**SQL Server Performance Tuning** is one of four courses in the **Advanced stage** of the
**SQL Server Database Administrator** career path, alongside:

- **SQL Server High Availability, Backup & Disaster Recovery**
- **Azure Database Administrator**
- **PowerShell Automation & DevOps for DBAs**

There's no required order among these four — each covers a different advanced
responsibility a production DBA carries. Together with the Job-Ready stage you completed
earlier in this path, they round out the full skill set the path is built to produce.

## What's next

Pick up wherever the Advanced stage still has ground uncovered for you — high
availability and disaster recovery, Azure-specific administration, or PowerShell-driven
automation are all reasonable next steps, and none of them assumes you've already taken
the others. Whichever you choose, you're carrying the same discipline forward: measure
before you guess, name the bottleneck precisely, change one thing deliberately, and verify
it actually worked.

## Key terms

| Term | Meaning |
|---|---|
| Advanced stage | The tier of the SQL Server Database Administrator path covering deep, specialized DBA responsibilities beyond core job-readiness |
| Portfolio write-up | A structured account of a real (or realistic) tuning problem, framed for an interview or work sample |
| Ruling out a fix | Concluding, from evidence, that a plausible technique (e.g., MAXDOP, a query rewrite) is *not* what this bottleneck needs |
| SQL Server Database Administrator path | The overall career path this course's Advanced stage belongs to, alongside HA/Backup & DR, Azure DBA, and PowerShell Automation & DevOps for DBAs |

## Check yourself

The wrap-up says a strong performance answer in an interview shows "how you knew which
index, and how you knew it worked" — not just that an index got added. Which two capstone
lessons, specifically, supply those two "how" answers?
