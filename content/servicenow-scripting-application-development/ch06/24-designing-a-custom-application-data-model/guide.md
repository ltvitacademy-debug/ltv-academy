# Lesson 24 — Designing a Custom Application Data Model

**Chapter 6 · Tables, Forms & Modules for a Custom Application · Lesson 24 of 37**

## What you'll learn

- How to identify the real entities a brand-new custom application actually needs, before opening Studio
- The concrete decision rule for extending `task` versus building a standalone table
- How a reference field and the related list on the other side plan one relationship from both directions
- Why skipping this planning step is the single most common cause of a custom app that needs to be rebuilt

## Recap: the tools you already brought into this chapter

ServiceNow Platform Fundamentals' Tables & Relationships chapter taught you how `sys_dictionary`
defines a field, how a table can extend another table to inherit its fields and behavior, and how
`task` sits underneath `incident`, `problem`, `change_request`, and the Service Catalog's request
tables, giving all of them `state`, `assignment_group`, and priority logic for free. Chapter 5 of
this course then taught you how a scoped application (`x_acme_...`) keeps a custom app's own
tables isolated from the global scope. This lesson combines both: you're about to design tables
that live inside a scope you already know how to create, using the exact same extension and
dictionary rules you already know. Nothing about the underlying platform mechanics is new here —
what's new is doing the design work yourself, for a table nobody has built for you yet.

## Finding the real entities first

Before any table gets a name, write down the nouns your application actually needs to track —
not the screens, not the buttons, the *things*. Take a concrete example: a Facilities team wants
a custom app for booking shared conference rooms. Two real entities fall out immediately. A
**Room** — a physical space with a name, a building, a floor, and a seating capacity, that simply
exists whether or not anyone ever books it. And a **Room Booking** — a specific request from a
specific employee to use a specific room at a specific time, which has to be approved or denied
and has a lifecycle from the moment it's submitted to the moment the meeting ends. Those two
nouns behave completely differently, and that difference is exactly what the next section turns
into a table design decision.

## Extend `task`, or stand alone? The real decision rule

Ask one question about each entity: **does it need to be routed, approved, or tracked through a
state machine?** A Room Booking clearly does — it moves through something like Requested,
Approved, Denied, and Completed, it needs to be assigned to whoever manages room conflicts, and it
plausibly needs a priority if two requests collide. That's precisely the shared behavior `task`
already provides for free, the same way it does for `incident` and `change_request`. The right
call is to make **Room Booking extend `task`**, inheriting `state`, `short_description`,
`assignment_group`, and priority instead of rebuilding all of it from scratch. A Room, on the
other hand, has no lifecycle at all — it doesn't move through states, it isn't assigned to
anyone, it just sits there as a fact: this room exists, holds twelve people, and is on the third
floor. Extending `task` for Room would mean inheriting a `state` field and an `assignment_group`
field that make no sense on a static reference record and would only confuse anyone looking at
the form. The right call is a **standalone table** with no parent, the same way a lookup or
catalog table would be designed. This is the rule to carry forward: workflow and routing point to
`task`; static, descriptive, lookup-style data points to no parent at all.

## Planning the relationship: a reference field, and the view from the other side

With both tables decided, plan how they connect. Room Booking needs a **reference field** —
call it `room` — pointing at the Room table, so each booking stores a clean pointer to exactly
which room was requested instead of a free-text room name someone has to interpret later. That's
the same reference-field pattern Course 2 covered: a field that displays a readable value (the
room's name) while storing a `sys_id` underneath. The relationship also has a second, reverse
view worth planning now, even though building it is Lesson 25's job: open to a specific Room
record, and a **related list** at the bottom of that form can show every booking that points back
at it — Course 2's related-list pattern, applied to a table you designed yourself. Planning both
directions of the relationship before building anything means you won't discover a missing
related list after the app is already in daily use.

## Key terms

| Term | Meaning |
|---|---|
| Entity | A real-world "thing" your application needs to track, identified before any table is built |
| Extends `task` | The right choice for an entity needing state, routing, or approval tracking |
| Standalone table | A table with no parent, the right choice for static, lookup-style, non-workflow data |
| Reference field | A field on one table pointing at a record on another, storing a `sys_id` behind a readable value |
| Related list | The reverse view of a reference field, shown on the form of the table being pointed at |

## Check yourself

Without looking back: for a Room Booking table that extends `task`, and a Room table that stands
alone, which of the two inherits a `state` field automatically, and why would giving that same
`state` field to the Room table have been the wrong design choice?
