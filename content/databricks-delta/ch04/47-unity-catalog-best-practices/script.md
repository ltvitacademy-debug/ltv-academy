# Lesson 47 — Unity Catalog Best Practices · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes (chapter finale).

---

## S1 · TITLE CARD

Chapter 4's finale — the real conventions that make Unity Catalog
actually scale.

## S2 · CODE CARD (catalogs per environment)

The real best practice is one catalog per environment — dev,
staging, prod — with the same schemas underneath, consistently.
Not one catalog per project, which fragments the namespace and
makes moving a table from dev to prod much harder to reason about.

## S3 · CODE CARD (grant to groups)

And grant to groups, not individuals. The syntax is identical
either way, but a group means access naturally follows role
changes — someone joining inherits the right access, someone
leaving loses it, with zero grants needing to be touched by hand.

## S4 · STEPS CARD (chapter recap)

This chapter added a real governance layer, the true three-level
namespace, proper catalog and schema setup, managed versus
external ownership, grant and revoke, row and column security,
automatic lineage, governed volumes, and Delta Sharing reaching
outside your own organization entirely.

## S5 · OUTRO CARD

Every table here is still run through notebooks and manually
scheduled jobs. Chapter 5: Lakeflow, unifying ingestion, pipelines,
and orchestration into one coherent system.
