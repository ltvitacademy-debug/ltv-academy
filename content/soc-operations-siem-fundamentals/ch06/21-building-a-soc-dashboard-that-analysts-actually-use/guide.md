# Lesson 21 — Building a SOC Dashboard That Analysts Actually Use

**Chapter 6 · Dashboards & Reporting · Lesson 21 of 32**

## What you'll learn

- What actually needs to be on a live SOC dashboard versus what belongs in a monthly report instead
- Why "vanity metrics" (totals that look impressive but don't drive a decision) crowd out the numbers an analyst needs mid-shift
- A concrete before/after redesign of a cluttered dashboard
- Why a dashboard analysts have learned to ignore is worse than having no dashboard at all

## The dashboard's one job: what needs action right now

A SOC dashboard is not a report. A report looks backward and summarizes; a dashboard looks at
*this second* and tells an analyst where to point their attention next. That means almost
everything on it should answer one question: **does this need a human to act on it right now?**
In practice, that narrows the list down to a handful of live panels: **open high-severity
alerts** (the Sev-1/Sev-2 queue, sorted by age), **queue depth** (how many alerts are sitting
unassigned across all severities, because a growing backlog is itself a warning sign), and
**systems currently under active investigation** (so an incoming analyst on shift handoff knows
what's already in motion before they touch anything new). Everything else — total alerts
processed last year, lifetime log volume ingested, a pie chart of every alert category since the
SIEM went live — is a vanity metric. It's true, it's measurable, and it does not tell anyone what
to do next.

## A concrete redesign

Picture a dashboard with a landing panel showing "48.2 million events processed this month" in
large type at the top, followed by a dense grid of a dozen smaller charts: alerts by day for the
last 90 days, a world map of source IPs, a lifetime total of closed tickets. None of it is wrong,
but none of it changes what an analyst does in the next five minutes. Strip it down instead to
three panels: Sev-1/Sev-2 alerts open right now, sorted oldest-first; a single queue-depth number
with a trend arrow showing whether it's growing or shrinking this shift; and a short list of
hostnames or user accounts currently flagged as "under investigation." An analyst can scan that
in under ten seconds and know exactly where to start. That ten-second scan is the actual design
target — not "comprehensive," but **fast to act on**.

## Why clutter actively slows triage, not just annoys

A dashboard with thirty panels doesn't just look busy — it costs real response time. An analyst
scanning a crowded screen has to visually search for the signal buried among the noise, and that
search time adds directly to Mean Time to Detect (covered in Lesson 22). Worse, once analysts
learn that the dashboard's "highlights" panel is 90% noise, they stop trusting it and start
building their own workarounds — a saved search, a personal spreadsheet, a sticky note — which
means the official dashboard has failed at its only job even though it's technically still
running. A dashboard that's ignored is strictly worse than no dashboard, because leadership
believes visibility exists when it doesn't.

## Key terms

| Term | Meaning |
|---|---|
| SOC dashboard | A live, action-oriented view of what needs an analyst's attention right now — distinct from a historical report |
| Vanity metric | A number that's accurate and often impressive but doesn't change what anyone does next, e.g. lifetime log volume |
| Queue depth | The count of alerts currently sitting unassigned or unresolved, tracked live as a warning sign of a growing backlog |
| Triage | The process of assessing and prioritizing incoming alerts by severity and urgency |

## Check yourself

A SOC manager wants to add a panel showing "total alerts processed since the SIEM went live" to
the main analyst dashboard. Why would you push back on that, and what would you suggest adding
instead?
