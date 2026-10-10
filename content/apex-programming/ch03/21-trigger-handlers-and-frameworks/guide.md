# Lesson 21 — Trigger Handlers and Frameworks

**Chapter 3 · Triggers · Lesson 21 of 43**

## What you'll learn

- Why business logic shouldn't live directly in the trigger body
- The handler pattern: a thin trigger that delegates to a class
- How to split handler logic by context (before insert, after update, etc.)
- What a trigger framework adds on top of a hand-rolled handler

## The problem with logic-in-the-trigger

Nothing stops you from writing all your logic straight inside the trigger
body, the way every example so far in this chapter has:

```apex
trigger OpportunityTrigger on Opportunity (before insert) {
    for (Opportunity opp : Trigger.new) {
        if (opp.CloseDate == null) {
            opp.CloseDate = Date.today().addDays(30);
        }
    }
}
```

That's fine for a one-line example, but real logic grows: more fields,
more validation, more related-record work. Code sitting directly in a
trigger is hard to unit test in isolation and hard to reuse, since a
trigger itself can't be called from anywhere else.

## The handler pattern

The fix is to keep the trigger body thin — just routing to a handler class —
and put the actual logic in that class, where it's ordinary, testable Apex:

```apex
trigger OpportunityTrigger on Opportunity (before insert, after insert) {
    OpportunityTriggerHandler handler = new OpportunityTriggerHandler();
    if (Trigger.isBefore && Trigger.isInsert) {
        handler.beforeInsert(Trigger.new);
    }
    if (Trigger.isAfter && Trigger.isInsert) {
        handler.afterInsert(Trigger.new);
    }
}
```

```apex
public class OpportunityTriggerHandler {
    public void beforeInsert(List<Opportunity> newOpps) {
        for (Opportunity opp : newOpps) {
            if (opp.CloseDate == null) {
                opp.CloseDate = Date.today().addDays(30);
            }
        }
    }

    public void afterInsert(List<Opportunity> newOpps) {
        List<Task> followUps = new List<Task>();
        for (Opportunity opp : newOpps) {
            followUps.add(new Task(WhatId = opp.Id, Subject = 'Follow up'));
        }
        insert followUps;
    }
}
```

Now `OpportunityTriggerHandler` is a normal class: you can instantiate it
and call `beforeInsert()` directly from a test with a plain list of
in-memory `Opportunity` records, without needing real DML to exercise the
logic.

## Splitting by context

As logic grows, it helps to give each trigger event its own handler method,
exactly as above — one method per context (`beforeInsert`, `beforeUpdate`,
`afterInsert`, `afterUpdate`, and so on) rather than one giant method with
nested `if` checks for every event. This keeps each method focused on one
job and easy to find.

## What a framework adds

A **trigger framework** is a reusable base class that several triggers
share, so you don't rewrite the same routing boilerplate every time. A
common shape is a base `TriggerHandler` class with virtual methods like
`beforeInsert()`, `afterUpdate()`, and so on, plus a single `run()` method
that the actual trigger calls:

```apex
trigger OpportunityTrigger on Opportunity (before insert, after insert) {
    new OpportunityTriggerHandler().run();
}
```

Your object-specific handler then `extends` the base class and overrides
only the methods it needs. The framework's base class is responsible for
figuring out which context is active and calling the right override — which
also gives you one place to add cross-cutting features like a recursion
guard (Lesson 24) that every trigger using the framework automatically
gets.

## Key terms

| Term | Meaning |
|---|---|
| Handler class | An ordinary Apex class holding the logic a trigger used to contain inline |
| Thin trigger | A trigger body that only routes to a handler, with no business logic itself |
| Trigger framework | A shared base class that standardizes routing, context-dispatch, and cross-cutting concerns across many triggers |

## Lab

Take your `ContactTrigger` from Lesson 18. Create a `ContactTriggerHandler`
class with a `beforeInsert(List<Contact> newContacts)` method, move the
`LeadSource` default logic into it, and rewrite the trigger body to just
instantiate the handler and call that method when `Trigger.isBefore &&
Trigger.isInsert`. Confirm Contact inserts still default `LeadSource`
correctly.

## Check yourself

Why is it easier to unit test `handler.beforeInsert(someList)` directly than
to test logic written inline inside the trigger body?
