# Capstone Kickoff: Design HA/DR for a Real Scenario

Eight chapters built the pieces separately — recovery models and backup strategy in Chapter 1,
restore scenarios in Chapter 2, the HA vs. DR distinction in Chapter 3, Availability Groups in
Chapter 4, Failover Clustering in Chapter 5, log shipping and mirroring in Chapter 6, replication
in Chapter 7, DR planning in Chapter 8. This chapter is one continuous scenario where all of it
comes together for a single company, a single database, and a specific set of numbers a business
actually asked for. This lesson sets the scene; the next six lessons build and test the solution
end to end.

## What you'll learn

- The company and environment this capstone follows through Lesson 48
- The specific risk a single, unprotected SQL Server instance actually carries
- The RPO/RTO numbers the business stated, and the technology decision they force

## The company: Bellhaven Freight Systems

Bellhaven Freight Systems is a regional trucking and logistics company headquartered in Columbus,
Ohio, running dispatch, live load tracking, and freight billing for roughly 40 dispatchers working
around the clock, plus a billing team that closes invoices every night. All of it runs against one
database: **BellhavenOLTP**, on one SQL Server 2019 Enterprise instance, **SQLPRD01**, racked in
Data Center A on the Columbus campus. BellhavenOLTP already runs in FULL recovery (Chapter 1) with
a nightly full backup — but that's the entire extent of its protection today. No secondary
replica. No second site. Nothing else.

## The risk a single server actually carries

SQLPRD01 is a single point of failure in two distinct ways, and Chapter 3's HA/DR distinction
(Lesson 13) is exactly the lens for separating them:

- **Component failure (an HA problem)** — if SQLPRD01's storage array or motherboard fails at
  2 AM, dispatch is down until IT restores last night's full backup onto different hardware.
  That's hours, and every transaction since that backup is at risk unless the log is backed up
  too.
- **Site-wide loss (a DR problem)** — a fire, a prolonged power outage, or a network failure at
  the Columbus campus takes SQLPRD01 out entirely, along with anything protecting it locally.

A single server, by itself, has zero answer to either one.

## The business's stated requirements

Bellhaven's VP of Operations and Director of IT stated two numbers in plain business language,
and this course's job is to translate them into a technology decision:

- **RPO: no more than 5 minutes** of dispatch or billing data can be lost, under any failure.
- **RTO: no more than 15 minutes** of downtime for a local hardware failure, and **no more than
  4 hours** if the entire Columbus site is lost.

## The decision this drives

Per Chapter 3's decision framework, a 15-minute local RTO and a 5-minute RPO both point toward
synchronous, automatic protection close to home, while a 4-hour site-loss RTO tolerates a slower,
remote answer instead. Lesson 13 named exactly this shape: "one AG with replicas in both places
does both jobs at once." That's the decision for Bellhaven — a single Always On Availability
Group, **AG_Bellhaven**, with three replicas:

- **SQLPRD01** — the current primary, Columbus Data Center A
- **SQLPRD02** — a new synchronous-commit, automatic-failover replica in Columbus Data Center B
  (two miles away, dark fiber, sub-millisecond latency) — the **HA leg**
- **SQLDR01** — a new asynchronous-commit, manual-failover replica at a colocation facility in
  Indianapolis, roughly 175 miles away — the **DR leg**

An FCI was ruled out: Bellhaven has no SAN spanning both cities, and shared storage doesn't
survive losing the building it sits in. Log shipping alone was ruled out too: its minutes-level
restore lag can't deliver an automatic, sub-15-minute local failover. The next lesson builds the
backup strategy this environment still needs — an AG is not a replacement for backups — and
Lesson 44 builds the AG itself.

## Key terms

| Term | Meaning |
|---|---|
| BellhavenOLTP | The one database this capstone protects — dispatch, load tracking, and billing |
| SQLPRD01 / SQLPRD02 / SQLDR01 | Primary, local HA replica, and remote DR replica for this scenario |
| AG_Bellhaven | The Availability Group chosen to satisfy both the HA and DR requirements at once |
| Stated RPO / RTO | 5 minutes of data loss max; 15 minutes local downtime, 4 hours site-loss downtime |

## Check yourself

Bellhaven's 15-minute local RTO and 5-minute RPO both point to synchronous, automatic local
protection. Why doesn't that same synchronous approach work for the Indianapolis replica, and what
does Bellhaven use there instead?
