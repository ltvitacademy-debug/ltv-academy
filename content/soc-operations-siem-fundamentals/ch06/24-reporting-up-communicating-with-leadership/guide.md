# Lesson 24 — Reporting Up: Communicating with Leadership

**Chapter 6 · Dashboards & Reporting · Lesson 24 of 32**

## What you'll learn

- Why the numbers an analyst needs mid-shift are the wrong numbers to hand to leadership
- How to translate technical SOC findings into business-risk language executives actually act on
- A concrete before/after example of the same month's work, reported two different ways
- Why this translation directly affects whether a SOC's budget and headcount requests get approved

## The wrong report: accurate, and useless to the reader

A technically accurate report — "parsed 1.2 billion events, fired 3,814 alerts, closed 3,802 as
false positives, escalated 12 true positives" — is correct, and it tells an executive almost
nothing. Leadership isn't equipped to judge whether 3,814 alerts is a good or bad number, and
they don't need to be: their job is to decide whether the SOC is reducing risk to the business
and whether it needs more investment to keep doing so. A wall of operational statistics doesn't
answer either question. It just proves the SOC was busy.

## Translating the same month into business-risk language

The same month of work, reported differently: "the SOC identified and blocked 12 attempted
breaches this month. Average detection time improved 18% compared to last quarter, meaning
attackers had less time inside our systems before being caught." That's the same underlying
data — the 12 true positives from the first version, and the MTTD trend from Lesson 22 — but
reframed around what leadership actually cares about: **is the business safer than it was, and
is that trend improving or getting worse.** Good executive reporting doesn't invent new numbers;
it picks the real ones that answer a business question and drops the ones that don't.

## What belongs in a leadership report

Three things consistently belong: a **plain-language risk statement** (threats blocked or
contained, framed in terms of what could have happened, not log counts), a **trend, not a
snapshot** (MTTD and MTTR improving or worsening quarter over quarter, alert volume and
workload from Lesson 23 if staffing is the topic), and a **specific ask tied to a number** —
"headcount at current staffing can't sustain this workload past Q3" is a request leadership can
actually evaluate, where "we're busy" is not.

## Why this translation is the actual budget and headcount case

A SOC's budget and staffing aren't renewed because leadership trusts that security work is
important in the abstract — they're renewed because someone made a specific, numeric case that
the investment reduces real risk or that current staffing is at its limit. The workload trend
from Lesson 23 and the detection/response trend from Lesson 22 are exactly the evidence that
case is built from; this lesson is where that evidence gets translated into language a
non-technical decision-maker can actually act on. A SOC that reports well, consistently, over
time builds the credibility that makes the next budget conversation easier.

## Key terms

| Term | Meaning |
|---|---|
| Business-risk language | Framing SOC findings around risk to the business rather than raw technical or log counts |
| Trend reporting | Presenting a metric's change over time (quarter over quarter) rather than a single period's snapshot |
| Specific ask | A concrete, numeric request (e.g. headcount tied to a workload trend) that leadership can evaluate |
| Credibility | Trust built with leadership through consistent, accurate, decision-useful reporting over time |

## Check yourself

A SOC manager wants to report "we processed 50 million log events this month" to the executive
team as the headline number. What would you suggest reporting instead, using this month's real
detection, response, and workload data?
