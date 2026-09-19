# Disaster Recovery Considerations

Nothing in this pipeline has failed yet, but "what happens if it does" is exactly the question a
hiring manager asks next. This lesson is an honest DR pass — not a promise of zero downtime
(Northfield is a mid-size retailer, not a bank), but a stated, defensible RTO/RPO and the real AWS
features that back it up.

## What you'll learn

- S3 versioning and cross-region replication on the raw zone
- Redshift automated snapshots and their retention
- Stated RTO/RPO for this specific project, and why those numbers are honest, not aspirational

## S3 versioning and cross-region replication

`northfield-raw-zone` has versioning enabled, so an accidental overwrite or delete is
recoverable — every object version is retained, not just the latest. On top of that, a
cross-region replication (CRR) rule copies every new object to a DR bucket in a second region:

```
Source:       northfield-raw-zone           (us-east-1)
Destination:  northfield-raw-zone-dr-west    (us-west-2)
Replication:  all objects, near-real-time
IAM role:     northfield-s3-replication-role
```

If `us-east-1` had a regional outage, the previous night's raw data already exists in
`us-west-2` — recovery means re-pointing the pipeline's source region, not re-running
Northfield's SQL Server export from scratch.

The curated zone is not replicated cross-region: it's fully reproducible from the raw zone by
re-running `northfield-orders-etl`, so replicating it would duplicate storage cost for data that
isn't the actual source of truth.

## Redshift automated snapshots

```
Automated snapshots:  enabled, daily
Retention:             7 days
Manual snapshot:       taken before every CI/CD deploy that touches schema
```

Redshift Serverless takes automated snapshots on its own schedule; this project keeps 7 days of
them, enough to recover from a bad load without keeping snapshots indefinitely at a storage cost
nobody's using. A manual snapshot before any schema-touching deploy is a cheap insurance policy:
if a migration goes wrong, the recovery path is "restore last night's manual snapshot," not
"reconstruct the schema from memory."

## Stated RTO and RPO

| Failure scenario | RPO | RTO |
|---|---|---|
| Accidental S3 object delete/overwrite | 0 (versioning) | Minutes (restore prior version) |
| Regional S3 outage | ~24 hours (last night's replicated data) | Hours (re-point pipeline to us-west-2) |
| Bad Redshift load or schema change | 24 hours (last automated/manual snapshot) | 1-2 hours (restore snapshot) |
| Full pipeline rebuild from scratch | 24 hours (data), 0 (infra, via CI/CD + IaC) | Under a day |

These numbers are honest because they match how the pipeline is actually built: it's a nightly
batch system, so RPO can never be better than "since the last successful run" without adding
real-time replication this project doesn't need. Claiming a sub-hour RPO for a system that only
ingests once a day would be the kind of made-up number that falls apart under one follow-up
question in an interview.

## Key terms

| Term | Meaning |
|---|---|
| RTO | Recovery Time Objective — how long recovery is expected to take |
| RPO | Recovery Point Objective — how much data loss (measured in time) is acceptable |
| Cross-region replication (CRR) | Automatic copying of S3 objects to a bucket in a different AWS region |
| Automated snapshot | Redshift's own periodic backup, distinct from a manually triggered one |

## Check yourself

Why does this lesson's stated RPO for a regional S3 outage sit at roughly 24 hours instead of
something smaller, like a few minutes?
