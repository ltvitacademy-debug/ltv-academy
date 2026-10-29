# Lesson 4 — Measuring Whether the Response Actually Improved

**Chapter 6 · Post-Incident Activity · Lesson 4 of 4**

## What you'll learn

- How MTTD and MTTR, already familiar from SOC Operations & SIEM Fundamentals, get tracked per-incident and over time, not just as single numbers
- Why a falling MTTR trend is real evidence that Post-Incident Activity is working, not just a feel-good metric
- How to compare an after-action report's action items against what actually happened to confirm real completion
- Why this verification step is what closes Chapter 6 — and incident response — out as a real feedback loop, not a one-way process

## Reusing metrics you already know, applied differently

SOC Operations & SIEM Fundamentals introduced MTTD (mean time to detect — how long between an attack
starting and the SOC noticing it) and MTTR (mean time to respond — how long between detection and
full resolution). Those metrics aren't new here. What's new is *how* they get used in Post-Incident
Activity: not as a single aggregate number calculated once a quarter, but recorded per-incident and
tracked as a trend across incidents of a similar type over time. A single incident's MTTR tells you
almost nothing on its own — every incident is different. A downward trend across six similar
account-compromise incidents over six months tells you something real: the team is getting
measurably faster at this specific kind of incident.

## A concrete trend

Picture three business email compromise incidents handled over a few months. Incident one: MTTD 38
minutes, MTTR 4 hours 10 minutes — including the hour lost confirming MFA status from Lesson 1.
Incident two, after Jordan's access fix and Priya's playbook change landed: MTTD 35 minutes, MTTR 2
hours 5 minutes — the MFA check that used to take an hour now takes under five. Incident three: MTTD
29 minutes, MTTR 1 hour 50 minutes, helped along by the new Sentinel rule from Lesson 3 catching a
related persistence attempt before it escalated further. That trend line, not any single number, is
the real evidence that the lessons learned meeting, the AAR, and the new detection rule weren't
paperwork — they measurably changed how fast the team responds.

## Checking the AAR's homework

Trend data answers "did things get faster," but it doesn't answer "did we actually do what we said
we'd do." That requires going back to the after-action report's action items — the specific owners
and deadlines from Lesson 2 — and checking each one off against what actually happened. Did Jordan
grant that MFA-status access by the two-week deadline, or is it still open? Did Priya's playbook
change actually get added, or did it get mentioned in a meeting and then forgotten? An AAR with
action items nobody ever re-checks is exactly as useless as one with no action items at all —
tracking completion is what makes the whole Post-Incident Activity phase a closed loop instead of a
one-time exercise in writing things down.

## Why this closes the chapter

Put together, Chapter 6 is a complete loop: a meeting surfaces what went wrong, a report turns that
into owned, dated fixes, a Sentinel rule makes one of those fixes permanent and automatic, and this
lesson's measurement confirms the fixes actually happened and actually worked. That's the exact
Preparation-to-Preparation cycle Lesson 1 described in Chapter 1 — now fully worked through, start to
finish, with real evidence instead of just a diagram.

## Key terms

| Term | Meaning |
|---|---|
| MTTD | Mean time to detect — how long between an attack starting and the SOC noticing it |
| MTTR | Mean time to respond — how long between detection and full resolution |
| Trend | MTTD/MTTR tracked across multiple similar incidents over time, not a single aggregate number |
| Action item verification | Checking an AAR's action items against what actually happened, confirming real completion |

## Check yourself

Without looking back: why does a single incident's MTTR tell you almost nothing on its own, and what
two things does this lesson say you need to check to confirm Post-Incident Activity actually worked?
