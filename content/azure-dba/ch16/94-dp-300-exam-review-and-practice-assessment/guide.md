# Lesson 94 — DP-300 Complete Exam Review & Practice Assessment

**Chapter 16 · Certification & Interview Preparation · Lesson 94 of 95**

## What you'll learn

- A full domain-by-domain review of everything this course covered, mapped back to real chapter numbers
- A substantial, mixed-domain practice assessment — not five easy questions, a real mock exam slice
- How to think about a DP-300 question you're not immediately sure of
- What's left before Lesson 95 — the course's genuine final lesson

## The five domains, reviewed

Lesson 1 introduced this weighting; here's what each domain actually
drew on across the whole course:

| Domain | Weight | What you actually built |
|---|---|---|
| Platform resources | 15-20% | Choosing Azure SQL DB vs. Managed Instance vs. VM (Ch1-3), DTU/vCore, partitioning, Arc/Fabric |
| Security | 20-25% | Auth/authorization (Ch4), network security (Ch5), TDE/masking/classification/auditing/Ledger (Ch6) |
| Monitoring & performance | 20-25% | Baselines/DMVs/Extended Events (Ch7), the full query-tuning toolkit (Ch8), maintenance (Ch9) |
| Automation | 15-20% | SQL Server Agent (Ch10), Azure CLI/PowerShell/IaC/Elastic Jobs (Ch11) |
| HA/DR | 20-25% | Migration (Ch12), backup/restore (Ch13), Always On/geo-replication/failover groups (Ch14) |

Notice migration and backup sit administratively closer to HA/DR in
the real exam's grouping than their own chapter numbers might
suggest — the exam cares about the underlying skill (getting data
safely into Azure, and getting it back after something goes wrong),
not this course's chapter boundaries.

## How to think about a question you're not sure of

A DP-300 question is almost always scenario-based — a business
requirement, then "which option best satisfies it." Two real
techniques, both used throughout the Chapter 15 project:

1. **Name the constraint before the options.** If the scenario gives
   an RTO/RPO, a compliance requirement, or a budget limit, write
   down what that actually rules in or out *before* reading the
   answer choices — the choices are often designed to tempt you into
   picking a technically-correct-sounding option that doesn't
   actually fit the stated constraint.
2. **Eliminate the obviously platform-wrong option first.** A
   question about Azure SQL Database won't have Always On
   Availability Groups as a correct answer (that's a VM/on-prem
   mechanism) — even if you're unsure of the *right* answer, ruling
   out the *wrong-platform* answer narrows it fast.

## Practice assessment

**1.** A team needs near-100% SQL Server feature compatibility for a
lift-and-shift migration, with minimal application changes. Which
deployment option?
*Azure SQL Managed Instance (Lesson 3) — this is exactly the
compatibility trade-off that separates it from Azure SQL Database.*

**2.** A database's compute cost needs to scale automatically to
zero during idle periods. Which purchasing/compute model?
*Serverless (Lesson 10) — auto-pause is the defining feature.*

**3.** A query that was fast last week is suddenly slow, with no
code changes. What's the first tool to check?
*Query Store (Lessons 48-49) — built specifically to catch a
regression like this without needing to already suspect a cause.*

**4.** An application needs to verify a financial record's history
has not been altered, even by an administrator. Which feature?
*Ledger (Lesson 37) — cryptographic tamper-evidence, not just
logging.*

**5.** An RTO of under 5 minutes is required for a Managed
Instance database during a regional outage. Which feature?
*Auto-Failover Groups (Lesson 87) — automatic failover with a
stable endpoint, meeting an aggressive RTO.*

**6.** A DBA needs to see exactly which SQL statement is consuming
the most CPU right now, without enabling anything extra. Which DMV?
*`sys.dm_exec_query_stats` (Lesson 51) — the live plan cache, no
setup required.*

**7.** A job step calling an external API fails only when run by
SQL Server Agent, but succeeds when tested manually. Most likely
cause?
*The Agent service account lacks a permission the step needs
(Lesson 62) — configure a proxy account.*

**8.** Which Unity Catalog... wait, wrong course — which Azure SQL
feature masks a column's value in query results without changing
the stored data?
*Dynamic Data Masking (Lesson 33).*

## What's left

**Lesson 95 — Azure DBA Interview Preparation — is this course's
final lesson.** It's structured differently from everything before
it: genuine interview-scenario practice, not more quiz content.

## Check yourself

Before Lesson 95: pick any two questions above and explain, out loud,
*why* the wrong options are wrong — not just which answer is right.
