# When Each Still Makes Sense

This lesson closes out Chapter 6 with the honest, practical question underneath everything
covered since Chapter 3: given that Availability Groups are the modern default, when — if
ever — does it actually make sense to reach for log shipping or mirroring instead? The
answer isn't "never" for one of them, and it isn't "sometimes" for the other.

## What you'll learn

- The real, still-legitimate use case for log shipping today
- Why mirroring's answer is different: migrate off, don't newly deploy
- How to frame this decision honestly to a stakeholder or in an interview

## Log shipping's real use case: simple, tolerant, geographically distant

Log shipping's core properties — independent, schedule-based jobs; no requirement for
low-latency networking between primary and secondary; minimal moving parts to configure or
troubleshoot — are still genuinely useful in a specific, real scenario: a simple, offsite
**reporting copy** or **disaster-recovery copy** of a database, especially across a
geographic distance or network link that would make synchronous or even asynchronous AG
replication impractical. If the requirement is "we want a reasonably current copy
somewhere else, and a few minutes of staleness is genuinely fine," log shipping is a
legitimate, low-complexity answer — not a legacy leftover being tolerated, but the right
tool for that specific, real requirement. AGs can do more, but they also demand more:
Windows clustering (for most topologies) or the additional infrastructure of a
distributed AG, more moving parts, and more to monitor.

## Mirroring's real answer: migrate off, don't newly deploy

Log shipping and mirroring get different verdicts here, and that's a deliberate,
honest distinction — not an oversight. Mirroring is deprecated with a clear, mature
replacement already in place (Availability Groups), and it hasn't received the ongoing
investment AGs have. There's no scenario in this course's scope where standing up new
database mirroring is the right call today. The realistic task around mirroring isn't
"when should I use it" — it's "when I inherit it, what's my plan to migrate this database
onto an Availability Group instead," on a timeline that reflects the system's actual risk,
not urgency theater.

## The honest framing

- **Log shipping** — still has a real, current use case; choose it deliberately when its
  properties (simple, tolerant, geographically flexible) actually match the requirement.
- **Mirroring** — no longer has a "choose it" scenario; only a "found it, plan to replace
  it" scenario.
- **Availability Groups** — the modern default for most new HA/DR requirements, covered in
  depth in Chapter 4, and the landing point mirroring should be migrated toward.

## Key terms

| Term | Meaning |
|---|---|
| Reporting/DR copy | A secondary database copy kept for reporting or disaster recovery, tolerant of some staleness |
| Geographic distance tolerance | Log shipping's practical advantage over synchronous replication across long network links |
| Migrate off | The realistic goal for existing mirroring deployments, rather than continued or new use |

## Check yourself

A stakeholder asks whether to set up database mirroring for a new offsite reporting copy of
a database. Based on this lesson, what's the honest answer, and what should be recommended
instead?
