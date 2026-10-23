# Lesson 34 — Capstone Kickoff: Application Requirements

**Chapter 9 · Capstone: a Custom Scoped Application · Lesson 34 of 37**

## What you'll learn

- The real requirement this capstone solves, and the actors involved
- How to turn a vague ask ("track our equipment") into a concrete workflow
- Why this build gets its own application scope, using Chapter 5's reasoning
- Which tables the requirement implies, as a preview of Chapter 6's data-modeling work
- How to sanity-check a requirement against existing data before building anything

## The requirement: equipment goes out, and nobody tracks it

IT hands out laptops, monitors, and loaner badges to employees constantly, and right now the only
record of who has what is a shared spreadsheet that's perpetually out of date. The ask from IT
leadership is simple to say and real to build: employees should be able to request equipment,
their manager should approve it, IT should fulfill and track the checkout, and anything overdue
should trigger a reminder automatically. That's four distinct actors and four distinct steps — the
same shape as any approval-driven process this course has touched, but it's yours to build end to
end, starting here and finishing in Lesson 37.

## The workflow, actor by actor

- **Employee** — submits a request naming a specific piece of equipment and a needed-by date.
- **Manager** — approves or rejects the request before anything is fulfilled.
- **IT equipment admin** — fulfills an approved request, marking the item checked out, and later
  marks it returned.
- **The platform itself** — flags a request as overdue once the due date passes, the same kind of
  time-driven check Lesson 32 covered with scheduled scripts.

This is an approval-then-fulfillment pattern, not a simple submit-and-done form. That single fact
drives the data-model decision in Lesson 35: the main table needs to inherit a real approval/state
workflow, not reinvent one from scratch.

## Does this need its own scope?

Chapter 5 answered this question in the abstract — Lesson 19 showed that Global is one flat
namespace where two unrelated customizations both naming a table "request" collide, and Lesson 20
walked through creating a scoped application to avoid exactly that. This requirement checks both
boxes that justify a new scope: the table names ("request", "equipment") are generic enough to
plausibly collide with something else in this instance, and nothing outside this feature has any
business reading or writing equipment-checkout data directly. That makes the call easy — this
capstone lives in its own scope, `x_acme_eqchk`, created the same way Lesson 20 demonstrated.

## Sketching the tables this requirement implies

Before writing a single field, the requirement itself already implies two tables:

- A **request** table that carries the approval state, who requested it, who approved it, and the
  due/checkout/return dates. Because it needs an approval workflow, it should **extend `task`**
  rather than start from a bare custom table — `task` already gives it `state`, `assigned_to`,
  `opened_by`, and the approval plumbing this process needs, the same inheritance idea Chapter 6
  will build on directly.
- An **equipment** lookup table — the actual inventory: asset tag, name, category, condition, and
  current availability. This one does *not* extend `task`; it's reference data, not a workflow
  record.

## Checking reality before committing to a design

A requirement sounds clean in a meeting; real data is never that tidy. Before Lesson 35 locks in
field names, it's worth running a quick background script to see whether any equipment-shaped data
already exists elsewhere in the instance — a check analogous to the discovery work before any of
this course's earlier labs:

```javascript
// Background script — run once during requirements discovery.
// Is there already equipment-related data hiding in generic task tables?
var gr = new GlideRecord('sc_task');
gr.addQuery('short_description', 'CONTAINS', 'laptop');
gr.addOrCondition('short_description', 'CONTAINS', 'monitor');
gr.query();

gs.info('Existing laptop/monitor-related catalog tasks found: ' + gr.getRowCount());
```

Finding zero matches here (as this discovery pass does) confirms there's no legacy data to
migrate — a clean build. The planned fields for the new request table can be sketched as a simple
object literal for the design doc, with the real build happening in Lesson 35:

```javascript
// Planned x_acme_eqchk_request fields — not built yet, finalized in Lesson 35
var plannedRequestFields = {
    equipment:     'Reference -> x_acme_eqchk_equipment',
    requested_for: 'Reference -> sys_user',
    approved_by:   'Reference -> sys_user',
    due_date:      'Date/Time',
    checkout_date: 'Date/Time',
    return_date:   'Date/Time'
};
```

## Key terms

| Term | Meaning |
|---|---|
| Requirement | A real business need (equipment loans going untracked) restated as concrete actors and steps |
| Approval-then-fulfillment pattern | A workflow where a request must be approved before it's acted on — justifies extending `task` |
| Lookup table | A reference table (equipment) that holds data to be pointed at, not a workflow record itself |
| Discovery script | A quick background script run before design, to confirm no conflicting data already exists |

## Check yourself

Without looking back: which of the two tables this requirement implies should extend `task`, and
which specific feature of `task` makes that the right call rather than building from a bare custom
table?
