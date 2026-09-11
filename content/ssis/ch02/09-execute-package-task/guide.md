# Lesson 9 — Execute Package Task

**Chapter 2 · Control Flow · Lesson 9 of 49**

## What you'll learn

- What the Execute Package Task does, and the real reasons to split a
  workflow into parent and child packages
- Project Reference versus External Reference, and when each applies
- In-process versus out-of-process execution, and the tradeoff between
  them
- How logging, transactions, and parameter values flow between parent
  and child packages

## Why split a package into pieces at all

The **Execute Package Task** lets one package run another package as
part of its own workflow. The package that runs the task is the
**parent package**; the package it runs is the **child package**. This
isn't just a technical trick — it's a real architectural decision, and
there are four solid reasons to reach for it:

- **Breaking down complex workflow.** Loading a whole star schema in
  one package gets unreadable fast. Build one package per dimension and
  one for the fact table, and let a parent package call each of them in
  order.
- **Reusing parts of packages.** A shared data-extraction package can be
  called by several different parents, each doing different cleanup or
  aggregation afterward.
- **Grouping work units transactionally.** The parent package can commit
  or roll back based on whether its child packages succeeded.
- **Controlling security.** Package authors can be granted access to
  only the packages relevant to them, instead of one giant package.

## Project Reference vs. External Reference

The **ReferenceType** property decides how the task finds its child
package:

- **Project Reference** — the child package lives in the same project
  as the parent. You just pick it from a list
  (`PackageNameFromProjectReference`). This only works if the project
  uses the project deployment model — otherwise **ReferenceType** is
  locked to External Reference.
- **External Reference** — the child package lives outside the
  project: in the SQL Server `msdb` database, or on the file system.
  The task uses an OLE DB connection manager for `msdb` packages or a
  File connection manager for file-system packages.

An Execute Package Task can also run a **database maintenance plan**,
since a maintenance plan is stored in `msdb` the same way a package is.

## In-process or out-of-process?

The **ExecuteOutOfProcess** property controls where the child package
actually runs:

- **False (default)** — the child runs in the same process as the
  parent. Less overhead, but if the child package crashes, it can take
  the parent down with it.
- **True** — the child runs in its own process. More memory overhead
  and a slower launch, but a failure in the child doesn't have to take
  the parent process with it. You also can't debug the package in a
  tools-only install when this is set — full Integration Services has
  to be installed.

## What flows between parent and child

Three things move between the two packages automatically or by design:

- **Transactions** — a transaction started in the parent can extend
  into the child, so work in both can be committed or rolled back
  together.
- **Logging** — the child package always forwards its log details up to
  the parent, regardless of whether the child has its own logging
  configured.
- **Parameter values** — on the **Parameter Bindings** page, you map a
  parent variable, parameter, or project parameter to a parameter the
  child package defines. This only works when both packages are in a
  project deployment model project together. Older packages use
  **Parent Package Variable configurations** instead, which map a
  parent variable onto a child package property directly.

## Key terms

| Term | Meaning |
|---|---|
| Parent package | The package that contains the Execute Package Task |
| Child package | The package the Execute Package Task runs |
| ReferenceType | Project Reference (same project) or External Reference (msdb or file system) |
| ExecuteOutOfProcess | Whether the child package runs in the parent's process (False) or its own (True) |
| Parameter Bindings | The Execute Package Task Editor page that maps parent values to child package parameters |

## Lab

1. Create a small child package that does one thing — a single Execute
   SQL Task that truncates a staging table is enough.
2. In your Lesson 8 package, add an **Execute Package Task**. Set
   **ReferenceType** to **Project Reference** and select the child
   package you just built from **PackageNameFromProjectReference**.
3. Run the parent package and confirm, in the Progress/Execution
   Results tab, that the child package's own task appears in the log —
   proof that logging details forwarded up correctly.
4. Toggle **ExecuteOutOfProcess** to **True**, run again, and notice the
   slightly longer startup time as the child package launches in its
   own process.

## Check yourself

You're ready for Lesson 10 when you can explain the difference between
Project Reference and External Reference, and say which one requires
the project to use the project deployment model.
