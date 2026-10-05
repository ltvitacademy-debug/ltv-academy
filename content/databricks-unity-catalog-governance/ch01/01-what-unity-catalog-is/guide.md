# Lesson 1 — What Unity Catalog Is

**Chapter 1 · Unity Catalog Foundations · Lesson 1 of 25**

## What you'll learn

- The governance problem Unity Catalog was built to solve
- The three-level namespace — `catalog.schema.table` — that every governed object lives in
- Catalog Explorer, the UI where you'll do most of your governance work in this course
- The full range of object types Unity Catalog governs, not just tables
- A signature capability — automatic relationship discovery — that shows governance paying off immediately

## The problem Unity Catalog solves

Before Unity Catalog, permissions, auditing, and lineage in Databricks were set **per workspace**. A company running ten workspaces had ten separate places to grant access, ten separate audit trails, and no single answer to "who can see this table, anywhere." Unity Catalog replaces that with one governance layer: permissions, audit logs, lineage, and data discovery are defined **once**, centrally, and apply to every workspace attached to it — even across clouds.

## The three-level namespace

Every governed data object in Unity Catalog is addressed the same way: **`catalog.schema.table`**. A catalog is the top-level container (often one per business unit or environment — `prod`, `dev`, `finance`). A schema (same thing as a "database" in older Databricks terminology) sits inside a catalog and groups related objects. A table, view, volume, or function sits inside a schema. This replaces the old two-level `database.table` namespace entirely — the extra level is what makes it possible to isolate, say, a `finance` catalog from a `marketing` catalog on the same metastore.

## Catalog Explorer: where governance happens

**Catalog Explorer** is the workspace UI for Unity Catalog. Click **Catalog** in the left sidebar and you land on the object browser: catalogs on the left (expandable down to schemas and tables), object details, lineage, and permissions on the right.

![Databricks Catalog Explorer, opened from the Catalog item in the left sidebar (highlighted), showing a list of catalogs under "My organization" including main and system, with Govern, Connect, Share, and Create actions in the top right.](/courses/databricks-unity-catalog-governance/ch01/01-what-unity-catalog-is/catalog-explorer-overview.png)
*Catalog Explorer's landing page — the entry point for every catalog, schema, and table on the metastore.*

## Everything Unity Catalog governs

Tables get most of the attention, but Unity Catalog's object model governs far more than tables. Below the metastore sit catalogs, connections, shares, and credentials; below each catalog sits a schema; and below each schema sit tables, views, volumes (for non-tabular files), functions, and even registered ML models.

![Databricks' own Unity Catalog object-hierarchy diagram: Metastore at the root branching into Service credential, Storage credential, External location, External metadata, Catalog, Connection, Share, Recipient, Provider, and Clean Room; Catalog branches into Schema, which branches into Table, View, Volume, Function, Model, Service, and Secret.](/courses/databricks-unity-catalog-governance/ch01/01-what-unity-catalog-is/object-hierarchy.png)
*Databricks' own published object-hierarchy diagram — everything under "Catalog" is what Lessons 3–4 cover in depth.*

## A signature capability: it already knows how your tables relate

Because every table is registered with Unity Catalog rather than scattered across ad hoc storage paths, Catalog Explorer can automatically surface relationships between governed tables — primary and foreign keys — without anyone drawing a diagram by hand.

![Catalog Explorer's auto-generated entity relationship view showing three governed tables — roma_store.default.customers, roma_store.default.orders, and roma_store.default.payments — connected by lines between their primary-key (PK) and foreign-key (FK) columns.](/courses/databricks-unity-catalog-governance/ch01/01-what-unity-catalog-is/ce-erd.png)
*An entity-relationship view Catalog Explorer builds automatically from governed tables' declared primary and foreign keys.*

## Why it matters

Centralizing governance in one metastore means a permission granted once is enforced everywhere that table is accessible — one workspace or twenty. It's also what makes the rest of this course possible: fine-grained security (Chapter 3), lineage and auditing (Chapter 4), and Delta Sharing (Chapter 5) all depend on every object being registered in Unity Catalog in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Unity Catalog | Databricks' unified governance layer for data and AI assets across workspaces |
| Three-level namespace | The `catalog.schema.table` addressing scheme every governed object uses |
| Catalog Explorer | The workspace UI for browsing, managing, and setting permissions on governed objects |
| Securable object | Anything Unity Catalog can grant privileges on — catalogs, schemas, tables, volumes, functions, models, and more |

## Lab

Open Catalog Explorer in a Unity Catalog-enabled workspace (or review the screenshot above if you don't have access yet). Find one catalog, expand it to a schema, and expand that schema to a table. Write down the full three-level name you land on, in the form `catalog.schema.table`.

## Check yourself

- What specific governance problem did workspace-by-workspace permissions create that Unity Catalog solves?
- Write out the three-level namespace format and explain what each level represents.
- Name at least four object types (besides tables) that live inside a Unity Catalog schema.
