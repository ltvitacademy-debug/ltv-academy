# Database Mirroring, in Legacy Context

This lesson covers a technology you are very unlikely to be asked to deploy new, but
reasonably likely to encounter on an older system you inherit. Being honest about that
status — rather than either pretending it's obsolete-and-irrelevant or teaching it as a
live recommendation — is the actual point of this lesson.

## What you'll learn

- Microsoft's real, current position on database mirroring
- The real mechanism: principal, mirror, and optional witness
- Why this lesson exists at all, given that status

## Microsoft's real position: deprecated, in favor of Availability Groups

Database mirroring has been marked **deprecated** by Microsoft for a considerable time,
with Availability Groups positioned as its direct, modern replacement — the "Applies to"
documentation for mirroring explicitly recommends AGs instead for new work. This isn't a
minor stylistic preference; it reflects a real architectural shift Microsoft made once AGs
matured, and mirroring has not received the kind of ongoing feature investment AGs have
since. Nothing in this lesson should be read as a recommendation to deploy mirroring on a
new system.

## Why learn it anyway: it's still out there

Despite the deprecated status, database mirroring was a mainstream SQL Server HA feature
for well over a decade, and a meaningful number of production systems built during that
window are still running it today, unmigrated. Recognizing mirroring's setup, terminology,
and behavior when you encounter it on an inherited server — rather than mistaking it for
something else, or not recognizing it at all — is a realistic, practical skill, distinct
from the skill of designing a new HA solution.

## The real mechanism: principal, mirror, optional witness

Database mirroring works at the single-database level, between exactly two SQL Server
instances:

- **Principal** — the instance actively serving the database to clients.
- **Mirror** — the other instance, continuously receiving transaction log records from the
  principal and applying them, kept in a restoring state, not directly queryable.
- **Witness** (optional) — a third, separate SQL Server instance that can observe both the
  principal and mirror and enable **automatic** failover between them; without a witness,
  failover between principal and mirror has to be initiated manually.

This principal/mirror/witness structure — and the synchronous vs. asynchronous distinction
mirroring also supported — is recognizably the architectural ancestor of the
primary-replica model Availability Groups later generalized to support more than two
databases and more than one secondary at once.

## Key terms

| Term | Meaning |
|---|---|
| Principal | The database mirroring instance actively serving the database |
| Mirror | The instance continuously receiving and applying log records, not directly queryable |
| Witness | An optional third instance enabling automatic failover between principal and mirror |
| Deprecated (mirroring) | Microsoft's official status for database mirroring, with AGs as the recommended replacement |

## Check yourself

You're handed administration of a legacy SQL Server system and discover it's using
database mirroring with no witness configured. What does the absence of a witness mean
for how failover has to happen, and what should be on your radar about this setup's
long-term status?
