# Lesson 91 — Project: Migrate & Secure the Environment

**Chapter 15 · Real-World Azure DBA Project · Lesson 91 of 95**

## What you'll learn

- Why Meridian's three databases don't all get the same deployment decision, and how to justify each one separately
- How to choose real security controls for a specific sensitive-data problem, not a generic checklist
- How to choose a migration approach that respects Ops' stated constraint
- How to reason through a decision out loud, the way an interviewer (Lesson 95) or a real project actually requires

## The deployment decision — three databases, at least two answers

`OrderManagement` and `DriverHR` are used together: the dispatch
application joins order data against driver data in the same query, and
there's an existing SQL Server Agent job that reconciles the two nightly.
`Telemetry` is not joined against either of them — it's a single,
fast-growing, append-heavy table fed by GPS devices.

That difference matters more than it looks. Azure SQL Database can't do
cross-database queries and doesn't run SQL Server Agent — both of which
`OrderManagement` and `DriverHR` currently depend on. Azure SQL Managed
Instance keeps near-full SQL Server surface area: cross-database queries,
its own Agent, minimal connection-string and collation changes from the
on-prem 2016 instance. A SQL Server VM would also work, but gives up
exactly the operational relief the CFO asked for in Lesson 90 — someone
still patches the OS and manages the instance by hand.

**The justified call:** `OrderManagement` and `DriverHR` move to **Azure
SQL Managed Instance**, specifically because cross-database queries and
Agent jobs are blockers for Azure SQL Database, and a VM re-creates the
maintenance burden the CFO wants gone.

`Telemetry` has no cross-database dependency and no Agent job tied to it
— it's one table, growing fast, queried mostly by append and by recent-
range reads. That's the workload **Azure SQL Database's Hyperscale**
tier is specifically built for: fast backups regardless of size, storage
that grows to very large sizes without a manual resize, without paying
for Managed Instance's extra surface area it doesn't need.

**The justified call:** `Telemetry` moves to **Azure SQL Database
(Hyperscale)** — a different target than the other two, on purpose,
because it's a different workload.

## The security decision — matched to what Compliance actually said

Compliance's specific concern was: nobody's checked who can see SSNs and
license numbers in a long time, through a single shared login.

- **Authentication:** replace the shared SQL login with **Microsoft
  Entra ID authentication**, and give each team (support vs. HR) its own
  least-privilege database role instead of one shared credential no one
  owns.
- **Encryption:** TDE alone protects data at rest — on disk and in
  backups — but not from a DBA or an application running an ad hoc query
  against the live table. Because the actual worry here is *who can read
  the value*, not just disk theft, the SSN and license columns get
  **Always Encrypted**, which keeps the plaintext unreadable even to
  someone with database access. Support staff who only need to confirm a
  license number without seeing the whole value get **Dynamic Data
  Masking** instead of full plaintext.
- **Network:** move both databases off any public endpoint and onto a
  **private endpoint inside a VNET**, so they aren't reachable directly
  from the internet at all.
- **Auditing:** turn on **SQL Auditing**, so "nobody's checked in years"
  becomes an actual, reviewable log going forward.

## The migration decision — respecting Ops' constraint

Ops' stated constraint from Lesson 90 was that the 7-9am dispatch window
can't go down. An **offline migration** (back up on-prem, restore to
Azure) needs a maintenance window — exactly what Ops can't give you.
**Online migration**, using Azure Database Migration Service (or
transactional replication) instead, keeps `OrderManagement` serving
reads and writes throughout the cutover, syncing continuously until the
final, short switchover.

**Validation after cutover, either way:** row counts and checksums
against the source, and a smoke test of the actual dispatch query that
was timing out — not just "the app connected."

## Key terms

| Term | Meaning |
|---|---|
| Cross-database query | A query that joins tables across two databases in one instance — supported on Managed Instance and VM, not on Azure SQL Database |
| Always Encrypted | Client-side encryption where even a DBA with database access can't read the plaintext — different from TDE, which protects data at rest only |
| Online migration | A migration approach that keeps the source database serving traffic throughout, syncing continuously until a short final cutover |

## Check yourself

Before Lesson 92: can you explain, out loud and without notes, why
`OrderManagement` and `Telemetry` got two different deployment targets —
and why that's the right call rather than an inconsistency?
