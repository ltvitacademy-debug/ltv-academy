# Script — Azure SQL Automated Backups

## Segment 1 (title)

For Azure SQL Database, Microsoft takes full, differential, and log backups automatically, on its own schedule. There's no BACKUP DATABASE statement to run here — not a different way to configure it, there's simply nothing for you to configure.

## Segment 2 (steps: the automatic schedule)

Full backups happen roughly weekly, differentials every 12 to 24 hours, and transaction log backups every 5 to 10 minutes — all triggered by Azure, not by you, and stored automatically using the same redundancy option you already picked for the database itself.

## Segment 3 (code: what's honestly gained and lost)

This is worth stating plainly instead of glossing over: you lose direct visibility into backup jobs succeeding or failing, which is real on-prem DBA work. What you keep control over is the retention window, an optional long-term retention policy on top, and which redundancy tier the database uses.

## Segment 4 (outro)

That retention window — how far back you can restore — is exactly where point-in-time restore comes in next, including the specific case of restoring a database that was deleted entirely.
