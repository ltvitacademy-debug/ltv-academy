# Lesson 5 — Incident Command at Scale: Roles Beyond the Basics

**Chapter 2 · Advanced Incident Management · Lesson 1 of 4**

## What you'll learn

- Why one engineer debugging a problem cannot also be the person running
  the incident, once more than one team is involved
- What an **Incident Commander (IC)** actually does — and the things an
  IC deliberately does *not* do
- Why a dedicated **Communications Lead** exists as a separate role from
  the IC, not a part-time duty bolted onto whoever's free
- What a **Scribe** captures in real time, and why that timeline becomes
  load-bearing evidence later, in the postmortem
- How this role set compresses for a small, single-team incident and
  expands for a major, multi-team one

## The problem basic on-call doesn't solve

A single-service, single-team incident usually only needs one person:
whoever's on call gets paged, looks at the dashboards, finds the bad
deploy or the exhausted connection pool, and fixes it. That works
because one person can hold the whole problem in their head.

That model breaks the moment an incident crosses team boundaries — a
database team, a platform team, and three product teams are all now
staring at the same outage from different angles. If the person doing
the hands-on debugging is *also* the person fielding Slack questions,
deciding whether to page a fourth team, and drafting the status page
update, the actual technical work slows to a crawl. Incident command,
as formalized by Google's SRE practice and adopted industry-wide
(PagerDuty, Atlassian, and most mature engineering orgs run close
variants of it), exists to split "doing the work" from "running the
incident" into separate jobs, held by separate people.

## The Incident Commander: running the incident, not fixing it

The **Incident Commander** owns the incident as a process, not as a
technical problem. Concretely, the IC:

- Declares the incident and sets its severity (SEV1/SEV2/SEV3, or
  equivalent), which determines who gets paged and how loudly
- Decides *who* is working *what* — assigning the database team to the
  replication lag, the platform team to the load balancer, without
  either team needing to ask
- Decides when to escalate further (page another team, wake up a
  director, invoke the DR plan) and when to stand down
- Makes the call on trade-offs nobody else is positioned to make — for
  example, rolling back a deploy that will also drop in-flight writes
- Explicitly does **not** personally debug the database, write the
  fix, or run the rollback command — the moment an IC starts doing
  hands-on technical work, they stop being able to see the whole
  incident

A good IC is often *not* the most senior engineer in the room. The job
is coordination and decision-making under uncertainty, not deep
subject-matter expertise — which is exactly why it can be a separate,
trained role that rotates independently of who's on call for any
given service.

## The Communications Lead: one voice, instead of five

Once an incident involves more than one team, questions arrive from
everywhere at once — other engineers, support, sales, execs, customers.
Without a dedicated owner, multiple people start answering the same
question with slightly different, sometimes contradictory, information.
A **Communications Lead**:

- Is the single point of contact for anything leaving the incident
  channel — status page copy, internal stakeholder updates, support
  talking points
- Drafts and ships updates on a cadence, independent of how the
  technical work is going, so "no new information yet" is itself
  communicated on schedule
- Shields the IC and the responders from the firehose of inbound
  questions, so hands-on work doesn't stop to answer the same Slack
  DM three times

This is a distinct person from the IC specifically so the IC's
attention stays on coordinating the fix. Lessons 7 covers what the
Communications Lead actually writes and when; this lesson is about why
the role exists as its own seat at the table.

## The Scribe: the timeline you'll need later

The **Scribe** does one job, continuously, for the duration of the
incident: write down what happened, when, in a shared timeline —
who declared the incident, what each hypothesis was and when it was
ruled out, every mitigation attempted, every escalation, every status
update sent, with timestamps.

```
14:02  Alerts fire: p99 latency > 2s on checkout-api
14:04  IC declares SEV2, incident channel #inc-2026-1029-checkout opens
14:06  Platform team joins; load balancer error rate confirmed elevated
14:09  DB team joins; replication lag on primary confirmed at 40s
14:15  Hypothesis: bad migration at 13:58 deploy — rollback requested
14:19  Rollback complete; error rate begins recovering
14:27  Error rate back to baseline; IC moves to monitoring
14:45  IC declares incident resolved
```

That timeline is not busywork. It's the primary input to the
postmortem (Lesson 8) — without it, the postmortem gets rebuilt days
later from memory and scattered Slack scrollback, which is slower and
far less accurate. The Scribe role matters precisely because the IC and
Communications Lead are too busy to also keep an accurate log while
the incident is live.

## Scaling the roles up and down

None of this means every paging alert needs four people. A SEV3 that
one team resolves in ten minutes doesn't need a Communications Lead or
a Scribe — the on-call engineer handles it solo, same as always. The
roles exist so that *when* an incident grows past one team, there's
already a known structure to step into, instead of inventing
coordination on the fly while the outage is still live. A major,
multi-team incident might even split the IC role further — a Deputy IC
to take over if the primary IC needs a break on a long-running
incident — but Incident Commander, Communications Lead, and Scribe are
the three roles every mature incident process defines first.

## Key terms

| Term | Meaning |
|---|---|
| Incident Commander (IC) | Owns the incident as a process — assigns work, decides on escalation and trade-offs, never does the hands-on technical fix personally |
| Communications Lead | Single point of contact for all communication leaving the incident channel, so updates stay consistent and responders aren't interrupted |
| Scribe | Keeps a live, timestamped timeline of the incident in real time; that timeline becomes the primary input to the postmortem |
| Severity (SEV) | The declared level of an incident (e.g. SEV1/SEV2/SEV3) that determines paging scope and urgency |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does separating the IC from the engineer doing the hands-on debugging
make a multi-team incident resolve *faster*, not slower — and what
specifically goes wrong when one person tries to do both jobs at once?
