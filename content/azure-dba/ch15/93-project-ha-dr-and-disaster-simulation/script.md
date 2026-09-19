# Script — Project: HA/DR & Disaster Simulation

## Segment 1 (title)

Leadership's vague "know how bad an outage would be" from Lesson 90 is now a concrete constraint: no more than 15 minutes of data loss, operational again within one hour. Your job is to turn those two numbers into an actual architecture.

## Segment 2 (steps: naming the numbers first)

Fifteen minutes of acceptable data loss is your RPO. One hour to be operational is your RTO. Naming both before reaching for an architecture is the actual skill — picking Always On or geo-replication first and hoping it fits the business is working backwards.

## Segment 3 (code: matching architecture to the numbers)

An RTO of one hour rules out manual failover — it has to be automatic, which points to Auto-Failover Groups on Managed Instance. An RPO of 15 minutes means replication lag is something you monitor continuously, not a box you check once. And a regional disaster specifically means local backups alone aren't enough — you need geo-redundant storage or a cross-region secondary.

## Segment 4 (steps: proving recovery, not assuming it)

Run DBCC CHECKDB on the failed-over copy before calling it recovered. Compare row counts and checksums against the last known-good state. Confirm the app is actually connecting through the failover group's listener, not an old server name. And time the whole event to check whether the real numbers held.

## Segment 5 (outro)

Chapter 15's real-world project is complete — Meridian went from one on-prem server with no HA/DR to a migrated, secured, tuned, automated, and disaster-tested Azure environment. Chapter 16, this course's final chapter, is next: exam review, then DBA interview practice.
