# Lesson 11 — Users, Groups & Roles

**Chapter 3 · IAM Deep Dive for Data Engineers · Lesson 11 of 18**

## What you'll learn

- What an IAM user actually is, and why it carries long-term credentials
- What an IAM group is — and, just as importantly, what it isn't
- What an IAM role is, why it uses temporary credentials, and why data
  engineering leans on roles constantly
- The practical rule for when to reach for each one

## IAM users: a long-term identity for a person or app

An **IAM user** is a persistent identity inside your AWS account —
typically one per human being, occasionally one for a legacy
application that has no other way to authenticate. A user can have:

- A password, for signing in to the AWS Console
- Access keys (an access key ID and secret access key), for signing
  CLI and SDK requests

Both are **long-term credentials**. They don't expire on their own,
which is exactly why they're risky: a leaked access key from a user
is valid until someone notices and manually revokes it. Lesson 6
already covered that users are Lesson 1's answer to "who is this,"
this lesson goes deeper into how users relate to groups and roles.

## IAM groups: a container for users, not an identity

An **IAM group** is just a named collection of users that policies
get attached to once, instead of per-user. A group has no
credentials of its own, can't be logged into, and can't be "assumed"
by anything — it's purely an administrative convenience.

```
Group: data-engineers
  members: alice, bilal, chen
  policy attached once: AmazonS3ReadOnlyAccess

Add a new hire to the team?
  → add them to the group, done.
  Don't attach the policy to each user by hand.
```

A user can belong to multiple groups, and inherits the union of
every attached policy. Groups can't be nested inside other groups.

## IAM roles: temporary credentials, assumed rather than owned

An **IAM role** is also an identity with permissions policies
attached — but a role has **no long-term credentials at all**. No
password, no access keys. Instead, a role is **assumed**: a person,
an application, or an AWS service temporarily takes on the role and
receives short-lived credentials (by default valid for up to an
hour, via AWS STS) that expire automatically.

This is why roles matter so much in data engineering specifically.
Almost nothing in a real pipeline should run as a long-lived IAM
user with a hardcoded access key baked into a script. Instead:

```
Glue job needs to read from S3 and write to Redshift
  → Glue assumes an IAM role
  → role's policy grants exactly that S3 + Redshift access
  → credentials are temporary, scoped to the job's runtime
  → nothing to leak, because nothing long-lived was ever issued
```

A role has two policies attached to it, not one: a **permissions
policy** (what it's allowed to do) and a **trust policy** (who or
what is allowed to assume it). Lesson 12 covers permissions policies
in depth; Lesson 14 covers trust policies and cross-service
assumption patterns.

## Choosing the right one

```
Human who needs console/CLI access day to day   → IAM user, in a group
Managing permissions for a team of five people    → IAM group
A Lambda function, Glue job, or EC2 instance        → IAM role
Granting a partner AWS account temporary access      → IAM role
```

## Key terms

| Term | Meaning |
|---|---|
| IAM user | A persistent identity with long-term credentials (password and/or access keys) |
| IAM group | A named collection of users used to attach policies once for many people |
| IAM role | An identity with no long-term credentials, assumed for temporary, auto-expiring access |
| AWS STS | Security Token Service — issues the short-lived credentials a role's assumer receives |
| Trust policy | The policy on a role that defines who or what is allowed to assume it |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does a Glue job assuming an IAM role produce meaningfully better
security than giving that same Glue job an IAM user's access keys?
