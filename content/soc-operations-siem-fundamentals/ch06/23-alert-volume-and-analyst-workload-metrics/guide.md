# Lesson 23 — Alert Volume and Analyst Workload Metrics

**Chapter 6 · Dashboards & Reporting · Lesson 23 of 32**

## What you'll learn

- How SOCs track alert volume — by day, by shift, by severity, and by source
- What analyst workload metrics actually measure, and why raw alert counts alone are misleading
- A concrete example of reading these numbers together to find a real problem
- Why these metrics exist to catch tuning gaps, staffing shortfalls, and alert fatigue before they cause a missed breach

## Alert volume: counted more than one way

Raw alert volume — how many alerts fired today — is the starting point, but on its own it tells
you almost nothing. The useful version breaks that number down at least three ways: **per
shift or per day** (so a spike is visible against a normal baseline), **by severity** (a day with
400 low-severity alerts and 2 high-severity ones is a very different day than 50 alerts that are
almost all high-severity), and **by source** (which log source — EDR, firewall, IDS, a specific
correlation rule — is actually generating the volume). That breakdown is what turns "we got a lot
of alerts today" into something actionable: a specific rule or source producing most of the
noise is a tuning candidate.

## Analyst workload: the human side of the same number

Alert volume describes what came in; **workload metrics** describe what it cost the humans
handling it. The two most common are **alerts closed per analyst per shift** and **average time
spent per alert**. A rising alerts-per-analyst number with a shrinking average time per alert
usually means analysts are rushing — closing alerts faster not because triage got easier, but
because there's no time to do it properly. A growing **backlog carried over to the next shift**
is another workload signal: it means the current shift's staffing didn't match the volume coming
in.

## A concrete read: volume and workload together

Suppose Tier 1 alert volume has held steady at around 400 per shift for months, but the number
of alerts per analyst has crept from 50 to 80 because two analysts left and weren't replaced.
Average time per alert has dropped from six minutes to under three. Read separately, neither
number is alarming. Read together, they describe a real risk: analysts under-resourced for the
volume they're receiving, moving faster than careful triage allows, which is exactly the
condition under which a real attack gets waved through as a false positive.

## Why this matters: tuning, staffing, and burnout

These numbers exist to surface three specific problems before they cause a missed incident.
**Tuning gaps**: a source generating disproportionate low-value volume is a candidate for rule
tuning (Lesson 15). **Staffing gaps**: a backlog that grows every shift, or workload per analyst
that's climbing, is a direct, numeric case for adding headcount — not a feeling, a trend. **Alert
fatigue and burnout risk**: analysts sustained at a high alerts-per-shift rate for weeks are more
likely to start rubber-stamping alerts as false positives just to keep the queue moving, which is
a genuine detection risk, not just a morale problem.

## Key terms

| Term | Meaning |
|---|---|
| Alert volume | The count of alerts fired, broken down by shift, severity, and source to be useful |
| Analyst workload | Metrics like alerts closed per analyst per shift and average time spent per alert |
| Backlog | Alerts carried over, unresolved, from one shift to the next — a sign staffing hasn't matched volume |
| Alert fatigue | The risk that analysts under sustained high alert volume start dismissing alerts too quickly to keep pace |

## Check yourself

Alerts-per-analyst has risen 60% over two months while average time spent per alert has dropped
by half. What two underlying problems might this combination be pointing toward, and why is
reading either number alone not enough to catch it?
