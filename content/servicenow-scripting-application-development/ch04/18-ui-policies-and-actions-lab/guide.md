# Lesson 18 — UI Policies & Actions Lab

**Chapter 4 · UI Policies, UI Actions & UI Pages · Lesson 18 of 37**

## What you'll learn

- How to combine a server-side UI Action with a scripted UI Policy on one real table
- Writing a UI Action's Condition field correctly, gating on both role and state
- Querying and closing related `GlideRecord` rows from inside a UI Action script
- Writing a `onCondition_true` function that reacts to how many related records exist
- Why the two pieces stay cleanly separated by the client/server boundary this chapter covered

## The scenario

A Problem record tracks related Incident tasks through the `task_sla` — no, more precisely, through `problem_id` on the Incident table (every Incident caused by a given Problem stores that Problem's sys_id in its own `problem_id` field). Build two things, on the Problem table:

1. A UI Action button, **"Close All Related Tasks,"** visible only to users with the `itil` role and only when the Problem's state is Resolved, that queries every open Incident linked to this Problem and closes each one.
2. A UI Policy whose condition checks a count of those related Incidents, and whose Run-scripts pair shows a warning field message only when more than 3 related tasks exist — flagging to the person resolving the Problem that closing it will cascade to an unusually large number of tickets.

## Part 1: the UI Action

This is a server-side UI Action — closing database records is exactly the kind of work that belongs server-side, against `current`, not in the browser. Its **Condition** field:

```javascript
// Condition field — must return true for the button to even show
current.state == 6 && gs.hasRole('itil')
```

`6` is Resolved on the Problem table's state choice list. Combined with `gs.hasRole('itil')`, the button only appears for users who can act on it, on a record that's actually ready for the action — exactly the pattern Lesson 16 introduced.

With **Client unchecked**, its **Script** field runs server-side:

```javascript
// Script field — Client checkbox unchecked
var closedCount = 0;
var inc = new GlideRecord('incident');
inc.addQuery('problem_id', current.sys_id);
inc.addQuery('active', true);
inc.query();

while (inc.next()) {
    inc.state = 7; // Closed
    inc.close_notes = 'Closed automatically: parent Problem ' +
        current.number + ' was resolved.';
    inc.update();
    closedCount++;
}

gs.addInfoMessage(closedCount + ' related incident(s) closed.');
action.setRedirectURL(current);
```

The query filters on exactly two conditions — `problem_id` matching this Problem's `sys_id`, and `active` true — so it only touches Incidents genuinely still open and genuinely linked to this record. `gs.addInfoMessage()` surfaces a confirmation after the redirect, and `action.setRedirectURL(current)` sends the user back to the (now updated) Problem record once every related Incident has been closed.

## Part 2: the scripted UI Policy

The UI Policy's **Condition** builder checks a simple field condition — say, a hidden integer field `u_related_task_count` kept current by a Business Rule, or computed at form-load via a Display Business Rule (either is a legitimate real-world choice; the condition itself is just "Problem's state is Resolved," matching the same moment the button becomes relevant). With **Run scripts** checked:

```javascript
function onCondition_true(control, g_form) {
    var gr = new GlideRecord('incident');
    gr.addQuery('problem_id', g_form.getUniqueValue());
    gr.addQuery('active', true);
    gr.query();

    if (gr.getRowCount() > 3) {
        g_form.showFieldMsg('state',
            'Closing this Problem will close ' + gr.getRowCount() +
            ' related incidents. Review before proceeding.', 'warning');
    }
}

function onCondition_false(control, g_form) {
    g_form.hideFieldMsg('state', true);
}
```

`g_form.getUniqueValue()` returns the current record's `sys_id`, giving the client-side script a way to run its own `GlideRecord` count — yes, `GlideRecord` is callable from client-side scripts specifically because the platform transparently proxies it to the server and waits for the result, which is also exactly why it should be used sparingly here and never in a tight loop. The warning only appears once the related-task count crosses the threshold, and `onCondition_false` cleans it up the moment the condition (the Problem leaving Resolved state) is no longer true.

## Why the two pieces don't collapse into one

It would be tempting to put the "more than 3 related tasks" warning logic inside the UI Action script instead. That would be the wrong tool: the UI Action only fires *after* a click, server-side, as a one-time action — it can't give the user an early warning *before* they decide whether to click "Close All Related Tasks" in the first place. The UI Policy's job is exactly that earlier moment, live on the form, the instant the Problem reaches Resolved state — which is precisely the client-side, continuously-evaluated behavior Lesson 15 covered, paired here with the server-side, one-time, record-mutating behavior Lesson 16 covered. Each does the job it's actually suited for.

## Key terms

| Term | Meaning |
|---|---|
| `problem_id` | Field on Incident linking it back to the Problem that caused it |
| Condition (UI Action) | Server-side script gating whether the button shows — here, state + role |
| `action.setRedirectURL()` | Navigates the user back to the record after a server-side script finishes |
| `g_form.getUniqueValue()` | Returns the current record's sys_id for use in a client-side script |

## Check yourself

Walk through both pieces from memory: why must the related-incident count check inside `onCondition_true` run as its own `GlideRecord` query rather than simply reading a value already on the form, and why does closing the incidents themselves still belong in the UI Action, not the UI Policy?
