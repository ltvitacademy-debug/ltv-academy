# Lesson 13 — Least Privilege for Data Pipelines

**Chapter 3 · IAM Deep Dive for Data Engineers · Lesson 13 of 18**

## What you'll learn

- What "least privilege" means in concrete, policy-writing terms
- Why `"Resource": "*"` is the single most common least-privilege
  violation in real AWS accounts
- How to scope S3 bucket ARNs, prefixes, and actions down to exactly
  what a pipeline needs
- Resource-level permissions on non-S3 services, and where they run
  out

## Least privilege, defined without hand-waving

**Least privilege** means a role's policy grants exactly the actions,
on exactly the resources, that the workload needs to do its job —
nothing broader "just in case." It's not a vague aspiration; it shows
up as concrete differences in the JSON.

```
NOT least privilege:                Least privilege:
{                                    {
  "Effect": "Allow",                  "Effect": "Allow",
  "Action": "s3:*",                   "Action": [
  "Resource": "*"                       "s3:GetObject",
}                                        "s3:PutObject"
                                       ],
                                     "Resource":
                                       "arn:aws:s3:::etl-landing/raw/*"
                                     }
```

The left-hand policy technically works — and that's the problem. It
grants every S3 action on every bucket in the account, to a role that
probably only ever needs to read one prefix and write to another.

## Scoping S3 access: bucket, prefix, and action

Real pipelines almost never need "all of S3." They need one bucket,
often one prefix inside it, and a small, specific set of actions:

```
Ingestion Lambda:
  Action:   s3:PutObject
  Resource: arn:aws:s3:::etl-landing/raw/*

Glue transform job:
  Action:   s3:GetObject, s3:PutObject
  Resource: arn:aws:s3:::etl-landing/raw/*,
            arn:aws:s3:::etl-curated/processed/*

Analyst's read-only role:
  Action:   s3:GetObject, s3:ListBucket
  Resource: arn:aws:s3:::etl-curated/*
```

Notice each role gets a *different* slice, matched to what that
specific job actually touches — the ingestion Lambda can't read the
curated bucket at all, because it has no reason to.

## Resource-level permissions beyond S3

S3 ARNs scope cleanly down to a bucket and prefix. Other services
support **resource-level permissions** too, though the granularity
varies by service and by action:

```
DynamoDB:   scope to one table's ARN
            (dynamodb:GetItem on one specific table)
Glue:        scope to one database or one table in the
            Data Catalog, not "all Glue resources"
Redshift:    scope redshift:GetClusterCredentials to one
            cluster, one database user
Lambda:      scope lambda:InvokeFunction to one function's
            ARN, not every function in the account
```

Some older or broader API actions genuinely don't support
resource-level scoping and require `"Resource": "*"` — that's a real
constraint, not laziness, and it's worth knowing the difference
before assuming every wildcard is a mistake.

## Start narrow, widen only with evidence

The practical workflow: grant the smallest set of actions you're
confident the pipeline needs, run it, and use **AWS CloudTrail**
(which logs every API call made in the account) to see exactly which
actions got denied — then add precisely those, and no more. Starting
from `s3:*` and never narrowing it is the far more common failure
mode than starting too narrow.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting exactly the actions and resources a workload needs, no broader |
| Resource-level permission | Scoping a policy to one specific resource ARN instead of `*` |
| Prefix scoping | Restricting S3 access to one folder-like prefix inside a bucket |
| AWS CloudTrail | The service that logs every API call, used to find exactly what a role was denied |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
is `{"Action": "s3:*", "Resource": "*"}` a least-privilege violation
even if the role that holds it only ever actually calls
`s3:GetObject`?
