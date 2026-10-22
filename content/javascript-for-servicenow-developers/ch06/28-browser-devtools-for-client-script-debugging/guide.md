# Lesson 28 — Browser DevTools for Client-Script Debugging

**Chapter 6 · Debugging JavaScript on ServiceNow · Lesson 28 of 32**

## What you'll learn

- Why a Client Script needs a completely different debugging tool than a Business Rule
- How to set a real breakpoint directly in the browser's Sources/Debugger tab, on the actual client script file
- How `console.log()` gives you a fast, no-breakpoint way to inspect values as a script runs
- How typing `g_form` or `g_user` straight into the DevTools Console shows you their live state on the open form
- Why this is standard web-development practice, not a ServiceNow-specific tool

## A different runtime needs a different debugger

Chapter 2 covered ServiceNow's server-side JavaScript engine, and
the Script Debugger (Lesson 26) only ever attaches to that engine.
Client Scripts don't run there at all — they run as real JavaScript
in the user's actual browser, the same runtime as any other website.
That means the right debugging tool isn't anything ServiceNow built
— it's the browser's own DevTools (Chrome, Firefox, or Edge all ship
one), the same tool any front-end developer uses on any site.

## Setting a real breakpoint on the client script file

DevTools' Sources tab (called the Debugger tab in Firefox) lists
every JavaScript file the current page has loaded — and a Client
Script, once it fires, is one of those files. Opening it there and
clicking a line number sets a real breakpoint, exactly like the
Script Debugger's breakpoints, except now it's pausing JavaScript
running in the browser itself.

```javascript
// An onChange Client Script on the "priority" field
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    var category = g_form.getValue('category');   // <- breakpoint here

    if (newValue == '1' && category == '') {
        g_form.showFieldMsg('category', 'Category is required for Priority 1.', 'error');
    }
}
```

With a breakpoint on the `category` line, changing the Priority field
on the actual form pauses the browser right there, and DevTools shows
you the call stack, every argument the function received, and every
variable in scope — `control`, `oldValue`, `newValue`, `category` —
at that exact moment.

## `console.log()` for quick inspection

Not every question needs a full breakpoint. Dropping a `console.log()`
call directly into the script is the fastest way to confirm a value
without pausing anything:

```javascript
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    console.log('Priority changed from', oldValue, 'to', newValue);
    var category = g_form.getValue('category');
    console.log('Current category:', category);

    if (newValue == '1' && category == '') {
        g_form.showFieldMsg('category', 'Category is required for Priority 1.', 'error');
    }
}
```

Every `console.log()` output lands in the Console tab, in order, as
the script actually runs — a quick trace of what happened, without
ever stopping execution.

## Inspecting `g_form` and `g_user` live, from the Console

The DevTools Console isn't limited to reading output a script
printed — you can type JavaScript directly into it, against the
live page. On any ServiceNow form, typing `g_form` into the Console
and pressing Enter returns the live GlideForm object for the form
that's actually open, letting you call `g_form.getValue('priority')`
or `g_form.getSectionNames()` by hand, on demand. Typing `g_user`
does the same for the current user's session — `g_user.userName` or
`g_user.hasRole('admin')` — without needing to add a single line to
any script.

## Why this matters

None of this is ServiceNow-specific tooling. It's standard
front-end web development practice — the exact workflow any
developer uses debugging any website — applied to the fact that
Client Scripts are real JavaScript running in a real browser.

## Key terms

| Term | Meaning |
|---|---|
| DevTools | The browser's own built-in developer tools (Chrome, Firefox, Edge) |
| Sources / Debugger tab | Where real breakpoints are set directly on a loaded JavaScript file |
| `console.log()` | Prints a value to the Console without pausing execution |
| Console (live evaluation) | Typing an expression like `g_form` directly into DevTools to inspect its current state |

## Check yourself

Without looking back: why can't the Script Debugger from Lesson 26
ever be used on a Client Script, and what browser-native tool takes
its place?
