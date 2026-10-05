# Lesson 4 — Tables, Volumes and Models

**Chapter 1 · Unity Catalog Foundations · Lesson 4 of 25**

## What you'll learn

- The four main object types Unity Catalog governs inside a schema
- Volumes: how Unity Catalog governs non-tabular files, not just rows and columns
- How governed tables and volumes show up as lineage and relationships in Catalog Explorer
- Tagging as a governance tool that applies across all of these object types
- Real SQL for creating a table and a volume

## The third level: what lives inside a schema

Chapter 1 so far has been about the containers — metastore, catalog, schema. This lesson is about what actually sits at the bottom of that hierarchy, inside a schema:

- **Tables** — structured, row-and-column data (managed or external — Lesson 5)
- **Views** — saved queries over one or more tables
- **Volumes** — governed access to non-tabular files (images, PDFs, CSVs, model artifacts) stored in cloud object storage
- **Functions** — including **registered models**, which Unity Catalog treats as a governed, versioned object just like a table

![Databricks' own object-model diagram with the Volume node highlighted: Metastore at top, branching to Catalog, which branches to Schema, which branches to Table, Volume (highlighted), View, and Function (including models).](/courses/databricks-unity-catalog-governance/ch01/04-tables-volumes-and-models/object-model-volume.png)
*Volumes highlighted in Databricks' object model — governed the same way as tables, but for files instead of rows.*

## Volumes: governance for files

Not every asset a data team needs to govern is a table. Raw CSVs waiting to be loaded, PDFs for a document-processing pipeline, or a directory of model checkpoint files all need the same thing tables get — a name, an owner, and permissions — without being forced into rows and columns. A **volume** is Unity Catalog's answer: a governed, three-level-namespaced (`catalog.schema.volume_name`) pointer to a directory of files in cloud storage, with its own `READ VOLUME` / `WRITE VOLUME` privileges (Chapter 2).

## Tables and models in context: lineage

Because tables, views, and models are all registered objects, Catalog Explorer can trace how they connect — which table a view reads from, which table a registered model was trained on. This is the same lineage graph system covered in depth in Chapter 4, but the groundwork is what you're learning right now: nothing gets traced unless it's a governed object first.

![A Unity Catalog lineage graph in Catalog Explorer showing a governed table "users" connecting to two materialized views — "sample_users_" and "business_users" — which in turn feed a further materialized view, each card showing the object's columns.](/courses/databricks-unity-catalog-governance/ch01/04-tables-volumes-and-models/uc-lineage-overview.png)
*A real Unity Catalog lineage graph — every node here is a governed table or materialized view, connected because Unity Catalog tracked how one was built from another.*

## Tagging governed objects

Every object type on this page — tables, volumes, schemas, even columns — can carry **governed tags**: key/value metadata used for classification (`pii`, `Marketing`) or compliance tracking, assigned through Catalog Explorer or SQL.

![The "Assign tags" dialog in Catalog Explorer, showing a Key dropdown open with governed tag options including class.vin, Marketing, pii, and several sap.PersonalData.* system tags, alongside a Value field and Save button.](/courses/databricks-unity-catalog-governance/ch01/04-tables-volumes-and-models/assign-governed-tags.png)
*Assigning a governed tag to an object — the same tagging mechanism works on tables, schemas, volumes, and columns alike.*

## Creating a table and a volume in SQL

```sql
CREATE TABLE IF NOT EXISTS finance.accounts_payable.invoices (
  invoice_id   BIGINT,
  vendor_name  STRING,
  amount_due   DECIMAL(10,2),
  due_date     DATE
);

CREATE VOLUME IF NOT EXISTS finance.accounts_payable.invoice_pdfs;
```

The volume `finance.accounts_payable.invoice_pdfs` is now a governed object in its own right — list its contents with `LIST '/Volumes/finance/accounts_payable/invoice_pdfs'` and grant access to it exactly like you would a table.

## Key terms

| Term | Meaning |
|---|---|
| Table | Structured, row-and-column data registered in a schema |
| Volume | A governed pointer to a directory of non-tabular files, addressed the same way as a table (`catalog.schema.volume`) |
| Registered model | A versioned ML model tracked as a governed object, typically under a schema's functions/models |
| Governed tag | Key/value metadata (e.g. `pii`) assignable to tables, schemas, volumes, or columns for classification |

## Lab

Write a `CREATE VOLUME` statement for a volume named `raw_uploads` inside the `marketing.campaigns` schema from Lesson 3's lab. Then describe, in one sentence, what makes that volume different from a table in the same schema.

## Check yourself

- Name the four main object types that live inside a schema.
- What problem does a volume solve that a table can't?
- What does Unity Catalog need to be true about a table and a model before it can draw a lineage line between them?
