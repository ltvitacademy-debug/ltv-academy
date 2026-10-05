# Lesson 16 — Data Discovery in Fabric

**Chapter 4 · Discovery and Lineage · Lesson 16 of 25**

## What you'll learn

- Why discoverability is a governance control, not just a convenience feature
- How the global Search box finds items by name, creator, tag, and workspace — across the whole tenant
- How to browse the OneLake catalog's Explore tab when you don't know an item's exact name
- How to filter an items list by item type, workspace, and owner to narrow down what you're looking at
- How endorsement badges (Promoted, Certified, Master data) help you judge which asset to trust before reusing it

## Why discovery matters before you build anything new

Every Fabric tenant eventually accumulates duplicate pipelines, lakehouses, and semantic models — built by people who never knew a working version already existed. Those untracked, unowned copies are what governance practitioners call **shadow data assets**: nobody maintains them, nobody certifies them, and nobody can tell a new analyst which one is actually correct.

Discoverability — the simple ability to find out what already exists before you start building — is the first real defense against that sprawl. This lesson covers the three ways Fabric surfaces existing items across a tenant: the global Search box, the OneLake catalog's browse experience, and the filters that narrow either one down by workspace, type, and owner. The next lesson, Lesson 17, goes deep on one specific piece of this — the OneLake catalog item itself.

## The global Search box

The fastest way to check whether something already exists is the search box at the top of the Fabric portal, available from Home and from almost every other page in Fabric. Type a keyword and it searches by **item name, title, creator, tag, or workspace** — across every workspace in the tenant, not just the one you happen to be in.

Global search is powered by Azure AI Search, and critically for governance: **results only ever show content you're already allowed to access.** It won't reveal the existence of items you have no permission to see, so search itself respects the same security boundaries as everything else in Fabric.

## Browsing the OneLake catalog's Explore tab

Search is fast when you know roughly what you're looking for. When you don't — when the question is "does *any* sales lakehouse already exist?" rather than "where is the one called Sales_SQLDB?" — the better tool is the **OneLake catalog**, opened from the OneLake icon in the Fabric navigation pane.

The catalog's **Explore tab** is the browse experience: a single list of every Fabric item you have access to, across every workspace, with an item-details pane that opens alongside the list so you can click through several candidates without losing your place. The **item type category selector** at the top of the list lets you narrow it down before you even start scrolling — to just Data items, Insights, Processes, Solutions, or Configurations.

![OneLake catalog's item type selector, showing the Data/Insights/Processes/Solutions/Configurations categories and the expanded list of insight types (Report, App, Dashboard, Data agent, and more).](/courses/microsoft-fabric-data-governance/ch04/16-data-discovery-in-fabric/onelake-catalog-explore-item-type-selector.png)
*Real Microsoft Learn screenshot — the OneLake catalog Explore tab's item type selector. Narrowing to a category before scrolling the list is usually faster than paging through everything.*

## Filtering by workspace, type, and owner

Fabric's left-hand navigation pane is itself a second entry point into the same inventory. Selecting **Workspaces** opens a panel with its own keyword search, plus filters for item type and tags — handy when you already know roughly which workspace an asset lives in and just want to jump straight there instead of going through the catalog.

![The Fabric navigation pane (Home, Workspaces, OneLake, Real-Time, Monitor, Workloads) with the Workspaces panel open, showing its own search box and Item type / Tags filters.](/courses/microsoft-fabric-data-governance/ch04/16-data-discovery-in-fabric/workspace-tags-filtering.png)
*Real Microsoft Learn screenshot — the Workspaces panel reachable from the nav rail. Several different doors in Fabric lead into the same underlying list of items.*

Wherever you land — global search results, the OneLake catalog's Explore tab, or a workspace's own item list — the same filter pattern shows up: narrow by **Type**, by **Workload**, and by **Owner**. Filtering by owner is the one that actually prevents duplicate work: it tells you exactly who to go ask for access instead of quietly rebuilding what they already maintain.

![A Fabric filter panel listing Task, Type, Workload, Owner, and Tags filters, with two tags already checked.](/courses/microsoft-fabric-data-governance/ch04/16-data-discovery-in-fabric/tags-filter.png)
*Real Microsoft Learn screenshot — the same Task / Type / Workload / Owner / Tags filter pattern that recurs across Fabric's list views. Filtering by Owner is the fastest way to find out who to ask before you rebuild something.*

## Endorsement badges as a discovery signal

Search and browse results aren't just a flat, alphabetical list. Items that have been **endorsed** carry a visible badge and, in several list views, are shown first. There are three badges:

- **Promoted** — the item's creator thinks it's ready for other people to find and reuse. Anyone with write permission on an item can promote it.
- **Certified** — an organization-authorized reviewer has verified the item meets the organization's quality standards. Only reviewers a Fabric admin (or domain admin) designates can certify.
- **Master data** — the item is the authoritative, single source of truth for a core business entity, like customers or product codes. Only Fabric-admin-designated users can apply this label, and only to items that contain data, such as lakehouses and semantic models.

Seeing a Certified or Master data badge next to a search result is a strong, built-in signal of which asset to reuse rather than duplicate. Lesson 18, "Endorsement and Certification," covers how these badges are actually applied and governed.

## Key terms

| Term | Meaning |
|---|---|
| OneLake catalog | Fabric's central experience for discovering, governing, and securing items; opened from the OneLake icon in the navigation pane |
| Explore tab | The OneLake catalog's browse view — a filterable, tenant-wide list of every item you have access to |
| Global search | The search box at the top of the Fabric portal; searches by name, title, creator, tag, or workspace via Azure AI Search, permission-trimmed to what you can see |
| Shadow data asset | An untracked, duplicate data asset built because the person who made it couldn't find — or didn't look for — an existing one |
| Endorsement badge | Promoted, Certified, or Master data label shown on an item in search and browse results as a trust signal |

## Lab

Open the Fabric portal (or imagine you're looking at a tenant with dozens of workspaces). Write down the exact sequence of clicks you'd use for each of these three scenarios: (1) you know a semantic model is called "Contoso FY21 goals" but not which workspace; (2) you want to see every lakehouse that exists anywhere in the tenant; (3) you want to know who owns the warehouse your team keeps hearing about so you can ask for access instead of rebuilding it.

## Check yourself

Can you explain, without looking back, the difference between using global search and browsing the OneLake catalog's Explore tab — and name which of the three endorsement badges signals an organization-verified single source of truth versus a creator's own opinion that an item is reuse-ready?
