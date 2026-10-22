# Lesson 33 — Capstone: Document the Instance's Table Structure

**Chapter 8 · Capstone: Platform Fundamentals in Practice · Lesson 33 of 34**

## What you'll learn

- How the `task` hierarchy you confirmed in Lesson 32 maps to real records
- How to read a table's dictionary entries instead of guessing at them
- Three field types in practice, on the one table every service desk lives in
- Which related lists you'd expect to find on an Incident form, and why
- How to turn all of this into a short, usable piece of documentation

## Continuing the scenario: walking the task hierarchy

Lesson 32 confirmed Meridian Freight's instance has a `task` table and
the ITSM applications built on it. Now you document how they connect.
From Chapter 3, you know `task` isn't a table anyone works in directly
— it's the parent that `incident`, `problem`, and `change_request` each
extend. On a real instance, you confirm this the same way you'd
confirm anything else: open System Definition \> Tables, find
`incident`, and check its "Extends table" field. It reads `task`. Do
the same for `problem` and `change_request`, and you've just verified,
rather than assumed, the hierarchy this whole ITSM suite is built on.
That one check is worth writing down — it's the first line of your
capstone documentation: *this instance's work-tracking tables follow
the standard task hierarchy, unmodified.*

## Reading the Incident table's dictionary entries

With the hierarchy confirmed, the next step is opening the Incident
table's dictionary — System Definition \> Dictionary, filtered to
`incident` — the same view Chapter 4 walked you through. A dictionary
entry for a field tells you three things at a glance: its column name,
its label, and its type. For documentation purposes, you don't need to
record all 100-plus fields on Incident. You need to record the ones
that tell a reader how the table actually behaves — and three in
particular earn a line each.

## Three field types, in practice

**Priority** is a Choice field — a fixed, predefined list of values
(Critical, High, Moderate, Low, Planning) rather than free text,
exactly the kind of field Chapter 4 taught you to recognize by its
dictionary entry. That matters for documentation because a Choice
field means reporting on priority (Chapter 7's dashboards) is reliable
— the values can't drift. **Caller_id** is a Reference field pointing
at `sys_user` — it doesn't store a name, it stores a `sys_id` that
resolves to a user record, which is exactly why Lesson 32's confirmation
of the `sys_user` base table mattered. **Work_notes** is a Journal
field — it doesn't overwrite on edit, it appends, building a running
log of everything an agent has written on that incident over its
lifetime. Three fields, three types, three different reasons each one
is built the way it is.

## What you'd expect on the Incident form's related lists

Chapter 5 covered related lists as the mechanism that shows you
records from *other* tables that reference the one you're viewing.
On a populated Incident record, you'd expect at least two: a related
list of **Affected CIs** (pointing back at `cmdb_ci`, confirming the
Lesson 32 base table isn't sitting empty) and, depending on what's
configured, a related list tying the incident back to any **Problem**
or **Change** record it's linked to. Finding those populated related
lists is itself evidence the instance is in active, real use — not a
freshly installed shell with no history behind it.

## Writing it up

A capstone documentation note doesn't need to be long to be useful.
Three short sections cover everything above: the confirmed table
hierarchy, the three field types on Incident with one line of
justification each, and the related lists found on a real record.
That's the kind of write-up a new admin hands to a manager in their
first week — proof the instance was actually explored, not assumed.

## Key terms

| Term | Meaning |
|---|---|
| Extends table | A dictionary field showing which table a child table inherits columns from |
| Choice field | A field restricted to a fixed, predefined list of values |
| Reference field | A field that stores a `sys_id` pointing to a record on another table |
| Journal field | A field that appends new entries instead of overwriting the previous value |
| Related list | A view on a form showing records from another table that reference the current one |

## Check yourself

Without opening the dictionary: can you explain, in your own words, why
`caller_id` being a Reference field — rather than a plain text field
that just stores a typed name — matters for reporting accuracy on
Chapter 7's dashboards?
