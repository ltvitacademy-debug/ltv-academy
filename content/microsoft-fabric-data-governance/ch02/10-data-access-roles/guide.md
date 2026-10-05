# Lesson 10 — Data Access Roles

**Chapter 2 · OneLake · Lesson 10 of 25**

## What you'll learn

- Why workspace roles (Admin/Member/Contributor/Viewer) are too coarse for controlling exactly which data someone can read
- What a OneLake data access role is, and how it's different from both workspace roles and item-level **Manage permissions**
- How to create a role in a Lakehouse and scope it to specific folders or tables, not the whole item
- How to assign members — by hand, or dynamically through permission groups
- How data access roles fit into OneLake's broader security model, including the built-in DefaultReader role

## The problem: workspace roles are all-or-nothing

Everything you've covered so far in this chapter — workspace roles, item-level **Manage permissions**, OneLake security as a concept — governs access at the level of an entire workspace or an entire item. A Contributor can read and write every table and file in every Lakehouse in the workspace. A Viewer, by default, can't read any of the data at all. There's no setting in a workspace role that says "this group can see the `Sales` folder but not the `HR` folder in the same Lakehouse."

That's a real gap. A finance team and an HR team often need their own Lakehouses to actually share one, for cost and pipeline-reuse reasons, while keeping each other out of the other's tables. A vendor or contractor might need read access to one reference table and nothing else. Coarse, item-wide roles can't express that. **OneLake data access roles** are the feature built specifically to close that gap.

## What a data access role actually is

A data access role is defined **on a Lakehouse** (or an Azure Databricks mirrored catalog, or a mirrored database) and grants read — or, for a Lakehouse, read/write — access to a subset of the data inside that one item: specific tables, specific folders, or in some cases specific schemas. It's not a replacement for workspace roles or for item sharing; it's a narrower, additional layer that sits on top of them, and it only matters for users who don't already have broad access. Workspace Admins, Members, and Contributors already have full read and write access to every table in the Lakehouse, so a data access role has no effect on them. It matters for Viewers, and for anyone who was given Read access to the item through sharing rather than through a workspace role — they see nothing in OneLake until a role grants it.

## Creating a role and scoping it to folders or tables

From a Lakehouse, selecting **Manage OneLake security** opens the list of existing roles and a **New** button that starts a three-step wizard: name and permission, then data, then members.

