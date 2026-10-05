# Lesson 12 — Enterprise Metadata Architecture

**Chapter 3 · Metadata and Catalog Architecture · Lesson 12 of 30**

## What you'll learn

- The three-layer shape every enterprise metadata architecture takes: harvest, store, serve
- Push vs. pull (crawling) as the two ways metadata actually gets captured
- Why metadata storage is naturally graph-shaped, not just a flat table of records
- Centralized vs. federated metadata architecture, and how it echoes the operating models from Chapter 2

## The three layers every metadata architecture needs

Whatever tool sits on top, every enterprise metadata architecture is built from the same three layers underneath:

- **Harvesting layer** — connectors and crawlers that reach into source systems (databases, BI tools, pipelines, ML platforms) and extract metadata about what exists there.
- **Storage layer** — a central repository that holds harvested metadata once it's been pulled out of its sources, separately from the actual data.
- **Serving layer** — the APIs, search indexes, and UI that let humans and other systems actually consume what's stored: a catalog search bar, a lineage viewer, a glossary, an access-control engine checking a tag.

Any specific product you adopt is really just a particular implementation of these three layers. Recognizing the layers lets you evaluate a new tool by asking "which of these three does it actually strengthen," instead of comparing feature lists.

## Push vs. pull: how metadata actually gets captured

The harvesting layer gets its data one of two ways:

- **Pull (crawling)** — the architecture schedules a connector to periodically scan a source system and extract its current metadata state. Simple, and it works against almost any source without that source doing anything special. The cost: metadata can be stale between scans — a schema change at 9 a.m. might not show up in the catalog until the next scheduled crawl that night.
- **Push** — the source system actively emits a metadata event (`this table's schema just changed`) to the central store the moment it happens, usually via an API call or a message queue. Far more real-time, but it requires every source to cooperate and emit events in a format the receiving store understands — which not every source does out of the box.

Most real architectures use both: pull for broad, low-effort coverage across many sources, push for the specific sources where freshness actually matters — active pipelines, frequently-changing schemas.

## Why metadata wants to be a graph

A table has columns. Columns map to glossary terms. Glossary terms belong to domains. Tables feed downstream reports. Reports have owners. None of that is an isolated fact — it's a web of relationships.

Many catalog and metadata platforms store those relationships explicitly as a graph underneath their search index or relational tables — nodes for assets, terms, and people, edges for the relationships between them — because the questions an architecture actually gets asked ("what feeds this report," "what breaks if I drop this column") are graph-traversal questions, not lookups. You don't need to design a graph database yourself to plan a metadata architecture, but you do need to recognize when a stated requirement is really asking for graph traversal, and choose storage that can answer it before you've committed to something that can't.

## Centralized vs. federated metadata architecture

This mirrors the operating-model choice Chapter 2 already walked through, one layer down:

- A **centralized metadata architecture** has one authoritative store that every tool reads from and writes to.
- A **federated metadata architecture** has multiple stores — per domain, per platform — connected by APIs that sync or query across the boundaries between them.

The operating model from Chapter 2 is an organizational decision about who *owns* what. The metadata architecture here is the technical decision about where the data actually *lives* and how it stays consistent across those owners. The two usually mirror each other, but not always: a federated operating model can still choose a single centralized metadata store for practical reasons, just as a centralized operating model can still end up with several stores it hasn't fully consolidated yet.

## Key terms

| Term | Meaning |
|---|---|
| Metadata harvesting | The process of extracting metadata from a source system into a central store |
| Pull-based harvesting (crawling) | A scheduled scan of a source system to capture its current metadata state |
| Push-based harvesting | A source system actively emitting a metadata event the moment something changes |
| Metadata graph | Metadata stored as nodes and relationships, so traversal questions ("what's downstream of this?") can be answered directly |
| Federated metadata architecture | Multiple metadata stores, connected by APIs, rather than one central store |

## Lab

Sketch the three layers of your own organization's metadata architecture (or a past employer's, or a project you've worked on). For each layer — harvest, store, serve — name the actual tool filling it today. If a layer has no real tool behind it yet, write "none" and one sentence on what would need to fill it.

## Check yourself

Can you name the three layers every metadata architecture needs, explain the tradeoff between push and pull harvesting, and say in your own words why metadata storage tends to end up graph-shaped?
