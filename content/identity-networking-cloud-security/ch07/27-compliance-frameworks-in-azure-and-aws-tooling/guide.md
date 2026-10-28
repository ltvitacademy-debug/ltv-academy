# Lesson 27 — Compliance Frameworks in Azure and AWS Tooling

**Chapter 7 · Compliance in the Cloud · Lesson 27 of 32**

## What you'll learn

- What Microsoft Purview Compliance Manager actually does — scoring your environment against a
  chosen framework and listing specific technical and non-technical improvement actions
- What Azure Policy's regulatory compliance initiatives do, and how they build directly on the
  Defender for Cloud compliance dashboard from Chapter 5
- What AWS Audit Manager does — continuously collecting evidence against a prebuilt framework to
  shorten audit preparation
- What an AWS Config conformance pack is, and how it turns an entire framework into one
  deployable set of automated checks

## Microsoft Purview Compliance Manager

**Microsoft Purview Compliance Manager** gives an organization a **compliance score** based on
how many recommended actions — mapped to a regulation or standard you choose, such as ISO 27001,
NIST CSF, or GDPR — have actually been completed. It doesn't stop at technical configuration
either: alongside actions it can verify automatically (like whether MFA is enforced tenant-wide),
it also tracks non-technical actions, like whether a written incident response policy actually
exists, and lets you mark those complete once they're in place. The score itself isn't the point
— the list of specific, named gaps underneath it is.

## Azure Policy's regulatory compliance initiatives

Chapter 5 introduced Microsoft Defender for Cloud's compliance dashboard and its compliance
scoring. **Azure Policy regulatory compliance initiatives** are what actually feed that dashboard:
Azure ships built-in initiatives — bundles of individual policy definitions — mapped to named
frameworks like ISO 27001:2013, NIST SP 800-53, or PCI DSS. Assigning one of these initiatives to
a subscription evaluates your *actual* resource configurations against each control in that
framework, continuously, and reports the result straight into the Regulatory Compliance view you
already saw in Chapter 5. It's the same dashboard — this is where its data actually comes from.

## AWS Audit Manager

**AWS Audit Manager** takes a different angle on the same problem: instead of scoring your
current state once, it continuously collects **evidence** against a framework you choose from its
prebuilt list, which includes SOC 2, PCI DSS, CIS Benchmarks, and ISO 27001. That evidence is
pulled automatically from sources you already have running — AWS Config, CloudTrail, Security Hub
findings — and organized by control, so that by the time a real audit starts, most of the evidence
has already been gathered instead of scrambled together the week before.

## AWS Config conformance packs

An **AWS Config conformance pack** is a single deployable collection of AWS Config rules — and
optionally, automated remediation actions — that together evaluate your resources against an
entire framework's worth of controls at once. AWS publishes sample conformance packs for named
frameworks, so instead of wiring up dozens of individual Config rules by hand, you deploy one
pack and get the whole set evaluating your account immediately.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview Compliance Manager | Scores an environment against a chosen framework and lists specific technical and non-technical improvement actions |
| Azure Policy regulatory compliance initiative | A built-in bundle of policy definitions mapped to a named framework, feeding the Defender for Cloud compliance dashboard |
| AWS Audit Manager | Continuously collects evidence against a prebuilt framework to shorten audit preparation |
| AWS Config conformance pack | A deployable collection of Config rules, and optional remediation, that evaluates resources against a framework as one unit |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: how does an Azure Policy
regulatory compliance initiative connect to the Defender for Cloud compliance dashboard you
learned about in Chapter 5?
