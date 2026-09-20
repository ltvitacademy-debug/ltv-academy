# Script — Configuring Source-Replica Replication

## Segment 1 (title)

The last lesson covered how MySQL replication works underneath. This lesson configures it — turning a standalone server and a fresh instance into a working source and replica, using the current MySQL 8.0.23+ syntax throughout.

## Segment 2 (code: prepare the source)

The source needs a unique server_id, binary logging turned on, and GTIDs enabled so transactions can be tracked by ID instead of raw file position. It also needs a dedicated account granted the REPLICATION SLAVE privilege — that privilege name predates the source and replica terminology change.

## Segment 3 (code: point the replica at the source)

The replica is pointed at the source with CHANGE REPLICATION SOURCE TO — the direct MySQL 8.0.23+ replacement for the older CHANGE MASTER TO. SOURCE_AUTO_POSITION equals 1 tells it to use GTID auto-positioning instead of being handed an exact binlog file and byte offset.

## Segment 4 (steps: start it and confirm it's healthy)

START REPLICA starts the I/O and SQL threads — START SLAVE still works as a deprecated alias, but START REPLICA is current. SHOW REPLICA STATUS should show both Replica_IO_Running and Replica_SQL_Running as Yes. By default this is asynchronous — the source never waits for a replica to acknowledge a transaction.

## Segment 5 (outro)

MySQL also offers semisynchronous replication as a plugin, making the source wait for at least one replica's acknowledgment. Next up: Group Replication and MySQL InnoDB Cluster, MySQL's native, consensus-based approach to high availability.
