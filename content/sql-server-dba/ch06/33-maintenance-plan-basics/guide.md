# Maintenance Plan Basics

## What you'll learn

- What a SQL Server Maintenance Plan actually is, and where it lives in SSMS
- The real task types the Maintenance Plan Wizard offers
- Why most production environments today reach for something else (previewed here, covered
  fully in Lesson 38)

## What a Maintenance Plan is

A **Maintenance Plan** is a built-in SSMS feature — an Integration Services (SSIS) package,
under the hood — that automates the routine upkeep every database needs: rebuilding or
reorganizing indexes, refreshing statistics, checking for corruption, and taking backups. It's
created and edited through the **Maintenance Plan Wizard** (right-click "Maintenance Plans"
under Management in SSMS's Object Explorer, or build one manually in the design surface), and
it runs on a schedule as a **SQL Server Agent job** — the plan itself is really just a
convenient way to generate that job and its steps without hand-writing T-SQL.

## The real task types in the Wizard

The Wizard offers a fixed set of task types, each mapping to a real maintenance operation:

- **Rebuild Index** — drops and rebuilds indexes (`ALTER INDEX ... REBUILD` under the hood),
  the heavier fix for fragmentation.
- **Reorganize Index** — defragments in place (`ALTER INDEX ... REORGANIZE`), a lighter-weight
  operation. Lesson 34 covers exactly when to pick one over the other.
- **Update Statistics** — refreshes the query optimizer's statistics (`UPDATE STATISTICS`), so
  execution plans reflect current data distribution. Lesson 35 goes deep here.
- **Check Database Integrity** — runs `DBCC CHECKDB` to detect corruption before it silently
  causes data loss. Lesson 37 covers scheduling this properly.
- **Back Up Database (Full / Differential / Transaction Log)** — wraps the real `BACKUP
  DATABASE` / `BACKUP LOG` statements into a scheduled job step. Lesson 36 covers backup job
  design.
- **Execute SQL Server Agent Job**, **History Cleanup**, and **Maintenance Cleanup Task** —
  supporting tasks: chaining to an existing job, trimming old job/backup history, and deleting
  old backup files on a retention schedule.

Each task in the plan becomes a step (or a linked sub-plan) in an underlying Agent job, visible
and editable later just like any other job — covered in Chapter 7.

## Why this lesson exists before Lesson 38

Maintenance Plans are the built-in, no-extra-download starting point, and they're honest,
functional tooling — they genuinely run real `ALTER INDEX`, `UPDATE STATISTICS`, `DBCC CHECKDB`,
and `BACKUP DATABASE` statements. But the Wizard's per-database, one-size-fits-all task
configuration has real limitations once an instance has more than a handful of databases with
different sizes and fragmentation patterns — which is exactly the gap Ola Hallengren's scripts
(Lesson 38) fill. This chapter builds the concepts task by task first, because Ola Hallengren's
solution is built from the same underlying operations, just parameterized and scriptable instead
of wizard-driven.

## Key terms

| Term | Meaning |
|---|---|
| Maintenance Plan | An SSMS/SSIS-based wizard for building scheduled database upkeep tasks |
| Maintenance Plan Wizard | The SSMS UI for creating a Maintenance Plan without hand-writing T-SQL |
| Task type | One operation the Wizard supports: rebuild/reorganize index, update stats, check integrity, backup, cleanup |
| Underlying Agent job | The actual scheduled object a Maintenance Plan creates and runs on top of |

## Check yourself

A Maintenance Plan is built with a "Rebuild Index" task and a "Back Up Database (Full)" task on
a nightly schedule. What is this plan actually doing under the hood, in terms of real T-SQL
statements and the Agent job that runs them?
