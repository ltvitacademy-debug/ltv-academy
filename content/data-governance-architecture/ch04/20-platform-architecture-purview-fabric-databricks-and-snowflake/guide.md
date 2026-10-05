# Lesson 20 — Platform Architecture: Purview, Fabric, Databricks and Snowflake

**Chapter 4 · Security and Platform Architecture · Lesson 20 of 30**

## What you'll learn

- How Microsoft Purview, Microsoft Fabric, Databricks Unity Catalog, and Snowflake each shape governance architecturally, in their own words
- The real axis that separates them: how far each platform's governance actually reaches
- Why these aren't competing choices — how they're designed to compose, not replace each other
- How to decide what an organization actually needs, instead of asking "which one is best"

## Four platforms, four different governance shapes

This career path already has full courses on each of these four platforms. This lesson doesn't re-teach any of them — it steps back and compares the architectural *shape* each one chose, using only what those courses already establish:

- **Microsoft Purview** is a cross-platform metadata hub. It's explicitly built to reach into other vendors' platforms — Microsoft 365, Azure, Amazon Web Services, even Snowflake — through its Data Map, then exposes what it finds through its business-facing Unified Catalog. It governs assets it doesn't itself store or compute.
- **Microsoft Fabric** is a single-platform, shared-lake model. Every workload — lakehouse, warehouse, pipelines, Power BI, Real-Time Intelligence — stores its actual data in one tenant-wide lake, OneLake, so governance decisions (domains, workspaces, item permissions, sensitivity labels) apply within that one shared storage layer. Fabric's own governance course is explicit that this is exactly why a permission mistake is tenant-wide by default — the architecture doesn't box workloads apart the way separate products would.
- **Databricks Unity Catalog** is a metastore-centric model. Before Unity Catalog, Databricks permissions were set per workspace; Unity Catalog centralizes governance — permissions, lineage, auditing — into one metastore that spans every attached workspace, even across clouds, addressed through a three-level `catalog.schema.table` namespace. It governs more than tables: volumes, functions, and registered ML models sit in the same object hierarchy.
- **Snowflake** builds governance directly into the warehouse engine itself. There's no separate governance product to adopt — Governance is its own tab in Snowsight, sitting beside Query History, and the whole surface (access history, masking, tagging) is marketed under one name, Snowflake Horizon, precisely because it *is* the platform, not an add-on to it.

## The real axis: how far does each platform's governance reach?

Ordered from narrowest to widest reach:

1. **Snowflake** governs what happens inside the Snowflake engine itself.
2. **Databricks Unity Catalog** governs across many Databricks workspaces — even across clouds — but still within Databricks compute.
3. **Microsoft Fabric** governs across several different workload types (warehouse, lakehouse, BI, pipelines), because they all share OneLake — wider than one engine, but still one Microsoft SaaS product.
4. **Microsoft Purview** governs across platforms entirely — Azure, Microsoft 365, AWS, Snowflake, on-premises — because its job is explicitly to reach into other systems' metadata, not to run compute itself.

This is the same reach spectrum Lesson 15 described abstractly for catalog integration — this lesson just plots four real, named platforms onto it.

## These aren't competing choices — they compose

Fabric's own governance course lists Purview integration as one of its own later chapters: Fabric's native governance (domains, item permissions, sensitivity labels) isn't replaced by Purview, it's *extended* by it, for organizations that need governance spanning beyond Fabric to the rest of their estate. The same composition pattern applies generally: a cross-platform hub like Purview commonly sits as a layer above a platform's own native governance, pulling from it rather than replacing it — exactly the "catalog-of-catalogs" federation pattern Lesson 15 described.

## What to actually take away as an architect

Don't ask "which of these four is the best governance platform" — they answer different questions by design. Ask instead: "what's the widest-reach layer of governance my organization actually needs, and which platform-native layers does it need to sit on top of?" A company running only Snowflake may never need anything beyond Snowflake's own built-in governance. A company running Databricks, Fabric, *and* an on-premises SQL Server has no single platform-native tool that sees across all three — only a cross-platform layer like Purview can reach that far.

## Key terms

| Term | Meaning |
|---|---|
| Cross-platform metadata hub | A governance layer (like Purview) built to reach into other vendors' platforms, not just its own |
| Shared-lake governance | Governance applied across several workload types because they all store data in one shared lake (Fabric's OneLake) |
| Metastore-centric governance | Governance centralized in one metastore spanning many workspaces or clouds (Databricks Unity Catalog) |
| Engine-native governance | Governance built directly into the compute engine itself, with no separate product to adopt (Snowflake) |

## Lab

For each of the four platforms, write one sentence stating how far its governance reach extends: "only itself," "across its own workspaces," "across its own workload types," or "across other vendors' platforms entirely." Then write one more sentence on which of the four your own organization (or a past employer) would need first, based on how many different platforms it actually runs.

## Check yourself

Which of the four platforms would be the right choice if an organization needed one tool that could see metadata across Databricks, Fabric, *and* an on-premises SQL Server — and why could none of the other three do that job alone?
