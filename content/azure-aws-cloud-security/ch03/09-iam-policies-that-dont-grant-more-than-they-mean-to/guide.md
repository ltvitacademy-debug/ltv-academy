# Lesson 9 — IAM Policies That Don't Grant More Than They Mean To

**Chapter 3 · AWS Identity & Access Security · Lesson 1 of 4**

## What you'll learn

- How an IAM policy document is actually structured — `Version`,
  `Statement`, `Effect`, `Action`, `Resource`, and `Condition` — and
  what each field is doing at evaluation time
- Why a policy that "works" in testing can still be granting far more
  access than anyone intended
- How to use `Condition` keys to scope a grant down to the exact
  circumstances you mean, not just the exact API calls
- How IAM actually decides allow vs. deny when a principal has
  multiple policies attached

## The anatomy of a policy document

Every IAM policy — whether it's an identity-based policy attached to
a user, group, or role, or a resource-based policy attached directly
to an S3 bucket or KMS key — is a JSON document built from the same
small set of fields:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOnlyInvoiceArchive",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::ltv-invoice-archive",
        "arn:aws:s3:::ltv-invoice-archive/*"
      ],
      "Condition": {
        "Bool": { "aws:MultiFactorAuthPresent": "true" }
      }
    }
  ]
}
```

`Version` pins the policy language itself — almost every policy
written today uses `"2012-10-17"`, the version that added support for
policy variables and `Condition`. `Effect` is either `Allow` or
`Deny`. `Action` lists the API operations the statement covers, using
`service:ApiName` syntax. `Resource` lists the ARNs the statement
applies to — and this is the field most policies get wrong by being
too loose. `Condition` narrows the grant further: it only applies
when the stated circumstance is true.

## Where "least privilege" actually breaks down

The phrase "least privilege" is easy to say and hard to keep. It
breaks down in two specific, repeatable ways:

**Wildcard actions.** `"Action": "s3:*"` grants every S3 API
operation that exists today — `GetObject`, `DeleteObject`,
`PutBucketPolicy`, `PutBucketAcl` — and every one AWS adds later,
automatically, with no review. Someone who only needed to read
objects out of a bucket now has the ability to change that bucket's
own access policy. Compare the wildcard to an explicit list:

```json
"Action": [
  "s3:GetObject",
  "s3:ListBucket"
]
```

That's not a style preference — it's the difference between a policy
that can't be used to escalate itself and one that can.

**Wildcard resources.** `"Resource": "*"` is the same problem applied
to scope instead of verb. A policy meant to let an application read
one specific bucket, scoped with `"Resource": "*"` instead, lets that
application's credentials read *every* bucket in the account,
including ones created after the policy was written. Scoping to a
specific ARN — or an ARN prefix with a wildcard only on the object key,
like `arn:aws:s3:::ltv-invoice-archive/*` — keeps the blast radius of
a leaked credential limited to what that credential was actually
supposed to touch.

## Condition keys: scoping the "when," not just the "what"

`Action` and `Resource` answer "what can this principal do, and to
what." `Condition` answers "under what circumstances." Some of the
most load-bearing condition keys in real-world policies:

```json
"Condition": {
  "IpAddress": { "aws:SourceIp": "203.0.113.0/24" },
  "Bool": { "aws:MultiFactorAuthPresent": "true" },
  "DateLessThan": { "aws:CurrentTime": "2026-12-31T23:59:59Z" },
  "StringEquals": { "aws:RequestedRegion": "us-east-1" }
}
```

`aws:SourceIp` restricts a grant to requests coming from a known
network range — useful for admin actions you want tied to a VPN or
office egress IP. `aws:MultiFactorAuthPresent` requires the calling
principal to have authenticated with MFA in the current session —
the standard way to gate destructive actions like deleting a bucket
or changing a security group behind a stronger proof of identity than
"has valid credentials." `aws:RequestedRegion` stops a grant from
being usable in a region your workload has no business running in.
None of these make the `Action`/`Resource` grant any broader — they
only ever narrow it.

## How IAM actually evaluates multiple policies

A single IAM principal — a role being assumed by an application, a
user signed in to the console — can have several policies in play at
once: an attached identity-based policy, a permissions boundary, an
SCP from AWS Organizations (covered next lesson), and the
resource-based policy on whatever it's trying to reach. IAM's
evaluation logic is deterministic and worth memorizing exactly:

1. **Explicit deny anywhere wins.** If any applicable policy has an
   explicit `"Effect": "Deny"` that matches the request, the request
   is denied — full stop, regardless of how many `Allow` statements
   also match.
2. **Explicit allow is required.** If nothing explicitly allows the
   action, it's denied by default. There's no implicit allow in IAM.
3. **Everything else is an implicit deny.** The default state of
   every IAM principal, for every action, is denied, until a policy
   explicitly allows it.

That ordering is why a single overly broad `Allow` statement is
dangerous (it widens what's reachable) and why a single well-placed
`Deny` statement is powerful (nothing can override it).

## Managed vs. inline policies

AWS-managed policies (like `AmazonS3ReadOnlyAccess`) are convenient
but fixed — you can't edit them, and they tend to be broader than any
one job actually needs. Customer-managed policies are your own,
versioned, reusable JSON documents you attach to multiple principals.
Inline policies are embedded directly in one user, group, or role and
disappear if that principal is deleted — useful for a one-off grant
that should never accidentally get reused somewhere else. None of the
three change how evaluation works; they're just different places the
same `Effect`/`Action`/`Resource`/`Condition` statements can live.

## Key terms

| Term | Meaning |
|---|---|
| Identity-based policy | A policy attached to a user, group, or role, defining what that principal can do |
| Resource-based policy | A policy attached directly to a resource (e.g. an S3 bucket policy), defining who can reach that resource |
| `Condition` | The policy field that narrows a grant to a specific circumstance (source IP, MFA presence, time, region) |
| Explicit deny | A `Deny` statement that always wins evaluation, regardless of any matching `Allow` |
| Least privilege | Granting only the exact actions, on the exact resources, under the exact conditions a principal actually needs |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
is `"Resource": "*"` dangerous even when `Action` is scoped tightly,
and what does an explicit `Deny` statement override that an `Allow`
statement never can?
