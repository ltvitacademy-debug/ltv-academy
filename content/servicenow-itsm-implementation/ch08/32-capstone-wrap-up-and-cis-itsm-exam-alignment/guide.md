# Lesson 32 — Capstone Wrap-Up & CIS-ITSM Exam Alignment

**Chapter 8 · Capstone: Enterprise IT Service Desk · Lesson 32 of 32**

## What you'll learn

- A domain-by-domain review of what Caldwell Precision Manufacturing's implementation actually built, mapped to this course's own chapters
- How this course's implementation depth connects back to Course 1's ITIL foundations for CIS-ITSM exam prep
- Honest gaps in what this capstone deliberately left out, and why
- Where this course referenced Configuration Items without covering CMDB in depth — and why that becomes Course 9

## Reviewing the build against the CIS-ITSM domains

The CIS-ITSM certification tests implementation knowledge across the same core process areas this course taught, chapter by chapter. Reviewing Caldwell's finished build domain by domain is the most honest way to check whether four capstone lessons actually produced a real implementation, not just a plausible-sounding one.

**Incident Management.** Course 1 taught the `incident` table's inheritance from `task`, the six-state model, Priority Lookup Rules, and Assignment Rules. The capstone applied every one of those directly: a Priority Lookup Rule tuned to Caldwell's own Impact definitions, an Assignment Rule routing Meridian incidents to ERP Basis instead of a general queue, and a Major Incident process triggered specifically on Priority 1 against Meridian. An exam question describing a company that needs faster resolution on its most critical system is testing exactly this: do you reach for Priority calculation and targeted routing, or just a vague "make it faster" answer with no mechanism behind it.

**Problem Management.** Course 1's Problem chapter covered `problem_id`, the related-list relationship back to Incident, `cause_notes` versus `fix_notes`, and the Known Error concept. The capstone's Line 3 printer case is a direct worked example: six Incidents linked to one Problem, a documented investigation that took real time, and a resulting Known Error that prevents a redundant investigation the next time the symptom appears. The exam-relevant lesson here is pace — Problem Management is supposed to be slower than Incident, by design, and an exam question implying "Problem should resolve as fast as Incident" is testing whether you've internalized that distinction or not.

**Change Enablement.** Standard, Normal, and Emergency change types, calculated risk rather than typed risk, and risk-based CAB chaining all came from Course 1's Change chapter and got applied to Meridian specifically in Lesson 30. The exam-relevant point: risk should be calculated from real, checkable answers, and higher calculated risk should programmatically require more approval — not just display a label nobody acts on.

**Request Management.** The `sc_request` / `sc_req_item` split, rollup status, and item-level SLA placement all came from Course 1's Request chapter and got applied to the New Hire IT Setup catalog item in Lesson 31. The exam-relevant point: a multi-item order fulfills item by item, and the Request's own state should be a calculated rollup, not an independently set field.

**Knowledge Management.** Caldwell's password-reset, VPN setup, and onboarding articles, each routed through Draft, review, and Publication, directly applied this course's Knowledge chapter. The exam-relevant point: a Knowledge Base is only as trustworthy as its approval and retirement discipline — an unreviewed or stale article is worse than no article at all.

**Service Level Management.** Schedule-aware SLA Definitions, Start conditions tied to State = In Progress rather than creation, and Pause conditions scoped to Awaiting Caller all came from Course 1's SLA chapters and were applied per Priority tier for Caldwell. The exam-relevant point: an SLA's duration number means nothing without correct Start, Pause, and Stop conditions and a correctly chosen schedule underneath it.

## What this capstone deliberately left out, and why

Real implementations don't stop at four lessons, and this one doesn't claim to. The Service Portal work in Lesson 31 covered one widget, not a full portal redesign — because Chapter 7 already covered portal configuration and widgets in depth, and this capstone's job was applying that knowledge to one concrete, provable requirement, not repeating the chapter. Reporting in this capstone stayed scoped to what SLA breach and Problem/Known Error data directly supports; a full dashboard-and-reporting build is its own, separate skill this course didn't claim to re-teach here.

## The gap this course left on purpose: CMDB and CI linkage

Look back across this capstone and you'll notice `cmdb_ci` came up twice without ever being explained: Lesson 30's `root_cause` field pointed at a `cmdb_ci` record for the failing switch, and Course 1's Change Risk Assessment lesson asked whether a change "touches a Configuration Item marked business-critical" — exactly how Meridian's own risk got calculated in this capstone. Both of those are real, working references to Configuration Items and the CMDB that holds them. This course never explained what a CMDB actually is, how a CI relationship is modeled, or how Discovery populates that data automatically — because that is Course 9's entire subject.

## Key terms

| Term | Meaning |
|---|---|
| CIS-ITSM domain | A core process area (Incident, Problem, Change, Request, Knowledge, Service Level Management) the certification tests implementation knowledge against |
| Calculated risk/priority | A value the platform derives from real, checkable answers rather than one typed by hand — the pattern this exam repeatedly tests |
| Known Error | A resolved Problem kept searchable to prevent a redundant future investigation of the same symptom |
| `cmdb_ci` | The Configuration Item reference this course used without explaining — Course 9's subject |

## Check yourself

This course is complete. Before moving to Course 9 — ServiceNow CMDB, CSDM & Discovery — explain without looking: name the two specific places in this capstone where a `cmdb_ci` reference did real work (one in Problem Management, one in Change Risk Assessment), and what question about those references this course deliberately left unanswered.
