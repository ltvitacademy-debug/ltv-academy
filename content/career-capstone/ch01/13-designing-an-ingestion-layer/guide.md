# Lesson 13 — Designing an Ingestion Layer

**Chapter 1 · System Design for Data Engineers · Lesson 13 of 81**

## What you'll learn

- The ingestion layer as the first real decision point in a design
- Batch vs. streaming ingestion, recapped as a concrete choice (Lesson 5)
- Schema-on-write vs. schema-on-read, and when each one actually fits
- The landing zone / raw layer pattern — ingest first, clean later

## The first real decision point

Every design this course has built toward — partitioned, idempotent,
delivery-guarantee-aware — still has to actually get data *in* the
door first. The **ingestion layer** is that entry point: the part of
a system responsible for getting data from a source into storage,
reliably, before any cleaning or modeling happens. Get this layer
wrong, and everything downstream — Lesson 9's partitioning, Lesson
11's idempotency — is working with data that arrived incorrectly or
incompletely in the first place.

## Batch vs. streaming, as a concrete ingestion choice

```text
Batch ingestion:      pull a file, a table snapshot, or an API
                       export on a schedule (Databricks Lesson 32's
                       Autoloader, watching a landing folder)
Streaming ingestion:  continuously receive events as they happen
                       (Fabric Lesson 19's Eventstream, an always-
                       running source-to-destination flow)
```

Lesson 5 already gave the actual decision framework: freshness
requirements decide this, not preference. An ingestion layer for
"update the warehouse nightly" is Autoloader watching a folder on a
schedule; one for "show today's orders as they happen" is an
Eventstream that never stops running. Designing the ingestion layer
means applying Lesson 5's framework to a specific source, not
re-deciding processing model from scratch.

## Schema-on-write vs. schema-on-read

```text
Schema-on-write:  the schema is enforced BEFORE data is accepted --
                   Databricks Lesson 19's schema enforcement rejects
                   a write that doesn't match
Schema-on-read:   any data is accepted as-is; the schema is applied
                   later, at query time, by whoever reads it
```

An ingestion layer has to pick one of these for its entry point. A
strict, well-governed source (an internal system emitting a stable
schema) can afford schema-on-write — reject bad data immediately,
at the door. A messy, less-controlled source (third-party exports,
IoT devices, partner feeds) usually needs schema-on-read at
ingestion, so the pipeline doesn't halt on a field it didn't
anticipate — deferring strict validation to a later layer instead
of losing the data entirely.

## The landing zone / raw layer pattern

```text
Source (any format, any quality)
    -> LANDING ZONE / RAW / BRONZE: stored exactly as received
    -> (later, separate layer) cleaning, validation, modeling
```

DE Foundations Lesson 11 already established the reason this
pattern exists: the raw zone is "genuinely never touched," so a
cleansing bug discovered later can always be fixed by reprocessing
from an untouched original. Databricks & Delta Lake Lesson 25
renamed the same idea **bronze** — "data exactly as it arrived —
unmodified, untyped, everything kept." An ingestion layer's actual
job is to land data safely into this raw/bronze layer; deciding what
"clean" means is explicitly Lesson 14's problem, one layer later,
not this one's.

## Key terms

| Term | Meaning |
|---|---|
| Ingestion layer | The entry point getting data from a source into storage, before cleaning |
| Schema-on-write | Schema enforced before data is accepted — rejects bad data at the door |
| Schema-on-read | Data accepted as-is; schema applied later, at query time |
| Landing zone / bronze | Raw, unmodified storage — ingestion's actual target, not a cleaned table |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
does a messy, less-controlled source usually need schema-on-read at
ingestion, rather than schema-on-write?
