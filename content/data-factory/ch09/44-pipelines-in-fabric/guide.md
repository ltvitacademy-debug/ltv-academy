# Lesson 44 — Pipelines in Fabric

**Chapter 9 · Fabric Data Factory · Lesson 3 of 6**

## What you'll learn

- What genuinely stays the same in a Fabric pipeline
- Connections replacing datasets and linked services
- Save and Run replacing the publish step
- Why there's no separate "debug mode" anymore

## The orchestration model you already know

A Fabric pipeline is still a pipeline: activities, control flow, If
Condition, ForEach, parameters — everything from Chapters 3 and 4
maps directly. What's different isn't the *thinking*, it's several of
the *building blocks* underneath.

## No more separate dataset objects

In classic ADF, a dataset was its own reusable object, sitting
between a linked service and an activity. Fabric drops that layer
entirely — **connection properties are defined inline, directly
inside each activity**:

![Copy data wizard in Fabric, step 1 of 5: Choose data source, showing a searchable grid of connectors including Azure SQL Database, Azure Blob Storage, and Amazon S3.](/courses/data-factory/ch09/44-pipelines-in-fabric/copy-data-source.png)
*A guided, five-step wizard — choose source, connect, choose destination, connect, review and save. No separate dataset object to define first.*

This is a genuinely simpler mental model once you're used to it: no
more maintaining a dataset that just wraps a linked service reference
and a file path. The Copy activity's Source tab holds the connection,
file path, and format directly.

## Connections replace linked services

**Linked services** become **Connections** in Fabric — conceptually
the same idea (a reusable reference to a data store), but managed
through a more intuitive, centralized connections list rather than
being tied to a specific factory resource.

One real limitation worth knowing: connection properties themselves
don't support dynamic parameterization the way ADF linked services
could. If your pattern relies on a metadata-driven, parameterized
connection string, you instead parameterize the **connection object**
a pipeline activity references — a similar outcome, reached slightly
differently.

## No publish step, no separate debug mode

Two more simplifications worth internalizing:

- **Save and Run replace Publish.** Classic ADF required an explicit
  publish before changes went live. In Fabric, you just **Save** to
  store your work, or **Run** to save and execute immediately.
- **You're always in interactive mode.** ADF's separate debug mode —
  the thing you used constantly in Chapter 3 and 4's labs — doesn't
  exist as a distinct mode in Fabric. There's one mode, and it's
  always live.

## Quick duplication with Save As

![Save As button highlighted in a Fabric pipeline's toolbar.](/courses/data-factory/ch09/44-pipelines-in-fabric/save-as-button.png)
*Duplicate any existing pipeline in one action — for a dev copy, a test variation, or as a starting point for a similar workflow.*

Where classic ADF required exporting and re-importing an ARM template
to duplicate a pipeline, Fabric's **Save As** does it in a single
click.

## Key terms

| Term | Meaning |
|---|---|
| Connection | Fabric's equivalent of a linked service — a reusable reference to a data store |
| Inline dataset properties | File path, format, and schema defined directly in the activity, not a separate object |
| Save As | One-click pipeline duplication, replacing ADF's ARM-template export/import approach |

## Lab

1. Compare the five-step Copy data wizard shown in this lesson to the
   dataset-then-activity flow you used in Chapter 3's Copy activity
   lab.
2. Write one sentence explaining what replaced the "publish" step you
   used constantly in earlier chapters.
3. Note one real limitation of Connections compared to ADF's
   parameterized linked services.

## Check yourself

You're ready for Lesson 45 when you can explain, in one sentence, why
Fabric no longer needs a separate dataset object between a linked
service and an activity.
