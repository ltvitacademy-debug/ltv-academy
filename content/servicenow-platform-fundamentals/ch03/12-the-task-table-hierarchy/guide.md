# Lesson 12 — The Task Table Hierarchy

**Chapter 3 · Tables & Relationships · Lesson 12 of 34**

## What you'll learn

- The real table names behind Incident, Problem, Change, and the Service Catalog
- How `sc_request` and `sc_req_item` fit into the hierarchy indirectly
- Why this one hierarchy explains most of the ITSM behavior you studied in Course 1
- How to picture the hierarchy as a tree you can navigate with confidence

## The family tree under `task`

Lesson 11 established that `task` is a base table other tables extend. Now put real
names on the tree. Directly extending `task`: `incident`, `problem`, and
`change_request`. Each of those is a real table name you'll use constantly as an
admin — `incident.list` and `incident.do` from Lesson 5's direct-navigation shortcut
work because `incident` is a genuine table, not a label painted over `task`.

```
task
  |-- incident
  |-- problem
  |-- change_request
  |-- sc_request
        |-- sc_req_item
```

## Where the Service Catalog fits

The Service Catalog's request structure is slightly deeper. When someone submits a
catalog request — ordering a laptop, requesting software access — ServiceNow creates
a **request** record on `sc_request`, which itself extends `task`. That request can
contain multiple **requested items**, each one a record on `sc_req_item`, which
extends `sc_request`. So a single laptop order might produce one `sc_request` (the
overall order) and one `sc_req_item` (the specific laptop line item) — and both of
them, by extension, are also task records underneath it all. This two-level
structure under `task` is why a catalog request can have a single overall state
while each item inside it tracks its own fulfillment separately.

## Why this explains Course 1's ITIL practices

In your first course in this path, you learned Incident, Problem, and Change
Management as distinct ITIL practices with distinct purposes. Now you can see the
technical reason they felt so similar to administer: an incident, a problem, and a
change request all extend the exact same base table. The `state` field that drives
an incident's lifecycle (New, In Progress, Resolved, Closed) is the same `state`
field mechanism driving a change request's lifecycle. The assignment-group routing
you configure for incidents works the same way for problems. Priority, calculated
from impact times urgency, is `task`-level logic, not logic written three separate
times for three separate tables.

## Navigating the hierarchy with confidence

When you're unsure whether a behavior you're looking at is specific to one table or
shared platform-wide, ask: does this field exist on `task` itself, or only on the
specific child table? If it's on `task`, you can expect to find the same field,
behaving the same way, on every table in this hierarchy — including custom tables an
admin later builds by extending `task` for a brand-new kind of work item, such as a
facilities request or an HR case. If it's not on `task`, it's specific to that one
branch, like `caller_id` only making sense on an incident, never on a change request.

## Key terms

| Term | Meaning |
|---|---|
| `incident` | Table for unplanned service interruptions; extends `task` |
| `problem` | Table for root-cause investigations; extends `task` |
| `change_request` | Table for planned, controlled changes; extends `task` |
| `sc_request` / `sc_req_item` | Service Catalog's overall request and its individual requested items; extend `task` through two levels |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why does a single
catalog order for a laptop produce two separate records (one `sc_request`, one
`sc_req_item`), and how are both of them still, underneath it all, task records?
