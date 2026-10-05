# Lesson 10 — Data Access Roles · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Two closes with the sharpest tool in OneLake security: data access roles, where one group of users gets read access to one folder of a Lakehouse — and nobody else does.

## S2 · STEPS — The gap in workspace roles

Workspace roles are all or nothing. A Contributor reads and writes every table in every Lakehouse in the workspace. A Viewer, by default, reads none of it. Neither role can say "this group sees the Sales folder, not HR" inside the same Lakehouse. Data access roles are the feature built specifically to close that gap.

## S3 · SCREENSHOT — New role wizard, Data step

Creating one starts with Manage OneLake security and a three-step wizard. Choosing All data grants the whole Lakehouse, including anything added later. Choosing Selected data and Edit opens the Tables and Files directories as a checklist — you check exactly the tables and folders this role should see, and everything else stays invisible to its members.

## S4 · SCREENSHOT — Data in role tab

The Data in role tab shows exactly what you built. This role includes one table, publicholidays, and two folders, images and sample_datasets — and nothing else in the Lakehouse. If a table isn't listed here, members of the role can't see it, in the lake view, in notebooks, or through the OneLake APIs.

## S5 · SCREENSHOT — Assigning members

Assigning members works two ways. Type in names or emails directly for an explicit list. Or open Advanced Configuration to add members dynamically, based on Fabric item permissions they already hold — a virtual membership that updates itself instead of a list you maintain by hand.

## S6 · SCREENSHOT — Editing a role afterward

Roles aren't fixed at creation. The Edit menu on a role's details page renames it or switches its grant between Read and ReadWrite, separately from editing its data scope or its members — and changes go live the moment you save them.

## S7 · STEPS — Three layers, not one

Keep three layers straight. Workspace roles and item permissions are the control plane — what someone can do, across a workspace or one whole item. Data access roles are the data plane — exactly which folders and tables inside one item they can see. And watch for DefaultReader: every Lakehouse ships with one, and it silently overrides a narrow role unless you edit it down.

## S8 · OUTRO

Next lesson moves from OneLake's data plane back to the control plane: Fabric item permissions, and what Manage permissions actually grants when you share a single item.
