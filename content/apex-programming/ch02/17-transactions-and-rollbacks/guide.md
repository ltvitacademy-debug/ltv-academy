# Lesson 17 — Transactions and Rollbacks

**Chapter 2 · Working with Data in Apex · Lesson 17 of 43**

## What you'll learn

- Apex's implicit transaction boundary: one request, one all-or-nothing unit
- What causes an automatic rollback of everything in that request
- Creating a mid-transaction checkpoint with `Database.setSavepoint()`
- Rolling back to that checkpoint with `Database.rollback()`
- Why savepoints can't be reused once you roll back past them

## Every request is a transaction

In Apex, a single request — a trigger execution, a class method called from
a button, a web service call, an Execute Anonymous run — is treated as one
transaction. If every DML statement in that request succeeds, everything is
committed together when the request finishes. If anything in the request
causes an unhandled error (an uncaught `DmlException`, a trigger that
throws, a governor limit being exceeded), **everything** done during that
request is automatically rolled back, not just the statement that failed:

```apex
Account a = new Account(Name = 'Rollback Example');
insert a; // succeeds

Contact c = new Contact(); // missing required LastName
insert c; // throws DmlException, uncaught
// if this exception isn't caught, the Account insert above
// is rolled back too, because the whole request fails
```

This "all-or-nothing per request" behavior is why try/catch (Lesson 15)
matters so much in Apex: catching an exception yourself lets the already-
successful work in that request survive, instead of the platform rolling
back the entire transaction because of one unhandled failure further down.

## Savepoints: a checkpoint inside the transaction

Sometimes you want **partial** control — undo just a portion of what
happened so far in the request, without catching every possible exception
individually. `Database.setSavepoint()` marks the database state at a
specific point in your code and returns a `Savepoint` value you hold onto:

```apex
Savepoint sp = Database.setSavepoint();

try {
    insert new Account(Name = 'Step 1');
    insert new Contact(); // missing LastName — throws
} catch (DmlException de) {
    Database.rollback(sp);
    System.debug('Rolled back to before Step 1: ' + de.getMessage());
}
```

`Database.rollback(sp)` restores the database to exactly the state it was
in when `sp` was created — undoing the Account insert along with the failed
Contact insert — without ending the whole transaction or losing anything
that happened *before* the savepoint.

## Savepoints are invalidated by rolling back past them

If you create a second savepoint after the first, and then roll back to the
first, the second savepoint becomes invalid — using it afterward causes a
runtime error, because the database state it referred to no longer exists
in this transaction's history:

```apex
Savepoint sp1 = Database.setSavepoint();
insert new Account(Name = 'A');

Savepoint sp2 = Database.setSavepoint();
insert new Account(Name = 'B');

Database.rollback(sp1); // discards both inserts
// Database.rollback(sp2); would now error — sp2 no longer refers to a valid state
```

## Savepoints don't cross trigger invocations

A `Savepoint` reference can't be carried from one trigger invocation into
another — each trigger invocation is its own context, so a savepoint
created in one can't be used in a later one.

## Side effects also roll back

Rolling back to a savepoint also releases any record locks taken after that
point, and any emails queued for sending since that savepoint are discarded
along with the data changes — a rollback is a genuine undo of everything
that happened after the checkpoint, not just the sObject records.

## Key terms

| Term | Meaning |
|---|---|
| Transaction | The all-or-nothing unit of work for one Apex request |
| Automatic rollback | The platform undoing an entire transaction when an unhandled error occurs |
| `Database.setSavepoint()` | Marks a checkpoint in the current transaction, returning a `Savepoint` |
| `Database.rollback(sp)` | Restores the database to the state recorded at that `Savepoint` |

## Lab

In Execute Anonymous, using Account, demonstrate a savepoint-based partial
rollback:

```apex
Account keeper = new Account(Name = 'Keep Me');
insert keeper;

Savepoint sp = Database.setSavepoint();

try {
    insert new Account(Name = 'Temporary Account');
    insert new Account(); // missing Name — throws DmlException
} catch (DmlException de) {
    Database.rollback(sp);
    System.debug('Rolled back the temporary insert: ' + de.getMessage());
}

Integer accountCount = [SELECT COUNT() FROM Account WHERE Name IN ('Keep Me', 'Temporary Account')];
System.debug('Accounts remaining from this lab: ' + accountCount);
```

Confirm in the debug log and in a query that only "Keep Me" remains —
"Temporary Account" was rolled back along with the failed insert.

## Check yourself

What's the difference between letting an unhandled `DmlException` roll back
the whole request, versus using a savepoint inside a try/catch? Why does
rolling back to `sp1` invalidate a later savepoint `sp2`?
