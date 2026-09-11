# Lesson 33 — Logging Providers

**Chapter 6 · Error Handling & Logging · Lesson 33 of 49**

## What you'll learn

- Why package logging is a separate mechanism from event handlers — and
  why you usually want both
- The five log providers SSIS ships with, and which connection manager
  each one needs
- How logging scope works across the container hierarchy, container by
  container
- The difference between the Basic and Advanced views on the Details tab

## Event handlers react. Logging just records.

Lesson 31's event handlers *do* something when an event fires — send an
e-mail, run a cleanup task. **Logging** is different: it just writes down
what happened, so you have a record to look back at later. You open it
from the **SSIS** menu → **Logging**, which opens the **Configure SSIS
Logs** dialog box — no design surface this time, just a configuration
screen with two tabs: **Providers and Logs**, and **Details**.

Real packages almost always use both mechanisms together: an OnError event
handler to alert someone *right now*, and a text-file or database log to
give that person something to actually diagnose *after* the alert.

## Five log providers, each writing somewhere different

On the **Providers and Logs** tab, you pick a **Provider type** and click
**Add**. A package can have more than one log, even more than one of the
same type, all writing independently:

- **SSIS log provider for Text files** — plain, portable log files. Needs a
  File connection manager.
- **SSIS log provider for SQL Server** — writes to the `sysssislog` table
  in a SQL Server database. Needs an OLE DB connection manager.
- **SSIS log provider for Windows Event Log** — writes into the Windows
  Application event log. Needs no connection manager at all — SSIS handles
  it automatically.
- **SSIS log provider for XML files** — structured XML output. Needs a
  File connection manager.
- **SSIS log provider for SQL Server Profiler** — writes a trace file
  Profiler can open directly. Needs a File connection manager.

For each log you add, you get editable **Name** and **Description** fields,
plus a **Configuration** column where you pick or create the connection
manager it writes through.

## Logging is scoped per container — and it inherits by default

The **Containers** pane lists the package and every container and task
inside it, each with a checkbox. By default a child container is *dimmed*
and simply inherits its parent's logging configuration — you're not
choosing per-task settings unless you deliberately break that inheritance.

To give a specific task its own logging behavior, click its dimmed checkbox
twice: the first click clears it, the second selects it and unlocks its own
provider and event choices, independent of its parent.

## Picking which events actually get written

The **Details** tab is where you choose *what* to log, and it applies to
whichever container is selected in the Containers pane:

- **Basic** view — just a checklist of events (OnError, OnWarning,
  OnPreExecute, and so on). Check the ones you want logged.
- **Advanced** view — the same event list, but expanded to show the
  information categories available for each one: Computer, Operator,
  SourceName, SourceID, ExecutionID, MessageText. By default every category
  is selected once you check an event; Advanced lets you trim that down.

You can **Save** a configuration as an XML template and **Load** it back
into another package later, so you don't have to rebuild the same log
setup by hand on every package in a project.

## Key terms

| Term | Meaning |
|---|---|
| Configure SSIS Logs | The dialog box (SSIS menu → Logging) where package logging is set up |
| Log provider | The destination type for a log — text file, SQL Server, Windows Event Log, XML, or SQL Server Profiler |
| Providers and Logs tab | Where you add, name, and configure each log provider |
| Details tab | Where you pick which events get logged, and how much detail per event |
| Logging inheritance | A container's default behavior of using its parent's logging configuration until explicitly overridden |

## Lab

1. Open any package from an earlier lesson. On the **SSIS** menu, select
   **Logging**.
2. In the **Provider type** list, select **SSIS log provider for Text
   files**, and click **Add**.
3. In the **Configuration** column, create a new File connection manager
   pointed at a new `.log` file in your project folder.
4. In the **Containers** pane, select the package (top-level) checkbox. On
   the **Details** tab, check **OnError**, **OnWarning**, and
   **OnPostExecute**.
5. Run the package, then open the log file and confirm the events you
   picked actually got written.

## Check yourself

You're ready for Lesson 34 when you can explain: what's the practical
difference between an event handler and a logging provider, and why most
real packages use both instead of just one?
