# Lesson 5 — Azure Portal, SSMS & Azure Data Studio for DBAs

**Chapter 1 · Azure SQL & DBA Foundations · Lesson 5 of 95**

## What you'll learn

- The three tools a working Azure DBA moves between, and why none of them replaces the others
- When you reach for the Azure Portal instead of a query tool
- When SSMS is still the right call, even for Azure-hosted databases
- Why Azure Data Studio exists, and when it's the better choice than SSMS

## Three tools, three different jobs

T-SQL Development already taught you to write and run T-SQL — that
skill doesn't change here. What's new is that an Azure DBA moves
between three distinct tools depending on *what kind of task* is in
front of them, and treating any one of the three as sufficient on
its own is the fastest way to make the job harder than it needs to
be.

| Tool | What it's actually for |
|---|---|
| Azure Portal | Provisioning, configuration, monitoring, cost, scaling — resource-level administration |
| SSMS (SQL Server Management Studio) | T-SQL, object management, execution plans, deep SQL Server-specific tooling |
| Azure Data Studio | Cross-platform T-SQL editor, notebooks, lighter weight, Azure-first extensions |

## The Azure Portal: administration, not queries

The Portal is where you create a logical server, configure firewall
rules, resize compute, review the cost analysis, and set up alerts —
everything Lesson 7 onward walks through step by step. It is not
where you write T-SQL day to day; the Portal's built-in query editor
exists but is thin compared to a real client tool. Think of the
Portal as the resource's control panel, not its workbench. A DBA who
never opens the Portal is missing scaling, alerting, and cost
visibility that no query tool surfaces.

## SSMS: still the deepest SQL Server tool

SSMS remains the tool with the deepest SQL Server-specific tooling —
execution plan visualization, Extended Events sessions (Chapter 7),
SQL Server Agent job management where it applies, and the object
explorer most DBAs already have muscle memory for. Azure SQL Database
and Managed Instance both connect to SSMS exactly like an on-prem
instance would, once the connection string and firewall rule are in
place — the T-SQL you already know from T-SQL Development runs
unchanged. SSMS is Windows-only, which is precisely the gap Azure
Data Studio was built to fill.

## Azure Data Studio: lighter, cross-platform, Azure-first

Azure Data Studio runs on Windows, macOS, and Linux, and ships with
notebook support and extensions built specifically around Azure
workflows. It's not a strict replacement for SSMS — some
deep SQL Server tooling (certain Agent and replication UIs) is still
SSMS-only — but for a DBA on a non-Windows machine, or one who wants
notebook-based runbooks they can hand off to a teammate, it's often
the better daily driver. Many DBAs end up running both: Azure Data
Studio for quick queries and notebooks, SSMS when a task specifically
needs its deeper tooling.

```
Task: resize a database's compute tier         -> Azure Portal
Task: write and tune a stored procedure        -> SSMS or Azure Data Studio
Task: review an execution plan in depth        -> SSMS
Task: build a repeatable, shareable runbook     -> Azure Data Studio (notebooks)
Task: set a cost alert                          -> Azure Portal
```

## Key terms

| Term | Meaning |
|---|---|
| Azure Portal | Web-based console for provisioning, configuring, monitoring, and scaling Azure resources |
| SSMS | SQL Server Management Studio — Windows-only, deepest SQL Server-specific tooling |
| Azure Data Studio | Cross-platform, notebook-capable, Azure-first query and administration tool |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking:
if you need to resize a database's compute tier and then connect to
confirm a query still runs fast, which two tools do you use, in
order, and why not just one?
