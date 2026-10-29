# Lesson 7 — AWS Control Tower and Multi-Account Organization Design

**Chapter 2 · Landing Zones and Multi-Account Design · Lesson 3 of 4**

## What you'll learn

- How **AWS Organizations** structures multiple accounts into a tree
  of **Organizational Units (OUs)**, and how that compares to Azure's
  management group hierarchy from Lesson 6
- What **AWS Control Tower** actually sets up the first time it's
  enabled, and which accounts it creates automatically
- The difference between **preventive guardrails** (Service Control
  Policies) and **detective guardrails** (AWS Config rules), and why
  Control Tower uses both
- How **Account Factory** automates new-account provisioning — AWS's
  equivalent of the subscription vending you just learned on Azure

## AWS Organizations: the account tree

Where Azure groups **subscriptions** under management groups, AWS
groups **accounts** under Organizational Units inside **AWS
Organizations**. The shape is structurally the same idea: a root at
the top, OUs nested beneath it, accounts placed inside OUs, and
policies attached at an OU level inherited by every account under it.
An AWS account is a much harder isolation boundary than an Azure
subscription in one practical sense — most resources, IAM roles, and
service limits are fully contained within a single account, which is
exactly why multi-account design matters as much on AWS as management
group design does on Azure.

## What Control Tower actually sets up

**AWS Control Tower** is the AWS service that stands up a landing
zone across an AWS Organization in one guided setup, rather than
assembling Organizations, OUs, and policies by hand. The first time
it's enabled, Control Tower creates:

- A **Management account** — the root of the organization, used for
  billing and Control Tower administration, never for workloads
- A **Log Archive account** — a dedicated account that receives
  CloudTrail logs and AWS Config data from every account in the
  organization, so logs live somewhere a compromised workload account
  can't delete them
- An **Audit account** — a dedicated account with read access across
  the organization for security tooling, kept separate from both the
  Management and Log Archive accounts

```
Root
├── Security OU
│   ├── Log Archive account
│   └── Audit account
├── Sandbox OU
│   └── (isolated experimentation accounts)
└── Workloads OU
    ├── Production OU
    └── Non-Production OU
```

That Security OU split — logs and audit tooling in their own
dedicated accounts, isolated from every workload account — mirrors
exactly what the Platform management group did for Azure in Lesson 6.
Different vendor, same underlying architectural decision: shared,
sensitive infrastructure doesn't live inside the same account or
subscription as application workloads.

## Guardrails: preventive and detective

Control Tower enforces its structure through two kinds of
**guardrails**, which map onto two different enforcement mechanisms:

- **Preventive guardrails** are implemented as **Service Control
  Policies (SCPs)** — deny-based policies attached at the OU level
  that block an API call outright, regardless of what IAM permissions
  an individual user or role has been granted. An SCP that denies
  `s3:PutBucketPublicAccessBlock` modifications on the Production OU
  means no IAM policy inside any account in that OU can override it —
  SCPs sit above IAM, not alongside it.
- **Detective guardrails** are implemented as **AWS Config rules**
  that continuously evaluate existing resources against a policy and
  flag — but don't block — a resource that drifts out of compliance
  after creation.

The combination matters: preventive guardrails stop a whole category
of mistake from happening at all, while detective guardrails catch the
things a preventive rule can't practically express, or things that
drifted out of compliance after a resource already existed compliant.

## Account Factory: AWS's subscription vending

**Account Factory** is Control Tower's answer to the subscription
vending process from Lesson 6: a standardized, repeatable way to
provision a new AWS account that's already placed in the correct OU,
already has the organization's baseline guardrails applied, and
already has its own CloudTrail logging wired to the Log Archive
account — without anyone manually recreating that setup. For teams
that want the same outcome driven through Terraform rather than
Control Tower's own console workflow, AWS publishes **Account Factory
for Terraform (AFT)**, which takes account requests as Terraform
configuration and provisions accounts through the same underlying
pipeline — the direct AWS equivalent of the Terraform-based
subscription vending module from Lesson 6, and built on the same
Course 8 skill set.

## Key terms

| Term | Meaning |
|---|---|
| Organizational Unit (OU) | A container that groups AWS accounts and lets policy be attached once and inherited by every account inside it |
| Control Tower | The AWS service that sets up a governed multi-account landing zone — Management, Log Archive, and Audit accounts plus baseline OUs — in one guided process |
| Service Control Policy (SCP) | A preventive, deny-based guardrail attached at the OU level that blocks an API call regardless of a user's own IAM permissions |
| Account Factory / AFT | Control Tower's automated account-provisioning process; AFT is its Terraform-driven equivalent |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
does an SCP attached at the OU level override an IAM policy that would
otherwise allow an action, and what does that tell you about where
SCPs sit relative to IAM in the permission evaluation order?
