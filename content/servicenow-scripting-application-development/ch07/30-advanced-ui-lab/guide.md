# Lesson 30 — Advanced UI Lab

**Chapter 7 · GlideDialogWindow, GlideModal & Advanced UI · Lesson 30 of 37**

## What you'll learn

- How to combine a GlideModal confirmation with a shared UI Script in one real build
- How to write a UI Action that warns the user before a bulk, irreversible action
- How to extract a date-formatting function into a UI Script and call it from two different places
- How a Client Script and a UI Action's client script can both include the same UI Script
- How to trace data from a UI Action click through a confirmation to the server-side update

## The scenario

Chapter 4's lab built a Change Request form with related Catalog Tasks. Today's scenario: a
change coordinator needs a **"Close All Tasks"** UI Action on the Change Request form. Clicking
it should bulk-close every related, still-open task — but because that's irreversible, it must
show a GlideModal confirmation first, naming how many tasks will close and when the change was
created. That "when the change was created" detail needs to be shown in both this confirmation
*and* a separate Client Script elsewhere on the form, so the date-formatting logic belongs in a
shared UI Script, not copy-pasted into both places.

## Step 1 — the shared UI Script

Extract the date formatter into a UI Script named `DateFormatHelpers`, non-Global so it only loads
where explicitly included:

```javascript
// UI Script: DateFormatHelpers
function formatShortDate(dateString) {
    if (!dateString) {
        return 'unknown date';
    }
    var d = new Date(dateString);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}
```

## Step 2 — the UI Action's client script

The "Close All Tasks" UI Action is client-callable, `onclick="closeAllTasksClicked()"`. Its client
script includes `DateFormatHelpers`, builds the confirmation message with `formatShortDate()`, and
opens a GlideModal — only calling the server-side function if the user confirms:

```javascript
// UI Action client script (Change Request form)
function closeAllTasksClicked() {
    var created = g_form.getValue('sys_created_on');
    var taskCount = g_form.getValue('open_task_count'); // set by an onLoad calc
    var message = 'This closes ' + taskCount + ' open task(s) on a change ' +
                  'created ' + formatShortDate(created) + '. This cannot be undone.';

    var gm = new GlideModal('glide_modal_confirm');
    gm.setTitle('Close All Related Tasks?');
    gm.setPreference('sysparm_message', message);
    gm.setPreference('onPromptComplete', function(confirmed) {
        if (confirmed) {
            gsftSubmit(null, g_form.getFormElement(), 'close_all_tasks');
        }
    });
    gm.render();
}
```

`gsftSubmit` is the real pattern for a client script to trigger the UI Action's server-side script
only after a confirmation — it re-submits the form with an action name the server script checks
for, rather than running the server logic immediately on click.

## Step 3 — the server-side script

The UI Action's server-side script runs only after that confirmed submit, closing each related
open task:

```javascript
// UI Action server script
if (typeof window == 'undefined') {
    var gr = new GlideRecord('task');
    gr.addQuery('parent', current.sys_id);
    gr.addQuery('active', true);
    gr.query();
    while (gr.next()) {
        gr.state = 3; // Closed Complete
        gr.update();
    }
    gs.addInfoMessage('All related tasks closed.');
    current.update();
}
```

## Step 4 — the separate Client Script that reuses the same helper

Elsewhere on the same form, an existing Client Script needs that identical "created on" display —
it includes the same `DateFormatHelpers` UI Script instead of duplicating the function:

```javascript
// A separate onLoad Client Script, same form
function onLoad() {
    var created = g_form.getValue('sys_created_on');
    g_form.addInfoMessage('Change created ' + formatShortDate(created) + '.');
}
```

Both callers — the UI Action's confirmation and this Client Script — share one `formatShortDate()`
definition. If the date format ever needs to change, it changes once, in the UI Script, and both
callers pick it up automatically.

## Why this is the right shape

GlideModal was the right call here because the confirmation is a message, a count, and a date —
not a custom form needing its own UI Page. The UI Script was the right call because the same
formatting logic was needed in two unrelated scripts on the same form. This lab is really Chapter
7 in miniature: pick the lightest API that does the job (GlideModal over GlideDialogWindow), and
the moment logic repeats, extract it (UI Script over copy-paste).

## Key terms

| Term | Meaning |
|---|---|
| `gsftSubmit()` | Client-side call that re-submits the form so a UI Action's server script runs after confirmation |
| `onPromptComplete` | GlideModal preference callback that fires with the user's confirm/cancel choice |
| Client-callable UI Action | A UI Action whose `onclick` runs client script first, before any server-side update |
| Shared UI Script | One `sys_ui_script` function reused by multiple unrelated callers on the same form |

## Check yourself

Walk through this lab from memory: where does `formatShortDate()` live, which two scripts call it,
and at what exact point does the server-side task-closing script actually run?
