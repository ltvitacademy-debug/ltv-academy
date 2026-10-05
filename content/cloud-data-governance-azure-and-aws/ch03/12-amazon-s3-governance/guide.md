# Lesson 12 — Amazon S3 Governance

**Chapter 3 · Storage and Catalogs · Lesson 12 of 25**

## What you'll learn

- The three layers S3 uses to control access: Object Ownership, bucket policies, and Block Public Access
- Why AWS now recommends disabling ACLs entirely in favor of IAM and bucket policies
- How Block Public Access settings at the bucket and account level interact — and which one wins
- How to read a real S3 bucket policy JSON document

## Three layers, one bucket

Where Lesson 11 showed ADLS Gen2 layering Azure RBAC under POSIX ACLs, Amazon S3 governance is built from three different layers that each answer a different question:

- **Object Ownership** — who owns objects written to the bucket, and whether legacy ACLs are even in play
- **Bucket policies** (and IAM policies) — the actual access rules: which principals can do what, under which conditions
- **Block Public Access** — a blunt, override-everything safety switch that can forcibly block public access regardless of what a policy or ACL says

## Object Ownership: AWS's own ACL retirement

S3 originally controlled access partly through per-object **access control lists (ACLs)** — a legacy system separate from, and older than, IAM policies. AWS's current guidance has moved decisively away from them:

![Console screenshot showing S3 bucket object ownership settings with ACLs disabled by default.](/courses/cloud-data-governance-azure-and-aws/ch03/12-amazon-s3-governance/object-ownership.jpg)
*Object Ownership — "ACLs disabled" is the recommended, now-default setting for every new bucket.*

With **ACLs disabled (Bucket owner enforced)**, every object in the bucket is owned by the bucket's AWS account, full stop, and access is controlled *only* by policies — bucket policies and IAM identity policies — never by legacy per-object ACLs. This is the opposite instinct from ADLS Gen2 in Lesson 11, where fine-grained per-object ACLs are the whole point; S3's modern guidance is to centralize access logic in policies instead, and treat ACLs as a deprecated path kept only for backward compatibility.

## Bucket policies: real, resource-attached JSON

A **bucket policy** is a resource-based IAM policy attached directly to the bucket, written as JSON, granting (or denying) specific AWS accounts or IAM principals specific S3 actions on that bucket and its objects. A realistic bucket policy restricting access to one IAM role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowReportingRoleReadOnly",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111122223333:role/ReportingRole"
      },
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::analytics-prod-bucket",
        "arn:aws:s3:::analytics-prod-bucket/*"
      ]
    },
    {
      "Sid": "DenyInsecureTransport",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::analytics-prod-bucket",
        "arn:aws:s3:::analytics-prod-bucket/*"
      ],
      "Condition": { "Bool": { "aws:SecureTransport": "false" } }
    }
  ]
}
```

The first statement grants one specific IAM role read-only access. The second is a pattern worth memorizing: an explicit **Deny** on any request that isn't over TLS (`aws:SecureTransport: false`), applied to `Principal: "*"` — meaning it overrides any Allow anywhere else, for anyone, including the bucket owner. This is edited through the console's **Permissions → Bucket policy → Edit** screen, or via the AWS CLI / IaC.

## Block Public Access: the override switch

**Block Public Access (BPA)** is deliberately blunt: four independent settings that, when on, override any ACL or bucket policy that would otherwise grant public access — they don't change the policy itself, they just refuse to honor the public parts of it. BPA exists at two scopes, and they interact:

![S3 console displaying bucket-level Block Public Access configuration options.](/courses/cloud-data-governance-azure-and-aws/ch03/12-amazon-s3-governance/block-public-access-bucket.jpg)
*Block Public Access settings for one bucket — note the blue banner: the account-level settings are already on and take precedence.*

![S3 console showing account-level Block Public Access configuration interface.](/courses/cloud-data-governance-azure-and-aws/ch03/12-amazon-s3-governance/block-public-access-account.jpg)
*The account-level equivalent — applies to every current and future bucket and access point in the account.*

The rule that matters operationally: **S3 always applies the most restrictive combination of bucket-level and account-level settings.** If the account has Block Public Access fully on, a single bucket cannot opt back out of it by turning its own bucket-level BPA off — the account setting still wins. AWS's own recommendation, stated directly on that bucket-level screen, is to turn on all four settings for every bucket unless a specific, verified use case (like static website hosting) requires otherwise.

## Key terms

| Term | Meaning |
|---|---|
| Object Ownership | The setting controlling whether legacy ACLs apply at all; "Bucket owner enforced" disables them |
| Bucket policy | A resource-based JSON IAM policy attached directly to an S3 bucket |
| Block Public Access (BPA) | Four override settings that refuse to honor any public grant from an ACL or policy, regardless of what that policy says |
| Explicit Deny | A policy statement that overrides any Allow anywhere else for the same request |

## Lab

Write a bucket policy statement (JSON) that grants `s3:GetObject` to a specific IAM role on a bucket named `training-lab-bucket`, and add a second statement that explicitly denies any request not made over TLS. Then, in a test account, compare what happens when you try to disable bucket-level Block Public Access while the account-level BPA is still fully on.

## Check yourself

- If an account has Block Public Access fully enabled, can an individual bucket in that account still be made public by disabling its own bucket-level BPA settings?
- Why does AWS now recommend disabling ACLs ("Bucket owner enforced") on every new bucket?
- In the example bucket policy above, what does the second statement's `Condition` block actually check, and why apply it to `Principal: "*"` including the bucket owner?
