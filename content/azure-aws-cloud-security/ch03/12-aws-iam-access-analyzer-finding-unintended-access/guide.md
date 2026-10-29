# Lesson 12 — AWS IAM Access Analyzer: Finding Unintended Access

**Chapter 3 · AWS Identity & Access Security · Lesson 4 of 4**

## What you'll learn

- What IAM Access Analyzer actually checks, and the "zone of trust"
  concept its findings are built around
- The difference between its two finding types: external access
  findings and unused access findings
- How to read a real external access finding and decide whether it's
  intentional or a problem
- How policy validation and custom policy checks catch risky changes
  before they're ever deployed, not after

## The zone of trust

IAM Access Analyzer's core job is answering one question for every
resource that supports resource-based policies: *can anything outside
my zone of trust reach this?* A **zone of trust** is either a single
AWS account or an entire AWS Organization — you pick which when you
create the analyzer. Anything inside that zone is assumed to be
trusted by default; anything outside it (another, unrelated AWS
account, a different Organization, the public internet, or an
anonymous principal) reaching a resource inside your zone is exactly
what Access Analyzer is built to surface.

It does this by mathematically evaluating the actual policy logic —
not pattern-matching keywords in the policy text — against every
resource type that supports a resource-based policy: S3 buckets, IAM
roles, KMS keys, Lambda functions, SQS queues, Secrets Manager
secrets, SNS topics, and EBS and RDS snapshots. If the policy logic
allows a principal outside the zone of trust to reach the resource,
that's a finding, whether or not you remember writing the policy that
way.

## External access findings

An external access finding tells you a specific resource is reachable
from outside your zone of trust, and exactly how:

```
Finding: S3 bucket "ltv-shared-reports" is accessible from
  outside your zone of trust

External principal: arn:aws:iam::999999999999:role/vendor-etl-role
Condition: none
Actions:   s3:GetObject, s3:ListBucket
Resource:  arn:aws:s3:::ltv-shared-reports
```

The finding gives you everything you need to make a real decision:
*which* external account or principal can reach it, *what* they can
do, and *whether* any condition narrows that access. Sometimes this
is completely intentional — a vendor really does need read access to
a specific reporting bucket — and Access Analyzer lets you mark that
finding as an **archived (known, reviewed) finding**, often via an
**archive rule** that auto-archives future findings matching the same
pattern so you're not re-reviewing the same intentional grant every
time the analyzer re-scans. Other times it's exactly the kind of
mistake this chapter has been building toward: a bucket policy copied
from another project that still has a wildcard `Principal`, or a KMS
key policy that grants `kms:Decrypt` to an account that no longer
needs it.

## Unused access findings

A newer finding category looks the other direction — not "who can
reach in from outside," but "what access exists inside your account
that nobody is actually using." Unused access findings flag:

- **Unused IAM roles** — roles that haven't been assumed in a defined
  lookback window
- **Unused access keys** — access keys that exist but haven't made an
  API call recently
- **Unused passwords** — IAM user console passwords that haven't been
  used to sign in
- **Unused permissions** — individual actions granted by a policy that
  the principal has never actually called, even if the role itself is
  active

That last one directly targets the gap between "least privilege as
written" and "least privilege as actually used" — a role might call
three S3 actions a thousand times a day and have forty more sitting
unused in its policy, each one still part of what a leaked credential
for that role could do.

## Policy validation and custom policy checks

Access Analyzer doesn't only scan what's already deployed — it checks
policies *while you're writing them*, in the IAM console and via the
`aws accessanalyzer` CLI. **Policy validation** runs over a hundred
checks against a policy document and flags syntax errors, overly
permissive patterns, and warnings before you ever attach it. **Custom
policy checks** go further: `check-no-new-access` compares a proposed
policy change against a reference policy and tells you whether the
change grants anything beyond what was already allowed, and
`check-access-not-granted` lets you assert that a specific list of
actions should never be reachable by a policy at all — the kind of
check that fits directly into a CI/CD pipeline as a gate before a
policy change ever merges.

## Making this an actual workflow

Access Analyzer is only useful if findings get triaged, not just
generated. A workable loop: enable an analyzer per account (or
org-wide from the management account), review new external access
findings on a cadence, archive the genuinely intentional ones with a
rule so they don't resurface as noise, treat every unarchived finding
as something to investigate, and feed both finding types into Security
Hub so they sit alongside your other cloud security signals instead of
living in a separate, easily forgotten console tab.

## Key terms

| Term | Meaning |
|---|---|
| Zone of trust | The account or Organization IAM Access Analyzer treats as trusted; access from outside it generates a finding |
| External access finding | A finding showing a specific resource is reachable by a principal outside the zone of trust |
| Archive rule | A rule that automatically archives future findings matching a known, reviewed pattern |
| Unused access finding | A finding flagging roles, keys, passwords, or permissions that exist but aren't actually being used |
| `check-no-new-access` | A custom policy check comparing a proposed policy against a reference policy to catch newly granted access before deployment |

## Check yourself

You're ready to move on when you can explain, without looking: what
does "zone of trust" actually mean for how Access Analyzer decides
what counts as a finding, and what's the real difference between an
external access finding and an unused access finding?
