# Lesson 20 — Running a Database in Kubernetes, and When Not To

**Chapter 5 · Kubernetes Storage & Stateful Workloads · Lesson 4 of 4**

## What you'll learn

- What it actually takes to run a production database on Kubernetes,
  now that you have PVs, PVCs, StorageClasses, and StatefulSets
- The real operational work a managed database service (Azure SQL,
  Amazon RDS, Azure Database for PostgreSQL) does for you that
  Kubernetes does not do automatically
- Why backup/restore, failover, and patching are harder inside
  Kubernetes than they look from a StatefulSet manifest alone
- A grounded framework for deciding which workloads belong on
  Kubernetes-hosted storage and which belong on a managed database

## You now have the pieces — but the pieces aren't the whole job

Across this chapter you've built a StatefulSet backed by dynamically
provisioned Azure Disks, with each replica keeping its own data
directory across restarts. That's genuinely the mechanism a database
needs. It is not, by itself, a production-ready database. Everything
below is what sits on top of that mechanism, and it's where "run
Postgres in Kubernetes" either becomes a reasonable engineering choice
or a multi-week operational burden, depending on who's doing it and
why.

## Backups: a PVC snapshot is not a database backup

It's tempting to think persistent storage solves backups too — just
snapshot the disk. For Azure Disk, that's a real capability:

```yaml
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: postgres-snapshot-1
spec:
  volumeSnapshotClassName: csi-azuredisk-vsc
  source:
    persistentVolumeClaimName: pgdata-postgres-0
```

But a disk-level snapshot captures whatever was physically on disk at
that instant — it says nothing about whether the database's internal
state was consistent at that moment, whether a transaction was
mid-write, or whether the WAL (write-ahead log) had been flushed.
Getting a *restorable, consistent* backup usually still means running
the database engine's own backup tooling (`pg_dump`/`pg_basebackup`
for PostgreSQL, `mysqldump`/`xtrabackup` for MySQL) from inside the
cluster, storing the result somewhere durable outside the cluster
(Azure Blob Storage, S3), and — critically — periodically *testing the
restore*, which a disk snapshot alone gives you no practice doing.

## What a managed database service does that a StatefulSet doesn't

Azure Database for PostgreSQL, Amazon RDS, and similar managed
services aren't "Postgres in a nicer dashboard." They absorb a
specific, real list of operational work:

- **Automated backups with point-in-time restore**, already tested by
  the provider, already stored durably off the primary disk.
- **Patching and minor-version upgrades** applied by the provider on a
  maintenance schedule, instead of a platform team tracking CVEs
  against the specific Postgres image running in the cluster.
- **Failover orchestration** — when the primary instance fails, the
  service promotes a replica and repoints connections, something a
  StatefulSet's ordered Pod management was never designed to do; a
  StatefulSet restarting `postgres-0` does not make it a healthy
  primary again if its data was corrupted.
- **Storage-layer durability guarantees** (automatic replication of
  the underlying disk) that exist independently of whatever
  `persistentVolumeReclaimPolicy` you set.

None of that is automatic just because the database happens to be
running inside a StatefulSet. A StatefulSet guarantees stable identity
and storage reattachment — it says nothing about backup testing,
patch cadence, or failover logic, all of which have to be built and
operated by whoever runs the cluster.

## When running a database inside Kubernetes is the right call

This isn't a blanket "never" — there are real, common reasons teams
do it:

- The database needs to colocate tightly with application Pods for
  latency or deployment-lifecycle reasons (e.g. an embedded cache or a
  per-tenant database in a multi-tenant platform).
- A managed equivalent doesn't exist for the specific engine or
  version needed (some specialty databases, or self-managed
  distributed systems like Kafka/Elasticsearch running via an
  **operator** — a controller that automates the day-2 operations a
  plain StatefulSet doesn't).
- The team already has — or is deliberately building — the operational
  maturity to run it: tested backups, monitoring, an on-call rotation
  that understands the failure modes, and a real disaster-recovery
  runbook, not just a StatefulSet manifest.

## A grounded decision framework

Ask two honest questions before choosing Kubernetes over a managed
service: *Who tests the restore, and how often?* and *What happens to
this data if the node it's scheduled on is lost entirely?* If the
answer to the first is "nobody, yet" and the second relies on nothing
more than `persistentVolumeReclaimPolicy: Retain`, that's a strong
signal to use a managed database service for anything the business
actually depends on, and reserve self-hosted StatefulSets for
workloads where the team has genuinely built — and tested — the
operational muscle around them.

## Key terms

| Term | Meaning |
|---|---|
| VolumeSnapshot | A disk-level, point-in-time copy of a PVC's underlying storage — not the same as an application-consistent database backup |
| Point-in-time restore | A managed service capability letting you restore a database to any moment within a retention window, backed by tested, automated backups |
| Operator | A controller that automates day-2 operations (backup, failover, scaling) for a complex stateful system beyond what a plain StatefulSet provides |
| Failover orchestration | Promoting a healthy replica to primary and repointing connections when the primary fails — not something a StatefulSet does on its own |

## Check yourself

You're ready to move on to Chapter 6 when you can explain, without
looking: why is a VolumeSnapshot of a PVC not the same thing as a
consistent, restorable database backup, and name two concrete pieces
of operational work a managed database service does that a
StatefulSet by itself does not.
