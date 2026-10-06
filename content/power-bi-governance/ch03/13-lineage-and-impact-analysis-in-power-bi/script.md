# Lesson 13 — Lineage and Impact Analysis in Power BI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

You've already met Power BI's lineage view for tracing data flow. From a governance seat it answers a different question too: if this dataset carries a Certified badge, what's actually riding on it?

## S2 · SCREENSHOT (lineage canvas)

Every workspace gets this diagram automatically — data sources, semantic models, reports, and dashboards, connected left to right. Nobody draws it by hand, which is exactly why it stays current instead of going stale.

## S3 · SCREENSHOT (isolate artifact)

Selecting one artifact's double-arrow icon highlights just its chain and dims the rest. That's useful for structure — but it doesn't total up the actual blast radius in numbers, or let you message every affected owner.

## S4 · SCREENSHOT (open impact analysis)

That's what impact analysis is for. From a card in lineage view, this icon opens a view built for one question: before I touch this, who's going to notice?

## S5 · SCREENSHOT (impact analysis pane)

It gives you a real number — impacted child items, grouped by type or by workspace. For a certified enterprise dataset, that number can easily span dozens of items across workspaces you don't even have access to yourself.

## S6 · SCREENSHOT (notify contacts)

And it doesn't stop at counting. One button emails every contact across every impacted workspace — closing the loop certification opens: it tells people they can depend on a dataset, and this is how the owner warns them before a change lands.

## S7 · OUTRO CARD

Next lesson: usage metrics and monitoring. Lineage shows what's connected — usage shows what's actually being used.
