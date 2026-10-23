# Lesson 8 — Slow Scripts Lab

**Chapter 2 · Diagnosing Slow Scripts · Lesson 8 of 25**

## What you'll learn

- How to work a real slow-transaction ticket from complaint to confirmed fix, start to finish
- How to profile a slow incident-update transaction and read the result
- How to find and fix a GlideRecord query stuck inside a loop, with a real lookup-map rewrite
- How to find and fix a business rule firing more times than it should
- How to confirm both fixes using the same profiler that found the problems

## The ticket

"Updating an incident is taking four to five seconds. It didn't used to." That's the entire
report — no numbers, no pattern, no suspects. This lab works it the way Lessons 5 through 7
taught: measure first, then fix exactly what the measurement points to.

## Step 1 — Profile the slow transaction

Following Lesson 5, Debug Business Rule and Debug Script get switched on, and the exact save the
reporter described — opening an incident with several related tasks and saving it — gets
repeated. The debug panel comes back with two real suspects standing out from the noise:

```
*** Script: Business Rule "Sync Task Owners" (incident) - 2410 ms
***   Script Include: "TaskUtils.getOwnerNames" - 2360 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 180 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 160 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 140 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 90 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 40 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 0 ms
```

Two distinct problems, both recognizable from this chapter: a Script Include eating 2360 of a
transaction's roughly 3400 milliseconds, and a second business rule firing six times with
durations shrinking toward zero.

## Step 2 — Finding #1: a query stuck inside a loop

`TaskUtils.getOwnerNames` turns out to look up the owning user's display name for every task
record linked to the incident, one at a time:

```javascript
// Script Include: TaskUtils
getOwnerNames: function(incidentSysId) {
    var names = [];
    var taskGr = new GlideRecord('task');
    taskGr.addQuery('parent', incidentSysId);
    taskGr.query();
    while (taskGr.next()) {
        var userGr = new GlideRecord('sys_user');
        userGr.get(taskGr.getValue('assigned_to')); // a fresh query, every iteration
        names.push(userGr.getValue('name'));
    }
    return names;
}
```

Over an incident with forty linked tasks, this runs forty separate `sys_user` queries — exactly
the repeated-query signature Lesson 6 covered, just against a different table. The fix builds one
lookup map instead of querying per task:

```javascript
// Script Include: TaskUtils (fixed)
getOwnerNames: function(incidentSysId) {
    var names = [];
    var taskGr = new GlideRecord('task');
    taskGr.addQuery('parent', incidentSysId);
    taskGr.query();

    var userIds = [];
    var seen = {};
    while (taskGr.next()) {
        var uid = taskGr.getValue('assigned_to');
        if (uid && !seen[uid]) {
            userIds.push(uid);
            seen[uid] = true;
        }
    }

    var userGr = new GlideRecord('sys_user');
    userGr.addQuery('sys_id', 'IN', userIds);
    userGr.query();
    var nameById = {};
    while (userGr.next()) {
        nameById[userGr.getValue('sys_id')] = userGr.getValue('name');
    }

    taskGr.query(); // re-run once to rebuild names in task order
    while (taskGr.next()) {
        names.push(nameById[taskGr.getValue('assigned_to')] || '');
    }
    return names;
}
```

Forty `sys_user` queries become one, built with `addQuery('sys_id', 'IN', userIds)` against the
list of distinct owners actually needed, then read back out of a plain JavaScript lookup map
(`nameById`) instead of re-querying per task.

## Step 3 — Finding #2: a business rule firing six times

"Recalculate SLA Flag" turns out to be exactly the pattern Lesson 7 covered — an after business
rule that saves the record itself:

```javascript
// Business Rule: "Recalculate SLA Flag" — after update, on incident
(function executeRule(current, previous) {
    current.u_sla_at_risk = isAtRisk(current);
    current.update(); // re-saves, re-triggering update business rules
})(current, previous);
```

The fix is the same combination from Lesson 7 — an idempotent guard, and `setWorkflow(false)` on
the save that remains:

```javascript
// Business Rule: "Recalculate SLA Flag" (fixed)
(function executeRule(current, previous) {
    var atRisk = isAtRisk(current);

    if (current.u_sla_at_risk == atRisk) {
        return; // already correct — no save, no re-trigger
    }

    current.u_sla_at_risk = atRisk;
    current.setWorkflow(false);
    current.update();
})(current, previous);
```

## Step 4 — Confirm both fixes

Both fixes deployed, the exact same incident save gets repeated with Debug Business Rule and
Debug Script still on. The debug panel now reads close to:

```
*** Script: Business Rule "Sync Task Owners" (incident) - 95 ms
***   Script Include: "TaskUtils.getOwnerNames" - 60 ms
*** Script: Business Rule "Recalculate SLA Flag" (incident) - 11 ms
```

One `sys_user` lookup query instead of forty. One execution of "Recalculate SLA Flag" instead of
six. The transaction that took four to five seconds now finishes in well under half a second —
not because of a vague "performance pass," but because two specific, measured problems got fixed
and then re-measured to confirm it.

## Key terms

| Term | Meaning |
|---|---|
| Lookup map | A plain JavaScript object keyed by ID, built from one query, used to avoid re-querying per loop iteration |
| addQuery('field', 'IN', array) | A GlideRecord condition matching any value in a given array, used to fetch many related records in one query |
| Re-measure | Repeating the exact same profiled transaction after a fix, to confirm the fix actually worked |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: this lab found two unrelated
problems in the same transaction. What was the measured evidence that pointed to each one, and
why does fixing both require re-running the same profiler afterward rather than just trusting
the code change?
