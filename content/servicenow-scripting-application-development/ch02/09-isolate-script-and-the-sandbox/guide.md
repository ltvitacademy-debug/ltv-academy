# Lesson 9 — Isolate Script & the Sandbox

**Chapter 2 · Client Scripts · Lesson 9 of 37**

## What you'll learn

- What the real "Isolate script" checkbox on a Client Script record actually does
- Why an isolated script runs inside a sandboxed iframe, separate from the rest of the page
- The real, concrete problem isolation prevents: variable and function naming collisions
- The narrow, legitimate reason a script would need to run **not** isolated
- Why "isolate by default" is the correct standing rule for this course and for real instances

## The checkbox: Isolate script

Every record on `sys_script_client` — every client script you write, of any of the four types
from Lesson 7 — has a checkbox labeled **Isolate script**. It's easy to skim past, but it changes
where your script actually executes. Checked, the script runs inside a sandboxed iframe that the
platform injects into the page specifically to hold client script execution, separate from the
page's own global JavaScript context and separate from every other client script's variables.
Unchecked, the script runs directly in the page's global scope — the same scope the form itself,
any UI Macros, and every other non-isolated script share.

## The real problem isolation prevents: collisions

Global scope is the problem. Two unrelated client scripts, written by two different developers
who have never seen each other's code, can easily choose the same variable name for something
that feels locally obvious — `count`, `index`, `temp`. If both scripts are **not** isolated,
they're not writing to two separate variables; they're writing to the exact same slot in the
page's global scope.

```javascript
// Script A (not isolated) — lives in the page's shared global scope
var helperIndex = 0;
function onLoad() {
    helperIndex = 1;
}
```

```javascript
// Script B (not isolated) — different file, same variable name
var helperIndex = 0;   // this redeclares and collides with Script A's global
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) return;
    helperIndex = 2;   // silently stomps on whatever Script A was tracking
}
```

Neither developer sees an error. The bug shows up later as "that other script stopped working
after I added mine" — exactly the kind of failure that's miserable to trace, because the two
scripts look completely unrelated. With **Isolate script** checked on both, each one executes
inside its own sandboxed iframe context, so `helperIndex` in Script A and `helperIndex` in Script
B never touch the same memory. The collision simply can't happen.

## When non-isolated is actually the right call

Isolation isn't free of trade-offs — it's also what makes a script more stable and more secure,
since it can't be reached into or interfered with by other page script. The narrow, legitimate
reason to uncheck it is when a script genuinely needs direct access to the page's global
JavaScript context: specific legacy **UI Macro** interactions, or certain older integrations that
were built expecting to read or call something sitting directly in global scope. Those are real
but uncommon cases, and they should be documented on the script itself, not assumed.

## The standing rule

Isolate by default. Every new client script in this course — and in a real instance — starts
with **Isolate script** checked. You only uncheck it when a specific, documented need requires
direct global access, and you leave a comment explaining exactly why, so the next developer
doesn't "fix" it back to isolated and quietly break whatever depended on the exception.

## Key terms

| Term | Meaning |
|---|---|
| Isolate script | The checkbox on a Client Script record that sandboxes it from the page's global scope |
| Sandbox / iframe | The isolated execution context an isolated script runs inside |
| Global scope | The page-wide JavaScript context that non-isolated scripts and UI Macros share |
| UI Macro | A legacy ServiceNow UI component; one of the few legitimate reasons for a non-isolated script |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why can two completely unrelated
client scripts interfere with each other if neither is isolated, and what specifically about the
sandboxed iframe prevents that?
