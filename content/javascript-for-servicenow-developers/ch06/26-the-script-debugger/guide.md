# Lesson 26 — The Script Debugger

**Chapter 6 · Debugging JavaScript on ServiceNow · Lesson 26 of 32**

## What you'll learn

- What the Script Debugger actually is, and the one real limit on where it works
- How to turn it on from your own developer profile
- What a breakpoint inside a Business Rule or Script Include actually does to a running transaction
- How to step through server-side execution line by line and inspect variables at each step
- Why the Script Debugger is the right tool for a synchronous problem, and the wrong tool for an async one

## A real debugger, built into the platform

Every server-side script you've written in this course — a Business
Rule, a Script Include method, a background script — runs on
ServiceNow's server-side JavaScript engine (Chapter 2 covered that
engine itself). The Script Debugger is a real, standard debugging
tool built directly into the platform for exactly that engine. It
works the same way any debugger in any IDE works: you flag a line of
code as a place to pause, trigger the script, and the platform
freezes execution right there so you can look around before letting
it continue.

This isn't a simplified or "ServiceNow-lite" version of debugging.
It's the same core idea you'd use debugging Node.js in VS Code or
Java in Eclipse — breakpoints, stepping, variable inspection — just
pointed at Business Rules and Script Includes instead of a standalone
application.

## Turning it on

The Script Debugger is reached from your own developer profile menu
(the account icon in the top-right of the platform), and requires
your account to have development access — typically the `admin` role
or an elevated security role, depending on how your instance is
locked down. Once enabled, the debugger attaches to your current
session: any script that runs as part of a transaction you trigger
(saving a record, running a background script, calling a Script
Include method) becomes something the debugger can pause.

## Setting breakpoints and stepping through execution

A breakpoint is a flag on a specific line inside a script — most
commonly a line inside a Business Rule's function body or a Script
Include method — telling the debugger "pause execution here." Once a
breakpoint is set, triggering the action that runs that script (for
example, updating an Incident that fires an `onUpdate` Business Rule)
causes the transaction to pause the instant execution reaches that
line, rather than running straight through to completion.

```javascript
// Inside a "before update" Business Rule on incident
(function executeRule(current, previous) {
    var oldPriority = previous.getValue('priority');
    var newPriority = current.getValue('priority');   // <- breakpoint here

    if (newPriority == 1 && oldPriority != 1) {
        current.work_notes = 'Escalated to Priority 1.';
    }
})(current, previous);
```

With a breakpoint on the `newPriority` line above, the debugger lets
you **step over** that line (run it and move to the next one), **step
into** a called function to follow execution inside it, or **step
out** of the current function back to whatever called it — exactly
the vocabulary any IDE debugger uses.

## Inspecting variables mid-execution

The real value of pausing is what you can see while paused: the
current values of `current`, `previous`, and any local variable
already assigned, plus the call stack showing exactly which Business
Rule, Script Include, or function called into the next. In the
example above, pausing right after `newPriority` is assigned lets you
confirm its actual value — `1`, `2`, a string, `null` — instead of
guessing from reading the code alone. That's the core debugging
move: stop guessing what a variable holds, and look at it directly.

## Where the Script Debugger falls short

The Script Debugger's real limit is synchronous, session-attached
execution. It debugs scripts that run as part of a transaction you
personally trigger while the debugger is attached. It does **not**
help with a Business Rule that fires asynchronously (queued to run
later, outside your session), a Scheduled Job running in the
background with no session attached, or — obviously — any
client-side script, since Client Scripts run as real JavaScript in
the browser, not on the server at all. For those cases, the next
lesson's tool — `gs.info()` and the System Log — is what actually
works.

## Key terms

| Term | Meaning |
|---|---|
| Script Debugger | ServiceNow's built-in debugging tool for server-side script execution |
| Breakpoint | A flagged line where the debugger pauses a running transaction |
| Step over / into / out | Standard debugger controls for moving through paused execution one step at a time |
| Synchronous execution | Code running as part of the transaction you triggered, while attached — the Script Debugger's real scope |

## Check yourself

Without looking back: why can't the Script Debugger help you
troubleshoot a Business Rule configured to run asynchronously, and
what tool from the next lesson actually can?
