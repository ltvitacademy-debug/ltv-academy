# Lesson 112 — Reading a Deadlock Graph

**Chapter 9 · Transactions, Locking, and Isolation Levels · Lesson 13 of 30**

## What you'll learn

- What a deadlock graph actually is
- Extended Events — the modern, documented way to capture one
- The older trace flag 1222 / SQL Profiler approach, and why it still
  exists
- How to read the two processes and the victim out of the graph's shape

## After the fact: what actually happened?

Lesson 111 covered what a deadlock *is* and what SQL Server does about
it automatically — picking a victim, rolling it back, returning error
1205. But when a deadlock happens in production and you need to actually
understand *why*, you need more detail than the error message alone
gives you: which two processes were involved, what resources each one
held and was waiting for, and which one got chosen as the victim. SQL
Server can capture exactly that, as an XML **deadlock graph**.

## Extended Events: the modern way to capture one

**Extended Events** is the current, documented, recommended method for
capturing deadlock graphs in SQL Server. At a high level, you create an
Extended Events session subscribed to the `xml_deadlock_report` event,
start it, and let it run — the next time SQL Server's deadlock monitor
resolves a deadlock, this event fires and the full graph is captured,
viewable in SSMS's Extended Events UI (which can render it as an actual
graphical deadlock diagram, not just raw XML).

```sql
-- Simplified shape of an Extended Events session for this purpose
CREATE EVENT SESSION CaptureDeadlocks ON SERVER
ADD EVENT sqlserver.xml_deadlock_report
ADD TARGET package0.event_file (SET filename = 'DeadlockCapture');

ALTER EVENT SESSION CaptureDeadlocks ON SERVER STATE = START;
```

## The older method still exists

Before Extended Events, the standard approach was **trace flag 1222**
(enabled with `DBCC TRACEON (1222, -1);`), which writes deadlock graph
information to the SQL Server error log, or capturing deadlocks through
**SQL Server Profiler**. Both still work today, and you may encounter
them on older systems or in older documentation — but Extended Events is
the modern, lighter-weight, currently recommended approach, and it's the
one worth building real fluency with.

## What the graph actually shows

Regardless of how it was captured, a deadlock graph's XML describes:

- **Two (or more) process nodes** — one per transaction involved, each
  with its session ID, the statement it was running, and the isolation
  level it was using.
- **Resource nodes** — the specific locks each process **held** and the
  specific locks each process was **waiting for**, which is exactly the
  cycle from Lesson 111 made visible: Process A's held-resource matches
  Process B's waiting-for-resource, and vice versa.
- **The victim** — one process node is explicitly marked as the one SQL
  Server chose to kill and roll back.

## Reading it in practice

In SSMS's graphical deadlock viewer, the two processes typically render
as two ovals, each connected by an arrow to the resource (often shown as
a rectangle) it's waiting on, and by a different kind of connection to the
resource it already owns. The process marked with an X is the victim.
Reading the graph is really just tracing that same "A holds X, wants Y;
B holds Y, wants X" cycle from Lesson 111, but with real object names,
real session IDs, and the real statements that were running.

## Key terms

| Term | Meaning |
|---|---|
| Deadlock graph | An XML capture of the processes, resources, and victim involved in a deadlock |
| Extended Events | The modern, documented method for capturing deadlock graphs |
| Trace flag 1222 | The older method, writing deadlock info to the error log |

## Lab

Reproduce Lesson 111's two-session deadlock scenario. Before running it,
set up an Extended Events session subscribed to `xml_deadlock_report` (or
simply enable `DBCC TRACEON (1222, -1);` for a quicker look at the error
log). After the deadlock occurs, find the captured graph and identify the
two process nodes, the resources each held and waited for, and which one
was marked as the victim.

## Check yourself

You're ready for Lesson 113 when you can answer, without looking: what is
the modern, documented method for capturing a deadlock graph, and what
three things does the graph let you identify about the deadlock?
