# Lesson 24 — Capstone: Build CIs & Relationships

**Chapter 6 · Capstone: CMDB & Data Quality Implementation · Lesson 24 of 26**

## What you'll learn

- How to pick the right `cmdb_ci` subclass for each real piece of infrastructure behind Patient Scheduling
- The specific, named CIs this capstone builds, and why each one earns a record
- Which relationship types from Chapter 2 connect them, and in which direction
- How to document the single out-of-scope relationship to the EHR platform without re-modeling it
- How the finished dependency chain reads once every CI and relationship is in place

## Picking subclasses for real infrastructure

Lesson 23 scoped Patient Scheduling Application Service as the Technical
Service to model. Now it gets built out of actual CI records, each one using
the correct subclass from Chapter 1's `cmdb_ci` table hierarchy rather than a
generic catch-all:

- **The application itself** — `cmdb_ci_appl`, named **Patient Scheduling
  App**. This is the software that registration staff and schedulers
  actually use; it is not the hardware running it.
- **The application servers** — `cmdb_ci_win_server`, named **SCHED-APP-01**
  and **SCHED-APP-02**. Two Windows servers running IIS, load-balanced for
  availability so a single server failure doesn't take the whole system
  down.
- **The database** — `cmdb_ci_db_instance`, named **SCHED-SQL-01**. A SQL
  Server instance hosting the scheduling database: appointment records,
  provider calendars, waitlists.
- **The load balancer** — `cmdb_ci_lb_device`, named **SCHED-LB-01**. The
  device distributing traffic across the two app servers.

Four CIs, four subclasses, each one tracking the state and relationships
that actually matter for this service — exactly the test Lesson 1 taught.

## Documenting how they depend on each other

A CI with no relationships is barely more useful than no CI at all — it
tells you the thing exists, but nothing about what breaks if it goes down.
Using the relationship types from Chapter 2:

- **Patient Scheduling App** — `Runs on` — **SCHED-APP-01** and
  **SCHED-APP-02**. The application runs on both servers; neither server is
  a single point of failure for the app layer alone.
- **SCHED-APP-01** and **SCHED-APP-02** — `Depends on` — **SCHED-SQL-01**.
  Both app servers depend on the one database instance. This is the
  relationship that matters most for impact analysis: if SCHED-SQL-01 goes
  down for maintenance, both app servers — and the application they run —
  are affected, even though nothing was changed on the servers themselves.
- **SCHED-LB-01** — `Load Balances` — **SCHED-APP-01** and **SCHED-APP-02**.
  The load balancer's relationship to each server is documented explicitly,
  not assumed, because an administrator looking at SCHED-LB-01 alone needs
  to see exactly which servers it's distributing traffic to.

## The one relationship that touches the EHR

Lesson 23 drew a hard scope boundary: the EHR platform's own infrastructure
is not part of this build. But the connection between the two systems is
real and operationally important, so it gets exactly one relationship:
**Patient Scheduling App** — `Sends Data To` — **EHR Integration Service**,
the existing Technical Service that already represents the EHR platform's
side of that connection elsewhere in the CMDB. No new CIs are created for the
EHR side. This single relationship is enough to show impact analysis that a
Patient Scheduling outage could affect appointment data reaching the EHR —
without this capstone taking on responsibility for infrastructure it doesn't
own.

## Reading the finished dependency chain

With four CIs and their relationships in place, Chapter 2's dependency view
for Patient Scheduling App now reads, top to bottom: the application runs on
two load-balanced servers, which both depend on one shared database
instance, with the load balancer's relationship to each server visible
alongside it, and one outbound relationship showing where appointment data
leaves for the EHR platform. That's a complete, accurate, named picture of
what leadership asked for in Lesson 23 — nothing invented, nothing assumed,
every box backed by a real relationship type from Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| `cmdb_ci_appl` | The CI subclass for the Patient Scheduling application itself |
| `cmdb_ci_db_instance` | The CI subclass for SCHED-SQL-01, the scheduling database instance |
| `cmdb_ci_lb_device` | The CI subclass for SCHED-LB-01, the load balancer |
| `Runs on` / `Depends on` | The relationship types connecting the app to its servers, and the servers to the database |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: why does
SCHED-SQL-01 going down for maintenance affect both SCHED-APP-01 and
SCHED-APP-02, even if no change is made to either server directly — and
which documented relationship is the one that tells you that?
