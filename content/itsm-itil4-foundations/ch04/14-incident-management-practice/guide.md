# Lesson 14 — Incident Management Practice

**Chapter 4 · Core ITIL 4 Practices: Incident, Problem & Change · Lesson 14 of 28**

## What you'll learn

- The ITIL 4 purpose statement for incident management, word for word
- How impact and urgency combine to set priority
- The difference between swarming and traditional tiered escalation
- What makes an incident a "major incident"
- Why incident management is about restoration, not root cause

## The purpose: restore service, fast

ITIL 4 defines the purpose of incident management as minimizing the
negative impact of incidents by restoring normal service operation as
quickly as possible. An **incident** is an unplanned interruption to
a service, or a reduction in the quality of a service — a payroll
report that won't load, a point-of-sale terminal that freezes, an
email server that's slow. The practice doesn't ask "why did this
happen?" It asks "how do we get the user back to work right now?"
That single word, *restore*, is the whole job. A workaround that gets
the service running again counts as success here, even if nobody yet
knows the underlying cause.

## Logging, categorization, and prioritization

Every incident starts as a logged record: what broke, who reported
it, what service it affects, and when it started. Logging creates the
audit trail and the queue every other step depends on. Categorization
sorts the incident by type (hardware, software, network, access) so
it reaches the right resolver group without someone reading the full
description first. Prioritization is where impact and urgency meet.
**Impact** asks how much damage this incident does — one user
inconvenienced, or an entire branch office offline. **Urgency** asks
how quickly it needs fixing — can it wait until tomorrow, or is money
being lost every minute it continues. Multiply the two (in practice,
usually a priority matrix rather than literal multiplication) and you
get the priority that decides queue position and who gets paged.

## Swarming vs. tiered escalation

ITIL 4 explicitly discusses two different models for getting the
right expertise on an incident. **Tiered escalation** is the
traditional model: a first-line team handles what it can, and passes
anything harder up to second-line, then third-line specialists, one
handoff at a time. It's efficient for high-volume, well-understood
issues, but each handoff adds delay and risks losing context.
**Swarming** pulls multiple people — first-line, specialists,
sometimes a vendor — into the same incident at the same time, working
it together instead of in sequence. Swarming trades some efficiency
for speed and shared context on incidents where the cause isn't
obvious yet. Neither model replaces the other; organizations choose
per incident type, and increasingly blend both.

## Major incident management

A **major incident** is one with the highest category of impact —
a wide outage, a safety issue, a reputational risk — and it runs
under its own separate, faster-moving process. A major incident
typically gets a dedicated incident manager coordinating the
response, a bridge call or dedicated channel pulling in every team
that might be needed, and much more frequent communication to
stakeholders, even before there's a fix. The point of treating major
incidents separately is that the normal queue-and-prioritize flow is
too slow when the business is bleeding visibly and everyone already
knows it.

## Restoration, not root cause

The distinction that trips people up most often: incident management
is explicitly *not* responsible for finding out why something broke.
If restarting a service, failing over to a backup server, or applying
a known workaround gets users working again, the incident is
resolved — full stop. Figuring out the underlying cause so it never
happens again is a different practice's job entirely, covered next in
this chapter: problem management.

## Key terms

| Term | Meaning |
|---|---|
| Incident | An unplanned interruption to a service, or a reduction in its quality |
| Impact | How much damage an incident is doing to the business |
| Urgency | How quickly an incident needs to be resolved |
| Swarming | Pulling multiple resolvers together at once, instead of escalating in tiers |
| Major incident | The highest-impact category of incident, run under its own expedited process |

## Check yourself

A user reports that an invoicing application has been unusable for
two hours and finance can't close the day's books. You restart the
application server and service is restored. Has incident management
done its job? What question is it explicitly not required to answer
before closing this incident?
