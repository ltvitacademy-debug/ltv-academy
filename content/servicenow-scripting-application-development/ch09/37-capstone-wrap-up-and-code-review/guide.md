# Lesson 37 — Capstone Wrap-Up & Code Review

**Chapter 9 · Capstone: a Custom Scoped Application · Lesson 37 of 37**

## What you'll learn

- How to run a real code review against the finished equipment-checkout application
- A genuine GlideRecord performance fix, and why it matters at scale
- How to confirm a Business Rule's order and condition are actually correct
- How to confirm a Client Script stays properly isolated from the rest of the form
- How this course's full-stack scripting skills connect to what comes next

## Reviewing EquipmentAvailabilityChecker for performance

The Script Include built in Lesson 36 already used `gr.hasNext()` rather than counting rows — but
it's worth stating explicitly why that choice mattered, as the kind of fix a real code review
would flag if it were missing:

```javascript
// Flagged in review: counts every matching row just to check existence
if (gr.getRowCount() > 0) { /* equipment is unavailable */ }

// Fixed: stops scanning at the very first match
if (gr.hasNext()) { /* equipment is unavailable */ }
```

`getRowCount()` forces the database to count every row that matches the query before your code
even looks at one of them. `hasNext()` only needs to find one. For a table that might eventually
hold years of equipment-request history, that's the difference between a query that scales and
one that silently gets slower every year — exactly the class of GlideRecord pitfall this course
flagged back when Chapter 1's Business Rule lessons first introduced querying `current` and
related tables.

## Reviewing the Business Rule's order and condition

A code review of a Business Rule checks three things: *when* does it run, *what* table and
operation is it scoped to, and *does its condition actually match the intent*. For
`EquipmentAvailabilityChecker`'s calling Business Rule:

- **When**: it's set to run **before** insert — the only timing that lets `setAbortAction(true)`
  stop the record from ever being written, consistent with Chapter 1's before/after distinction.
- **Table/operation**: it's scoped to `x_acme_eqchk_request`, insert only — it has no business
  running on update, since an existing request's equipment reference shouldn't normally change.
- **Condition**: a reviewer should confirm the rule doesn't run needlessly. A tightened condition
  script makes that explicit rather than relying on "insert" alone:

```javascript
// Business Rule condition field — only run when an equipment value is actually set
current.equipment.nil() == false
```

Without this, the rule would still run correctly on every real insert — but adding the explicit
condition documents the intent for the next developer who opens this Business Rule, and skips the
query entirely on the rare case where an equipment field somehow comes in empty.

## Reviewing the Client Script for isolation

Chapter 2 covered Isolate Script and the client-side sandbox in depth. A review of the `onChange`
Client Script confirms it stays inside that sandbox correctly: it never touches the DOM directly,
never references `jQuery` or `Prototype`, and only calls supported client-side APIs —
`g_form.addErrorMessage()` and `GlideAjax`. That means **Isolate Script** can safely stay checked
(ServiceNow's default for new Client Scripts), running the script in its own scope away from the
rest of the page's JavaScript, with no compatibility risk.

## What this application actually demonstrates

Stepping back, this four-lesson build is a working, if small, real ServiceNow application: a
scoped application boundary (Chapter 5), a custom data model with a reference field (Chapter 6),
a field-level ACL (the security model this course assumes from earlier in the path), a
class-based Script Include (Chapter 3), a before-insert Business Rule (Chapter 1), and a
GlideAjax-backed Client Script (Chapter 2). Every chapter in this course contributed one real
piece to one real application — that's the whole point of a capstone: not a new topic, but proof
that the pieces combine into something that actually runs.

## What's still missing — and what's next

This application has no REST-accessible endpoint for an external system to create a request, no
outbound integration to notify a ticketing system when equipment goes overdue, and no versioning
strategy for exposing any of this beyond the ServiceNow UI. Those are exactly the gaps the next
course in this path closes: **ServiceNow IntegrationHub & REST APIs** goes deeper into
authentication schemes, outbound REST calls, and integration patterns that this course deliberately
left out of scope back in Lesson 31.

## Key terms

| Term | Meaning |
|---|---|
| Code review | A structured check of timing, scope, condition, and performance on finished code |
| `hasNext()` vs. `getRowCount()` | Existence check vs. full count — a real, measurable performance difference |
| Business Rule condition | An explicit script documenting exactly when a rule should run, beyond table/operation alone |
| Isolate Script | The Client Script setting that runs a script in its own sandboxed scope |

## Check yourself

Across all four capstone lessons, name one real piece of this application that came from each of
these three chapters: Chapter 1 (Business Rules), Chapter 3 (Script Includes), and Chapter 5
(Scoped Applications). Then, in one sentence, explain what gap in this finished application the
next course — ServiceNow IntegrationHub & REST APIs — exists to close.
