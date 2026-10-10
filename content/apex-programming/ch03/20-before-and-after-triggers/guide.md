# Lesson 20 — Before and After Triggers

**Chapter 3 · Triggers · Lesson 20 of 43**

## What you'll learn

- What "before" triggers are for, and how to modify records without DML
- What "after" triggers are for, and why they need DML
- Why only after triggers can see system-generated fields like `Id`
- How to pick the right phase for a given piece of logic

## Before triggers: validate and default, no DML needed

A **before** trigger runs before the record is saved to the database. Its
job is field validation and setting default values — and because the
record hasn't been written yet, you can change fields directly on
`Trigger.new` and the new values are saved automatically, with no DML call:

```apex
trigger OpportunityTrigger on Opportunity (before insert, before update) {
    for (Opportunity opp : Trigger.new) {
        if (opp.CloseDate == null) {
            opp.CloseDate = Date.today().addDays(30);
        }
        if (opp.Amount != null && opp.Amount < 0) {
            opp.Amount.addError('Amount cannot be negative.');
        }
    }
}
```

Two things to notice:

- Setting `opp.CloseDate` directly is enough — no `update` statement. The
  platform persists whatever `Trigger.new` looks like once the before
  trigger finishes.
- `addError()` blocks the save entirely and shows the message to the user,
  which is how before triggers enforce validation rules in code.

## After triggers: related records, and they need DML

An **after** trigger runs once the record is already committed to the
database. By this point the record has its final, system-assigned `Id` (and
other system fields), so after triggers are where you create or update
*other* records that depend on this one — and because those are separate
records, you must issue real DML:

```apex
trigger OpportunityTrigger on Opportunity (after insert) {
    List<Task> followUps = new List<Task>();
    for (Opportunity opp : Trigger.new) {
        followUps.add(new Task(
            WhatId = opp.Id,
            Subject = 'Follow up on new opportunity',
            ActivityDate = Date.today().addDays(3)
        ));
    }
    insert followUps;
}
```

`opp.Id` only exists because this is an `after insert` trigger — in a
`before insert` trigger, `Id` is still null, since the record hasn't been
assigned one yet.

## Why you can't just use "after" for everything

You could technically validate fields in an after trigger too, but it would
need an explicit `update` call to re-save the record — a second DML
statement and a second trip through the whole save pipeline (duplicate
rules, validation rules, and this trigger itself running again). Before
triggers avoid that entirely for same-record field changes, which is why
Salesforce's guidance is: use before triggers for defaults/validation on
the triggering record itself, and after triggers for anything touching
*other* records or needing the committed `Id`.

## Putting both phases in one trigger

A single trigger can list both phases; use the context booleans from
Lesson 19 to separate the logic:

```apex
trigger AccountTrigger on Account (before insert, after insert) {
    if (Trigger.isBefore) {
        for (Account acc : Trigger.new) {
            if (acc.Rating == null) {
                acc.Rating = 'Warm';
            }
        }
    }
    if (Trigger.isAfter) {
        // acc.Id is available here; create related records if needed
    }
}
```

## Key terms

| Term | Meaning |
|---|---|
| Before trigger | Runs before save; modify `Trigger.new` directly, no DML, used for defaults/validation |
| After trigger | Runs after save; record has its final `Id`, used for related-record changes, requires DML |
| `addError()` | Called on a field or record in a before trigger to block the save with a message |
| System-generated field | A field like `Id` that only exists once the record is actually committed |

## Lab

On `Opportunity`, build one trigger with both `before insert` and `after
insert`. In the before phase, default `CloseDate` to 30 days out when blank.
In the after phase, insert a related `Task` with `WhatId` set to the new
Opportunity's `Id`. Create an Opportunity from the UI without a Close Date
and confirm both the default date and the follow-up Task appear.

## Check yourself

Why does `opp.Id` work in an `after insert` trigger but not in a `before
insert` trigger, and why don't before triggers need an explicit `update`
call to save their own changes?
