# Lesson 3 — The SSIS Architecture

**Chapter 1 · SSIS Fundamentals · Lesson 3 of 49**

## What you'll learn

- The runtime engine and data flow engine again, now placed inside the
  bigger picture of everything else SSIS is made of
- The legacy Integration Services Windows service, what it's still for,
  and why you don't need it running to design or run packages
- The SSISDB catalog — the modern, production home for deployed
  projects — and what actually executes your packages there
- How design time (SSDT) and run time (the server) are two genuinely
  separate worlds

## Four pieces, one platform

Lesson 1 introduced the two engines inside every package. Zoom out one
level, and the full SSIS platform is really four pieces working
together — two you design against, and two that only matter once a
package leaves your machine.

- **The runtime engine** — manages control flow: task order, logging,
  event handlers, variables, transactions. This is what's active every
  time SSIS Designer validates or runs a package, in development or in
  production.
- **The data flow engine** — the specialized engine a Data Flow Task
  hands off to, dedicated purely to moving and transforming rows.
- **The Integration Services (SSIS) service** — a Windows service, and
  a legacy one. It exists to *monitor and manage* packages stored the
  old way (in `msdb` or the file system) — starting, stopping, and
  listing running packages from SQL Server Management Studio. Microsoft
  is explicit about this: **the service is not required to create,
  save, or run Integration Services packages.** You can design and
  execute packages with SSDT and command-line tools with it stopped —
  you just lose the ability to monitor them from SSMS.
- **The SSISDB catalog** — the modern, central home for projects you've
  deployed. It's not a separate service at all; it's a database
  (`SSISDB`) hosted inside a real instance of the SQL Server Database
  Engine. Deploy a project here and you get versioning, environment
  variables for different configurations, parameterization, and a full
  execution history — all queryable with T-SQL.

## Design time vs. run time

This is the split that matters most in practice: **SSDT is design
time.** Everything you build in Chapters 1–10 happens inside Visual
Studio, on your own machine, against no server at all until you choose
to deploy. **The SSISDB catalog is run time** — the production home a
finished project gets deployed *to*, where a scheduled SQL Server Agent
job or a manual execution actually runs it, logs it, and lets you
inspect what happened afterward. Confusing the two is a common early
mistake: opening and running a package inside SSDT is a *design-time
test run*, not a production execution against the catalog.

## Key terms

| Term | Meaning |
|---|---|
| Runtime engine | Manages control flow: task order, error handling, logging, variables |
| Data flow engine | Moves and transforms rows inside a Data Flow Task |
| Integration Services service | Legacy Windows service for monitoring stored packages — optional, not required to run packages |
| SSISDB catalog | The database that stores deployed projects, versions, parameters, and execution history |
| Design time | Building and test-running a package inside SSDT, with no server involved |
| Run time | A deployed project executing from the SSISDB catalog in production |

## Lab

1. On a SQL Server instance with Integration Services installed, open
   SQL Server Management Studio and check whether an **Integration
   Services Catalogs** node exists in Object Explorer — if not, that
   server has no SSISDB catalog created yet.
2. In the Windows **Services** console, find **SQL Server Integration
   Services**, and note its startup type and whether it's running.
   Confirm for yourself that you can still open and run a package in
   SSDT even if that service is stopped.
3. Sketch (on paper or in a notes app) the four pieces from this lesson
   and draw an arrow from "SSDT" to the two you'd only touch at design
   time, and from "SSISDB catalog" to the two engines that run either
   way.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
the Integration Services Windows service isn't required to run a
package, and what actually stores and executes a package once it's
deployed to production.
