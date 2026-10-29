# Lesson 29 — Lab: Hardening Identity and Network Across Azure and AWS

**Chapter 8 · Capstone: Securing a Multi-Cloud Environment · Lesson 29 of 32**

## What you'll learn

- How to combine Entra ID Conditional Access, NSGs, AWS IAM least privilege, and Security Groups
  into one hardening pass instead of treating each cloud's identity and network controls separately
- Why identity gets hardened before network in this exercise — a valid credential walks straight
  through a locked-down network boundary, so a tight NSG or Security Group is not a substitute for
  tight IAM
- How to turn an overly permissive IAM policy and a wide-open NSG/Security Group rule into
  least-privilege versions, using the same before/after discipline on both clouds
- How to confirm the hardening actually took effect using each cloud's own evaluation tooling —
  Conditional Access "What If" and AWS IAM Access Analyzer — instead of just trusting the config

## The scenario

Meridian Finworks is a mid-size digital lending company. Its loan-origination platform runs on
Azure — a set of VMs and an Azure SQL database inside a VNet — and its customer-facing API and data
lake run on AWS — EC2 instances behind an Application Load Balancer, writing into S3. A vendor risk
review flagged exactly what Chapters 2 through 4 warned about: Conditional Access policies that
only cover a handful of apps, an NSG with a wide-open management port, an AWS IAM role with
wildcard permissions, and a Security Group that still allows SSH from anywhere. This lab is the
hardening pass a real security engineer would run in response — identity first, then network, on
both clouds.

## Step 1 — Entra ID Conditional Access (Chapter 2, Lesson 5)

Meridian's current Conditional Access coverage only applies to one legacy app. The fix is a policy
that actually covers the accounts that matter:

```
Policy name: CA-Require-MFA-Compliant-Device-Admins
Assignments
  Users/groups: Finance-Admins, Loan-Ops-Admins
  Cloud apps: All cloud apps
  Conditions: Exclude trusted locations (Meridian HQ IP range, corporate VPN range)
Grant controls
  Require multi-factor authentication
  Require device to be marked as compliant
  Require ALL the selected controls
Enable policy: On (after a Report-only run with zero unexpected blocks)
```

1. Build the policy in **Report-only** mode first, exactly as Lesson 5 covered, so it logs what it
   *would* have blocked without actually blocking anyone during loan processing hours.
2. Review the sign-in logs for a full business day — any admin sign-in that would have failed MFA
   or the compliant-device check gets investigated before the policy goes live.
3. Flip the policy to **On**, and separately enable Microsoft's built-in **block legacy
   authentication** policy, since legacy protocols can't satisfy an MFA challenge at all and are a
   documented path around Conditional Access entirely.

## Step 2 — NSG hardening (Chapter 4, Lesson 13)

The flagged NSG rule allows management ports in from anywhere:

```
# Before — nsg-meridian-app, priority 100
Source: Any (0.0.0.0/0)   Destination: Any   Port: 22, 3389   Access: Allow

# After — replace with two scoped rules
Priority 100  Source: 10.40.0.0/24 (bastion subnet)  Port: 22    Access: Allow
Priority 110  Source: 10.40.0.0/24 (bastion subnet)  Port: 3389  Access: Allow
Priority 4096 Source: Any   Destination: Any   Port: Any   Access: Deny   (explicit catch-all)
```

4. Delete the `Any → Any` rule entirely rather than narrowing it in place — a rule that's merely
   "shrunk" is easy to accidentally widen again later.
5. Add the two scoped allow rules sourced only from the bastion subnet, and associate the NSG at
   the subnet level so every VM behind it inherits the same boundary automatically.
6. Add the explicit deny-all rule at the bottom. NSGs deny by default, but an explicit rule makes
   the intent visible in every future review instead of relying on an implicit default.

## Step 3 — AWS IAM least privilege (Chapter 3, Lessons 9 and 12)

The CI/CD deployment role Meridian's pipeline assumes was flagged with a wildcard policy:

```json
// Before — attached to role: meridian-cicd-deploy
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```

```json
// After — scoped to exactly what the pipeline deploys
{
  "Effect": "Allow",
  "Action": [
    "ec2:DescribeInstances",
    "ec2:CreateTags",
    "autoscaling:UpdateAutoScalingGroup",
    "s3:PutObject"
  ],
  "Resource": [
    "arn:aws:ec2:us-east-1:111122223333:instance/*",
    "arn:aws:autoscaling:us-east-1:111122223333:autoScalingGroup:*:autoScalingGroupName/meridian-api-asg",
    "arn:aws:s3:::meridian-deploy-artifacts/*"
  ]
}
```

7. Replace the wildcard policy with the scoped version above, naming the exact actions and resource
   ARNs the pipeline actually calls — the same read-the-CloudTrail-history approach Lesson 9 taught
   for figuring out what a policy really needs.
8. Run **IAM Access Analyzer** against the account (Lesson 12) and review every finding it
   surfaces for this role; a finding on a role that was *just* tightened is the fastest way to
   confirm the rewrite didn't miss a resource the pipeline still legitimately needs.

## Step 4 — Security Group hardening (Chapter 4, Lesson 13)

```
# Before — sg-meridian-api
Inbound: 0.0.0.0/0  Port 22  (SSH)

# After
Inbound: 10.40.0.0/24 (bastion/VPN CIDR)  Port 22  (SSH)
Inbound: ALB security group only          Port 443 (HTTPS from the load balancer)
```

9. Remove the `0.0.0.0/0` SSH rule and replace it with a source restricted to the same bastion/VPN
   range used on the Azure side — one network boundary, enforced consistently in both clouds'
   native syntax.
10. Confirm the application's own inbound rule only accepts traffic from the ALB's security group
    ID, not from the whole internet or even the whole VPC, so the EC2 instances are reachable only
    through the load balancer they're meant to sit behind.

## Validating the hardening actually held

Changing a policy and confirming it works are two different steps:

- In Entra ID, use **Conditional Access "What If"** against a Finance-Admins test account signing
  in from outside the trusted range — it should report the MFA and compliant-device grants as
  required.
- In AWS, re-run **IAM Access Analyzer** and confirm the wildcard finding on `meridian-cicd-deploy`
  is gone, with no new finding introduced by the narrower policy.

## Key terms

| Term | Meaning |
|---|---|
| Conditional Access "What If" | Entra ID's simulation tool that evaluates a hypothetical sign-in against live policies without anyone actually signing in |
| Explicit deny-all (NSG) | A rule added at the lowest priority making a "deny everything else" intent visible, even though NSGs already deny by default |
| Least-privilege rewrite | Replacing a wildcard `Action`/`Resource` policy with the exact calls and ARNs a role's real traffic shows it needs |
| IAM Access Analyzer finding | A flagged grant of access Access Analyzer detects; re-running it after a rewrite is how you confirm the fix actually took |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does this lab harden identity
controls (Conditional Access, IAM policy) *before* network controls (NSG, Security Group), and what
would a tight NSG fail to stop if the attacker already holds a valid, overly permissive credential?
