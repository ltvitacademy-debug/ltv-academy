# Choosing the Right HA Solution

The previous lesson compared four technologies honestly — what each protects against, and where
each has a real gap. This lesson turns that comparison into an actual decision framework, because
"it depends" is a true answer but not a useful one until it's broken into the specific things it
depends *on*.

## What you'll learn

- The four real inputs to an HA/DR decision: RPO, RTO, budget, and licensing edition
- Why SQL Server edition changes which technologies are even on the table
- How to walk through the framework with a real scenario

## Input 1 & 2: RPO and RTO requirements

**Recovery Point Objective (RPO)** is how much data loss is tolerable, measured in time — "we can
lose up to 5 minutes of transactions." **Recovery Time Objective (RTO)** is how long the system
can be down before it must be back — "we need to be back up within 2 minutes." These two numbers,
gathered from the actual business owner (not assumed by the DBA), immediately rule technologies in
or out: an RTO of seconds effectively requires automatic failover (synchronous AG or FCI), while an
RPO of zero requires synchronous commit specifically, not just "an AG" in general.

## Input 3: Budget

HA technology cost isn't just software licensing — it's duplicate hardware (or duplicate cloud
compute), duplicate storage in the FCI case, network bandwidth for replica traffic, and the
ongoing operational cost of testing failovers and maintaining runbooks. A tight budget that still
needs *some* protection often lands on log shipping precisely because it needs no special cluster
infrastructure — just a second server and scheduled jobs.

## Input 4: SQL Server edition and licensing

This is the input most often skipped, and it changes the whole conversation:

- **Standard Edition** supports Basic Availability Groups — one primary, one secondary, no
  readable secondary, no automatic page repair between replicas beyond the basics, and no
  multi-database AG (each Basic AG holds exactly one database).
- **Enterprise Edition** is required for full Availability Groups — multiple secondaries (up to 8
  total replicas), readable secondaries, multiple databases per AG, and automatic seeding
  improvements.
- **FCI** is available in both editions, but Standard Edition FCI is limited to a two-node cluster,
  while Enterprise Edition supports more nodes.

A design built on the assumption of Enterprise features — multiple readable secondaries, say —
simply doesn't run on Standard Edition. Confirming edition before designing anything is a
prerequisite step, not an afterthought.

## Putting the framework together

1. Get real RPO/RTO numbers from the business, not an assumed "as fast as possible."
2. Check what edition is licensed (or budgeted) — this narrows the technology list immediately.
3. Match the narrowed list against the honest protects-against/gap comparison from the last lesson.
4. Confirm the budget covers the *operational* cost too — failover testing, monitoring, runbooks —
   not just the license and hardware.

## A worked example

A finance database needs RPO of zero (no data loss) and RTO under 30 seconds, and the company is
licensed for Enterprise Edition. This points squarely at an Availability Group with synchronous
commit and automatic failover mode between at least two replicas — FCI wouldn't meet the RPO
concern about correlated storage failure as cleanly, and log shipping's RTO is too slow. A
reporting-only database on Standard Edition, with a generous RPO of an hour, might be perfectly
served by log shipping at a fraction of the cost.

## Key terms

| Term | Meaning |
|---|---|
| RPO | Recovery Point Objective — maximum tolerable data loss, in time |
| RTO | Recovery Time Objective — maximum tolerable downtime before service is restored |
| Basic Availability Group | Standard Edition's limited AG: one primary, one secondary, single database, no readable secondary |

## Check yourself

A department wants a database protected with an RTO of 10 seconds and zero data loss, but the
company is only licensed for SQL Server Standard Edition. Using the framework above, what has to
change before that RTO/RPO combination is realistically achievable?
