# Activities

Chapter Two closes with an object type that's easy to overlook but shows up in almost every real
analysis: **Activities**. Every call logged, every meeting scheduled, every follow-up reminder
tracked against a Lead, Contact, or Opportunity runs through this.

## What you'll learn

- Why "Activity" isn't actually one Salesforce object
- What Task and Event really are, and how they differ
- How Activities connect back to the objects this chapter has covered

## "Activity" is a category, not one object

In casual conversation, people say "log an Activity" as if Activity were a single Salesforce
object. It isn't. **Activities** is really an umbrella term covering two real, separate standard
objects: **Task** and **Event**. Salesforce's UI often groups them together in one "Activity"
related list on a record's page, which is exactly why the umbrella term persists — but underneath
that shared UI, they're two distinct objects with different fields and different purposes.

## Task vs. Event: the real distinction

A **Task** represents an action item — usually something with no fixed calendar time, like "call
this Lead back," "send the proposal," or "follow up next week." A Task has a Status (Not Started,
In Progress, Completed) and often a Due Date, but no specific start/end time. An **Event**, by
contrast, represents something scheduled at a specific time — a meeting, a call with a defined
start and end time, something that would show up on a calendar. Both Task and Event can be related
to a Lead, a Contact, an Opportunity, or a Case — that's what lets you see a full activity history
against any of those records.

## Why Activities matter for analysis

Activities are often the most direct evidence of real sales or service effort, as opposed to just
the outcome. Two Opportunities with the identical Amount and Stage can have wildly different
Activity histories — one with a dozen logged calls and meetings, another with almost none — and
that difference is often what actually predicts whether a deal closes. An analyst building
anything like "rep activity levels" or "deals at risk due to no recent contact" is querying Task
and Event records, related back to Opportunity or Contact, not the Opportunity object alone.

## Key terms

| Term | Meaning |
|---|---|
| Activity | An umbrella term/UI grouping — not a real standalone object |
| Task | An action item without a fixed calendar time (a call to make, a follow-up) |
| Event | A calendar item with a specific start/end time (a meeting, a scheduled call) |

## Check yourself

Someone asks you to "pull all Activities logged against this Opportunity." Which two real
Salesforce objects are you actually querying, and how do they differ?
