# Lesson 8 — OneLake Security

**Chapter 2 · OneLake · Lesson 8 of 25**

## What you'll learn

- What OneLake security is, and why it's a separate layer from workspace roles
- Where to start creating a OneLake security role
- How to walk through the new-role wizard: choose data, set row security, (optionally) column security
- Where OneLake security is actually enforced — not just in the Fabric UI

## A separate, finer-grained layer

Lesson 5 covered workspace roles — Admin, Member, Contributor, Viewer. Those roles gate access to the workspace and its items: whether someone can even open a lakehouse at all. **OneLake security** is a different, more fine-grained question, asked **inside** a lakehouse or warehouse: once someone's in, which specific rows and columns do they actually get to see?

That distinction matters because workspace roles and OneLake security answer two different questions entirely. A Viewer with no special OneLake security role still sees every row of every table they have access to. OneLake security is what narrows that down — and, crucially, it's enforced wherever the data is actually read from: a notebook, the SQL analytics endpoint, or a Power BI report built on top. It isn't a Fabric-UI-only restriction.

## Getting there

OneLake security starts from a lakehouse item's **"..." menu**, which has its own **"Manage OneLake security (preview)"** entry right alongside notebook management options.

![A lakehouse's "..." menu open, with "Manage OneLake security (preview)" highlighted among other management options like "Open notebook."](/courses/microsoft-fabric-data-governance/ch02/08-onelake-security/manage-onelake-data-access.png)
*The entry point: every lakehouse carries its own OneLake security management option, independent of the workspace's access settings.*

## Building a role: choose the data

Creating a role walks through a short wizard — Role, Data, Member. On the Data step, you choose what the role covers: **All data**, or **Selected data** (specific tables and folders), with an Edit button to pick exactly which ones.

![The New role wizard's Data step: "Add data to your role" with All data and Selected data radio options, and an Edit button to choose specific data.](/courses/microsoft-fabric-data-governance/ch02/08-onelake-security/selected-data-edit.png)
*Scoping a role to Selected data, rather than All data, is what makes row- and column-level rules possible — they apply to the tables you pick here.*

## Row security: a SQL WHERE-clause filter

Once a table is selected, OneLake security splits "which files/tables exist" from "which rows within them are visible" as two separately governed questions. Row security is set as an actual SQL `WHERE` clause.

![Edit data for the role: the publicholidays table selected in the OneLake tree, with Row security and Column security tabs, and a SQL editor showing "SELECT * FROM publicholidays WHERE".](/courses/microsoft-fabric-data-governance/ch02/08-onelake-security/data-access.png)
*"Show data to members of your role if the following rules apply" — whatever goes after `WHERE` is the actual filter, evaluated at read time, every time the data is queried.*

Column security sits on its own tab right next to Row security, for hiding specific columns from the role instead of (or in addition to) filtering rows.

## The finished role

Once saved, a role shows up with its own detail view: its permission (Read), its type (Grant), and two tabs — **Data in role** (what Data in role shows) and **Members in role** (who's actually in it) — both editable later through the Edit dropdown.

![A finished role, "OneLakeSecurityRole," showing Permissions: Read, Type: Grant, and Data in role / Members in role tabs, with an Edit dropdown open showing "Update role name" and "Edit role permissions."](/courses/microsoft-fabric-data-governance/ch02/08-onelake-security/edit-name-permissions.png)
*Nothing about a OneLake security role is one-and-done — name, permissions, data, and members can all be revisited later.*

## Where it's actually enforced

This is the detail worth remembering: OneLake security isn't a setting that only affects what a user clicks through in the Fabric portal. The row filter defined here is evaluated wherever the underlying data is read — a Spark notebook querying the table directly, the SQL analytics endpoint, or a Power BI report built on top of either. The enforcement travels with the data, not with any one tool.

## Key terms

| Term | Meaning |
|---|---|
| OneLake security | Fine-grained, item-level security inside a lakehouse/warehouse, layered on top of workspace roles |
| Row security | A SQL WHERE-clause filter that controls which rows a role's members can see, enforced at read time |
| Column security | A separate rule set (its own tab, alongside Row security) controlling which columns a role's members can see |

## Lab

Using the `publicholidays` example from the screenshots above, write a plausible `WHERE` clause that would restrict a role to only holidays in one country (for example, a `CountryCode` column). Then write one sentence explaining why a Viewer workspace role alone would not have been enough to enforce that restriction.

## Check yourself

Can you explain, without looking back, how OneLake security differs from a workspace role, where you go to start creating a OneLake security role, what row security actually is, and name at least two of the three places a row filter gets enforced?
