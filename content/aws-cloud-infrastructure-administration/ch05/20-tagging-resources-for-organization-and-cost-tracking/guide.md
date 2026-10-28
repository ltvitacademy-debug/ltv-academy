# Lesson 20 — Tagging Resources for Organization and Cost Tracking

**Chapter 5 · AWS CLI & Automation Basics · Lesson 20 of 32**

## What you'll learn

- What a tag actually is, and why it matters once an account has more than a handful of resources
- Tagging an existing resource with `aws ec2 create-tags`, and tagging at launch time instead
- Filtering resources by tag in CLI commands you already know
- How to turn a tag into an actual line item on the AWS bill with Cost Allocation Tags

## What a tag is

A **tag** is a simple key-value pair attached to an AWS resource — `Environment: Production`,
`Team: Platform`, `CostCenter: 4410`. Tags don't change how a resource behaves; they're pure
metadata, used to organize resources and, as this lesson covers, to track what each one costs.
This is the same concept already covered for Azure resources — the mechanics here are AWS's own,
but the reason to tag anything is identical: a flat list of forty EC2 instances with no labels is
unmanageable the moment you need to answer "which of these are production?" or "which team is
responsible for this bill?"

## Tagging an existing resource

```
aws ec2 create-tags \
  --resources i-0abcd1234efgh5678 \
  --tags Key=Environment,Value=Production Key=Team,Value=Platform
```

`create-tags` takes one or more resource IDs and one or more `Key=...,Value=...` pairs, and
applies all of them at once. You can pass multiple resource IDs in a single call, which is how a
script tags a whole batch of instances in one pass instead of one `aws ec2 create-tags` call per
resource.

## Tagging at launch time

Tagging after the fact works, but it's easy to forget. `aws ec2 run-instances` accepts tags as part
of the same command that creates the instance, so nothing is ever untagged even briefly:

```
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.micro \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Environment,Value=Production}]'
```

## Filtering by tag

Once resources are tagged, the same `describe-*` commands from Lesson 18 can filter on them:

```
aws ec2 describe-instances \
  --filters "Name=tag:Environment,Value=Production" \
  --query "Reservations[].Instances[].InstanceId"
```

`--filters "Name=tag:Environment,Value=Production"` tells `describe-instances` to return only
instances carrying that exact tag, before `--query` ever reshapes the result — which is exactly how
you'd answer "list every production instance" without reading through the whole account by eye.

## Turning tags into cost data

A tag only shows up as its own line in **Cost Explorer** or a Cost and Usage Report once it's been
**activated** as a **Cost Allocation Tag** — a separate, manual step in the AWS Billing console,
under Cost Allocation Tags. AWS distinguishes two kinds: **AWS-generated tags** (prefixed `aws:`,
created automatically, like the tag CloudFormation adds to resources it creates) and **user-defined
tags** (the ones you create yourself, like `Environment` or `CostCenter`) — only user-defined tags
need to be manually activated. After activation, it can take up to 24 hours for tagged costs to
start appearing broken out by that tag, so a `CostCenter` tag applied today won't show up split out
on the bill until the next day at the earliest.

## Key terms

| Term | Meaning |
|---|---|
| Tag | A key-value metadata pair attached to an AWS resource |
| `aws ec2 create-tags` | Applies one or more tags to one or more existing resource IDs |
| `--tag-specifications` | Applies tags at creation time, e.g. inside `aws ec2 run-instances` |
| Cost Allocation Tag | A tag activated in AWS Billing so it appears as its own line in Cost Explorer |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: what extra step does a
user-defined tag need, beyond just being applied to a resource, before it shows up broken out in
Cost Explorer?
