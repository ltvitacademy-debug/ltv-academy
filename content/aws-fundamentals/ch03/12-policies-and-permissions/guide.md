# Lesson 12 — Policies & Permissions

**Chapter 3 · IAM Deep Dive for Data Engineers · Lesson 12 of 18**

## What you'll learn

- The anatomy of an IAM policy document: Effect, Action, Resource, and
  the optional Principal and Condition
- The difference between identity-based and resource-based policies
- Managed policies versus inline policies, and when each makes sense
- How to read a policy and predict exactly what it allows

## A policy is JSON, and it's read literally

Every IAM policy is a JSON document with one or more **statements**.
Each statement is evaluated on its own, and AWS reads it exactly as
written — there's no implied intent, only the literal Effect, Action,
and Resource.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::analytics-raw-data",
        "arn:aws:s3:::analytics-raw-data/*"
      ]
    }
  ]
}
```

- **Effect** — `Allow` or `Deny`. Nothing else.
- **Action** — the specific API call(s) this statement covers, written
  as `service:ActionName` (`s3:GetObject`, `glue:StartJobRun`,
  `redshift:GetClusterCredentials`).
- **Resource** — the ARN(s) this statement applies to. Note the two
  ARNs above: the bucket itself (needed for `ListBucket`) and the
  `/*` wildcard inside it (needed for `GetObject` on the objects).
  Forgetting the second ARN is one of the most common S3 permission
  bugs there is.

By default, IAM denies everything. A policy only ever adds an
`Allow`, or an explicit `Deny` that overrides any `Allow` from
elsewhere — there's no "maybe."

## Identity-based vs. resource-based policies

```
Identity-based policy         Resource-based policy
attached to a user,            attached to the resource
group, or role                 itself (an S3 bucket, an
                                SQS queue, a KMS key)
"What can THIS IDENTITY do?"   "Who can access THIS
                                RESOURCE, and how?"
```

A resource-based policy is the only policy type that includes a
**Principal** element, because it has to name who it's granting
access to — an identity-based policy is already attached to that
identity, so naming it again would be redundant. S3 bucket policies
are the resource-based policy you'll meet most often in this course;
they're what allows, for example, a different AWS account's role to
read from a specific bucket without that account needing any
identity-based grant on your side at all.

## Managed policies vs. inline policies

```
AWS managed          Customer managed         Inline
Written & maintained  You write it, you        Written directly on
by AWS                maintain it, reusable    one user/group/role,
("AmazonS3ReadOnly     across many identities   not reusable, deleted
Access")                                        with its identity
```

AWS managed policies are convenient for getting started or for broad,
well-known access patterns, but they're often wider than a real
pipeline needs. Customer managed policies are the standard choice for
production data engineering work: you write the exact permissions,
version them, and attach the same policy to every role that needs
that access. Inline policies exist mainly for one-off exceptions
tightly coupled to a single identity's lifecycle.

## Reading a policy like AWS does

Given multiple statements — possibly across multiple policies
attached to the same identity — AWS evaluates all of them and applies
this order: an explicit `Deny` anywhere always wins, regardless of
how many `Allow` statements exist elsewhere. If nothing explicitly
allows the action, the default (implicit) deny applies. Lesson 13
builds directly on this to scope pipeline permissions down to exactly
what's needed.

## Key terms

| Term | Meaning |
|---|---|
| Statement | One Effect/Action/Resource rule inside a policy document |
| Action | The specific API call a statement covers, as `service:ActionName` |
| Resource | The ARN(s) a statement applies to |
| Identity-based policy | A policy attached to a user, group, or role |
| Resource-based policy | A policy attached to the resource itself, naming a Principal |
| Managed policy | A standalone, reusable policy (AWS managed or customer managed) |
| Inline policy | A policy embedded directly in one identity, not reusable |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
does an S3 read policy typically need two Resource ARNs — the bucket
itself and a `/*` wildcard — instead of just one?
