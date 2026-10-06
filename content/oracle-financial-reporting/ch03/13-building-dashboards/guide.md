# Building Dashboards

A single analysis answers one question well. A dashboard answers several related questions at once, laid out together so a team can check them in one place, every day, without hunting through the catalog. This lesson covers how OTBI dashboards are structured and how they relate to the analyses you've already learned to build.

## What you'll learn

- What a dashboard is, relative to an analysis
- Dashboard pages and columns as the layout structure
- Dashboard-level prompts versus analysis-level prompts
- Embedding dashboards and analyses directly inside work areas

## A dashboard is a container for analyses, not a new kind of content

A dashboard does not have its own facts and dimensions — it's a layout container that arranges existing, already-built analyses (and other content, like links or text) onto one or more pages. If lesson 11's "unpaid invoices over $10,000" analysis and a second analysis showing total payables by supplier both exist in the catalog, a dashboard can display both side by side, without rebuilding either one.

This is a deliberate separation: you build and refine analyses once, then compose them into however many dashboards make sense for different audiences — an AP team dashboard, a controller's close dashboard, an executive summary dashboard — all potentially reusing some of the same underlying analyses.

## Pages and columns

A dashboard is organized into:

- **Pages** — a dashboard can have multiple tabs, each a different page, so related-but-distinct content (say, "Aging Overview" and "Supplier Detail") doesn't have to compete for space on one screen.
- **Columns within a page** — content on a page is arranged into column regions, into which you drag analyses, letting you control whether two pieces of content sit side by side or stacked vertically.

A well-built dashboard page usually leads with a summary view (a graph or key metrics) near the top, with supporting detail tables below or to the side — the same "overview first, detail on demand" principle that applies to most reporting.

## Dashboard-level prompts

Just as an individual analysis can have a prompt (lesson 12), a dashboard can have a **dashboard-level prompt** that applies to every analysis on the page at once — a single Business Unit selector at the top of the dashboard that filters every analysis beneath it simultaneously, rather than requiring the viewer to set the same prompt separately on each one. This is usually the better choice when multiple analyses on the same dashboard page should always be sliced the same way.

## Embedding dashboards inside work areas

Dashboards (and individual analyses) aren't limited to living inside the standalone Reports and Analytics catalog. Oracle Fusion lets embedded analytics appear directly inside a transactional work area — an AP-relevant analysis or dashboard showing up right on the Payables work area's landing page, so a user sees a relevant snapshot without navigating anywhere else. This embedding is configured separately from building the underlying content, but it's part of why OTBI content feels woven into the application rather than bolted on.

## Recap

A dashboard arranges already-built analyses onto pages and columns, optionally with a dashboard-level prompt that filters every analysis on the page at once, and can be embedded directly inside a work area rather than only living in the standalone catalog. Next up, lesson 14: getting this content out to people who aren't sitting in front of the dashboard themselves — scheduling and sharing.
