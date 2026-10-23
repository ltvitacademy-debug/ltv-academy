# Lesson 21 — CMDB Governance: Ownership & Stewardship

**Chapter 5 · Data Quality & Governance · Lesson 21 of 26**

## What you'll learn

- Why Chapter 1's honest framing of "data quality is hard" points directly at a governance gap, not just a technical one
- What a real Business/Technical Service Owner and CI-class-level data owner are actually accountable for
- Why a defined review cadence matters as much as the initial cleanup
- The real, well-documented reason most CMDB implementations fail

## The honest reason most CMDBs fail

Chapter 1 Lesson 3 set up this course's framing honestly: CMDB data quality is genuinely hard, and nothing about Discovery, Identification Rules, or Reconciliation Rules makes it automatically stay good forever. This lesson follows through on that framing with the real, well-documented reason most CMDB implementations fail in practice — and it is almost never a technical platform limitation. Organizations stand up Discovery, configure solid Identification and Reconciliation rules, run an initial cleanup, and the dashboard from Lesson 18 shows a great score on launch day. Then, six to twelve months later, nobody is accountable for keeping it that way, and the score quietly slides back down. The platform didn't fail. The governance around it was never built.

## Named ownership, not a shared responsibility

The real fix is unglamorous and specific: every Business Service and Technical Service needs a named, individual owner, and every CI class needs a data owner accountable for that class's ongoing accuracy — not a team, not "IT," a specific named person. This matters because "everyone owns the data" in practice means no one owns the data; when a Health Dashboard Completeness score drops on `cmdb_ci_server`, there needs to be one person whose job it is to notice and act, not a diffuse expectation that someone eventually will.

A **Business/Technical Service Owner** is accountable for whether the service's representation in the CMDB — its CIs, its dependency mapping, its relationships to the business capabilities it supports — stays accurate as the service itself changes. A **CI-class-level data owner** is accountable for the data quality of a specific CI class across the whole CMDB, regardless of which business service any individual CI happens to support — the person who owns `cmdb_ci_server` data quality cares about every server CI, not just the ones tied to one application.

## A review cadence, not a one-time event

Ownership without a schedule tends to collapse into "I'll get to it eventually." A real governance model defines a recurring review cadence — commonly quarterly — where each data owner reviews their current Health Dashboard scores, confirms whether flagged duplicate pairs have been merged, and signs off that their CI class or service's data is still accurate, or opens a remediation item if it isn't. This is the mechanism that actually closes the loop from Lesson 18's dashboard: a score by itself doesn't fix anything, but a score plus a named owner plus a scheduled review genuinely does.

## Technical configuration is necessary, not sufficient

None of this replaces Discovery, Identification Rules, or Reconciliation Rules — those remain the actual technical mechanisms that produce accurate data. But technical configuration alone has no memory and no accountability; it will happily let a correct CMDB decay the moment nobody is watching the dashboard. Governance is what gives the technical configuration a reason to stay correct past the initial build.

## Key terms

| Term | Meaning |
|---|---|
| Business/Technical Service Owner | Named individual accountable for a service's CMDB representation staying accurate |
| CI-class data owner | Named individual accountable for a CI class's data quality across the whole CMDB |
| Review cadence | A defined, recurring schedule (e.g. quarterly) for owners to review and sign off on data quality |
| Governance gap | The real, documented reason most CMDB implementations fail: configuration without ongoing accountable ownership |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why can a CMDB with excellent Identification and Reconciliation rules still fail within a year of launch, and what specifically would have prevented that?
