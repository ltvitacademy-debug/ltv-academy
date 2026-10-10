# Lesson 18 — What Triggers Are

**Chapter 3 · Triggers · Lesson 18 of 43**

## What you'll learn

- What an Apex trigger is and when Salesforce runs one
- The exact `trigger` syntax and all seven trigger events
- How a trigger differs from a regular Apex class
- Why triggers are active the moment you save them

## What a trigger is

A **trigger** is Apex code that Salesforce executes automatically in response
to a DML event — insert, update, delete, or undelete — on a specific
sObject. You don't call a trigger yourself; the platform invokes it whenever
a matching database operation happens, whether that operation came from the
UI, the API, a Data Loader import, a Flow, or another piece of Apex.

That's the key difference from a class or a controller method: a trigger has
no public methods you call. It's a block of code bound to an object and a
set of events, and the platform decides when it runs.

## Basic syntax

```apex
trigger AccountTrigger on Account (before insert, before update) {
    // trigger body
}
```

- `AccountTrigger` is the trigger's name — pick something descriptive.
- `Account` is the sObject the trigger is bound to. A trigger is always
  scoped to exactly one object.
- The parenthesized list is one or more **trigger events**, comma-separated.

## The seven trigger events

A trigger can fire on any combination of these:

```apex
trigger OpportunityTrigger on Opportunity (
    before insert,
    before update,
    before delete,
    after insert,
    after update,
    after delete,
    after undelete
) {
    // runs for every event listed above
}
```

Notice there's no `before undelete` — undelete only fires an `after` event,
since there's nothing to validate before a record is restored from the
Recycle Bin.

## Triggers are active immediately

Unlike a class, a trigger starts running the moment it's saved (unless you
explicitly deactivate it from Setup). There's no separate "enable" step, so
every trigger you write in a sandbox or scratch org starts firing on
matching DML right away — which is exactly why you test with sample data
before anyone touches real records.

## A minimal real example

```apex
trigger ContactTrigger on Contact (before insert) {
    for (Contact c : Trigger.new) {
        if (c.LeadSource == null) {
            c.LeadSource = 'Web';
        }
    }
}
```

This fires before every new `Contact` is inserted and defaults `LeadSource`
to `'Web'` when it's blank. `Trigger.new` — covered in full next lesson — is
the list of records currently being processed.

## Key terms

| Term | Meaning |
|---|---|
| Trigger | Apex code bound to one sObject that runs automatically on a DML event |
| Trigger event | One of `before insert`, `before update`, `before delete`, `after insert`, `after update`, `after delete`, `after undelete` |
| DML event | The insert/update/delete/undelete operation that causes a trigger to fire |
| `Trigger.new` | The list of records currently being processed (introduced here, detailed in Lesson 19) |

## Lab

In a free Developer Edition org or a scratch org, create a new Apex Trigger
named `ContactTrigger` on the `Contact` object with a single `before insert`
event. Paste in the `LeadSource` default example above. Save it, then create
a new Contact from the UI without setting Lead Source, and confirm it saves
with Lead Source set to `Web`. Then create a second Contact that *does* set
Lead Source explicitly, and confirm your value is left alone.

## Check yourself

Without looking back: what are the seven trigger events, and why is there no
`before undelete`?
