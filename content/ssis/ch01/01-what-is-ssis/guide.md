# Lesson 1 — What Is SSIS?

**Chapter 1 · SSIS Fundamentals · Lesson 1 of 49**

## What you'll learn

- What SQL Server Integration Services (SSIS) actually is, and the kind of
  problem it exists to solve
- The two engines underneath every SSIS package: the control flow engine
  and the data flow engine
- What SSIS Designer looks like, and the tabs you'll live in for the rest
  of this course
- Where SSIS fits next to the T-SQL you already know

## The problem SSIS solves

Every business system holds data somewhere: a CRM, an ERP, a folder of
CSV exports, a partner's FTP server. None of that data is useful sitting
where it is — it has to move, get cleaned up, and land somewhere a report
or a warehouse can use it. That's **ETL**: Extract data from a source,
Transform it into the shape you need, and Load it into a destination.

**SQL Server Integration Services (SSIS)** is Microsoft's platform for
building exactly that kind of enterprise data integration and
transformation work — copying or downloading files, loading data
warehouses, cleansing and mining data, and managing SQL Server objects
and data. It ships as part of SQL Server, and it's the tool this entire
course is built around.

## Two engines, one package

SSIS packages are built on two separate engines, and understanding the
split between them will make everything else in this course click faster:

- **The control flow engine** — the run-time engine that manages the
  *order* things happen in: which task runs first, what happens if a task
  fails, how variables and logging behave across the whole package.
- **The data flow engine** — a specialized, high-performance engine
  dedicated entirely to *moving and transforming rows*: reading from a
  source, applying transformations, and writing to a destination.

You'll spend Chapter 2 in the control flow engine and Chapter 3 onward in
the data flow engine — but every real package uses both together, because
control flow is what decides *when* a data flow runs.

## Meet SSIS Designer

Every package you build in this course gets built inside **SSIS
Designer**, the graphical tool built into SQL Server Data Tools (SSDT).
You can build a complete, production-grade package here without writing
a line of code — dragging tasks onto a design surface and connecting
them.

![SSIS Designer open on an empty Control Flow tab, with the SSIS Toolbox docked on the left showing tasks grouped under Favorites, Common, Containers, and Other Tasks, and a Connection Managers area docked at the bottom.](/courses/ssis/ch01/01-what-is-ssis/designer-and-toolbox.gif)
*SSIS Designer's Control Flow tab and the Toolbox you'll drag every task from — this exact layout is what you'll see the moment you open a package.*

Two things to notice immediately in that screenshot:

- **The Toolbox on the left** is grouped by category — Favorites,
  Common, Containers, and Other Tasks. Every control-flow task you'll use
  in Chapter 2 (Execute SQL, File System, For Loop, and dozens more)
  lives here.
- **The tab strip above the design surface** — Control Flow, Data Flow,
  Parameters, Event Handlers, Package Explorer — is where you'll spend
  this entire course. Each tab is its own design surface for a different
  part of the package.

The **Connection Managers** strip along the bottom is where every package
defines *how* it connects to the outside world — a SQL Server database,
a flat file, an FTP server. Lesson 5 covers connection managers in depth.

## Where SSIS fits next to T-SQL

If you've already worked through T-SQL Development, you already know how
to *query and shape* data once it's sitting in a table. SSIS answers a
different question: how does data *get* into that table in the first
place, from a source that isn't SQL Server at all? A real Microsoft BI
stack uses both — SSIS moves and prepares the data, and the T-SQL you
already know is what a lot of SSIS's own tasks (like Execute SQL Task)
run once the data arrives.

## Key terms

| Term | Meaning |
|---|---|
| ETL | Extract, Transform, Load — the general pattern SSIS implements |
| Control flow engine | Manages task order, logging, variables, and error handling across a package |
| Data flow engine | The dedicated engine that moves and transforms rows between a source and a destination |
| SSIS Designer | The graphical package-building tool inside SQL Server Data Tools (SSDT) |
| SSDT | SQL Server Data Tools — the Visual Studio-based IDE SSIS Designer runs inside |

## Lab

1. If you haven't already, install SQL Server Data Tools (SSDT) for
   Visual Studio — Lesson 2 walks through that setup in detail, so it's
   fine to just read ahead there first if you want to see the steps
   before installing.
2. Once SSDT is open, create a new **Integration Services Project** and
   open the empty package it generates. Confirm you can see the same five
   tabs — Control Flow, Data Flow, Parameters, Event Handlers, Package
   Explorer — from the screenshot above.
3. Open the **SSIS Toolbox** if it isn't already docked, and scroll
   through its categories. You don't need to use anything yet — just get
   a feel for how many tasks are available before Chapter 2 starts using
   them.

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what's
the difference between the control flow engine and the data flow engine,
and which one actually moves rows of data?
