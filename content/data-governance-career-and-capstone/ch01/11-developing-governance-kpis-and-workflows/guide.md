# Lesson 11 — Developing Governance KPIs and Workflows

**Chapter 1 · Capstone: LTV Global Data Governance Program · Lesson 11 of 35**

## What you'll learn

- A small set of governance KPIs that actually measure whether the
  last ten lessons' work is holding up
- A four-stage issue workflow: detect, triage, resolve, review
- How the Lesson 7 failures report and the Lesson 10 access policy
  both feed these same KPIs
- Why one of the KPIs ties directly back to the Lesson 1 incident

**Reminder:** LTV Global and every number below are fictional and
illustrative, invented for this capstone.

## The KPIs

Marcus Ibe proposes five KPIs to Dana Whitfield — deliberately few,
because a long KPI list nobody checks is worse than a short one people
actually review monthly:

| KPI | What it measures | Target |
|---|---|---|
| CDE ownership coverage | % of documented CDEs with a named, current owner and steward | 100% |
| Quality check pass rate | % of rows passing the Lesson 7 `UNION ALL` failures report, weekly | 99%+ per rule |
| Average issue resolution time | Days from a steward flagging an issue to it being resolved | Under 5 business days |
| Access recertification completion | % of Confidential/Restricted role assignments reviewed each quarter | 100% |
| Access request response time | Days to fully answer a data subject access request | Under 10 business days |

That last KPI is a direct answer to Lesson 1: the DSAR that took six
weeks is now a measured, targeted number, not an ad hoc scramble the
next time one arrives.

## The four-stage issue workflow

A KPI only means something if there's a workflow producing the
numbers behind it. Every issue — a failed quality check, a disputed
authoritative-source call, an access request — moves through the same
four stages:

1. **Detect.** A steward notices a failure (the Lesson 7 report
   flags a row) or receives a request (a DSAR arrives at Customer
   Support).
2. **Triage.** The steward classifies severity using the Lesson 3 CDE
   criteria — does this involve a CDE, is it regulatory, how many
   records are affected — and logs it with a target resolution date.
3. **Resolve.** The steward fixes what's within their authority; a
   decision above their authority (an authoritative-source dispute, a
   DSAR) escalates to the domain owner, following the Lesson 4 RACI.
4. **Review.** Closed issues roll up into the monthly KPI report Dana
   Whitfield takes to the board — the same report that would have
   caught the Lesson 1 pattern months earlier if it had existed then.

## Why this workflow, not a heavier one

LTV Global deliberately keeps this to four stages and five KPIs rather
than building an elaborate ticketing taxonomy. A small company-wide
program that nobody can explain in one sentence doesn't get followed;
a four-stage workflow a steward can recite from memory does. The
discipline mirrors Lesson 3's CDE scoring and Lesson 6's classification
pass: do the few things that earn the rigor, not everything equally.

## Key terms

| Term | Meaning |
|---|---|
| Governance KPI | A small, regularly reviewed metric measuring whether governance controls are actually working |
| Issue workflow | The repeatable sequence (detect, triage, resolve, review) an issue moves through from discovery to close |
| Recertification | Periodically re-confirming that existing access assignments are still justified |

## Lab

Pick one KPI from the table above and write a one-paragraph plan for
how you'd actually produce that number monthly: what query or report
generates it, who reviews it, and what happens if the target is
missed two months in a row.

## Check yourself

- Which KPI in this lesson directly answers the Lesson 1 incident, and
  what's its target?
- Name the four stages of the issue workflow, in order.
- Why did Marcus Ibe propose five KPIs instead of fifteen?
