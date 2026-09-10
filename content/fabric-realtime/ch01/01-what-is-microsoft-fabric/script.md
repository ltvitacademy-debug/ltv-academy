# Lesson 1 — What Is Microsoft Fabric? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (course opener).

---

## S1 · TITLE CARD

Welcome to Microsoft Fabric and Real-Time Analytics — the third
course in this data engineering track. Let's start with what
Fabric actually is.

## S2 · CODE CARD (picking up from Databricks)

The last course ended with a real, governed pipeline running on
Databricks. Fabric is a different product built around a similar
core idea — Delta Lake as the shared table format — but with
Microsoft's own SaaS platform and engines around it.

## S3 · CODE CARD (SaaS, not clusters)

Recall Databricks Lesson 4 — creating a cluster meant picking a VM
size, a runtime, autoscaling bounds. Fabric has no equivalent
step. It's a software as a service platform — a workspace and a
capacity, and every engine just runs against it.

## S4 · CODE CARD (OneLake preview)

Every Fabric item actually stores its data in OneLake — one
logical data lake for the whole organization, playing a similar
role to Unity Catalog's metastore. A lakehouse, a warehouse, and
later an eventhouse all read and write the same underlying
storage.

## S5 · OUTRO CARD

Fabric fundamentals, then real-time data engineering, then
production practice — that's this whole course. Next lesson:
Fabric workspaces, where every item actually lives.
