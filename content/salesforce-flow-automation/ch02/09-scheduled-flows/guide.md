**Chapter 2 · Flow Types · Lesson 9 of 31**

# Scheduled Flows

Lessons 6 and 7 looked at flows that launch because a record was saved. A **scheduled flow**
(Salesforce calls the flow type **Schedule-Triggered Flow**) launches for a completely different
reason: the clock. No user, no record save, no screen — just a date, a time, and a frequency you
set once, after which the flow runs on its own, indefinitely.

## What you'll learn

- Where Schedule-Triggered Flow sits among Salesforce's flow types
- What the Start element's Set Schedule and Choose Object options actually configure
- How a scheduled flow processes records in a batch, not one at a time
- A worked example of a built scheduled flow, start to finish

## Where it fits among the flow types

Setup's New Flow screen lists Schedule-Triggered Flow alongside Screen Flow, Record-Triggered
Flow, Platform Event-Triggered Flow, Autolaunched Flow (No Trigger), and Record-Triggered
Orchestration. Its own description is blunt about what it does and doesn't involve:

![Schedule-Triggered Flow selected on Setup's New Flow screen, described as launching at a specified time and frequency for each record in a batch, running in the background with no trigger from a user or a record save.](/courses/salesforce-flow-automation/ch02/09-scheduled-flows/new-flow-schedule-triggered-selected.png)

"Runs in the background" is the key phrase. Like every other flow type in this chapter except
Screen Flows, a scheduled flow is a background process — nobody is watching it execute.

## Setting the schedule

Open a new Schedule-Triggered Flow and its Start element offers exactly two things to configure:

![The Start element for a Schedule-Triggered Flow, showing two menu items: Set Schedule and Choose Object (Optional).](/courses/salesforce-flow-automation/ch02/09-scheduled-flows/start-element-schedule-menu.png)

**Set Schedule** is where you pick the start date, start time, and frequency (Once, Daily, or
Weekly). **Choose Object (Optional)** is where a scheduled flow stops being a single timed
action and becomes a batch job: pick an object, add entry conditions, and the flow runs once
*for every matching record* at the scheduled time — not once total.

## A built example

Here's a daily scheduled flow with an object and several downstream elements already wired up:

![A Schedule-Triggered Flow canvas: Start set to "Fri, Oct 4, 2024, 1:00:00 AM, Daily," followed by Get High Priority Cases (Get Records), Count Cases (Assignment), Create Archived Metric (Create Records), and End.](/courses/salesforce-flow-automation/ch02/09-scheduled-flows/scheduled-flow-canvas.png)

Every night at 1:00 AM, this flow queries high-priority Cases, counts them, and writes the count
to an archive record — with nobody triggering a single step of it.

A scheduled flow doesn't have to recur. Set Frequency to Once and give it an object and
conditions, and it runs a single time against every record that currently matches:

![A "Schedule-Triggered Flow Example" with the Start element configured for a one-time run on Oct 31, 2023, against the Opportunity object with one condition, followed by an Update Field element and End.](/courses/salesforce-flow-automation/ch02/09-scheduled-flows/example-schedule-flow.png)

## Why use a scheduled flow instead of a record-triggered one

Record-triggered flows (Lessons 6-7) only run at the moment a record is created, updated, or
deleted. Some automation isn't tied to any single save at all — it depends on time passing:
"every Opportunity that's been in this stage for 30 days," "every night, archive closed Cases
older than a quarter," "every Monday morning, remind owners of overdue tasks." None of that has
a record-save moment to hook into. A scheduled flow is how Flow Builder reaches those cases.

## Key terms

| Term | Meaning |
|---|---|
| Schedule-Triggered Flow | The flow type that launches at a specified time and frequency, in the background |
| Set Schedule | The Start element option setting start date, start time, and frequency (Once/Daily/Weekly) |
| Choose Object (Optional) | The Start element option that turns the flow into a batch job against every record matching an object and conditions |
| Batch | The set of matching records a scheduled flow processes together at its scheduled run |

## Check yourself

A scheduled flow is set to run Weekly with no object chosen under Choose Object. What does it
actually do each week, and how is that different from the same flow with an object and
conditions set?
