# Lesson 3 — Business Rule Order & Execution Sequence

**Chapter 1 · Business Rules · Lesson 3 of 37**

## What you'll learn

- What the `order` field on a Business Rule record controls
- The real overall sequence a single save goes through, start to finish
- Why table inheritance means a rule on `task` can fire for Incident, Problem, and Change
- How to reason about which rule runs first when several apply to the same save
- Why execution order matters just as much as the logic inside any one rule

## The `order` field: a tiebreaker among rules of the same timing

When more than one Business Rule applies to the same table and the same timing — say, two
Before-update rules on Incident — the `order` field decides which runs first. It's just a number;
**lower order runs first**. If you don't set it, ServiceNow assigns a default, but relying on
the default is how two unrelated rules end up fighting over the same field in an order you didn't
choose. Any time two Before rules on the same table both touch `urgency`, for example, their
`order` values decide who wins.

```text
Before rules on Incident, both update-triggered:
  order 100 — "Auto-escalate urgency for Priority 1"
  order 200 — "Clear urgency when priority is cleared"
```

Rule at order 100 runs first, in full, before order 200 even starts.

## The real overall sequence, end to end

Across an entire save operation, the sequence is fixed and consistent:

1. All applicable **Before** Business Rules run, in `order`.
2. The actual **database write** happens.
3. All applicable **After** Business Rules run, in `order`.
4. Any applicable **Async** Business Rules are **queued** to run later, in the background.

```text
User clicks Save
   |
   v
[Before rules, in order]  --->  [DATABASE WRITE]  --->  [After rules, in order]
                                                              |
                                                              v
                                                   [Async rules queued, run later]
```

Display rules sit outside this entire sequence — they run on form load, not on save, so they
never appear in this chain at all.

## Table inheritance: a rule on a base table runs everywhere beneath it

Course 2's table-hierarchy lesson covered how `incident`, `problem`, and `change_request` each
extend the base `task` table. That inheritance isn't just a schema convenience — it applies to
Business Rules too. A Business Rule defined directly on `task`, with no table-specific scoping,
runs for **every table that extends it**: every Incident save, every Problem save, every Change
save, all triggered by the one rule on the parent table.

```javascript
// A Business Rule on the base "task" table, Before update
(function executeRule(current, previous) {

    // This fires for Incident, Problem, AND Change — current.sys_class_name
    // tells you which one you're actually looking at
    if (current.active == false && current.sys_class_name == 'incident') {
        current.state = 7; // Closed, Incident-specific state value
    }

})(current, previous);
```

This is a real, important inheritance behavior, and it cuts both ways. Put broad, safe logic on
`task` and every extending table benefits for free. Put logic there that only makes sense for one
table — like the `state = 7` above, without the `sys_class_name` check — and you'll silently
break every other table that extends `task`.

## Key terms

| Term | Meaning |
|---|---|
| `order` | A numeric field on a Business Rule; lower values run first among rules of the same timing on the same table |
| Execution sequence | Before rules (in order) → database write → After rules (in order) → Async rules queued |
| Table inheritance | A Business Rule on a base table (like `task`) also runs for every table that extends it |
| `sys_class_name` | A field identifying the actual extended table a record belongs to, useful when a base-table rule needs to branch |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: if you activate a new Business
Rule on `task` with no Filter Conditions, which tables besides Incident could start seeing its
effects, and why?
