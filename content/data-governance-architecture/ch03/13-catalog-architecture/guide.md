# Lesson 13 — Catalog Architecture

**Chapter 3 · Metadata and Catalog Architecture · Lesson 13 of 30**

## What you'll learn

- What a data catalog actually is, architecturally: a search layer over the metadata store, not a copy of your data
- The four core components every catalog architecture needs: connectors, an index, a UI, and an API
- Why most organizations buy a catalog platform rather than build one, and what that decision actually trades off
- How catalog architecture connects back to the enterprise metadata architecture from Lesson 12

## What a data catalog is, architecturally

A data catalog is a searchable inventory of an organization's data assets — tables, reports, dashboards, pipelines, glossary terms — presented through search and browse, with detail pages showing an asset's owner, description, tags, sample values, and lineage. Architecturally, the catalog does not store the underlying data itself; it stores and serves *metadata about* that data, the same distinction this catalog's Metadata Management course draws between a metadata repository and the production table it describes. A catalog going down doesn't take your data warehouse down with it — a catalog with bad metadata just makes that same warehouse harder to find your way around.

## The four components

Every catalog architecture, regardless of vendor, is built from the same four pieces:

1. **Connectors** — the catalog's own harvesting layer (Lesson 12's concept, specific to this product): registered connections to each source system the catalog is told to scan.
2. **Index/store** — a search-optimized store, often a hybrid of full-text search and some relational or graph structure, so a search for "customer" surfaces every asset whose name, description, or tags mention it.
3. **UI** — the search bar, browse-by-domain views, and asset detail pages a human actually works in.
4. **API layer** — programmatic access so other systems (a BI tool, a pipeline, an access-control engine) can ask "does this asset exist, and what's its classification?" without a human opening a browser.

## Build vs. buy

Nearly every catalog platform in active use today — whether a standalone product or a capability built into a platform like a cloud data warehouse — is adopted rather than built from scratch. The reason is the connector layer, not the UI: writing and maintaining reliable connectors against dozens or hundreds of source-system types (each with its own API, its own schema quirks, its own rate limits) is the genuinely expensive part of a catalog, and it's exactly the part a vendor has already built and tested across many customers. The architecture decision most organizations actually face is "which catalog platform, and how do we cover the gaps its connectors don't reach" — not "do we build a catalog ourselves."

## Connecting back to Lesson 12

A catalog is one *consumer* of the serving layer described in Lesson 12 — one of potentially several, alongside lineage viewers, access-control engines, and BI semantic layers that might read from the same underlying metadata store. Treat the catalog as the UI and API surface over an architecture you've already planned, not as an architecture decision in its own right. A catalog with a beautiful UI sitting on top of a harvesting layer that's incomplete or stale is still an incomplete, stale catalog — the UI can't fix what the layer underneath it didn't capture.

## Key terms

| Term | Meaning |
|---|---|
| Data catalog | A searchable inventory of data assets, serving metadata about data rather than the data itself |
| Connector (catalog) | A registered connection the catalog uses to scan a specific source system |
| Catalog API | The programmatic interface other systems use to query catalog metadata without a human in the loop |
| Build vs. buy | The decision to adopt an existing catalog platform rather than build connector and index infrastructure from scratch |

## Lab

Pick one real catalog-capable platform already covered elsewhere in this career path (Microsoft Purview's Unified Catalog, Databricks Unity Catalog, or Snowflake's governance surface). From what you already know of it, identify which of the four components — connectors, index, UI, or API — that platform's own documentation emphasizes most, and which one it says the least about.

## Check yourself

Can you name the four components every catalog architecture needs, and explain in your own words why the connector layer — not the UI — is usually the deciding factor in a build-vs-buy decision?
