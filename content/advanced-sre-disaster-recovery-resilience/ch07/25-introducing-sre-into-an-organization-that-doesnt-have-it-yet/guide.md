# Lesson 25 — Introducing SRE into an Organization That Doesn't Have It Yet

**Chapter 7 · Building an SRE Practice and Culture · Lesson 1 of 4**

## What you'll learn

- Why a company-wide SRE mandate is the wrong way to start, and what
  to do instead
- How to pick the one pilot service that gives SRE practice its best
  chance to prove itself
- Why bringing SLOs and an error budget to that single service is the
  actual mechanism of the pilot, not a formality around it
- How to measure and present the pilot's results so the next team
  asks to adopt the practice instead of having it imposed on them

## Don't mandate SRE — prove it on one service first

An organization without any SRE practice today has no shared
vocabulary for it, no existing SLOs, and no track record of the
approach actually working inside its own environment. Announcing a
company-wide SRE initiative into that vacuum — a new process, a new
job title, a new set of required documents — reads to engineering
teams as more process with no demonstrated payoff, and it usually
meets exactly the resistance you'd expect. Google's own SRE book is
explicit that SRE is a set of practices developed to solve a real
operational problem, not a certification to roll out from the top
down. The organizations that introduce it successfully start with a
pilot: one service, one team, a defined trial period, and a plan to
show real before-and-after evidence before asking anyone else to
change how they work.

## Choosing the pilot service

Not every service is a good pilot. The right one has three
properties: it's important enough that improving its reliability
visibly matters to the business, it's owned by one team willing to
try something new, and its current operational pain is real and
already acknowledged — frequent pages, a recent bad incident,
inconsistent on-call experience. A service nobody cares about proves
nothing even if the pilot goes well, because no one was watching. A
service that's both critical and already hurting is the one where a
measurable improvement will get noticed without any extra selling.

## SLOs and an error budget are the pilot, not a step before it

The pilot's actual content is: define a Service Level Objective for
the pilot service with the team that owns it, derive an error budget
from that SLO, and run the team's existing work — feature launches,
on-call, prioritization — against that budget for one real
measurement period, typically a quarter. This is where the pilot
either becomes real or stays theoretical. An SLO that nobody uses to
make an actual decision — pausing a risky deploy, prioritizing a
reliability fix over a feature — is a document, not a practice. The
whole point of the pilot is proving that an error budget changes what
a team actually does, not that a dashboard exists.

## Demonstrating value before asking anyone to scale it

At the end of the pilot period, the case for expanding SRE practice
has to be made with the pilot team's own before-and-after numbers:
incident frequency, time to detect and resolve, how many times the
error budget actually changed a real decision, and — just as
important — how the team itself describes the experience. A pilot
that only improved a metric but made the team miserable is not a
success story anyone else will volunteer for. A pilot that improved
the metric and the team would recommend it to a peer team is the
actual proof of concept, and it's what turns the next team's adoption
into a request instead of a mandate.

## Key terms

| Term | Meaning |
|---|---|
| SRE pilot | A deliberately scoped trial of SRE practice on one service and team, with a defined measurement period, before any wider rollout |
| Pilot service selection | Choosing a service that's business-critical, has a willing owning team, and already has acknowledged operational pain |
| SLO / error budget | The Service Level Objective and the quantified allowance derived from it — the actual mechanism the pilot tests, not paperwork around the trial |
| Adoption by evidence | Expanding SRE practice because a pilot team's own before-and-after numbers and experience make the case, rather than by top-down mandate |

## Check yourself

You're ready for the next lesson when you can explain, without
looking: why does a company-wide SRE mandate tend to fail where a
single-service pilot succeeds, and what has to actually happen during
the pilot period for it to count as more than a dashboard?
