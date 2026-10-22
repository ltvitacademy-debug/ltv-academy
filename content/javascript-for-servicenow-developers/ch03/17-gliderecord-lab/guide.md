# Lesson 17 — GlideRecord Lab

**Chapter 3 · GlideRecord · Lesson 17 of 32**

## What you'll learn

- How to combine querying, updating, and the Lesson 16 performance fixes into one real method
- Why this scenario calls for `GlideAggregate` for the count and a bulk `while(next())` update for the reassignment, not one GlideRecord doing both
- How to trace the method end to end against a realistic data set
- How to verify there's no N+1 pattern or wasted `getRowCount()` call anywhere in the result

## The scenario

Write a Script Include method, `reassignStaleP1s`, that does three
things: finds every open, unassigned Priority 1 incident older than 24
hours, reassigns each one to a specified fallback assignment group, and
returns how many it reassigned — written efficiently, avoiding every
pitfall from Lesson 16.

"Open" means `active` is `true`. "Unassigned" means `assigned_to` is
empty. "Older than 24 hours" means `sys_created_on` is before 24 hours
ago. The method takes the fallback group's sys_id as a parameter.

## The Script Include

```javascript
var IncidentEscalationUtils = Class.create();
IncidentEscalationUtils.prototype = {
    initialize: function() {},

    reassignStaleP1s: function(fallbackGroupSysId) {
        var cutoff = gs.hoursAgo(24);

        var gr = new GlideRecord('incident');
        gr.addQuery('active', true);
        gr.addQuery('priority', 1);
        gr.addNullQuery('assigned_to');
        gr.addQuery('sys_created_on', '<', cutoff);
        gr.query();

        var reassignedCount = 0;
        while (gr.next()) {
            gr.setValue('assignment_group', fallbackGroupSysId);
            gr.work_notes = 'Auto-reassigned: open P1, unassigned for over 24 hours.';
            gr.update();
            reassignedCount++;
        }

        return reassignedCount;
    },

    type: 'IncidentEscalationUtils'
};
```

## Why this avoids every Lesson 16 pitfall

1. **No N+1.** There's exactly one `GlideRecord('incident')` created,
   and exactly one `.query()` call. The `while (gr.next())` loop
   updates each matching record directly — it does not open a second
   GlideRecord per row to look anything else up.
2. **No wasted `.getRowCount()`.** The count returned by this method
   comes from incrementing `reassignedCount` once per row actually
   updated inside the loop that was already running — not from a
   separate `.getRowCount()` call before or after.
3. **No missing `.setLimit()`.** This method's job is to act on *every*
   matching record, not a sample, so a limit would be wrong here — the
   lesson from Lesson 16 isn't "always set a limit," it's "set one when
   you only need a sample," and this isn't that case.
4. **Not a job for `GlideAggregate`.** `GlideAggregate` is for
   computing a count or sum *without* touching individual rows. This
   method needs to touch and modify every individual row (to reassign
   it), so a plain GlideRecord loop is correct here — `GlideAggregate`
   can't update records at all, only aggregate them.

## Tracing the method

1. `gs.hoursAgo(24)` computes the cutoff timestamp once, outside the
   loop — not recalculated per row.
2. The single GlideRecord query combines four conditions with AND:
   active, priority 1, `assigned_to` null, and created before the
   cutoff — exactly the filter from the scenario, built with the real
   `.addQuery()` / `.addNullQuery()` methods from Lessons 13 and 15.
3. `.query()` sends that combined filter to the database once.
4. Each pass through `while (gr.next())` is already positioned on one
   matching incident — no second lookup needed. `.setValue()` and dot
   notation both set fields in memory, then `.update()` saves that one
   row immediately.
5. `reassignedCount++` runs once per row actually processed, so the
   return value is exactly the number of incidents this call touched —
   useful for logging or for a calling Scheduled Job to report.

## A calling Scheduled Job

```javascript
var utils = new IncidentEscalationUtils();
var count = utils.reassignStaleP1s('8a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d');
gs.info('Reassigned ' + count + ' stale P1 incidents.');
```

## Key terms

| Term | Meaning |
|---|---|
| `reassignStaleP1s` | This lab's Script Include method — find, reassign, and count in one pass |
| Combined filter | Four `.addQuery()`/`.addNullQuery()` conditions ANDed into one query |
| Count via loop increment | Counting rows actually processed inside the existing loop, not a separate `.getRowCount()` call |
| `GlideAggregate` vs. GlideRecord | Aggregate for read-only totals; GlideRecord when rows must actually be modified |

## Check yourself

Walk through `reassignStaleP1s` from memory: which single query finds
all the candidate incidents, and why is a second GlideRecord, a
`.getRowCount()` call, or a `GlideAggregate` each the wrong tool for
this particular job?
