# Script — MySQL Replication Fundamentals

## Segment 1 (title)

Every SQL Server DBA already understands replication as a concept — a source of truth streams changes to copies that lag by some amount. MySQL builds on the same idea, but the mechanism underneath, and even the vocabulary, is genuinely its own.

## Segment 2 (code: the binary log is the foundation)

Every form of MySQL replication is built on the binary log — a set of files recording every data-modifying change. It exists independently of replication, for point-in-time recovery too. Replication is really just a second consumer reading that same log and replaying it.

## Segment 3 (steps: the replication threads)

Three threads move the data: a binlog dump thread on the source streams events to each connected replica. On the replica, an I/O thread pulls those events into a local relay log, and a separate SQL thread applies them. Splitting the replica side into two threads means pulling never blocks on applying.

## Segment 4 (outro)

MySQL 8.0 completed a terminology change — master and slave became source and replica, and SHOW MASTER STATUS became SHOW BINARY LOG STATUS. The mechanism hasn't changed, just the name. Next up: actually configuring source-replica replication.
