# Lesson 3 — Building a Cloud Security Baseline from CIS Benchmarks

**Chapter 1 · Cloud Security Posture at Scale · Lesson 3 of 4**

## What you'll learn

- What a CIS Benchmark actually is, and why it's structured the way
  it is (profiles, levels, and individual recommendations)
- How to read the CIS Microsoft Azure Foundations Benchmark and the
  CIS Amazon Web Services Foundations Benchmark as two
  implementations of one baseline
- The difference between Level 1 and Level 2 recommendations, and why
  that distinction is the first real decision you make when adopting
  a benchmark
- How a baseline built from CIS controls connects directly to the
  tooling that *enforces* it — Azure Policy, AWS Config, Microsoft
  Defender for Cloud, and AWS Security Hub

## What a CIS Benchmark actually is

The Center for Internet Security (CIS) publishes vendor-neutral,
consensus-built configuration guidance for dozens of platforms. The
**CIS Microsoft Azure Foundations Benchmark** and the **CIS Amazon Web
Services Foundations Benchmark** are the two you'll use constantly in
this role. Each one is a long, numbered list of specific, testable
recommendations — not vague advice like "secure your identities," but
concrete statements like "Ensure that Multi-Factor Authentication is
enabled for all privileged users" (Azure) or "Ensure IAM password
policy requires minimum length of 14 or greater" (AWS). Every
recommendation includes the rationale, the audit procedure to check
current state, and the remediation steps to fix it if it's failing.

This is the practical output of Lesson 2's idea: CIS didn't invent two
different security philosophies for Azure and AWS. It took the same
underlying control intent — strong authentication, least privilege,
logging enabled, no unnecessary public exposure, encryption at rest
and in transit — and wrote a separate, cloud-specific checklist for
each, phrased in that cloud's own vocabulary.

## Profiles and levels: the first decision you make

Each benchmark organizes its recommendations into **Level 1** and
**Level 2** profiles:

- **Level 1** recommendations are baseline security configurations
  that should have minimal impact on performance or usability — think
  "enable MFA for privileged accounts" or "enable diagnostic logging."
  Nearly every organization should implement all Level 1 items.
- **Level 2** recommendations go further and can introduce real
  operational tradeoffs — more restrictive network rules, stricter key
  rotation requirements, tighter default-deny postures. These are
  "defense in depth" items you adopt deliberately, based on your
  actual risk tolerance, not by default.

Before you run a single scan, decide which profile you're building a
baseline against. Most organizations start every new environment at
Level 1, treat it as non-negotiable, and then selectively adopt Level
2 items where the tradeoff is justified.

## Reading a real recommendation

Take CIS Azure Foundations Benchmark recommendation 1.1, "Ensure that
multi-factor authentication is enabled for all privileged users."
Structurally, every CIS recommendation gives you:

1. **The rationale** — privileged accounts (Global Administrator,
   Security Administrator) are the highest-value target; MFA
   dramatically reduces account-takeover risk even if a password is
   compromised.
2. **The audit procedure** — concretely, check the Entra ID "Security
   defaults" or Conditional Access policies to confirm MFA is required
   for roles in the Global Administrator, Privileged Role
   Administrator, and similar categories.
3. **The remediation** — enable a Conditional Access policy requiring
   MFA for those roles, or enable security defaults as a baseline if
   Conditional Access (which requires Entra ID P1/P2) isn't licensed.

The AWS equivalent, from the CIS AWS Foundations Benchmark, "Ensure
MFA is enabled for the 'root' user account," has the same three-part
shape: rationale (root is the single most powerful AWS identity),
audit (check the IAM console or run `aws iam get-account-summary`),
remediation (enable a hardware or virtual MFA device on the root
account and avoid using root for daily operations at all).

## From baseline to enforcement

A baseline only matters if something keeps you on it. This is where
the chapter's earlier lessons connect directly to tooling:

- **Microsoft Defender for Cloud** ships the CIS Microsoft Azure
  Foundations Benchmark as a built-in regulatory compliance standard —
  turn it on and your secure score reflects real-time pass/fail
  against every applicable recommendation.
- **AWS Security Hub** ships the CIS AWS Foundations Benchmark the
  same way, as a built-in standard you enable per account, with
  continuous automated checks against each control.
- **Azure Policy** and **AWS Config rules** are how you enforce
  specific CIS recommendations proactively — for example, a policy
  that denies creation of a storage account without
  `https-only` enforced, rather than just flagging it after the fact.

A mature baseline isn't a document you write once. It's a CIS profile
you've chosen, wired into a posture tool that continuously measures
drift against it, with policy enforcement catching violations before
they ever reach "finding" status.

## Key terms

| Term | Meaning |
|---|---|
| CIS Benchmark | A consensus-built, vendor-specific checklist of testable security configuration recommendations, published by the Center for Internet Security |
| Level 1 | Baseline recommendations with minimal operational tradeoff; adopted by nearly every organization |
| Level 2 | Defense-in-depth recommendations with real tradeoffs, adopted deliberately based on risk tolerance |
| Audit procedure | The documented, repeatable steps a CIS recommendation specifies for checking current compliance state |
| Regulatory compliance standard | A built-in Defender for Cloud / Security Hub feature that continuously scores an environment against a named framework like a CIS Benchmark |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: what
are the three parts of every CIS recommendation, what's the practical
difference between adopting Level 1 versus Level 2, and name one Azure
tool and one AWS tool that each turn a CIS Benchmark into a
continuously measured baseline rather than a static document.
