# Script — Log Shipping Monitoring

## Segment 1 (title)

A secondary that's minutes behind by design is fine, only if someone actually knows how many minutes. Log shipping ships with real built-in monitoring for exactly this, and this lesson covers how to actually use it.

## Segment 2 (code: where the real data lives)

SQL Server maintains status tables inside msdb. log_shipping_monitor_primary tracks the last backup time and threshold on the primary side. log_shipping_monitor_secondary tracks the last copy and restore times and their thresholds on the secondary side — both queryable directly, no GUI required.

## Segment 3 (steps: how the alert job catches problems)

Log shipping configuration includes an option to create a dedicated alert job, commonly named LSAlert, that runs on its own schedule and checks the monitor tables against the configured thresholds. If a step hasn't happened recently enough, it raises an alert wired to Database Mail — the same alerting used for backup jobs earlier in this course.

## Segment 4 (outro)

The real question is always how far behind are we, against what threshold — not a gut feeling. Next up: database mirroring, an older technology worth understanding honestly, in its real legacy context.
