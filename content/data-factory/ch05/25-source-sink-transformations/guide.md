# Lesson 25 — Source & Sink Transformations

**Chapter 5 · Mapping Data Flows · Lesson 3 of 7**

## What you'll learn

- Inline datasets vs. dataset objects, and when to reach for each
- The four real schema-drift settings on a source
- What the Projection tab actually controls
- What a sink does, and why schema drift matters there too

## Every data flow starts with a source

A **source transformation** configures where a data flow's data
actually comes from — every data flow needs at least one, though you
can add more and combine them with a join, lookup, or union.

![Screenshot of the Source settings tab, showing Output stream name, Source type, and schema drift options.](/courses/data-factory/ch05/25-source-sink-transformations/source-1.png)

## Inline dataset, or a dataset object?

A source's data can be defined **inside a dataset object** (Chapter
2's datasets, reused here) or **inline**, directly inside the source
transformation itself:

- **Dataset object** — reusable across multiple data flows and Copy
  activities. The right choice for a hardened, stable schema.
- **Inline** — no separate dataset to create, ideal for flexible
  schemas, one-off sources, or heavily parameterized sources. Inline
  datasets live natively in Spark.

## Four schema-drift settings worth knowing

- **Allow schema drift** — lets new source columns that aren't in the
  defined schema flow through the data flow anyway.
- **Infer drifted column types** — automatically detects a data type
  for each newly drifted column; off, and drifted columns default to
  string.
- **Validate schema** — fails the data flow outright if the incoming
  data doesn't match the defined schema exactly.
- **Use projected schema** — skips per-file schema auto-discovery when
  scanning many source files, applying one pre-defined schema to all
  of them for real speed.

## Projection: defining the shape

The **Projection** tab defines the source's columns, types, and
formats:

![Screenshot of the Projection tab, showing column name, type, and format settings for a source.](/courses/data-factory/ch05/25-source-sink-transformations/source-3.png)

For loosely-typed sources (a flat CSV, say, rather than Parquet),
**Detect data type** samples the data and infers types. **Import
schema** uses an active debug cluster to build a real projection from
the live source — the only way to get column metadata for an inline
dataset without relying on schema drift.

## The sink: where transformed data actually lands

A **sink transformation** is the mirror image of a source — it's
where a data flow's transformed data actually gets written. Every
data flow needs at least one. Sink settings follow the same basic
shape as source settings: pick a dataset or an inline definition,
configure the destination's specific properties, and — just like a
source — decide whether **Allow schema drift** should let unexpected
incoming columns write through rather than failing the run.

## Key terms

| Term | Meaning |
|---|---|
| Source transformation | Configures where a data flow's data comes from |
| Sink transformation | Configures where a data flow's transformed data is written |
| Inline dataset | A source/sink defined directly in the transformation, not a separate dataset object |
| Projection | The defined columns, types, and formats for a source |

## Lab

1. Build a data flow with one source, pointed at any dataset from
   Chapter 2, using **Allow schema drift**.
2. On the Projection tab, select **Import schema** with debug mode on,
   and confirm real column metadata appears.
3. Add a sink, pointed at a different destination, and enable
   **Allow schema drift** there too — write one sentence explaining
   why you might want that on for both ends of the same flow.

## Check yourself

You're ready for Lesson 26 when you can explain, in one sentence,
when you'd choose an inline dataset over a dataset object for a
source.
