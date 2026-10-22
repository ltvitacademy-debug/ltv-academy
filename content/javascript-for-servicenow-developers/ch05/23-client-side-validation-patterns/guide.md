# Lesson 23 — Client-Side Validation Patterns

**Chapter 5 · Client-Side JavaScript on the Platform · Lesson 23 of 32**

## What you'll learn

- The three real Client Script types: `onLoad`, `onChange`, and `onSubmit`
- The real parameters `onChange` receives, including `oldValue` and `newValue`
- Why returning `false` from an `onSubmit` script actually blocks the save
- A working `onChange` pattern that reacts to what the user just typed
- A working `onSubmit` validation pattern that stops a bad record from saving

## Three script types, three moments in a record's life

ServiceNow's Client Scripts fire at three distinct moments, and each one exists
for a different job:

- **onLoad** runs once, right after the form finishes loading. Good for setting
  initial field states based on values the record already has.
- **onChange** runs every time a specific field's value changes, while the user
  is still editing. Good for reacting immediately to what was just typed or
  selected.
- **onSubmit** runs when the user clicks Save or Update, before the record
  actually saves. Good for last-chance validation — and the only one of the
  three whose return value matters.

## onChange and its real parameters

An `onChange` script is bound to one specific field and receives real,
useful parameters — not just the new value:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    // oldValue: what the field held before this change
    // newValue: what the field holds now
    // isLoading: true while the form is still loading - skip real work then
    // isTemplate: true if a template is being applied
    if (isLoading || newValue === '') {
        return;
    }

    if (oldValue !== newValue && newValue === '1') {
        g_form.setMandatory('justification', true);
        g_form.addInfoMessage('Critical incidents require a justification.');
    } else if (newValue !== '1') {
        g_form.setMandatory('justification', false);
    }
}
```

The `isLoading` check at the top is not optional boilerplate — without it, your
`onChange` logic would also fire once while the form is first loading (since
the field's value technically "changes" from nothing to its stored value),
which usually isn't what you want.

## onSubmit: the one that can stop a save

`onSubmit` is different from the other two in one critical way: **returning
`false` from an `onSubmit` script blocks the save entirely.** The record stays
open, unsaved, exactly as the user left it. Returning `true` — or returning
nothing at all — lets the save proceed.

```javascript
function onSubmit() {
    var priority = g_form.getValue('priority');
    var justification = g_form.getValue('justification');

    if (priority === '1' && justification.trim() === '') {
        g_form.addErrorMessage('Justification is required for Critical priority incidents.');
        return false; // blocks the save - the record is NOT saved
    }

    return true; // nothing wrong - let the save proceed
}
```

If a form has multiple `onSubmit` scripts, **every one of them runs**, and a
single `false` from any of them blocks the save — ServiceNow doesn't stop
checking the rest just because one passed.

## Stacking onChange and onSubmit together

The strongest validation usually combines both: `onChange` gives the user
immediate feedback as they type, and `onSubmit` is the final, unskippable
backstop — because a user can always ignore an `onChange` warning and try to
save anyway.

```javascript
// onChange - friendly, immediate warning
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    if (newValue === '1' && g_form.getValue('justification') === '') {
        g_form.addInfoMessage('Don’t forget: Critical incidents need a justification before you can save.');
    }
}

// onSubmit - the actual enforcement
function onSubmit() {
    if (g_form.getValue('priority') === '1' && g_form.getValue('justification').trim() === '') {
        g_form.addErrorMessage('Justification is required for Critical priority incidents.');
        return false;
    }
    return true;
}
```

## Key terms

| Term | Meaning |
|---|---|
| `onLoad` | Runs once when the form finishes loading |
| `onChange` | Runs when a specific field's value changes; receives `oldValue`/`newValue` |
| `onSubmit` | Runs when the user tries to save; returning `false` blocks the save |
| `isLoading` | A flag passed to `onChange`, true while the form is still loading |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: if a form has
two `onSubmit` scripts and only one of them returns `false`, does the record
save or not — and why does the `isLoading` check matter inside `onChange` but
have no equivalent need inside `onSubmit`?
