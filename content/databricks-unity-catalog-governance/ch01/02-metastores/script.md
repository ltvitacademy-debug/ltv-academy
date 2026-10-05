# Lesson 2 — Metastores · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 2: metastores — the top-level container every catalog, schema, and table in Unity Catalog is actually registered against.

## S2 · STEPS — The top-level container

A metastore is the top-level container for Unity Catalog metadata. Every catalog in this course lives inside exactly one. Metastores aren't created inside a workspace — account admins create and manage them in the account console, because a metastore's whole purpose is to span workspaces, not live inside one.

## S3 · STEPS — The regional rule

Databricks provisions one Unity Catalog metastore per region, per account — not per workspace. Workspaces in the same cloud region typically attach to that same regional metastore, which is how they end up sharing catalogs, permissions, and audit trails. A workspace in a different region attaches to that region's own metastore instead; getting data across regions goes through Delta Sharing, covered in Chapter 5, not a shared metastore.

## S4 · STEPS — How workspaces connect

A metastore governs nothing until a workspace is assigned to it. Once assigned, every catalog on that metastore becomes visible, subject to permissions, inside that workspace. A workspace attaches to exactly one metastore at a time, but a metastore can have many workspaces assigned to it — that many-to-one relationship is what makes "one governance layer, many workspaces" real.

## S5 · CODE — Checking your metastore

Two statements confirm where you are. SELECT CURRENT_METASTORE returns which metastore your session is attached to. SHOW CATALOGS lists every catalog registered on it that you have permission to see.

## S6 · OUTRO

Next lesson: catalogs and schemas — one level down from the metastore, and where the three-level namespace actually starts.
