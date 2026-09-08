# Lesson 24 — Data Flow Debug Mode

**Chapter 5 · Mapping Data Flows · Lesson 2 of 7**

## What you'll learn

- How to turn on Debug mode, and what it actually spins up
- What Data Preview shows once it's on
- Why sinks are ignored during a debug session
- The one real cost consideration worth remembering

## Turning it on

Select the **Data Flow Debug** toggle on the canvas top bar:

![Screenshot showing the Data Flow Debug toggle on the data flow canvas top bar.](/courses/data-factory/ch05/24-data-flow-debug-mode/debug-button.png)

You'll be prompted to choose an integration runtime configuration.
Picking **AutoResolveIntegrationRuntime** spins up a small cluster —
by default, a 4-core single worker node with a 4-core single driver
node — with a 60-minute **time to live** by default:

![Screenshot of the integration runtime selection dialog shown when starting a data flow debug session.](/courses/data-factory/ch05/24-data-flow-debug-mode/debug-new-1.png)
*Raise the TTL if you want more idle time before the session times out — useful during a long design session.*

The cluster status indicator turns green once it's ready. If it was
already warm, that's nearly instant; a cold boot can take a few
minutes.

## Data Preview: watching the transformation happen

With debug on, the **Data Preview** tab lights up on every
transformation — an interactive snapshot of the actual data at that
exact point in the stream:

![Screenshot of the Data Preview tab, showing a Movies source connected to a sink, with a preview data grid of movie titles and genres, and insert/update/delete row counts.](/courses/data-factory/ch05/24-data-flow-debug-mode/datapreview.png)
*Select Refresh to update the preview based on current transformations — Refresh → Refetch from source if the underlying data itself changed.*

The row limit here comes from your **Debug Settings** — set per
source, and it overrides any sampling configured in the source
transformation itself while debug is on. You can sort and reorder
columns in the preview, and export up to 1,000 rows to CSV for
offline exploration.

## Sinks are ignored during debug

This is worth remembering explicitly: **debug mode never writes to a
sink**. It's a test harness for your transformation logic, sampled in
Spark memory — nothing lands anywhere real until you actually run the
data flow from a pipeline (via the pipeline's own **Debug** button, or
a real trigger). If you need to confirm a sink actually works, that
happens one level up, at the pipeline.

## What it costs

Every debug session spins up its **own** Spark cluster, billed
**hourly** for the entire time it's running — including the TTL idle
time after you stop actively working. Turn the toggle off when you're
genuinely done for the session; leaving it on "just in case" quietly
keeps billing.

## Key terms

| Term | Meaning |
|---|---|
| Debug mode | An interactive session against a live Spark cluster, for building and testing a data flow |
| Time to live (TTL) | How long the debug cluster stays warm after activity stops, before shutting down |
| Data Preview | An in-memory snapshot of transformed data at any point in the stream, while debug is on |

## Lab

1. Turn on Debug mode on any data flow with at least a source
   configured, and confirm the cluster status indicator turns green.
2. Open Data Preview on the source and confirm real rows appear.
3. Turn debug off, and write one sentence explaining why you'd want
   to do that the moment you're done working, not leave it running.

## Check yourself

You're ready for Lesson 25 when you can explain, in one sentence, why
a debug session never actually writes data to a sink, and where you'd
go instead to confirm a sink genuinely works.
