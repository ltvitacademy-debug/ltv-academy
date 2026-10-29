# Lesson 28 — Containing an Incident in a Cloud Account Without Cloud-Wide Downtime

**Chapter 7 · Detecting and Responding to Cloud Attacks · Lesson 4 of 4**

## What you'll learn

- Why the right containment action is scoped to the compromised
  identity or resource, not the whole account or subscription
- The specific AWS actions — key deactivation, session revocation,
  quarantine policies — that stop an attacker without an outage
- The Azure equivalents — targeted Conditional Access blocks, refresh
  token revocation, credential removal on one app registration
- Why preserving forensic evidence has to happen *before* you clean up

## The containment mistake: reaching for the biggest lever

The instinct under pressure is to reach for the biggest lever
available — disable the whole IAM user, lock the entire AWS account,
or disable the Azure subscription. That stops the attacker, but it
also stops every legitimate workload running in that account or
subscription, which turns a contained security incident into a
self-inflicted outage. The actual goal of containment is to shrink the
attacker's blast radius down to nothing while leaving everything else
running. That means scoping every action to the specific identity or
resource the investigation in the last lesson already identified.

## AWS: scoped containment actions

- **Deactivate, don't delete, the specific access key:**
  `aws iam update-access-key --access-key-id <id> --status Inactive
  --user-name <user>`. This stops the exact leaked key immediately
  while leaving the IAM user, and any *other* keys it might
  legitimately need, untouched.
- **Revoke active temporary credentials.** A deactivated key doesn't
  retroactively kill STS sessions already issued from it. AWS's own
  incident response guidance documents a revocation policy pattern: an
  inline policy with an explicit `Deny` on all actions, conditioned on
  `aws:TokenIssueTime` being earlier than the moment you detected the
  compromise. Because explicit denies always win, this invalidates
  every session token issued before that timestamp without touching
  anything issued after you've rotated.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "DateLessThan": { "aws:TokenIssueTime": "2026-03-14T09:30:00Z" }
    }
  }]
}
```

- **Isolate a compromised EC2 instance, don't terminate it.** Swap its
  security group to one with no inbound or outbound rules, and take an
  EBS snapshot before touching anything else. Terminating it destroys
  the forensic evidence you need to understand what actually happened.
- **Use an AWS Organizations SCP** when the compromise is scoped to one
  member account, so the restriction applies only there and not across
  the whole organization.

## Azure: scoped containment actions

- **Block the specific account with Conditional Access, don't disable
  the whole tenant.** A targeted Conditional Access policy — or simply
  disabling sign-in for that one user or service principal — stops the
  identity from authenticating again without touching anyone else.
- **Revoke refresh tokens for the specific user**
  (`Revoke-AzureADUserAllRefreshToken` or the equivalent Graph call).
  Disabling an account doesn't invalidate tokens already issued; this
  forces re-authentication, which Conditional Access can then block.
- **Remove the malicious credential from the app registration, not
  the app itself** — if the escalation path from Lesson 26 involved an
  Application Administrator adding a secret to a privileged service
  principal, delete that specific secret. Deleting the whole app
  registration can break every legitimate workload depending on it.
- **Isolate a compromised VM** through Microsoft Defender for Cloud's
  isolate action, or an NSG swap identical in spirit to the EC2
  approach, and snapshot the disk before remediating.
- **Remove the specific role assignment**, not a blanket deny policy
  at the subscription root, when the issue is one over-privileged
  identity rather than the whole environment.

## Sequencing: evidence before cleanup

In every one of these cases, order matters: snapshot and preserve
evidence first, *then* contain, *then* remediate. A security group
swap or a token revocation can usually happen immediately without
losing evidence — but terminating an instance or deleting an app
registration before you've captured what you need to can't be undone.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | The scope of resources/identities an attacker can actually reach — the thing containment is meant to shrink to as close to zero as possible |
| `aws:TokenIssueTime` deny policy | An explicit-deny IAM policy pattern that invalidates all STS sessions issued before a given timestamp, without affecting sessions issued after |
| Scoped Conditional Access block | Blocking sign-in for one specific identity in Azure AD, instead of disabling access for the whole tenant |
| Forensic preservation | Snapshotting a resource (EBS volume, VM disk) before remediating it, so the evidence of what happened survives the cleanup |

## Check yourself

You've completed Chapter 7 when you can explain why deactivating one
access key and revoking its sessions is the correct containment step
instead of disabling the whole IAM account, and why forensic
evidence has to be captured before an instance is terminated or an app
registration is deleted.
