# Lesson 3 — Shift Models and 24x7 Coverage

**Chapter 1 · What a SOC Actually Does · Lesson 3 of 32**

## What you'll learn

- Why security incidents don't wait for business hours, and what that means for how a SOC has to
  be staffed
- The **follow-the-sun** model: handing off coverage between SOCs in different time zones around
  the globe
- **Rotating shift schedules**: how a single-location SOC covers 24x7 with a fixed set of analysts
- **On-call escalation**: how coverage gaps get backstopped without a full shift physically
  present

## Why a SOC has to run 24x7 at all

Automated attacks — scanning, credential-stuffing bots, opportunistic malware — run continuously,
with no regard for the target's time zone or business hours. Beyond that, ransomware crews
specifically favor deploying at night, on weekends, and over holidays, betting that fewer
defenders are watching and that response, if any happens, will be slower. A SOC that only operates
9-to-5 isn't watching during exactly the hours an attacker is most likely to choose on purpose.

## Follow-the-sun: handing the queue around the globe

Large, multinational organizations often run SOCs in more than one region — the Americas, EMEA,
and APAC are a common split — so that as one region's business day ends, the next one is already
starting. This is **follow-the-sun** coverage: each regional SOC staffs its own normal daytime
hours, and the queue is handed off to the next region rather than any single office having to
staff an overnight shift at all.

**Concrete example:** a SOC in the Americas works its local business day, then hands off its open
alerts and context to an APAC SOC as its own day ends. The APAC team works its daytime hours, then
hands off to an EMEA SOC, which in turn hands back to the Americas — a continuous relay around the
clock, with structured handoff notes at each transition so context isn't lost between teams who
never actually overlap.

## Rotating shifts: covering 24x7 from one location

Not every organization has multiple global offices, and a single-location SOC still has to cover
24x7. The common solution is a **rotating shift schedule**: analysts cycle through day, evening,
and overnight shifts on a set rotation (common patterns include three 8-hour shifts or two
12-hour shifts), so the burden of working nights doesn't fall permanently on any one person.

**Concrete example:** a SOC staffs three 8-hour shifts — day, swing, and overnight — covering all
24 hours from one office. Analysts rotate through each shift on a set schedule over successive
weeks, so everyone takes a turn on overnight coverage rather than one analyst being stuck there
indefinitely.

## On-call escalation: backstopping the gaps

Many SOCs, especially smaller ones, can't fully staff every tier around the clock. A common
compromise is running a smaller after-hours or weekend presence — sometimes just a single Tier 1
analyst — backstopped by **on-call escalation**: specific Tier 2 or Tier 3 staff carry a phone for
that window and get paged when something exceeds what the smaller after-hours team can handle on
its own.

**Concrete example:** overnight, one Tier 1 analyst monitors the queue alone. A high-severity alert
comes in that exceeds their authority to act on — they page the on-call Tier 2 lead, who can
authorize containment from home without having to physically be on-site.

## Key terms

| Term | Meaning |
|---|---|
| Follow-the-sun coverage | Handing off SOC monitoring between offices in different time zones so one region's end-of-day is another's start |
| Rotating shift schedule | A single-location coverage model where analysts rotate across day, evening, and overnight shifts over time |
| On-call escalation | A backstop where specific analysts are reachable after hours to handle what a smaller after-hours team can't |
| 24x7 coverage | Continuous monitoring with no gap, achieved through some combination of the models in this lesson |

## Check yourself

A mid-size company has one office and can't justify fully staffing an overnight shift. Describe a
realistic combination of the models from this lesson that would still give them real 24x7
coverage.
