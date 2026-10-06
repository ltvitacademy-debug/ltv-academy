# The Reports and Analytics Pane

Before you can choose the right reporting tool for a job, you need to know where Oracle Fusion actually keeps its reports. Almost everything you will build or run in this course — OTBI analyses, BI Publisher reports, Financial Reporting Studio output, saved Smart View queries — ends up cataloged in one shared place: Reports and Analytics. This lesson is a tour of that pane: how to open it, how it's organized, and how it connects to the work areas you already know.

## What you'll learn

- How to open the Reports and Analytics work area, and the panel tab version embedded in other work areas
- How the catalog is organized into folders
- The difference between an "Analysis" and a "Report" in the catalog
- How Reports and Analytics connects to the Financial Reporting Center you'll tour in Chapter 2

## Two ways to reach the same catalog

Oracle Fusion gives you two doors into the same underlying catalog:

1. **The standalone Reports and Analytics work area.** From the Navigator, under Tools, select Reports and Analytics. This opens a full-page view of the catalog: every analysis, dashboard, and report you have permission to see, organized into folders.
2. **The Reports and Analytics panel tab.** Many transactional work areas — Payables, Receivables, General Accounting, and others — have a panel tab on the right-hand side labeled Reports and Analytics. Clicking it slides out a narrower version of the same catalog, pre-filtered (where Oracle has set it up that way) to content relevant to the work area you're already in.

Both doors lead to content stored in the same underlying repository, sometimes still referred to in Oracle documentation by its older name, the Oracle Business Intelligence Presentation Catalog. You are not looking at two different catalogs — you are looking at the same catalog through a wide-angle lens and a zoomed-in lens.

## How the catalog is organized

Inside Reports and Analytics, content is arranged into folders, much like a file system:

- **Shared Folders** hold content Oracle seeds out of the box, plus anything your organization has published for everyone to use — predefined reports, standard analyses, and dashboards delivered by financial modules like Payables or Receivables.
- **My Folders** (sometimes shown as a personal folder under your own name) holds content you have created or saved yourself, visible only to you unless you explicitly share it.
- Folders can be browsed, or you can search the catalog by name if you already know roughly what you're looking for.

## Analyses versus Reports: a naming distinction that matters

Inside the catalog, Oracle draws a consistent line between two words that sound similar but mean different things:

- An **Analysis** is OTBI content: something built with drag-and-drop criteria against a subject area, producing tables, pivot tables, or graphs, usually meant for interactive, ad hoc use.
- A **Report** (specifically, in this catalog, an Oracle Analytics Publisher / BI Publisher report) is a data-model-plus-template object, usually built for a precise, repeatable, often scheduled output format.

You'll build both kinds in this course — an Analysis in Chapter 3, a Report in Chapter 4 — and this catalog is where both of them live once they're saved, whether you built them yourself or Oracle shipped them.

## Why this pane matters even if you never build a report

Even if your entire job someday is configuring Payables or Receivables and you never author a single analysis, you will still use Reports and Analytics constantly: to find a predefined aging report, to re-run last month's analysis, to check whether a dashboard someone built already answers the question a client just asked you. Knowing your way around this one pane saves you from recreating work that already exists.

## Recap

The Reports and Analytics pane — reachable as a full work area or as an embedded panel tab — is the shared catalog where OTBI Analyses and BI Publisher Reports both live, organized into Shared Folders and My Folders. Next up, lesson 3: with the landscape mapped and the catalog located, how do you actually decide which tool to reach for on a given request?
