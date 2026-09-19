# Script — Securing With IAM Least Privilege

## Segment 1 (title)

Every service in this pipeline has been running under an assumed role since Lesson 3, but none of those roles have been scoped yet. This lesson writes real least-privilege policies so a leaked credential's blast radius stays small.

## Segment 2 (code: northfield-glue-role)

The role shared by the crawler and ETL job gets read and write access to exactly three buckets — raw zone, curated zone, and the script bucket — with no account-wide S3 access and no access to any other bucket.

## Segment 3 (code: northfield-stepfunctions-role)

The orchestrator's role names exact resource ARNs: it can start this one Glue job and execute statements against this one Redshift workgroup, not any Glue job or any workgroup in the account.

## Segment 4 (steps: three roles, three blast radii)

Three roles, each scoped tightly: the Glue role touches only the raw, curated, and script buckets. The Step Functions role can only invoke this specific crawler, job, and workgroup. And the Redshift copy role is read-only, limited to the curated zone alone.

## Segment 5 (outro)

Next up: CI/CD for the pipeline, where these same resources start deploying through a pipeline instead of manual console edits.
