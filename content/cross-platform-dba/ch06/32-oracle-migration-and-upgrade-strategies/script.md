# Script — Oracle Migration & Upgrade Strategies

## Segment 1 (title)

Data Pump: Export & Import introduced expdp and impdp as Oracle's logical data movement tool. This lesson, closing out both this chapter and the Oracle section of the course, is about how you actually move a database forward across a major version or onto different hardware.

## Segment 2 (code: DBUA and AutoUpgrade)

The Database Upgrade Assistant, DBUA, upgrades an existing database in place — same data files, same database, just newer Oracle software managing it. It can run silently from the command line for scripted upgrades. Oracle's more recent recommended tool for this is AutoUpgrade, which automates the same in-place path with better fleet-upgrade support, though DBUA remains real and still in active use.

## Segment 3 (code: Data Pump migration)

When the destination is genuinely different — new hardware, a different operating system, consolidation, or too large a version jump — Data Pump export and import is the tool. You export the data logically and import it into a freshly created database on the target. It's slower for large databases, but far more flexible across platforms.

## Segment 4 (steps: pre-upgrade checks)

Before either strategy, Oracle's Pre-Upgrade Information Tool should run against the source database, flagging deprecated features, invalid objects, and parameter changes. Skipping it and discovering a blocker mid-upgrade is a genuinely avoidable outage — the same check-first discipline this whole course keeps coming back to.

## Segment 5 (outro)

That's the Oracle section of this course, complete — architecture, security, backup and recovery, performance tuning, and replication and high availability. Next up: MySQL, starting with its architecture, server layer versus storage engine layer.
