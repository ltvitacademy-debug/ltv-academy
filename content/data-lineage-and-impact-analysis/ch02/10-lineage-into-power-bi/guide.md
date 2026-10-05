# Lesson 10 — Lineage Into Power BI

**Chapter 2 · Tracing Data · Lesson 10 of 25**

## What you'll learn

- Power BI's real "Lineage view" — a built-in, auto-generated diagram, not something you draw yourself
- How to open it, and what each kind of card on the canvas represents
- How selecting one artifact highlights just its chain and dims the rest
- How to pull up an artifact's full metadata — sensitivity, certification, refresh time — from the same canvas

## A real feature, not a concept

Lessons 6 through 9 built up the theory: source systems, ETL/ELT, lakes and warehouses, semantic models. Power BI's **lineage view** is where that theory becomes a screen you can actually click through — a workspace-level diagram showing every data source, semantic model, dataflow, report, and dashboard, connected by the exact lineage relationships between them. Every workspace gets one automatically; nobody has to draw it.

## Opening lineage view

From a workspace's list view, open the **View** dropdown and select **Lineage**. You need at least a Contributor role in the workspace, and a Power BI Pro license, to see it — Viewers can't switch to this view.

![Screenshot showing the lineage option highlighted in the View dropdown menu of a Power BI workspace.](/courses/data-lineage-and-impact-analysis/ch02/10-lineage-into-power-bi/service-data-lineage-view-select.png)
*Selecting Lineage from a workspace's View dropdown — the switch that turns a flat list into a traceable diagram.*

## Reading the canvas

Once open, the canvas lays out every artifact as a card, connected left to right by the direction data actually flows — data sources, then semantic models and dataflows, then reports, then dashboards.

![Screenshot of the Power BI lineage view canvas, showing semantic models and dataflows on the left connected by curved lines to reports in the middle and a dashboard on the right.](/courses/data-lineage-and-impact-analysis/ch02/10-lineage-into-power-bi/service-data-lineage-view.png)
*The lineage canvas: semantic models and dataflows feeding reports, which feed a dashboard — the highlighted connector is one single lineage edge in that chain.*

Each connecting line is a lineage edge, the exact same relationship Lessons 6-9 described in the abstract — just rendered automatically instead of documented by hand. Semantic model and dataflow cards show their last refresh time and whether they're certified or promoted (a governance signal covered more in Lesson 11).

## Isolating one artifact's chain

A busy workspace can have dozens of cards. To cut through the noise, select the double-arrow icon under any card to highlight everything connected to it — upstream and downstream — and dim everything else.

![Screenshot showing one artifact's lineage highlighted in the Power BI lineage view, with its specific upstream and downstream connections in color and unrelated artifacts dimmed gray.](/courses/data-lineage-and-impact-analysis/ch02/10-lineage-into-power-bi/service-data-lineage-specific-artifact.png)
*Selecting "Account revenues" highlights only its own chain — a one-click preview of the impact-analysis technique Chapter 3 covers in depth.*

This is the single most useful move in the whole view for anyone doing real lineage work: instead of reading the entire canvas, you isolate the one thread you actually care about.

## Pulling up full metadata

Selecting an artifact's card itself (not the double-arrow icon) opens a side panel with that artifact's full metadata.

![Screenshot of the metadata side panel in Power BI lineage view, showing sensitivity label, endorsement status, refresh time, and a list of tables for a selected semantic model.](/courses/data-lineage-and-impact-analysis/ch02/10-lineage-into-power-bi/service-data-lineage-side-pane.png)
*The side panel for a selected semantic model — sensitivity label, endorsement, refresh time, and every table it contains, without leaving the canvas.*

Between the diagram and this panel, lineage view answers both halves of "what is this and what does it touch": the panel tells you what the artifact *is*, the diagram tells you what it's *connected to*.

## Key terms

| Term | Meaning |
|---|---|
| Lineage view | A workspace's automatically generated diagram of every artifact and its lineage relationships |
| Data source card | A card showing the originating data source (and gateway, if on-premises) for a semantic model or dataflow |
| Specific-artifact highlight | Selecting one artifact's chain to highlight it and dim everything unrelated |
| Side panel | Metadata detail (sensitivity, endorsement, refresh time, tables) for a selected artifact |

## Lab

If you have access to a Power BI workspace with a Contributor role or higher, open its lineage view and select one artifact's double-arrow icon. Note how many artifacts light up versus how many dim — that number is a rough measure of that artifact's "blast radius," the exact question Chapter 3's impact analysis lessons formalize. If you don't have access, sketch what you'd expect your own team's primary report's lineage chain to look like, based on what you already know about its data sources.

## Check yourself

Without looking back, can you describe what each of the three interactions in this lesson does: opening lineage view itself, selecting an artifact's double-arrow icon, and selecting an artifact's card?
