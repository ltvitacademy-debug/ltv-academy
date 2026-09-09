# Lesson 10 — Databricks Runtime and Versions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

What's actually running underneath a cluster? Databricks Runtime
and versions.

## S2 · CODE CARD (what a runtime is)

Choosing a runtime version on the compute form picks the entire
software stack a cluster boots — a specific Spark version, the OS,
and Databricks' own libraries and optimizations on top. It's not
just Spark — it's Spark, plus everything Databricks adds.

## S3 · CODE CARD (LTS)

L-T-S versions get extended support and stability for a much
longer window. Production jobs — the unattended, scheduled kind —
should almost always pin to a specific L-T-S version, so a routine
upgrade elsewhere doesn't unexpectedly change behavior underneath a
job nobody's watching.

## S4 · CODE CARD (Photon)

And Photon has been on by default for years now — a native,
vectorized engine that accelerates the same DataFrame and SQL work
from Foundations' Chapter 4, completely unmodified, just faster
underneath.

## S5 · OUTRO CARD

A full stack, not just Spark — pin to L-T-S for anything unattended.
Next lesson: jobs, turning a notebook into a real, unattended
pipeline.
