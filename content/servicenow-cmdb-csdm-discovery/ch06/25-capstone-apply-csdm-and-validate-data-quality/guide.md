# Lesson 25 — Capstone: Apply CSDM & Validate Data Quality

**Chapter 6 · Capstone: CMDB & Data Quality Implementation · Lesson 25 of 26**

## What you'll learn

- How to map Patient Scheduling Application Service up to its Business Service, completing Chapter 3's CSDM structure
- Why Discovery, not manual entry, should maintain the infrastructure-level CIs going forward, and what that decision actually requires
- How Identification Rules prevent Discovery from duplicating the CIs built by hand in Lesson 24
- How to read the CMDB Health Dashboard's metrics against this specific build
- Why this lesson is where "built once" turns into "stays correct"

## Completing the CSDM mapping

Lesson 24 built Patient Scheduling Application Service out of real CIs. This
lesson closes the loop Chapter 3 opened: that Technical Service gets mapped
to its Business Service, **Patient Scheduling**, using CSDM's
Technical Service–to–Business Service relationship. Until this mapping
exists, the two records are technically correct but practically useless to
anyone running impact analysis from the business side — a director asking
"what breaks if Patient Scheduling goes down" needs the platform to walk
from the Business Service, through the mapping, into the Technical Service,
and down into the CIs from Lesson 24. Without the mapping, that chain breaks
at the first step.

## Deciding where Discovery takes over

Chapter 1's four CIs were created by hand for this capstone, which is normal
for a first build — but hand-maintained records drift the moment anyone
makes an unannounced change. Going forward, **Discovery** will maintain the
infrastructure-level CIs: SCHED-APP-01, SCHED-APP-02, and SCHED-SQL-01. The
application CI, Patient Scheduling App, and the Business Service mapping
stay manually governed, since Discovery doesn't know what business service a
piece of software supports — only what infrastructure it's running on.

Chapter 4 Lesson 17 already covered the requirement this triggers: Discovery
needs a **MID Server** with real network line of sight to a host before it
can scan it. Patient Scheduling's servers live in Meridian's clinical-systems
network segment, a segment the existing MID Servers can't reach. Part of
this decision is placing a MID Server inside that segment — or with routed
access to it — along with the right credential affinity: WinRM credentials
for the two Windows app servers, and separate database credentials scoped to
SCHED-SQL-01, so Discovery authenticates correctly against each CI type.

## Configuring Identification Rules against duplicates

Here's the risk Chapter 5 Lesson 19 warned about: once Discovery starts
scanning SCHED-APP-01, SCHED-APP-02, and SCHED-SQL-01, it will try to create
CI records for what it finds — and without the right **Identification
Rules**, it creates brand-new duplicate records instead of recognizing the
ones built by hand in Lesson 24. The fix is configuring identification
attributes Discovery can match against what already exists: fully qualified
domain name and serial number as independent identifiers for the two
`cmdb_ci_win_server` records, and instance name plus host server for the
`cmdb_ci_db_instance` record. With those rules in place, Discovery's first
scan reconciles into the existing three records instead of creating three
new ones next to them.

## Checking the result against the CMDB Health Dashboard

Chapter 5 Lesson 18's Health Dashboard is where this gets validated, not
assumed. Four metrics matter here specifically: **completeness** — do all
four CIs have their required attributes filled (owner, environment,
operational status)? **Correctness** — does the duplicate-CI count for this
service sit at zero now that Identification Rules are configured, instead of
climbing after Discovery's first scan? **Compliance** — does every CI have
the relationships Chapter 2 would expect (no orphaned servers missing a
`Depends on` link)? And **currency** — once Discovery is scheduled, are the
three infrastructure CIs showing a recent last-discovered timestamp instead
of going stale? A clean read on all four is what turns this from "we built
some records" into "we built records we can trust."

## Key terms

| Term | Meaning |
|---|---|
| Technical Service–to–Business Service mapping | The CSDM relationship connecting Patient Scheduling Application Service to Patient Scheduling |
| MID Server | The on-network agent Discovery needs with line of sight into Meridian's clinical-systems segment |
| Identification Rule | Configuration that lets Discovery recognize and reconcile into an existing CI instead of creating a duplicate |
| CMDB Health Dashboard | Where completeness, correctness, compliance, and currency get checked after the build |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: if the MID
Server placement step were skipped entirely, what would actually happen the
first time Discovery tries to scan SCHED-APP-01 — and how would that show up
on the CMDB Health Dashboard?
