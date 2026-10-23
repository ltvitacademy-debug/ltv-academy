# Lesson 10 — Client Scripts Lab

**Chapter 2 · Client Scripts · Lesson 10 of 37**

## What you'll learn

- How to build a real `onCellEdit` script that blocks an inline list edit unless the user holds
  a specific role
- How to build the matching form-level `onChange` guard, isolated, so the same rule holds true
  no matter how a user reaches the field
- How to read and write the `callback(true)` / `callback(false)` pattern correctly
- Why the same business rule needs two separate client scripts, not one, to actually be enforced
- How to reason through a worked scenario end to end, the way a real CAD-track developer would

## The scenario

Incident Priority has five values: 1 – Critical, 2 – High, 3 – Moderate, 4 – Low, 5 – Planning.
The business wants only users holding the `incident_manager` role to be able to set Priority to
Critical — not because the field itself is locked down with security rules, but because this is
a workflow decision the team wants enforced consistently, with a clear message when it's blocked.
There are two places a user can change Priority: inline, editing the cell directly in the
Incident list, and on the Incident form itself. Both need the same rule, which means two client
scripts, one of each type.

## Step 1 — the list-view guard: onCellEdit

On the Incident list, inline-editing the Priority cell doesn't open a form — it fires
`onCellEdit`. This script needs to inspect the proposed `newValue`, check the editing user's role
with the globally available `g_user` object, and resolve the pending edit through `callback`.

```javascript
function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
    var settingCritical = (newValue == '1');   // 1 = Critical

    if (settingCritical && !g_user.hasRole('incident_manager')) {
        g_list.addErrorMessage('Only an Incident Manager can set Priority to Critical.');
        callback(false);   // blocks the edit, cell reverts to its old value
        return;
    }

    callback(true);   // anything else is allowed through
}
```

Two details matter here. First, `newValue` is a string, so the comparison is `== '1'`, not a
numeric comparison. Second, there is no `g_form` in this context — the message goes through
`g_list`, because this edit never opened a form. `g_user`, by contrast, is available everywhere,
form or list, which is exactly why it's the right tool for a role check regardless of context.

## Step 2 — the form-level twin: onChange, isolated

The same rule has to hold on the Incident form itself, or a user could simply open the record
and change Priority there instead of through the list. This is a separate client script — type
`onChange`, field `priority`, table `incident` — and it should run **isolated**, per Lesson 9's
standing rule, since there's no documented need here for global scope access.

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || isTemplate) {
        return;
    }

    var settingCritical = (newValue == '1');   // 1 = Critical

    if (settingCritical && !g_user.hasRole('incident_manager')) {
        g_form.addErrorMessage('Only an Incident Manager can set Priority to Critical.');
        g_form.setValue('priority', oldValue);   // revert the field on the form
        return;
    }
}
```

Notice the shape is nearly identical to the `onCellEdit` version — same role check, same
condition — but the mechanics differ because the context differs: `g_form` instead of `g_list`
for the message, and an explicit `g_form.setValue(...)` back to `oldValue` to revert the field,
since there's no `callback(false)` to lean on here the way there is in `onCellEdit`.

## Step 3 — why both scripts, not one

A client script attached to the list doesn't run on the form, and a client script attached to
the form doesn't run on the list — they're two different records on `sys_script_client`, each
scoped to its own context. Writing only the form version leaves the list wide open to the exact
behavior you were trying to block; writing only the list version leaves the form open. Enforcing
one business rule across two UI surfaces took two scripts, deliberately kept in sync with each
other, because ServiceNow doesn't generalize a client script across contexts automatically.

## Key terms

| Term | Meaning |
|---|---|
| `g_user.hasRole()` | The globally available API for checking whether the current user holds a given role |
| `callback(false)` | How `onCellEdit` blocks and reverts a pending inline edit |
| `g_form.setValue(field, oldValue)` | How an `onChange` script reverts a field on a form, with no callback available |
| `g_list` | The list-context equivalent of `g_form`, used for messages inside `onCellEdit` |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why does blocking an edit on
the Incident list require a `callback(false)`, while blocking the same edit on the Incident form
requires an explicit `g_form.setValue()` back to the old value instead?
