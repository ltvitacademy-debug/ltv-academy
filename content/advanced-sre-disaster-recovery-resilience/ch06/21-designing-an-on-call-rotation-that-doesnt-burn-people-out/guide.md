# Lesson 21 — Designing an On-Call Rotation That Doesn't Burn People Out

**Chapter 6 · On-Call and Operational Excellence · Lesson 21 of 32**

## What you'll learn

- Why rotation length is a real design decision, not an arbitrary
  default, and what trade-off you're making at one week versus a
  shorter cycle
- How follow-the-sun scheduling across time zones can eliminate
  3 A.M. pages entirely for a genuinely global team — and what it
  takes to actually pull that off
- Why every rotation needs a secondary, not just a primary, and what
  job the secondary is actually doing
- What real compensation practice for on-call looks like, and why
  skipping it is a reliability problem, not just a fairness one
- The direct, measurable line from on-call burnout to worse incident
  outcomes — this isn't an HR topic wearing an SRE costume

## Rotation length is a trade-off, not a default

Most teams default to a one-week rotation because it's easy to
schedule, but it's worth naming what you're trading away. A full week
means a bad week — three pages at 2 A.M. in a row — compounds before
the engineer gets a break. A shorter rotation, three to four days,
caps that exposure, at the cost of more handoffs and more people
needing to stay current on the same set of services. For a
high-page-volume service, a shorter rotation is usually the right
call even though it's more scheduling overhead. For a quiet, mature
service with real SLOs holding steady, a week is fine. The mistake is
picking one week for every service by default and never revisiting it
once a service's page volume changes.

## Follow-the-sun: real only with real time-zone coverage

Follow-the-sun means on-call ownership rotates to whichever region is
currently in its daytime, so nobody is ever paged at 3 A.M. local
time. It's the best outcome available, but it only works with
genuine time-zone spread — three regions roughly eight hours apart
(for example, APAC, EMEA, and US) is the usual minimum for full
24-hour daytime coverage. Two regions eight to twelve hours apart
still leaves a gap where one side is covering the other's middle of
the night. Teams sometimes claim follow-the-sun with two offices that
are only four or five hours apart; that's not follow-the-sun, that's
two overlapping day shifts with a gap neither side wants to own. Don't
build a schedule on a claim you haven't checked against an actual
time-zone map.

## Every rotation needs a secondary

A primary-only rotation has a single point of failure: the primary's
phone dies, the primary is driving, the primary is already mid-way
through resolving an unrelated incident when a second one fires. The
secondary exists for exactly that — if the primary doesn't acknowledge
a page within a defined window (commonly five minutes), it escalates
to the secondary automatically. The secondary also absorbs concurrent
incidents, so one bad night doesn't mean the primary is juggling two
severities alone. This is configuration work in your paging tool
(PagerDuty, Opsgenie, or similar): an escalation policy with a timeout,
not a verbal agreement that someone will "keep an eye on Slack."

```
# Escalation policy, conceptually:
Step 1: Page primary on-call.  Wait 5 minutes for acknowledgment.
Step 2: No ack?  Page secondary on-call.  Wait 5 minutes.
Step 3: No ack?  Page the engineering manager / escalation lead.
```

## Compensation is a reliability lever, not a perk

Paying for on-call — a flat per-week stipend, a per-page amount, or
comp time for after-hours work — isn't generosity, it's an incentive
structure that affects reliability directly. Uncompensated on-call
quietly pushes engineers toward two bad behaviors: muting alerts they
should investigate, and rushing fixes to get back to sleep instead of
doing the mitigation correctly. Real-world practice varies — some
companies pay a fixed on-call stipend regardless of page volume, some
scale compensation to actual pages received, some give comp time the
day after a heavy overnight — but the teams that get this wrong
consistently see worse retention of senior engineers, who have the
most leverage to simply opt out of a team that treats on-call as free
overtime.

## Burnout is an incident-response problem, not just an HR one

This is the part that gets lost: a burned-out on-call engineer makes
objectively worse decisions during a real incident. Sleep-deprived
responders take longer to form an accurate mental model of what's
broken, are more likely to apply a fix that treats a symptom instead
of the cause, and are measurably slower at the judgment calls that
matter — when to escalate, when to roll back versus patch forward,
when to loop in a second team. Google's SRE practice and most mature
on-call programs track page volume per shift for exactly this reason:
a rotation that pages someone ten times in one night isn't just
unpleasant, it's producing worse incident outcomes than the same
incidents would get from a rested engineer. If your postmortems keep
surfacing "the responder didn't realize X" as a contributing factor,
check whether that responder had slept.

## Key terms

| Term | Meaning |
|---|---|
| Rotation length | How long one engineer holds primary on-call before handoff — a direct trade-off between recovery time and handoff overhead |
| Follow-the-sun | On-call ownership rotates to whichever region is currently in daytime, requiring roughly 8-hour-apart global coverage to actually eliminate overnight pages |
| Secondary on-call | The engineer an unacknowledged page escalates to after a timeout, and who absorbs concurrent incidents |
| On-call compensation | Stipend, per-page pay, or comp time for carrying a pager — an incentive structure, not a perk |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does an uncompensated, primary-only, one-week-every-time rotation tend
to produce worse incident outcomes over time, and what two or three
concrete schedule changes would address that?
