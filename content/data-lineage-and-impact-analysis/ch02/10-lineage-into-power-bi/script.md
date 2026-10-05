# Lesson 10 — Lineage Into Power BI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lessons 6 through 9 built up the theory. Power BI's lineage view is where that theory becomes a screen you can actually click through — a diagram every workspace gets automatically, with nobody drawing it by hand.

## S2 · SCREENSHOT — OPENING LINEAGE VIEW

From a workspace's list view, open the View dropdown and select Lineage. You need at least a Contributor role and a Pro license to see it — Viewers can't switch to this view.

## S3 · SCREENSHOT — THE CANVAS

The canvas lays out every artifact left to right, in the direction data actually flows — semantic models and dataflows, then reports, then dashboards. Each connecting line is a lineage edge, the exact relationship the last four lessons described in the abstract, now rendered automatically.

## S4 · SCREENSHOT — ISOLATING ONE ARTIFACT

Select the double-arrow icon under any card, and Power BI highlights everything connected to it — upstream and downstream — and dims the rest. This is the single most useful move in the view: a one-click preview of the impact-analysis technique Chapter 3 covers in depth.

## S5 · SCREENSHOT — FULL METADATA

Select the card itself instead of the icon, and a side panel opens with that artifact's full metadata — sensitivity label, endorsement, refresh time, and every table it contains, without leaving the canvas.

## S6 · OUTRO

Next lesson: zooming out from one workspace's lineage view to an enterprise-wide catalog, and what the same chain looks like when it ends at a dashboard an executive checks every morning.
