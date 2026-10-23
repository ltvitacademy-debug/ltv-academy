# Lesson 4 — The current & previous Objects

**Chapter 1 · Business Rules · Lesson 4 of 37**

## What you'll learn

- What `current` really is: a live GlideRecord for the record being processed
- How to read and write fields on `current` with ordinary dot notation
- What `previous` is, when it's available, and why it requires "Advanced" mode
- The real `current.field != previous.field` pattern for detecting what actually changed
- Why `previous` only makes sense on update, never on insert

## `current` is just a GlideRecord

Every Business Rule script receives `current` as its first parameter. It is a real
`GlideRecord` object, pointed at the exact record being inserted, updated, deleted, or queried.
Everything you already know about reading and writing GlideRecord fields with dot notation
applies directly — there is no special syntax to learn here.

```javascript
// Before update, on Incident
(function executeRule(current, previous) {

    gs.info('Processing incident: ' + current.number);

    if (current.state == 6) { // Resolved
        current.resolved_at = gs.nowDateTime();
    }

})(current, previous);
```

Inside a Before rule, changes you make to `current` are folded into the save automatically. In an
After rule, `current` already reflects what was just written — reading it tells you the final,
saved state.

## `previous` is the record's state before this update

`previous` is also a GlideRecord, but it represents the record exactly as it was *before* the
current operation — the pre-update snapshot. It is only populated on **update** operations, and
only when the Business Rule's checkbox for "Advanced" is enabled on the rule form. On an insert,
there is no "before" state to compare to, so `previous` isn't meaningful there at all.

```javascript
// Before update, Advanced mode enabled, on Incident
(function executeRule(current, previous) {

    if (current.priority != previous.priority) {
        gs.info('Priority changed from ' + previous.priority +
            ' to ' + current.priority + ' on INC ' + current.number);
    }

})(current, previous);
```

## The real change-detection pattern

The single most common, well-documented use of `previous` is exactly this comparison:
`current.field != previous.field`. It tells you not just that a save happened, but specifically
*what* changed — which is information `current` alone can never give you, because `current` only
ever shows you the new value.

```javascript
// After update, Advanced mode enabled, on Incident
(function executeRule(current, previous) {

    // Detect an actual escalation, not just any save
    if (current.priority == 1 && previous.priority != 1) {

        var manager = new GlideRecord('sys_user');
        if (manager.get(current.assigned_to.manager)) {
            gs.eventQueue('incident.priority.escalated', current,
                manager.sys_id, current.number);
        }
    }

})(current, previous);
```

Without the `previous.priority != 1` check, this logic would fire on *every single save* of an
already-Priority-1 incident, not just the moment it escalated — a mistake worth remembering for
Lesson 5.

## Key terms

| Term | Meaning |
|---|---|
| `current` | A live GlideRecord for the record this Business Rule is processing right now |
| `previous` | A GlideRecord snapshot of the record's state before the current update, available only on update with Advanced enabled |
| Advanced (checkbox) | The Business Rule form setting that must be enabled to access `previous` |
| Change detection | Comparing `current.field != previous.field` to find exactly what a save changed |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why is `previous` never useful
inside a Business Rule configured to run on insert?
