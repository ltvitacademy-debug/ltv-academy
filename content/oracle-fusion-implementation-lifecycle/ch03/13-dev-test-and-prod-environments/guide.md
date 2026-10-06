# DEV, TEST and PROD Environments

Lesson 12 talked about promoting configuration packages "upward" between environments. This lesson defines what those environments actually are in Oracle Fusion Cloud, how Oracle keeps them on the same release level, and why that update schedule matters for a functional consultant's day-to-day planning — not just at go-live, but every quarter for the life of the system.

## What you'll learn

- What DEV, TEST, and PROD typically mean in an Oracle Fusion Cloud subscription
- How Oracle's quarterly update schedule keeps Test ahead of Production
- What update "cohorts" are and why a customer's cohort matters for planning
- How Brightfield planned its own environment usage around the update calendar

## The typical environment set

Oracle Fusion Cloud customers are provisioned with a minimum of a non-production environment and a production environment; many implementations add a second non-production environment so configuration/development work and formal testing don't compete for the same space. A common pattern during implementation is: one instance used for building and unit-testing configuration (often informally called "DEV"), one used for formal SIT/UAT testing ("TEST"), and the live system ("PROD") used by the business once go-live happens. Exact instance counts and names vary by Oracle subscription and by project convention — what matters functionally is the discipline, not the label.

## Oracle's quarterly update schedule

Oracle applies quarterly updates to every Fusion Cloud environment on a fixed, non-negotiable schedule. **Test (non-production) environments update on the first Friday of the update month; Production updates two weeks later, on the third Friday of that same month.** That two-week gap is deliberate: it gives a customer a window to test new and changed features in a lower environment before the same update reaches Production, and to decide which new "opt-in" features to turn on.

## Cohorts

Customers are grouped into **update cohorts** (commonly A, B, and C), each tied to a different set of months, so Oracle doesn't push every customer's update in the same week. A cohort's updates still follow the same quarterly cadence and the same two-week Test-then-Production gap — only the calendar months shift depending on the cohort. During the two-week gap between a Test update and the matching Production update, Test and Production are briefly on different release levels, sometimes called a **blackout period**, during which a Production-to-Test environment refresh can't be run.

## Why this matters beyond go-live

During the active implementation, a project generally wants its non-production environments stable rather than mid-update right before a major test cycle or cutover rehearsal, so cutover plans and test schedules are built with the update calendar in mind. After go-live, this same schedule becomes the subject of Chapter 4's regression testing lesson — every quarter, not just once.

## Brightfield Industrial Group: planning around the calendar

Brightfield's Cohort C update months mean the project schedules its final cutover rehearsal to avoid landing in the middle of a Test update week — not because the update itself would necessarily break anything, but because the team wants a stable, known configuration state during rehearsal rather than a system that just changed underneath them two days earlier.

## Key terms

| Term | Meaning |
|---|---|
| Non-production environment | A DEV/TEST-type instance used for configuration and testing, not live transactions |
| Production environment | The live system used for real business transactions |
| Update cohort | A group of customers sharing the same quarterly update calendar |
| Blackout period | The window where Test and Production are briefly on different release levels |

## Recap

Oracle Fusion Cloud customers work across non-production and production environments, with quarterly updates landing in Test two weeks ahead of Production under a fixed cohort-based calendar — a schedule that shapes implementation planning as much as it shapes ongoing operations. Brightfield plans its rehearsal around that same calendar. Next up, lesson 14: the strategy for migrating legacy data into these environments.
