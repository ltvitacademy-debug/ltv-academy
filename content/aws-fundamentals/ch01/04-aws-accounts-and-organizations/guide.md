# Lesson 4 — AWS Accounts & Organizations, Basics

**Chapter 1 · Cloud & AWS Concepts · Lesson 4 of 18**

## What you'll learn

- What an AWS account actually is, and why the root user is dangerous to use day-to-day
- Why real companies run many AWS accounts instead of one
- What AWS Organizations, OUs, and consolidated billing do
- What a Service Control Policy (SCP) is, at a glance

## An AWS account is the real security boundary

An **AWS account** is the fundamental container in AWS — it holds
your resources, your billing, and (by default) every identity that
can act inside it. Every account is created with one all-powerful
**root user**, tied to the email address used to sign up, that can do
literally anything in the account, including closing it. AWS's own
guidance is blunt: don't use the root user for everyday work — lock
it away behind MFA, and create individual **IAM users** (or better,
roles) for actual day-to-day access. Lesson 6 covers IAM itself in
depth; this lesson is about the account as a container and how
companies manage many of them.

```
AWS Account
  ├─ Root user          all-powerful, use only for account setup/closure
  ├─ IAM users/roles     everyday identities, scoped by policy
  └─ Resources & billing  everything you create, and what it costs
```

## Why one account is rarely enough

A single AWS account works fine for learning or a small side project,
but real organizations almost always end up with several — one per
environment (dev, staging, production), one per team, or one per
business unit. Separate accounts give you a hard security and
billing boundary: a mistake or breach in the "dev" account can't
reach into "production" resources, because they're not just
logically separated, they're entirely different accounts with their
own root user and their own IAM.

## AWS Organizations: managing many accounts as one

**AWS Organizations** lets you group multiple AWS accounts under a
single management (payer) account. Inside an Organization, accounts
are arranged into **Organizational Units (OUs)** — folders you can
nest and apply policy to as a group, instead of one account at a
time.

```
Organization (management account)
  ├─ OU: Production
  │    ├─ Account: prod-data-pipeline
  │    └─ Account: prod-web-app
  └─ OU: Development
       ├─ Account: dev-data-pipeline
       └─ Account: dev-web-app
```

Two things Organizations gives you directly:

- **Consolidated billing** — one invoice across every member account,
  and volume pricing discounts calculated across the whole
  Organization's combined usage rather than per account.
- **Service Control Policies (SCPs)** — guardrails applied at the OU
  or account level that set the *maximum* permissions any identity in
  that account can ever have, no matter what its own IAM policies
  say. An SCP might block every account in the "Development" OU from
  ever launching an expensive instance type, for example.

## Key terms

| Term | Meaning |
|---|---|
| AWS account | The fundamental container for resources, billing, and identities in AWS |
| Root user | The all-powerful identity created with every account; reserved for setup, not daily use |
| AWS Organizations | A service for managing multiple AWS accounts under one management account |
| Organizational Unit (OU) | A folder-like grouping of accounts inside an Organization, used to apply policy in bulk |
| Service Control Policy (SCP) | A guardrail policy that caps the maximum permissions available inside an account or OU |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
would a company split "dev" and "production" into two separate AWS
accounts instead of one account with two sets of IAM permissions?
