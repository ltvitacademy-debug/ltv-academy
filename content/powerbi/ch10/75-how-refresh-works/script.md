# Lesson 75 — How Power BI Refresh Works · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Only one of the storage modes from Lesson 71 actually needs anything
in this chapter. Here's which one, and why.

## S2 · IMAGE: storage-modes-dataset-types-diagram.png

Import mode copies data in, so that copy goes stale. DirectQuery and
live connection modes query the source live, every time — there's
nothing to catch up.

## S3 · IMAGE: refresh-now.png

You can trigger a refresh on a schedule, or right now, on demand.
Refresh now doesn't count against your daily scheduled quota.

## S4 · CODE: Shared capacity 8/day -> Premium/PPU/Fabric 48/day

That quota depends on where the semantic model lives — eight scheduled
refreshes a day on shared capacity, up to forty-eight on Premium, PPU,
or Fabric capacity.

## S5 · OUTRO CARD

Refresh only re-imports rows, never structure — rename a column at the
source and the service refresh breaks until you republish from
Desktop. Lesson 76 covers the gateway that makes on-premises refresh
possible at all.
