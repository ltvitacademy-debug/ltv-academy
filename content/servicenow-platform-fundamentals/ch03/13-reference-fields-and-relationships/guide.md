# Lesson 13 — Reference Fields & Relationships

**Chapter 3 · Tables & Relationships · Lesson 13 of 34**

## What you'll learn

- What a reference field is, and why it's ServiceNow's version of a foreign key
- What's actually stored underneath a reference field's display value
- How the auto-complete and preview-icon UI behavior works, and why
- What a related list is, and how it's the reverse direction of a reference field

## A reference field is ServiceNow's foreign key

A **reference field** is a field on one table that points to a specific record on
another table. The clearest example you've already seen conceptually: `incident`
has a `caller_id` field that references a record on `sys_user` — the person who
reported the incident. Relationally, this is exactly a foreign key: one table's
field holds a pointer to a row in another table, rather than duplicating that row's
data inline.

## What's actually stored: the `sys_id`, not the name

Here's the detail that trips up a lot of new admins: a reference field like
`caller_id` *displays* the caller's name — "Fred Luddy," say — but what it actually
*stores* is that `sys_user` record's `sys_id`. The name you see on the form is a
live lookup against the referenced record's display value, not text sitting in the
`caller_id` column itself. If that user's name is ever changed in `sys_user`, every
incident referencing them updates its displayed name automatically, because nothing
about the stored reference changed — only the record being pointed at was edited.

## The auto-complete and the preview icon

Because a reference field has to resolve to one specific record on a potentially
huge table, ServiceNow gives it a distinct UI: start typing into a reference field
like `caller_id` and an auto-complete list filters live as you type, matching
against the referenced table's display field. Once a value is set, a small info
icon appears next to the field — clicking it opens a preview of that referenced
record (the user's email, phone, department) without navigating away from the form
you're on. Both behaviors exist because of the same underlying fact: the field
isn't holding plain text, it's holding a pointer, and the UI is built to make that
pointer feel like more than just a GUID.

## Related lists: the same relationship, read backward

A **related list** shows the reverse direction of a reference relationship: every
record on *another* table that points back at *this* record. Open a `sys_user`
record for a specific person, and a related list below the form can show every
incident where that user is the `caller_id` — the incident table doesn't have to
"belong" to the user record in any special way; the platform is simply running the
equivalent of "find every incident whose caller_id equals this user's sys_id" and
rendering the results inline. Chapter 5 covers related lists in real depth,
including how to configure which ones appear on a form — for now, just recognize
that a related list and a reference field are two views of the exact same
relationship, read from opposite ends.

## Why this matters for how you'll think about any table

Once you can recognize a reference field, you can read any unfamiliar table's
structure and immediately know which other tables it's connected to, and in which
direction. An `incident` record connects outward to `sys_user` (via `caller_id` and
`assigned_to`) and to `sys_user_group` (via `assignment_group`) — three separate
pointers, three separate relationships, all visible the moment you know to look for
reference-type fields in the dictionary.

## Key terms

| Term | Meaning |
|---|---|
| Reference field | A field pointing to a specific record on another table — ServiceNow's foreign key |
| Display value | The human-readable text shown for a reference field, looked up live from the referenced record |
| Preview icon | The info icon next to a set reference field that opens a quick preview of the referenced record |
| Related list | A list on a form showing records on another table that reference the current record — the reverse direction |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: if `incident.caller_id`
displays a person's full name, what is actually stored in that column, and why does
the displayed name update automatically if that person's name changes elsewhere?
