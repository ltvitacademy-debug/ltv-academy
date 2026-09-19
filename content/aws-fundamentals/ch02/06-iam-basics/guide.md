# Lesson 6 — IAM Basics

**Chapter 2 · Core AWS Services Overview · Lesson 6 of 18**

## What you'll learn

- What IAM is, and why it's a global service, not a per-Region one
- The four core IAM entities: users, groups, roles, and policies
- Why roles, not long-lived user credentials, are the preferred way for services to access other services
- The principle of least privilege, and why it's IAM's organizing idea

## IAM: one identity system for the whole account

**IAM (Identity and Access Management)** is AWS's service for
controlling who — and what — can do what, across every other AWS
service in your account. Unlike almost everything else in AWS, IAM
is a **global service**: it isn't scoped to a Region, an IAM user or
role you create is available account-wide, no matter which Region
selector is active in the console.

```
IAM entities:
  User    a person or application with long-term credentials
  Group   a named collection of users, for assigning policies in bulk
  Role    a temporary identity anything can assume — no long-term
          credentials attached
  Policy  a JSON document that actually grants or denies permissions
```

## Users and groups: identities for people

An **IAM user** represents a person (or occasionally an application)
with its own long-term credentials — a password for console access,
and/or access keys for programmatic access. Attaching a policy
directly to individual users doesn't scale past a handful of people,
so IAM also has **groups**: you put users into a group (like
"Data-Engineers" or "Admins") and attach policies to the group once —
every user in it inherits those permissions automatically.

## Roles: identities nothing owns permanently

An **IAM role** is different from a user in one crucial way: nothing
holds its credentials long-term. A role is *assumed* — temporarily,
for a limited session — by a user, an application, or (very commonly
in data engineering) another AWS service. A Lambda function that
needs to read from S3 doesn't get an IAM user's access keys baked
into its code; it gets an **execution role** it assumes automatically
each time it runs, with temporary credentials AWS rotates for you.
This is why roles, not access keys, are the default recommended way
for one AWS service to call another — no long-lived secret sitting in
code or configuration to leak.

```
Bad:   Lambda function code has an IAM user's access keys hardcoded
Good:  Lambda function has an execution role; AWS hands it temporary,
       auto-rotated credentials each time it runs
```

## Policies and least privilege

A **policy** is a JSON document that spells out exactly what's
allowed or denied — which actions (like `s3:GetObject`), on which
resources (like one specific bucket), under what conditions. Policies
attach to users, groups, or roles, and IAM evaluates them together to
decide whether a given request is allowed.

The organizing idea behind all of this is **least privilege**: grant
the minimum permissions actually needed to do a job, nothing more. A
data pipeline's role that only ever reads from one S3 bucket and
writes to one Redshift table should be scoped to exactly that — not
broad `s3:*` access "just in case." Chapter 3 of this course goes
much deeper into writing real IAM policies; this lesson is the
vocabulary you need first.

## Key terms

| Term | Meaning |
|---|---|
| IAM | AWS's global identity and access management service |
| IAM user | A long-term identity, usually for a person, with its own credentials |
| IAM group | A named collection of users used to assign policies in bulk |
| IAM role | A temporary identity assumed by a user, application, or AWS service — no long-term credentials |
| Policy | A JSON document that grants or denies specific permissions |
| Least privilege | Granting only the minimum permissions actually required |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does a Lambda function get an execution role instead of an IAM user's
access keys to read from S3?
