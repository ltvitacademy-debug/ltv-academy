# Lesson 16 — Notification Records & Triggers

**Chapter 4 · Notifications & Email · Lesson 16 of 36**

## What you'll learn

- Where every email notification actually lives: the `sysevent_email_action` table
- The two real ways a notification can fire — a record condition, or a named event
- How "Who will receive it" is configured, and why it's separate from what triggers the send
- How additional filter conditions narrow a notification beyond its basic trigger
- Why getting the trigger wrong is the single most common cause of "nobody got the email"

## The table behind every notification you'll ever configure

Every notification an administrator builds in ServiceNow — "Incident assigned to you," "Change approved," "Catalog request completed" — is a row on the `sysevent_email_action` table. Opening System Notification > Email > Notifications in the navigator takes you straight to a list view of that table. A notification record bundles together three things: what has to happen for it to fire, who should receive it, and what the email should say. This lesson covers the first two — the trigger and the recipients. The message content itself is a separate object, an Email Template, which Lesson 17 covers in depth so the same wording can be reused across multiple notifications.

## Trigger type one: a record condition

The most common trigger is tied directly to a table: "when a record is inserted," "when a record is updated," or — most often — "when a specific field changes to a specific value." A real example: a notification on the Incident table set to fire when the **State** field changes to **Resolved**. The notification record's "When to send" section lets you check Inserted, Updated, or both, and then add field-level conditions scoped to exactly the change you care about. This is deliberately narrow — you don't want a notification firing on every field edit to an incident, only the one transition that actually matters to the people receiving it (in this case, the caller, who wants to know their issue is fixed).

## Trigger type two: a named event

The second mechanism is event-driven. A script elsewhere in the instance — a Business Rule, a Workflow, a Flow Designer action — can call `gs.eventQueue()` to fire a named event (something like `incident.sla_breach`) into the `sysevent` table. A notification can be configured to fire on that event name instead of a record condition. This decouples "when something interesting happened" from "what counts as a database-level insert or update," which matters for situations too complex for a simple field-condition to express — for example, an SLA breach that depends on a time calculation, not a field value changing. Deep event-scripting with `gs.eventQueue()` is covered properly in Course 6 of this path (the scripting course); for now, just recognize that when you see a notification's trigger set to "Event name" instead of a table condition, somewhere else in the instance a script is deciding when to fire it.

## Who will receive it

The recipients section is configured independently of the trigger. A notification can send to:

- A **field on the record itself** — Caller, Assigned to, Opened by — so the recipient is dynamic, computed per-record rather than hardcoded.
- A **specific group**, where every active member with a notification-eligible email address on their user record receives a copy.
- A **specific user**, for a fixed recipient regardless of which record fired the notification.
- An **Email** field directly, for cases like a watch-list or a CC-style address stored on the record itself.

Getting this wrong in a specific way is common: picking "Assigned to" on a notification that's meant to alert the caller means the caller never hears anything, while the assignee gets emails about their own work being updated — a frustrating, confusing mismatch that's easy to miss in testing if you only ever test as the admin.

## Narrowing further with additional conditions

Beyond the basic trigger, a notification's Advanced tab (or the Conditions section depending on version) supports additional filter conditions — the same condition-builder used in list filters. This lets you scope a notification past "State changes to Resolved" down to "State changes to Resolved, AND Priority is 1 - Critical, AND Category is Hardware" — so a single notification record doesn't have to cover every resolution, only the subset that genuinely warrants this particular email to this particular audience. Stacking several narrow notifications, each with its own clear trigger and recipient, is almost always better administration than one broad notification with conditions nobody can reason about six months later.

## Key terms

| Term | Meaning |
|---|---|
| `sysevent_email_action` | The table storing every notification record in the instance |
| Record condition trigger | Fires on insert/update of a table, optionally scoped to a specific field change |
| Event trigger | Fires when a named event is queued via `gs.eventQueue()`, usually from a script |
| `sysevent` | The table events land on before a notification listening for that event name fires |
| Who will receive it | The recipient configuration — a record field, group, user, or Email field — independent of the trigger |

## Check yourself

A notification is supposed to tell a caller their incident was resolved, but testing shows the assignee gets the email instead and the caller gets nothing. Which section of the notification record is misconfigured — the trigger, or the recipients — and why does the trigger being correct not matter if this section is wrong?
