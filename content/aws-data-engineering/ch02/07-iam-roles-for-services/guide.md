# IAM Roles for Services

Every service touched in this course — Glue, Lambda, EMR, Redshift, Step Functions — needs
permission to read and write S3, call other AWS APIs, and sometimes talk to each other. None
of them should ever do that with a long-lived access key. They do it by **assuming an IAM
role**, and understanding exactly how that assumption works is the foundation for everything
in this chapter.

## What you'll learn

- The difference between an IAM role and an IAM user
- What a trust policy is, and how a service principal fits into it
- How a service actually assumes a role at runtime
- Why roles, not access keys, are the correct default for AWS services

## Roles vs. users

An **IAM user** represents a person or application with long-term credentials (a password,
or access keys) — those credentials exist until someone rotates or deletes them. An **IAM
role** has no long-term credentials at all. Instead, anyone or anything permitted to assume
the role gets **temporary security credentials** (an access key, secret key, and session
token) that expire automatically, typically within an hour by default. A role also carries
two separate policies:

- A **permissions policy** — what the role is allowed to do once assumed (e.g., read/write a
  specific S3 prefix).
- A **trust policy** — who or what is allowed to assume the role in the first place.

## The trust policy and service principals

The trust policy is what makes a role usable by an AWS service instead of a person. It names
a **principal** — the entity being trusted to assume the role — and for services, that
principal is a **service principal**, a special identifier like `glue.amazonaws.com` or
`lambda.amazonaws.com`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "glue.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

This trust policy says: "the Glue service, and only the Glue service, may assume this
role." A Lambda function trying to assume the same role would be rejected — its principal
(`lambda.amazonaws.com`) isn't listed.

## How assumption actually happens at runtime

When you attach an IAM role to a Glue job, a Lambda function, or an EC2 instance, that
service calls `sts:AssumeRole` behind the scenes (you never call it yourself) using its own
identity as the principal. AWS's Security Token Service (STS) checks the trust policy, and
if the principal matches, issues temporary credentials scoped to exactly what the role's
permissions policy allows. Those credentials are what the service actually uses for every
subsequent API call — read from S3, write to a Glue table, publish to SNS — until they
expire and get silently refreshed.

## Why this beats access keys

A long-lived IAM user access key is a standing liability: if it leaks (committed to a repo,
logged accidentally), it's valid until someone notices and rotates it — which can be weeks.
A role's temporary credentials expire on their own, are never stored anywhere persistent,
and are scoped precisely to one service's job. This is why AWS documentation and every real
production pipeline uses roles for services as the default, and access keys are treated as
a last resort, mainly for local development or systems that genuinely cannot assume a role.

## Key terms

| Term | Meaning |
|---|---|
| IAM role | Identity with temporary credentials, assumable by trusted principals |
| Trust policy | Defines who/what may assume a role |
| Permissions policy | Defines what the role can do once assumed |
| Service principal | Identifier for an AWS service (e.g. `glue.amazonaws.com`) trusted in a policy |
| `sts:AssumeRole` | The API call that exchanges trust for temporary credentials |

## Check yourself

A Glue job's IAM role has a trust policy naming `lambda.amazonaws.com` as the principal
instead of `glue.amazonaws.com`. What happens when the Glue job tries to run, and why?
