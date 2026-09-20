# Configuring Physical Streaming Replication

Lesson 80 explained what streaming replication is. This lesson gets concrete: the primary-side
and standby-side settings that actually stand up a working physical replica, plus the one
setting that prevents the single most common replication failure — a standby that falls behind
and can never catch up because the WAL it needs is already gone.

## What you'll learn

- The primary-side settings that allow a standby to connect and stream WAL
- Replication slots, and the WAL-removal problem they solve
- Hot standby, and how it lets a replica serve read queries while replaying

## Setting up the primary to accept a standby

A primary needs a few things before any standby can connect. `wal_level` must be set to
`replica` or higher (it defaults to `replica` in modern PostgreSQL, but it's worth confirming
rather than assuming), because that controls how much information gets written into WAL in the
first place — `minimal` doesn't include enough to replicate from. `max_wal_senders` sets how
many concurrent WAL sender processes — and therefore how many standbys — the primary can
support at once; each streaming standby (and each tool like `pg_basebackup` while it runs)
consumes one. The primary's `pg_hba.conf` also needs a line authorizing the standby's
connecting role to make a `replication` connection, the same way any client connection needs
an authorizing `pg_hba.conf` entry.

## Pointing the standby at the primary

On the standby side, `primary_conninfo` is the connection string the standby uses to reach the
primary and open its streaming connection — host, port, and the replication user's credentials.
It's set as a GUC (a `postgresql.conf`-style parameter, either in `postgresql.conf` itself or a
dedicated included file) rather than a special replication-only config file in current
PostgreSQL versions. The standby also needs a `standby.signal` file present in its data
directory — its existence, not its contents, is what tells PostgreSQL on startup "this is a
standby, not a primary." A standby is normally initialized from a `pg_basebackup` of the
primary (Lesson 71's tool, reused here) so it starts from a consistent copy before streaming
picks up from there.

## Replication slots: stopping the primary from deleting WAL a standby still needs

Here's the failure mode replication slots exist to prevent: PostgreSQL periodically recycles
old WAL files it no longer needs for crash recovery. Without anything telling it otherwise, the
primary doesn't know or care that a standby hasn't consumed a given WAL segment yet. If that
standby is slow, disconnected, or down, and the primary recycles the WAL that standby still
needs, the standby can never catch up through streaming alone — it's now missing WAL it can't
get back, and needs a fresh base backup. A replication slot is a named object on the primary
that tracks exactly how much WAL its associated standby has confirmed receiving, and it tells
the primary "don't remove WAL past this point, no matter how old it gets," until the standby
catches up. The tradeoff is real: a slot for a standby that's permanently gone will make WAL
pile up on the primary's disk indefinitely, so an unused slot needs to be dropped, not just
left alone.

## Hot standby: letting the replica also answer read queries

A standby doesn't have to sit idle just receiving and replaying changes. With `hot_standby`
enabled — the default in current PostgreSQL — a standby accepts read-only client connections
and runs `SELECT` queries against data while replay continues in the background. This is the
mechanism behind read-scaling patterns: point reporting or analytics traffic at a hot standby
so it never competes with write traffic on the primary. It's still eventually consistent, not
synchronous: a query on the standby can momentarily see slightly stale data relative to the
primary, consistent with the near-real-time lag from Lesson 80. Because the standby is
continuously replaying, PostgreSQL also has to resolve conflicts between an incoming replayed
change and a long-running read query on the standby — usually by briefly delaying replay,
governed by parameters like `max_standby_streaming_delay`.

## Key terms

| Term | Meaning |
|---|---|
| `primary_conninfo` | Standby-side connection string pointing at the primary for streaming |
| `standby.signal` | Empty marker file whose presence tells PostgreSQL a data directory is a standby |
| `max_wal_senders` | Primary-side limit on concurrent WAL sender processes (i.e., concurrent standbys) |
| Replication slot | Primary-side object that prevents WAL removal until its standby has consumed it |
| Hot standby | Standby mode that serves read-only queries while continuously replaying WAL |

## Check yourself

A standby has been disconnected from its primary for several hours due to a network outage.
The primary has a replication slot for it. What happens to WAL on the primary during that
outage, and what's the risk once the standby reconnects if that slot didn't exist?
