# Lesson 29 — UI Scripts

**Chapter 7 · GlideDialogWindow, GlideModal & Advanced UI · Lesson 29 of 37**

## What you'll learn

- What a UI Script (`sys_ui_script`) actually is, and how it differs from a Client Script or a UI Page script
- The real parallel between UI Scripts and Script Includes — reusability, one on the client, one on the server
- The difference between a Global UI Script and one that's included explicitly
- How to write and call a reusable function from a UI Script in a Client Script and a UI Page
- Why copy-pasting the same helper function into five Client Scripts is exactly the problem UI Scripts solve

## The problem: the same helper function, copy-pasted everywhere

By Chapter 4 you've written Client Scripts and UI Pages, each with their own inline JavaScript.
It's common to end up needing the same small utility — a date formatter, a validation helper, a
string-trimming function — inside more than one of them. Copy-pasting that function into every
Client Script and every UI Page that needs it means five places to update the next time it has a
bug. A **UI Script** is the real ServiceNow record type (`sys_ui_script`) that solves exactly this
problem, for client-side JavaScript.

## What a UI Script actually is

A UI Script is a standalone record holding pure client-side JavaScript — it isn't tied to any one
form, any one Client Script, or any one UI Page. You write a function once, save it as a UI
Script, and then call that function from any Client Script, UI Policy script, or UI Page that
needs it, anywhere in the instance (subject to scope).

```javascript
// UI Script named "DateFormatHelpers"
// Not attached to any table or form — pure reusable client-side logic
function formatShortDate(dateString) {
    if (!dateString) {
        return '';
    }
    var d = new Date(dateString);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}
```

## Global vs. included: controlling where it loads

A UI Script has a **Global** checkbox. When checked, the script loads on every page in the
instance automatically — useful for something genuinely universal, like a site-wide utility, but
expensive if overused, since every page pays the cost of loading it whether it's needed there or
not. Left unchecked, the UI Script only loads where it's explicitly included — referenced by name
from a Client Script, a UI Page's HTML, or another script that needs it. For most reusable
helpers, non-Global with explicit inclusion is the right default: you only pay the load cost on
the pages that actually use the function.

```javascript
// Inside a Client Script that needs formatShortDate() from the
// "DateFormatHelpers" UI Script — include it explicitly rather
// than making it Global:
function onLoad() {
    var created = g_form.getValue('sys_created_on');
    g_form.addInfoMessage('Created: ' + formatShortDate(created));
}
```

## The real parallel: a client-side Script Include

Chapter 3 taught Script Includes as reusable *server-side* logic — write a function once in a
Script Include, call it from any Business Rule or other server script instead of duplicating it.
A UI Script is the client-side mirror of that same idea: a shared library of browser JavaScript,
called from wherever it's needed instead of re-typed in every file. The mechanics differ (no
classes, no `GlideAjax` boundary, just plain functions loaded into the page), but the motivation
is identical — one place to fix a bug, one place to extend behavior, instead of five.

## When to reach for a UI Script

Reach for a UI Script the moment you notice the same client-side function appearing in a second
Client Script or UI Page. One copy is fine. A second copy is the signal to extract it into a UI
Script and have both callers include it. This is the same discipline Chapter 3 taught for server
code — just applied to the browser side of the application.

## Key terms

| Term | Meaning |
|---|---|
| UI Script | `sys_ui_script` record holding reusable client-side JavaScript, not tied to any one form |
| Global | A UI Script setting that loads the script on every page automatically |
| Included | A non-Global UI Script that only loads where explicitly referenced by name |
| Script Include | The server-side equivalent reusability pattern from Chapter 3 |

## Check yourself

You have a validation function duplicated in two Client Scripts on different tables. What record
type do you extract it into, and should you mark that record Global — why or why not?
