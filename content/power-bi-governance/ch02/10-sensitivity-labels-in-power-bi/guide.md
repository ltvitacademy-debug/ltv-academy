# Lesson 10 — Sensitivity Labels in Power BI

**Chapter 2 · Semantic Models and Security · Lesson 10 of 20**

## What you'll learn

- What a sensitivity label is, and where it comes from (Microsoft Purview Information Protection, not Power BI itself)
- How to apply a label in Power BI Desktop, and where it shows once applied
- How to set or change a label on content already published to the service
- What a sensitivity label does and doesn't actually enforce

## Where sensitivity labels come from

**Sensitivity labels** are a Microsoft Purview Information Protection feature — the same labeling system used across Office apps (Word, Excel, Outlook) — extended into Power BI. A tenant admin has to enable sensitivity labels for Power BI before they show up anywhere; once enabled, the same label taxonomy an organization already uses elsewhere (Public, General, Confidential, Highly Confidential, and so on) becomes available on Power BI content too.

## Applying a label in Desktop

In Power BI Desktop, the **Sensitivity** control sits on the Home ribbon:

![Screenshot of the Power BI Desktop Home ribbon with the Sensitivity dropdown open, showing label options Non-Business, Public, General, Confidential (with a submenu arrow), and Highly Confidential (expanded to show Contoso Extended and Any User (No Protection) sub-labels).](/courses/power-bi-governance/ch02/10-sensitivity-labels-in-power-bi/sensitivity-label-desktop.png)
*Several of these labels expand into sub-labels — the organization's label taxonomy, not something Power BI invents on its own.*

Once applied, the label shows in the report's status bar at the bottom of the window, so there's never any doubt about what's currently set:

![Screenshot of the Power BI Desktop status bar reading 'Highly Confidential\Any User (No Protection)' next to the report's page tabs.](/courses/power-bi-governance/ch02/10-sensitivity-labels-in-power-bi/sensitivity-label-desktop-status-bar.png)
*The label travels with the .pbix file itself — publish the report, and the label publishes with it.*

## Setting a label on already-published content

A label doesn't have to be set only in Desktop before publishing — it can be set or changed directly in the Power BI service, on a dashboard's settings:

![Screenshot of a dashboard's Settings pane in the Power BI service, showing a Sensitivity label section with a dropdown set to Highly Confidential\Any User (No Protection), a note about enforcement limits, and Save/Cancel buttons.](/courses/power-bi-governance/ch02/10-sensitivity-labels-in-power-bi/set-sensitivity-label-dashboard.png)
*Dashboards, being service-only objects with no Desktop equivalent, can only ever get their label set here.*

The same control exists on a semantic model's settings page, covered back in Lesson 6's settings-pane overview:

![Screenshot of a dataset's settings page in the Power BI service, Sensitivity label section expanded with the dropdown set to General, and Apply/Discard buttons.](/courses/power-bi-governance/ch02/10-sensitivity-labels-in-power-bi/set-sensitivity-label-dataset-settings.png)
*Reports, semantic models, dataflows, and dashboards can each carry their own label — they don't have to match, though mismatched labels across related items are usually a sign something was missed.*

## What a label actually does — and doesn't

Both screenshots above carry the same quiet warning: *"Some sensitivity label settings, such as file encryption settings and content marking, are not enforced in Power BI."* That's worth taking seriously. A sensitivity label is:

- **A classification** — a visible, auditable marker of how sensitive content is, that travels with exports (Excel, PDF, PowerPoint) and downstream copies
- **Not automatically a technical control** — depending on tenant configuration, some labels also apply real encryption and access restriction; others are classification-only

The distinction matters because it's easy to assume applying "Highly Confidential" alone locks a report down. It doesn't, by itself — it classifies the content and (if the tenant's label policy configures it) can trigger real protections. Confirm with tenant admins which labels in the organization's taxonomy carry actual enforcement versus which are classification-only.

## Why labels matter for governance

- **They travel.** A label on a semantic model or report follows exports and downstream copies, unlike a workspace permission that stops at the workspace boundary.
- **They're auditable.** An admin can report on what's labeled what across the tenant — a classification baseline that doesn't exist without labels.
- **They can be made mandatory.** Tenant settings can require a label before publishing, closing the gap where sensitive content ships unlabeled by oversight rather than choice.

## Key terms

| Term | Meaning |
|---|---|
| Sensitivity label | A Microsoft Purview Information Protection classification extended into Power BI content |
| Label taxonomy | The organization's own set of labels (e.g., Public, General, Confidential) and sub-labels |
| Classification vs. enforcement | A label always classifies; it only enforces real protection (encryption, access limits) if the tenant's label policy configures that |
| Status bar | Where a currently-applied label shows in Power BI Desktop |

## Lab

A semantic model is labeled "General," but a report built from it is labeled "Highly Confidential." Using what you learned about labels on related items not having to match, explain why this mismatch is still worth investigating rather than assuming it's fine.

## Check yourself

Can you explain where sensitivity labels come from, and why a tenant admin has to enable them before they appear in Power BI? Can you describe the difference between a label that only classifies content and one that also enforces real protection?
