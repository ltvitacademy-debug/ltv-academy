# Lesson 22 — The GlideForm API (g_form)

**Chapter 5 · Client-Side JavaScript on the Platform · Lesson 22 of 32**

## What you'll learn

- What `g_form` is, and exactly when it's available to your code
- Reading and writing field values with `getValue()` / `setValue()`
- Controlling a field's state with `setMandatory()`, `setVisible()`, and `setReadOnly()`
- Talking to the user with `addInfoMessage()` and `addErrorMessage()`
- Why `g_form` is the client-side counterpart to the `GlideRecord` you learned in Chapter 3 — not a replacement for it

## g_form is the form on screen right now

Every Client Script you write — `onLoad`, `onChange`, or `onSubmit` — runs in the
user's browser, and ServiceNow hands it a global object called `g_form`. `g_form`
represents the **form currently rendered on screen**: the specific record the
user has open, with whatever values are currently sitting in its fields, before
anything has been saved. You never construct it and never query for it — it
simply exists inside any Client Script, the same way `current` simply exists
inside a server-side Business Rule.

```javascript
// onLoad Client Script on the Incident form
function onLoad() {
    var priority = g_form.getValue('priority');
    g_form.addInfoMessage('This incident loaded with priority: ' + priority);
}
```

## Reading and writing values

`g_form.getValue('field_name')` returns the field's current value as a string
(even number and choice fields come back as strings on the client side).
`g_form.setValue('field_name', value)` writes a new value into a field and
updates what the user sees immediately, without a server round trip.

```javascript
function onLoad() {
    var category = g_form.getValue('category');

    if (category === 'network') {
        g_form.setValue('assignment_group', 'Network Operations');
    }
}
```

Notice there is no `.query()`, no `.next()`, no database hit at all here. That's
the core distinction from `GlideRecord`: `GlideRecord` reads and writes rows in
the database on the server. `g_form` reads and writes fields in the browser, on
the one record the user already has open. They solve different problems, and a
production client script almost never needs to touch the database directly —
that's exactly the gap GlideAjax (Chapter 4) exists to bridge when a client
script genuinely needs server data.

## Controlling how a field behaves

Three methods reshape a field's behavior on the fly, based on other values on
the form:

```javascript
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    var needsJustification = (newValue === '1'); // 1 = Critical

    g_form.setMandatory('justification', needsJustification);
    g_form.setVisible('justification', needsJustification);
}
```

`setMandatory('field', true/false)` toggles the red asterisk and the save-time
requirement. `setVisible('field', true/false)` shows or hides the field
entirely. `setReadOnly('field', true/false)` locks a field so the user can see
it but not edit it — useful once a record reaches a state where a value
shouldn't change anymore, like a `close_code` after closure.

## Messages and direct DOM access

`g_form.addInfoMessage('text')` and `g_form.addErrorMessage('text')` post a
banner at the top of the form — info messages are neutral, error messages are
styled to draw attention and are the standard way to explain *why* an
`onSubmit` script is about to block a save (you'll build exactly that in
Lesson 23).

For the rare case where `g_form`'s own methods aren't enough, `getControl()`
hands back the real HTML element behind a field, for direct manipulation:

```javascript
function onLoad() {
    var descControl = g_form.getControl('short_description');
    descControl.style.backgroundColor = '#fff8e1'; // soft highlight
}
```

`getControl()` is an escape hatch, not a first resort — reach for the named
`g_form` methods first, since they keep working across ServiceNow's different
form renderers (classic UI vs. Workspace) in a way raw DOM styling may not.

## Key terms

| Term | Meaning |
|---|---|
| `g_form` | The global client-side object representing the form currently on screen |
| `getValue()` / `setValue()` | Read or write a field's current value in the browser, no server round trip |
| `setMandatory()` / `setVisible()` / `setReadOnly()` | Toggle a field's required/shown/editable state live |
| `addInfoMessage()` / `addErrorMessage()` | Post a banner message to the user at the top of the form |
| `getControl()` | Returns the raw HTML DOM element behind a field, for advanced cases |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why does
`g_form.getValue('priority')` never need a `.query()` call the way reading that
same field with `GlideRecord` would, and what does that tell you about where
`g_form` actually runs?
