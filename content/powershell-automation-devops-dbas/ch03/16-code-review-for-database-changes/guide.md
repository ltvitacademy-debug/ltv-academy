# Code Review for Database Changes

A pull request against a stored procedure gets reviewed differently than one against a
Python function. The syntax review — does this even parse, does it follow naming
conventions — is the easy, shared part. The concerns that actually matter most for database
changes are specific to databases, and an app-code reviewer without DBA experience will
often miss every one of them.

## What you'll learn

- The database-specific questions a reviewer needs to ask that app-code review doesn't
  cover
- Why table locking duration is a code review concern, not just a runtime concern
- Why "does this have a rollback script" belongs in the review itself, not an afterthought

## Does this change lock a large table for a long window?

Certain schema changes — adding a `NOT NULL` column with a default, rebuilding a
clustered index, adding a constraint that requires validating every existing row — can
require SQL Server to hold a lock on the entire table for as long as the operation takes.
On a small table, that's invisible. On a large, actively-written production table, a
migration that takes ninety seconds to run can mean ninety seconds where every write to
that table blocks, which in a busy OLTP system can cascade into timeouts and a visible
outage. A reviewer's job is to look at exactly what kind of change is being proposed and
ask: given the actual size and traffic pattern of this table, how long will this
realistically lock it for, and is that acceptable?

```sql
-- Reviewer flag: this adds a NOT NULL column with a default to a 40M-row
-- table that gets constant writes. On SQL Server this can require a
-- size-of-table operation depending on version and edition — needs a
-- maintenance window or an online/batched approach, not a straight deploy.
ALTER TABLE dbo.OrderLines ADD ShippingZone VARCHAR(10) NOT NULL DEFAULT ('UNKNOWN');
```

## Is there a rollback script?

Chapter Four (Lesson 21) covers rollback strategy in depth, but the review gate is where it
starts: a pull request that changes the schema should include, or at least clearly state,
how this change would be reversed if it needs to be. That's not a formality — a reviewer who
asks "how do we undo this if it's wrong" before approval catches the case where a migration
is genuinely difficult or impossible to cleanly reverse (say, a migration that drops a
column) *before* it merges, not after it's already run in production and someone's asking
the same question under pressure.

## Does this index change affect other queries?

Adding an index helps the query it was written for, but every index also has a cost:
storage, and slower writes on every insert/update/delete against that table, because the
index has to be maintained too. And an index change can be a two-edged sword in a subtler
way — the query optimizer might choose an index in a way that changes the plan for a
*different* query that touches the same table, sometimes making it faster and sometimes
making it worse. A thorough review of an index change asks what other queries hit this
table, not just whether the new index helps the one query it was written for.

## What database-specific review adds to standard review

None of this replaces normal code review practice — readability, following naming
conventions, testing. It's additive: a database change needs everything an app-code change
needs, plus questions about locking duration, rollback, and downstream query impact that
simply don't have an equivalent in most application code review.

## Key terms

| Term | Meaning |
|---|---|
| Table lock | An exclusive hold SQL Server takes on a table during certain schema operations, blocking other writes for the duration |
| Rollback script | A script that reverses a given migration — reviewed for existence and correctness alongside the change itself |
| Query plan | The execution strategy SQL Server's optimizer chooses for a query — can shift when an index changes, for better or worse |

## Check yourself

A pull request adds an index to speed up one specific report query on a busy `Orders`
table. Beyond confirming the new index actually helps that report, what two other questions
should a thorough database code reviewer ask before approving it?
