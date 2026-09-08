# Lesson 32 — Event-Based Triggers

**Chapter 6 · Triggers & Scheduling · Lesson 3 of 4**

## What you'll learn

- What a storage event trigger actually watches for
- The `Blob path begins with` / `ends with` pattern matching
- How a trigger passes the file's own path into your pipeline
- Why Data Factory never touches the storage account directly

## Firing on a file, not a clock

A **storage event trigger** runs a pipeline in response to a real
event on a storage account — a file arriving, or a file being
deleted — instead of any wall-clock schedule at all. It's built on
**Azure Event Grid**, and currently supports Azure Data Lake Storage
Gen2 and general-purpose v2 storage accounts.

## Creating one

From the pipeline's **Trigger → New/Edit**, select **Storage
events** as the type:

![Screenshot of creating a new storage event trigger, selecting the storage account and container.](/courses/data-factory/ch06/32-event-based-triggers/event-trigger-1.png)

Choose the storage account, the container to watch, and set the
matching pattern:

![Screenshot of the storage event trigger creation page, showing Blob path begins with, Blob path ends with, and Blob created/deleted event checkboxes.](/courses/data-factory/ch06/32-event-based-triggers/event-trigger-2.png)

## Two patterns, and that's genuinely all

`Blob path begins with` and `Blob path ends with` are the **only**
pattern matching a storage event trigger supports — no other
wildcards. At least one of the two is required:

| Property | Example | Matches |
|---|---|---|
| Begins with | `/containername/` | Any blob in that container |
| Begins with | `/containername/blobs/foldername/` | Any blob in that folder |
| Ends with | `file.txt` | Any blob named `file.txt`, in any path |
| Ends with | `foldername/file.txt` | `file.txt` in that folder, under any container |

Choose whether the trigger fires on **Blob created**, **Blob
deleted**, or both — and whether zero-byte blobs should be ignored
(the default).

## Passing the arrived file into your pipeline

The trigger captures the file's location as `@triggerBody().folderPath`
and `@triggerBody().fileName`. Map these to pipeline parameters
during trigger setup, and any activity in the pipeline can reference
them as `@pipeline().parameters.<name>`:

![Screenshot of mapping a storage event trigger's folderPath and fileName properties to pipeline parameters sourceFolder and sourceFile.](/courses/data-factory/ch06/32-event-based-triggers/event-trigger-4.png)
*When `MoviesDB.csv` lands in `sample-data/event-testing`, these parameters carry exactly that path and file name into the pipeline.*

## Data Factory never touches the storage account directly

This is worth understanding, not just memorizing: Data Factory
doesn't poll the storage account or contact it directly to detect
events at all. It subscribes to Event Grid, which relays the event
the moment storage actually reports it — a genuine **push** model,
not a polling loop. The one exception: if an activity inside the
triggered pipeline (a Copy activity, say) actually reads that file,
*that* activity connects to storage directly, using its own linked
service credentials — a completely separate step from the trigger
itself.

## Key terms

| Term | Meaning |
|---|---|
| Storage event trigger | Fires a pipeline on Blob created/deleted events, via Event Grid |
| Blob path begins with / ends with | The only two pattern-matching properties a storage event trigger supports |
| @triggerBody().fileName | The arrived file's name, mappable to a pipeline parameter |

## Lab

1. If you have an Azure Storage account, create a storage event
   trigger watching one container, firing on **Blob created**.
2. Map `folderPath` and `fileName` to two pipeline parameters.
3. Upload a test file to the watched container and confirm, in the
   Monitor hub (Lesson 5), that the pipeline actually fired with the
   correct parameter values.

## Check yourself

You're ready for Lesson 33 when you can explain, in one sentence,
why Data Factory doesn't need direct storage account access just to
detect that a file arrived.
