# Lesson 19 — Lineage in Fabric

**Chapter 4 · Discovery and Lineage · Lesson 19 of 25**

## What you'll learn

- What the Fabric lineage view actually shows, and where it comes from
- How to open lineage view from a workspace, and from an individual item
- How to read the diagram: cards, icons, arrows, and refresh status indicators
- What "upstream" and "downstream" mean in a lineage graph, and the view's limits
- Why lineage view matters for governance — before you ever touch impact analysis

## What the lineage view shows

In any real analytics setup, data rarely moves in one hop. A pipeline lands raw files in a lakehouse, a dataflow reshapes them, a semantic model builds measures on top, and one or more reports read from that model. When someone asks "why isn't this report up to date?" or "what actually feeds this number?", tracing that chain by hand — item by item, workspace setting by workspace setting — doesn't scale.

Fabric's **lineage view** answers that directly. Every workspace has one automatically; no setup, no extra licensing. Open it and you see every item in that workspace, connected to the other items it depends on or feeds, laid out as a diagram you can pan and zoom.

## Opening lineage view

Lineage is accessible from more than one place, so you're never far from it:

- **From the workspace toolbar** — a dedicated lineage icon near the top of the workspace list view opens the diagram for the whole workspace.
- **From an item's own option menu** (the "**…**" next to any item, including inside the OneLake catalog) — select **View lineage** to jump straight into the diagram centered near that item.
- **From the menu items at the top of an item's own details page.**

![Opening lineage view from an item's own options menu, with "View lineage" highlighted near the bottom of the menu.](/courses/microsoft-fabric-data-governance/ch04/19-lineage-in-fabric/lineage-options-menu.png)
*Microsoft's own screenshot — the "View lineage" command on an item's "…" options menu, one of several entry points into the same diagram.*

Any user with a role in the workspace can open its lineage view. Viewers can see the diagram too, but the **Viewer** role specifically does not see data source cards — a deliberate governance boundary, not an oversight.

## Reading the diagram

Once open, the lineage view is an interactive canvas of cards and connecting arrows:

- **Cards are items.** Each card names the item, shows its type (Lakehouse, Dataflow, Datamart, semantic model/dataset, report, dashboard, KQL database, and so on) with a small icon, and — where relevant — a **Refreshed:** timestamp.
- **Arrows show direction.** An arrow from Card A to Card B means data flows from A into B — A is upstream of B, B is downstream of A.
- **Items outside the workspace appear too, one level up.** If a dataflow or dataset pulls from a source outside this workspace, that source's card shows the external workspace's name so you can tell it isn't local.
- **Downstream items that live in a different workspace are not shown here.** Lineage view only renders one workspace's graph plus external upstream sources one step back. To see how an item's output ripples into other workspaces downstream, that's a job for **impact analysis** — covered in the next lesson.

![The full lineage view for a sample workspace: lakehouses and KQL databases feeding datasets and a datamart on the left, flowing right into semantic models and finally into reports, with refresh timestamps and a warning icon on several dataset cards.](/courses/microsoft-fabric-data-governance/ch04/19-lineage-in-fabric/lineage-view.png)
*Microsoft Learn's reference diagram — read it left to right: sources feed the lakehouse, the lakehouse feeds datasets and a datamart, those feed semantic models, and the semantic models feed the reports on the far right.*

**Refresh status is shown directly on the nodes**, not buried in a separate log. A plain timestamp means the last refresh completed; a warning triangle next to the timestamp flags a refresh that failed or needs attention — exactly where you'd look first if a report downstream looks stale.

![A single zoomed item card showing its refresh timestamp, plus the "highlight item lineage" and "open impact analysis" icons in its footer.](/courses/microsoft-fabric-data-governance/ch04/19-lineage-in-fabric/lineage-item-card.png)
*A close-up of one card's footer — the curved arrow highlights that item's lineage path on the canvas; the other icon jumps straight into impact analysis for that item.*

To cut through a busy diagram, select the small arrow icon at the bottom-right of any card to **highlight that item's lineage** — Fabric lights up every related upstream and downstream card and dims everything else. You can also zoom in/out or go full screen from controls in the canvas's bottom-right corner, and the canvas supports keyboard navigation and screen readers for accessibility.

## Why this view matters for governance

Lineage view isn't just a diagram for its own sake — it's a governance tool with three concrete jobs:

1. **Tracing a number back to its source.** When a stakeholder asks "where did this figure in the report actually come from?", lineage view gives a visual, auditable answer instead of institutional memory.
2. **Auditing data flow for compliance.** Reviewers can see, at a glance, which sources feed which reports — useful evidence when demonstrating that sensitive data is flowing only through approved, governed paths.
3. **Understanding scope before you touch anything.** Lineage view is where you first notice how many items sit downstream of something you're about to change. It doesn't quantify the blast radius of a specific planned change by itself — that's what the next lesson's impact analysis workflow is built for — but it's the map you'd look at first.

One caveat worth knowing: correct lineage between a semantic model and a dataflow is only guaranteed if the connection was set up through the **Get Data** UI with the Dataflows connector. A manually written Mashup query to the same dataflow may not show up correctly in the diagram.

## Key terms

| Term | Meaning |
|---|---|
| Lineage view | A per-workspace diagram showing every item and how it connects to the others it depends on or feeds |
| Upstream / downstream | Upstream = where an item's data comes from; downstream = what consumes that item's output |
| Item card | A node in the lineage diagram representing one item, with its type icon and, where relevant, a refresh timestamp |
| Highlight item lineage | The canvas action that lights up one item's full upstream/downstream chain and dims the rest |
| Impact analysis | The related Fabric feature (next lesson) for assessing a planned change's downstream blast radius, including outside the current workspace |

## Lab

Open lineage view for one of your own Fabric workspaces (workspace toolbar icon, or an item's "…" menu → **View lineage**). Pick any report in the diagram and trace it backward: what semantic model feeds it, what feeds that model, and is there a warning icon anywhere in the chain? Write two sentences describing what you'd check first if that report's numbers suddenly looked wrong.

## Check yourself

Can you explain, without looking back, the difference between what lineage view shows upstream versus downstream, name at least two places you can open it from, and describe what a warning triangle on a card's refresh timestamp means?
