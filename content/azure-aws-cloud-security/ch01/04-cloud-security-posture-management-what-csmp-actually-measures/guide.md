# Lesson 4 — Cloud Security Posture Management: What CSPM Actually Measures

**Chapter 1 · Cloud Security Posture at Scale · Lesson 4 of 4**

## What you'll learn

- What a CSPM tool is actually doing under the hood — not "AI-powered
  security," just continuous configuration assessment against known
  controls
- How Microsoft Defender for Cloud's secure score is calculated, and
  why a percentage can hide more than it reveals
- How AWS Security Hub's aggregated findings and compliance scores
  work the same way, from a different starting point
- Why CSPM is necessary but not sufficient — what it does and
  doesn't tell you about your actual risk

## CSPM is configuration assessment, not magic

Cloud Security Posture Management (CSPM) tools get described with a
lot of marketing language, but the mechanism is straightforward: a
CSPM tool continuously reads your cloud environment's actual
configuration — via the same APIs you'd use yourself — and compares it
against a library of known-good rules. Each rule maps back to
something concrete: a CIS Benchmark recommendation, a regulatory
requirement, or a vendor-authored security best practice. When a
resource's real configuration doesn't match the rule, that's a
finding. Microsoft Defender for Cloud and AWS Security Hub are both
CSPM tools in this exact sense — neither is doing anything you
couldn't theoretically script yourself with enough time; they're doing
it continuously, at scale, across every subscription or account you
connect.

## What Defender for Cloud's secure score is actually built from

The secure score you see on the Defender for Cloud overview page isn't
a single opaque number — it's a weighted aggregate of individual
**security recommendations**, each belonging to a **security
control** (a logical grouping like "Enable MFA," "Remediate
vulnerabilities," or "Encrypt data in transit"). Each control
contributes a maximum number of points to the overall score, and your
score for that control is `(resources in a healthy state) / (total
applicable resources)` multiplied by the control's point weight.
Critically: not every recommendation is weighted equally, and not
every recommendation applies to every environment — a control about
securing SQL databases contributes zero points if you have no SQL
databases deployed. Reading *which* controls are contributing the
missing points matters far more than watching the single percentage
move.

## What AWS Security Hub measures, from a different angle

AWS Security Hub doesn't present one blended score the same way;
instead, it aggregates **findings** from multiple sources — its own
automated security checks against enabled standards (like the CIS AWS
Foundations Benchmark or the AWS Foundational Security Best
Practices standard), plus findings forwarded in from Amazon GuardDuty,
Amazon Inspector, and other integrated services — into one normalized
findings format and a consolidated view per account and per standard.
Each enabled standard shows its own pass/fail percentage across its
controls, which is the closest AWS equivalent to Defender for Cloud's
secure score, just computed per standard rather than as one combined
number.

## What CSPM does and does not tell you

This is the part that separates engineers who just watch a dashboard
from engineers who actually use one:

- CSPM tells you **configuration state** — is this resource compliant
  with this specific rule, right now. It does not tell you whether an
  attacker is actively inside your environment; that's the job of
  threat detection (GuardDuty, Defender for Cloud's workload
  protection plans), not posture management.
- A high secure score or a "100% passed" standard in Security Hub
  means your *known, checked* configuration surface is clean. It says
  nothing about a misconfiguration the rule set doesn't check for, a
  zero-day in managed infrastructure, or a legitimate credential being
  misused by an attacker who already has it.
- Fixing the highest-point-value recommendation first is a reasonable
  prioritization heuristic, but it isn't automatically the
  highest-risk item for *your* specific environment — a lower-scored
  recommendation on your actual internet-facing production workload
  can matter more than a higher-scored one on an isolated dev
  subscription.

CSPM is the instrument panel, not the whole cockpit. It's necessary —
you cannot manage what you don't continuously measure — but it's one
input into a security program, not the program itself.

## Key terms

| Term | Meaning |
|---|---|
| CSPM | Cloud Security Posture Management: continuous, automated assessment of cloud configuration against known-good rules |
| Secure score | Defender for Cloud's weighted aggregate score, built from individual recommendations grouped into security controls |
| Security control | A logical grouping of related recommendations (e.g., "Enable MFA") that contributes a maximum point value to the secure score |
| Finding | A normalized record, in AWS Security Hub, representing a specific failed (or passed) check against an enabled standard |
| Enabled standard | A named framework (e.g., CIS AWS Foundations Benchmark) turned on in Security Hub, each scored independently |

## Check yourself

This closes Chapter 1. Before moving to Chapter 2, make sure you can
explain, without looking: how is Defender for Cloud's secure score
actually calculated from individual controls, how does AWS Security
Hub's scoring differ structurally from that single blended number, and
why can a 100% compliant standard still leave real risk unaddressed?
