# Scheduled and Recurring Flows

Not every flow should wait for something to happen — some should just run on a clock. Castlebridge Logistics wants a load-planning summary emailed to its dispatch supervisors every Monday morning, with nobody manually kicking it off. This closing lesson of Chapter 1 covers the **Recurrence** trigger, the piece that turns a flow into something that runs on a schedule instead of in response to an event.

## What you'll learn

- The three fields that define a schedule: Interval, Frequency, and Start time
- How the new designer and classic designer each expose recurrence configuration
- Why a flow's Start time is set in UTC, and how to convert it for display
- How Castlebridge Logistics schedules its weekly Monday-morning summary

## Creating a scheduled cloud flow

A scheduled cloud flow starts from a blank canvas, same as any other flow, except the trigger you search for is **Recurrence** instead of an app or connector event. Selecting it replaces the empty "Add a trigger" placeholder with a live Recurrence trigger and opens its configuration immediately.

## The Recurrence trigger: Interval, Frequency, Start time

Three fields define the schedule. **Interval** is a number — how many units between runs. **Frequency** is the unit itself: minute, hour, day, week, or month. Together, Interval 1 and Frequency Week means "every week"; Interval 2 and Frequency Week means "every two weeks." **Start time** anchors the schedule to a specific date and time, entered in the format `YYYY-MM-DDTHH:MM:SSZ` — always Coordinated Universal Time, regardless of where the flow's owner is sitting.

![Screenshot of the options to set up a scheduled flow.](/courses/power-automate/ch01/15-scheduled-and-recurring-flows/select-recurrence-aa.png)
*Interval, Frequency, and Start time together define exactly when and how often the flow runs.*
Source: [Microsoft Learn — Run a cloud flow on a schedule](https://learn.microsoft.com/en-us/power-automate/run-scheduled-tasks)

## New designer vs. classic designer

Power Automate exposes the same recurrence settings through two different panes depending on which designer you're using. The new designer opens a configuration pane directly in the canvas when you select the trigger; the classic designer requires expanding **Show advanced options** on the Recurrence card first.

![Screenshot of a prompt to create a scheduled flow in the action configuration pane.](/courses/power-automate/ch01/15-scheduled-and-recurring-flows/select-recurrence-new.png)
*The new designer's side pane — the same Interval, Frequency, and time-zone fields, just surfaced differently than the classic card view.*
Source: [Microsoft Learn — Run a cloud flow on a schedule](https://learn.microsoft.com/en-us/power-automate/run-scheduled-tasks)

## Castlebridge Logistics' Monday-morning flow

Castlebridge Logistics sets Interval to 1 and Frequency to Week, with the day of the week set to Monday and a Start time entered in UTC. Because the dispatch office works in Eastern time, the flow's first action converts the trigger's UTC timestamp into something a human reading the run log will actually recognize:

```
convertFromUtc(
  utcNow(),
  'Eastern Standard Time'
)
```

That converted value gets logged alongside the run, so nobody has to do UTC-to-Eastern math by hand when checking whether Monday's summary went out on time.

## Chapter 1 complete

That's all fifteen lessons of Business Process Automation: triggers and actions, conditions and loops, variables and expressions, the Outlook, Teams, Excel, SharePoint, and Power BI connectors, approval workflows, error handling, and now scheduling. Every flow in this chapter ran inside a single maker's own environment. Chapter 2, Enterprise Automation, picks up from here — Dataverse, custom connectors, and the governance a flow needs once it's no longer just yours.

## Key terms

- **Recurrence trigger** — the trigger that runs a flow on a schedule instead of in response to an event
- **Interval / Frequency** — the number and unit (minute, hour, day, week, month) that define how often the flow runs
- **Start time** — the schedule's anchor date and time, always entered in UTC
- **convertFromUtc()** — the expression function that converts a UTC timestamp into a named time zone for display
- **Scheduled cloud flow** — a cloud flow whose trigger is Recurrence rather than a connector event
