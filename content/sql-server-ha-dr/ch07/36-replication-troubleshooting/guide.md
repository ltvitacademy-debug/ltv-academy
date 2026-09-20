# Replication Troubleshooting

Monitoring tells you *that* something's wrong. This lesson covers the three failure
modes that account for most real transactional replication incidents, what each one
actually looks like, and what to check first — including one gotcha experienced DBAs
learn the hard way exactly once.

## What you'll learn

- What a stalled Distribution Agent looks like and how to confirm it
- Identity range exhaustion — a real, specific, well-known gotcha
- Why schema changes can silently break replication

## A stalled Distribution Agent

The most common failure: the Log Reader Agent keeps working fine, but the Distribution
Agent stops making progress — often because a subscriber is unreachable, a target table
was locked by something else, or a delivered command hit a constraint violation on the
subscriber side. The symptom in Replication Monitor is a pending command count that
keeps climbing for one subscriber while others stay normal, plus an agent status showing
"retrying" or a specific error in the agent's history. The fix depends entirely on the
underlying cause shown in that error — there's no generic restart-and-hope step that
reliably resolves it, though restarting the agent job is often the first diagnostic
move to see whether the error recurs immediately or was transient.

## Identity range exhaustion — the classic gotcha

When a table with an `IDENTITY` column is replicated, SQL Server can automatically
manage separate, non-overlapping identity ranges for the publisher and each subscriber
(via the `@identityrangemanagementoption` publication property) specifically so inserts
happening independently at different servers never collide on the same identity value.
Each server is assigned a finite range; once a server's current range runs out, SQL
Server allocates it a new range — but if that allocation fails, or if a subscriber
allows independent inserts and burns through its assigned range unusually fast, inserts
start failing with an identity-range error at the affected server. This is a real,
well-documented gotcha specifically because it's easy to forget the ranges exist at
all until one runs out, often on the subscriber side, weeks or months into an otherwise
healthy replication topology.

## Schema changes that aren't replication-aware

Replication only knows about the columns and structure captured when the article was
defined (or last resynchronized). Adding a column, dropping a column, or changing a data
type directly on a published table with plain DDL can silently desynchronize the
publisher and subscriber schema, causing replicated commands to fail once they reach a
subscriber whose table shape no longer matches what's being sent. SQL Server provides
replication-aware paths for common schema changes (for example, `sp_repladdcolumn` and
`sp_repldropcolumn`, or letting replication propagate certain ALTER TABLE changes
automatically depending on version and configuration) specifically to avoid this — the
real lesson is that schema changes on a published table need to go through a
replication-aware path, not a routine DDL script that was fine before the table was
published.

## The common thread

All three failure modes trace back to the same root idea from Lesson 34: publisher and
subscriber are independent, loosely coupled systems connected only by the
distribution-database queue and agent activity. Nothing enforces that they stay in sync
automatically — replication has to actively maintain that, which is exactly why
monitoring (previous lesson) and disciplined change management around published
objects both matter as much as the initial setup.

## Key terms

| Term | Meaning |
|---|---|
| Stalled Distribution Agent | Distribution Agent stops making progress while the Log Reader Agent continues working normally |
| Identity range exhaustion | A server's assigned non-overlapping identity range runs out, causing inserts to fail |
| `@identityrangemanagementoption` | Publication property controlling automatic identity range management across publisher/subscribers |
| Replication-aware schema change | A schema change made through a supported path (e.g. `sp_repladdcolumn`) so replication stays in sync |

## Check yourself

A subscriber starts throwing identity-column errors on insert after months of trouble-free
replication, while the publisher is unaffected. What's the most likely cause, and what
should be checked first?
