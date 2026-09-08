# Lesson 5 — The Data Factory Studio Tour

**Chapter 1 · Getting Started · Lesson 5 of 5**

## What you'll learn

- The five hubs in Data Factory Studio's left-hand navigation
- What actually lives inside the Author hub
- How a dataset's connection settings get configured
- What the Monitor hub shows, and how to drill into one run's detail

## Five hubs, one left-hand rail

Everything in Data Factory Studio is organized behind five icons
running down the left side of the screen:

| Hub | What it's for |
|---|---|
| **Home** | The landing page — Ingest, Orchestrate, Transform data, Configure SSIS shortcuts |
| **Author** (pencil) | Where you actually build pipelines, datasets, and data flows |
| **Monitor** (speedometer) | Where you watch pipeline runs, past and present |
| **Manage** (briefcase) | Linked services, integration runtimes, triggers, Git configuration |
| **Learning center** (graduation cap) | Guided tutorials and templates |

This lesson tours the two you'll spend the most time in early on:
Author and Monitor.

## The Author hub

Selecting **Author** opens the hub where nearly all hands-on work in
this course happens:

![Screenshot of Data Factory Studio's Author hub, showing the Factory Resources pane on the left, an Activities pane, and a pipeline canvas with a Copy activity and its Source settings open below.](/courses/data-factory/ch01/05-studio-tour/view-pipeline.png)
*Factory Resources (far left) lists every pipeline, dataset, and data flow. The canvas in the middle is where you drag activities and wire them together.*

**Factory Resources**, on the far left, is the tree of everything
you've built — pipelines, datasets, data flows, and more, all in one
place. Select any pipeline to open its canvas, where activities from
the middle pane get dragged in and connected.

## Configuring a dataset

Select a dataset in Factory Resources, and its editor opens with a
**Connection** tab — where you point it at the actual file, table, or
folder it represents:

![Screenshot of a dataset's Connection tab in Data Factory Studio, showing the linked service dropdown, a file path split into three fields, and a Browse button.](/courses/data-factory/ch01/05-studio-tour/source-dataset-browse.png)
*Linked service at the top (which connection to use), then the specific path within it — here, split into container, folder, and file name.*

This is the dataset concept from Lesson 1 made concrete: the linked
service says *how to connect*, and this Connection tab says *which
specific data*, inside that connection, this dataset actually points
to.

## The Monitor hub

Selecting **Monitor** shows every pipeline run, triggered or debug,
past or in progress:

![Screenshot of Data Factory Studio's Monitor hub, showing a Pipeline runs list with columns for pipeline name, run start, duration, triggered by, and status.](/courses/data-factory/ch01/05-studio-tour/monitor-overview.png)
*Every run, at a glance — status, duration, and what triggered it. Chapter 8 covers this hub in real depth.*

## Drilling into one run

Select a pipeline name from that list, and you see the actual
activities that ran, in the order they ran, with a status icon on
each:

![Screenshot of a pipeline run's activity details in Data Factory Studio, showing a Copy data activity marked succeeded, an Activity runs table below it, and a Details icon highlighted.](/courses/data-factory/ch01/05-studio-tour/copy-activity-run-results.png)
*Select the Details icon (the magnifying glass) on any activity run for a full breakdown — for a Copy activity, that includes exactly how much data was read and written.*

This is exactly where you'll go the moment something in a real
pipeline doesn't behave the way you expected — Chapter 8 builds this
habit out in full.

## Key terms

| Term | Meaning |
|---|---|
| Factory Resources | The Author hub's tree of every pipeline, dataset, and data flow you've built |
| Connection tab | Where a dataset's specific path/table is configured, on top of its linked service |
| Pipeline run | One execution of a pipeline, viewable in the Monitor hub |
| Activity run | One activity's execution within a specific pipeline run |

## Lab

1. If you created a data factory in Lesson 4's lab, open **Author**
   and locate the Factory Resources pane — even with nothing built
   yet, confirm you can see the empty Pipelines, Datasets, and Data
   flows categories.
2. Open **Monitor** and confirm you can find the Pipeline runs list,
   even if it's empty for a brand-new factory.
3. Name, from memory, which of the five hubs you'd open to: build a
   new pipeline, check why yesterday's run failed, and configure a
   linked service.

## Check yourself

Chapter 1 is complete when you can name all five Data Factory Studio
hubs from memory, and explain what you'd actually go to each one to
do.
