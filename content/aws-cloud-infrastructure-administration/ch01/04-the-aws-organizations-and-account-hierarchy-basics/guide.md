# Lesson 4 — AWS Organizations and Account Hierarchy Basics

**Chapter 1 · AWS Account & IAM Fundamentals · Lesson 4 of 32**

## What you'll learn

- What AWS Organizations is, and why companies run more than one AWS account on purpose
- The difference between a management account and the member accounts it oversees
- What an Organizational Unit (OU) is, and how OUs build a hierarchy out of a flat list of accounts
- What a Service Control Policy (SCP) is, at a conceptual level, and how it differs from an IAM policy

## Why one AWS account usually isn't enough

So far, every lesson in this chapter has lived inside a single AWS account.
In practice, most real organizations run several — one for production
workloads, one for development, one for a security/audit team, maybe one per
business unit. Separate accounts give each workload its own hard boundary:
a mistake or a breach in the development account can't spill over into
production, because they're genuinely different accounts with different
resources and different billing.

**AWS Organizations** is the service that lets you manage all of those
accounts centrally, instead of juggling separate logins and separate
billing relationships for each one.

## Management account and member accounts

Every AWS Organization has exactly one **management account** — the account
that creates the Organization and either invites existing accounts to join
or creates brand-new **member accounts** inside it. The management account
is where consolidated billing lives (one bill covering every member
account, often with better volume pricing) and it's the only account that
can perform certain Organizations-level actions, such as creating new OUs
or attaching Service Control Policies.

Every member account still has its own root user and its own IAM users,
groups, and roles, exactly as covered earlier in this chapter — Organizations
adds a management layer on top of individual accounts, it doesn't replace
anything inside them.

## Organizational Units: building a hierarchy

A flat list of a dozen or a hundred accounts gets unwieldy fast, so AWS
Organizations lets you group accounts into **Organizational Units (OUs)** —
containers that can be nested, forming a tree. A common real pattern is
OUs named `Production`, `Development`, and `Security`, each holding the
accounts that belong to that category, with the whole tree starting from a
single **root** of the Organization (note: this is a different "root" from
the root *user* covered in Lesson 1 — here it just means the top of the OU
tree, the starting container everything else nests under).

## Service Control Policies: guardrails, not grants

A **Service Control Policy (SCP)** is attached to an OU or to an individual
account, and it sets the **maximum available permissions** for every account
under it — including that account's own root user. This is the detail that
makes SCPs different from the IAM policies covered in Lesson 2: an IAM
policy grants permissions to a user or group, while an SCP only restricts
what's possible in the first place. An SCP attached to a `Development` OU
might deny access to certain expensive or production-only services across
every account in that OU, regardless of what any IAM policy inside those
accounts allows — if the SCP doesn't permit it, no IAM policy inside the
account can override that ceiling.

## Example: a company's real account layout

A mid-size company might structure things like this: a management account
holding billing for everything, a `Security` OU with a dedicated account for
audit logging, a `Production` OU with the live customer-facing account, and
a `Development` OU with a sandbox account developers can experiment in
freely. An SCP on `Production` might block the ability to disable logging
services entirely, account-wide, so no mistake or compromised credential
inside that account can turn off the audit trail — a protection no IAM
policy inside the account itself could be trusted to enforce.

## Key terms

| Term | Meaning |
|---|---|
| AWS Organizations | The service for centrally managing multiple AWS accounts and their billing |
| Management account | The one account that creates/owns an Organization and hosts consolidated billing |
| Organizational Unit (OU) | A container that groups accounts (or other OUs) into a hierarchy under the Organization's root |
| Service Control Policy (SCP) | A policy attached to an OU or account that sets the maximum permissions allowed, overriding any IAM policy inside it |

## Check yourself

You're ready for Chapter 2 when you can explain, without looking: why can an
SCP restrict what even an account's own root user is able to do, when
nothing in Lesson 1 suggested root could ever be limited?
