# IAM Best Practices for Pipelines

This chapter has covered how roles work, how bucket policies combine with identity
policies, and how to grant access across accounts. This last lesson pulls those pieces
together into the habits that separate a pipeline built by someone who understands IAM from
one that technically works but is one leaked credential away from a real incident.

## What you'll learn

- What least privilege means in practice, not just as a slogan
- Why scoped resource ARNs beat `"Resource": "*"`
- Why long-lived access keys should be avoided entirely for pipeline infrastructure
- What IAM Access Analyzer does and why it's worth running

## Least privilege, scoped to real resources

**Least privilege** means a role can do exactly what its job requires and nothing else. The
most common way this gets violated isn't malice — it's convenience. A Glue job role written
during early development with:

```json
{ "Effect": "Allow", "Action": "s3:*", "Resource": "*" }
```

works immediately, on any bucket, for any action, which is exactly why it's dangerous: a bug
in that job's code, or a compromised dependency, now has read/write/delete access to
*every* bucket in the account, not just the one the job was meant to touch. The scoped
version for a job that only needs to read raw data and write curated data:

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-data-lake/raw/*"
},
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::my-data-lake/curated/*"
}
```

Same job, same functionality — but now a bug or compromise is contained to two prefixes
instead of the whole account. Scoping the `Resource` field to specific ARNs (and the
`Action` field to specific API calls) is the single highest-leverage habit in this chapter.

## Roles over long-lived keys, everywhere

Lesson 7 covered why roles beat access keys for services — this is the practice, applied
consistently: every Glue job, Lambda function, EC2 instance, and EMR cluster in a real
pipeline should run under a role, never under embedded or environment-variable access keys.
For human operators, the equivalent is **IAM Identity Center** (federated, temporary access)
rather than long-lived IAM user credentials. The only place long-lived keys are still
sometimes justified is narrow: a local development machine, or a genuinely legacy system
that cannot assume a role — and even then, they should be tightly scoped and rotated on a
schedule.

## IAM Access Analyzer

**IAM Access Analyzer** scans your account's resource-based policies (bucket policies, role
trust policies, and others) and flags anything that grants access to an external entity —
another account, a public principal, or an unexpected zone of trust — that you may not have
intended. It's the practical way to catch the mistake this chapter has been warning about:
a bucket policy accidentally left wide open, or a role trust policy that trusts more than it
should. Running it isn't a one-time setup step; it should be part of ongoing account
hygiene, especially in an account with multiple pipelines and multiple people creating roles
over time.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting exactly the access a role needs, nothing more |
| Scoped resource ARN | Restricting a policy's `Resource` field to specific ARNs, not `*` |
| IAM Identity Center | Federated, temporary access for human operators, replacing long-lived user keys |
| IAM Access Analyzer | Scans resource policies for unintended external access |

## Check yourself

A Glue job role has `"Action": "s3:*", "Resource": "*"` because it was fastest to write
during a demo. What's the concrete risk of leaving that in production, and what would the
scoped version look like for a job that only reads from `raw/` and writes to `curated/`?
