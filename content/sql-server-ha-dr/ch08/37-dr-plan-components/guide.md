# DR Plan Components

Everything in this course so far — backups, AGs, FCI, log shipping, replication — is a
technology. A **disaster recovery plan** is the document that says which technologies
protect which systems, who's responsible for what, and exactly what to do when things
go wrong. This chapter is about that document itself, not another failover mechanism.
A DBA who can configure every HA/DR technology in this course but has no written DR
plan still isn't ready for a real disaster.

## What you'll learn

- The five real components every DR plan document needs
- Why "we have Availability Groups" is not a DR plan
- How this chapter's components connect to what's already been covered

## Component 1: System and dependency inventory

A DR plan starts with a complete, current list of what needs to be recovered — every
database, every instance, and critically, the dependencies between them. A database
doesn't exist in isolation: it depends on linked servers, SSIS packages, application
connection strings, SQL Agent jobs, and often other databases (cross-database queries,
replication publishers/subscribers). Recovering a database without knowing what depends
on it — or what it depends on — produces a technically successful restore that still
leaves the business down.

## Component 2: RPO and RTO per system

Not every system needs the same protection. The inventory gets a defined **RPO**
(Recovery Point Objective — how much data loss is tolerable) and **RTO** (Recovery Time
Objective — how much downtime is tolerable) for each system, set by the business, not
guessed by IT. This is covered in depth in the next lesson — for now, the point is that
these numbers belong *in the plan itself*, next to each system, not floating as a vague
organizational goal.

## Component 3: Roles and responsibilities

A real incident has more people involved than just the DBA doing the restore: someone
declares a disaster, someone decides when to fail over versus wait, someone talks to
customers or leadership, someone verifies applications are actually working afterward.
The plan names specific roles (not just "the DBA team") and, ideally, specific backup
people for each role, because the person usually assigned a role may not be reachable
during the actual event.

## Component 4: Communication plan

Who gets told what, when, and by whom — internally and, if relevant, externally.
Covered fully in the last lesson of this chapter, but it belongs in the plan document
itself as a defined component, not something improvised live during an actual outage.

## Component 5: Step-by-step recovery procedures

The part that turns theory into action: concrete, ordered steps — ideally the literal
commands or scripts — for actually recovering each system, referencing the specific
technology already in place (restore sequence for a SIMPLE-recovery reporting database,
manual failover steps for an AG, log shipping role-change steps). This is what a
**runbook** is, covered in the "DR Testing & Runbooks" lesson later in this chapter —
vague prose ("restore the database") isn't a real procedure; a real procedure survives
being followed by someone who didn't build the original system.

## Why "we have AGs" isn't a DR plan

Availability Groups, backups, and replication are the *tools* a DR plan relies on to
actually meet its RPO/RTO targets. But without the inventory, the defined objectives,
the named roles, the communication plan, and the written procedures, an organization
has technology without a plan — and the gap only becomes visible during an actual
disaster, which is the worst possible time to discover it.

## Key terms

| Term | Meaning |
|---|---|
| DR plan | The document defining what's protected, by whom, to what objectives, and how to recover it |
| System/dependency inventory | Complete list of systems and how they depend on each other |
| RPO | Recovery Point Objective — how much data loss is acceptable |
| RTO | Recovery Time Objective — how much downtime is acceptable |
| Runbook | The step-by-step, command-level recovery procedure for a specific system |

## Check yourself

An organization has AGs configured for its critical databases but no written DR plan
document. Name two concrete gaps that leaves, beyond the technology itself, that would
surface during a real disaster.
