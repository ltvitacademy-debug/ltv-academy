# Lesson 11 — Fabric Item Permissions

**Chapter 3 · Security and Protection · Lesson 11 of 25**

## What you'll learn

- The difference between workspace roles (Admin/Member/Contributor/Viewer) and item-level permissions
- The distinct permission types Fabric grants per item — Read, Edit/Write, Reshare, Execute, Build, and the Read All variants
- How to open an item's Manage permissions panel and see who has direct access
- How permissions granted directly to a user differ from permissions inherited from a workspace role
- When item-level permissions are actually needed on top of (or instead of) a workspace role

## Two separate layers of access

Every Fabric workspace has four roles — **Admin**, **Member**, **Contributor**, **Viewer** — and a role applies to *everything* in that workspace: every report, semantic model, lakehouse, warehouse, and notebook inside it. That's workspace-level access, and it's confined to that one workspace; it doesn't carry over to other workspaces, the capacity, or the tenant.

But every individual item in Fabric also has its own, separate permission layer. You reach it from the item itself — not from workspace settings — through a **Manage permissions** panel. Item sharing exists for exactly two situations: giving access to someone who has no role at all in the workspace, or layering extra permissions on top of a role someone already has.

## Opening Manage permissions

Select the **Share** button on an item, or the **Manage permissions** quick action from its context menu (the ellipsis next to the item name), and you land on the panel shown below.

![Manage permissions panel for a Fabric item, showing links that give access and the list of people with direct access, with Microsoft's own callout on the edit-link icon.](/courses/microsoft-fabric-data-governance/ch03/11-fabric-item-permissions/manage-permission-pane.png)
*The Manage permissions panel for a single item ("Sample item") — organization and specific-people links at the top, and a separate "People with direct access" list below, completely independent of the workspace's own role assignments.*

The panel has two sections: **Links that give access** (shareable links, each with their own audience and permission settings) and **People with direct access** (individual grants to named users or groups). Selecting **Advanced** at the bottom opens the full permission management page for finer control — search, filtering, and bulk changes.

## The permission types Fabric grants per item

Unlike a workspace role, which is a single label, an item-level grant is built from specific, combinable permission types. The advanced management page lists exactly which ones apply to each grant:

![Advanced permission management page for a Fabric item, with the Direct access tab highlighted and a Permissions column listing "Read, reshare, build" for each link.](/courses/microsoft-fabric-data-governance/ch03/11-fabric-item-permissions/select-direct-access-tab.png)
*The advanced management page's Links tab. The Permissions column spells out exactly what each link grants — here, "Read, reshare, build" — rather than a single opaque role name.*

Per Microsoft's own item permission model, the core types are:

- **Read** — discover the item (in the data hub / OneLake catalog) and open it. Always included whenever an item is shared.
- **Edit** (Write) — modify the item or its content.
- **Share** (Reshare) — share the item onward, and grant recipients up to the same permissions the sharer holds.
- **Read all with SQL analytics endpoint** — query Lakehouse/Warehouse data through T‑SQL via the SQL analytics endpoint, without the item's own SQL security policy applied.
- **Read all with Apache Spark** — read Lakehouse or Warehouse data through OneLake APIs and Spark, and through the Lakehouse explorer.
- **Build** — specific to semantic models: lets the recipient build new reports against it, without being able to edit the model itself.
- **Execute** — run or cancel execution of the item (notebooks, pipelines, and similar).
- **Subscribe to OneLake events** — subscribe to OneLake events for lakehouses, warehouses, mirrored databases, SQL databases, and KQL databases.

Not every item exposes every permission — a notebook's options look different from a semantic model's or a lakehouse's — but Read, Edit, and Share are the common baseline across all of them.

## Granted directly vs. inherited from a role

The **Direct access** tab makes the two layers visible side by side: what a user holds because of their workspace role, and what they were additionally granted on this one item.

![Direct access tab for a Fabric item, listing people and groups with access, their workspace Role, and their item-level Permissions in separate columns.](/courses/microsoft-fabric-data-governance/ch03/11-fabric-item-permissions/add-user.png)
*The Direct access tab. Malik Barden's Role column shows "Workspace Admin" — access inherited from the workspace. The Permissions column, "Read, reshare, build," is the item-level grant layered on top (or, for a user with no role at all, the only thing giving them access).*

This distinction has a real consequence documented by Microsoft: if someone has a workspace **Viewer** role *and* a direct item-level grant on a report, revoking only the item permission does nothing — they can still open the report because the workspace role alone is enough to see it exists and view it. To fully cut off access, you have to remove **both** the item permission and the workspace role.

## Granting access directly

Selecting **Add user** (or **Grant people access** from an item's Share button) opens a dialog where Read is pre-checked and you layer on anything else the item supports:

![Grant people access dialog for a Fabric item, showing a recipient field and Additional permissions checkboxes for Share and Edit.](/courses/microsoft-fabric-data-governance/ch03/11-fabric-item-permissions/direct-share-dialog.png)
*The direct-grant dialog. Read access is implied by sharing at all; the "Additional permissions" checkboxes — Share and Edit here — add exactly the extra capability the recipient needs, nothing more.*

This is the mechanism for giving a service account, an external guest, or a single colleague exactly the permission they need on exactly one item — without putting them in the workspace at all.

## When you need item-level permissions on top of a workspace role

Workspace roles are the right tool when someone genuinely needs broad access to everything a workspace holds. Item permissions are the right tool when that would grant too much:

- **Sharing a single report externally** (or with one colleague) without giving them a workspace role that would expose every other item in it.
- **Service accounts and automation identities** that only ever need to read one semantic model or execute one pipeline — a direct item grant, with no workspace role at all.
- **Letting someone build new reports off a shared semantic model** (the Build permission) without letting them edit the model's measures or data sources.
- **Granting SQL-only access to a Lakehouse's analytics endpoint** for a reporting tool, without exposing the Lakehouse's Spark/OneLake surface.

## Key terms

| Term | Meaning |
|---|---|
| Workspace role | Admin, Member, Contributor, or Viewer — applies to every item in one workspace |
| Item permission | A grant confined to a single item, independent of any workspace role |
| Manage permissions panel | The per-item UI for viewing and editing links and direct access |
| Read | Discover and open an item; always included when an item is shared |
| Reshare (Share) | Share the item onward, up to the same permissions the sharer holds |
| Build | Semantic-model-specific permission to create new reports against it |
| Read all with SQL analytics endpoint | Query Lakehouse/Warehouse data via T-SQL without the item's SQL security policy applied |

## Lab

Pick a report or semantic model you have access to in Fabric (or picture one from this course's examples). Open its **Manage permissions** panel, go to **Direct access**, and write down, for one person listed there, which part of their access comes from their workspace Role column and which part comes from the item's own Permissions column. Then write one sentence describing a real scenario where you'd grant someone **Build** on a semantic model instead of adding them to the workspace.

## Check yourself

Can you explain, without looking back, why removing someone's item-level permission on a report might not actually stop them from viewing it — and what the Read, Reshare, and Build permissions each specifically allow?
