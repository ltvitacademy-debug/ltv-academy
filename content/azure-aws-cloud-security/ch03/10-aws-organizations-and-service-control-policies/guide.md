# Lesson 10 — AWS Organizations and Service Control Policies

**Chapter 3 · AWS Identity & Access Security · Lesson 2 of 4**

## What you'll learn

- How AWS Organizations structures a multi-account environment:
  management account, member accounts, and Organizational Units (OUs)
- Why a Service Control Policy (SCP) is fundamentally different from
  an IAM policy — it can only take permissions away, never grant them
- How to read and write real SCPs that enforce region restrictions
  and protect security tooling from being disabled
- Where SCPs fit relative to IAM policies in the overall permission
  evaluation picture

## The account structure

AWS Organizations lets you manage many AWS accounts as a single unit
instead of a pile of unrelated ones. The **management account** (the
account the organization was created from) can create new member
accounts, invite existing ones, and apply policies across the whole
structure. **Organizational Units (OUs)** are the folders you group
accounts into — commonly by environment (`Production`, `Staging`,
`Sandbox`) or by team — and OUs can nest inside other OUs. Policies
attached at an OU apply to every account underneath it, which is the
entire point: you set a guardrail once, at the right level, instead
of repeating it account by account.

## SCPs only ever take permissions away

This is the single most important thing to understand about Service
Control Policies, and it's also the thing people coming from IAM
policies get backwards most often: **an SCP can never grant a
permission.** It defines the maximum permissions available to
accounts in its scope — the ceiling, not the grant. Even if every
IAM policy in an account allows an action, an SCP that denies it (or
simply doesn't include it in an allow list) blocks it anyway. The
actual grant still has to come from an IAM policy inside the account
itself; the SCP only decides what IAM is even allowed to say yes to.

By default, every account has the AWS-managed `FullAWSAccess` SCP
attached at the root, which places no additional restriction — SCPs
only start constraining anything once you attach a more restrictive
one.

## A deny-list SCP: pinning allowed regions

The most common real-world SCP restricts which AWS regions an
account's workloads are allowed to run in — useful for data residency
requirements and for shrinking the blast radius of a compromised
credential to regions you're actually watching:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyOutsideApprovedRegions",
      "Effect": "Deny",
      "NotAction": [
        "iam:*",
        "organizations:*",
        "sts:*",
        "support:*"
      ],
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": ["us-east-1", "us-west-2"]
        }
      }
    }
  ]
}
```

`NotAction` here means "every action except these" — global services
like IAM and Organizations don't live in a region, so they're
excluded from the restriction, or every API call in the account would
break. The `Condition` then denies anything requested outside the
approved region list. This is a **deny-list** SCP: it lists what's
forbidden and allows everything else by omission.

## An allow-list SCP: protecting security tooling

The other common pattern is protecting the controls that give you
visibility into the account in the first place — denying anyone the
ability to disable CloudTrail, GuardDuty, or Config, even an account
admin with full IAM permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ProtectSecurityServices",
      "Effect": "Deny",
      "Action": [
        "cloudtrail:StopLogging",
        "cloudtrail:DeleteTrail",
        "guardduty:DeleteDetector",
        "guardduty:DisassociateFromMasterAccount",
        "config:DeleteConfigurationRecorder",
        "config:StopConfigurationRecorder"
      ],
      "Resource": "*"
    }
  ]
}
```

No `Condition` needed here — this one's an unconditional deny, applied
at an OU level so it reaches every account underneath. Even if an
engineer's IAM role includes `AdministratorAccess`, the SCP denial
wins, because of the exact same "explicit deny always wins" rule
from the last lesson — it's just being applied one layer up, against
the organization instead of against a single account.

## Where SCPs fit in the evaluation picture

An IAM principal's effective permissions are the intersection of
everything that has to agree: the identity-based policy attached to
the principal, any permissions boundary, the resource-based policy on
whatever it's reaching, and the SCPs covering the account the request
originates in. All of them have to allow the action — SCPs don't
replace IAM evaluation, they add another ceiling on top of it. A
request can be denied by IAM even when every SCP permits it, and a
request can be denied by an SCP even when IAM would have allowed it.
Only a request both IAM and every applicable SCP agree to succeeds.

## Key terms

| Term | Meaning |
|---|---|
| Management account | The account an AWS Organization is created from; can manage member accounts and apply org-wide policies |
| Organizational Unit (OU) | A folder-like grouping of accounts that policies can be attached to, applying to everything underneath |
| Service Control Policy (SCP) | An org-level policy that sets the maximum permissions available to accounts in scope; can only restrict, never grant |
| `FullAWSAccess` | The default AWS-managed SCP attached at the root, which adds no restriction until replaced or supplemented |
| Deny-list SCP | An SCP that denies a specific set of actions/conditions and allows everything else by omission |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
can't an SCP ever be the reason a request succeeds, and what two
separate things have to both agree before an IAM principal's request
is actually allowed?
