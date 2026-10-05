# Lesson 11 — Lineage to Executive Dashboards · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 10 ended at a dashboard inside one Power BI workspace. This lesson zooms out — to the enterprise catalog that scans Power BI centrally, and to why a dashboard is the one box most of its viewers ever actually see.

## S2 · SCREENSHOT — RECAP

Here's the canvas from Lesson 10 again. Customers360, top right, is the dashboard. Everything to its left — the semantic models, the dataflows, the reports — is invisible to whoever just opens that one dashboard every morning.

## S3 · SCREENSHOT — ENTERPRISE SCALE

Most organizations also govern Power BI through Microsoft Purview, which scans Power BI tenants and pulls that same lineage into an enterprise catalog. Read left to right: a SQL source feeds a Power BI dataset, which feeds a report, which feeds the dashboard — the exact dataflow-to-dashboard pattern this chapter has built toward since Lesson 6. The dataset itself carries governance badges right on the card.

## S4 · SCREENSHOT — TRUST SHORTCUT

Not every dashboard viewer traces its lineage, and most shouldn't have to. Promoted means a content owner flagged it as good practice to reuse. Certified means it passed a more rigorous review, usually by a central governance team. These badges compress lineage's trust into a single glance.

## S5 · OUTRO

You can now follow a number forward, from source to screen. Chapter 3 turns that same chain around: if something upstream changes, what breaks — and how do you find out before your executive does?
