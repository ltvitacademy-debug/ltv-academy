# Lesson 17 — The OneLake Catalog

**Chapter 4 · Discovery and Lineage · Lesson 17 of 25**

## What you'll learn

- What the OneLake catalog is and where it lives in the Fabric navigation pane
- The catalog's three tabs — Explore, Govern, and Secure — and what each one is for
- How the Explore tab's item list, filters, and domain selector help you find things across a whole tenant
- What the item detail pane shows, including the request-access path for items you don't yet have permission to use
- How domains group the catalog's contents when your organization has defined them

## What the OneLake catalog is

The **OneLake catalog** is the central experience in Microsoft Fabric for discovering data, understanding governance status, and managing security across your whole Fabric environment. It's a single place to find, explore, and use the Fabric items you need, and to govern the data you own — rather than hunting through individual workspaces one at a time.

You open it from the **OneLake catalog** icon in the Fabric navigation pane on the left. The same catalog is also embedded in Microsoft Teams, Excel, and Copilot Studio, so people can discover and act on items without leaving those apps. Everything in this lesson is current as of late 2026 — Microsoft has been actively expanding the catalog, so if your tenant looks slightly different, you're likely on a slightly older or newer rollout.

## Three tabs, one entry point

The OneLake catalog is organized into three tabs: **Explore**, **Govern**, and **Secure**. The catalog opens on Explore by default.

![The OneLake catalog's main layout, with Microsoft's own callouts marking the tabs selector, domain filter, item type and tag filters, keyword filter, filter pane, item list, and item details view.](/courses/microsoft-fabric-data-governance/ch04/17-the-onelake-catalog/explore-tab-general-view.png)
*Microsoft's own annotated screenshot of the Explore tab's full layout — the tabs selector top-left shows Explore, Govern, and Secure sitting side by side.*

- **Explore** — find, browse, and inspect the Fabric items you have access to (or can request access to)
- **Govern** — understand your governance status, act on recommended actions, and reach administrative settings
- **Secure** — a unified view of workspace roles and OneLake security roles, for auditing and managing permissions

This lesson focuses on Explore and Govern, since those are the two tabs students use day to day for discovery; Secure is covered properly in the course's security chapters.

## Explore: find what you have access to, or can request

The Explore tab lists every Fabric item you have access to across the tenant, with an items list on the left and an in-context item detail pane that opens next to it — so you can click through several items without losing your place in the list.

The list can be narrowed with:

- **Predefined filters** — All items, My items, Endorsed items, Favorites
- **Item type and tag selectors** — narrow by category (data items, insight items like reports/dashboards, and so on) or by organizational tags
- **A keyword filter** — free-text search across the list
- **A workspace filter** — scope to one workspace or browse "All workspaces"

One detail worth calling out explicitly: the list also shows some items you **don't** have access to yet — specifically semantic models their owner marked as discoverable, and reports whose data violates a data-loss-prevention policy. Fabric surfaces these on purpose, so you can see that something relevant exists and request access to it, rather than never knowing it was there.

## Domains group the catalog's contents

If your organization has set up **domains** (a way of grouping workspaces by business area — Finance, HR, Marketing, Sales, and so on), the catalog's domain selector lets you scope the whole Explore view to just one domain or subdomain.

![The OneLake catalog's domain selector dropdown, open and showing four domains — Finance, HR, Marketing, Sales — with Finance expanded to reveal a Finance UK subdomain.](/courses/microsoft-fabric-data-governance/ch04/17-the-onelake-catalog/explore-domains-selector.png)
*Selecting "Finance" here would narrow the entire item list — and the Govern tab's insights — to just that domain and its subdomains.*

Your domain selection persists across sessions, and the same selector also scopes the Govern tab's governance insights and recommended actions to that domain — so a domain admin can look at just their own slice of the tenant instead of the whole estate.

## Govern: the governance-focused view

The Govern tab is where you understand the governance health of the data you own (or, with tenant-wide permissions, the entire estate) and act on recommendations to improve it. It has two views: **All data estate** (the organization-wide picture — the default if you have tenant-wide visibility) and **My items** (scoped to content you personally own).

![The Govern tab's "Your organization-wide data estate in Fabric at a glance" insights panel, showing counts for Domains, Capacities, Workspaces, and Items, plus charts for items by type, workspaces by capacity SKU, top operations, and most-viewed reports.](/courses/microsoft-fabric-data-governance/ch04/17-the-onelake-catalog/govern-tab-insights-admins.png)
*The All data estate view's Governance Insights panel — a tenant-wide snapshot refreshed daily, with a "View more" button for the full report.*

Below the insights, a **Recommended Actions** section surfaces specific cards — for example, items missing a description, items with no owner, or content that isn't endorsed — each with an explanation of why it matters and the steps to fix it. The Govern tab also now hosts administrative experiences that used to live only in the Admin portal: capacities, workspaces, tenant configuration, domains, and more, all reachable from the same place.

## The item detail pane

Selecting any item — in Explore, or from a workspace's "View details" option — opens its **item detail pane**, with four tabs:

![An item detail pane for a semantic model named "Regional Sales Sample," showing Overview, Lineage, Monitor, and Permissions tabs, plus Location, Refreshed, Owner, and a "Public" sensitivity label.](/courses/microsoft-fabric-data-governance/ch04/17-the-onelake-catalog/item-details-view.png)
*The Overview tab — the default view — surfaces an item's description, location, last refresh, owner, sensitivity label, tags, and endorsement status at a glance.*

- **Overview** (default) — description, location, last refresh, owner, sensitivity label, tags, endorsement, and a **Tables** section showing the item's schema
- **Lineage** — the item's upstream and downstream relationships, viewable as a list or a graph, with a link into full impact analysis
- **Monitor** — historical refresh and run activity for the item
- **Permissions** — who has access, any sharing links, and pending access requests (visible only if you're an Admin or Member on the item's workspace)

If an item is listed but you don't yet have permission to use it — like a discoverable semantic model you can see but not open — the detail pane is also where you request access. Once the owner grants Build permission, the same pane unlocks the rest of its capabilities: viewing the underlying data, building reports on top of it, and more.

## Key terms

| Term | Meaning |
|---|---|
| OneLake catalog | Fabric's central, tenant-wide experience for discovering items and managing governance, opened from the left nav |
| Explore tab | Lists items you have access to (or can request), with filters, selectors, and an in-context item detail pane |
| Govern tab | Surfaces governance insights and recommended actions, plus administrative settings, for the data you own or the whole estate |
| Domain | An organization-defined grouping of workspaces (e.g., Finance, Sales) that scopes what the catalog shows |
| Item detail pane | The Overview/Lineage/Monitor/Permissions view opened by selecting any catalog item |
| Discoverable semantic model | A semantic model its owner made visible in the catalog even to users without access, so they can find it and request access |

## Lab

Open the OneLake catalog in your own tenant (or a Fabric trial). On the Explore tab, apply the "My items" filter, then open the detail pane for one item you own and check its Overview, Lineage, and Permissions tabs. If your tenant has domains configured, switch the domain selector and note how the item list changes. Write two sentences: one describing what the Lineage tab showed for your item, and one describing what changed in the list when you scoped to a domain (or noting that your tenant has no domains defined yet).

## Check yourself

Can you name the OneLake catalog's three tabs and say in one sentence what each is for? Can you explain why the Explore tab sometimes lists items you don't have access to, and what you'd do about one of them? Can you name all four tabs of the item detail pane and what each shows?
