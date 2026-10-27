# Lesson 25 — Presenting the Platform

**Chapter 7 · The Incident, Presenting, and Wrap-Up · Lesson 25 of 26**

## What you'll learn

- Who this presentation is actually for, and why that changes everything about how it's built
- The five-part structure that maps the presentation directly back to the board's original mandate
- How to talk about what the investment actually bought, not just what got built
- What to do with the one honest gap or trade-off this project still carries

## Who's in the room, and why that matters

This isn't a technical demo for other DBAs. It's a presentation back to Overlook's board — the same
board that read about a competitor's breach and asked, in Lesson 1, "could that happen to us?" That
audience doesn't want to hear about `parent: sqlServer` or `@secure()` decorators; they want a
direct answer to the question they originally asked, in business terms, backed by the real,
measured proof this chapter already produced.

## The five-part structure, mapped to the mandate

1. **Restate the original ask** — the board's four deliverables from Lesson 1, in their own words,
   so the presentation starts from exactly what was requested.
2. **Show the DR proof, with real numbers** — Lesson 24's observed RTO (roughly 17 minutes 40
   seconds) and RPO (44 seconds), against the 1-hour and 5-minute targets, from an *unannounced*
   drill, which is the detail that makes this proof credible rather than staged.
3. **Show the security/compliance proof** — TDE confirmed active, patient data columns masked,
   auditing capturing real access events, and least-privilege roles replacing informal access —
   each one a direct answer to a specific board worry.
4. **Show the automation proof** — health checks and backup verification running on a schedule,
   alerting the on-call DBA automatically, with no specific person's memory required.
5. **Name the real trade-off honestly** — the readable secondary database's ongoing cost (Lesson
   14), stated plainly as the price of the RTO/RPO numbers just shown, not hidden in a budget line
   item discovered later.

## Talking about what the investment actually bought — not just what got built

The board doesn't need a list of Azure resources; they need the translation from resource to
outcome: "Overlook can now lose at most 44 seconds of appointment data and be back up in under 20
minutes during an actual regional outage, proven in an unannounced test, with a documented process
anyone on the on-call rotation can execute" is a sentence a board can actually act on. "We deployed
a Bicep template with a failover group" is not.

## Why naming the one honest trade-off matters

A presentation with zero caveats reads as either incomplete or dishonest to a board sophisticated
enough to have asked these questions in the first place. Naming the secondary database's real
ongoing cost, and the fact that it also does double duty for read-only reporting, is the kind of
honest, complete account that actually builds the credibility Lesson 1's mandate was asking for in
the first place.

## Key terms

| Term | Meaning |
|---|---|
| Business translation | Converting a technical result into a sentence the board can act on |
| Unannounced proof | A drill's credibility coming specifically from not being staged or expected |
| Honest trade-off | Naming a real cost or limitation plainly, rather than omitting it |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does this presentation's DR
proof specifically emphasize that the drill was unannounced, rather than just stating the final
RTO/RPO numbers?
