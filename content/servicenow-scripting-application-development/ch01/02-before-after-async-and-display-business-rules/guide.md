# Lesson 2 — Before, After, Async & Display Business Rules

**Chapter 1 · Business Rules · Lesson 2 of 37**

## What you'll learn

- What the "When" field on a Business Rule actually controls
- Why a Before rule can abort the save, and an After rule cannot
- When Async exists for, and why it doesn't block the user's save
- What Display rules are really for, and the `g_scratchpad` pattern that makes them useful
- How to pick the right timing for a given piece of logic

## The "When" field: four real timing types

Every Business Rule has a "When" field with four options: **before**, **after**, **async**, and
**display**. This is not a cosmetic setting — it changes exactly when your script runs relative
to the database write, and in some cases, whether the write happens at all.

## Before: runs inside the same transaction, before the write

A Before Business Rule runs *before* the record is actually written to the database, in the same
transaction as the save. Because the write hasn't happened yet, a Before rule can still change
`current`'s fields, and those changes are included in the save automatically — you never have to
call `current.update()` yourself inside a Before rule.

```javascript
// Before update, on Incident
(function executeRule(current, previous) {

    // Auto-escalate urgency for Priority 1 — included in THIS save
    if (current.priority == 1) {
        current.urgency = 1;
    }

    // A Before rule can also stop the save entirely
    if (current.short_description.nil()) {
        current.setAbortAction(true);
    }

})(current, previous);
```

`current.setAbortAction(true)` is a Before-rule-only power: it cancels the database operation
before it ever happens. No After or Async rule can do this — by the time they run, the write has
already succeeded.

## After: runs once the write is safely committed

An After Business Rule runs *after* the database write completes successfully. This timing
exists for one practical reason: it's the safe place to touch *other* records, because the
triggering record is already durably saved. If an After rule's own logic throws an error, the
original save still stands.

```javascript
// After update, on Incident
(function executeRule(current, previous) {

    // current.priority is already saved — safe to act on related data now
    var task = new GlideRecord('change_request');
    task.addQuery('caused_by', current.sys_id);
    task.query();
    while (task.next()) {
        task.work_notes = 'Related incident was updated.';
        task.update();
    }

})(current, previous);
```

## Async: runs after the write, but off to the side

An Async Business Rule also runs after the write, but it's queued and runs in the background,
non-blocking. The user who clicked Save doesn't wait for it. This timing exists for operations
that are too slow to make a user sit through — sending a notification, calling an external
integration, or doing heavy calculation that doesn't need to finish before the form returns
control to the user.

```javascript
// Async, on Incident — notice: no `previous` guaranteed available
(function executeRule(current) {

    // A slower operation that shouldn't delay the user's save
    var notify = new GlideRecord('sys_email');
    // ... build and insert a notification record here
    gs.info('Async notification queued for INC ' + current.number);

})(current);
```

## Display: the only one that runs when the form loads, not when it saves

Display Business Rules are the odd one out: they don't run on save at all — they run when the
*form loads*, on the server, before the page renders in the browser. Their real purpose is
getting server-computed data to the client without a round trip. The standard pattern is writing
to `g_scratchpad`, a plain JavaScript object the Display rule populates server-side, which client
scripts can then read.

```javascript
// Display Business Rule, on Incident
(function executeRule(current, previous) {

    g_scratchpad.slaRemainingMinutes = current.sla_due ?
        gs.dateDiff(gs.nowDateTime(), current.sla_due, true) : null;

})(current, previous);
```

## Key terms

| Term | Meaning |
|---|---|
| Before | Runs before the database write, in the same transaction; can modify `current` or abort the save |
| After | Runs after the write commits; the safe place to update other, related records |
| Async | Runs after the write, queued in the background, non-blocking for the user |
| Display | Runs when the form loads (not on save); passes server data to the client via `g_scratchpad` |
| `setAbortAction(true)` | A Before-rule-only call that cancels the pending database operation |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why would putting a slow
external API call in a Before rule be a mistake, and which timing should hold that call instead?
