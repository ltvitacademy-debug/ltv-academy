# Lesson 9 — AWS IAM Fundamentals for Governance

**Chapter 2 · Identity and Access · Lesson 9 of 25**

## What you'll learn

- How AWS IAM's users, groups, roles, and policies fit together as one unified system
- How to read a real IAM policy document: Effect, Action, Resource, and Condition
- The difference between an identity-based policy and a resource-based policy
- Why IAM roles — not long-lived access keys — are the governance-correct way to grant access

## One service, every IAM concept

Recall from Lesson 6: Azure splits identity into Entra ID and Azure RBAC, but AWS IAM handles authentication and authorization together in one service. Four object types do all the work:

- **Users** — a persistent identity for a person (or, historically, an application — now discouraged in favor of roles, covered below).
- **Groups** — a collection of users that share the same permissions, attached once at the group level.
- **Roles** — an identity that can be **assumed** temporarily by a user, an application, or an AWS service, rather than being signed into directly.
- **Policies** — JSON documents that define exactly what a user, group, or role is allowed (or explicitly denied) to do.

## Reading a real IAM policy

Every IAM policy, regardless of what it's attached to, follows the same JSON structure. This is a real, correctly-formed policy that grants read-only access to objects in a single S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::governed-data-bucket",
        "arn:aws:s3:::governed-data-bucket/*"
      ],
      "Condition": {
        "Bool": { "aws:SecureTransport": "true" }
      }
    }
  ]
}
```

Four fields do the real work: **Effect** (`Allow` or `Deny`), **Action** (which API calls this statement covers — here, reading an object and listing bucket contents, nothing else), **Resource** (which AWS resources this applies to, identified by ARN — Amazon Resource Name), and **Condition** (an optional extra restriction — here, the request must use HTTPS). A policy this narrow is the entire point of least privilege: this identity cannot delete, write, or modify anything, in this bucket or any other, under any circumstances this policy allows.

## Identity-based vs. resource-based policies

Most policies, including the one above, are **identity-based** — attached to a user, group, or role, defining what that identity can do. AWS also supports **resource-based policies**, attached directly to a resource (most commonly an S3 bucket policy or a KMS key policy) that define who's allowed to access *that specific resource*, regardless of which identity is asking. The two can — and often should — work together: a resource-based bucket policy can set an outer boundary ("only these accounts may ever touch this bucket") while identity-based policies control exactly what each identity inside that boundary can do.

## Roles over long-lived credentials

An IAM **role** is not signed into directly — it's **assumed**, producing temporary security credentials that expire (commonly after an hour) rather than a permanent access key that works until someone remembers to rotate or revoke it. This matters enormously for governance: a long-lived IAM user access key that leaks (committed to a public repository, for instance) is a standing risk until someone notices and revokes it. A role's temporary credentials expire on their own, bounding the damage window automatically. AWS's own current best-practice guidance is explicit on this point: prefer roles — assumed via AWS STS (Security Token Service), typically through the `AssumeRole` API — over creating IAM users with long-lived access keys, for both human access (federated through IAM Identity Center) and service-to-service access (an EC2 instance or Lambda function assuming a role rather than embedding a key).

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": { "sts:ExternalId": "governance-audit-2026" }
      }
    }
  ]
}
```

This is a **trust policy** — the piece attached to a role itself, defining *who's allowed to assume it* (here, a specific external AWS account, only when it supplies the right external ID). It's a different document from the permissions policy that defines what the role can do once assumed; a role always has both.

## Key terms

| Term | Meaning |
|---|---|
| IAM policy | A JSON document defining Effect, Action, Resource, and optional Condition for what's allowed or denied |
| Identity-based policy | A policy attached to a user, group, or role |
| Resource-based policy | A policy attached directly to a resource (e.g., an S3 bucket policy), defining who may access it |
| IAM role / trust policy | An identity assumed temporarily rather than signed into directly; its trust policy defines who's allowed to assume it |

## Lab

Take the S3 read-only policy above and modify it in writing (no need to deploy it) so it also denies access unless the request comes from a specific IP range. You'll need an additional `Condition` key — look up `aws:SourceIp` if you're unsure of the exact syntax, and write out the JSON block you'd add.

## Check yourself

Can you explain, without looking back, the four fields that make up an IAM policy statement, and why an IAM role's temporary credentials are considered more governance-friendly than a long-lived IAM user access key?
