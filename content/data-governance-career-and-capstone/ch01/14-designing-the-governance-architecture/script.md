# Lesson 14 — Designing the Governance Architecture · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Thirteen lessons of deliverables need an actual place to run. This
lesson designs it.

## S2 · STEPS CARD (from intended to designed)

Lesson 1 called Summit the intended governed analytics layer, with
almost nothing feeding it. Thirteen lessons later there are CDEs,
quality rules, lineage, access policy, and an AI checklist — all
needing a real architecture, not just a name.

## S3 · CODE CARD (target-state architecture)

Atlas, Beacon, Comet, and Harbor feed Snowflake through scheduled ELT
jobs into a raw zone, then a conformed zone gated by Lesson 7's
quality checks, then a golden zone built on Lesson 9's survivorship
rules. Purview catalogs all of it, feeding Power BI and the two AI
pilots from Lesson 13.

## S4 · STEPS CARD (platform choice)

This isn't a generic recommendation. Atlas is already SQL Server and
reporting is already Power BI. Beacon and Comet are already cloud
SaaS, so a cloud warehouse meets them where they live. And Purview
attaches Lesson 6 and Lesson 10's rules to the real tables, not a
wiki that drifts out of date.

## S5 · STEPS CARD (zone ownership)

Each zone has an owner: the raw zone belongs to whichever domain
owner's system feeds it, the conformed zone to that CDE's steward,
the golden zone jointly to the owners who agreed to it at the
council, and catalog standards to Marcus Ibe's governance office.

## S6 · STEPS CARD (where AI plugs in)

Both AI pilots are consumption-layer citizens. The forecasting model
reads the conformed zone after the quality gate. The support
assistant reads a governed, scrubbed extract — never the raw Beacon
and Comet tables directly.

## S7 · OUTRO CARD

Next: Lesson 15 pulls everything built across fourteen lessons into
one assembled deliverables package.
