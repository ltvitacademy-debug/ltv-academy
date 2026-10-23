# Lesson 1 — What a Business Rule Actually Is

**Chapter 1 · Business Rules · Lesson 1 of 37**

## What you'll learn

- What a Business Rule is in ServiceNow terms, and the `sys_script` table it lives on
- Which database events a Business Rule can run on: insert, update, delete, and query
- Why Business Rules run on the server, with full database access — not inside the browser
- How a Business Rule compares to the UI Policies and Data Policies you already know
- Why this makes Business Rules the single most powerful, and most dangerous, tool in this course

## A Business Rule is a server-side script attached to a table

Every Business Rule you will ever write is a row on the `sys_script` table. Each row names a
target table (`incident`, `change_request`, `sc_request`, or any custom table), a timing, a set
of conditions, and a block of JavaScript. When a record on that table is inserted, updated,
deleted, or queried, the platform checks whether any Business Rules apply, and if they do, runs
their script — automatically, with no user ever clicking a button to trigger it.

That's the core idea: a Business Rule is automation that reacts to data changing, not automation
a user starts on purpose. Nobody opens a "run business rule" menu. You update a priority field on
an Incident form and click Save, and somewhere on the server a script quietly runs that you never
see.

```javascript
// A minimal Business Rule body — the platform supplies current automatically
(function executeRule(current, previous /*null when async*/) {

    if (current.priority == 1) {
        current.urgency = 1;
    }

})(current, previous);
```

## Four events, one mechanism

A Business Rule's "when" is defined by which checkboxes are selected on the rule record: insert,
update, delete, and query. The same script body can be configured to run on any combination of
these. An Incident Business Rule set to run on insert only fires when a brand-new incident is
created; one set to run on update fires every time an existing incident is saved again, no matter
which field changed (unless you scope it further with Filter Conditions, which Lesson 5 covers in
more depth).

## Server-side, not client-side — and that's the whole point

This course's earlier UI Policy and Data Policy material (from the Platform Administration
course) ran in the browser or, for Data Policies, enforced field-level validation close to the
database. Business Rules are different in kind: they execute on the ServiceNow application
server, inside the same transaction as the database write, with full `GlideRecord` access to
*any* table — not just the one the user is looking at. A Business Rule on Incident can query the
`sys_user` table, update records on `change_request`, or write to a completely unrelated custom
table, all before or after that one Incident save finishes.

That server-side reach is exactly why Business Rules are the most powerful automation mechanism
on the platform. A UI Policy can only hide a field. A Business Rule can rewrite data across your
entire instance, on every single save, silently. There is no sandboxing by default — the script
runs as the system, with access the logged-in user might not even have themselves.

## Powerful also means dangerous

Because a Business Rule runs on every matching database operation, a careless one doesn't just
produce a wrong answer on one form — it can run thousands of times a day, touching every incident
your company creates, or worse, looping back on itself (Lesson 5 covers exactly how that happens
and how to avoid it). Treat every Business Rule you write as code that runs in production, on
real data, the moment you activate it — because that is literally what it does.

## Key terms

| Term | Meaning |
|---|---|
| Business Rule | A server-side script on `sys_script` that runs automatically on insert, update, delete, or query of a table |
| `sys_script` | The database table that stores every Business Rule in the instance |
| GlideRecord | ServiceNow's server-side API for reading and writing database records in script |
| Server-side execution | Code that runs on the ServiceNow application server, not in the user's browser |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why can a Business Rule touch
data the logged-in user isn't even permitted to see in the UI, and why does that make it more
dangerous than a UI Policy?
