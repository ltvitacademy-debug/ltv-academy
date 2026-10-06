# Lesson 10 — Sensitivity Labels in Power BI · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Sensitivity labels — classification that travels with content wherever it goes, in or out of Power BI.

## S2 · STEPS — Where sensitivity labels come from

Sensitivity labels are a Microsoft Purview Information Protection feature, the same labeling system used across Word, Excel, and Outlook, extended into Power BI. A tenant admin has to enable them for Power BI first — once enabled, the organization's own label taxonomy becomes available on Power BI content too.

## S3 · SCREENSHOT — Applying a label in Desktop

In Power BI Desktop, the Sensitivity control sits right on the Home ribbon. Several labels expand into sub-labels — the organization's own taxonomy, not something Power BI invents.

## S4 · SCREENSHOT — Where it shows

Once applied, the label shows in the status bar at the bottom of the window — there's never any doubt what's currently set. And it travels with the file itself: publish the report, and the label publishes with it.

## S5 · SCREENSHOT — Setting a label on published content

A label doesn't have to be set only in Desktop. It can be set or changed directly in the service — on a dashboard's settings, for instance, since dashboards have no Desktop equivalent of their own.

## S6 · SCREENSHOT — Same control on a semantic model

The same control exists on a semantic model's settings page. Reports, models, dataflows, and dashboards can each carry their own label — they don't have to match, though a mismatch across related items is usually worth a second look.

## S7 · STEPS — What a label actually does

Both service screens carry the same quiet warning: some label settings, like encryption and content marking, aren't enforced in Power BI. A label is always a classification — visible, auditable, travels with exports. Whether it's also a technical control depends entirely on how the tenant's label policy is configured.

## S8 · OUTRO

Chapter two complete. Next: chapter three, trust and quality — starting with endorsement.
