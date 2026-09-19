# Script — Disaster Recovery Considerations

## Segment 1 (title)

Nothing in this pipeline has failed yet, but "what happens if it does" is exactly the question a hiring manager asks next. This lesson is an honest disaster recovery pass, with stated RTO and RPO numbers, not a promise of zero downtime.

## Segment 2 (code: S3 versioning and CRR)

northfield-raw-zone has versioning enabled so an accidental delete or overwrite is recoverable, plus cross-region replication to a DR bucket in us-west-2. The curated zone isn't replicated, because it's fully reproducible by re-running the ETL job against the raw zone.

## Segment 3 (code: Redshift snapshots)

Redshift takes automated daily snapshots with seven days of retention, plus a manual snapshot before any deploy that touches the schema — so a bad migration's recovery path is restoring last night's snapshot, not reconstructing the schema from memory.

## Segment 4 (steps: honest RTO/RPO)

Three scenarios, three honest numbers: an accidental object delete recovers in minutes thanks to versioning. A regional outage has roughly a 24-hour recovery point, since this is a nightly batch system, and recovery takes hours to re-point to the backup region. A bad Redshift load recovers in one to two hours by restoring a snapshot.

## Segment 5 (outro)

Next up: presenting your AWS data platform — Chapter Four, where we turn everything built so far into the story you'd actually tell in an interview.
