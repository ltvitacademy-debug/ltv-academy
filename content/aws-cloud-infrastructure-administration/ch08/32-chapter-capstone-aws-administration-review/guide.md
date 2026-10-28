# Lesson 32 — Chapter Capstone: AWS Administration Review

**Chapter 8 · Capstone: Deploying and Administering an AWS Environment · Lesson 32 of 32**

## What you'll learn

- How identity and access (Chapter 1) set the boundary every other chapter in this course operates inside
- How compute and storage (Chapters 2-3) and networking (Chapter 4) combined into the shape Lesson 29 built
- Why the CLI (Chapter 5) is the thread running through every lesson in this course, not just its own chapter
- How monitoring, auditing, and cost management (Chapters 6-7) turned a deployed environment into one that's actually administered

## Identity: the boundary, not an afterthought

Before Lesson 29 created a single EC2 instance, Meridian's environment already had a boundary around who could do what to it. Chapter 1's whole argument — stop using the root account, give every person and every workload its own identity, and reach for a role before a long-lived key — showed up directly in Lesson 30, when `meridian-app1` got an IAM role and instance profile instead of an access key baked into its config. The question Chapter 1 trains you to ask isn't just "can this identity do this?" It's "does this identity need a permanent credential at all, or would a role that expires do the same job more safely?"

## Compute and storage: matched to the workload, not maximized

Chapters 2 and 3 gave this course two separate vocabularies — instance types, AMIs, and key pairs on one side; S3 storage classes, bucket policies, and EBS volumes and snapshots on the other — and Lesson 29 used both in the same deployment. `meridian-web1` and `meridian-app1` are `t3.micro`, a deliberately modest, burstable size for a small retailer's order-lookup tool, not the biggest instance available. `meridian-outfitters-app-data` is a plain S3 bucket, no special storage class needed yet. Neither choice is exciting, and that's the point — Chapter 7's right-sizing argument only works if Chapters 2 and 3 already taught you there's a real choice to make, not just a default to accept.

## Networking: the subnet boundary that does real work

Chapter 4's VPCs, subnets, and route tables weren't an abstract diagram — Lesson 29 split one VPC into a public and a private subnet specifically so Lesson 30's security group rules would have something meaningful to attach to, and so Lesson 31's entire incident would have a clear, checkable cause. `meridian-web-sg` allows the internet in on 80 and 443, and SSH only from Meridian's office. `meridian-app-sg` allows in only from `meridian-web-sg` itself, by security group reference, not a CIDR block. That's Chapter 4's subnetting and its security-group reference rules doing one job together: making sure the app tier only ever hears from the one place it's supposed to.

## The CLI: the thread, not a chapter of its own

Chapter 5 taught `aws` as its own subject, but by the time you reached Lesson 29 it had already disappeared into the background of every other chapter — `ec2 create-vpc`, `ec2 run-instances`, `iam create-role`, `cloudwatch put-metric-alarm`, `budgets create-budget`, `ec2 describe-instances`. Every one of those belongs to a different chapter's subject matter, and every one of them is also just an `aws` command with a service, an action, and some flags. That's what Chapter 5 was actually for: not a chapter about the CLI, but the chapter that made every other chapter's commands legible — and that made Lesson 31's four-question diagnostic sequence possible to run in under a minute instead of guessing through the console.

## Monitoring, auditing, and cost: the difference between deployed and operated

An environment that's been built but isn't watched is only half finished, and Chapter 6 and Chapter 7 are what closed that gap. The CloudWatch alarm from Lesson 30 means a CPU problem gets caught by an SNS notification instead of a customer complaint. CloudTrail, running quietly in the background the whole time, is what would have shown exactly who launched `meridian-web2` into the wrong subnet in Lesson 31, and from which credentials. The AWS Budget is what actually would have caught a cost problem on day 19 of the month instead of on an invoice thirty days later. That's the difference between an environment you deployed once and one you're actually administering.

## Key terms

| Term | Meaning |
|---|---|
| Least privilege | Granting an identity only the access it needs, for only as long as it needs it |
| Right-sizing | Matching an instance type or storage tier to the actual workload instead of defaulting to the largest option |
| Tier boundary | The security line between application tiers, enforced here by both subnet placement and security group rules |
| Operated vs. deployed | An environment with monitoring, auditing, and cost alerts in place, versus one that was simply stood up and left alone |

## Check yourself

Walk through this chapter's four lessons in order — deploy, secure and monitor, troubleshoot, review — and name one decision from Lesson 29 that only paid off because of something built in a later lesson. What was the decision, and which later lesson made it matter?

## Course complete

That's the full course. You've gone from retiring the root account to deploying, securing,
monitoring, troubleshooting, and cost-managing a real multi-tier AWS environment end to end.
Next up in this path: **Cloud Networking, Identity & Security**.
