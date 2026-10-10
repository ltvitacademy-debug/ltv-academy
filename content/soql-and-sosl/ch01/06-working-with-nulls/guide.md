# Lesson 6 — Working With NULLs

**Chapter 1 · Querying Salesforce · Lesson 6 of 23**

## What you'll learn

- Why SOQL has no `IS NULL` / `IS NOT NULL` syntax, and what to write instead
- How relationship queries behave like outer joins with respect to missing parents
- Why explicitly filtering out nulls can improve query performance
- A common mistake when combining null checks with other conditions

## There is no IS NULL

If you've written SQL before, your instinct for checking a missing value is `IS NULL`. SOQL doesn't have that syntax at all. Instead, you compare directly against the `null` keyword with `=` or `!=`:

```sql
SELECT Name, Email
FROM Contact
WHERE Email = null
```

This finds every contact with no email address on file. To find contacts that *do* have an email:

```sql
SELECT Name, Email
FROM Contact
WHERE Email != null
```

It looks unusual the first time you see it — `= null` reads more like "equals nothing" than "equals null" — but it's the only form SOQL supports, across every field type.

## Relationship queries behave like outer joins

When you traverse a relationship field (covered in full in Chapter 2), missing parent data doesn't exclude the child record the way an inner join would. A contact whose `AccountId` is blank, or whose related account's field is itself null, can still come back from a query that references `Account.Industry` — it just returns the child record with that referenced field as null, rather than silently dropping the row. If you expect a filter like `WHERE Account.Industry = null` to behave like it would on a direct, non-relationship field, double-check your results carefully — a contact can show up in that result set either because its account's industry is genuinely blank, or because the contact has no account at all. Those are two different real-world situations that the same filter can't distinguish on its own.

## Nulls and query performance

Salesforce's own Apex documentation recommends adding an explicit null exclusion to a `WHERE` clause specifically for performance: filtering out null values lets the platform search more efficiently, because the query optimizer can use an index more effectively when it isn't being asked to also evaluate a comparison against every genuinely-empty row. A documented example adds a companion filter alongside the field you actually care about:

```sql
SELECT Id, Subject
FROM Case
WHERE Thread__c != null
AND Thread__c = :threadId
```

Here, `Thread__c != null` isn't strictly necessary for correctness — `Thread__c = :threadId` already excludes blank values on its own, since nothing equals a bound, non-null value by coincidence. But stating it explicitly helps the query planner, which is exactly the kind of small, non-obvious habit that separates code written by someone who's only ever gotten a query to work from code written by someone optimizing for a production org with real data volume.

## A combining mistake to avoid

Be careful mixing a null check with `AND`/`OR` without parentheses, for the same reason covered in Lesson 2 — operator precedence can quietly change what you meant to ask:

```sql
SELECT Name FROM Lead
WHERE (Email = null OR Phone = null)
AND Status = 'Open'
```

Without those parentheses around the two null checks, you'd get a very different (and likely wrong) result set, because `AND` binds tighter than `OR`.

## Key terms

| Term | Meaning |
|---|---|
| = null / != null | SOQL's only syntax for checking a missing or present value — there is no IS NULL |
| Outer-join-like behavior | How relationship queries don't exclude a child record just because a parent field is null |
| Null exclusion filter | An explicit != null condition added to help the query optimizer, even when not strictly required for correctness |

## Lab

Against `Lead` in a Developer Edition org, write a query that finds every lead with no `Email` on file using `= null`. Then write a query that finds every lead with an `Email` on file, correctly combined with `AND Status = 'Open'` using parentheses so the logic can't be misread. Finally, if you have any contacts with a blank `AccountId`, run a relationship query selecting `Account.Industry` against `Contact` and confirm those contacts still appear in the results rather than being silently excluded.

## Check yourself

What syntax does SOQL use in place of IS NULL / IS NOT NULL? Why can a relationship-query filter against a parent field's value sometimes include records that have no parent at all?
