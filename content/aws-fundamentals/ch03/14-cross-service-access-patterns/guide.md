# Lesson 14 — Cross-Service Access Patterns

**Chapter 3 · IAM Deep Dive for Data Engineers · Lesson 14 of 18**

## What you'll learn

- How an AWS service — Lambda, Glue, EC2 — actually gets permission to
  call other AWS services on your behalf
- What a trust policy looks like when the "who" is a service, not a
  person
- How AWS STS `AssumeRole` grants temporary cross-account access
- How resource-based policies provide a second, complementary
  cross-service pattern

## The service role pattern

Chapter 3 has built toward this: a Lambda function, a Glue job, or an
EC2 instance can't authenticate the way a human does — no console
sign-in, no typed access key. Instead, each one is configured with an
**execution role** (Lambda/Glue's term) or an **instance profile**
(EC2's term), and the service assumes that role automatically on the
workload's behalf.

```
Glue job "daily-etl" is configured with role:
  arn:aws:iam::123456789012:role/glue-etl-execution-role

At runtime, AWS Glue (the service) assumes that role,
receives temporary credentials from STS, and the job's
code runs with exactly that role's permissions —
no access key ever touched the job.
```

## Trust policies: the "who can assume this" half

Every role has a **trust policy** — a resource-based policy attached
to the role itself, separate from its permissions policy, that
defines who or what is allowed to assume it. When the assumer is an
AWS service rather than a person, the trust policy's Principal names
the service:

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

This says, precisely: "the AWS Glue service, and only the AWS Glue
service, is allowed to assume this role." A Lambda function's
execution role trusts `lambda.amazonaws.com`; an EC2 instance
profile's role trusts `ec2.amazonaws.com`. The permissions policy on
the same role (Lesson 12's territory) then defines what the assumed
role can actually do once assumed.

## STS AssumeRole: the mechanism underneath

**AWS STS (Security Token Service)** is what issues the temporary
credentials every role assumption produces. `sts:AssumeRole` is the
actual API action a trust policy grants — whether the caller is an
AWS service, a human using the CLI, or another AWS account entirely:

```
Human in Account A wants temporary access to Account B:

1. Account B creates a role with a trust policy naming
   Account A as a trusted Principal
2. The human in Account A calls sts:AssumeRole against
   that role's ARN
3. STS returns temporary credentials scoped to Account B's
   role — valid for up to an hour by default
4. Account A's user never had standing access to Account B
```

This is the standard cross-account access pattern in AWS — used
constantly in real organizations that separate, say, a data
engineering account from a shared analytics account, without ever
issuing a permanent user in either direction.

## Resource-based policies: the other half of cross-service access

Not every cross-service pattern goes through role assumption. Some
services grant access directly via a **resource-based policy** on the
resource itself — no role assumed at all. An S3 bucket policy that
allows a specific Lambda function's role to read from it, or an SQS
queue policy that allows an SNS topic to publish into it, are both
resource-based grants layered on top of (or sometimes instead of) an
identity-based one.

```
Two complementary patterns:
  Role assumption      "I temporarily become this role"
  Resource-based policy "this resource lets me in directly"
```

Real architectures use both: a Lambda's execution role (assumed)
grants it general permissions, while a specific bucket's policy
(resource-based) might additionally allow a different account's role
to reach in for one particular integration.

## Key terms

| Term | Meaning |
|---|---|
| Execution role | The IAM role a service like Lambda or Glue assumes to run a workload |
| Instance profile | EC2's mechanism for attaching an IAM role to a running instance |
| Trust policy | The resource-based policy on a role defining who/what can assume it |
| sts:AssumeRole | The API action that produces temporary credentials for an assumed role |
| Cross-account access | Granting a role in one AWS account to be assumed by a principal in another |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: what
two separate policies exist on a single IAM role, and what question
does each one answer?
