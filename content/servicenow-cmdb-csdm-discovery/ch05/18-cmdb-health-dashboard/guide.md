# Lesson 18 — CMDB Health Dashboard

**Chapter 5 · Data Quality & Governance · Lesson 18 of 26**

## What you'll learn

- Why "the CMDB looks fine" is not a data quality strategy
- The four dimensions ServiceNow's built-in CMDB Health Dashboard actually scores
- How Completeness, Correctness, Compliance, and duplicate rate are each measured
- How to read a health score and turn it into a concrete remediation backlog

## From a guess to a number

Chapter 1 Lesson 3 was honest about this up front: CMDB data quality is genuinely hard, and it decays by default unless something actively measures it. "Genuinely hard" is not the same as "unmeasurable," though. ServiceNow ships a CMDB Health Dashboard (built on the Service Mapping / CMDB Health application) specifically so a team doesn't have to rely on someone's gut feeling that "the server CIs look okay." It scores real tables against real rules and produces a number you can trend week over week, the same way an application team trends test coverage or defect counts.

## The four dimensions it actually scores

The dashboard breaks CMDB health into four measurable dimensions, each with its own score:

- **Completeness** — are the fields that matter actually populated on each CI? A `cmdb_ci_server` record with a blank Operational Status, no assigned Support Group, and no IP address is structurally present but practically useless. Completeness rules are defined per CI class, because a server and a business application don't share the same "required" fields.
- **Correctness** — does the populated data actually pass validation? A CPU count of `0` or an install date in the future is populated but wrong. Correctness rules catch values that are present but nonsensical, out of range, or contradicted by another field on the same record.
- **Compliance** — are CIs aligned with the expected standards defined by Identification and Reconciliation rules (covered in the next lesson)? A CI that keeps failing identification matching, or that has conflicting data from two sources with no authoritative source resolving it, drags compliance down.
- **Duplicate rate** — what percentage of CIs in a class are likely duplicates of another CI already in the table? This is scored separately because duplicates don't just mean "extra rows" — they silently split relationships, incidents, and cost data across two records that should be one.

## Why scoring beats a subjective impression

Before a health dashboard, "is our CMDB any good" is a question answered by anecdote: an auditor spot-checks twenty servers, finds three with obviously stale data, and the answer becomes whatever story gets told in the meeting afterward. The dashboard replaces that anecdote with a defensible, repeatable measurement: a Completeness score of 71% on `cmdb_ci_server` this month, trending up from 64% last quarter, with a drill-down to exactly which fields on exactly which records are missing. That drill-down is the real payoff — the dashboard isn't just a badge of honor, it's a worklist.

## Reading a score as a remediation backlog

A health score only matters if someone acts on it. A low Completeness score on a specific CI class points a data owner (Lesson 21 covers who that should be) at a specific, bounded cleanup task — not "fix the CMDB," but "populate Operational Status on the 340 server CIs currently missing it." A low Compliance score points at a specific Identification or Reconciliation rule that needs tightening, which is exactly where the next lesson picks up. Tracked over time, the same four scores also tell you whether a governance effort is actually working, or whether this quarter's cleanup sprint just moved the problem instead of fixing it.

## Key terms

| Term | Meaning |
|---|---|
| Completeness | Whether required fields on a CI are actually populated |
| Correctness | Whether populated field values pass validation and make logical sense |
| Compliance | Whether a CI's data aligns with Identification/Reconciliation rule outcomes |
| Duplicate rate | The percentage of CIs in a class likely duplicating another existing CI |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why does the CMDB Health Dashboard score Completeness and Correctness as two separate dimensions, instead of one combined "data is fine" score?
