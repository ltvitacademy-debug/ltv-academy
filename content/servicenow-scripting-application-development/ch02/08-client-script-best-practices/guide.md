# Lesson 8 — Client Script Best Practices

**Chapter 2 · Client Scripts · Lesson 8 of 37**

## What you'll learn

- Why client scripts should stay lightweight, and where heavy logic actually belongs
- Why client-side `GlideRecord` is the wrong tool now — and has been since the Quebec release
- Why `g_form` methods beat direct DOM manipulation, even when DOM manipulation "works"
- Why `onChange` scripts in particular need to be fast, not just correct
- How to recognize a client script that's quietly become a performance problem

## Keep client scripts lightweight

A client script runs in the user's browser, on the UI thread, every single time its trigger
fires. An `onChange` script runs on every keystroke-driven change event for its field — not once,
but potentially dozens of times while a user edits a form. Any slow operation in that script
blocks the browser from responding until it finishes. The right home for real business logic —
record lookups, approval calculations, cross-table validation — is the server, reached through
`GlideAjax` calling a Script Include, the pattern Course 5 introduced. The client script's job is
narrow: read a value, decide something simple, or kick off an asynchronous server call and react
to the answer.

## Client-side GlideRecord is gone — use GlideAjax

Earlier ServiceNow releases let a client script instantiate `GlideRecord` directly in the
browser. Starting with the Quebec release, client-side `GlideRecord` is **disabled by default**,
for both performance and security reasons — it meant arbitrary database queries running directly
from browser JavaScript, visible to anyone who opened dev tools. The modern, correct pattern is
`GlideAjax` against a Script Include, which keeps the actual query on the server and only sends
back the answer.

```javascript
// Wrong — client-side GlideRecord, disabled by default since Quebec
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;
    var gr = new GlideRecord('sys_user');
    gr.get(newValue);
    g_form.setValue('manager', gr.manager.toString());
}
```

```javascript
// Right — GlideAjax against a Script Include, same result
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') return;
    var ga = new GlideAjax('UserUtils');
    ga.addParam('sysparm_name', 'getManagerFor');
    ga.addParam('sysparm_user_id', newValue);
    ga.getXMLAnswer(function(answer) {
        g_form.setValue('manager', answer);
    });
}
```

## Prefer g_form over direct DOM manipulation

It's possible to reach into the page with raw DOM calls — `document.getElementById(...)` or
jQuery selectors — to hide a field or change its style. It's also fragile: the platform's
rendered HTML structure isn't a documented contract, and it changes between releases and between
Classic UI and the newer UI16/Next Experience renderer. `g_form` is the documented, stable API
built specifically so your script doesn't need to know the underlying markup.

```javascript
// Fragile — depends on exact DOM structure that can change release to release
document.getElementById('sys_display.incident.caller_id').style.display = 'none';
```

```javascript
// Stable — g_form is the supported API regardless of rendering internals
g_form.setVisible('caller_id', false);
```

## Why onChange specifically needs to be fast

Because `onChange` can fire many times during a single form session, any noticeable delay there
is multiplied across every edit a user makes. Keep the synchronous portion of an `onChange`
script to simple reads, simple `g_form` calls, and cheap comparisons; push anything that needs a
database lookup into a `GlideAjax` call so the browser stays responsive while the answer comes
back asynchronously.

## Key terms

| Term | Meaning |
|---|---|
| `GlideAjax` | The client-side API for calling a server-side Script Include asynchronously |
| Client-side `GlideRecord` | Direct database queries from browser script; disabled by default since the Quebec release |
| `g_form` | The documented client-script API for reading/writing form state, instead of raw DOM access |
| Script Include | Reusable server-side JavaScript that `GlideAjax` calls into (Chapter 3 covers these in depth) |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why was client-side `GlideRecord`
disabled by default, and what's the replacement pattern that gets the same data without that risk?
