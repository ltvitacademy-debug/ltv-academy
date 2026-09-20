# Capstone: Wrap-Up & Portfolio Presentation

Six lessons ago, Bellhaven Freight Systems had one database on one unprotected server and two
numbers from the business: lose no more than 5 minutes of data, recover within 15 minutes locally
or 4 hours from a site loss. This lesson closes the loop — what actually got built, what it proved
under real testing, and how to present this exact project when it's your own portfolio piece in an
interview, not a company's.

## What you'll learn

- The complete solution, end to end, in the order it was actually built
- How the two test failovers (Lessons 45 and 46) prove the design met its numbers
- How this course fits inside the SQL Server Database Administrator career path, and what comes
  next in it

## What Bellhaven ended up with

Start to finish, this capstone built one coherent answer to a real business problem:

- **Chapter 1's backup discipline, applied (Lesson 43)** — full nightly, differential every
  6 hours, log every 5 minutes, matched exactly to the stated RPO, split correctly across
  primary and secondary per what Always On actually supports
- **Chapter 3's decision framework, applied (Lesson 42)** — recognizing that a 15-minute local
  RTO and a 4-hour site RTO are two different problems needing one combined answer
- **Chapters 4-6's HA technology, applied (Lesson 44)** — AG_Bellhaven: a synchronous,
  automatic-failover local pair for HA, an asynchronous, manual-failover remote replica for DR,
  and a listener that hides all of it from the applications
- **Chapter 8's DR discipline, applied (Lessons 45-47)** — a real planned failover test, a real
  forced-failover disaster test with a measured data-loss window, and a runbook usable by someone
  who wasn't in the room for any of it

## What the two tests actually proved

This is the part a portfolio presentation should lead with, because it's the part that separates
a design from a working system: Lesson 45 proved the HA leg meets the 15-minute local RTO, with
an actual measured failover time far inside it and zero data loss. Lesson 46 proved the DR leg
survives total site loss, with a measured data-loss window checked against the 5-minute RPO rather
than assumed. A solution that's only ever been described, never executed, hasn't actually been
proven — this one has, twice, under two different failure conditions.

## Presenting this as a portfolio project

When this project comes up in a technical interview, the strongest version of the story isn't
"I learned Availability Groups" — it's the specific sequence: a stated business requirement (RPO/
RTO), a technology decision defended against two ruled-out alternatives (FCI, log shipping alone),
a concrete implementation, and two executed tests with measured results. Being able to name the
exact commands (`ALTER AVAILABILITY GROUP ... FAILOVER` vs. `FORCE_FAILOVER_ALLOW_DATA_LOSS`) and
explain precisely when each applies is what separates someone who read about Always On from
someone who has actually operated it.

## Where this course sits, and what's next

SQL Server HA, Backup & Disaster Recovery is one of four courses in the Advanced stage of the
**SQL Server Database Administrator** career path: **SQL Server Performance Tuning** (already
complete), this course, **Azure Database Administrator**, and **PowerShell Automation & DevOps
for DBAs**. Each covers a different piece of what a working SQL Server DBA actually does day to
day — tuning workloads, protecting data on-prem, protecting and operating it in Azure, and
automating the repetitive parts of the job. From here, continuing through the rest of the Advanced
stage builds toward the same kind of concrete, defensible project this capstone just walked
through — for a cloud environment, and for the automation layer around all of it.

## Key terms

| Term | Meaning |
|---|---|
| AG_Bellhaven | The three-replica Availability Group built and tested across this capstone |
| Measured RTO/RPO | The actual, verified failover time and data-loss window from real tests — not assumed numbers |
| Portfolio project | A concrete, defensible piece of work with a stated requirement, a defended decision, and tested results |
| Advanced stage | The SQL Server Database Administrator path's four-course sequence this course belongs to |

## Check yourself

If you were presenting this capstone in an interview, which single fact would do more to prove
the solution actually works: describing how AG_Bellhaven was configured, or describing what
Lesson 46's forced failover test measured? Why?
