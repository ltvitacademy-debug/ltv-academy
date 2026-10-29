# Lesson 20 — Mapping One Control to Multiple Frameworks

**Chapter 5 · Regulatory Compliance Frameworks · Lesson 20 of 20**

## What you'll learn

- Why real compliance programs don't build a separate set of controls
  for every framework — they build **one control environment** and
  map it against several frameworks at once
- How a single well-designed access-review control can satisfy SOC 2,
  ISO 27001, and PCI DSS requirements simultaneously, with one piece
  of evidence
- What a **compliance control mapping (crosswalk)** actually looks
  like in practice, and why it's the central artifact of mature GRC
  tooling
- The real limits of mapping: where frameworks' requirements genuinely
  diverge and a single control isn't enough

## The problem: multiplying frameworks, not multiplying work

By this point in the chapter you've seen four separate frameworks:
SOC 2's Trust Services Criteria, ISO 27001's Annex A controls, PCI
DSS's 12 requirements, and HIPAA's Security Rule safeguards. An
organization handling payment data, selling to enterprise customers,
and holding both a SOC 2 report and an ISO 27001 certificate is not
unusual — and if it built a fully separate control implementation for
each framework, the operational overhead would be enormous: four
different access-review processes, four different sets of evidence,
four audits each demanding its own fresh walkthrough of essentially
the same underlying control.

Mature compliance programs don't do that. They build **one real
control**, implement it once, and **map** that single control against
every framework's corresponding requirement.

## A worked example: quarterly access reviews

Take a concrete, common control: a quarterly review of user access to
a production system, where a manager or system owner confirms each
person's access is still appropriate for their current role, and
removes anything that isn't.

That one control, implemented and evidenced once, satisfies real
requirements across multiple frameworks at the same time:

- **SOC 2** — evidence supporting the Security criterion's logical
  access controls, and specifically the kind of sampled evidence a
  Type II auditor tests for access appropriateness over the review
  period.
- **ISO 27001** — evidence for the Annex A control objective covering
  access rights review (part of the organizational controls theme),
  referenced directly in the Statement of Applicability.
- **PCI DSS** — evidence for the requirement that access to
  cardholder data be restricted on a need-to-know basis and reviewed
  periodically, if that system is inside the CDE.

One quarterly review, one piece of evidence — a completed review
spreadsheet or ticket, with sign-off and a timestamp — gets reused
across three separate audits instead of being recreated three times.

## The crosswalk: the central artifact of real GRC work

The document (or, in modern tooling, the live database record) that
makes this mapping explicit is a **compliance control mapping**, often
called a **crosswalk**. In its simplest form, it's a table: one row
per internal control, with columns showing which specific requirement
in each framework that control satisfies. GRC platforms (the kind
discussed back in Chapter 4) automate exactly this — a single control
object in the system, tagged against SOC 2 CC6.1, ISO 27001 A.5.18,
and PCI DSS Requirement 7, so that uploading one piece of evidence
updates the status of all three simultaneously.

This is also precisely why a strong GRC program, done right, becomes
*more* efficient as it adds frameworks, not less — most of the real
engineering work (building the access-review process itself) was
already done for the first framework. Adding ISO 27001 after already
holding SOC 2 is largely a mapping exercise, not a from-scratch build.

## Where mapping breaks down

Crosswalks aren't universal translators, and a careful compliance
engineer knows where they stop working:

- **Different evidence depth.** PCI DSS sometimes requires more
  specific technical evidence (like confirming encryption algorithm
  and key length) than a general access-review control captures.
- **Different scope.** A control scoped to "production systems"
  broadly may not cover the narrower Cardholder Data Environment PCI
  DSS actually cares about, or vice versa.
- **Different cadence requirements.** One framework might require
  monthly review where another accepts quarterly — the control has to
  be built to the strictest cadence any mapped framework requires, not
  the loosest.

A real crosswalk documents these gaps honestly rather than papering
over them, which is exactly the difference between control mapping
done well and a GRC tool being used to manufacture the illusion of
coverage that isn't really there.

## Key terms

| Term | Meaning |
|---|---|
| Control mapping / crosswalk | A document or system record linking one internal control to the specific requirement it satisfies in each applicable framework |
| Reused evidence | One piece of evidence (e.g., a completed access review) submitted across multiple audits instead of recreated for each |
| Strictest-requirement design | Building a control to the most demanding cadence/scope among all frameworks it's mapped to, not the most lenient |

## Check yourself

This closes Chapter 5. You're ready for Chapter 6 when you can explain,
without looking: using the quarterly access-review example, name the
specific SOC 2, ISO 27001, and PCI DSS requirements it can satisfy at
once, and describe one real scenario where a single control mapped to
multiple frameworks would NOT be sufficient on its own.
