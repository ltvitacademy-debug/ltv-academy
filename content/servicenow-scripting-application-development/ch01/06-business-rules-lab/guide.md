# Lesson 6 — Business Rules Lab

**Chapter 1 · Business Rules · Lesson 6 of 37**

## What you'll learn

- How to design a Before Business Rule that auto-populates a field before the single save
- How to design an After Business Rule that reacts to a specific change, not every save
- How to apply `current.operation()`, Filter Conditions, and `previous` together in real scripts
- How to walk through exactly what happens, step by step, when each rule fires
- How to avoid every mistake from Lesson 5 while building something real

## The scenario

Your team lead hands you two real requests for the Incident table:

1. When a new incident is created, automatically set its `assignment_group` based on its
   `category`, so agents aren't manually routing every ticket.
2. When an incident's priority escalates to Critical (priority 1), notify the assigned agent's
   manager — but only at the moment it escalates, not on every later save of an already-Critical
   incident.

These map cleanly onto what this chapter covered: request 1 needs a **Before insert** rule
(modify `current` before the one save happens); request 2 needs an **After update** rule that
uses `previous` to detect the actual change.

## Business Rule 1: auto-assign on insert

**Table:** Incident · **When:** Before · **Insert:** checked, Update/Delete: unchecked
**Order:** 100 · **Filter Conditions:** none needed — every new incident should be routed

```javascript
// Name: "Auto-assign group by category"
// Table: incident | When: before | Insert: true
(function executeRule(current, previous) {

    // Only meaningful on insert — this rule's checkboxes already guarantee that,
    // but current.operation() makes the intent explicit and safe if reused later
    if (current.operation() != 'insert') {
        return;
    }

    var groupByCategory = {
        'network':   'Network Support',
        'hardware':  'Desktop Support',
        'software':  'Application Support',
        'database':  'Database Administration'
    };

    var groupName = groupByCategory[current.category.toString()];

    if (groupName) {
        var group = new GlideRecord('sys_user_group');
        group.addQuery('name', groupName);
        group.query();
        if (group.next()) {
            current.assignment_group = group.sys_id;
        }
    }

})(current, previous);
```

Walk through it: this is a Before rule, so it runs inside the same transaction as the insert,
before the record is written. It looks up the matching group by name, and if found, sets
`current.assignment_group` directly — no `current.update()` call, because Before-rule field
changes are automatically included in the one save that's about to happen. One write, correctly
routed, every time.

## Business Rule 2: notify the manager on real escalation

**Table:** Incident · **When:** After · **Update:** checked, Insert/Delete: unchecked
**Advanced:** checked (required to access `previous`) · **Order:** 100
**Filter Conditions:** Priority changes (keeps the rule from running needless `if` checks on
unrelated field edits — the mistake Lesson 5 covered)

```javascript
// Name: "Notify manager on Critical escalation"
// Table: incident | When: after | Update: true | Advanced: true
(function executeRule(current, previous) {

    // Detect the actual escalation moment, not every save of an already-Critical incident
    var justEscalated = (current.priority == 1 && previous.priority != 1);

    if (!justEscalated) {
        return;
    }

    var agent = new GlideRecord('sys_user');
    if (!agent.get(current.assigned_to)) {
        return; // unassigned — nobody to find a manager for
    }

    var manager = new GlideRecord('sys_user');
    if (manager.get(agent.manager)) {
        gs.eventQueue('incident.priority.escalated', current,
            manager.sys_id, current.number);
    }

})(current, previous);
```

Walk through it: this is an After rule, so it runs once the priority-1 save is already safely
committed — the right moment to look up and act on *other* records (`sys_user`), exactly as
Lesson 2 described. The `previous.priority != 1` check is what makes this fire only once, at the
real moment of escalation, instead of on every subsequent save of a Critical incident — the exact
mistake Lesson 4 and Lesson 5 both warned about. The Filter Condition on priority changes means
the rule's script body doesn't even run for edits that have nothing to do with priority at all.

## Why this pair of rules doesn't repeat Chapter 1's mistakes

- No infinite loop: Rule 1 never calls `current.update()`; Rule 2 never writes back to Incident
  at all, only reads related records and queues an event.
- `current.operation()` and the rule's own checkboxes agree on when each should run.
- Rule 1's field changes happen in Before, in the same single write — no second save.
- Rule 2's Filter Condition keeps it from running needless checks on irrelevant saves.
- Neither rule lives on the base `task` table, so neither accidentally reaches Problem or Change.

## Key terms

| Term | Meaning |
|---|---|
| Before insert | The correct timing for request 1 — modifying a brand-new record before its one save |
| After update + Advanced | The correct timing for request 2 — reacting to a committed change using `previous` |
| `gs.eventQueue()` | Queues a ServiceNow event, commonly used to trigger notifications from a Business Rule |
| Escalation check | `current.field == target && previous.field != target` — fires once, at the real moment of change |

## Check yourself

You're ready for the next chapter when you can explain, without looking: if Rule 2's Filter
Condition were removed entirely, would the rule still correctly detect only a real escalation —
and what would it cost the server to get there?
