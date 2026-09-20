# Lookup vs. Master-Detail Relationships

The previous lesson named the two most common relationship types without going deep on
either. This lesson goes deep, because the distinction between Lookup and Master-Detail is
one of the most practically important facts about the Salesforce data model — it determines
whether deleting one record silently deletes others, whether a child record can even exist on
its own, and whether a field can automatically roll up numbers from children to a parent.

## What you'll learn

- The precise, real distinction between Lookup and Master-Detail relationships
- What "cascade delete" and "inherited security" actually mean in practice
- Why roll-up summary fields are only possible on Master-Detail relationships

## Lookup: loosely coupled, on purpose

A **Lookup relationship** is a loose, optional link. The child record can be created, saved,
and exist indefinitely with the lookup field left blank — nothing requires it to point at a
parent. If the parent record is deleted, the child is **not** deleted by default; the lookup
field is simply cleared (or, depending on configuration, the delete can be blocked, or the
child can be deleted too — but none of that happens automatically the way it does with
Master-Detail). Security on the child record is independent: a user's access to a Contact
doesn't automatically flow from their access to the Contact's related Account. Most
relationships in a typical org are Lookups — Contact to Account, Opportunity to Account,
Case to Account — because most of the time, loose coupling is exactly the right default.

## Master-Detail: tightly coupled, with consequences

A **Master-Detail relationship** is a tight, required link. The "detail" (child) record
cannot be saved without a value in the master (parent) relationship field — it's mandatory,
not optional. Delete the master record, and every detail record tied to it is deleted too;
this is **cascade delete**, and it happens automatically with no extra configuration. Security
is **inherited**: whatever access a user has to the master record, they get to the detail
record as well, with no separate sharing setup needed for the detail object. And because the
relationship is guaranteed to exist for every detail record, Salesforce allows **roll-up
summary fields** on the master — a field that automatically counts, sums, or finds the min/max
of values across all its detail records. That roll-up capability is only possible because
Master-Detail guarantees the relationship can't be missing.

## Why an analyst needs to know which is which

A report or dashboard number can look wrong for a data-model reason that has nothing to do
with a broken query. If a Lookup parent gets deleted, related child records silently lose
that link — they don't disappear, but a report grouped by the now-missing parent will show
those records as blank or "unspecified." If a Master-Detail parent gets deleted, the child
records are simply gone, cascade-deleted, and any report that used to count them will show a
real drop that isn't a data-entry mistake. Knowing which relationship type connects two
objects tells you, before you ever run a query, what kind of surprise is even possible.

## Key terms

| Term | Meaning |
|---|---|
| Lookup relationship | Loose, optional link; no cascade delete by default, independent security |
| Master-Detail relationship | Tight, required link; cascade delete, inherited security |
| Cascade delete | Deleting a Master-Detail parent automatically deletes its detail records |
| Roll-up summary field | An auto-calculated field on a master, summarizing its detail records — only possible on Master-Detail |

## Check yourself

Why can a roll-up summary field only exist on a Master-Detail relationship, and not on a
Lookup relationship? What guarantee does Master-Detail provide that a roll-up depends on?
