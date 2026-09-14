# Script — Project 1: Ingestion Design

## Segment 1 (title)

Two sources, one bronze layer: nightly POS exports land as-is, online orders flow through a Fabric Eventstream — both raw, untransformed, exactly as received.

## Segment 2 (code: the streaming side)

Online orders arrive continuously, so a Fabric Eventstream is the right tool — an Event Hub feeds it, minimal transformation just parses the payload, and rows land straight into a bronze Delta table.

## Segment 3 (code: the batch side)

Nightly POS exports are a known, bounded batch each night. Databricks Autoloader picks up only the new files incrementally, rather than re-scanning everything on every run.

## Segment 4 (code: idempotent landing)

An Eventstream retry could redeliver an event, so this design targets at-least-once delivery with idempotent landing — a MERGE keyed on the source event ID, so redelivery overwrites instead of duplicating.

## Segment 5 (outro)

Same-day is now a real number: online sales visible in minutes, in-store sales by the next morning. Next up: transforming this bronze data into a proper star schema.
