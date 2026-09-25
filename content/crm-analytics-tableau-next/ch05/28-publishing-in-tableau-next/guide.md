# Publishing in Tableau Next

If you learned Tableau in the Tableau course, "publishing" meant pushing a workbook from Desktop up to a server or Tableau Cloud. Tableau Next works differently. There is no separate publish step in that sense, because everything you build already lives in a **workspace** on the Salesforce platform. The real decisions are who can see an asset, and where in the flow of work it shows up. This lesson covers those decisions.

## What you'll learn

- Why the workspace, not the file, is the unit you share in Tableau Next
- The three main ways to put an analysis in front of people: share, embed, template
- The access model, and the trap where sharing analytics does not share the data
- How this differs from the publish-to-server habit you already know

## The workspace is the unit of collaboration

A Tableau Next workspace groups the assets for a project: dashboards, visualizations, semantic models, and the data they use. An asset lives in one workspace but can be **referenced** from others, so a shared semantic model is not copied around. In the workspace list you can see each asset's type, who last modified it, and badges showing whether it is referenced, reused, or extended.

## Way 1: share it

From a workspace, dashboard, visualization, or semantic model you open **Share**, then **Manage Access**, and add individual users or analytics groups.

- **Workspaces** can be shared with a Viewer or Editor role.
- **Other assets** (dashboards, visualizations, semantic models) are shared with the Viewer role.
- **General access** is the default for everyone in the org, and it starts out **restricted**: only the people you added can open the asset.

Sharing a workspace also gives access to the assets inside it, as long as you are allowed to share those assets.

## Way 2: embed it

Analysis is most useful where people already work. Tableau Next dashboards can be added to a **Lightning page** using the Tableau Next Dashboard component in Lightning App Builder. You pick the dashboard, optionally hide its header, and can add filters, including filters driven by record context, such as the Account on an account record page. Configuring this requires an admin-level Tableau Next permission set, so check the current requirements for your org. As of this writing, Tableau Next assets can also be shared into Slack. Check current release notes, because this area changes quickly.

## Way 3: package it as a template

From an open dashboard, an action menu option lets you generate a **dashboard template**. Others can install the template and customize it on their own data. It is a way to share the design and know-how of an analysis rather than one live copy.

## The trap: sharing analytics is not sharing data

This is the rule people forget. Sharing a workspace does **not** share the data model objects the assets depend on. Access to data is controlled separately, through data space and object and field permissions in Data 360 (the product formerly called Data Cloud). A viewer who can open your dashboard but lacks data permissions is still governed by the data rules. Plan both layers together: who can open the analysis, and who is allowed to see the data underneath.

## Key terms

| Term | Meaning |
|---|---|
| Workspace | Container for related Tableau Next assets, and the main unit you share |
| General access | Default org-wide access to an asset; starts restricted |
| Embed | Show a Tableau Next dashboard inside another surface, such as a Lightning page |
| Template | A packaged dashboard others can install and customize |

## Recap

Nothing gets "published" in the Desktop sense. You share a workspace or asset with the right role, embed a dashboard where users already work, or hand out a template. Always remember that data permissions live in Data 360, not in the share dialog.

## Check yourself

A colleague shared a workspace with you as a Viewer, but a dashboard shows no data for you. Which layer should you check first, and why?
