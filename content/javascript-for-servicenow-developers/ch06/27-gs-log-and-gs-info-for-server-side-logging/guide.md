# Lesson 27 — gs.log() & gs.info() for Server-Side Logging

**Chapter 6 · Debugging JavaScript on ServiceNow · Lesson 27 of 32**

## What you'll learn

- What `gs` actually is, and why it's available in every server-side script you write
- The real logging methods — `gs.info()`, `gs.warn()`, `gs.error()` — and the older `gs.log()` you'll still see in legacy code
- Where these calls actually go: the System Log (`syslog` table) from Course 3
- The practical debugging workflow for a script the Script Debugger can't attach to
- How to read your own log lines back out of the System Log, filtered to the right time window

## `gs` is the global you've already been using

`gs` is the GlideSystem global object, available automatically in
every server-side script — Business Rules, Script Includes,
Scheduled Jobs, background scripts. You've already used it for
things like `gs.nowDateTime()`. This lesson covers its logging
methods, which exist for exactly one purpose: writing a message out
of your running script and into a place you can read it later.

## The real logging methods

```javascript
gs.info('Loaded ' + grCount + ' incidents for sweep.', 'IncidentSweepJob');
gs.warn('Encoded query returned zero results — check for typos.', 'IncidentSweepJob');
gs.error('GlideRecord.get() failed for sys_id: ' + sysId, 'IncidentSweepJob');
```

`gs.info()`, `gs.warn()`, and `gs.error()` write a message at
increasing severity, and both take an optional second argument — a
source string — that makes it far easier to find your own lines
later when the log is full of everything else the instance is
logging at the same time. The older `gs.log()` is equivalent to
info-level logging and still shows up constantly in legacy scripts,
but `gs.info()` is the modern, preferred form because its name
states the severity directly.

```javascript
// Legacy form — still common, but equivalent to gs.info()
gs.log('Checking priority: ' + current.getValue('priority'), 'LegacyScript');
```

## Where these calls actually go

Every one of these calls writes a row into the `syslog` table —
the System Log you already queried with GlideRecord back in Course
3. That's the entire mechanism: `gs.info()` isn't a special
debugging-only channel, it's just a convenient way to insert a
record into a table you already know how to read, filter, and sort.

## The real workflow: trace with logs when you can't attach a debugger

The Script Debugger only works for synchronous execution you trigger
while attached (Lesson 26). The moment a script is async — a
Business Rule queued to run later, a Scheduled Job firing on its own
schedule — you can't pause it. The practical fix is to sprinkle
`gs.info()` calls at the key points in the script, run it, and then
read the System Log afterward:

```javascript
(function executeRule(current, previous) {
    gs.info('Rule fired for INC: ' + current.getValue('number'), 'EscalationRule');

    var oldPriority = previous.getValue('priority');
    var newPriority = current.getValue('priority');
    gs.info('Priority change: ' + oldPriority + ' -> ' + newPriority, 'EscalationRule');

    if (newPriority == 1 && oldPriority != 1) {
        current.work_notes = 'Escalated to Priority 1.';
        gs.info('Escalation work note added.', 'EscalationRule');
    }
})(current, previous);
```

Running the rule and then opening the System Log, filtered to that
source string and the time window you just ran it in, tells you
exactly which lines executed and what each variable actually held —
the same information a breakpoint would have shown you, just
captured after the fact instead of live.

## Reading it back out

Filter the System Log list by the `source` field (matching the
string you passed as the second argument) and by the time the
transaction ran. If `'Priority change: 1 -> 1'` shows up, you've
just confirmed the rule fired on a record where priority didn't
actually change — a real finding you couldn't get from reading the
code alone.

## Key terms

| Term | Meaning |
|---|---|
| `gs` (GlideSystem) | The global server-side object available in every script, including its logging methods |
| `gs.info()` / `gs.warn()` / `gs.error()` | Logging methods at increasing severity; write a row to the System Log |
| `gs.log()` | The older, info-level-equivalent method still common in legacy scripts |
| System Log (`syslog`) | The table every `gs.info()`/`gs.log()` call actually writes to |

## Check yourself

Without looking back: when a Business Rule runs asynchronously and
you can't attach the Script Debugger to it, what's the practical
sequence of steps to figure out what the script actually did?
