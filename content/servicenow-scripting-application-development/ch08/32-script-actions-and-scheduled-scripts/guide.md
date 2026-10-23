# Lesson 32 — Script Actions & Scheduled Scripts

**Chapter 8 · Scripted REST APIs & Script Actions · Lesson 32 of 37**

## What you'll learn

- What a Script Action (`sysevent_script_action`) is and how it's triggered
- Why a Script Action is loosely coupled to a table's database operation, unlike a Business Rule
- How `gs.eventQueue()` connects an event producer to a Script Action listener
- What a Scheduled Script is, and a real nightly-cleanup use case for one

## The event queue, revisited

Back in this course's Notifications chapter, you saw `gs.eventQueue('event.name', current, param1,
param2)` fire a named event that a Notification could react to. That same event queue
(`sysevent`) has another kind of listener besides Notifications: a **Script Action**.

A Script Action is a server-side script, stored in `sysevent_script_action`, that runs whenever a
specific named event fires. It's a real, first-class way to run arbitrary script in response to
something happening — not just send an email or push a message like a Notification would.

## Script Action vs. Business Rule — the real distinction

A Business Rule reacts directly to a database operation on a table: insert, update, delete, or
query, on that table, period. The platform fires it for you, automatically, the moment the
operation happens.

A Script Action is different in a way that matters for how systems stay maintainable: it reacts
to an **event**, and an event only exists because someone's code explicitly chose to raise it with
`gs.eventQueue()`. Nothing forces that call to happen — a developer decided a moment was
significant enough to name and announce it.

```
Business Rule:                      Script Action:
  table operation happens              someone's code calls gs.eventQueue('my.event', current)
  platform fires the rule              ServiceNow fires any Script Action listening for 'my.event'
  tightly coupled to the table         loosely coupled — the trigger and the reaction
                                        don't know about each other's code
```

That loose coupling is the real benefit. The code that raises `vehicle.returned` doesn't need to
know what — if anything — listens for it. You can add, remove, or change a Script Action without
touching the Business Rule that fires the event, and vice versa. Multiple listeners (a
Notification *and* a Script Action) can react to the exact same event independently.

## A real Script Action

Say a Business Rule on the `x_acme_fleet_checkout` table fires `gs.eventQueue('vehicle.returned',
current)` whenever a checkout record's status changes to "Returned". A Script Action listening
for that same event name might look like this:

```javascript
// Script Action: Update Vehicle on Return
// Fires on event: vehicle.returned

var checkout = event.parm1 ? event.parm1 : current; // the GlideRecord passed to eventQueue

var vehicleId = checkout.vehicle;

var veh = new GlideRecord('x_acme_fleet_vehicle');
if (veh.get(vehicleId)) {
    veh.status = 'available';
    veh.last_returned = new GlideDateTime();
    veh.update();
}

gs.info('Script Action: marked vehicle ' + vehicleId + ' as available');
```

Inside a Script Action's script, the fired event is available as the `event` variable
(`event.parm1`, `event.parm2` hold whatever extra arguments `gs.eventQueue()` passed), and
`current` carries the record tied to the event when the trigger passed one.

## Scheduled Scripts: time-driven, not event-driven

A **Scheduled Script** is a type of Scheduled Job — you first saw Scheduled Jobs back in this
course's third course, for Notifications. A Scheduled Script runs arbitrary background script code
on a schedule (nightly, weekly, every N minutes) with no event and no user action triggering it at
all — it's purely time-driven.

A real use case: archiving old closed records every night so the active table stays small and fast
to query.

```javascript
// Scheduled Script: Archive Old Closed Incidents
// Runs: Daily at 2:00 AM

var cutoff = new GlideDateTime();
cutoff.addDaysUTC(-90); // records closed more than 90 days ago

var gr = new GlideRecord('incident');
gr.addQuery('state', 7); // Closed
gr.addQuery('closed_at', '<', cutoff);
gr.query();

var archivedCount = 0;
while (gr.next()) {
    // In a real build this would insert into an archive table first;
    // shown here as a simple flag update for clarity.
    gr.u_archived = true;
    gr.update();
    archivedCount++;
}

gs.info('Archive job: flagged ' + archivedCount + ' incidents closed over 90 days ago');
```

Nothing here reacts to anything a user did today — it just runs, on its own clock, every night.

## Key terms

| Term | Meaning |
|---|---|
| Script Action (`sysevent_script_action`) | A server-side script that runs when a specific named event fires |
| `gs.eventQueue(name, current, p1, p2)` | Raises a named event, carrying an optional record and up to two extra parameters |
| Loose coupling | The event's trigger and its listener(s) don't need to know about each other's code |
| Scheduled Script | A Scheduled Job that runs background script code on a time-based schedule, with no trigger |
| `event` variable | Inside a Script Action, holds the fired event — `event.parm1`, `event.parm2` |

## Check yourself

Without looking back: a Business Rule and a Script Action can both run server-side code in
reaction to "something happening" on a table — so what's the actual mechanism that makes a Script
Action more loosely coupled than a Business Rule?
