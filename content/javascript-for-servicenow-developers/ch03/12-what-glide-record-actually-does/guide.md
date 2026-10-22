# Lesson 12 — What GlideRecord Actually Does

**Chapter 3 · GlideRecord · Lesson 12 of 32**

## What you'll learn

- What a GlideRecord object actually represents in memory
- Why almost every server-side script you'll ever write touches GlideRecord in some form
- The simplest possible GlideRecord pattern: look up one record by sys_id
- How `current` in a Business Rule is secretly a GlideRecord you didn't have to create yourself

## A GlideRecord is a cursor, not a record

The name is a little misleading. A `GlideRecord` object isn't one row of
data sitting in memory — it's a **cursor** positioned over a table, able
to point at zero, one, or many rows one at a time. When you create a new
`GlideRecord` for the `incident` table, you aren't loading every incident
into memory. You're creating an object that knows how to *ask* the
`incident` table questions, and how to walk through the answers one row
at a time.

```javascript
var gr = new GlideRecord('incident');
```

At this point, `gr` doesn't point at anything yet. It's pointed at the
`incident` table's schema, but it hasn't fetched a single row. Nothing
happens against the database until you tell it to query or get.

## The simplest pattern: `.get()`

The most basic thing you can do with a GlideRecord is retrieve exactly
one record, when you already know a value that uniquely identifies it —
most commonly the `sys_id`.

```javascript
var gr = new GlideRecord('incident');
if (gr.get('4a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d')) {
    gs.info('Found incident: ' + gr.getValue('number'));
} else {
    gs.info('No incident with that sys_id.');
}
```

`.get()` returns `true` if a matching record was found (and positions the
cursor on it) or `false` if nothing matched. You can also call `.get()`
with a field name and value instead of assuming it's a sys_id — e.g.
`gr.get('number', 'INC0010001')` — though that only works cleanly when
the field is actually unique.

## Why GlideRecord is everywhere

GlideRecord isn't one API among many in ServiceNow server scripting —
it's the foundation nearly everything else sits on:

- A **Business Rule** gives you `current`, which is a GlideRecord already
  positioned on the record that triggered the rule. You didn't write
  `new GlideRecord(...)` yourself, but `current` behaves exactly like one.
- A **Script Include** method that needs data almost always creates its
  own GlideRecord to query something.
- A **Scheduled Job** that needs to sweep through records (say, closing
  stale requests) uses GlideRecord to find and loop through them.
- Even UI Actions and many Client Scripts, once they call back to the
  server through GlideAjax (Chapter 4), end up running server code that
  uses GlideRecord underneath.

If you understand GlideRecord precisely, you understand the mechanism
behind most of what ServiceNow server-side scripting actually does.

## `current` is a GlideRecord you already know

Here's a fact that makes Business Rules click into place: inside a
Business Rule, `current` is literally a GlideRecord object, already
queried and positioned on the one record being inserted, updated, or
deleted.

```javascript
// Inside a "before update" Business Rule on the incident table
(function executeRule(current, previous /*null when async*/) {
    if (current.priority == 1 && current.state != 1) {
        current.work_notes = 'Priority 1 incident reopened or reassigned.';
    }
})(current, previous);
```

Everything you'll learn in this chapter about reading fields, setting
fields, and saving changes with GlideRecord applies directly to `current`
— it's the same object type, just handed to you already positioned,
instead of you having to query for it yourself.

## Key terms

| Term | Meaning |
|---|---|
| GlideRecord | ServiceNow's server-side API for querying, creating, updating, and deleting table records |
| Cursor | GlideRecord's role: an object positioned over zero, one, or many rows, not a loaded copy of the data |
| `.get()` | Retrieves exactly one record by sys_id (or another value) and returns `true`/`false` |
| `current` | The GlideRecord object a Business Rule receives, already positioned on the triggering record |

## Check yourself

Without looking back: what does `new GlideRecord('incident')` actually do
the moment it runs — does it fetch any rows yet? And what is `current`,
precisely, inside a Business Rule?
