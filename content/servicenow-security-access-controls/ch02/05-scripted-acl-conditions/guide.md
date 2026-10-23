# Lesson 5 — Scripted ACL Conditions

**Chapter 2 · Advanced ACL Design · Lesson 5 of 24**

## What you'll learn

- A one-sentence recap of the role + condition + script combination from Course 3
- Why an ACL script's performance matters more than almost any other script type
- The real anti-pattern: an unnecessary `GlideRecord` query inside an ACL script
- The real, standard pattern for a fast group-membership check
- When to reach for `current`'s own fields instead of querying anything at all

## Quick recap

You already know that a single ACL can combine a role requirement with a condition
or a script, and that when more than one of those pieces is present, all of them
must pass — AND, not a choice between them. This lesson goes deeper into how to
*write* the script half of that combination well.

## Why ACL script performance is a different category of problem

A slow business rule slows down one transaction. A slow ACL script is worse, because
ACL scripts don't run once per transaction — they run **on every single access
attempt** to the record or field they govern: every time a form loads, every list
view that includes that field, every Table API call, every report. A script that adds
even 50 milliseconds becomes 50 milliseconds multiplied across every user, every
record, every field reference, all day. An expensive ACL script is a real,
instance-wide performance risk, not a localized one — it's one of the most common,
least obvious causes of a slow instance that nobody thinks to check first.

## The anti-pattern: querying another table inside the ACL

The single most common mistake is running a fresh `GlideRecord` query inside an ACL
script to answer a question the platform can already answer more cheaply.

```javascript
// Slow anti-pattern -- avoid this inside an ACL script
var grp = new GlideRecord('sys_user_grmember');
grp.addQuery('user', gs.getUserID());
grp.addQuery('group', 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6');
grp.query();
answer = grp.next();
```

This works, but it issues a real database query every single time the ACL runs —
for every record, every field, every user, on every page load. Multiply that across
a busy instance and it's a measurable, avoidable load on the database tier.

## The real, standard pattern instead

`GlideUser`, returned by `gs.getUser()`, already holds the current user's roles and
group memberships for the transaction, loaded once and reused. Its `isMemberOf()`
method answers the exact same question as the query above, without issuing one:

```javascript
// Fast -- the standard pattern for "only members of this group can access this record"
answer = gs.getUser().isMemberOf('a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6');
```

Same logical question, same result, no per-access database round trip. This is the
real, standard way group-membership checks belong in an ACL script.

## Prefer data you already have over data you have to go fetch

The same principle extends past group membership. If the information you need is
already sitting on `current` — the record being evaluated — use it directly instead
of querying somewhere else to re-derive it:

```javascript
// Fast -- a direct field comparison on the record already loaded into memory
answer = current.state == 3 || current.assigned_to == gs.getUserID();
```

If a field you'd otherwise query for is frequently needed in ACL logic, that's a sign
it might belong denormalized onto the record itself, precisely so ACL scripts can read
it directly instead of looking it up. The general rule: keep ACL scripts fast and
simple, and reach for a query only when there is genuinely no cheaper way to get the
answer.

## Key terms

| Term | Meaning |
|---|---|
| ACL script performance | Scripts run on every access attempt to the governed record/field — slowness compounds instance-wide |
| `gs.getUser()` | Returns the current transaction's cached `GlideUser` object |
| `isMemberOf()` | `GlideUser` method that checks group membership without a fresh database query |
| Query-in-ACL anti-pattern | Running a `GlideRecord` query inside an ACL script when a cheaper built-in check already answers it |

## Check yourself

Why does a 50-millisecond delay inside an ACL script matter more than the same
50-millisecond delay inside a scheduled job that runs once a night? Answer in terms
of how often each one actually executes.
