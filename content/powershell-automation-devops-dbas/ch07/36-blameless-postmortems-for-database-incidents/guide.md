# Blameless Postmortems for Database Incidents

The SQL Server DBA course covers incident documentation as a DBA skill on its own: reconstruct
a timeline, separate root cause from contributing factors, write action items that actually
prevent recurrence. This lesson doesn't re-teach that — it looks at *why* blamelessness is a
DevOps culture practice, not just a documentation habit, and what breaks when a team gets it
wrong.

## What you'll learn

- Why assigning blame in a postmortem actively works against learning from the incident
- How blame culture teaches people to hide problems instead of surfacing them
- The three-part anatomy of a blameless postmortem
- How to rewrite blaming language into blameless language, concretely

## Blame culture versus blameless culture

When an incident postmortem names a person as the cause — "the on-call DBA failed to notice
the alert" — it feels like accountability, but it teaches the opposite lesson to everyone who
reads it. The next person who makes a similar mistake now has a strong incentive to under-report
it, omit a detail that would make them look bad, or quietly fix something without mentioning it
happened at all. Blame doesn't make people more careful; it makes people better at hiding
evidence. A blameless postmortem asks "what about the system allowed this to happen" instead of
"who caused this," because a system failure is fixable and a character flaw isn't a useful
finding at all.

## Why this is a DevOps culture practice, not just a habit

This matters more in a DevOps environment specifically, because DevOps depends on people
reporting problems fast and honestly — a developer who notices their deploy caused a spike in
query latency needs to say so immediately, not hope nobody traces it back to them. A culture that
punishes that kind of honesty is a culture that finds out about problems later, from customers,
instead of sooner, from the person who caused them. Blamelessness isn't a soft value bolted onto
DevOps — it's a precondition for the fast, honest feedback loops DevOps actually needs to work.

## The anatomy of a blameless postmortem

A blameless postmortem has three parts, and each one has a specific job:

- **Timeline** — a sequence of timestamped, factual events: when the deploy went out, when the
  alert fired, when it was acknowledged, when service was restored. Pulled from logs and alert
  timestamps, not memory.
- **Contributing factors** — not a single root cause, but everything that made the incident
  worse or let it go undetected longer: a missing alert, a runbook nobody had read recently, a
  test environment that didn't match production closely enough to catch it first.
- **Action items** — specific, owned, and structural: "add an alert for this exact condition,"
  not "be more careful." The test is whether the action item, if it had existed already, would
  have prevented the incident or caught it faster.

## Rewriting the language

The discipline of blamelessness mostly comes down to how a sentence is written. Compare:

```text
Blame:      "The on-call DBA failed to notice the alert for 40 minutes."

Blameless:  "The alert had no escalation path, so it went
            unacknowledged for 40 minutes."
```

Both sentences describe the same fact. The first one ends the investigation at a person's
failure to act; the second one points at a fixable gap — a missing escalation path — that an
action item can actually close. Every sentence in a postmortem is worth checking against this
test: does it name a person's shortcoming, or does it name a gap in the system?

## Key terms

| Term | Meaning |
|---|---|
| Blame culture | An environment where incidents get attributed to a person's error rather than a system gap |
| Blameless postmortem | A postmortem that treats an incident as a system failure to understand, not a person to punish |
| Contributing factor | A condition that worsened an incident or delayed detection, alongside the root cause |
| Escalation path | A defined route for an unacknowledged alert to reach someone else automatically |

## Check yourself

Rewrite this sentence in blameless language: "The developer pushed a migration without running
it past the DBA first, causing the outage." What system gap, rather than personal failing, is
the sentence actually pointing at?
