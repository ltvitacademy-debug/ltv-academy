# Lesson 15 — Integrating Catalogs Across Platforms

**Chapter 3 · Metadata and Catalog Architecture · Lesson 15 of 30**

## What you'll learn

- Why most real organizations end up with more than one catalog, as a direct consequence of adopting multiple platforms, not a planning failure
- Three architectural patterns for integrating across catalogs: federation hubs, pull-based synchronization, and API-based federated search
- Why permissions and classifications set in one platform's catalog don't automatically carry over to another
- How this connects back to the operating-model choices from Chapter 2

## Why multiple catalogs happen anyway

Platforms like a cloud data warehouse, a lakehouse engine, and a BI suite each ship their own native catalog capability, tied tightly to their own objects and their own permission model. An organization running more than one of these platforms at once ends up with more than one catalog — each authoritative for its own platform's objects, none of them natively aware of what the others contain. This isn't a sign that governance planning went wrong. It's the direct, predictable consequence of adopting more than one platform, each of which reasonably built a catalog scoped to itself.

## Three patterns for integrating across catalogs

1. **Federation hub** — one top-level catalog, explicitly built to connect outward to many different source types, pulls metadata *from* each platform-native catalog through its own connectors, and presents one combined search surface on top. Each platform-native catalog keeps operating as the real source of truth for its own platform's permissions and lineage; the hub is a read layer above them, not a replacement.
2. **Pull-based synchronization** — the central catalog periodically pulls a copy of each platform's metadata (schemas, tags, owners) on a schedule. Simple to reason about, but the same staleness tradeoff as pull-based harvesting generally (Lesson 12): copies drift out of date between scheduled pulls.
3. **API-based federated search** — the central catalog doesn't copy anything. At search time, it queries each platform's catalog API live and merges the results on the spot. This avoids staleness entirely, at the cost of latency (every search is now only as fast as the slowest platform it queries) and availability (if one platform's API is down, that platform's results simply vanish from that search).

## What doesn't transfer cleanly across the boundary

A permission or classification set inside one platform's native catalog doesn't automatically become the equivalent setting inside another platform's catalog. A tag applied inside one platform doesn't become a label inside a different platform's governance tooling unless something is explicitly built to translate between the two. In practice, most real integration projects spend the majority of their effort on exactly this translation layer — mapping one platform's concept of a tag, owner, or classification onto another's — not on building the search UI, which is usually the easy part.

## Where this connects to the operating model

A federated or data-mesh operating model (Chapter 2) usually implies platform-native catalogs staying authoritative at the domain level, with a lighter integration layer — typically a federation hub — sitting above them for organization-wide search and discovery. A centralized operating model is more likely to push toward consolidating onto a single catalog platform directly, treating the "integration" problem as something to eliminate rather than something to architect around. Neither is automatically correct; it's the same decision from Chapter 2, now visible at the catalog layer specifically.

## Key terms

| Term | Meaning |
|---|---|
| Catalog federation | One catalog pulling metadata from several platform-native catalogs into a single search surface |
| Pull-based synchronization | Periodically copying metadata from one catalog into another on a schedule |
| API-based federated search | Querying multiple catalogs' APIs live at search time and merging results, without copying data |
| Translation layer | The mapping logic that converts one platform's governance concepts (tags, owners, classifications) into another's |

## Lab

List every platform your organization (or a past employer) runs that has its own native catalog or data-discovery feature. For each pair of platforms on your list, write one sentence on whether anything currently connects their catalogs — and if nothing does, which of the three integration patterns in this lesson would make the most sense to try first.

## Check yourself

Can you name the three patterns for integrating catalogs across platforms, explain the staleness-vs-latency tradeoff between pull-based synchronization and API-based federated search, and say why most of the real effort in a catalog-integration project goes into translation rather than search UI?
