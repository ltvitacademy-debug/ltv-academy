# Lesson 2 — IAM Users, Groups, and Policies

**Chapter 1 · AWS Account & IAM Fundamentals · Lesson 2 of 32**

## What you'll learn

- What an IAM user is, and how it's a single, named identity that's nothing like root
- Why IAM groups exist, and how attaching a policy to a group saves you from repeating yourself
- The real anatomy of an IAM policy document: `Effect`, `Action`, `Resource`, and how Allow/Deny combine
- How to read an actual IAM policy JSON snippet line by line

## IAM users: one identity per person (or app)

An **IAM user** is an individual identity inside an AWS account — a named
entity you create for one person, or sometimes for one application, that can
be given its own console password, its own programmatic access keys, or
both. Unlike root, a brand-new IAM user starts with **zero permissions**.
It can't do anything until you explicitly grant it access, which is the
opposite default of root and exactly the point: every identity below root is
meant to start locked down.

## Groups: permissions for a role, not a person

Giving every new hire's IAM user its own copy of the same permissions gets
tedious fast, and worse, it drifts — one person's copy gets updated, three
others don't. **IAM groups** solve this: a group is a named collection of
IAM users, and you attach permission policies to the *group* once. Every
user you put in that group inherits everything attached to it. A `Developers`
group might get read/write access to a specific set of resources; a
`Billing-Readers` group might get read-only access to cost data. Add a new
hire to the right group and they're fully provisioned in one step; remove
them from it and that access is gone just as fast.

## Policies: the actual permission document

Both users and groups get their permissions from **IAM policies** — JSON
documents that spell out exactly what's allowed or denied. Every policy is
built from statements, and every statement has at minimum three parts:

- **`Effect`** — either `"Allow"` or `"Deny"`
- **`Action`** — which API operations the statement covers (e.g.,
  `s3:GetObject`, `s3:PutObject`)
- **`Resource`** — which specific AWS resource(s) the statement applies to,
  usually written as an ARN (Amazon Resource Name)

By default, an IAM identity with no policies attached can do nothing — access
is implicitly denied. A policy's job is to explicitly `Allow` specific
actions on specific resources. `Deny` statements exist too, and when a
`Deny` and an `Allow` both apply to the same request, **`Deny` always wins**,
no matter which policy it came from.

## Example: a real least-privilege policy

Here's a policy that allows reading objects from exactly one S3 bucket —
nothing else:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ltv-reports-bucket/*"
    }
  ]
}
```

Attach that to a `Reporting-Readonly` group, put the right users in it, and
every member of that group can download files from `ltv-reports-bucket` and
nothing more — they can't delete objects, can't touch any other bucket, and
can't do anything outside S3. That's the principle of **least privilege** in
practice: grant exactly the access the job requires, not a convenient
superset of it.

## Key terms

| Term | Meaning |
|---|---|
| IAM user | A named individual identity in an account, starting with zero permissions by default |
| IAM group | A named collection of IAM users that share permissions attached to the group itself |
| IAM policy | A JSON document of `Allow`/`Deny` statements defining exactly what actions are permitted on which resources |
| Least privilege | Granting an identity only the access its job actually requires |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: if a user
belongs to a group with an `Allow` statement for an action, but another
policy attached to the same user has a `Deny` for that same action, which one
wins — and why does that rule exist?
