# Lesson 79 — Point-in-Time Restore

**Chapter 13 · Backup & Restore · Lesson 79 of 95**

## What you'll learn

- How Azure SQL Database's automated backups turn into a point-in-time restore, using the Portal
- What the retention window actually is, and how tier affects its length
- Why restoring always creates a new database rather than overwriting the original
- The specific, less-obvious scenario of restoring a database that was deleted entirely

## From automated backups to a usable restore

Lesson 78 covered that Azure SQL Database takes full, differential, and
log backups automatically. Point-in-time restore is what actually turns
that backup stream into something you use in an incident: pick any point
in time within the retention window, and Azure reconstructs the database
as it existed at that exact moment — the same full-plus-differential-plus-log
chain logic from Lesson 76, applied automatically for you instead of by
hand.

## Doing it from the Azure Portal

From a database's **Overview** page, the **Restore** button opens a
dialog where you choose "Point in time" and pick a timestamp within the
retention window:

![Azure Portal database overview page with the Restore option highlighted](/courses/azure-dba/ch13/79-point-in-time-restore/restore-database-portal.png)

A few things about this that matter in a real incident:

- **Restoring always creates a new database**, alongside the original —
  it does not overwrite anything. You typically restore, verify the
  restored copy has what you need, then either swap connection strings or
  copy data back into the original.
- **The retention window length depends on your service tier and
  configuration** — it defaults to 7 days but can be configured up to 35
  days for the short-term (non-LTR) window.
- You cannot restore to a point *before* the earliest backup available in
  that window — the timeline picker only lets you choose valid timestamps.

## The less-obvious case: restoring a deleted database

Point-in-time restore isn't only for "I need last Tuesday's data before
someone's bad `UPDATE`." It's also how you recover from someone deleting
the entire database. Azure retains a deleted database's backups for the
remainder of its configured retention period even after the database
itself is gone — and the restore path for this is genuinely less obvious,
because there's no database left to right-click:

![Azure Portal server-level deleted databases list with restore option annotated](/courses/azure-dba/ch13/79-point-in-time-restore/restore-deleted-sql-database-annotated.png)

You restore a deleted database from the **server** level, not the
database level — the server's "Deleted databases" list is where that
backup history still lives. This is worth memorizing specifically: a
student who only practices restoring an *existing* database to an earlier
point will be stuck in a real deletion incident if they don't know to look
at the server, not the (now-gone) database.

## Key terms

| Term | Meaning |
|---|---|
| Point-in-time restore | Restoring a database to any moment within the retention window, using the automated backup chain |
| Retention window | How far back you can restore — default 7 days, configurable up to 35 for short-term retention |
| Deleted database restore | Restoring from the server's "Deleted databases" list, since the database itself no longer exists to restore from directly |

## Check yourself

You're ready for Lesson 80 when you can explain, without looking: why does
restoring a deleted Azure SQL Database happen at the server level instead
of the database level, and what does a point-in-time restore actually
create — a new database, or an overwrite of the original?
