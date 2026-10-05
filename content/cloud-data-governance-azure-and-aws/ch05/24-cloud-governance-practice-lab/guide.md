# Lesson 24 — Cloud Governance Practice Lab

**Chapter 5 · Multi-Cloud Governance · Lesson 24 of 25**

## What you'll learn

- How to turn everything from this course into a single one-page control map you could hand to an interviewer or a new teammate
- The five-row structure every multi-cloud governance control map needs, and why each row exists
- What a real AWS trust-policy snippet looks like, so the abstract idea of "federated identity" has a concrete shape
- How to self-check your control map against the gaps most real programs actually have

## The exercise

This lab doesn't require a live Azure or AWS subscription — it requires fifteen focused minutes and everything you've already learned in this course. You're going to build a **multi-cloud governance control map**: a single page, five rows, pairing every major governance control this course covered with its counterpart on the other cloud. This is the artifact Briarcliff's governance lead maintained in Lesson 23, and it's a legitimate thing to bring to a real interview for a governance role — it shows you understand both clouds' native tools well enough to translate between them, not just memorize one.

## Step 1 — Pick your scenario

Use Briarcliff Outdoor Gear from Lesson 23, or substitute a company of your own (clearly fictional, or a generalized version of somewhere you've worked with identifying details removed). Write one sentence: which cloud is primary, which is secondary, and why the secondary footprint exists — an acquisition, a specific service, a legacy system. Lesson 21 established this is the realistic default; your map should reflect it.

## Step 2 — Map identity

Fill in one row: **Primary cloud control** → **Secondary cloud control** → **Translation mechanism**. For an Azure-primary, AWS-secondary scenario, that's Entra ID → AWS IAM → a federated role trust. Here's what that trust actually looks like in AWS's own policy syntax — the real shape of the thing, not just the concept:

```
{
  "Effect": "Allow",
  "Principal": {"AWS": "arn:aws:iam::<account-id>:root"},
  "Action": "sts:AssumeRole",
  "Condition": {"StringEquals":
    {"sts:ExternalId": "<shared-secret>"}}
}
```

This is the same pattern Lesson 22 covered for Purview's AWS S3 connector — a role that trusts a specific external account, gated by an External ID. The exact syntax changes by scenario, but the shape (trust a specific principal, require a shared secret) is the real mechanism behind every "federated identity across clouds" claim you'll ever read.

## Step 3 — Map storage, catalog, and policy enforcement

Three more rows, same pattern:

- **Storage governance**: ADLS container ACLs ↔ S3 bucket policies + Lake Formation permissions
- **Cataloging**: one Purview catalog, both sources registered — Azure natively, AWS through the multicloud scanning connector
- **Policy enforcement**: an Azure Policy initiative ↔ an AWS Organizations service control policy enforcing the equivalent rule

## Step 4 — Map audit logging, and name an owner

The fifth row: Azure Activity Log / Monitor ↔ AWS CloudTrail / CloudWatch, feeding one central destination. Then — this is the step most real control maps skip — add a sixth column across every row: **who is responsible for keeping both sides in sync.** If a name doesn't come to mind, write "unassigned." An honestly unassigned row is more useful than a map that looks complete but isn't backed by anyone's actual job description.

## Step 5 — Self-check against the real gaps

Reread your five-row map and ask, for each row: if someone changed the primary-cloud control tomorrow, would the secondary-cloud equivalent change automatically, or would someone have to remember to update it by hand? Every "by hand" answer is a policy-drift risk per Lesson 21 — not a flaw in your map, but the honest starting point for where a real governance program would put its next piece of automation or its next scheduled review.

## Key terms

| Term | Meaning |
|---|---|
| Control map | A document pairing each governance control on a primary cloud with its equivalent on a secondary cloud, plus an owner |
| Trust policy | The JSON document attached to an AWS IAM role defining exactly who (which account, optionally gated by an External ID) is allowed to assume it |
| By-hand sync | A control pairing that depends on a person remembering to update both sides — the most common real-world source of policy drift |

## Lab

Produce your finished five-row (six-column) control map from Steps 2 through 4, using either Briarcliff Outdoor Gear or a scenario of your own. Keep it to one page. This is the deliverable — there's no separate "answer key," because the right answer depends on the scenario you picked; what matters is that every row names a real control on each side and an owner.

## Check yourself

Looking at your finished control map, how many of the five rows would survive a change on the primary cloud without anyone having to remember to update the secondary cloud by hand — and for the rows that wouldn't, do you know who owns fixing that?
