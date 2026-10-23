# Lesson 26 — Capstone Wrap-Up & Governance Plan

**Chapter 6 · Capstone: CMDB & Data Quality Implementation · Lesson 26 of 26**

## What you'll learn

- How to write a real governance plan with named ownership, not just "someone should own this"
- A review cadence that actually gets followed, and why it has three different frequencies instead of one
- What to keep watching on the CMDB Health Dashboard after a build like this one ships
- How this course's entire CMDB and data-quality discipline sets up the next course's focus on security and access

## Why this lesson exists

Lesson 25 left Patient Scheduling's CMDB record accurate: mapped to its
Business Service, backed by real CIs and relationships, maintained in part
by Discovery, protected from duplicates by Identification Rules, and clean
across the Health Dashboard. None of that survives on its own. A CMDB
without governance drifts the same way any unowned system drifts — someone
decommissions SCHED-APP-02 without updating its CI, a new app server gets
added without a relationship to SCHED-SQL-01, and six months from now the
whole capstone is exactly the stale, untrustworthy record leadership asked
to avoid in Lesson 23. This lesson is the governance plan that keeps it from
happening.

## Named ownership

Every layer of this build gets a specific, accountable owner — not a
department, a role:

- **Business Service Owner — Patient Scheduling:** the Director of Patient
  Access. This is the person leadership asks first during an outage, and
  the person who signs off when the service's scope or criticality changes.
- **Technical Service Owner — Patient Scheduling Application Service:** the
  Infrastructure Team Lead for Clinical Systems. This is the person
  accountable for the mapping to the Business Service staying correct, and
  for approving any change to the CI structure itself.
- **CI-level stewardship:** the Windows server team owns SCHED-APP-01 and
  SCHED-APP-02; the database administration team owns SCHED-SQL-01; the
  network team owns SCHED-LB-01. Each steward is responsible for their CI's
  attributes staying current and for flagging decommission or replacement
  before it happens, not after.

## A review cadence with three frequencies

One review frequency isn't enough — different problems surface at different
speeds:

- **Monthly:** the Technical Service Owner reviews the CMDB Health Dashboard
  for this service specifically — completeness, correctness, compliance,
  currency — and follows up on anything that regressed.
- **Quarterly:** the Business Service Owner and Technical Service Owner
  review the CSDM mapping together, confirming Patient Scheduling
  Application Service still accurately represents what's running, and that
  nothing was added or retired without the mapping being updated.
- **Annual:** a full re-certification of every CI in this build — each
  steward confirms their CI is still needed, still correctly classified,
  and still has accurate relationships, with anything that fails
  re-certification flagged for decommission.

## What to keep watching on the Health Dashboard

Beyond the one-time check in Lesson 25, four things get monitored on an
ongoing basis specifically for this service: the **completeness** percentage
trending flat or improving, not declining; the **duplicate count** staying
at zero as Discovery continues scanning; any CI going **stale** — no
Discovery scan within the expected window, which usually means a MID Server
or credential problem before it means anything worse; and any CI becoming
**orphaned** — showing up on the dashboard with no relationships at all,
which almost always means someone added infrastructure without documenting
how it connects to anything else.

## Where this leads next

This course has been building toward one discipline: knowing, precisely and
currently, what infrastructure exists and how it relates to the services it
supports. Course 10, **ServiceNow Security & Access Controls**, depends on
exactly that discipline. Asset-based access policies — deciding who can
touch SCHED-APP-01, who can query SCHED-SQL-01, who gets notified when
SCHED-LB-01 changes — only work if the CI data behind them is accurate. An
access policy scoped to "owners of Patient Scheduling Application Service's
CIs" is only as good as the ownership and relationship data this capstone
just built. Get the CMDB wrong, and security policy built on top of it is
wrong in exactly the same way.

## Key terms

| Term | Meaning |
|---|---|
| Named ownership | A specific accountable role (not a department) assigned to a Business Service, Technical Service, or CI |
| Re-certification | An annual review confirming a CI is still needed, correctly classified, and correctly related |
| Orphaned CI | A CI with no documented relationships — usually a sign infrastructure was added without governance |
| Asset-based access policy | A security policy scoped to specific CIs or their owners, only as reliable as the CMDB behind it |

## Check yourself

This course is complete when you can explain, without looking: why would an
asset-based access policy for SCHED-SQL-01, built in the next course, be
unreliable if this capstone's governance plan were skipped — specifically,
if nobody ever re-certified whether SCHED-SQL-01 was still the correct
owner's CI to control access to?
