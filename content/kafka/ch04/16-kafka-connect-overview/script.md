# Script — Kafka Connect Overview

## Segment 1 (title)

Lesson 3 covered writing your own producer and consumer code, which is right when the logic is genuinely custom. But most integrations aren't custom — getting rows out of Postgres into a topic is a problem thousands of teams solve identically. Kafka Connect exists so none of them write that by hand.

## Segment 2 (steps: source vs sink)

Every connector runs in exactly one of two directions. A source connector watches an external system and turns its changes into Kafka messages. A sink connector does the mirror image — reads from a topic and writes into an external system.

## Segment 3 (code: connector config)

Connect runs as its own cluster of workers, and each connector is just a JSON description of what to run. connector.class tells the worker which implementation to load; tasks.max controls how much runs in parallel. Connect handles retries, offsets, and distribution — no custom code required.

## Segment 4 (screenshot: connector catalog)

Before writing a config like that, you'd typically start by browsing what already exists — here's Confluent Cloud's connector catalog, showing search results for pre-built connectors ready to configure rather than write from scratch.

## Segment 5 (outro)

Instead of asking how to write a producer for a system, the question becomes whether a connector for it already exists — and for most common systems, it does. Next up: a real source and sink connector pair, end to end.
