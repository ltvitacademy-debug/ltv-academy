# Lesson 18 — AWS Security Hub and GuardDuty in Practice

**Chapter 5 · Cloud-Native Security Tooling · Lesson 2 of 4**

## What you'll learn

- How AWS Security Hub aggregates findings from multiple AWS security
  services into one normalized format, instead of being a detector
  itself
- How GuardDuty actually detects threats — which log sources it reads,
  and what its finding-type naming convention tells you at a glance
- How GuardDuty's findings and Security Hub's aggregation connect
  automatically, and why that matters for where you actually triage
- Where security standards (CIS AWS Foundations Benchmark, AWS
  Foundational Security Best Practices) fit into Security Hub's score

## Security Hub: an aggregator, not a detector

The most important thing to understand about AWS Security Hub is what
it *isn't*: it doesn't detect threats itself. Security Hub's job is to
pull findings from other AWS security services — GuardDuty, Inspector,
Macie, IAM Access Analyzer, AWS Config, Firewall Manager — and normalize
every one of them into the **AWS Security Finding Format (ASFF)**, a
consistent JSON schema with fields like severity, resource, and
compliance status regardless of which service produced the finding.
That normalization is the whole value proposition: instead of checking
five different consoles, every finding lands in one place with a
consistent shape you can filter, search, and automate against.

Security Hub also runs continuous checks against **security
standards** — the CIS AWS Foundations Benchmark, the AWS Foundational
Security Best Practices standard, and PCI DSS, among others — and rolls
compliant/non-compliant control results into a per-standard security
score, conceptually similar to Defender for Cloud's Secure Score: a
prioritization signal built from weighted, passing-or-failing controls,
not a guarantee that nothing is wrong.

## GuardDuty: what it actually reads to detect threats

GuardDuty is the threat-detection engine. It doesn't require you to
deploy any agent or sensor for its core detections — it continuously
analyzes existing log and event sources you're likely already
generating: CloudTrail management events and S3 data events,
VPC Flow Logs, and DNS query logs, plus optional protection plans that
extend coverage to EKS audit logs, RDS login activity, EBS volume data
(Malware Protection), and Lambda network activity (Lambda Protection).
It applies threat intelligence feeds, anomaly detection, and machine
learning to that traffic to surface things like a compromised instance
calling out to a known command-and-control domain or an IAM credential
being used from an unusual location.

## Reading a GuardDuty finding type

GuardDuty names its findings with a deliberate, readable convention:
`ThreatPurpose:ResourceTypeAffected/ThreatFamilyName.DetectionMechanism`.
A finding called `UnauthorizedAccess:EC2/SSHBruteForce` tells you,
without opening the console, that this is unauthorized-access activity
against an EC2 instance via SSH brute-forcing. `Recon:IAMUser/TorIPCaller`
tells you an IAM user's activity was observed coming from a Tor exit
node — reconnaissance-stage behavior worth investigating even if
nothing was actually accessed yet. `CryptoCurrency:EC2/BitcoinTool.B!DNS`
tells you a resource is making DNS requests associated with known
cryptocurrency-mining infrastructure. Each finding also carries a
numeric severity from 1.0 to 8.9, bucketed into Low, Medium, and High —
learn to read the name first; it usually tells you most of what you
need before you even look at the severity number.

## Where the two meet

GuardDuty findings flow into Security Hub automatically once both
services are enabled in the same account and region — you don't build
that integration yourself. In practice this means Security Hub becomes
your single triage surface: GuardDuty's behavioral detections sit
alongside Inspector's vulnerability findings, Macie's sensitive-data
discoveries, and Config's compliance checks, all in ASFF, all
filterable the same way. From there, Security Hub findings can trigger
Amazon EventBridge rules for automated response — isolating an
instance, revoking a credential, opening a ticket — without a human
manually relaying the finding between consoles.

## A practical rollout order

1. Enable GuardDuty in every region you operate in — threats don't
   respect your primary-region assumption.
2. Enable Security Hub and turn on the standards relevant to your
   compliance obligations (CIS AWS Foundations Benchmark is a
   reasonable default baseline).
3. Confirm GuardDuty's finding feed is appearing inside Security Hub,
   not just in the GuardDuty console.
4. Build EventBridge automation for your highest-confidence, highest-
   severity finding types before trying to automate everything.

## Key terms

| Term | Meaning |
|---|---|
| AWS Security Finding Format (ASFF) | The normalized JSON schema Security Hub uses to represent findings from any contributing service in one consistent shape |
| Security Hub | Aggregates and normalizes findings from GuardDuty, Inspector, Macie, IAM Access Analyzer, and Config; also scores accounts against security standards |
| GuardDuty | The threat-detection service that analyzes CloudTrail, VPC Flow Logs, DNS logs, and optional protection-plan sources for malicious or anomalous activity |
| Finding type | GuardDuty's naming convention — ThreatPurpose:ResourceTypeAffected/ThreatFamilyName — that summarizes a detection without opening the console |
| Protection plans | Optional GuardDuty extensions (EKS, RDS, Malware Protection, Lambda Protection) that widen coverage beyond the default log sources |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
is it inaccurate to call Security Hub a "threat detector," and what
specifically does GuardDuty read to generate a finding like
`UnauthorizedAccess:EC2/SSHBruteForce` without you installing an agent?
