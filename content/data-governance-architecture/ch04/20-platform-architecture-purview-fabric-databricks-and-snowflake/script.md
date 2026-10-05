# Lesson 20 — Platform Architecture: Purview, Fabric, Databricks and Snowflake · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Four platforms this career path already has full courses on. This lesson doesn't re-teach any of them — it compares the architectural shape each one actually chose.

## S2 · STEPS — Four platforms, one line each

Snowflake builds governance directly into the warehouse engine — Governance is just a tab in Snowsight. Databricks Unity Catalog centralizes it in one metastore spanning every workspace, even across clouds. Microsoft Fabric governs across several workload types because they all share one lake, OneLake. Microsoft Purview is a hub explicitly built to reach into other vendors' platforms entirely.

## S3 · STEPS — The real axis: reach

Order them by reach. Snowflake governs its own engine. Unity Catalog governs across Databricks workspaces, still within Databricks. Fabric governs across workload types, still one Microsoft product. Purview governs across platforms entirely — Azure, Microsoft 365, AWS, even Snowflake — because its job is reaching into other systems, not running compute itself.

## S4 · STEPS — They compose, not compete

Fabric's own governance course lists Purview integration as one of its own chapters. Purview doesn't replace Fabric's native governance — it extends it, for organizations that need to see beyond Fabric. The same pattern holds generally: a cross-platform hub sits above a platform's native governance, pulling from it, not replacing it.

## S5 · STEPS — What to actually ask

Don't ask which is best — they answer different questions. Ask what's the widest-reach layer your organization actually needs, and which native layers it needs to sit on top of. A single-platform company may never need more than that platform's own governance. A company running three different platforms has no native tool that sees across all three.

## S6 · OUTRO

Next lesson closes this chapter: governance automation — how everything from policy as code to these platforms' own enforcement actually runs, continuously, without a human remembering.
