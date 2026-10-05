# Lesson 3 — Reference Architectures · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Reference architectures are reusable patterns for governance. Let's look at what they are and the three most common shapes they take.

## S2 · STEPS — Template vs. build

A reference architecture is a reusable template meant to be adapted by many organizations. A solution architecture is what one specific organization actually builds — the template adapted to its real platforms and constraints.

## S3 · STEPS — Three governance patterns

Three patterns show up repeatedly. Hub-and-spoke: one central metadata hub, every platform feeding into it. Catalog-of-catalogs: a lightweight central index registers distributed domain catalogs. Mesh of catalogs: no central index at all — discovery through shared standards.

## S4 · CODE — Hub-and-spoke, drawn out

Drawn out, hub-and-spoke looks like this: the warehouse, the lake, and a SaaS CRM each feed metadata into one central hub, which holds the catalog, classification, and lineage in one place.

## S5 · STEPS — A real published example

Microsoft publishes its own reference architecture for Purview, and it's a real-world instance of this hub pattern — a central hub connecting out to clouds and on-premises sources. It's a template, though, not your build — it still needs adapting to your actual platforms.

## S6 · OUTRO

Next lesson: the governance capabilities map — a checklist you can use to audit any organization's governance architecture, whichever pattern it follows.
