# Lesson 16 — Common Field Types

**Chapter 4 · Dictionary Entries & Field Types · Lesson 16 of 34**

## What you'll learn

- The everyday field types you'll configure on a dictionary entry's Type attribute
- Why Reference fields are foreign keys, and how they connect back to Lesson 13
- What makes Journal fields distinctly ServiceNow, and why Activity relies on them
- Document ID / Table Name pairs, and the polymorphic-reference problem they solve

## The Type attribute is what you set first

Every dictionary entry has a **Type** attribute — the single most consequential
choice you make when adding a field, because it determines what the database
column stores, how the form renders it, and what other configuration (like a
choice list) becomes available. ServiceNow ships a long list of types, but a
handful cover the overwhelming majority of real fields you'll ever touch.

## The everyday types

**String** is plain text, single-line by default, with a configurable max length;
set it to multi-line and it renders as a text area instead of a single box. **Integer**
stores whole numbers — counts, durations in minutes, anything without a decimal.
**Boolean** (internally `true_false`) renders as a checkbox and stores exactly two
states. **Date/Time** stores a timestamp and displays it converted to each viewer's
personal time zone — the same per-user preference from Lesson 9's navigation lab.
**Choice** points at a predefined list of valid values rather than free text — Lesson
17 is dedicated entirely to how those lists are built and configured.

## Reference fields — the foreign key from Lesson 13

A **Reference** field doesn't store a value directly; it stores the `sys_id` of a
record on another table, exactly like a foreign key in a relational database.
Incident's `caller_id` field is a Reference into the `sys_user` table — the
dictionary entry's **Reference** attribute names `sys_user` as the target, which is
what lets the field render as a searchable lookup instead of a free-text box, and
is what Lesson 13 called a relationship rather than a plain field. **Glide List**
is the closely related multi-value cousin: instead of one reference, it stores a
comma-separated set of `sys_id`s, used for fields like Incident's Watch list, where
more than one user needs to be linked.

## Journal fields — distinctly ServiceNow

**Journal** is a type you won't find in a typical relational database tutorial, and
it's worth learning on purpose. A Journal field is **append-only**: every entry a
user adds is preserved as its own timestamped, attributed record, rather than
overwriting the field's previous value the way an ordinary String field would.
Incident's **Additional comments** and **Work notes** fields are both Journal
fields — that's why the Activity formatter on an incident form shows a running,
timestamped history of every comment ever added, by whom, instead of just the
latest one. Setting a field's type to Journal is what makes that running-history
behavior possible; nothing about it is hand-built per table.

## A few more worth knowing

**Currency** stores both an amount and a currency code together, so a value
displays correctly regardless of which currency the viewer expects. **Document ID**
and **Table Name** are a specific pair used together to solve the **polymorphic
reference** problem — a case where a field needs to point at a record that could
live on any of several different tables, not one fixed table the way a normal
Reference field requires. The Table Name field stores which table the linked record
lives on, and the Document ID field stores that record's `sys_id`; read together,
the pair resolves to the right record on the right table, something a single
ordinary Reference field type can't do.

## Key terms

| Term | Meaning |
|---|---|
| Reference | A field type storing another record's `sys_id` — a foreign key to a named target table |
| Journal | An append-only field type where every entry is preserved with a timestamp and author |
| Glide List | A multi-value Reference, storing a comma-separated set of `sys_id`s |
| Document ID / Table Name | A field pair solving polymorphic references — pointing at a record on any of several tables |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why can't a
single ordinary Reference field type point at "whichever table this record happens
to live on," and what two-field pair solves that problem instead?
