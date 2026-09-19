# Script — Choosing the Correct Azure SQL Solution for Business Requirements

## Segment 1 (title)

Lessons 2 and 3 covered what Azure SQL Database, Managed Instance, and a VM each are. This lesson is the actual job: a set of business requirements, and a decision you have to defend.

## Segment 2 (code: the decision framework)

Start at Azure SQL Database. You move up a tier only when a specific requirement forces it — Agent jobs or cross-database queries push you to Managed Instance, OS-level access or an unsupported feature pushes you all the way to a VM.

## Segment 3 (steps: what forces Managed Instance)

Cross-database queries and transactions within one instance, SQL Server Agent jobs the app can't live without, linked servers or CLR integration Azure SQL Database doesn't support — those are the real signals, not "it might be nice."

## Segment 4 (steps: what forces a VM)

OS-level access for third-party software, a specific SQL Server version or feature Managed Instance doesn't offer, or compliance requiring you to control the patching cadence yourself — and remember, that control means you now own the patching too.

## Segment 5 (outro)

Most new workloads stop at Azure SQL Database. Next up: table partitioning and large database strategies — what to do once a single table gets too big to maintain as one piece.
