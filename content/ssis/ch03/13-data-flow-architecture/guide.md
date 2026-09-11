# Lesson 13 — Data Flow Architecture

**Chapter 3 · Data Flow Fundamentals · Lesson 13 of 49**

## What you'll learn

- Why the Data Flow tab is a completely separate design surface from
  Control Flow, with its own Toolbox and its own engine underneath
- The three kinds of data flow components — sources, transformations,
  destinations — and how paths connect them
- The anatomy of a component: inputs, outputs, and error outputs
- How a Data Flow task fits into the control flow that surrounds it

## A second engine, a second design surface

Back in Lesson 1 you saw that every SSIS package really runs on two
engines: control flow, which decides *when* things happen, and data
flow, which actually *moves rows*. Chapter 2 lived entirely on the
**Control Flow** tab. Starting now, you'll spend most of your time on
the **Data Flow** tab — a separate design surface with its own Toolbox,
its own components, and its own rules.

You get to the Data Flow tab through a **Data Flow task** sitting on
the control flow. Double-click that task (or click the Data Flow tab
while it's selected) and SSIS Designer switches the Toolbox to a
completely different set of items — sources, transformations, and
destinations — because none of the control-flow tasks you learned in
Chapter 2 (Execute SQL, For Loop, Sequence Container) belong here. The
Data Flow task itself is just a wrapper: at run time it builds an
execution plan from whatever data flow you drew inside it, and the data
flow engine executes that plan.

## The three kinds of data flow components

Every data flow is built from three kinds of components, connected by
**paths**:

- **Sources** extract data from somewhere outside the package — a
  table, a flat file, an Excel workbook — and hand it to the data flow
  as rows.
- **Transformations** modify, clean, split, merge, or summarize rows as
  they pass through. A data flow doesn't require any transformations at
  all — a source connected straight to a destination is a perfectly
  valid, if simple, data flow.
- **Destinations** write the rows that reach them into a data store, or
  build an in-memory dataset.

The official Microsoft diagram below shows exactly how these three
component types connect, and what each one exposes on the outside:

![Diagram of SSIS data flow components — a Source with external columns and an output, a Transformation with an input and an output plus an error output, and a Destination with an input and an error output, all connected by paths carrying output and input columns.](/courses/ssis/ch03/13-data-flow-architecture/data-flow-components.gif)
*Sources, a transformation, and destinations — connected by paths, with error outputs.*

Notice the pattern repeats for every component:

- **Sources** have no input — only an **output** (the columns they add
  to the data flow) and usually an **error output**.
- **Transformations** have both an **input** and an **output** (plus an
  error output on most of them), because they sit in the middle of the
  chain.
- **Destinations** have only an **input** (and usually an error
  output) — nothing flows out of them into the data flow itself.

## Inputs, outputs, and error outputs

Three vocabulary words will follow you through the rest of this
chapter:

- An **output column** is a column a source or transformation adds to
  the data flow. It becomes available as an **input column** to
  whatever component the path connects it to next.
- An **external column** is a column that actually lives in the source
  or destination — the real table or file column that an output/input
  column is mapped from or to.
- An **error output** carries rows that failed during extraction,
  conversion, or a lookup, along with two extra columns —
  **ErrorCode** and **ErrorColumn** — that tell you what went wrong and
  where. You'll wire these up explicitly in Chapter 5's error-handling
  lessons; for now, just recognize the little red arrow every source
  and transformation offers.

## Where this is going

Chapter 3's remaining lessons work through the pieces one at a time:
the categories of sources and destinations available to you (Lesson
14), the buffer-based way the data flow engine actually moves rows in
memory (Lesson 15), and then hands-on configuration of the two source
and destination types you'll use constantly — OLE DB (Lesson 16) and
Flat File (Lesson 17) — before Lesson 18 shows you how to watch rows
move through a path while you debug.

## Key terms

| Term | Meaning |
|---|---|
| Data Flow tab | The SSIS Designer surface, reached through a Data Flow task, with its own Toolbox of sources, transformations, and destinations |
| Source | A data flow component that extracts data from outside the package and adds it to the data flow |
| Transformation | A data flow component that modifies, cleans, splits, or summarizes rows in place |
| Destination | A data flow component that writes rows out of the data flow into a data store |
| Path | The connector between two data flow components that carries rows and columns from one to the next |
| Error output | A component's secondary output that carries rows which failed, plus ErrorCode and ErrorColumn |

## Lab

1. Open a package from Chapter 2 (or create a new one), add a **Data
   Flow task** to the Control Flow surface, and rename it something
   descriptive like `Load Staging Data`.
2. Double-click the task to switch to the **Data Flow** tab. Confirm
   the Toolbox changed — you should no longer see Execute SQL Task or
   For Loop Container; instead you'll see categories for sources,
   transformations, and destinations.
3. Drag any one source onto the surface (don't configure it yet — just
   drop it) and right-click its output arrow. Confirm you can see both
   a regular output path and, on most sources, a red error-output path.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what
are the three kinds of data flow components, and which one(s) have an
input, which have an output, and which have both?
