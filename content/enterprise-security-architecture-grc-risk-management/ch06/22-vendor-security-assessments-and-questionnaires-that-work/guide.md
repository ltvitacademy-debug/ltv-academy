# Lesson 22 — Vendor Security Assessments and Questionnaires That Work

**Chapter 6 · Third-Party and Vendor Risk Management · Lesson 2 of 4**

## What you'll learn

- Why standardized questionnaires like SIG and CAIQ exist, and what
  problem they actually solve compared to a custom questionnaire
  built from scratch for every vendor
- How to tier vendors by data sensitivity and access level so
  assessment depth actually matches real risk
- What evidence beyond a self-reported questionnaire answer a real
  assessment should demand, and why
- The specific failure mode — treating every vendor identically —
  that quietly wastes a GRC team's time and under-protects the
  vendors that matter most

## The problem a standardized questionnaire solves

If every vendor assessment starts from a blank page, two things go
wrong at scale. First, every vendor has to answer a slightly
different set of questions depending on which analyst wrote them,
which makes answers impossible to compare across vendors or reuse
across customers. Second, the vendor being assessed — who is often
answering the same kind of questionnaire from dozens of different
customers every year — has no way to reuse a prior answer set, so
assessment fatigue sets in on both sides. Two standardized
questionnaires exist specifically to fix this:

**SIG (Standardized Information Gathering)**, maintained by Shared
Assessments, is a comprehensive, modular questionnaire covering
governance, access control, data handling, incident response,
business continuity, and more. Vendors frequently maintain a
completed SIG on file and share it with multiple customers, and
a SIG Lite version exists for lower-risk engagements that don't
need the full depth.

**CAIQ (Consensus Assessments Initiative Questionnaire)**, published
by the Cloud Security Alliance, is built specifically around cloud
service providers and maps directly to the CSA's Cloud Controls
Matrix (CCM) — so a "yes" answer to a CAIQ question corresponds to a
specific, named control in a specific, published framework, not just
a vendor's own wording.

Using one of these instead of a bespoke questionnaire means the
answers are comparable across vendors, the vendor can often reuse
work it's already done for other customers, and the questions
themselves have already been stress-tested by a large community of
security and risk practitioners.

## Tiering: not every vendor deserves the same depth

The single most common and most expensive mistake in vendor risk
management is treating every vendor identically — running the exact
same full questionnaire, review cycle, and sign-off process for a
cloud infrastructure provider holding regulated customer data and for
a company that supplies office snacks. That approach burns the GRC
team's limited time on low-risk vendors while a genuinely high-risk
vendor gets the same rubber-stamped review as everyone else. A real
program tiers vendors first, typically along two axes:

- **Data sensitivity**: does this vendor touch regulated or
  confidential data (customer PII, health records, payment data,
  intellectual property), or none at all?
- **Access level**: does this vendor have network access, system
  access, or physical access to your environment, or is it a
  fully external service with no access at all?

A vendor that's high on both axes — a payroll processor handling
employee PII with a direct system integration, for example — lands
in **Tier 1**: full SIG or equivalent, SOC 2 or ISO 27001 report
review, and the contractual protections covered in Lesson 23. A
vendor that's low on both axes — a marketing analytics tool that
only sees aggregated, non-sensitive data — might warrant a light
intake questionnaire and nothing more. Most vendors land somewhere in
between, in a **Tier 2** that gets a moderate review: SIG Lite or
CAIQ, with targeted follow-up questions on whichever risk area
matters most for that specific vendor relationship.

## Evidence, not just answers

A questionnaire response is a self-attestation — the vendor is
grading its own homework. A mature assessment process backs the
highest-risk tiers with independent evidence: a current SOC 2 Type II
report (which covers controls operating effectively over a period of
time, not just at a point in time), an ISO 27001 certificate and its
Statement of Applicability, a recent penetration test executive
summary, or evidence of a working incident response plan. None of
this replaces the questionnaire — it corroborates it. A vendor that
answers every SIG question perfectly but can't produce a SOC 2 report
or any audit evidence when asked is itself a finding worth escalating.

## What this buys the organization

Tiered, evidence-backed assessment means the highest-risk vendor
relationships get the scrutiny they actually warrant, while the GRC
team isn't drowning in full-depth reviews for vendors that pose
almost no real risk. That's the whole point of risk-based prioritization
from Chapter 3 applied to a specific domain. None of this is a
one-time gate at vendor intake, though — Lesson 24 covers why a
vendor that passed its assessment cleanly last year can still be a
very different risk today.

## Key terms

| Term | Meaning |
|---|---|
| SIG (Standardized Information Gathering) | A comprehensive, modular vendor security questionnaire maintained by Shared Assessments; SIG Lite is a shorter version for lower-risk vendors |
| CAIQ | The Cloud Security Alliance's Consensus Assessments Initiative Questionnaire, built for cloud providers and mapped to the CSA Cloud Controls Matrix (CCM) |
| Vendor tiering | Classifying vendors by data sensitivity and access level so assessment depth matches actual risk instead of treating every vendor identically |
| SOC 2 Type II report | Independent audit evidence that a vendor's controls operated effectively over a period of time, used to corroborate questionnaire answers |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what
problem SIG and CAIQ actually solve compared to a custom questionnaire,
and how data sensitivity and access level combine to put a vendor into
a specific assessment tier.
