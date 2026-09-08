# Lesson 13 — Copy Activity: Mapping & Schema Drift

**Chapter 3 · Pipelines & Activities · Lesson 3 of 6**

## What you'll learn

- What the Copy activity does by default, with no mapping configured
- When and how to configure explicit column mapping instead
- What "schema drift" actually means, and why default mapping embraces it
- Where explicit mapping breaks down, and what to reach for instead

## Default mapping: by name, automatically

With no mapping configured at all, the Copy activity maps source data
to sink **by column name**, case-sensitively. If the sink doesn't
exist yet, the source's field names simply become the sink's names.
If the sink already exists, it needs to contain every column being
copied.

This default behavior is genuinely more powerful than it sounds: it
**supports schema drift** — if the source's columns change from one
run to the next (a new column added, say), default mapping picks up
whatever the source actually returns each time, with no pipeline
change required.

## Explicit mapping: when you need control

Sometimes default mapping isn't enough — you want to copy only part
of the source data, rename columns along the way, or reshape data
between fundamentally different structures. **Explicit mapping**
handles all three, configured on the Copy activity's **Mapping** tab:

![Screenshot of the Mapping tab showing three source columns (Id, Name, LastModifiedDate) explicitly mapped to three differently named sink columns (CustomerID, LastName, ModifiedDate).](/courses/data-factory/ch03/13-copy-activity-mapping-schema-drift/map-tabular-to-tabular.png)
*Select Import schemas to pull in both sides, then map exactly what you need — exclude or delete anything you don't.*

1. Select **Import schemas** to bring in both the source and sink
   schemas.
2. Map the fields you actually need; exclude or delete the rest.

This is also how you handle a source with **no header row** — since
there are no column names to match against, you map by column
**ordinal** (position) instead.

## Reshaping hierarchical data into tabular

Explicit mapping goes further than a straight column-to-column
match. Copying from a hierarchical source — Cosmos DB, MongoDB, a
REST API — into a flat, tabular sink, you can flatten nested arrays
directly in the mapping itself:

![Screenshot of the Mapping tab configured to flatten hierarchical JSON data, with a Collection reference set to an array field and individual nested fields mapped to flat sink columns.](/courses/data-factory/ch03/13-copy-activity-mapping-schema-drift/map-hierarchical-to-tabular.png)
*Select the array to iterate over — Collection reference — and the service cross-applies it, turning one nested object into multiple flat rows.*

For genuinely complex reshaping beyond what this mapping UI handles,
that's exactly the point where mapping data flows (Chapter 5) take
over.

## Why the choice actually matters

| | Default mapping | Explicit mapping |
|---|---|---|
| Handles schema drift | Yes, automatically | No — a source column change can break the mapping |
| Copies a subset of columns | No, everything comes along | Yes |
| Renames columns | No | Yes |
| Reshapes hierarchical data | No | Yes |
| Works with headerless files | No — nothing to match names against | Yes, via ordinal |

Choosing default mapping when you actually need renamed or filtered
columns just means the wrong data lands in the sink. Choosing
explicit mapping when the source schema changes often means a
pipeline that breaks every time someone adds a column upstream.

## Key terms

| Term | Meaning |
|---|---|
| Schema drift | Source columns changing between runs, without necessarily breaking the pipeline |
| Explicit mapping | Manually configured source-to-sink column mapping, set on the Mapping tab |
| Ordinal | A column's position, used for mapping when there's no column name to match |
| Collection reference | The array a hierarchical source gets flattened by, during mapping |

## Lab

1. On a Copy activity from Lesson 12's lab, open the **Mapping** tab
   and select **Import schemas** to see the default, by-name mapping.
2. Delete one mapped column and rename another's sink target — this
   is explicit mapping in action.
3. Write one sentence explaining why a source with no header row
   genuinely can't use default, by-name mapping at all.

## Check yourself

You're ready for Lesson 14 when you can explain, in one sentence,
why default mapping embraces schema drift while explicit mapping
generally doesn't.
