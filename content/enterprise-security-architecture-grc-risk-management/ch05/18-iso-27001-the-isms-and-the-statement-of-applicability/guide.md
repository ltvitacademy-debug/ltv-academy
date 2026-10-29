# Lesson 18 — ISO 27001: The ISMS and the Statement of Applicability

**Chapter 5 · Regulatory Compliance Frameworks · Lesson 18 of 20**

## What you'll learn

- Why ISO/IEC 27001 is fundamentally different from SOC 2 — it
  certifies a **management system**, not a point-in-time report
- What an **ISMS (Information Security Management System)** actually
  is, and why it's a continuous process, not a static document
- What the **Statement of Applicability (SoA)** is, why it's the
  single most revealing document in an ISO 27001 certification, and
  how it maps to Annex A controls
- The real shape of the certification process: initial audit, ongoing
  surveillance audits, and periodic recertification

## A certification, not a report

ISO/IEC 27001 is an international standard published jointly by ISO
and IEC, and it works differently from SOC 2 in a way that matters.
Where SOC 2 produces an attestation **report** describing what an
auditor found, ISO 27001 results in a **certification** — issued by
an accredited certification body — that an organization's management
system meets the standard's requirements. That's not a cosmetic
difference. A SOC 2 report describes controls at a point in time or
over a review window. An ISO 27001 certificate asserts that an entire
*system for managing* information security risk is in place, working,
and subject to ongoing external surveillance.

## The ISMS: a management system, not a checklist

The core object ISO 27001 certifies is the **Information Security
Management System**, or ISMS — the organization's documented,
risk-based approach to identifying, treating, and continuously
improving how it manages information security risk. The standard's
main clauses (4 through 10) require things like a defined ISMS scope,
top management commitment, a documented risk assessment methodology,
a risk treatment process, defined roles and responsibilities,
competence and awareness requirements, and a cycle of internal audits
and management review. This is the part people new to ISO 27001
consistently underestimate: the certification isn't really about
which specific controls you've implemented. It's about whether you
have a functioning *system* — risk assessment feeding into decisions,
decisions feeding into controls, controls being monitored, monitoring
feeding back into the next risk assessment — the Plan-Do-Check-Act
cycle that runs underneath the whole standard.

## Annex A and the Statement of Applicability

ISO 27001 ships with **Annex A**, a reference list of control
objectives and controls (93 controls across 4 themes in the current
2022 revision: organizational, people, physical, and technological).
Annex A is not a mandatory checklist every organization must
implement in full — it's a catalog an organization draws from based
on its own risk assessment.

The document that makes that selection explicit, auditable, and
genuinely useful to a reviewer is the **Statement of Applicability
(SoA)**. For every Annex A control, the SoA records:

- Whether the control is **applicable** to this organization
- If applicable, whether it's **implemented**, and a reference to how
- If **not applicable**, a documented **justification** for excluding
  it

That last part is what makes the SoA so revealing. An organization
that excludes "cryptographic controls" because it genuinely stores no
sensitive data in a way that needs encryption, and says so explicitly,
is behaving exactly as the standard intends — applicability is
supposed to be risk-driven, not maximalist. A SoA that excludes a
control with a vague or missing justification is a real red flag in
due diligence, and anyone evaluating a vendor's ISO 27001 certificate
should ask to see the SoA itself, not just the certificate.

## The certification process over time

ISO 27001 certification isn't a one-time event:

1. **Stage 1 audit** — the certification body reviews ISMS
   documentation and readiness.
2. **Stage 2 audit** — the certification body tests whether the ISMS
   is actually implemented and operating, which results in
   certification if successful.
3. **Surveillance audits** — typically annual, smaller-scope audits
   confirming the ISMS is still functioning between full
   recertifications.
4. **Recertification audit** — a full reassessment, typically every
   three years.

That cadence is the practical reason ISO 27001 certification tends to
reflect a genuinely sustained program rather than a one-time push:
losing the thread of continuous risk assessment and control monitoring
shows up at the next surveillance audit, not three years later.

## Key terms

| Term | Meaning |
|---|---|
| ISO/IEC 27001 | International standard; certifies an organization's Information Security Management System against accredited audit |
| ISMS | The organization's documented, risk-based system for managing information security — the thing actually certified |
| Annex A | ISO 27001's reference catalog of control objectives/controls to draw from based on risk, not a mandatory checklist |
| Statement of Applicability (SoA) | The document mapping each Annex A control to applicable/implemented or not-applicable-with-justification |
| Surveillance audit | Smaller, typically annual audit confirming the ISMS still functions between full recertifications |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
is the Statement of Applicability considered more informative to a
due-diligence reviewer than the ISO 27001 certificate itself, and what
makes a SoA entry for an excluded control legitimate versus a red flag?
