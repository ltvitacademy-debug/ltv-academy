# Lesson 14 — Script Includes Lab

**Chapter 3 · Script Includes · Lesson 14 of 37**

## What you'll learn

- How to plan a class-based Script Include before writing a line of code
- Building a real base class, `TaskUtils`, with a working `getOverdueDays()` method
- Extending it into a real child class, `IncidentUtils`, with its own `isMajorIncident()` method
- Calling the parent's `initialize` correctly from the child, end to end
- Wiring the finished classes into a Business Rule, the way they'd actually be used

## The scenario

A real ServiceNow platform detail grounds this lab: the Incident
table doesn't stand alone — it **extends** the Task table, inheriting
fields like `short_description`, `due_date`, and `assigned_to`.
Problem, Change, and Incident are all specializations of Task. Your
Script Includes should mirror that same relationship: a general
`TaskUtils` class with logic that applies to any task-like record,
and a more specific `IncidentUtils` class that extends it with
incident-only logic.

The requirement: write a reusable `getOverdueDays(gr)` method that
works on any task-like GlideRecord, then an incident-specific
`isMajorIncident(gr)` method that uses it.

## Step 1 — Build the base class, `TaskUtils`

```javascript
var TaskUtils = Class.create();
TaskUtils.prototype = {
    initialize: function() {
        this.msPerDay = 1000 * 60 * 60 * 24;
    },

    getOverdueDays: function(gr) {
        var dueValue = gr.getValue('due_date');
        if (!dueValue)
            return 0;

        var due = new GlideDateTime(dueValue);
        var now = new GlideDateTime();
        var diffMs = now.getNumericValue() - due.getNumericValue();

        if (diffMs <= 0)
            return 0; // not overdue yet

        return Math.floor(diffMs / this.msPerDay);
    },

    type: 'TaskUtils'
};
```

`getOverdueDays` works on `due_date`, a field every Task-derived
record has — so it's correct to put it here, in the general class,
rather than duplicating it inside every specific one.

## Step 2 — Extend it into `IncidentUtils`

```javascript
var IncidentUtils = Class.create();
IncidentUtils.prototype = Object.extendsObject(TaskUtils, {
    initialize: function() {
        TaskUtils.prototype.initialize.call(this);
        this.majorPriority = '1';
        this.majorImpact = '1';
    },

    isMajorIncident: function(gr) {
        return gr.getValue('priority') === this.majorPriority &&
            gr.getValue('impact') === this.majorImpact;
    },

    type: 'IncidentUtils'
});
```

`isMajorIncident` only makes sense for incidents — Problem and
Change don't have a "major incident" concept — so it belongs here,
in the child class, not in `TaskUtils`. Note the first line of
`initialize`: it calls `TaskUtils.prototype.initialize.call(this)`
before setting its own properties, so `this.msPerDay` is guaranteed
to exist by the time any inherited method needs it.

## Step 3 — Wire it into a Business Rule

```javascript
// Business Rule: before update, on the Incident table
(function executeRule(current, previous) {
    var utils = new IncidentUtils();
    var overdueDays = utils.getOverdueDays(current); // inherited from TaskUtils

    if (utils.isMajorIncident(current) && overdueDays > 0) {
        current.work_notes = 'Major incident is ' + overdueDays +
            ' day(s) past its due date.';
    }
})(current, previous);
```

One `new IncidentUtils()` gives the Business Rule both the inherited
`getOverdueDays` and the incident-specific `isMajorIncident`, called
side by side — exactly the payoff real inheritance is supposed to
deliver.

## Step 4 — Check the design decision

Why extend instead of writing `isMajorIncident` directly inside a
single, monolithic `IncidentUtils` with no parent at all? Because
`getOverdueDays` is genuinely general — a future `ProblemUtils` or
`ChangeUtils` can extend `TaskUtils` too, and get overdue-day logic
for free, written once. That's the real IS-A test from Lesson 13
paying off in a concrete build.

## Key terms

| Term | Meaning |
|---|---|
| Task table | The real ServiceNow base table that Incident, Problem, and Change all extend |
| Base class | The general-purpose parent — `TaskUtils` here — holding logic shared by every specialization |
| Child class | The specific class — `IncidentUtils` here — adding behavior only its own domain needs |
| `getNumericValue()` | A real `GlideDateTime` method returning milliseconds, used here to compute elapsed time |

## Check yourself

Without looking back: if a future developer needed the same
overdue-day logic for the Problem table, what would they need to
write — and what would they get for free, purely because
`getOverdueDays` lives on `TaskUtils` instead of inside
`IncidentUtils`?