![Screenshot of the Fabric portal's New role wizard on the Data step, with 'Selected data' chosen and an Edit button to pick specific tables and folders.](/courses/microsoft-fabric-data-governance/ch02/10-data-access-roles/selected-data-edit.png)
*The Data step of the New role wizard. Choosing "Selected data" instead of "All data" is what makes the role fine-grained — the Edit button opens a tree of the Lakehouse's tables and folders to check off.*

Choosing **All data** grants the role access to everything in the Lakehouse, including anything added later — useful for a "read everything" analyst role, but not a scoping tool. Choosing **Selected data** and then **Edit** opens the Lakehouse's `Tables/` and `Files/` directories as a checklist. You check the exact tables and folders the role should see; everything else in the Lakehouse stays invisible to its members, in the lake view, in notebooks, and through the OneLake APIs.

## Seeing exactly what a role covers

Once a role exists, its details page lays out precisely what it grants. The **Data in role** tab lists every table and folder the role includes, split by schema and by folder.

![Screenshot of a Fabric OneLake role's 'Data in role' tab, listing a 'dbo' schema with a 'publicholidays' table under Tables, and 'images' and 'sample_datasets' folders under Files.](/courses/microsoft-fabric-data-governance/ch02/10-data-access-roles/data-in-role.png)
*A role scoped to one table (`dbo.publicholidays`, with a row-security lock icon) and two folders (`images`, `sample_datasets`) — table-level and folder-level scoping shown side by side on the same role.*

This is the view to check before trusting a role: if a folder or table isn't listed here, members of the role can't see it, full stop. The small lock icon next to `publicholidays` flags that row-level security is also applied to that table — a finer layer this lesson doesn't cover in depth, but it's defined from this same screen.

## Assigning members

The **Member** step — or the **Members in role** tab on an existing role — is where you decide who the scoping actually applies to. You can type in names or email addresses directly, which adds people as explicit members. Or you can open **Advanced configuration** to add members dynamically, based on the Fabric item permissions they already hold (Read, Write, Reshare, Execute, ReadAll) — a **virtual membership** that updates itself as people's item permissions change, instead of you maintaining a static list.

![Screenshot of a Fabric OneLake role's Members tab, showing the 'Add members' box and an 'Advanced Configuration' link for assigning members by permission group.](/courses/microsoft-fabric-data-governance/ch02/10-data-access-roles/members-advanced-configuration.png)
*Manual member entry at the top; "Advanced Configuration" below it opens permission-group based (virtual) membership instead of a hand-maintained list.*

One detail worth remembering here: every Lakehouse ships with a built-in **DefaultReader** role that gives anyone with the item's **ReadAll** permission access to *all* data in the Lakehouse. Adding someone to a narrowly scoped role does nothing if they're still covered by DefaultReader — they keep the broader access. Restricting someone's view means either removing them from DefaultReader or editing it down, in addition to adding them to the narrower role.

## Editing a role after it's created

Roles aren't fixed at creation. The role details page has its own **Edit** menu for renaming the role or changing its granted permission (Read vs. ReadWrite) after the fact, separately from editing its data scope or its members.

![Screenshot of a Fabric OneLake role's detail page with the Edit menu open, showing 'Update role name' and 'Edit role permissions' options.](/courses/microsoft-fabric-data-governance/ch02/10-data-access-roles/edit-name-permissions.png)
*Renaming a role or changing its Read/ReadWrite grant is a separate action from editing which data or which members it includes — each lives under its own tab.*

Role changes take effect as soon as they're saved — there's no publish or approval step, so a scope change or a new member is live immediately.

## How this fits with the rest of OneLake security

Keep the three layers straight, because this course keeps coming back to the distinction:

- **Workspace roles** (Admin/Member/Contributor/Viewer) govern what someone can *do* — manage, write, read — across an entire workspace. Control plane.
- **Item-level "Manage permissions"** (sharing) governs access to one specific item as a whole, for someone who isn't a workspace member at all. Also control plane.
- **Data access roles** govern exactly which *data* inside one item a person with limited standing — a Viewer, or someone with bare Read access — can actually see. Data plane, and the only one of the three that scopes down to folders and tables instead of whole items.

A data access role never grants someone more access than they'd have as a Contributor; it only grants more *visibility into specific data* to someone who otherwise has little or none.

## Key terms

| Term | Meaning |
|---|---|
| OneLake data access role | A role defined on a Lakehouse (or mirrored database/catalog) that grants Read or ReadWrite access to a scoped subset of its tables and folders |
| Selected data | The scoping choice in the New role wizard that limits a role to specific checked tables/folders instead of the whole item |
| Data in role | The tab on a role's details page listing exactly which tables and folders it grants access to |
| Virtual membership | Members added to a role automatically based on Fabric item permissions they hold, via Advanced Configuration, instead of being listed by name |
| DefaultReader | The built-in role present on every Lakehouse that gives anyone with ReadAll permission access to all of its data, overriding narrower roles unless removed or edited |

## Lab

Open (or imagine) a Lakehouse with at least two tables and a couple of folders under `Files/`. Design a data access role for a hypothetical "regional analyst" who should see only one specific table and one specific folder — write out, step by step, which wizard choices you'd make (All data vs. Selected data, which items to check, manual member entry vs. Advanced Configuration) and which existing workspace role(s) that analyst would need to even reach the lake view in the first place.

## Check yourself

Can you explain, without looking back, why a Contributor is unaffected by any data access role you create? Can you name the three steps of the New role wizard in order, and say what the DefaultReader role does and why it can silently undo a narrow role you just built?
