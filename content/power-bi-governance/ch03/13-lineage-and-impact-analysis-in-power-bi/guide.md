# Lesson 13 — Lineage and Impact Analysis in Power BI

**Chapter 3 · Trust and Quality · Lesson 13 of 20**

## What you'll learn

- How lineage view's automatic diagram makes a certified dataset's chain visible to a governance reviewer
- How impact analysis answers a different question lineage alone can't: exactly who depends on this item
- How to count every impacted child item and workspace before changing anything
- How to warn every affected owner in one click, before you break their report

## Lineage view, through a governance lens

Earlier in this career path you met Power BI's **lineage view** as a way to trace how data flows. From a governance seat, it's also how you answer a different question: *if this dataset carries a Certified badge, what exactly is riding on it?*

![Screenshot of the Power BI lineage view canvas, showing semantic models and dataflows on the left connected by curved lines to reports in the middle and a dashboard on the right.](/courses/power-bi-governance/ch03/13-lineage-and-impact-analysis-in-power-bi/service-data-lineage-view.png)
*Every workspace's automatic lineage diagram: data sources, semantic models, reports, and dashboards connected left to right.*

Every workspace gets this diagram automatically — nobody has to draw it or keep it current by hand, which is exactly why it holds up as a governance tool instead of going stale like a manually maintained wiki page would.

## Isolating the chain that matters

A workspace full of certified and uncertified content side by side is hard to reason about at a glance. Selecting one artifact's double-arrow icon isolates just its chain.

![Screenshot showing one artifact's lineage highlighted in the Power BI lineage view, with its specific upstream and downstream connections in color and unrelated artifacts dimmed gray.](/courses/power-bi-governance/ch03/13-lineage-and-impact-analysis-in-power-bi/service-data-lineage-specific-artifact.png)
*Selecting one artifact highlights everything upstream and downstream of it — exactly the question a governance review needs answered.*

That's useful for understanding structure. But lineage view shows *connections* — it doesn't total up the actual blast radius in numbers, or let you message every affected owner. That's what impact analysis is for.

## Opening impact analysis

From a lineage card, the impact-analysis icon opens a dedicated view built for exactly one question: before I touch this, who's going to notice?

![Screenshot showing the impact-analysis icon highlighted on a dataset's card in lineage view.](/courses/power-bi-governance/ch03/13-lineage-and-impact-analysis-in-power-bi/open-impact-analysis-from-card.png)
*A card's impact-analysis icon opens the next question lineage can't fully answer on its own: who actually depends on this?*

## Every impacted item, counted

The impact analysis pane gives you a number, not just a diagram — impacted child items, grouped either by item type or by workspace.

![Screenshot of the impact analysis side panel, showing 34 impacted child items across 2 workspaces, browsable by item type or by workspace.](/courses/power-bi-governance/ch03/13-lineage-and-impact-analysis-in-power-bi/impact-analysis-pane-general.png)
*Impact analysis counts every impacted child item and workspace before you ever touch the dataset.*

For a certified dataset specifically, this number is the real cost of changing it. A small, single-workspace dataset might show two or three dependents. A certified enterprise dataset can easily show dozens, spanning workspaces you don't even have access to yourself — which is exactly the scenario the next screen is built for.

## Warning everyone before you touch anything

Impact analysis doesn't stop at counting. One button sends a real notification to every contact across every impacted workspace.

![Screenshot of the Notify contacts dialog, with a required notification message field and a note that the email may reach many recipients across impacted workspaces.](/courses/power-bi-governance/ch03/13-lineage-and-impact-analysis-in-power-bi/notify-contacts-dialog.png)
*One click notifies every contact across every impacted workspace — including ones you don't have access to yourself.*

This closes the loop a certified badge opens: certification tells people they can depend on a dataset, impact analysis is how the dataset's owner finds out exactly who took them up on that — and gives them a direct way to warn those people before a change lands.

## Key terms

| Term | Meaning |
|---|---|
| Lineage view | A workspace's automatically generated diagram of every artifact's connections |
| Impact analysis | A dedicated view that counts and lists every item downstream of a given artifact |
| Notify contacts | A one-click action that emails every contact across every impacted workspace |

## Lab

Imagine you're about to change the refresh schedule on a certified dataset. Sketch the sequence you'd actually follow using this lesson's two screens: which view tells you the chain exists, which view gives you the number of impacted items, and at what point you'd send the notification — before the change, or after?

## Check yourself

Without looking back, can you explain the one capability impact analysis gives you that lineage view's diagram, on its own, does not?
