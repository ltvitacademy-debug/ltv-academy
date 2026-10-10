# Lesson 12 — Polymorphic Relationships

**Chapter 2 · Relationships and Aggregates · Lesson 12 of 23**

## What you'll learn

- What a polymorphic relationship field is, and where you'll meet one in real Salesforce data models
- How TYPEOF lets one query return different fields depending on the actual related record's type
- An alternative pattern using the Type qualifier when you don't need TYPEOF's full power
- How to check a polymorphic field's resolved type in Apex after the fact

## What makes a relationship polymorphic

Most relationship fields point to exactly one object — a `Contact`'s `AccountId` always points to an `Account`, full stop. A **polymorphic** relationship field can point to more than one *kind* of object depending on the record. The classic standard-object example is the `Task` and `Event` objects' `WhatId` field: it can reference an `Account`, an `Opportunity`, a `Case`, or several other object types, depending on what that particular activity was actually related to.

This creates a real problem for a plain relationship query: `SELECT What.Phone FROM Event` doesn't work, because SOQL doesn't know in advance which object type's fields it should be looking up — `Phone` makes sense on an `Account` but not on an `Opportunity`.

## TYPEOF: different fields for different types

`TYPEOF` solves this directly, letting a single query branch on the resolved type and pick different fields for each:

```sql
SELECT TYPEOF What
    WHEN Account THEN Phone, NumberOfEmployees
    WHEN Opportunity THEN Amount, CloseDate
    ELSE Name, Email
END
FROM Event
```

Read this as: for each `Event`, look at what its `What` field actually points to. If it's an `Account`, return `Phone` and `NumberOfEmployees`. If it's an `Opportunity`, return `Amount` and `CloseDate`. For anything else, fall back to `Name` and `Email`. One query, one round trip, correctly typed field access for every possible target — instead of querying once to find each record's type, then writing a second query (or several) once you know what you're dealing with.

The `ELSE` branch is optional, but leaving it out means any `Event` whose `What` resolves to a type you didn't explicitly handle simply won't have those extra fields populated for that row, so it's worth including deliberately rather than leaving by omission.

## A lighter-weight alternative: filtering by Type

If you don't need different *fields* per type — you just need to filter which records come back based on what type they relate to — you don't need `TYPEOF` at all. The polymorphic field's `Type` qualifier is enough:

```sql
SELECT Id, Description
FROM Event
WHERE What.Type IN ('Account', 'Opportunity')
```

This returns the same fields regardless of type, just restricted to events related to an `Account` or `Opportunity`. Reach for `TYPEOF` only when the *fields themselves* genuinely need to differ by type — it's more machinery than you need for a simple type-based filter.

## Checking the type afterward, in Apex

Once you've queried polymorphic records into Apex, you can also check a specific record's resolved type at runtime with `instanceof`:

```apex
for (Event e : events) {
    if (e.What instanceof Account) {
        Account acc = (Account) e.What;
        System.debug(acc.Phone);
    }
}
```

This is a reasonable fallback when `TYPEOF` wasn't used in the original query, but it means you've already paid the cost of fetching a generically-typed result and now need to branch in Apex instead of in SOQL — `TYPEOF` is almost always the cleaner choice when you know up front which types and fields you care about.

## Key terms

| Term | Meaning |
|---|---|
| Polymorphic relationship field | A relationship field that can point to more than one object type depending on the record, e.g. Task/Event's WhatId |
| TYPEOF | A SOQL clause that selects different fields depending on a polymorphic field's resolved type |
| Type qualifier | A property of a polymorphic field (e.g. What.Type) usable to filter by resolved type without needing different fields |

## Lab

In a Developer Edition org, create a couple of `Task` records related to different object types (one to an `Account`, one to an `Opportunity`, if you have both available). Write a `TYPEOF` query against `Task`'s `WhoId` or `WhatId` field that returns different fields for each type with a sensible `ELSE` fallback. Then write a simpler query using `WHERE What.Type = 'Account'` to see the lighter-weight filtering-only alternative.

## Check yourself

Why does SELECT What.Phone FROM Event fail without TYPEOF, even though Phone is a perfectly valid field on Account? When is filtering with What.Type IN (...) the better choice over writing a full TYPEOF clause?
