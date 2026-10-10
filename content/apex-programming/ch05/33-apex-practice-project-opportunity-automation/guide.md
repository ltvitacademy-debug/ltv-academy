# Lesson 33 — Apex Practice Project: Opportunity Automation

**Chapter 5 · Applied Apex · Lesson 33 of 43**

## What you'll learn

- How to combine trigger, handler, bulkification, and DML concepts from Chapters 1-4 into one working feature
- Building a realistic automation: auto-create a follow-up Task when an Opportunity closes won
- Why this project deliberately avoids SOQL/DML inside a loop, per Lesson 27
- How to structure the handler so it's easy to extend with more Opportunity automation later
- A self-contained worked example you can deploy and test today

## The business problem

A sales team wants every Opportunity that closes with `StageName = 'Closed Won'` to automatically get a follow-up `Task` assigned to the Opportunity Owner, due two business days later, so onboarding never silently falls through the cracks. This is a classic, small, realistic Apex automation — the kind of thing a junior Salesforce developer builds in their first few weeks on a real team.

## The trigger

Following Lesson 21's trigger handler pattern, the trigger itself stays minimal — it only detects the event and delegates:

```apex
trigger OpportunityTrigger on Opportunity (after update) {
    if (Trigger.isAfter && Trigger.isUpdate) {
        OpportunityTriggerHandler.handleAfterUpdate(Trigger.new, Trigger.oldMap);
    }
}
```

## The handler class

```apex
public with sharing class OpportunityTriggerHandler {

    public static void handleAfterUpdate(List<Opportunity> newOpps, Map<Id, Opportunity> oldMap) {
        List<Task> followUpTasks = new List<Task>();

        for (Opportunity opp : newOpps) {
            Opportunity oldOpp = oldMap.get(opp.Id);
            Boolean justClosedWon = opp.StageName == 'Closed Won'
                && oldOpp.StageName != 'Closed Won';

            if (justClosedWon) {
                followUpTasks.add(new Task(
                    WhatId = opp.Id,
                    OwnerId = opp.OwnerId,
                    Subject = 'Kick off onboarding for ' + opp.Name,
                    ActivityDate = Date.today().addDays(2),
                    Priority = 'High',
                    Status = 'Not Started'
                ));
            }
        }

        if (!followUpTasks.isEmpty()) {
            insert followUpTasks;
        }
    }
}
```

## Why this follows this course's best practices

Every piece of this handler reflects something taught earlier in the course:

- **Bulkified** (Chapter 3, Lesson 27): the loop builds a `List<Task>` and issues exactly one `insert` after the loop, regardless of whether 1 or 200 Opportunities are in `Trigger.new`.
- **Correct trigger context variable** (Lesson 19): `Trigger.oldMap` is used specifically to compare each record's *previous* `StageName` against its *new* one — without the old map, there would be no way to tell a newly-closed-won Opportunity from one that was already closed won before this update.
- **Guards an empty case**: the `if (!followUpTasks.isEmpty())` check avoids an unnecessary DML statement when nothing actually changed to Closed Won in this batch.
- **`with sharing`** (Lesson 31): a deliberate choice — this automation should respect the running user's sharing model rather than silently acting with elevated access.

## Extending it

Because the handler method takes the full `newOpps`/`oldMap` pair rather than a single record, adding a second piece of Opportunity automation later — say, notifying a manager on any Opportunity above a dollar threshold — means adding another loop (or another branch inside the same loop) to the same handler method, not writing a second trigger on the same object (which Lesson 22 explained you should avoid).

## Key terms

| Term | Meaning |
|---|---|
| `Trigger.oldMap` | Lets the handler compare a record's previous field values against its new ones |
| Bulkified handler | A handler that builds a collection across the loop and issues one DML statement after it |
| Guard clause | A check (like `isEmpty()`) that skips unnecessary work, such as a DML statement with nothing to do |

## Lab

In a Developer Edition org, create the `OpportunityTrigger` and `OpportunityTriggerHandler` exactly as shown. Create a test Opportunity in `Prospecting` stage, then update its `StageName` to `Closed Won` and save. Confirm a new `Task` was created on that Opportunity, due two days out. Then update a different Opportunity's `StageName` from one non-closed stage to another non-closed stage, and confirm no Task was created — the automation should only fire on the actual transition into Closed Won.

## Check yourself

Why does this handler need `Trigger.oldMap` specifically, rather than just checking `opp.StageName == 'Closed Won'` on `Trigger.new` alone? What would happen to this handler's behavior if the `insert followUpTasks;` line were moved inside the `for` loop instead of after it?
