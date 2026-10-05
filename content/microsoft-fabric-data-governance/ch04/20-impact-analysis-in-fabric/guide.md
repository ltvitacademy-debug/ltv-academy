# Lesson 20 — Impact Analysis in Fabric

**Chapter 4 · Discovery and Lineage · Lesson 20 of 25**

## What you'll learn

- The specific problem impact analysis solves, and how it's different from the lineage view covered in Lesson 19
- The two places you can open impact analysis for an item
- How to read the impact analysis pane: Child Items vs. All downstream items, and Browse by item type vs. Browse by workspace
- How to notify the people who own affected workspaces before you make a change
- The permission and privacy rules that govern who sees what in the results

## The problem: lineage shows the map, not the blast radius

Lesson 19 covered Fabric's lineage view — a diagram of every item in a workspace and how it connects to what it depends on and what depends on it. Lineage view is genuinely useful for understanding structure, but it has a hard limit: it only renders one workspace's graph, plus external upstream sources one step back. It does not tell you how far a change ripples *downstream*, especially once that ripple crosses into other workspaces you don't normally look at.

That's the exact gap **impact analysis** fills. You run it from a specific item — typically a semantic model (dataset) — right before you're about to change or delete something about it: rename a column, remove a measure, delete the model outright. Impact analysis answers the question lineage view can't: *if I touch this one item, what breaks downstream, in which workspaces, and how many reports and dashboards actually depend on it?*

## Opening impact analysis for an item

There are two entry points, and both start from the item you're considering changing:

- **From that item's card in lineage view** — every card has a small icon in its footer; selecting it opens impact analysis centered on that item.
- **From the item's own details page** — open the **Lineage** dropdown in the page's toolbar and select **Impact analysis**.

![The impact analysis icon highlighted in red on an "Adventure Works" dataset card in lineage view, next to the refresh and highlight-lineage icons.](/courses/microsoft-fabric-data-governance/ch04/20-impact-analysis-in-fabric/open-impact-analysis-from-card.png)
*Microsoft Learn's own screenshot — the impact analysis icon sits in a lineage-view card's footer, alongside the refresh and highlight-lineage controls.*

![The "Lineage" dropdown open on an item's details page for "Adventure Works," with "Open lineage view" and "Impact analysis" listed, and "Impact analysis" highlighted in a red box.](/courses/microsoft-fabric-data-governance/ch04/20-impact-analysis-in-fabric/open-impact-analysis-from-item-details.png)
*The second entry point — an item's own details page has a "Lineage" menu with "Impact analysis" as one of its two options, alongside "Open lineage view."*

Either path opens the same side pane, just scoped to the item you started from.

## Reading the impact analysis pane

The pane that opens is titled "Impacted by this [item type]" and gives you two independent ways to slice the same result set:

- **Child Items vs. All downstream items** — these are tabs at the top of the pane. **Child Items** shows only the items that depend on this one *directly*, one step away. **All downstream items** expands that to everything further down the chain, however many hops away, including items that live in other workspaces entirely. Each tab shows its own count of affected items and workspaces, so switching tabs changes the numbers you see.
- **Browse by item type vs. Browse by workspace** — two small icon buttons let you group the same impacted list either by what kind of item it is (reports, dashboards, and so on) or by which workspace each one lives in.

![Two side-by-side impact analysis panes for a "Marketing Model" dataset: the left pane grouped "Browse by item type" showing 34 impacted child items across Report and Dashboard categories; the right pane grouped "Browse by workspace" showing the same 34 items split between "Sales and Marketing Group" and "Finance Corporate" workspaces.](/courses/microsoft-fabric-data-governance/ch04/20-impact-analysis-in-fabric/impact-analysis-pane-general.png)
*Microsoft Learn's own screenshot, side by side: the same 34 impacted child items across 2 workspaces, grouped by item type on the left and by workspace on the right.*

One real limitation to know: for a **data source**, impact analysis only shows its direct child items — you can't jump straight to "everything downstream" from a data source the way you can from a dataset. To see further downstream from a data source, run impact analysis again on each of its direct children.

A result list can also report that there are "more items with limited access" — covered under Privacy below.

## Notifying the people who'll be affected

Once you know who's downstream, the pane gives you a direct way to warn them. Select **Notify contacts** at the bottom of the pane, write a short note describing the change you made or are planning, and send it.

![The "Notify contacts" dialog box: a title, explanatory text that an email notification goes to all contacts for all impacted workspaces (including ones the sender can't access), a required "Notification message" text box, a caution note that the email may have many recipients, and Send/Cancel buttons.](/courses/microsoft-fabric-data-governance/ch04/20-impact-analysis-in-fabric/notify-contacts-dialog.png)
*Microsoft Learn's own screenshot of the Notify contacts dialog — one message goes to the contact lists of every impacted workspace, by email, with your name attached so people can reply back to you directly.*

That email goes to the **contact lists of every impacted workspace** — not to individual report authors by name — and it's sent even for workspaces you personally don't have access to. Your name is attached to the message so recipients know who to reply to.

## Permissions and privacy

Impact analysis respects two boundaries worth knowing before you rely on it:

- **You need write permission on the item** to run impact analysis on it at all — read-only access isn't enough.
- **You only see real names for workspaces and items you have access to.** Anything downstream that you can't access is listed as **"Limited access"** instead of its actual name, specifically because an item's name can itself contain information that shouldn't be exposed to someone without permission on it.

Notify contacts sidesteps that restriction in one specific way: your notification still reaches the contact lists of workspaces you can't see into, even though you never learn their names.

## How this complements lineage view

Treat the two features as a sequence, not alternatives:

1. **Lineage view** (Lesson 19) is where you first notice structure — what feeds what, inside a workspace, and whether anything looks stale.
2. **Impact analysis** (this lesson) is where you quantify a *specific planned change* — exactly how many reports, dashboards, and workspaces would be touched if you went ahead, including the parts of the chain lineage view can't show you because they live in a different workspace.

In practice: open lineage view to understand the shape of what you're working with, then run impact analysis on the one item you're about to change before you actually change it.

## Key terms

| Term | Meaning |
|---|---|
| Impact analysis | The Fabric feature that shows which downstream items and workspaces would be affected by a change to a given item |
| Child Items | The impact analysis tab showing only items that depend directly (one step) on the item |
| All downstream items | The impact analysis tab showing every affected item further down the chain, across workspaces |
| Notify contacts | The dialog that emails a description of a change to the contact lists of every impacted workspace |
| Limited access | The placeholder label shown instead of a real name for an impacted item you don't have permission to see |

## Lab

Pick a semantic model (dataset) you own in a real Fabric workspace. Open its impact analysis from the item's details page (**Lineage → Impact analysis**). Record the count shown on the **Child Items** tab, then switch to **All downstream items** and record that count too — note whether it grew, and if so, by how much. Switch **Browse by workspace** and list which workspaces showed up. Write two sentences: what's the riskiest single change you could make to this model right now, and based on what you just saw, who would you notify before making it?

## Check yourself

Can you explain, without looking back, the difference between the Child Items and All downstream items tabs, name both places you can open impact analysis from, state what permission you need to run it, and describe what happens to an impacted item's name when you don't have access to it?
