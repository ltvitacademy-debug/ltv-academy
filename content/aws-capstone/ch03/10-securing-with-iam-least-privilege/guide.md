# Securing With IAM Least Privilege

Every service in this pipeline has been running under an assumed role since Lesson 3, but none of
those roles have been scoped yet. This lesson writes the real policy documents — one per service
— so each role can do exactly what its job requires and nothing else. If any one credential
leaked, the blast radius stops at that one role's narrow permissions.

## What you'll learn

- The three IAM roles this pipeline actually needs, and what each one is scoped to
- Real least-privilege policy JSON, not "AdministratorAccess for now"
- Why the Step Functions role is scoped to specific resource ARNs, not whole services

## northfield-glue-role

Used by both the crawler and the ETL job. It needs read/write on exactly two buckets — nothing
else in the account:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::northfield-raw-zone",
        "arn:aws:s3:::northfield-raw-zone/*",
        "arn:aws:s3:::northfield-curated-zone",
        "arn:aws:s3:::northfield-curated-zone/*",
        "arn:aws:s3:::northfield-glue-scripts",
        "arn:aws:s3:::northfield-glue-scripts/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["glue:GetTable", "glue:GetTables", "glue:UpdateTable", "glue:CreateTable", "glue:GetDatabase"],
      "Resource": [
        "arn:aws:glue:us-east-1:111122223333:catalog",
        "arn:aws:glue:us-east-1:111122223333:database/northfield_catalog",
        "arn:aws:glue:us-east-1:111122223333:table/northfield_catalog/*"
      ]
    }
  ]
}
```

No `s3:*` on the whole account, no access to any other bucket a future Northfield project might
create. If someone adds an unrelated `northfield-marketing-data` bucket next year, this role
still can't touch it.

## northfield-stepfunctions-role

Scoped to invoke exactly the resources this one pipeline uses — not "any Glue job" or "any
Redshift workgroup":

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["glue:StartCrawler", "glue:GetCrawler"],
      "Resource": "arn:aws:glue:us-east-1:111122223333:crawler/northfield-raw-crawler"
    },
    {
      "Effect": "Allow",
      "Action": ["glue:StartJobRun", "glue:GetJobRun", "glue:BatchStopJobRun"],
      "Resource": "arn:aws:glue:us-east-1:111122223333:job/northfield-orders-etl"
    },
    {
      "Effect": "Allow",
      "Action": ["redshift-data:ExecuteStatement", "redshift-data:DescribeStatement"],
      "Resource": "arn:aws:redshift-serverless:us-east-1:111122223333:workgroup/northfield-analytics"
    },
    {
      "Effect": "Allow",
      "Action": "sns:Publish",
      "Resource": "arn:aws:sns:us-east-1:111122223333:northfield-pipeline-notifications"
    }
  ]
}
```

Every `Resource` line names a specific ARN. This role can start `northfield-orders-etl` — it
cannot start any other Glue job in the account, even one Northfield creates later, unless someone
deliberately edits this policy.

## northfield-redshift-copy-role

The narrowest role in the pipeline — read-only on one bucket, used only by the `COPY` statement
from Lesson 6:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::northfield-curated-zone",
        "arn:aws:s3:::northfield-curated-zone/*"
      ]
    }
  ]
}
```

No write access, no access to the raw zone — Redshift only ever reads already-transformed data.

## Why resource-level scoping, not just service-level

A common shortcut is granting `"Resource": "*"` for a given action — "this role can start any
Glue job" instead of "this role can start *this* Glue job." That shortcut works until the account
grows a second project, at which point the role silently gains power nobody intended to give it.
Naming exact ARNs means adding a second capstone next year can't accidentally widen what
`northfield-stepfunctions-role` is allowed to touch.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting only the exact permissions a role needs, nothing broader |
| Resource-level scoping | Naming specific ARNs in a policy instead of `"Resource": "*"` |
| Blast radius | The scope of damage possible if a given credential is compromised |
| Assume role | The mechanism by which a service (Glue, Step Functions) acts as an IAM role |

## Check yourself

Why does `northfield-stepfunctions-role` name the exact ARN
`arn:aws:glue:...:job/northfield-orders-etl` instead of granting `glue:StartJobRun` on
`"Resource": "*"`?
