# Lesson 5 — Common Business Rule Mistakes

**Chapter 1 · Business Rules · Lesson 5 of 37**

## What you'll learn

- How a Business Rule accidentally triggers an infinite loop, and the real fix
- Why skipping a `current.operation()` check breaks logic meant for only one case
- Why putting logic in "after" when it belongs in "before" causes a wasted second write
- Why missing Filter Conditions silently runs a rule on every single change
- Why overly broad logic on a base table's rule leaks into tables it was never meant for

## Mistake 1: the infinite loop

The classic Business Rule bug: a rule on Incident that, on update, updates the Incident again —
with no condition excluding its own change. Each update it performs re-triggers the same rule,
which updates again, which re-triggers again, until the platform's recursion limit kills the
transaction with an error.

```javascript
// BROKEN — update-triggered rule that re-triggers itself forever
(function executeRule(current, previous) {

    current.work_notes = 'Rule ran at ' + gs.nowDateTime();
    current.update(); // <-- re-triggers THIS SAME update rule

})(current, previous);
```

The real fix: check `current.operation()` or add a condition that only lets the logic run when
it hasn't already been applied — for example, only setting `work_notes` when it's actually
different from what you're about to write, or simply not calling `current.update()` at all inside
a Before rule, since Before-rule field changes are already included in the save with no extra
call needed.

## Mistake 2: not checking the operation

A Business Rule can be set to run on insert, update, and delete all at once. If the script
assumes it's only ever running for one of those, it can apply the wrong logic at the wrong time.

```javascript
// BROKEN — meant for insert only, but the rule also fires on update and delete
(function executeRule(current, previous) {

    current.opened_at = gs.nowDateTime(); // overwrites opened_at on every update too!

})(current, previous);
```

```javascript
// FIXED — guard with current.operation()
(function executeRule(current, previous) {

    if (current.operation() == 'insert') {
        current.opened_at = gs.nowDateTime();
    }

})(current, previous);
```

## Mistake 3: logic in "after" that belongs in "before"

If a Business Rule's job is to modify a field on the *same* record being saved, and it's set to
"after" instead of "before," the rule has to call `current.update()` itself — triggering a second
database write for every single save, instead of modifying the record before its one and only
write.

```javascript
// WASTEFUL — "after update" rule calling current.update() a second time
(function executeRule(current, previous) {

    current.urgency = (current.priority == 1) ? 1 : current.urgency;
    current.update(); // a second, unnecessary write

})(current, previous);
```

Moving this exact logic to a Before rule and deleting `current.update()` gets the same result
with one write instead of two.

## Mistake 4: missing Filter Conditions

Without Filter Conditions scoping exactly when a Business Rule should run, it executes on *every*
insert, update, or delete on that table — even changes that have nothing to do with the fields
the rule actually cares about. A rule meant to react only to priority changes, with no Filter
Condition on priority, still runs (and wastes server resources checking its own `if` logic) on
every unrelated field edit too.

## Mistake 5: overly broad logic on a base-table rule

As Lesson 3 covered, a Business Rule on `task` reaches Incident, Problem, and Change Request
alike. Writing table-specific logic there without a `sys_class_name` guard — or without scoping
the rule to one table in the first place — is how one developer's Incident fix becomes another
team's broken Change Request.

## Key terms

| Term | Meaning |
|---|---|
| Infinite loop | A rule that updates the same table it runs on with no condition stopping it from re-triggering itself |
| `current.operation()` | Returns `'insert'`, `'update'`, or `'delete'` — used to guard logic meant for only one case |
| Filter Conditions | Rule-level scoping that limits exactly when a Business Rule should execute |
| Wasted second write | Modifying the same record in an After rule instead of a Before rule, forcing an extra `current.update()` |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why does calling
`current.update()` inside a Before rule cause problems, when the exact same call is often
necessary inside an After rule?
