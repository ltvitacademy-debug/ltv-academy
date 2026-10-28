# Lesson 22 — Key SOC Metrics: MTTD and MTTR

**Chapter 6 · Dashboards & Reporting · Lesson 22 of 32**

## What you'll learn

- What MTTD (Mean Time to Detect) and MTTR (Mean Time to Respond/Resolve) actually measure
- Why both numbers matter separately — a SOC can be fast at one and slow at the other
- How each is calculated from real timestamps, with a worked example
- Why these are tracked as trends over weeks and months, not judged on any single incident

## MTTD: how long an attacker operates unnoticed

**Mean Time to Detect (MTTD)** measures the gap between when an attack actually started and when
the SOC first noticed it. That start time usually isn't the moment an alert fired — it's
reconstructed afterward from log evidence: the first malicious login, the first suspicious
process execution, the first outbound connection to a known-bad IP. The detection time is the
timestamp the SIEM generated an alert, or an analyst flagged something manually. The gap between
those two timestamps is the attacker's **dwell time** — how long they operated inside the
environment before anyone knew they were there. A shorter MTTD means less time for an attacker to
move laterally, escalate privileges, or exfiltrate data before someone notices.

## MTTR: how long it takes to actually fix it

**Mean Time to Respond** (sometimes split into Mean Time to Respond and Mean Time to Resolve)
measures the gap between detection and the point the incident is actually contained or resolved —
the compromised account disabled, the malicious process killed, the affected host isolated from
the network. Where MTTD is about awareness, MTTR is about *action*. A SOC can have excellent
MTTD — alerts fire within seconds — and still have poor MTTR if escalation is slow, if analysts
lack the access to take containment actions themselves, or if the response process requires too
many approvals before anyone can act.

## A worked example

Say a SIEM correlation rule flags unusual authentication activity on a server at 2:47 PM. Log
review afterward shows the attacker's first malicious login actually happened at 1:15 PM. MTTD
for that incident is 92 minutes (2:47 PM − 1:15 PM). An analyst escalates to Tier 2 at 2:55 PM,
the account is disabled and the host isolated at 3:40 PM. MTTR for that incident is 53 minutes
(3:40 PM − 2:47 PM). Neither number is good or bad in isolation — what matters is how this
incident's numbers compare to last month's average, and whether the trend line is moving down.

## Why these are tracked as trends, not single-incident scores

No single incident's MTTD or MTTR tells you much — response time varies with attack complexity,
time of day, and staffing on shift. SOCs track both as **rolling averages** (weekly or monthly)
and plot them over time specifically to answer a different question: is the SOC getting faster,
or slower, as a program? A downward trend in both numbers is real evidence that a tuning effort,
a new tool, or a staffing change actually worked — which is exactly the kind of evidence Lesson
24 covers using to justify budget and headcount to leadership.

## Key terms

| Term | Meaning |
|---|---|
| MTTD (Mean Time to Detect) | Average time between an attack starting and the SOC first noticing it |
| MTTR (Mean Time to Respond/Resolve) | Average time between detection and the incident being contained or resolved |
| Dwell time | How long an attacker operates inside an environment before being detected — what MTTD measures |
| Rolling average | A metric recalculated over a moving window (e.g. the last 30 days) to smooth out single-incident noise |

## Check yourself

A SOC's MTTD has stayed flat at 90 minutes for three months, but its MTTR has dropped from 60
minutes to 20 minutes in the same period. What does that combination most likely tell you about
where the SOC has improved, and where it still has a gap?
