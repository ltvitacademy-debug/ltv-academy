# Script — Long-Term Retention & Backup Policies

## Segment 1 (title)

Point-in-time restore tops out at 35 days — good for operational mistakes, not for regulatory requirements that mandate keeping records recoverable for years. Long-term retention is a separate policy for exactly that, keeping designated full backups for up to 10 years.

## Segment 2 (screenshot: retention policies tab)

You configure LTR on the database's Backups blade, Retention policies tab — weekly, monthly, and yearly frequencies, each with its own independent duration. You might keep weekly backups for 12 weeks, monthly for 12 months, and yearly for 7 years, all at once.

## Segment 3 (screenshot: available backups tab)

Once an LTR policy has run long enough, those backups show up on a separate Available backups tab. Restoring from one creates a new database just like point-in-time restore, but gives you a specific designated backup rather than an arbitrary timestamp.

## Segment 4 (outro)

Nobody restores a 7-year-old LTR backup because of this morning's bad UPDATE — that's what the short-term window is for. LTR is a compliance decision. Next up: backing up on-prem SQL Server to Azure Storage directly, and tying backup strategy to real disaster recovery scenarios.
