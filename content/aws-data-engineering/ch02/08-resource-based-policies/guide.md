# Resource-Based Policies

So far, every policy in this chapter has been attached to an identity — a role. But
permission in AWS doesn't only flow from the identity side. S3 buckets, SNS topics, and a
handful of other resources can carry their own **resource-based policy** — a policy attached
directly to the resource, naming who is allowed to access *it*, from the resource's own
point of view. Understanding how these two policy types combine is essential the moment more
than one team or account touches the same bucket.

## What you'll learn

- The difference between an identity-based policy and a resource-based policy
- What an S3 bucket policy looks like and when you'd reach for one
- How AWS evaluates permissions when both policy types apply
- The one rule that overrides everything: an explicit Deny always wins

## Identity policies vs. resource policies

An **identity-based policy** is attached to a user, group, or role — it says "this identity
can do these things." A **resource-based policy** is attached to the resource itself (an S3
bucket, an SNS topic, an SQS queue, a Lambda function) — it says "these principals can do
these things to me." The two aren't competing mechanisms; they're two different attachment
points for the same kind of permission logic, and a request can be granted by either one.

A **bucket policy** is the resource-based policy type for S3. It's written in the same JSON
policy language as an identity policy, but the `Principal` field is required — since the
policy isn't attached to an identity, it has to name who it applies to:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111122223333:role/glue-etl-role" },
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-data-lake/curated/*"
    }
  ]
}
```

## When to reach for a bucket policy instead of an identity policy

An identity policy is the natural choice when you're granting permissions to a role or user
you manage. A bucket policy becomes necessary when you need to grant access to a principal
you *don't* manage directly through that identity's own policy — most commonly:

- Granting a **different AWS account** access to your bucket (covered fully in Lesson 9).
- Granting **public access** to specific objects (rare, and requires explicitly disabling S3
  Block Public Access).
- Centralizing access rules for a bucket in one place that a security team can audit without
  checking every IAM role that might touch it.

## How the two merge, and why Deny always wins

When a request hits S3, AWS evaluates **every applicable policy** — the requester's identity
policies and the bucket's resource policy — together. The logic:

1. If **any** applicable policy contains an explicit **Deny** for the request, it's denied,
   full stop, regardless of any Allow elsewhere.
2. Otherwise, if **any** applicable policy contains an explicit **Allow**, the request is
   permitted.
3. If neither Allow nor Deny applies, the request is denied by default (implicit deny).

This means an identity policy and a bucket policy can each independently grant access — you
don't need both to say yes, one Allow from either side is enough — but a single Deny
anywhere in the mix blocks the request no matter what else allows it.

## Key terms

| Term | Meaning |
|---|---|
| Identity-based policy | Policy attached to a user, group, or role |
| Resource-based policy | Policy attached to a resource (e.g. an S3 bucket), naming allowed principals |
| Bucket policy | The resource-based policy type for S3 buckets |
| Explicit Deny | A Deny statement that overrides any Allow from any policy, identity or resource |
| Implicit deny | Default outcome when no policy grants access |

## Check yourself

An IAM role's identity policy allows `s3:GetObject` on a bucket, but that bucket's policy has
an explicit Deny for the same role. Does the role get access? Why?
