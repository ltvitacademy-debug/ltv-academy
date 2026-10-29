# Lesson 6 — Coordinating a Multi-Team Incident Without Chaos

**Chapter 2 · Advanced Incident Management · Lesson 2 of 4**

## What you'll learn

- The specific failure mode that happens when several teams respond to
  the same incident without shared context
- Why a single incident channel/bridge, not five separate ones, is the
  first thing that has to exist
- How a clear escalation path gets a second or third team engaged
  without the IC chasing people down manually
- How ownership gets assigned explicitly, instead of teams assuming
  someone else has it covered
- How this scales from a two-team incident to a genuine, org-wide major
  incident

## The failure mode: five teams, five theories, no shared context

Picture a checkout outage. The payments team sees elevated error rates
and starts investigating their own service. The database team sees
replication lag and starts investigating independently. The platform
team sees load balancer errors and starts investigating that. Each
team is doing competent work — and none of them knows what the others
have already ruled out. Twenty minutes in, three teams have each spent
those twenty minutes re-discovering the same symptom from a different
angle, instead of spending them testing three *different* hypotheses.

This is the default outcome without coordination, not an edge case.
It happens because paging is usually service-scoped — each team gets
paged independently when *their* dashboards look wrong — so by
default, nothing connects the responses together. Multi-team
coordination exists specifically to close that gap.

## One incident channel, one bridge, one source of truth

The fix that every mature incident process converges on is
deceptively simple: the moment an incident is declared as
multi-team, everyone moves into **one** shared space — one chat
channel, one voice/video bridge, often both — and that becomes the
single source of truth for the incident. Not "check with the payments
team's channel for their status" — one place, where the IC, the
Scribe, and every responding team post what they're finding as they
find it.

```
#inc-2026-1029-checkout-outage
  — IC: @priya (declared 14:04)
  — Scribe: @devon
  — Responding: payments, platform, database
  — Status page: investigating, posted 14:08
  — Pinned: current hypothesis + what's been ruled out
```

That pinned "current hypothesis + what's been ruled out" line is the
single highest-leverage habit in multi-team incident response. It's
the thing that stops the database team from re-testing a theory the
payments team already disproved ten minutes earlier.

## Escalation paths: getting the right team in, fast

A clear **escalation path** means every team has a known, on-call
contact that doesn't require hunting down a phone number mid-incident.
In practice that's a paging tool (PagerDuty, Opsgenie, or equivalent)
with a defined escalation policy per team, and an IC who has the
authority — and the tooling — to page a team directly into the
incident channel rather than asking around for "does anyone know
someone on the fraud-detection team?"

The failure mode to avoid here is the opposite extreme too: paging
every adjacent team "just in case" floods the incident with people who
have nothing to contribute yet and adds noise instead of signal. The
IC's job is to bring in exactly the teams the current hypothesis
actually points to, and escalate further only as the hypothesis
changes.

## Explicit ownership, not assumed ownership

Once multiple teams are in the same channel, the IC assigns ownership
out loud: "payments team, you own confirming whether the retry storm
is cause or symptom; database team, you own the replication lag;
platform team, stand by." Without that explicit assignment, the
default behavior is that everyone either investigates everything
(duplicated effort) or everyone assumes someone else has the lead
(nothing gets owned). Saying it out loud, in the shared channel, where
the Scribe logs it, removes the ambiguity in both directions.

## Scaling to a genuine major incident

A two-team incident needs one channel and one clear hypothesis board.
A genuine major incident — the kind that touches a dozen teams — adds
structure on top of the same core idea: sub-leads for each major
workstream reporting into the IC, a dedicated "bridge" call running
continuously alongside the chat channel for anyone who needs to talk
in real time, and regular timeboxed check-ins (every 15–30 minutes)
where every workstream reports status even if the answer is "no
change." The mechanism doesn't change — one source of truth, explicit
ownership, controlled escalation — it just gets more layers as more
teams are involved.

## Key terms

| Term | Meaning |
|---|---|
| Incident channel/bridge | The single shared chat channel and/or call that becomes the one source of truth for a multi-team incident |
| Escalation path | A defined, known way to bring a specific team's on-call responder into an incident quickly, usually via a paging tool |
| Hypothesis board | A pinned, continuously updated note of what's currently believed to be the cause and what's already been ruled out |
| Workstream | A distinct piece of the investigation or mitigation, explicitly assigned to one team so ownership isn't ambiguous |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what
specifically goes wrong when multiple teams respond to the same
incident in separate channels with no shared hypothesis board, and
what two or three concrete habits prevent it?
