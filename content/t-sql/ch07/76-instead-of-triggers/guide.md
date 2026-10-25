# Lesson 76 — INSTEAD OF Triggers

**Chapter 7 · Programming with T-SQL · Lesson 15 of 16**

## What you'll learn

- `CREATE TRIGGER ... ON table INSTEAD OF INSERT AS BEGIN ... END` syntax
- How `INSTEAD OF` differs from `AFTER`: it replaces the action, not follows it
- The classic use case: making a multi-table view updatable
- Why the trigger body must perform the real write itself

## INSTEAD OF: it replaces the action

An `AFTER` trigger (Lesson 75) runs once the triggering change has
already happened. An **`INSTEAD OF` trigger** is fundamentally
different: it fires **in place of** the triggering `INSERT`, `UPDATE`,
or `DELETE` — the real operation **never happens** unless the trigger
body explicitly performs it:

```sql
CREATE TRIGGER trg_SomeView_InsteadOfInsert
ON dbo.SomeView
INSTEAD OF INSERT
AS
BEGIN
    -- The actual INSERT against the real table(s) goes here.
    -- If you don't write it, nothing gets inserted anywhere.
END;
```

Just like `AFTER`, the `inserted` and `deleted` pseudo-tables (Lesson
75) are available inside an `INSTEAD OF` trigger too — they hold what
*would have* been written, for you to act on however the body decides.

## The classic use case: an unupdatable view

Some views can't be updated directly — most commonly, a view that
`JOIN`s two or more tables together. SQL Server doesn't know which
underlying table a given `INSERT` or `UPDATE` against the view should
actually land in. `INSTEAD OF` triggers solve exactly this: you write
the routing logic yourself.

```sql
USE AdventureWorks2012;
GO

CREATE VIEW dbo.EmployeeDirectory AS
SELECT e.BusinessEntityID, p.FirstName, p.LastName, e.JobTitle
FROM HumanResources.Employee AS e
JOIN Person.Person AS p ON p.BusinessEntityID = e.BusinessEntityID;
GO

CREATE TRIGGER trg_EmployeeDirectory_InsteadOfUpdate
ON dbo.EmployeeDirectory
INSTEAD OF UPDATE
AS
BEGIN
    UPDATE p
    SET p.FirstName = i.FirstName, p.LastName = i.LastName
    FROM Person.Person AS p
    JOIN inserted AS i ON i.BusinessEntityID = p.BusinessEntityID;

    UPDATE e
    SET e.JobTitle = i.JobTitle
    FROM HumanResources.Employee AS e
    JOIN inserted AS i ON i.BusinessEntityID = e.BusinessEntityID;
END;
```

`dbo.EmployeeDirectory` joins two tables, so SQL Server itself has no
way to update it directly. The trigger body reads what the caller
*intended* to write (via `inserted`) and routes each piece to the
correct real table — `FirstName`/`LastName` to `Person.Person`,
`JobTitle` to `HumanResources.Employee` — making an otherwise
non-updatable view updatable.

## The real operation never happens on its own

This is the detail that trips people up: with an `AFTER` trigger, the
data change already happened by the time your code runs, and a
`ROLLBACK` is how you undo it. With `INSTEAD OF`, nothing is written
anywhere unless your trigger body contains an explicit `INSERT`,
`UPDATE`, or `DELETE` against a real, writable table. An `INSTEAD OF`
trigger with an empty body silently discards every write aimed at it.

## Key terms

| Term | Meaning |
|---|---|
| `INSTEAD OF` trigger | Fires in place of the triggering action; the real write never happens unless the body performs it |
| Unupdatable view | A view (often a multi-table `JOIN`) SQL Server can't route a direct `INSERT`/`UPDATE`/`DELETE` through |
| Routing logic | The trigger body's job: direct each piece of the intended write to the correct underlying table |

## Lab

Create `dbo.EmployeeDirectory` and `trg_EmployeeDirectory_InsteadOfUpdate`
above. Run an `UPDATE` against the view changing `JobTitle` for one
employee, then confirm `HumanResources.Employee` reflects the change
while `Person.Person` is untouched.

## Check yourself

You're ready for Lesson 77 when you can answer, without looking: what's
the difference between what already happened when an `AFTER` trigger
runs versus an `INSTEAD OF` trigger, and why does that make `INSTEAD OF`
the right tool for an unupdatable multi-table view?
