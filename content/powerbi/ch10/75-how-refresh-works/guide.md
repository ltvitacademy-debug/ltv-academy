# Lesson 75 — How Power BI Refresh Works

**Chapter 10 · Refresh & Gateways · Lesson 1 of 4**

## What you'll learn

- Why only Import-mode semantic models need a data refresh at all
- The daily refresh limits by license and capacity
- The difference between data refresh, OneDrive refresh, and tile refresh
- Why a renamed column can make a service refresh fail

## Only one storage mode actually needs this chapter

Lesson 71 covered three storage modes: Import, DirectQuery, and Composite.
Refresh, as a concept, only matters for one of them:

![Diagram of storage modes and semantic model types, showing which require a data refresh.](/courses/power-bi/ch10/75-how-refresh-works/storage-modes-dataset-types-diagram.png)
*Only Import mode copies data in — so only Import mode needs refreshing to catch up with the source.*

- **Import mode** copies source data into the semantic model. That copy
  goes stale the moment the source changes, so it needs a refresh —
  scheduled or on demand — to catch up.
- **DirectQuery, Direct Lake, and live connection** modes never copy
  data in the first place; every query goes straight to the source, so
  there's nothing to "catch up." (Dashboard *tiles* built on these
  still refresh roughly hourly — that's a separate, smaller mechanism.)
- **Push mode** has no defined data source at all; an external process
  pushes new data in directly.

Everything in this chapter is really about keeping Import-mode
semantic models — like your `AdventureWorksDW2014` imports — current.

## Triggering a refresh

You can trigger a refresh either on a schedule (Lesson 77) or on
demand, right now:

![Screenshot of the Refresh now option in the Power BI service.](/courses/power-bi/ch10/75-how-refresh-works/refresh-now.png)
*"Refresh now" doesn't count against your scheduled-refresh daily limit.*

## Daily refresh limits

Refresh capacity is finite, and the limit depends on where the
semantic model lives:

| License / capacity | Scheduled refreshes per day |
|---|---|
| Shared capacity (Power BI Pro) | Up to 8 |
| Premium Per User, Premium, or Fabric capacity | Up to 48 |

The 8-per-day quota resets daily at 12:01 AM in whatever time zone the
semantic model's settings specify:

![Screenshot of the time zone setting on a semantic model's refresh settings.](/courses/power-bi/ch10/75-how-refresh-works/power-bi-refresh-data-01.png)
*Set this correctly first — every scheduled slot you configure in Lesson 77 is relative to it.*

Manual "Refresh now" clicks don't count against the 8- or 48-per-day
scheduled quota — but they still consume real capacity resources, so
they're not truly unlimited either.

## Three kinds of refresh, not one

"Refresh" is actually shorthand for several distinct mechanisms, and
knowing which one you're dealing with matters when something breaks:

| Refresh type | What it does |
|---|---|
| **Data refresh** | Re-imports data from the source into an Import-mode semantic model |
| **OneDrive refresh** | Syncs a semantic model with its source `.pbix`/`.xlsx` file when that file lives on OneDrive/SharePoint — separate from pulling fresh data from the *original* data source |
| **Tile refresh** | Updates dashboard tile caches, roughly hourly, independent of the underlying data refresh |

## Why a renamed column breaks refresh in the service

Data refresh in the service only re-imports rows — it never re-reads
your source's table/column structure. If you rename or remove a
column at the source (or in Desktop) without republishing, the
service's next refresh fails, because it's still expecting the old
structure. Fixing this requires a **schema refresh**, which only
happens in Desktop, followed by a republish — exactly the republish
mechanics Lesson 70 covered.

## Key terms

| Term | Meaning |
|---|---|
| Data refresh | Re-importing source data into an Import-mode semantic model |
| Tile refresh | Updating a dashboard tile's cached visual, separate from the underlying data |
| Schema refresh | Picking up a source structure change (renamed/added/removed column) — Desktop only |
| Refresh now | An immediate, on-demand refresh that doesn't count toward the scheduled quota |

## Lab

1. Open the semantic model behind your `AdventureWorksDW2014` report
   in the service and confirm its time zone under semantic model
   settings.
2. Select **Refresh now** and watch it complete — note it doesn't
   require anything from the scheduled-refresh settings you haven't
   configured yet.
3. In Desktop, rename one column in `DimProduct` (then rename it back)
   to see for yourself, conceptually, why the service can't recover
   from a structural change without a republish.

## Check yourself

You're ready for Lesson 76 when you can explain, in one sentence, why
DirectQuery-mode semantic models never need a data refresh at all.
