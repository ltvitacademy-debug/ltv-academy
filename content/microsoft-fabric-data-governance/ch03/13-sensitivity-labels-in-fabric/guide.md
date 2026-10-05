# Lesson 13 — Sensitivity Labels in Fabric

**Chapter 3 · Security and Protection · Lesson 13 of 25**

## What you'll learn

- What a sensitivity label is — a Microsoft Purview classification tag (Public, General, Confidential, Highly Confidential, or whatever tiers your organization defines), each carrying its own protection settings
- Where a label shows up and how to apply or change one from the sensitivity bar at the top of any open Fabric item
- The difference between a *default* label policy and a *mandatory* label policy, and why both are configured centrally in the Microsoft Purview compliance portal, not per item
- How a label applied to a lakehouse, warehouse, or semantic model flows downstream automatically to the reports and dashboards built on top of it
- What happens to a label when labeled data is exported out of Power BI to Excel, PDF, or PowerPoint

## What a sensitivity label actually is

A **sensitivity label** is Microsoft Purview Information Protection's classification tag for content. Most organizations define a small ladder of tiers — something like **Public → General → Confidential → Highly Confidential** — and each tier can carry its own **protection settings**: file encryption, who's allowed to open content carrying that label, and whether content markings (headers, footers, watermarks) get applied automatically. Fabric doesn't invent a separate labeling system of its own. It reuses the exact same labels your compliance team already manages for Office documents, email, and SharePoint — created and published centrally in the **Microsoft Purview compliance portal** (`purview.microsoft.com`), not inside Fabric.

In Fabric, labels can be applied to lakehouses, warehouses, KQL databases, notebooks, semantic models, reports, dashboards, dataflows, and more. Applying a label by itself doesn't change who can *open* the item — that's still governed by workspace roles and item permissions, covered in the previous two lessons. What a label does is travel with the content and determine what happens to it once it leaves Fabric, and it gives every item on screen a visible, at-a-glance classification.

## Where labels show up, and applying one from the sensitivity bar

Once sensitivity labels are enabled for the tenant, a label appears as its own **Sensitivity** column everywhere items are listed — right alongside Owner, Refreshed, and Endorsement.

![Screenshot of a Power BI workspace list view with a Sensitivity column on the right, showing labels like General, Confidential for Finance, and Highly Confidential on different items.](/courses/microsoft-fabric-data-governance/ch03/13-sensitivity-labels-in-fabric/sensitivity-labels-column.png)
*A workspace's Sensitivity column — every dashboard, report, and dataset carries its own label, so an unlabeled item is immediately visible in the list.*

To apply or change a label on an *open* item, the fastest path is the **sensitivity bar** itself — the indicator sitting right in the item's header, next to its name. Selecting it opens a flyout with the current label and a dropdown to pick a different one, with no separate settings screen required.

![Screenshot of the sensitivity label flyout open on a Fabric lakehouse item, showing the current label 'Confidential' in the header and a Sensitivity dropdown in the flyout panel, with a note that sensitivity is automatically applied to downstream items.](/courses/microsoft-fabric-data-governance/ch03/13-sensitivity-labels-in-fabric/apply-sensitivity-label-flyout.png)
*The sensitivity bar lives in the item header itself — click the current label to open the flyout and change it on the spot.*

The same control is duplicated in the item's **Settings** pane, under its own **Sensitivity label** tab. That's also where the **Apply to downstream items** toggle lives — the switch that decides whether this label should automatically propagate to anything built on top of this item.

