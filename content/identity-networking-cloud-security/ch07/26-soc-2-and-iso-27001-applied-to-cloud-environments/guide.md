# Lesson 26 — SOC 2 and ISO 27001 Applied to Cloud Environments

**Chapter 7 · Compliance in the Cloud · Lesson 26 of 32**

## What you'll learn

- What SOC 2 actually is — an independent auditor's attestation report, not a pass/fail
  certificate — and the five Trust Services Criteria it evaluates against
- The difference between a SOC 2 Type I report and a SOC 2 Type II report
- What ISO 27001 recognizes instead: a certified Information Security Management System (ISMS),
  applied specifically to a cloud environment
- How the real controls you've already built in this course — access control, logging,
  encryption, incident response — become the actual evidence for both frameworks

## SOC 2: an attestation, not a certificate

SOC 2 is built on standards from the AICPA (the American Institute of Certified Public
Accountants). An independent auditor examines a service organization's controls and writes a
**report** stating their opinion on whether those controls meet one or more of the **Trust
Services Criteria**. That's a meaningfully different shape than ISO 27001's pass/fail
certification: there's no single "SOC 2 certified" badge. Companies typically share their SOC 2
report directly with prospective customers, under NDA, as part of a vendor security review —
which is exactly why B2B SaaS companies are asked for one constantly.

A SOC 2 report comes in two flavors. A **Type I** report evaluates whether controls were
suitably *designed* at a single point in time. A **Type II** report goes further, testing whether
those controls actually *operated effectively* over a review period — typically six to twelve
months. Type II is the one serious enterprise buyers ask for, because it proves the controls
weren't just written down, they were running.

## The five Trust Services Criteria

SOC 2 evaluates against up to five categories, and an organization chooses which ones apply to
its own report:

```
Security               (the only mandatory criterion)
Availability
Processing Integrity
Confidentiality
Privacy

Most B2B SaaS audits scope to:
  Security + Availability + Confidentiality
```

Security is mandatory in every SOC 2 report; the other four are scoped in based on what the
company actually does — a payments company is far more likely to include Processing Integrity
than a static content platform would be.

## ISO 27001 applied to the cloud: the ISMS and its controls

You already learned that ISO 27001 is an international standard specifying requirements for an
**Information Security Management System (ISMS)** — the ongoing, organization-wide process of
managing information security risk. Applied to a cloud environment specifically, that means
defining an ISMS scope that explicitly includes your cloud accounts and workloads, then selecting
and implementing the relevant Annex A control areas against that scope — access control,
cryptography, operations security logging, and supplier relationships (which is exactly where
your relationship with AWS or Microsoft itself gets documented). An accredited certification body
then audits the ISMS and issues a **three-year certificate**, with annual surveillance audits in
between to confirm it's still being followed.

## Same real controls, now framed as evidence

Here's the part that should feel familiar: you built almost all of this evidence already,
earlier in this course, for reasons that had nothing to do with an audit. IAM policies and
enforced MFA are evidence for SOC 2's Security criterion *and* ISO 27001's access control area.
Retained CloudTrail or Azure Monitor logs are evidence for SOC 2 Security *and* ISO 27001's
operations security controls. Key Vault or KMS encryption-at-rest configuration is evidence for
SOC 2 Confidentiality *and* ISO 27001's cryptography controls. A tested incident response runbook
is evidence for both frameworks' incident management expectations. Compliance work, in practice,
is mostly about documenting and producing controls you've already built — not inventing new ones.

## Key terms

| Term | Meaning |
|---|---|
| SOC 2 | An AICPA-based attestation report in which an independent auditor opines on whether a service organization's controls meet chosen Trust Services Criteria |
| Trust Services Criteria | The five categories SOC 2 evaluates against: Security, Availability, Processing Integrity, Confidentiality, Privacy |
| SOC 2 Type I vs. Type II | Type I reviews control design at a point in time; Type II tests operating effectiveness over a period, typically six to twelve months |
| ISO 27001 certification | A three-year certificate from an accredited body confirming an organization's ISMS meets the standard, with annual surveillance audits |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why does a SOC 2 Type II report
carry more weight with an enterprise buyer than a SOC 2 Type I report?
