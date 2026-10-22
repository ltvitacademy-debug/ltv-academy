# Lesson 14 — Tables & Relationships Lab

**Chapter 3 · Tables & Relationships · Lesson 14 of 34**

## What you'll learn

- How to decide what base table a brand-new custom table should extend
- How to plan which reference fields a new table actually needs
- How to reason through this design on paper, the way you would in a real design review
- How this chapter's four ideas — tables, extension, hierarchy, references — combine in one decision

## The scenario

Your manager asks you to sketch the data model for a new custom application:
**Equipment Request**, used when an employee needs a one-off piece of hardware
that isn't in the standard new-hire kit — a second monitor, a graphics tablet, a
specialized dock. Before anyone opens Studio or touches **System Definition >
Tables**, you're asked to think through the design on paper: what should this new
table extend, and what reference fields does it need? This is exactly the kind of
planning conversation a real ServiceNow admin has before building anything.

## Step 1 — What should this table extend?

Walk through the candidates. A brand-new table built on nothing at all (no base
table) would have to reinvent `state`, `assignment_group`, `priority`, and approval
tracking from scratch — a lot of duplicated effort for behavior ServiceNow already
provides. `cmdb_ci` is the wrong fit entirely: an equipment *request* isn't a
configuration item, it's a request *for* one. The right answer is `task`. An
Equipment Request clearly needs a lifecycle (requested, approved, fulfilled,
closed), it needs to be routed to an assignment group (likely a hardware or
facilities team), and it will plausibly need approval tracking somewhere in its
process — all of that is exactly the shared behavior Lesson 11 showed living on
`task`. Extending `task` means this new table inherits `state`,
`short_description`, `assignment_group`, and `priority` for free, the same way
`incident` and `problem` do, and only needs to add fields specific to an equipment
request on top.

## Step 2 — What reference fields does it need?

With the base table settled, think through what this table needs to *point at*.
Two reference fields stand out immediately. First, `requested_for` — a reference
field pointing to `sys_user`, identifying which employee the equipment is for (not
necessarily the same person submitting the request; an admin might submit it on
someone else's behalf). Second, `equipment_item` — a reference field pointing to a
catalog-style table listing the specific hardware items available to request (a
monitor model, a tablet model), so the request stores a clean pointer to exactly
which item was chosen rather than a free-text description someone has to interpret
later. Both of these follow the exact pattern from Lesson 13: a field that displays
a readable value but stores a `sys_id`, with auto-complete and a preview icon built
in for free.

## Step 3 — What this planning conversation produced

Lay the finished design out the way you'd present it in a review: Equipment Request
extends `task`, inheriting lifecycle and routing behavior; it adds `requested_for`
(reference to `sys_user`) and `equipment_item` (reference to the equipment catalog
table) as its own fields, on top of what it inherited. Nothing here required
opening the platform yet — this is the exact sequence of questions (what do I
extend, what do I need to point at) that should happen *before* a single table or
dictionary entry gets created, because fixing a wrong "Extends table" choice after
records already exist is far more disruptive than getting it right on paper first.

## What you just practiced

You combined all four ideas from this chapter in one real decision: recognizing
that structure is metadata (Lesson 10), choosing to extend a base table instead of
starting from nothing (Lesson 11), reasoning about where a new table fits in the
existing hierarchy (Lesson 12), and planning its reference fields before building
anything (Lesson 13). That's the same sequence a working ServiceNow admin or
developer runs through before every new custom table.

## Key terms

| Term | Meaning |
|---|---|
| Design review (on paper) | Planning a table's extension and reference fields before building anything in the platform |
| `requested_for` | A planned reference field pointing to `sys_user`, identifying who the request is for |
| `equipment_item` | A planned reference field pointing to a catalog table of requestable hardware |
| Extends `task` | The right fit here, since the table needs lifecycle, routing, and priority behavior `task` already provides |

## Try it yourself

Before moving to Chapter 4, sketch one more table on your own: a "Facilities
Request" for things like a broken chair or a lighting issue. Decide what it should
extend and name at least two reference fields it would need — without opening your
developer instance.
