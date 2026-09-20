# Script — MongoDB Backup & Restore Strategies

## Segment 1 (title)

Every DBA discipline comes back to the same question: if this server disappears right now, can you get the data back? MongoDB has three real, distinct answers — a logical backup tool, a filesystem-snapshot approach, and a fully managed option on Atlas.

## Segment 2 (code: mongodump / mongorestore)

mongodump reads data out of a running instance into BSON files — a logical backup, rebuilt document by document on restore. It can target a single database, a single collection, or the whole deployment, and works across versions, but reading and rewriting every document is slower at scale and adds load to the running server.

## Segment 3 (code: filesystem snapshots)

For large deployments, the physical alternative is a filesystem snapshot — LVM or a cloud block-storage snapshot — capturing the actual data files almost instantly. To be consistent, either the process is briefly locked with fsyncLock, or more commonly, the snapshot is taken against a secondary with journaling enabled and replayed forward with the oplog.

## Segment 4 (steps: three approaches)

mongodump, logical and flexible but slower at scale. Filesystem snapshots, physical and fast, but needing a consistency guarantee. And Atlas continuous backup, fully managed, capturing changes via the oplog for point-in-time restore with no scripts to maintain.

## Segment 5 (outro)

Backups only matter if you know the server is healthy enough to need one, or not. Next up: monitoring MongoDB in real time with mongostat, mongotop, and Atlas's built-in dashboards.
