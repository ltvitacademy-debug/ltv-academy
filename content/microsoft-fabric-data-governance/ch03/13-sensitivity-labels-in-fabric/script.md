# Lesson 13 — Sensitivity Labels in Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Three moves from who can open an item to what it's allowed to leave with — starting with Microsoft Purview's sensitivity labels, right inside Fabric.

## S2 · STEPS — What a label actually is

A sensitivity label is Microsoft Purview's classification tag for content — Public, General, Confidential, Highly Confidential, or whatever tiers your organization defines — each with its own protection settings. Fabric doesn't invent new labels; it reuses the ones your compliance team already manages for Office documents and email.

## S3 · SCREENSHOT — Visible wherever items are listed

Once applied, a label shows up as its own Sensitivity column wherever items are listed — reports, dashboards, semantic models — right alongside Owner and Refreshed. A workspace full of unlabeled items is immediately visible, which is exactly the point.

## S4 · SCREENSHOT — The sensitivity bar

Open any Fabric item and the sensitivity bar sits in the header, next to the item's name. Click it, and a flyout shows the current label — Confidential, on this lakehouse — with a dropdown to change it right there, no separate settings screen needed.

## S5 · SCREENSHOT — The second path: item Settings

The same label lives in the item's Settings pane too, under its own Sensitivity label tab. That's also where "Apply to downstream items" lives — a toggle deciding whether this label should automatically flow to anything built on top of it.

## S6 · STEPS — Default and mandatory policies

Most organizations don't leave labeling to individual judgment, call by call. A default label policy pre-fills new content with a starting label. A mandatory label policy goes further — it blocks saving an unlabeled item outright. Both get configured centrally, not per item.

## S7 · SCREENSHOT — The Microsoft Purview compliance portal

That's set in the Microsoft Purview compliance portal, not Fabric itself. Building a label policy, admins reach a "Fabric and Power BI" step with its own checkbox: "Require users to apply a label." Check it, and an unlabeled report or dataset can't be saved until someone picks one.

## S8 · SCREENSHOT — The label follows the data

Label a semantic model, and lineage view shows exactly where that label spreads — every report and dashboard built from it picks up the same lock icon automatically. That's downstream inheritance: label the source once, and everything downstream inherits it.

## S9 · STEPS — What happens on export

The label doesn't stop at the Power BI service boundary. Export a labeled report to Excel, PDF, or PowerPoint, and Power BI stamps the exported file with that same label and its protection settings — so a Confidential report can't quietly become an unprotected file on someone's desktop.

## S10 · OUTRO

Next lesson: Information Protection — the DLP policies and encryption settings that actually enforce what a label only classifies.
