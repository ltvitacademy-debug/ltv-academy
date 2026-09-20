# MongoDB Backup & Restore Strategies

Every DBA discipline eventually comes back to the same question: if this server disappears
right now, can you get the data back? MongoDB has three real, distinct answers — a logical
backup tool built into the server, a filesystem-snapshot approach for physical backups, and
a fully managed option on Atlas — and picking between them is the same kind of tradeoff
you already navigate between SQL Server's native backup, a SAN snapshot, and a managed
Azure SQL backup policy.

## What you'll learn

- `mongodump`/`mongorestore` as MongoDB's built-in logical backup tool
- Filesystem-snapshot backups as the physical alternative
- Atlas continuous backup as the managed, hands-off option

## Logical backup: mongodump and mongorestore

`mongodump` reads data out of a running MongoDB instance and writes it to BSON files on
disk — a **logical** backup, meaning it captures the data and rebuilds it document by
document on restore, not a byte-for-byte copy of the storage files:

```
mongodump --db=salesDB --out=/backups/2026-09-20
```

Restoring is the mirror operation:

```
mongorestore --db=salesDB /backups/2026-09-20/salesDB
```

Real, useful properties of this approach: it can target a single database, a single
collection, or the whole deployment; it works across different MongoDB versions and even
different storage engines, since it operates at the logical document level; and it's the
natural tool for moving a subset of data somewhere else (a dev environment, a different
cluster) rather than restoring an entire server. The real tradeoff is speed and resource
cost at scale — reading and rewriting every document is slower than copying raw files, and
it adds load to the running server while it happens.

## Physical backup: filesystem snapshots

For large deployments where `mongodump`'s per-document approach is too slow, the physical
alternative is a **filesystem snapshot** — using the underlying storage layer's
snapshotting (LVM on Linux, or a cloud provider's block-storage snapshot like an AWS EBS
snapshot) to capture the actual database files on disk almost instantly.

The real requirement for this to produce a consistent, restorable backup: either the
`mongod` process is briefly locked (`db.fsyncLock()`) so no writes land mid-snapshot, or —
more commonly in production — the snapshot is taken against a secondary member of a
replica set with journaling enabled, so the primary is never touched and the snapshot can
be replayed forward using the oplog to reach a consistent point. This is conceptually
close to a SQL Server backup taken via VSS or SAN-level snapshotting rather than
`BACKUP DATABASE` — much faster for large data volumes, but with its own consistency
requirements to get right.

## The managed option: Atlas continuous backup

Running on MongoDB Atlas, backup strategy becomes a configuration choice rather than a
script you maintain: Atlas offers **continuous backup**, which captures changes
continuously (via the oplog) and enables point-in-time restore to any moment within the
retention window, alongside scheduled snapshots — with no `mongodump` cron job, no
snapshot orchestration, and no manual restore testing pipeline to build yourself. This is
the same value proposition as an Azure SQL Database's automated backup and point-in-time
restore versus self-managing SQL Server backups — you trade some control for the managed
service handling the mechanics correctly.

## Key terms

| Term | Meaning |
|---|---|
| `mongodump` / `mongorestore` | Built-in logical backup/restore tools; operate at the document level |
| Logical backup | A backup that captures and rebuilds data document-by-document, not raw files |
| Filesystem snapshot | A physical backup capturing the actual data files via storage-layer snapshotting |
| `db.fsyncLock()` | Locks writes so a filesystem snapshot captures a consistent state |
| Atlas continuous backup | Atlas's managed backup with point-in-time restore via the oplog |

## Check yourself

A production deployment is large enough that `mongodump` takes hours and puts real load on
the server. Per this lesson, what's the alternative approach, and what real requirement
must be met for that alternative to produce a consistent backup?
