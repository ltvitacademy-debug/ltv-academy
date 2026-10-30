# Lesson 6 — Consolidating Azure and AWS Identity

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 6 of 26**

## What you'll learn

- The real steps to federate AWS IAM Identity Center to Entra ID, so there's
  one identity plane instead of two
- How SCIM provisioning keeps AWS permission sets in sync with Entra ID
  group membership automatically
- How this directly retires the long-lived AWS access keys found in
  Lesson 3
- What stays separate on purpose, even after consolidation

## The destination from Lesson 4, built step by step

Pillar two's target state was one sentence: one identity plane, not two.
This lesson is the real sequence of steps Mara runs to get there, using
**AWS IAM Identity Center** (the successor to AWS SSO) federated to
**Entra ID** as the identity provider.

## Step 1: enable IAM Identity Center and designate Entra ID as the IdP

In the AWS Organizations management account, Mara enables IAM Identity
Center and configures it for external identity provider federation using
SAML 2.0, with Entra ID as the identity provider. In Entra ID, this means
registering a new enterprise application for "AWS IAM Identity Center,"
configuring the SAML single sign-on endpoint, and exchanging metadata — the
IdP (Entra ID) issuing SAML assertions that IAM Identity Center (the
service provider) trusts for authentication.

## Step 2: turn on SCIM provisioning

Federation alone only solves authentication — it doesn't solve the
underlying problem from Lesson 3, which was that AWS IAM groups and Entra
ID groups drift out of sync because nothing keeps them synchronized.
**SCIM (System for Cross-domain Identity Management)** provisioning closes
that gap: Mara configures Entra ID's enterprise application for automatic
user provisioning, pointed at IAM Identity Center's SCIM endpoint. Once
enabled, every Entra ID group membership change — someone added to or
removed from a group — automatically provisions or deprovisions the
corresponding principal in IAM Identity Center, with no manual AWS-side
step required.

## Step 3: map permission sets to Entra ID groups

With federation and provisioning in place, Mara defines **permission
sets** — IAM Identity Center's reusable, named bundles of AWS permissions —
and assigns each one to a specific Entra ID group rather than to individual
people. The permission set relevant to this capstone's OT/SCADA pilot:

```
Permission set: ScadaOTAdministrator
  Scoped to account: Hartwell-OT-Analytics
  Assigned to Entra ID group: SCADA-OT-Admins
  Session duration: 4 hours
```

Anyone added to the Entra ID group `SCADA-OT-Admins` automatically gains
the `ScadaOTAdministrator` permission set in AWS, through a short-lived
federated session — and anyone removed from that group loses it just as
automatically, the next time SCIM syncs. Access to AWS now follows Entra ID
group membership directly, instead of being a second system someone has to
remember to update.

## Step 4: retire the long-lived keys Lesson 3 found

This is where the Lesson 3 finding actually gets fixed, not just
documented. Every IAM user identified with a long-lived access key gets
migrated to a federated role assumed through IAM Identity Center instead —
replacing a static, rarely-rotated credential with a short-lived,
automatically-expiring session tied to a real Entra ID identity. Once
migration is confirmed for a given user, Mara deactivates (and later
deletes) the standing IAM user and its access keys entirely. Fewer
long-lived credentials exist specifically because there's now one place —
Entra ID — managing who gets access in the first place.

## What stays separate, on purpose

Consolidation doesn't mean every AWS-native concept disappears. Workload
identities — AWS service roles assumed by EC2 instances, Lambda functions,
or other AWS services with no human behind them — are *not* pushed through
IAM Identity Center. Federation and SCIM solve *human* identity
consolidation. Non-human, workload identity continues to use AWS IAM roles
directly, scoped tightly per workload, exactly as the Security Engineering
course's "service account and non-human identity authentication" lesson
covers. Mixing the two models would re-create a different version of the
same sprawl problem this lesson is solving.

## Key terms

| Term | Meaning |
|---|---|
| AWS IAM Identity Center | AWS's centralized workforce identity service (successor to AWS SSO), supporting external IdP federation |
| SCIM | A standard protocol for automatically provisioning and deprovisioning user accounts across systems as group membership changes |
| Permission set | A reusable, named bundle of AWS permissions in IAM Identity Center, assigned to a group rather than an individual |
| Federated session | A temporary, short-lived set of AWS credentials issued after a successful federated sign-in, rather than a static access key |

## Lab

1. Write out the four steps in order: enabling IAM Identity Center with
   Entra ID as the IdP, turning on SCIM, mapping a permission set to a
   group, and retiring long-lived keys.
2. Explain, in your own words, why federation alone (without SCIM) would
   not have fully solved the Lesson 3 finding.
3. Explain why workload identities are deliberately kept outside of this
   consolidation.

## Check yourself

You're ready for Lesson 7 when you can walk through all four consolidation
steps from memory, explain what SCIM adds beyond plain SAML federation, and
explain why non-human workload identity is handled differently on purpose.
