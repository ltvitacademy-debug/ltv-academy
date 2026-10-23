# Lesson 15 — UI Policies: a Developer's View

**Chapter 4 · UI Policies, UI Actions & UI Pages · Lesson 15 of 37**

## What you'll learn

- A one-sentence recap of what a UI Policy does (covered from the admin side already)
- The real "Run scripts" checkbox and what it unlocks beyond the condition builder
- The exact `onCondition_true` / `onCondition_false` function signatures and what each receives
- When a declarative UI Policy Action genuinely can't express what you need
- Why this script pair is still a client-side mechanism, not a server-side one

## Quick recap: the admin-level UI Policy

System Administration Chapter 5 covered `sys_ui_policy` from the admin seat: a condition on a table, paired with UI Policy Actions that make a field visible, mandatory, or read-only, evaluated live in the browser with no reload. That part doesn't change here. What changes is what happens when the condition itself, or the behavior you need once it's true, is more than the declarative Actions related list can express.

## The "Run scripts" checkbox

Every UI Policy record has a checkbox labeled **Run scripts**. Leave it off, and the policy is purely declarative — a condition plus a list of UI Policy Actions, nothing else. Turn it on, and two new script fields appear directly on the UI Policy form itself: **Execute if true** and **Execute if false**. These are real client-side JavaScript functions that fire in addition to (not instead of) any UI Policy Actions already configured, giving you a second, fully scriptable lane for behavior the condition builder was never designed to hold.

```javascript
function onCondition_true(control, g_form) {
    // Runs when the policy's condition evaluates to true
    if (g_form.getValue('priority') === '1') {
        g_form.showFieldMsg('short_description',
            'Priority 1 incidents require a VIP contact on file.', 'warning');
    }
}

function onCondition_false(control, g_form) {
    // Runs when the condition is no longer true
    g_form.hideFieldMsg('short_description', true);
}
```

Both functions receive two arguments every time: `control`, a reference to the UI Policy's own DOM-level context (rarely used directly, but always passed), and `g_form`, the exact same client-side form API already familiar from Chapter 2's Client Scripts. Inside either function you can call any `g_form` method — `getValue`, `setValue`, `setMandatory`, `addInfoMessage`, `showFieldMsg` — anything a real `onChange` Client Script could do.

## Why reach for this instead of a plain Client Script

It's a fair question — `g_form` access from a condition sounds exactly like what a Client Script already does. The difference is *when* it runs and *what triggers it*. A UI Policy's condition is checked continuously against whatever the condition builder expresses (field equals value, field is empty, AND/OR combinations across fields) and its script pair fires automatically the instant that condition flips true or false — no separate `onChange` wiring per field required. The real use case is layered logic: you already have a UI Policy condition doing the heavy lifting of *when* something should happen, and you just need a small, specific side effect — a warning message, a value reset, a related field clear — exactly at that same moment, without building and maintaining an entirely separate Client Script to track the same condition a second time.

## The limit that doesn't move

One fact carries over unchanged from the admin view: this is still 100% client-side. `onCondition_true` and `onCondition_false` run in the user's browser, against the rendered form, exactly like the declarative Actions they sit beside. A background script, an Import Set, or a Scripted REST API call still never renders the form, so neither the condition nor its scripts ever fire. Scripting a UI Policy makes it smarter about *what* it does on the form — it does not turn it into a server-side enforcement mechanism. That boundary is exactly why Chapter 5's Scoped Applications and the earlier Business Rules chapter remain the tools for anything that must hold true no matter how a record reaches the database.

## Key terms

| Term | Meaning |
|---|---|
| Run scripts | Checkbox on a UI Policy that exposes the Execute if true/false script fields |
| `onCondition_true` | Function that fires when the UI Policy's condition becomes true |
| `onCondition_false` | Function that fires when the UI Policy's condition stops being true |
| `control` | First argument passed to either function; the policy's own DOM-level context |
| `g_form` | Second argument; the same client-side form API used throughout Client Scripts |

## Check yourself

A UI Policy's condition is "Priority is 1." Run scripts is checked, with `onCondition_true` calling `g_form.showFieldMsg()`. An integration creates a Priority 1 incident through a Scripted REST API. Does the warning message appear, and why?
