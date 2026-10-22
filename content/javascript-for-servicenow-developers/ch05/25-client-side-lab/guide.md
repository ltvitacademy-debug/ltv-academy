# Lesson 25 — Client-Side Lab

**Chapter 5 · Client-Side JavaScript on the Platform · Lesson 25 of 32**

## What you'll learn

- How to wire a GlideAjax freeze-window check into a real `onChange` script
- How to wire the same check into a correct, async-safe `onSubmit` script
- How to use a hidden backing field to carry the "already validated" flag across the two `onSubmit` attempts
- How every concept from Lessons 22–24 (`g_form`, the three script types, and the async-safe pattern) fits together in one working scenario

## The scenario

You're building change management controls on the Change Request table. The
business rule: a change should never be *plannable* inside an active change
freeze window (a blackout period around quarter-end, a major release, or a
holiday). You already have a Script Include that can answer "is this date
inside an active freeze window?" — your job in this lab is to wire it into two
Client Scripts on the `planned_start_date` field: an `onChange` that warns the
user immediately, and an `onSubmit` that actually blocks a bad save, using the
async-safe pattern from Lesson 24.

## Step 1 — the Script Include you're calling

This is the server-side piece the lab calls into. It takes a date string,
checks it against the `change_freeze_window` table, and answers with the
string `'true'` or `'false'` — exactly the shape `getXMLAnswer()` expects.

```javascript
var ChangeFreezeWindowUtils = Class.create();
ChangeFreezeWindowUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    isDateInFreezeWindow: function() {
        var dateStr = this.getParameter('sysparm_date');
        if (!dateStr) {
            return 'false';
        }

        var checkDate = new GlideDateTime(dateStr);
        var gr = new GlideRecord('change_freeze_window');
        gr.addQuery('active', true);
        gr.addQuery('start_date', '<=', checkDate);
        gr.addQuery('end_date', '>=', checkDate);
        gr.query();

        return gr.hasNext() ? 'true' : 'false';
    },

    type: 'ChangeFreezeWindowUtils'
});
```

Nothing here is new — this is the same `AbstractAjaxProcessor` pattern from
Chapter 4, with one method, `isDateInFreezeWindow`, that only ever returns the
string `'true'` or `'false'`.

## Step 2 — onChange: warn the user immediately

This runs on `planned_start_date` and gives the user fast feedback the moment
they pick a date — before they've even tried to save:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    var ga = new GlideAjax('ChangeFreezeWindowUtils');
    ga.addParam('sysparm_name', 'isDateInFreezeWindow');
    ga.addParam('sysparm_date', newValue);

    ga.getXMLAnswer(function(answer) {
        if (answer === 'true') {
            g_form.addErrorMessage('Heads up: this date falls inside an active change freeze window.');
        } else {
            g_form.clearMessages();
        }
    });
}
```

This script is purely advisory. It can't `return false` to block anything —
by the time its own `getXMLAnswer` callback runs, the `onChange` function
itself has already finished. That's fine here: its job is just to warn early,
not to enforce. Enforcement is `onSubmit`'s job.

## Step 3 — a hidden field to carry the result

`onSubmit` will need to run *twice*: once to kick off the async check, and
once more — via `g_form.submit()` — after the check passes. Those are two
separate invocations of the same function, so a plain local variable won't
survive between them. The lab uses a hidden backing field on the form,
`u_freeze_check_passed`, as the thing that *does* survive: set it in the
callback, and read it back at the top of the next `onSubmit` call.

## Step 4 — onSubmit: the real enforcement, done async-safe

```javascript
function onSubmit() {
    if (g_form.getValue('u_freeze_check_passed') === 'true') {
        return true; // already validated by the callback below - let it save
    }

    g_form.addInfoMessage('Checking the change freeze window before saving...');

    var ga = new GlideAjax('ChangeFreezeWindowUtils');
    ga.addParam('sysparm_name', 'isDateInFreezeWindow');
    ga.addParam('sysparm_date', g_form.getValue('planned_start_date'));

    ga.getXMLAnswer(function(answer) {
        if (answer === 'true') {
            g_form.addErrorMessage('Cannot save: planned start date falls inside an active change freeze window. Choose another date.');
        } else {
            g_form.setValue('u_freeze_check_passed', 'true');
            g_form.submit();
        }
    });

    return false; // always block THIS attempt - the real decision is async
}
```

## Step 5 — tracing the full sequence

1. User sets `planned_start_date` → `onChange` fires, warns immediately if the
   date is already bad.
2. User clicks Save → `onSubmit` fires. `u_freeze_check_passed` isn't `'true'`
   yet, so it fires the GlideAjax call and `return false`s — this save
   attempt is blocked, but the check is now running.
3. The server responds. If the date is frozen, an error message appears and
   the form simply stays open, waiting for the user to pick another date.
4. If the date is clear, the callback sets `u_freeze_check_passed` to
   `'true'` and calls `g_form.submit()` — which re-runs `onSubmit` from the
   top. This time the guard at the top sees the flag and returns `true`
   immediately, and the record actually saves.

Every piece here is something you already know: `g_form` methods from Lesson
22, the three script types and `onSubmit`'s special return-value behavior
from Lesson 23, and the block-first, submit-in-the-callback pattern from
Lesson 24 — just combined into one working feature.

## Key terms

| Term | Meaning |
|---|---|
| Hidden backing field | A field used to carry state (like a passed/failed flag) between two separate script invocations |
| Advisory validation | `onChange` feedback that warns but can't itself block a save |
| Enforcement | `onSubmit` logic whose `false` return actually prevents the record from saving |
| `g_form.submit()` | Programmatically re-triggers the submit, re-running every `onSubmit` script including this one |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does
this lab need a hidden field at all — what would go wrong if `onSubmit` tried
to track "already passed" with just a local JavaScript variable declared
inside the function?
