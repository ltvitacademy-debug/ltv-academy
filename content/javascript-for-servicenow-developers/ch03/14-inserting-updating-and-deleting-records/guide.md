# Lesson 14 — Inserting, Updating & Deleting Records

**Chapter 3 · GlideRecord · Lesson 14 of 32**

## What you'll learn

- The real insert pattern: initialize, setValue, insert
- The real update pattern: query, find, modify, update
- How `.deleteRecord()` and `.deleteMultiple()` differ, and when each is correct
- What `.insert()` returns, and why you almost always want to capture it

## Inserting a new record

Creating a brand-new row has its own pattern, distinct from querying:

```javascript
var gr = new GlideRecord('incident');
gr.initialize();
gr.setValue('short_description', 'Printer on 3rd floor is offline');
gr.setValue('priority', 3);
gr.caller_id = gs.getUserID(); // dot notation works for writes too
var newSysId = gr.insert();
gs.info('Created incident with sys_id: ' + newSysId);
```

`.initialize()` sets up a new, blank in-memory record with the table's
default values applied — it does **not** touch the database. You then
set fields with `.setValue('field', value)` or dot notation (both are
real; dot notation is just as valid for writing as it is for reading).
`.insert()` is the call that actually saves the row, and it returns the
new record's `sys_id` as a string — or `null` if the insert failed (for
example, due to an Access Control violation). Capturing that return
value matters any time you need to reference the new record right
after creating it, say to attach it to something else in the same
transaction.

## Updating an existing record

Updating is always a three-part sequence: find the record, change it in
memory, then save:

```javascript
var gr = new GlideRecord('incident');
gr.addQuery('number', 'INC0010001');
gr.query();
if (gr.next()) {
    gr.setValue('priority', 1);
    gr.work_notes = 'Escalated to priority 1 per customer request.';
    gr.update();
}
```

Note what's *missing* here compared to the insert pattern: no
`.initialize()`. You only initialize when building a brand-new blank
record. When you're updating, `.query()` + `.next()` already gave you an
existing, populated record — you're just changing a few fields on it
before calling `.update()`. Calling `.update()` on a record you never
actually found (i.e., inside a block where `.next()` returned `false`)
does nothing, which is exactly why the `.setValue()`/`.update()` calls
belong inside the `if (gr.next())` block.

## Deleting one record vs. deleting many

```javascript
// Delete one specific record you've already found
var gr = new GlideRecord('incident');
gr.addQuery('number', 'INC0010001');
gr.query();
if (gr.next()) {
    gr.deleteRecord();
}

// Delete every record matching a query, without looping at all
var gr2 = new GlideRecord('incident');
gr2.addQuery('active', false);
gr2.addQuery('sys_updated_on', '<', gs.daysAgoStart(365));
gr2.query();
gr2.deleteMultiple();
```

`.deleteRecord()` deletes the one record the cursor is currently
positioned on — you must call `.next()` first to position it there.
`.deleteMultiple()` is different: it deletes **every** record matching
the current query in one operation, with no `while (gr.next())` loop
required at all. That makes `.deleteMultiple()` efficient for bulk
cleanup, but also makes it dangerous — a query that's broader than you
intended deletes more than you intended, and there's no row-by-row
confirmation step. Always double-check the `.addQuery()` conditions
before calling `.deleteMultiple()`, ideally by running the same query
with a normal loop and `gs.info()` first to see exactly what it would
match.

## Key terms

| Term | Meaning |
|---|---|
| `.initialize()` | Sets up a new blank in-memory record with defaults applied; touches nothing in the database |
| `.insert()` | Saves a new record and returns its sys_id (or null on failure) |
| `.update()` | Saves changes made to an already-queried, already-found record |
| `.deleteMultiple()` | Deletes every record matching the current query in one operation, no loop needed |

## Check yourself

Without looking back: why does the update pattern skip `.initialize()`,
and what specifically does `.deleteMultiple()` do differently from
calling `.deleteRecord()` inside a `while (gr.next())` loop?
