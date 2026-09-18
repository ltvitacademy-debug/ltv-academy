# Script — Orchestrating Multi-Step Pipelines

## Segment 1 (title)

Everything this chapter's ideas are actually for is one job spanning ingestion, transformation, and serving. Here's the whole shape, plus Chapter 4's close.

## Segment 2 (code: the four-task job)

Task 1 is Chapter 2's Auto Loader, started by a file-arrival trigger. Task 2 is Chapter 3's declarative pipeline, run as one Pipeline task. Tasks 3 and 4 depend on Task 2 — one for the normal case, one only for failure.

## Segment 3 (code: where this chapter's ideas apply)

Different Run if conditions give a real fan-out into happy-path and failure-path. Task 2's heavy pipeline gets its own cluster; the two lightweight tasks share one. A file-arrival trigger starts the whole thing the moment data lands.

## Segment 4 (code: why this is the real integration point)

Chapter 2 solved ingestion. Chapter 3 solved transformation. Neither said how a new file becomes a refreshed dashboard end to end, unattended, with a real failure path. That's what a Job is actually for.

## Segment 5 (outro)

Chapter 4 is complete. Chapter 5, Performance at Scale, picks up next — the Photon engine, adaptive query execution, caching, cluster sizing, and cost optimization.
