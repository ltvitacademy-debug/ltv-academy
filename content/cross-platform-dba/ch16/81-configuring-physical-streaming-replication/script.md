# Script — Configuring Physical Streaming Replication

## Segment 1 (title)

Lesson eighty explained what streaming replication is. This lesson gets concrete: the settings that actually stand up a working physical replica, plus the one setting that prevents the most common replication failure — a standby that falls behind and can never catch up.

## Segment 2 (code: primary and standby settings)

On the primary, wal_level needs to be replica or higher and max_wal_senders limits how many standbys can stream at once, with pg_hba.conf authorizing the connection. On the standby, primary_conninfo is the connection string pointing back at the primary, and a standby.signal file's mere presence tells PostgreSQL on startup that this is a standby, not a primary.

## Segment 3 (steps: slots and hot standby)

A replication slot tracks exactly how much WAL its standby has confirmed receiving and tells the primary not to remove WAL past that point — without one, a slow or disconnected standby can lose WAL it needs and require a fresh base backup. The tradeoff: an unused slot makes WAL pile up forever, so drop it once the standby is gone. Hot standby lets the replica serve read-only queries while it keeps replaying changes in the background.

## Segment 4 (outro)

That's a working physical standby, configured and readable. Next up: logical replication in PostgreSQL — publications, subscriptions, and replicating selected tables instead of the whole cluster.
