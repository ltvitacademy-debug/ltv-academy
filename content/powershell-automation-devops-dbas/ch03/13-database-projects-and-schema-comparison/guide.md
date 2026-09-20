# Database Projects & Schema Comparison Tools

Putting database objects in Git as loose `.sql` files is a real improvement over nothing,
but it leaves a hard problem unsolved: how do you know the repository actually matches what
a live server looks like right now? Microsoft's real answer to that is the database
project, and the schema comparison tooling built around it.

## What you'll learn

- What a SQL Server Database Project (`.sqlproj`) actually is, and how it differs from a
  folder of loose scripts
- What schema comparison tools do, concretely, and where to find them
- How the two work together to catch drift between source control and a live database

## SQL Server Database Projects

A **SQL Server Database Project** — a `.sqlproj` file, part of **SQL Server Data Tools
(SSDT)** — represents an entire database schema as a structured collection of files inside
a project, the same conceptual shape as a Visual Studio code project. Each table, view,
stored procedure, and function gets its own `.sql` file inside the project, organized into
folders (`Tables/`, `Views/`, `StoredProcedures/`, and so on). The project can be **built**,
much like a code project compiles: SSDT parses every script in the project and validates
that the schema is internally consistent — that a view doesn't reference a column that
doesn't exist, that a foreign key points at a table that's actually defined somewhere in
the project. That build step is what makes CI for databases possible at all, which Chapter
Four covers in depth.

```text
MyDatabase.sqlproj
├── Tables/
│   ├── Orders.sql
│   └── Customers.sql
├── Views/
│   └── vw_OrderSummary.sql
└── StoredProcedures/
    └── usp_GetOrderTotals.sql
```

A loose folder of `.sql` scripts in Git gives you history and review. A `.sqlproj` gives you
that *plus* a build step that catches broken references before anyone deploys anything.

## Schema comparison tools

A **schema comparison** tool answers a different but related question: given two schemas —
say, the definitions in your database project, and whatever a specific SQL Server instance
actually contains right now — what's different between them? SSDT includes a
**Schema Compare** feature built for exactly this, and Azure Data Studio has its own schema
comparison extension that does the same job outside Visual Studio. Point either tool at a
source (your project, or another database) and a target (a live server), and it produces a
concrete, itemized diff: this table is missing a column here, this stored procedure's body
differs, this index exists in one side but not the other.

That diff is the tool that catches **schema drift** — the gap that opens up when someone
makes a change directly on a server without going through source control at all, or when a
deployment silently fails partway through. Schema Compare doesn't just report the drift; it
can also generate the actual `ALTER`/`CREATE` script needed to bring the target in line with
the source, which you can review before running it.

## How they work together

In practice, the two tools form a loop: the database project in Git is the intended,
reviewed state of the schema. Schema comparison against a live environment tells you
whether that environment actually matches. When it doesn't — drift — you either update the
project to reflect a legitimate change that happened outside the normal process, or you
generate and run a script to bring the live database back in line with what source control
says it should be. Either way, the comparison is what surfaces the mismatch instead of
leaving it silently unnoticed until it causes a bug.

## Key terms

| Term | Meaning |
|---|---|
| `.sqlproj` | A SQL Server Database Project file — represents a schema as a structured, buildable collection of object scripts |
| SSDT | SQL Server Data Tools — the Visual Studio-based tooling that includes database projects and Schema Compare |
| Schema Compare | A feature (in SSDT and Azure Data Studio) that diffs two schemas and can generate a script to reconcile them |
| Schema drift | The gap between what source control says a schema should be and what a live database actually contains |

## Check yourself

A developer changes a stored procedure directly on the test server "just to try something
quickly" and forgets to update the corresponding file in the database project. What would a
schema comparison between the project and the test server show, and what are the two ways
to resolve that difference?
