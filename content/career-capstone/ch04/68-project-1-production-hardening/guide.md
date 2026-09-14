# Lesson 68 — Project 1: Production Hardening

**Chapter 4 · Added Projects — Capstones · Lesson 68 of 81**

## What you'll learn

- Applying Fabric & Real-Time Analytics' production-practices chapter to this specific system
- Where this project's idempotency and delivery-guarantee decisions pay off
- Setting up monitoring, alerting, and an actual SLO for the pipeline
- What "production ready" means for a project this size, concretely

## What makes this pipeline production-ready

Fabric Lesson 43 asked directly: what makes a pipeline production-ready?
Not "it runs once successfully" — it's the pipeline surviving the failure
modes that show up eventually: a malformed event, a transient network
error, a downstream table that's briefly unavailable. This lesson applies
that checklist to Project 1's actual bronze-to-gold flow.

```
Failure mode                    -> handled by
--------------------------------|-------------------------------
Malformed online-order event    -> Eventstream transformation
                                    (Fabric Lesson 35) rejects
                                    to a dead-letter table
Duplicate event redelivery      -> idempotent MERGE (Lesson 65)
                                    absorbs it silently
Nightly export file missing     -> Autoloader run alerts,
                                    doesn't silently skip a store
Silver/gold job failure         -> retry with backoff, then page
```

## Retries and idempotency, working together

This is exactly why Lesson 65 built ingestion around idempotent `MERGE`
rather than plain `INSERT`. A retry after a transient failure is safe
precisely because re-running it produces the same result — Lesson 11's
idempotency principle isn't a nice-to-have here, it's what makes "just
retry it" a valid recovery strategy at all instead of a data-corruption
risk.

## Observability: logs, metrics, traces

Fabric Lesson 52's three observability signals map onto this pipeline
directly:

```
Logs:     each pipeline run's start/end, rows processed, errors
Metrics:  bronze row counts, silver/gold job duration, dead-letter
          table growth over time
Traces:   one event's path from Eventstream -> bronze -> silver -> gold
```

Dead-letter table growth is the metric worth watching most closely here —
a slow trickle of rejected events is normal (bad data happens); a sudden
spike means something upstream changed shape without warning, which is
exactly the kind of thing Fabric Lesson 51's schema drift and breaking
changes lesson warns about.

## Alerting and the SLA that started this project

Fabric Lesson 53's pipeline-failure alerts and Lesson 56's SLA/SLO
framing turn Lesson 65's freshness numbers into something monitored, not
just designed:

```
SLO: 99% of online-order events visible in gold within 15 minutes
Alert: fire if the silver-to-gold job hasn't completed successfully
       in the last hour (well before the SLO would be breached)
```

The alert threshold is set well ahead of the SLO on purpose — an alert
that only fires after the SLA is already broken isn't an early warning,
it's a postmortem.

## Key terms

| Term | Meaning |
|---|---|
| Dead-letter table | Where malformed events land instead of silently failing or corrupting bronze |
| Idempotent retry | A failed step can be safely re-run because the MERGE produces the same result either way |
| SLO vs. alert threshold | The alert fires before the SLO breaches, giving time to react |

## Check yourself

You're ready for Lesson 69 when you can explain, without looking: why does
this project's earlier choice of idempotent MERGE ingestion directly enable
"just retry it" as a safe recovery strategy during hardening?
