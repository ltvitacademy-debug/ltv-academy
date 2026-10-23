# Lesson 24 — Capstone: Diagnose the Root Cause

**Chapter 7 · Capstone: Diagnose & Fix a Realistic Performance Problem · Lesson 24 of 25**

## What you'll learn

- How to confirm a hypothesis with real diagnostic evidence instead of a guess
- Why a missing index on `u_checklist_item` is one real cause of Meridian Retail's slow list view
- How to spot a query-in-a-loop pattern in a Script Include, and how to fix it
- How 450 added stores turned harmless scheduled jobs into semaphore contention
- Why all three causes needed confirming before any fix could be trusted

## Confirming cause one: the missing index, with real evidence

Lesson 23 flagged a missing index on a frequently-filtered custom field as a candidate cause.
Chapter 3 taught you not to take that on faith — you confirm it by reading the actual query plan.
The "My Open Checklist Items" list view filters on `u_store_region=<region>^active=true`, a
condition that runs every time any of the now-500 stores opens that list. Pulling the query plan for
that exact filter shows the evidence directly:

```
Query: u_checklist_item WHERE u_store_region = 'WEST' AND active = true
Before: full table scan — 2.1M rows scanned to return ~340 matching rows
After:  index seek on (u_store_region, active) — ~340 rows scanned directly
```

At 50 stores and a few thousand checklist item records, a full table scan on `u_checklist_item`
was fast enough that nobody noticed. At 500 stores and 2.1 million rows, that same unindexed scan
is doing roughly 6,000 times more work than it needs to for every single list open — and this list
is opened by hundreds of store managers every morning. This is cause one, confirmed: no index exists
on `u_store_region`, the exact column this list's filter condition depends on.

## Confirming cause two: a query-in-a-loop in ChecklistUtils

The "stuck-feeling" approval flows pointed at Chapter 2's territory — expensive script behavior, not
a database problem. Reading the `ChecklistUtils` Script Include that the approval flow calls turns up
a classic N+1 pattern: a function that loops over every checklist item in the current approval batch
and runs a brand-new `GlideRecord` query against `u_store_config` *inside* that loop, once per item.

```javascript
// BEFORE — a query-in-a-loop: one GlideRecord query per checklist item
var ChecklistUtils = Class.create();
ChecklistUtils.prototype = {
    initialize: function() {},

    getApprovalThresholds: function(checklistItems) {
        var thresholds = {};
        for (var i = 0; i < checklistItems.length; i++) {
            var item = checklistItems[i];
            var storeGr = new GlideRecord('u_store_config');
            storeGr.addQuery('u_store_id', item.store_id);
            storeGr.query();                 // <-- runs once PER item
            if (storeGr.next()) {
                thresholds[item.store_id] = storeGr.getValue('u_approval_threshold');
            }
        }
        return thresholds;
    },

    type: 'ChecklistUtils'
};
```

At 50 stores, an approval batch rarely held more than a handful of items, so a handful of extra
queries went unnoticed. At 500 stores, a single morning approval batch can span dozens of stores at
once, meaning dozens of redundant round trips to the same table for every batch the flow processes.
The fix pulls the query outside the loop entirely and builds a lookup map once:

```javascript
// AFTER — one query total, a lookup map built once, read from inside the loop
var ChecklistUtils = Class.create();
ChecklistUtils.prototype = {
    initialize: function() {},

    getApprovalThresholds: function(checklistItems) {
        var thresholds = {};
        var storeGr = new GlideRecord('u_store_config');
        storeGr.query();                     // <-- runs exactly once
        while (storeGr.next()) {
            thresholds[storeGr.getValue('u_store_id')] = storeGr.getValue('u_approval_threshold');
        }
        return thresholds;
    },

    type: 'ChecklistUtils'
};
```

Same inputs, same return value, one query instead of N — this is the exact query-in-a-loop fix
Chapter 2 walked through, confirmed here against a real symptom instead of a made-up example.

## Confirming cause three: scheduled jobs that scaled past their semaphore pool

The platform-wide, exactly-7:00-AM slowdown is the one Chapter 4's semaphore-and-scheduled-job
lessons predicted almost exactly. Two scheduled jobs run on this instance every morning: "Store
Checklist – Nightly Rollup," which aggregates the previous day's completed checklists, and "Store
Checklist – Morning Reminder," which notifies any store that hasn't started its checklist by 6:45 AM.
Both were scheduled years ago, long before 500 stores existed, and both draw from the same default
semaphore set used for synchronous background transactions.

```
7:00 AM load:
  Nightly Rollup job  --\
                          >--- both claim the same semaphore set
  Morning Reminder job --/
  + 500 stores submitting checklists concurrently

  At 50 stores: semaphore pool never saturates — no contention.
  At 500 stores: pool saturates — new transactions queue behind the two jobs.
```

At 50 stores, the semaphore pool was never close to saturated, so the two jobs ran invisibly
alongside everything else. At 500 stores, the simultaneous load of both jobs plus the 7:00 AM
submission spike saturates that pool, and every other transaction — checklist submissions included
— has to queue for a free semaphore. That queueing is exactly what a 40-minute, platform-wide
slowdown at a fixed time of day looks like from the outside.

## Three real causes, confirmed independently

None of these three causes was guessed — each was confirmed with its own diagnostic evidence: a
query plan for the index, the Script Include's own source code for the loop, and the semaphore
pool's saturation pattern for the scheduled jobs. This matters because fixing only one of them would
have left real symptoms unexplained: fixing just the index wouldn't touch the stuck approval flows,
and fixing just the script wouldn't touch the 7:00 AM platform-wide slowdown. All three are real,
and all three need a fix — which is exactly what Lesson 25 does next.

## Key terms

| Term | Meaning |
|---|---|
| Query plan | The database's own record of how it executed a query — a table scan versus an index seek |
| Query-in-a-loop (N+1) | A script pattern that runs one new query per loop iteration instead of one query total |
| Semaphore pool | A fixed set of execution slots background transactions compete for; saturating it causes queueing |
| Lookup map | A dictionary built from a single query, read repeatedly in a loop instead of re-querying each time |

## Check yourself

Before moving to Lesson 25: why would fixing only the `ChecklistUtils` script, and leaving the
missing index and the scheduled-job contention untouched, still leave Meridian Retail with real,
reported performance problems?
