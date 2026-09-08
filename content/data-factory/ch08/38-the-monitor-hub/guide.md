# Lesson 38 — The Monitor Hub

**Chapter 8 · Monitoring & Error Handling · Lesson 1 of 4**

## What you'll learn

- How to read the pipeline runs list — every column, what it means
- How to drill from a pipeline run into its individual activity runs
- How to read a real error message and act on it
- The Gantt view, and when it beats the list view
- Rerun vs. rerun from failed activity — and why the difference matters

## Where every run in your data factory actually lives

Once a pipeline is published, every run it ever makes — triggered or
manual — shows up in one place: the **Monitor** hub, in the left
sidebar of Data Factory Studio. This is genuinely where you'll spend
most of your time once pipelines are in production; building them is
the smaller half of the job.

## Reading the pipeline runs list

The default view is a list of every triggered pipeline run in the
selected time window:

![Pipeline runs list view showing pipeline name, run start/end, duration, triggered by, and status columns.](/courses/data-factory/ch08/38-the-monitor-hub/pipeline-runs.png)
*Search by run ID or name, filter by time range or status, and each row shows exactly when a pipeline ran and how long it took.*

| Column | What it tells you |
|---|---|
| Pipeline Name | Which pipeline ran |
| Run Start / Run End | Exact start and end timestamps |
| Duration | How long the run actually took |
| Triggered By | The trigger (or manual run) that started it |
| Status | Failed, Succeeded, In Progress, Canceled, or Queued |
| Run | Original, Rerun, or Rerun (Latest) |
| Run ID | The unique ID for this specific run |

Note the **Refresh** button — this view does not auto-refresh, so a
long-running pipeline won't visibly update until you click it
yourself.

## Drilling into activity runs

Clicking a pipeline name opens the **activity runs** for that specific
run — every activity inside the pipeline, in the order it executed:

![Activity runs list showing each activity's name, type, duration, integration runtime, and status for one pipeline run.](/courses/data-factory/ch08/38-the-monitor-hub/activity-runs.png)
*Each row is one activity inside the pipeline run — its type, which integration runtime it used, how long it took, and whether it succeeded.*

This is where real debugging actually starts: a pipeline status of
"Failed" only tells you *that* something broke. The activity runs
view tells you *which* activity broke.

## Reading a real error

Click the error icon on a failed activity, and Data Factory shows the
actual error it received:

![Error details panel showing error code 2200, failure type "User configuration issue," and a detailed exception message.](/courses/data-factory/ch08/38-the-monitor-hub/activity-run-error.png)
*Error code, failure type, and the raw exception text — here, an Amazon S3 bucket that doesn't exist. The failure type alone often tells you whether it's your configuration or something on the other end.*

The **failure type** field is worth reading first — "User
configuration issue" points you straight at your linked service or
dataset settings, rather than making you guess whether it's a
transient network blip.

## The Gantt view

Switch from **List** to **Gantt** to see run history laid out over
time, one row per pipeline:

![Gantt chart view showing pipeline runs as colored bars across a date range, grouped by pipeline name.](/courses/data-factory/ch08/38-the-monitor-hub/select-gantt.png)
*Each bar is one run; bar length shows duration, and a red bar flags a run still in progress or overdue. Great for spotting a pipeline that's suddenly taking much longer than usual, at a glance.*

The list view answers "what happened on this one run." The Gantt view
answers "how has this pipeline been behaving over the last week" —
reach for it when you're hunting for a pattern, not a single failure.

## Two different kinds of rerun

![Rerun option highlighted in the pipeline runs toolbar.](/courses/data-factory/ch08/38-the-monitor-hub/rerun-pipeline.png)
*Rerun, from the pipeline runs list, restarts the entire pipeline from its first activity.*

![Rerun from failed activity option shown on a specific activity run.](/courses/data-factory/ch08/38-the-monitor-hub/rerun-failed-activity.png)
*Rerun from failed activity, from the activity runs view, restarts only from the activity that failed — every activity that already succeeded is skipped.*

For a pipeline with several expensive activities before the one that
actually failed, that difference is significant: rerunning from the
failed activity avoids redoing work that already completed
successfully.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline run | One execution of a pipeline, triggered or manual |
| Activity run | One execution of a single activity inside a pipeline run |
| Failure type | Data Factory's classification of what kind of error occurred |
| Gantt view | A timeline view of runs, one row per pipeline, bars sized by duration |

## Lab

1. Open **Monitor → Pipeline runs** and switch between List and Gantt
   view for a pipeline you've already run in this course.
2. Click into the activity runs for one pipeline run and identify
   which integration runtime each activity used.
3. Write one sentence explaining the difference between Rerun and
   Rerun from failed activity.

## Check yourself

You're ready for Lesson 39 when you can explain, in one sentence, why
the failure type field on an error is often more useful than the raw
exception message for deciding your next step.