![Screenshot of a Fabric KQL database's Settings pane with the Sensitivity label tab selected, showing a Sensitivity dropdown set to Confidential and an 'Apply to downstream items' toggle switched on.](/courses/microsoft-fabric-data-governance/ch03/13-sensitivity-labels-in-fabric/apply-sensitivity-label-side-pane.png)
*The Settings pane's Sensitivity label tab is the second way to reach the same control — and the only place to see the downstream-propagation toggle explicitly.*

Applying a label in the Fabric portal requires a Power BI Pro or Premium Per User (PPU) license and Edit permission on the item. If the sensitivity option is greyed out, the usual cause is a missing license or a Purview label policy that doesn't include that user.

## Default and mandatory labeling policies, set centrally in Purview

Most organizations don't leave labeling to individual judgment, item by item. Two policy types, both built in the **Microsoft Purview compliance portal** rather than in Fabric itself, enforce it at scale:

- A **default label policy** pre-fills unlabeled new Fabric and Power BI content — reports, dashboards, semantic models — with a starting label the moment it's created. Users can always change it if it's not the right one.
- A **mandatory label policy** goes further: it blocks saving changes to an unlabeled item at all. Try to save a new report, or edit an existing unlabeled one, and Fabric stops you until a label is applied.

Both are configured on the same label policy, in the same wizard, at **Classification → Sensitivity labels → Label policies** in the Purview portal.

![Screenshot of the 'Create policy' wizard in the Microsoft Purview compliance portal, on the 'Fabric and Power BI' settings step, showing a Default label dropdown and a checked 'Require users to apply a label to their Fabric and Power BI content' checkbox.](/courses/microsoft-fabric-data-governance/ch03/13-sensitivity-labels-in-fabric/require-users-set-label.png)
*The mandatory-labeling checkbox lives on its own "Fabric and Power BI" step of the label policy wizard — separate from the equivalent setting for files and email, so the two can be turned on independently.*

A mandatory label policy for Fabric and Power BI is independent of the mandatory policy for files and email — an organization can require labels on Power BI reports without requiring them on every Word document, or vice versa. Service principals and APIs are exempt from mandatory labeling, and a handful of item types (scorecards, Dataflow Gen1/Gen2, streaming semantic models and dataflows) aren't supported yet.

## Downstream inheritance — the label follows the data

Apply a label to a semantic model, and it doesn't stop there. **Downstream inheritance** automatically applies that same label to everything built from it — other semantic models, reports, and dashboards. Apply a label to a report, and it flows to any dashboards built from that report's visuals.

![Screenshot of Power BI lineage view showing a semantic model 'Customer profitability' with a lock icon, connected to three downstream reports and one dashboard, all carrying the same lock icon indicating an inherited sensitivity label.](/courses/microsoft-fabric-data-governance/ch03/13-sensitivity-labels-in-fabric/downstream-inheritance-lineage-view.png)
*Lineage view makes the propagation visible: label the semantic model on the left, and every report and dashboard downstream picks up the same lock icon automatically — no separate click per item.*

Two safeguards keep this from overriding someone's deliberate choice: downstream inheritance **never overwrites a label that was applied manually**, and it **never replaces a label with a less restrictive one**. By default, it runs in **user-consent mode** — a checkbox next to the label selector lets the person applying the label decide whether to also push it downstream (it's checked by default). A Fabric admin can instead turn on **fully automated downstream inheritance** as a tenant setting, which propagates labels without asking, regardless of the editor's permissions on the downstream item.

Downstream inheritance is a different mechanism from **inheritance upon creation**: when you build a brand-new report on top of an already-labeled semantic model, the new report inherits that label immediately, on creation, whether or not downstream inheritance is enabled at all.

## What happens when labeled data is exported

A label's protection isn't enforced while content stays inside the Power BI service — access there is still controlled purely by permissions, not by the label. The label's encryption and protection settings activate the moment content **leaves** Power BI through a supported export path: **export to Excel, PDF, or PowerPoint**, **Analyze in Excel**, a live-connected **PivotTable**, or **downloading a .pbix file**. In every one of those cases, Power BI automatically stamps the exported file with the source report's label and applies that label's protection settings — so a Confidential report doesn't quietly become an unprotected spreadsheet the moment someone exports it. If the report and its underlying semantic model carry two different labels, the more restrictive of the two is the one applied to the exported or downloaded file. Export to unsupported paths, like plain CSV, doesn't carry the label at all — which is exactly why Purview DLP policies (the next lesson's companion topic) exist to catch those gaps.

## Key terms

| Term | Meaning |
|---|---|
| Sensitivity label | Microsoft Purview's classification tag (e.g. Public/General/Confidential/Highly Confidential), applied to Fabric items and carrying its own protection settings |
| Sensitivity bar | The label indicator in an open Fabric item's header; clicking it opens a flyout to view or change the label |
| Default label policy | A Purview policy that pre-fills new, unlabeled content with a starting label |
| Mandatory label policy | A Purview policy that blocks saving an unlabeled item until a label is applied |
| Downstream inheritance | Automatic propagation of a label from a semantic model or report to everything built on top of it |
| Inheritance upon creation | A new item automatically receiving its labeled parent's label the moment it's created |

## Lab

Open (or imagine) a Fabric workspace with a lakehouse, a semantic model built on it, and two reports built on that semantic model. Write out, step by step: (1) where in the portal you'd apply a "Confidential" label to the lakehouse, (2) what setting you'd need to check to make sure that label automatically reaches the semantic model and both reports, and (3) what happens to the label if someone then exports one of those reports to PDF versus exports it to a plain CSV file.

## Check yourself

Can you explain, without looking back, the two places in the Fabric portal where you can view or change an item's sensitivity label? Can you state the difference between a default label policy and a mandatory label policy, and where both are actually configured? And can you explain why downstream inheritance never overwrites a manually applied label or replaces a label with a less restrictive one?
