# Script — Project 1: Wrap-Up and Retrospective

## Segment 1 (title)

Project 1, built across five lessons, drawing on every course in this track — not as separate exercises, but as one coherent system: a real-time retail analytics platform.

## Segment 2 (code: what got built, tool by tool)

Eventstreams and Autoloader for ingestion, medallion architecture and a star schema for transformation, Direct Lake mode for serving, and a production-readiness checklist for hardening — each one named, not just used.

## Segment 3 (code: what worked)

The hybrid ingestion matched the real source constraints. Idempotent MERGE made "just retry it" an actually safe hardening strategy, not a hand-wave.

## Segment 4 (code: what breaks first at 10x scale)

A single Eventstream may not keep up with 10x online-order volume. The nightly batch window tightens as file sizes grow. Naming the specific bottleneck matters more than claiming the design scales indefinitely.

## Segment 5 (outro)

An honest retrospective, the same discipline Lesson 24 practiced under pressure. Next up: kicking off Project 2 — a multi-source data warehouse migration.
