# Lesson 6 — OneLake Governance

**Chapter 2 · OneLake · Lesson 6 of 25**

## What you'll learn

- What OneLake actually is: one automatic, tenant-wide data lake, not something you provision per project
- What's literally stored in OneLake — every Lakehouse, Warehouse, and Semantic model's folders and files
- Why sharing one underlying lake changes how governance has to be applied
- OneLake File Explorer: a real, convenient access surface worth knowing exists
- The OneLake catalog, previewed here and covered in full in Chapter 4

## One lake, automatically, tenant-wide

**OneLake** is the single data lake that underlies every workload in Microsoft Fabric. Nobody manually provisions a separate lake for a new project the way you might spin up a new storage account — OneLake exists the moment the Fabric tenant does, and every workspace in that tenant draws from it. This is the architectural fact Chapter 2 is built around: Fabric doesn't have a lake *for* Lakehouses, a separate store for Warehouses, and another for Power BI — it has one.

## What's actually stored in OneLake

That isn't an abstraction. Microsoft's own structure diagram shows exactly what sits where:

![Diagram showing OneLake containing a Fabric workspace, which contains three items — Lakehouse, Warehouse, and Semantic model — each holding its own Folders/files.](/courses/microsoft-fabric-data-governance/ch02/06-onelake-governance/structure.png)
*OneLake containing a Fabric workspace, which contains a Lakehouse, a Warehouse, and a Semantic model — each one's actual data stored as folders and files, all inside the same underlying lake.*

A Lakehouse's tables, a Warehouse's tables, and a Semantic model's data all land in OneLake by default. Different tools, different experiences on top — but the same storage layer underneath.

## The governance implication this chapter is built around

Because every workload shares the same lake, governance has to be applied **at the OneLake layer itself** — permissions, security roles, auditing — rather than separately per tool the way you might govern three unrelated products that each kept their own data. A permission mistake isn't boxed into "the Lakehouse product" or "the Warehouse product"; it's visible wherever OneLake is read from. This is exactly why this chapter exists: Lesson 7 covers how Lakehouses and Warehouses actually use OneLake, Lesson 8 covers OneLake security (the fine-grained permissions layered on top of it), and Lesson 9 covers shortcuts, which extend OneLake's reach to data that isn't even stored in it.

## OneLake File Explorer: a real access surface

OneLake isn't only reachable through the Fabric web UI. **OneLake File Explorer** syncs OneLake directly into Windows File Explorer, the same way OneDrive does — workspaces appear as ordinary folders a user can browse, open, and drag files into.

![Screenshot of Windows File Explorer with 'OneLake - Microsoft' in the left navigation pane and a list of workspace folders — SalesWorkspace, ResearchWorkspace, ProjectContoso, Marketing, EngineeringProject — each with a cloud-sync status icon.](/courses/microsoft-fabric-data-governance/ch02/06-onelake-governance/onelake-file-explorer-screen.png)
*OneLake File Explorer: workspaces show up as ordinary synced folders. Convenient — but worth remembering that anything reachable through the Fabric UI is also reachable this way.*

That convenience is also the governance point: OneLake File Explorer doesn't create a separate set of permissions. It's the same OneLake, the same security, just a different window onto it. Whatever a user can see in the Fabric portal, they can see here too.

## The OneLake catalog, previewed

Discovery across OneLake happens through the **OneLake catalog** — a searchable view of items across the tenant, filterable by domain (tying straight back to Lesson 4).

![Screenshot of the OneLake catalog filtered to 'Domain: Finance', with an item list on the left and a selected item's detail panel open on the right showing an 'Adventure Works' semantic model.](/courses/microsoft-fabric-data-governance/ch02/06-onelake-governance/domain-image-onelake-catalog.png)
*The OneLake catalog scoped to the Finance domain — only items assigned to that domain show up in this filtered view.*

Filtering by domain means discovery can be scoped the same way access is: a Finance analyst searching the catalog with the Finance filter applied sees Finance's items, not the whole tenant's. The catalog itself — search, endorsement, lineage from this view — gets a full lesson in Chapter 4; what matters here is that it's domain-aware from the start, because domains (Lesson 4) and OneLake (this lesson) are two ends of the same governance structure.

## Key terms

| Term | Meaning |
|---|---|
| OneLake | The single, automatic, tenant-wide data lake underlying every Fabric workspace |
| OneLake File Explorer | Syncs OneLake into Windows File Explorer, like OneDrive — the same permissions, a different window |
| OneLake catalog | A searchable, domain-filterable view of items across the tenant's OneLake |

## Lab

Open (or imagine) a tenant with Finance and Marketing domains, each with their own workspaces. Write out, step by step, what a Finance analyst would see if they opened the OneLake catalog with no filter applied, versus with the Domain filter set to Finance — and explain, in one sentence, why that filtering only works because domains and OneLake are both tenant-wide structures.

## Check yourself

Can you explain, without looking back, why Fabric governance has to be applied at the OneLake layer rather than per tool? Can you name what's literally stored inside OneLake for a Lakehouse, a Warehouse, and a Semantic model? And can you say what OneLake File Explorer changes about permissions — versus what it doesn't?
