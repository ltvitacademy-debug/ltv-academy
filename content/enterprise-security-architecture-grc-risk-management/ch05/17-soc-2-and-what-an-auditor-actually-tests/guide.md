# Lesson 17 — SOC 2, and What an Auditor Actually Tests

**Chapter 5 · Regulatory Compliance Frameworks · Lesson 17 of 20**

## What you'll learn

- What a SOC 2 report actually is, who issues it, and why it isn't a
  "certification" the way people loosely call it one
- The five real **Trust Services Criteria** — Security, Availability,
  Processing Integrity, Confidentiality, and Privacy — and why Security
  is the only one every SOC 2 report must include
- The real difference between a **Type I** and a **Type II** report:
  point-in-time control design vs. operating effectiveness over a
  review period
- What an auditor is actually doing during fieldwork, and why "we have
  a policy document" is never enough evidence on its own

## SOC 2 is a report, not a certification

SOC 2 — System and Organization Controls 2 — is an attestation
framework published by the AICPA (American Institute of Certified
Public Accountants). A licensed CPA firm performs the audit and issues
a **report**, not a certificate. That distinction matters in practice:
there's no SOC 2 logo a company is "awarded," and no central registry
to check. What a customer actually receives is a lengthy report,
usually shared under NDA, describing the service organization's
control environment and the auditor's independent opinion on it. When
a vendor says "we're SOC 2 compliant," what they mean is "an
independent CPA firm examined our controls and issued a report with a
clean opinion" — and a real due-diligence review reads that report
rather than taking the claim at face value.

## The five Trust Services Criteria

Every SOC 2 engagement is scoped against one or more of the AICPA's
**Trust Services Criteria (TSC)**:

- **Security** — the common criteria: protection against unauthorized
  access, both logical and physical. This one is mandatory in every
  SOC 2 report, regardless of which others are in scope.
- **Availability** — whether systems are available for operation and
  use as committed or agreed.
- **Processing Integrity** — whether system processing is complete,
  valid, accurate, timely, and authorized.
- **Confidentiality** — whether information designated as confidential
  is protected as committed or agreed.
- **Privacy** — how personal information is collected, used, retained,
  disclosed, and disposed of, relative to the organization's privacy
  notice.

A company scopes its audit to the criteria that actually matter for
its service. A payroll processor will almost always include Processing
Integrity; a SaaS analytics platform that never stores personal data
may reasonably leave Privacy out of scope. Security alone, with
nothing else added, is still a valid SOC 2 report — it's the floor,
not an edge case.

## Type I vs. Type II: design vs. operation

This is the distinction that trips people up most, and it's the one
to know cold:

- **Type I** examines whether controls are **suitably designed** as of
  a single specified date. It answers: "if these controls operated as
  described, would they achieve the stated objective?" It does not
  test whether they actually ran that way over time.
- **Type II** examines the same control descriptions, but tests their
  **operating effectiveness** across a review period — typically six
  to twelve months. The auditor pulls evidence from throughout that
  window: access review logs from three different months, a sample of
  actual change-management tickets, termination records tied to
  access-revocation timestamps.

A Type I report can be produced quickly and is common for a company's
first SOC 2 engagement. A Type II report is what serious enterprise
customers actually ask for in vendor due diligence, because a control
that was designed well on June 1st but never consistently followed by
October tells a buyer almost nothing about real risk.

## What an auditor actually tests

"We have an access control policy" is a design claim. A Type II
auditor's fieldwork is built around collecting **evidence**, not
reading policy documents:

- Pulling a sample of new-hire tickets and confirming access was
  provisioned only after manager approval, matching the documented
  process
- Pulling a sample of terminated employees and confirming access was
  revoked within the committed window — not just that a policy says it
  should be
- Reviewing change-management records for a sample of production
  deployments, checking for a documented approval step before merge
- Requesting screenshots or system-generated logs as corroborating
  evidence, not a self-reported checklist from the control owner

If the sample turns up even one exception — a termination where access
lingered for two weeks — the auditor documents it as a finding. Real
SOC 2 Type II reports routinely contain a handful of noted exceptions;
a report with zero exceptions across every control, every sample, every
month of the period is unusual enough that a sophisticated reviewer
treats it with more scrutiny, not less.

## Key terms

| Term | Meaning |
|---|---|
| SOC 2 | AICPA attestation framework; a CPA firm's independent report on a service organization's controls, not a certificate |
| Trust Services Criteria (TSC) | The five scoped categories: Security (mandatory), Availability, Processing Integrity, Confidentiality, Privacy |
| Type I | Tests control **design** as of one point in time |
| Type II | Tests control **operating effectiveness** with sampled evidence across a review period (often 6-12 months) |
| Exception | A documented instance where sampled evidence showed a control didn't operate as described |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
is a Type II report generally considered stronger evidence than a
Type I report for the same set of controls, and what kind of evidence
is an auditor actually sampling to reach that opinion?
