# Lesson 23 — What Is a Mapping Data Flow?

**Chapter 5 · Mapping Data Flows · Lesson 1 of 7**

## What you'll learn

- What a mapping data flow actually is, and what runs it underneath
- The three parts of the data flow authoring canvas
- Where the Inspect tab fits into building one
- How data flows fit into a pipeline as one activity

## Real transformation, without writing Spark code

Recall Lesson 2's ETL vs. ELT lesson: a **mapping data flow** is
Data Factory's visual, code-free transformation tool — exactly the
ELT-style transformation step that follows a Copy activity landing
raw data. You design the transformation logic visually; Data Factory
translates it into Spark code, optimizes it, and runs it on a
managed, scaled-out Spark cluster you never have to provision or
maintain yourself.

## Creating one

From **Factory Resources**, select **+**, then **Data Flow**:

![Screenshot of the New data flow option in Data Factory Studio's Factory Resources pane.](/courses/data-factory/ch05/23-what-is-a-mapping-data-flow/new-data-flow.png)

## The three-part canvas

Every data flow opens onto the same authoring surface:

![Screenshot of the data flow canvas with three labeled sections: the top bar (Validate, Data flow debug, Debug Settings), the graph (Add Source), and the configuration panel (Parameters, Settings).](/courses/data-factory/ch05/23-what-is-a-mapping-data-flow/canvas-1.png)

- **Top bar** — validation, the debug toggle (Lesson 24), and
  data-flow-wide settings.
- **Graph** — the actual transformation stream: source, through
  however many transformations, into one or more sinks. Select **Add
  Source** to begin.
- **Configuration panel** — settings for whatever's currently
  selected. With nothing selected, it shows the data flow's own
  parameters.

## The Inspect tab: metadata, no debug required

Every transformation carries an **Inspect** tab showing the shape of
the data flowing through it — column count, names, types, what
changed at this specific step:

![Screenshot of the Inspect tab, showing column metadata including names, types, and change indicators for a data stream.](/courses/data-factory/ch05/23-what-is-a-mapping-data-flow/inspect1.png)
*Inspect is read-only metadata — you don't need debug mode on to see it, unlike Lesson 24's Data Preview.*

If a source has no defined schema (a schema-drift scenario), Inspect
has nothing to show — there's no fixed shape to describe yet.

## How this fits into a pipeline

A mapping data flow isn't run on its own — it's operationalized
inside a pipeline through a **Data Flow activity** (Chapter 4's
patterns apply directly: it can be parameterized, chained with
dependency conditions, wrapped in an If Condition, all of it). You
pick which integration runtime executes it and pass in whatever
parameters the flow expects; everything else about scheduling and
monitoring works exactly like any other activity.

## Key terms

| Term | Meaning |
|---|---|
| Mapping data flow | Data Factory's visual, code-free, Spark-powered transformation tool |
| Graph | The canvas area showing the source-to-sink transformation stream |
| Inspect | Read-only column metadata for a transformation, no debug mode required |
| Data Flow activity | The pipeline activity that actually runs a mapping data flow |

## Lab

1. Create a new, empty data flow and locate all three canvas
   sections: top bar, graph, configuration panel.
2. Select **Add Source**, connect it to any dataset you have from
   Chapter 2, and open its **Inspect** tab — even without debug mode
   on, confirm you can see column metadata.
3. Write one sentence explaining why Inspect can show nothing at all
   for a source with no defined schema.

## Check yourself

You're ready for Lesson 24 when you can explain, in your own words,
what the difference is between the Inspect tab and Debug mode's Data
Preview — and why one needs an active Spark cluster and the other
doesn't.
