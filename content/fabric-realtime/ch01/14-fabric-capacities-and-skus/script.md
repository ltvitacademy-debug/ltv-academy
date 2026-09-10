# Lesson 14 — Fabric Capacities and SKUs · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's name the real currency Fabric compute actually runs on —
capacities and SKUs.

## S2 · CODE CARD (Capacity Units)

Recall Lesson 1's preview — a capacity is a managed compute pool.
That pool is measured in capacity units, one number, spent by
whichever engine is actually working. Every engine shares the
same pool — there's no separate budget per item type.

## S3 · CODE CARD (F-SKUs)

An F-SKU is simply a fixed number of capacity units, purchased as
one unit — Fabric's real answer to Databricks Lesson 4's VM-size
decision, just chosen once per capacity instead of once per
cluster.

## S4 · CODE CARD (bursting/smoothing)

And bursting lets a job briefly use more than the capacity
nominally provides, while smoothing spreads the real cost out over
time. Together, an occasional heavy job doesn't force you to
permanently buy a bigger SKU.

## S5 · OUTRO CARD

One shared pool, sized to sustained load, not worst-case peaks.
Next lesson: Git integration and deployment pipelines, real
version control for Fabric items.
