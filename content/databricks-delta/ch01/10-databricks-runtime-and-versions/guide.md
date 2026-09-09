# Lesson 10 — Databricks Runtime and Versions

**Chapter 1 · Databricks Fundamentals · Lesson 10 of 57**

## What you'll learn

- Databricks Runtime: the actual software stack a cluster boots
- What's bundled in beyond plain Apache Spark
- LTS versions, and why production jobs usually pin to one
- Photon — what it accelerates, and why it's on by default

## What a "runtime" actually is

Choosing a **Databricks Runtime Version** on the compute form
(Lesson 4) picks the entire software stack that cluster boots with:
a specific Apache Spark version (Foundations' Chapter 3, running
underneath everything), the OS, and a curated set of pre-installed
libraries and performance optimizations layered on top by
Databricks itself. It's not "just Spark" — it's Spark plus
everything Databricks adds to make it faster and easier to use in
practice.

## Not just plain, open-source Spark

Recall Foundations Lesson 38's Catalyst optimizer as part of Spark
itself — the Databricks Runtime adds further optimizations and
integrations on top of that, plus native connectors, security
patches, and compatibility fixes that don't exist yet (or ever) in
open-source Spark alone. This is a real, meaningful part of why
teams choose Databricks over running raw open-source Spark
themselves.

## LTS — Long Term Support

```
Databricks Runtime 14.3 LTS
```

An **LTS** version receives extended support and stability
guarantees for a much longer window than a regular release.
Production jobs — the unattended, scheduled kind from Lesson 5 —
should almost always pin to a specific LTS version, so a routine
platform upgrade elsewhere doesn't unexpectedly change behavior
underneath a job nobody's actively watching. Interactive,
exploratory work can more safely track the newest version instead.

## Photon — on by default since 9.1 LTS

**Photon** is a native, vectorized query engine that accelerates
much of the SQL and DataFrame work covered throughout Foundations'
Chapter 4 — the same PySpark code runs, unmodified, just faster
underneath. It's been on by default for years now; the main reason
to ever disable it is a specific, documented compatibility issue
with something else you're running.

## Key terms

| Term | Meaning |
|---|---|
| Databricks Runtime | The full software stack a cluster boots: Spark version, OS, libraries, optimizations |
| LTS | A version with an extended support window — the right choice for production jobs |
| Photon | A native, vectorized engine that accelerates the same PySpark/SQL code, on by default |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
should a scheduled production job pin to a specific LTS version
rather than "always use the newest"?
