# Lesson 6 — Adding AWS as a Backup Target

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 6 of 16**

## What you'll learn

- Why Driftwood needs an AWS account at all, scoped strictly to backup/DR, not a migration
- The real S3 bucket Theo creates for nightly backups of the storefront app's database
- The IAM role that will let the replication job write to it
- The one hardening step Theo means to come back to, and how it quietly falls off the list

## A new AWS account, scoped to one job

Casey's scope from Lesson 1 is explicit: AWS exists only to hold a copy of the app's data.
Driftwood opens a new AWS account dedicated to that single purpose — nothing about the running
app moves here, so there's no reason for this account to hold anything beyond what backup/DR
actually requires.

## Creating the S3 bucket

The storefront app's data of record is an Azure SQL Database. Theo creates an S3 bucket in
`us-east-1` to hold its nightly backups:

```hcl
resource "aws_s3_bucket" "backups" {
  bucket = "driftwood-app-backups"
}

resource "aws_s3_bucket_versioning" "backups" {
  bucket = aws_s3_bucket.backups.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "backups" {
  bucket = aws_s3_bucket.backups.id

  rule {
    id     = "age-out-old-backups"
    status = "Enabled"
    transition {
      days          = 30
      storage_class = "GLACIER"
    }
    expiration {
      days = 365
    }
  }
}
```

Versioning protects against a bad overwrite — a corrupted backup file never silently destroys the
prior one. The lifecycle rule ages backups into Glacier after 30 days and expires them after a
year, so a year of nightly backups doesn't quietly become a permanent, growing cost.

## An IAM role for the replication job

Lesson 7's replication job needs a specific, narrow identity that can write to this bucket — not
a broad AWS user with standing credentials:

```hcl
resource "aws_iam_role" "replication" {
  name = "driftwood-replication-role"
  assume_role_policy = data.aws_iam_policy_document.replication_trust.json
}

resource "aws_iam_role_policy" "replication_write" {
  name = "driftwood-replication-write"
  role = aws_iam_role.replication.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:PutObject", "s3:ListBucket"]
      Resource = [
        aws_s3_bucket.backups.arn,
        "${aws_s3_bucket.backups.arn}/*"
      ]
    }]
  })
}
```

That **IAM policy** says what the replication role is allowed to do. It's a separate concern from
a **bucket policy**, which would say who — beyond this one role — is allowed to reach the bucket
at all.

## The hardening step that was always the plan

Theo's actual intention is to finish this bucket with two more steps before go-live: a **bucket
policy** that explicitly denies any principal other than the replication role, and AWS's **S3
Block Public Access** setting turned on explicitly at the bucket level, as a second, independent
layer in case the policy is ever misconfigured later. Both are standard hardening for exactly
this kind of bucket.

But between finishing the IAM role here, wiring up the replication job in Lesson 7, and the AKS
and pipeline work from Lessons 4 and 5 still settling, that explicit policy step gets pushed to
"right before launch" — and once launch becomes about the app rather than the bucket, it quietly
never gets picked back up. The bucket isn't exploited, and nothing about it looks obviously wrong
in the AWS console today. It's simply left on a broader-than-intended default access
configuration, because the deliberate, restricting policy that was supposed to lock it down to
just the replication role never actually got attached.

## Key terms

| Term | Meaning |
|---|---|
| Bucket policy | A resource-based JSON policy attached directly to the bucket, controlling who can reach it |
| IAM policy | An identity-based policy attached to a role or user, controlling what that principal can do |
| S3 Block Public Access | A bucket- or account-level setting that overrides any policy/ACL that would otherwise allow public access |
| Versioning | Keeps every version of an object so a bad overwrite or delete is recoverable |

## Lab

Write the `aws_s3_bucket` and `aws_s3_bucket_versioning` Terraform blocks yourself for a bucket
named `lab-backups-demo`, then write one IAM policy statement that allows only `s3:PutObject` to
that bucket for a role named `lab-writer-role`.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what's the difference between the
IAM policy attached to the replication role and a bucket policy that would restrict who else can
reach this bucket — and which one does this lesson's bucket still not have?
