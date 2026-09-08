# Lesson 9 — Datasets: Structure & Schema

**Chapter 2 · Connecting to Data · Lesson 4 of 5**

## What you'll learn

- What a dataset actually represents, precisely
- The four-step flow for creating one in Data Factory Studio
- Where schema comes from, and when importing it actually matters
- Why one linked service can back many different datasets

## A named view of specific data

Recall Lesson 6's distinction: the linked service defines *how to
connect*. A **dataset** is a named view of data that points to or
references the *specific* data — a table, a file, a folder — you
actually want an activity to read from or write to. A dataset without
a linked service behind it can't exist; you always build one on top
of a connection that already works.

## Creating a dataset, step by step

1. In the **Author** hub, select the **+** icon and choose **Dataset**:

   ![Screenshot of the Author hub in Data Factory Studio, with the plus icon selected and Dataset highlighted in the menu.](/courses/data-factory/ch02/09-datasets-structure-schema/create-dataset.png)

2. Choose which connector this dataset is based on:

   ![Screenshot of the New dataset window showing a gallery of connector tiles to choose from.](/courses/data-factory/ch02/09-datasets-structure-schema/choose-dataset-source.png)
   *The same connector gallery Lessons 7 and 8 already used for linked services.*

3. Choose the dataset's **format** — how the underlying data is
   actually structured:

   ![Screenshot of the dataset format selection window, showing options like DelimitedText, JSON, Avro, Parquet, and Binary.](/courses/data-factory/ch02/09-datasets-structure-schema/choose-dataset-format.png)
   *DelimitedText for CSVs, Parquet for columnar files, Binary for anything you're moving as-is without reading its contents.*

4. Choose an **existing** linked service, or define a new one right
   here, then finish setting the dataset's specific path:

   ![Screenshot of the Set properties window, showing options to select an existing linked service or create a new one for the dataset.](/courses/data-factory/ch02/09-datasets-structure-schema/choose-or-define-linked-service.png)
   *This is the moment a dataset actually attaches itself to a connection — reusing Lesson 6's linked service if it already exists.*

## Where schema comes from

A dataset's `schema` property represents the physical shape of the
data — column names and types. You have two real ways to get it:

- **Import Schema** — select it, and Data Factory reads the actual
  shape directly from the source itself. This is the right default
  almost every time.
- **From a local file** — if you already have a schema-bearing file
  (a Parquet file, or a CSV with headers) and no live source to
  import from yet, you can base the schema on that instead.

Schema on a dataset is genuinely optional — a copy activity can move
data without ever declaring one — but it becomes required the moment
you need explicit column mapping between a source and a sink, or a
defined source projection inside a mapping data flow (Chapter 5).

## One linked service, many datasets

Because a linked service only defines *how to connect*, a single
Azure Blob Storage linked service can back dozens of datasets — one
per container, folder, or file format you actually need to work with.
You're not recreating the connection each time; you're just pointing
a new dataset at a different specific location inside it.

## Key terms

| Term | Meaning |
|---|---|
| Dataset | A named view of specific data — a table, file, or folder — inside a linked service |
| Format | How a dataset's underlying data is structured (DelimitedText, JSON, Parquet, Binary, and more) |
| Import Schema | Reading a dataset's column names/types directly from the live source |

## Lab

1. If you built an Azure Blob Storage or SQL linked service in
   Lesson 7 or 8's lab, create a dataset on top of it, following the
   four steps above.
2. During creation, try **Import Schema** and note what it actually
   returns — column names, types, or both.
3. If you have time, create a *second* dataset using the exact same
   linked service, pointing at a different file or table — confirm
   for yourself that the linked service didn't need to be recreated.

## Check yourself

You're ready for Lesson 10 when you can explain, in one sentence, why
a dataset always needs a linked service to exist, but one linked
service can support many different datasets.
