# Lesson 3 — IAM Roles and Why They Beat Long-Lived Keys

**Chapter 1 · AWS Account & IAM Fundamentals · Lesson 3 of 32**

## What you'll learn

- What an IAM role actually is, and how it's different from an IAM user
- How temporary security credentials get issued when a role is assumed, through AWS STS
- The real, common use case: an EC2 instance assuming a role to reach S3 with no embedded credentials
- Why this beats storing a user's long-lived access keys in code or configuration

## A role is an identity nobody owns permanently

An **IAM role** looks like an IAM user in one way — it has permission
policies attached to it — but it has no password and no permanent access
keys of its own. Instead, a role is **assumed**: a trusted entity (an IAM
user, an application, or an AWS service like EC2 or Lambda) temporarily
takes on the role's permissions, uses them for a limited time, and then the
credentials expire automatically.

Every role has a **trust policy** attached to it — a document that says
exactly who or what is allowed to assume that role. An EC2 instance can't
assume a role unless the role's trust policy explicitly says EC2 instances
are allowed to.

## Temporary credentials, issued by STS

When something assumes a role, AWS's **Security Token Service (STS)** issues
a short-lived set of credentials: a temporary access key ID, a temporary
secret access key, and a session token, all valid for a limited window
(commonly anywhere from 15 minutes up to several hours, depending on how the
role is configured). Those credentials get used for API calls during that
window and then stop working on their own — no manual cleanup, no key
rotation schedule to remember.

That's the core difference from an IAM user's **long-lived access keys**: a
user's access key ID and secret access key, once created, work until someone
manually deactivates or deletes them. If one of those ends up in a public
GitHub repo or a leaked laptop, it keeps working for whoever has it — exactly
the kind of leak that regularly shows up in real breach reports.

## Example: an EC2 instance reading from S3

Here's the use case that makes roles click for most AWS administrators.
Say an application running on an EC2 instance needs to read files from an
S3 bucket. The tempting shortcut is to create an IAM user, generate an
access key for it, and paste that key into the application's configuration
file on the instance. That key now lives on disk, in a startup script, maybe
even in a logging output — a long-lived secret sitting somewhere it can leak
from.

The real-practice alternative: create an IAM role with a policy granting
`s3:GetObject` on the bucket, give the role a trust policy that allows the
EC2 service to assume it, and attach that role to the instance (as an
**instance profile**). The application running on the instance can now call
S3 using temporary credentials that AWS manages automatically behind the
scenes — no access key was ever generated, stored, or capable of leaking,
because there was never a long-lived key to begin with.

## Why this beats hardcoded keys, every time

Roles eliminate an entire category of risk: there's no static secret sitting
in a config file, no key to rotate on a schedule, and no key to accidentally
commit to a repository. If a role's permissions need to change, you edit the
role's policy once and every instance using it is instantly updated. If an
instance using a role is terminated, its temporary credentials simply become
irrelevant — there's nothing left to revoke. This is why AWS guidance
consistently recommends roles over IAM user access keys for anything running
on AWS infrastructure.

## Key terms

| Term | Meaning |
|---|---|
| IAM role | An identity with permission policies that is assumed temporarily, rather than owned by one user permanently |
| Trust policy | The document on a role that defines exactly who or what is allowed to assume it |
| AWS STS (Security Token Service) | The AWS service that issues temporary credentials when a role is assumed |
| Instance profile | The mechanism that attaches an IAM role to an EC2 instance |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why does an
EC2 instance assuming a role to reach S3 carry less risk than an application
on that instance using a hardcoded IAM user access key?
