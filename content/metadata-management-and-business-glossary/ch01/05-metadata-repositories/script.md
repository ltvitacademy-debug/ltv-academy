# Lesson 5 — Metadata Repositories · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A metadata repository is a system built specifically to store, organize,
and serve metadata — not the underlying data itself. A customers table
holds customer data. A metadata repository holds the description of that
table, separately, so it can be searched and maintained without ever
touching production.

## S2 · STEPS CARD (the description, not the data)

That's the core distinction — the data itself lives in a production
table; its description lives somewhere else entirely, in a repository
built for exactly that job.

## S3 · STEPS CARD (four common shapes)

In practice, metadata repository isn't one product category — it shows
up as four kinds of tooling. Business glossary tools, with an approval
workflow. Data dictionaries, technical table and column metadata. Data
catalogs, combining business and technical metadata into one searchable
inventory. And purpose-built registries, standards-compliant, common in
regulated industries.

## S4 · STEPS CARD (cost of sprawl)

Different teams adopt different tools at different times, for different
reasons — the BI team picks a catalog bundled with their reporting
platform, compliance maintains a separate glossary. Each choice is
individually reasonable. Together, they mean metadata about the same
table now lives in three places, and nothing keeps them in sync.

## S5 · OUTRO CARD

That's exactly why data catalogs increasingly try to be the single
integration point, pulling from the glossary, the database, and
pipeline tools into one place. Next: Chapter 2, the business glossary —
the artifact you'll actually build most often in a real metadata role.
