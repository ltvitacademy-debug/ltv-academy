# Lesson 19 — Microsoft Defender for Cloud and AWS Security Hub Concepts

**Chapter 5 · Cloud Security Posture Management · Lesson 3 of 4**

## What you'll learn

- What Microsoft Defender for Cloud actually is, and what its Secure Score represents
- Why Defender for Cloud isn't limited to Azure resources
- What AWS Security Hub actually does, and why it's an aggregator rather than a scanner of its own
- The real AWS services and standards Security Hub pulls together, and the pattern both tools share

## Microsoft Defender for Cloud: Azure's native CSPM

**Microsoft Defender for Cloud** is Azure's native CSPM tool, combined with workload protection
for the specific resources it's actively monitoring. Its most visible output is the **Secure
Score**: a single percentage summarizing how closely an environment currently matches the
**Microsoft Cloud Security Benchmark**, built from the specific recommendations Defender for
Cloud has generated — findings like the public-storage and open-security-group patterns covered
in Lesson 18. Despite its name, Defender for Cloud isn't limited to watching Azure. It can also
connect to and assess AWS and GCP accounts from the same dashboard, which is why it's described as
a multicloud posture tool rather than an Azure-only one.

## AWS Security Hub: an aggregation point, not a separate scanner

**AWS Security Hub** plays a conceptually similar role for AWS, but it works differently under
the hood: it's primarily an **aggregator**. AWS already runs dedicated services that each do one
specific security job — **GuardDuty** for threat detection, **Inspector** for vulnerability
scanning, **Macie** for sensitive-data discovery, **IAM Access Analyzer** for permission checks —
and Security Hub pulls their findings, along with findings from supported third-party tools, into
one consolidated dashboard instead of leaving a team to check each service separately.

## Checking the aggregated picture against standards

Once Security Hub has that consolidated view, it checks it against recognized security standards
— the **CIS AWS Foundations Benchmark**, the **AWS Foundational Security Best Practices**
standard, and **PCI DSS**, among others — and reports a compliance score for each standard a team
has enabled. So Security Hub isn't competing with GuardDuty or Inspector; it's the layer on top
that turns their separate outputs into one scored, standards-based view.

```
Microsoft Defender for Cloud
  CSPM + workload protection
  Secure Score (0-100%)
  Checked against the Microsoft Cloud Security Benchmark
  Can also assess AWS & GCP accounts

AWS Security Hub
  Aggregates findings from GuardDuty, Inspector,
  Macie, IAM Access Analyzer, and 3rd-party tools
  Checked against CIS AWS Foundations Benchmark,
  AWS Foundational Security Best Practices, PCI DSS
```

## The same job, two different approaches

Strip away the product names and both tools are solving the same problem from a different
direction. Defender for Cloud is built as a CSPM engine first, with its own checks and its own
Secure Score, and extends outward to also cover AWS and GCP. Security Hub is built as an
aggregation layer first, consolidating output from AWS's already-existing specialized services and
scoring the combined result against a standard. An organization running a hybrid Azure/AWS
environment might reasonably use both: Defender for Cloud as the cross-cloud posture view, and
Security Hub as the deep AWS-native aggregation point feeding into it.

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Defender for Cloud | Azure's native CSPM + workload protection tool; reports a Secure Score and can also assess AWS/GCP |
| Secure Score | Defender for Cloud's percentage summarizing alignment with the Microsoft Cloud Security Benchmark |
| AWS Security Hub | An AWS service that aggregates findings from AWS's own security services and third-party tools into one view |
| GuardDuty / Inspector / Macie | Dedicated AWS security services (threat detection, vulnerability scanning, sensitive-data discovery) whose findings feed into Security Hub |
| CIS AWS Foundations Benchmark | A recognized security standard Security Hub checks the aggregated findings against |

## Check yourself

Explain the structural difference between how Microsoft Defender for Cloud produces its findings
and how AWS Security Hub produces its findings — one runs its own checks directly, the other
primarily aggregates. Why does that difference matter when deciding how the two tools fit together
in a hybrid Azure/AWS environment?
