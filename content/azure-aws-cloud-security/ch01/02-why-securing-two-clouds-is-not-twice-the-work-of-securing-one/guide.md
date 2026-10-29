# Lesson 2 — Why Securing Two Clouds Is Not Twice the Work of Securing One

**Chapter 1 · Cloud Security Posture at Scale · Lesson 2 of 4**

## What you'll learn

- Why the "dual-cloud = double effort" assumption is wrong, and what
  actually does scale with a second cloud provider
- How to map Azure's identity, policy, and monitoring primitives onto
  their AWS equivalents instead of learning two unrelated systems
- Why a single security control intent (from a framework like CIS
  Controls) produces two different implementations, not two different
  problems
- Where a unified view — like Microsoft Defender for Cloud's
  multicloud coverage — actually collapses the work instead of adding
  to it

## The real cost of a second cloud isn't duplication

If you've only worked in one cloud so far, "now secure AWS too" sounds
like it doubles your job. In practice it doesn't, because the hard
part of cloud security was never memorizing a specific product name —
it was understanding the handful of underlying primitives every cloud
has to solve the same problems with: identity and access, network
boundary enforcement, configuration drift detection, and centralized
logging. Azure and AWS each built their own products for those
primitives, but the primitives themselves are identical. Once you know
that, adding AWS is mostly translation, not re-learning from zero.

## The primitives map directly

| Primitive | Azure | AWS |
|---|---|---|
| Identity provider | Microsoft Entra ID | AWS IAM + IAM Identity Center |
| Organizational hierarchy | Management groups → subscriptions | AWS Organizations → OUs → accounts |
| Policy enforcement at scale | Azure Policy | AWS Config rules + Service Control Policies (SCPs) |
| Cloud security posture management | Microsoft Defender for Cloud | AWS Security Hub |
| Threat detection | Microsoft Defender for Cloud (workload protections) | Amazon GuardDuty |
| Centralized logging | Azure Monitor / Log Analytics / Activity Log | AWS CloudTrail / CloudWatch |

Look at that table as a Rosetta Stone, not two separate curricula. The
question "did we enforce MFA for privileged accounts" is one security
requirement with two implementations: a Conditional Access policy in
Entra ID on one side, an IAM policy plus an SCP guardrail (or IAM
Identity Center permission set) on the other. You're not learning two
unrelated problems — you're learning one problem and two syntaxes.

## Where the extra effort actually goes

Dual-cloud security engineering does add real work — just not where
people assume. The genuine costs are:

- **Terminology and default-behavior translation.** An Azure "resource
  group" and an AWS "account" aren't quite the same thing; a
  subscription spans resource groups, while an AWS account is closer
  to the subscription-level isolation boundary itself. Getting these
  boundaries wrong leads to policies applied at the wrong scope.
- **Federated identity across both.** Most real dual-cloud shops don't
  run two separate identity stores — they federate AWS IAM Identity
  Center (or individual IAM roles) to Entra ID as the single source of
  truth, so there's one identity lifecycle to manage, not two.
- **Log and alert aggregation.** Without a unifying layer, you end up
  watching two consoles. With one, you don't. This is the single
  biggest lever for making dual-cloud feel like one job instead of
  two.
- **Mapping one control framework to two native toolsets.** CIS has a
  separate benchmark document for Azure and for AWS, but both exist to
  enforce the *same* underlying control intent (disable unused public
  access, enforce logging, require MFA for privileged roles). You pick
  the framework once and implement it twice — you don't redesign your
  security program twice.

## The convergence point: one pane of glass, two data sources

This is exactly why tools like Microsoft Defender for Cloud now
support AWS (and GCP) as first-class environments, not just Azure:
connect an AWS account to Defender for Cloud and its CIS AWS
Foundations Benchmark recommendations, GuardDuty-sourced alerts, and
Security Hub findings surface in the same secure score and the same
recommendations blade you already use for Azure. The practical
takeaway for this chapter: once your posture management layer speaks
both clouds, "secure two clouds" stops meaning "operate two security
programs" and starts meaning "operate one security program against
two sets of native APIs." That's the architecture the rest of this
course assumes.

## Key terms

| Term | Meaning |
|---|---|
| Security primitive | A fundamental problem every cloud must solve (identity, policy enforcement, logging, threat detection) regardless of vendor-specific product names |
| Federated identity | A setup where one identity provider (e.g., Entra ID) is the source of truth, with AWS trusting it rather than maintaining a separate identity store |
| Service Control Policy (SCP) | An AWS Organizations guardrail that sets the maximum permissions allowed across accounts in an OU, conceptually parallel to Azure Policy at the management-group level |
| Multicloud CSPM | A posture management tool (e.g., Microsoft Defender for Cloud) that ingests findings from more than one cloud provider into one unified view |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: name
the AWS equivalent of Azure Policy, the AWS equivalent of Microsoft
Entra ID, and why mapping a single CIS control intent to both clouds
is fundamentally different work than designing two separate security
programs.
