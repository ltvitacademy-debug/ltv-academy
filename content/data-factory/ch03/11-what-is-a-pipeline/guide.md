# Lesson 11 — What Is a Pipeline?

**Chapter 3 · Pipelines & Activities · Lesson 1 of 6**

## What you'll learn

- What a pipeline actually groups together, and why that matters
- The three groupings every activity falls into
- How to create a pipeline in Data Factory Studio
- The four panes of the pipeline editor

## A logical grouping of activities

Recall Lesson 1: a **pipeline** is a logical grouping of activities
that together perform one unit of work. An activity can take zero or
more input datasets and produce one or more output datasets:

![Diagram showing the relationship between a pipeline, its activities, and the datasets those activities read from and write to.](/courses/data-factory/ch03/11-what-is-a-pipeline/entity-relationship.png)
*A pipeline groups activities. Activities consume and produce datasets. Chapter 2 built the bottom of this chain; this chapter builds the rest.*

The real benefit of grouping activities into a pipeline: you manage,
deploy, and schedule them **as a set**, instead of one at a time. A
pipeline that ingests log data and then kicks off a transformation is
one thing to trigger, monitor, and retry — not two or three separate
things you have to coordinate by hand.

## Three groupings, every activity

Every activity Data Factory supports falls into exactly one of three
categories:

| Grouping | What it does | Examples |
|---|---|---|
| **Data movement** | Copies data from a source to a sink | Copy activity (Lesson 12) |
| **Data transformation** | Processes or reshapes data using a compute engine | Data Flow, Stored Procedure (Lesson 14), Databricks Notebook |
| **Control** | Manages the flow of the pipeline itself, not the data | If Condition, ForEach, Wait, Set Variable (Chapter 4, and Lesson 15) |

A single pipeline typically mixes all three — a Lookup to determine
what to process, a Copy to move it, and a control activity to decide
what happens next based on the result.

## Creating a pipeline in Data Factory Studio

In the **Author** hub, select the **+** icon, choose **Pipeline**,
then **Pipeline** again from the submenu:

![Screenshot showing the steps to create a new pipeline in Data Factory Studio, with the plus icon and Pipeline menu option highlighted.](/courses/data-factory/ch03/11-what-is-a-pipeline/create-pipeline-with-ui.png)

This opens the pipeline editor — four panes worth knowing by name,
since every remaining lesson in this chapter lives inside them:

![Screenshot of the pipeline editor in Data Factory Studio, with four numbered sections highlighted: the Activities pane, the canvas, the configuration pane with Parameters/Variables/Settings/Output tabs, and the Properties pane.](/courses/data-factory/ch03/11-what-is-a-pipeline/pipeline-configuration-with-ui.png)

1. **Activities** — every activity type available to drag onto the canvas.
2. **Canvas** — where activities land and get wired together.
3. **Configuration pane** — parameters, variables, settings, and output for whatever's selected.
4. **Properties pane** — the pipeline's own name, description, and annotations.

## A soft limit worth knowing

A pipeline supports a **default soft limit of 120 activities**,
including activities nested inside containers like `ForEach`. It's a
generous limit for nearly any real pipeline — if you're bumping into
it, that's usually a sign the pipeline is trying to do too much, and
a good moment to split it into smaller pipelines chained with an
**Execute Pipeline** activity (Chapter 4).

## Key terms

| Term | Meaning |
|---|---|
| Pipeline | A logical grouping of activities managed, deployed, and scheduled together |
| Data movement activity | An activity that copies data from a source to a sink |
| Data transformation activity | An activity that processes or reshapes data using a compute engine |
| Control activity | An activity that manages the pipeline's flow rather than its data |

## Lab

1. If you have a data factory from Chapter 1, create a new, empty
   pipeline and locate all four panes described above.
2. Search the Activities pane for three activities you don't
   recognize yet, and guess — before checking — which of the three
   groupings each one belongs to.
3. Write one sentence explaining why managing a pipeline as one unit
   is easier than managing each of its activities individually.

## Check yourself

You're ready for Lesson 12 when you can name the three activity
groupings from memory, and explain which one the Copy activity
belongs to.
