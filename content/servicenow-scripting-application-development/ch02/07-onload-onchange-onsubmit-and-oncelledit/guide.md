# Lesson 7 — onLoad, onChange, onSubmit & onCellEdit

**Chapter 2 · Client Scripts · Lesson 7 of 37**

## What you'll learn

- The real function signatures for `onLoad`, `onChange`, and `onSubmit` — and the developer-level
  nuances JavaScript for ServiceNow Developers only touched on
- Why forgetting an explicit `return false` in `onSubmit` is a bug that silently does nothing
- `onCellEdit` — the fourth client script type, and why it fires in a **list**, not a form
- The real `onCellEdit` signature and the asynchronous `callback` it must invoke
- Why there is no `g_form` inside `onCellEdit`, and what you use instead

## Three types you already know — now at developer depth

Course 5 introduced `onLoad`, `onChange`, and `onSubmit` as form-level event hooks. At developer
depth, each has a sharp edge worth knowing cold.

`onChange` receives five parameters, not zero: `onChange(control, oldValue, newValue, isLoading,
isTemplate)`. `control` is a legacy DOM reference — don't use it to read or set values; that's
`g_form`'s job. `oldValue` and `newValue` arrive as **strings**, even for a reference or numeric
field, so `newValue == 1` and `newValue == '1'` behave identically but `newValue === 1` does not
match. Always guard the top of the function:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || isTemplate) {
        return;
    }
    // real work starts here — this line never runs during form load
}
```

Skipping that guard is the single most common onChange bug: the script fires once when the form
loads (because the field already had a value) before the user ever touched anything.

`onSubmit` takes no parameters, and the platform only blocks the save when the function returns
the literal value `false`. Any other return value — including nothing at all — lets the submit
continue, even if your script just displayed an error message.

```javascript
function onSubmit() {
    if (g_form.getValue('close_notes') == '') {
        g_form.addErrorMessage('Close notes are required before closing this incident.');
        return false;   // omit this line and the record saves anyway
    }
}
```

## The fourth type: onCellEdit — a list, not a form

`onLoad`, `onChange`, and `onSubmit` all run on a **form**. `onCellEdit` runs on a **list view**,
triggered when a user inline-edits a cell directly in the list (double-clicking a Priority cell
on the Incident list, for example) — no form ever opens. Its real signature is:

```javascript
function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
    // sysIDs may represent more than one record — list inline edits can
    // apply to a whole selected block of rows, not just the row you clicked
    callback(true);   // allow the edit
    // callback(false) blocks it and reverts the cell
}
```

`sysIDs` and `oldValues` describe every record the edit touches, because ServiceNow's list view
lets a user select several rows and change a shared cell value in one action — your script has to
account for more than a single record. `callback` is what makes `onCellEdit` different from the
other three types: the platform doesn't look at a return value here. The edit stays pending until
your script calls `callback(true)` or `callback(false)`, which means you can run an asynchronous
check — a GlideAjax call to a Script Include — before deciding, as long as you call `callback`
inside that response handler.

One more developer-level gotcha: there is no `g_form` inside `onCellEdit`, because there is no
form. Messages go through `g_list` instead (`g_list.addErrorMessage(...)`), while globally
available objects like `g_user` still work exactly as they do on a form.

## Key terms

| Term | Meaning |
|---|---|
| `onCellEdit` | Client script type that fires on an inline cell edit in a list view, not a form |
| `callback` | The function `onCellEdit` must invoke with `true`/`false` to allow or block the edit |
| `g_list` | The list-view equivalent of `g_form`, used for messages inside `onCellEdit` |
| `sys_script_client` | The database table every client script — including `onCellEdit` ones — is stored on |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does `onSubmit` need an
explicit `return false` instead of just displaying an error, and why can't `onCellEdit` rely on a
return value the same way?
