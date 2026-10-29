# Lesson 17 — Policy as Code Across an Entire Organization

**Chapter 5 · Governance at Scale · Lesson 17 of 32**

## What you'll learn

- Why a landing zone (Chapter 2) is incomplete until policy enforcement is
  attached to it, not bolted on afterward
- How Azure Policy initiatives attach to management groups so rules apply
  to every subscription underneath, present and future
- How AWS Organizations Service Control Policies and AWS Config rules do
  the equivalent job on the AWS side
- Why the real architecture decision is shipping that policy through the
  same Terraform pipeline (Chapter course 8) that ships everything else,
  instead of clicking it into the portal by hand

## Policy enforcement is a landing zone decision, not an afterthought

Back in Chapter 2 you designed a landing zone around management groups or
an AWS Organization — a hierarchy that exists specifically so you can
attach things once, at the top, and have them apply everywhere beneath.
Policy is the first thing that hierarchy is actually for. If you design
the account structure correctly but then go configure encryption
requirements, allowed regions, and tagging rules one subscription at a
time, you've thrown away the entire point of the landing zone. Policy as
code means the rules themselves are checked into version control,
reviewed like any other change, and rolled out by the same pipeline —
not clicked into a portal by whoever happens to be on call.

## Azure Policy: initiatives attached to management groups

An individual Azure Policy definition is one rule — "require a specific
tag," "restrict allowed VM SKUs," "deny public IP addresses on a
storage account." On their own, a handful of individual policies are
hard to manage at scale, so Azure groups related policies into an
**initiative** (also called a policy set): a bundle like "CIS Azure
baseline" or an org's own "Platform baseline" initiative covering tagging,
allowed regions, and encryption-at-rest together as one unit.

The part that makes this an organization-wide control, not a
per-subscription one, is where you assign it. A policy or initiative
assignment at a **management group** scope inherits down to every
subscription nested under that management group — including subscriptions
that don't exist yet when the assignment is created. A new team vends a
subscription next quarter through the subscription-vending process from
Chapter 2, and it lands under the right management group already subject
to the baseline initiative, with no one having to remember to reattach
anything.

Assignment effects matter here. `Deny` blocks a non-compliant resource at
creation time. `Audit` lets it get created but flags it as non-compliant
in reporting. `DeployIfNotExists` can actively remediate — for example,
attaching a required diagnostic setting to a resource that was created
without one. Choosing `Deny` everywhere sounds safest, but it also means
every edge case a team runs into becomes a support ticket instead of a
compliance report line item; real baselines usually mix `Deny` for the
rules that must never be violated (public storage, disallowed regions)
with `Audit` for rules that need visibility first before anyone is
comfortable blocking on them.

## AWS: Service Control Policies and Config rules do different jobs

AWS splits the same problem into two separate mechanisms, and mixing up
what each one does is a common mistake. A **Service Control Policy (SCP)**
attaches to an Organizational Unit in AWS Organizations and sets a hard
ceiling on what any identity in every account under that OU is allowed to
do at the IAM level — even the account's own root user can't exceed an
SCP. An SCP that denies `ec2:RunInstances` outside two approved regions
makes it structurally impossible to launch a VM elsewhere, independent of
whatever IAM policies exist inside the account.

**AWS Config rules** are a different layer entirely: they don't prevent an
action, they continuously evaluate resources that already exist against a
rule and report compliance — the AWS equivalent of Azure Policy's `Audit`
effect. Config rules can trigger automated remediation through associated
Systems Manager automation documents, but the default behavior is
detection, not prevention. The real distinction to hold onto: SCPs are a
preventive control enforced at the identity/API layer across an entire
OU; Config rules are a detective control evaluated against resource state
after the fact. A mature AWS landing zone uses both — SCPs to make the
worst mistakes impossible, Config rules to catch everything else that
SCPs weren't written tightly enough to block.

## Shipping policy through the same Terraform pipeline as everything else

The architectural point underneath all of this: policy definitions,
initiative assignments, and SCPs are infrastructure, so they belong in the
same Terraform configuration and CI/CD pipeline you built in course 8 —
not a separate manual process layered on top of it. A `azurerm_policy_set_definition`
and `azurerm_management_group_policy_assignment` resource, or an AWS
`aws_organizations_policy` plus `aws_organizations_policy_attachment`, go
through the same plan/apply review your network and compute resources go
through. That gets you the thing portal-managed policy never gives you:
a pull request diff showing exactly what governance rule changed, who
approved it, and when — which is itself evidence an auditor or a review
board (Chapter 7) will ask for directly.

## Key terms

| Term | Meaning |
|---|---|
| Policy initiative (policy set) | A bundle of related Azure Policy definitions assigned and managed as one unit |
| Management group assignment | Attaching a policy/initiative at a management group scope so it inherits to every subscription nested under it, including future ones |
| Service Control Policy (SCP) | An AWS Organizations guardrail attached to an OU that sets a hard ceiling on allowed API actions for every identity in every account under it |
| AWS Config rule | A detective control that continuously evaluates existing resources against a rule and reports compliance, optionally triggering remediation |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does assigning a policy initiative at the management group level matter
more than the content of the policy itself, and what is the real
difference in what an SCP prevents versus what an AWS Config rule
detects?
