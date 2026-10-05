# Lesson 12 — Enterprise Metadata Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Chapter Three: Metadata and Catalog Architecture. This lesson starts where metadata actually comes from and where it actually lives — the architecture underneath every catalog you'll ever use.

## S2 · STEPS — Three layers

Every enterprise metadata architecture is built from the same three layers. Harvesting — connectors and crawlers that reach into source systems and pull metadata out. Storage — a central repository that holds what's been harvested. Serving — the APIs, search, and UI that let people and systems actually use it. Any product you adopt is just one implementation of these three layers.

## S3 · STEPS — Push vs pull

Metadata gets captured one of two ways. Pull, or crawling — a scheduled scan of a source, simple but can go stale between scans. Push — the source emits an event the moment something changes, far more real-time, but it needs the source's cooperation. Most real architectures use both: pull for broad coverage, push where freshness actually matters.

## S4 · STEPS — Why metadata is graph-shaped

A table has columns, columns map to glossary terms, terms belong to domains, tables feed downstream reports. That's a web of relationships, not isolated facts. That's why many metadata platforms store it as a graph underneath — because the real questions, like "what breaks if I drop this column," are graph-traversal questions.

## S5 · STEPS — Centralized vs federated

This mirrors Chapter Two's operating-model choice, one layer down. Centralized architecture means one authoritative store everything reads and writes to. Federated means multiple stores, connected by APIs. The operating model is who owns what; this is where the data actually lives — and the two don't always have to match.

## S6 · OUTRO

Next lesson: catalog architecture specifically — the search index and UI layered on top of everything this lesson just covered.
