# Lesson 20 — Monitoring and Compliance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Everything so far in this chapter sets up controls. This lesson is about finding out whether those controls are still working.

## S2 · STEPS — What monitoring adds

Lakehouse Monitoring profiles a table on a schedule and builds a dashboard from the results automatically — it's what tells you whether data quality is holding up over time, not just whether a control exists on paper.

## S3 · SCREENSHOT — Opening the dashboard

Every monitored table gets a real Quality tab in Catalog Explorer, with a View dashboard button linking straight to the generated metrics — no separate setup needed just to look at it.

## S4 · SCREENSHOT — An ordinary dashboard

That same dashboard shows up in the workspace's general Dashboards list, right alongside everything else — monitoring isn't a separate, hidden system, it's a dashboard like any other.

## S5 · SCREENSHOT — Reading the filters

Row count and percent-null trends, filterable by date range and slice — the same controls an analyst uses for any dashboard. Refreshing it re-runs queries over already-computed metrics; it doesn't trigger a new profile calculation on its own.

## S6 · STEPS — Where it all connects

Classification results are filterable by compliance framework — GDPR, HIPAA, PCI DSS. That one label connects everything in this chapter: which columns are classified, who queried them, where the data flows, and whether access is shrinking or growing — one standing question instead of a one-time audit.

## S7 · OUTRO

Chapter Five picks up from here — Delta Sharing and governance, extending these same controls to data you share outside your own metastore entirely.
