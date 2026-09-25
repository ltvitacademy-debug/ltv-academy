# Semi-Joins & Anti-Joins

Relationship queries so far have pulled fields *from* related records. Sometimes you don't
want the related data at all. You just want to filter one object by what exists in another:
"Accounts that have a Closed Won Opportunity," or "Accounts with no Opportunities." SOQL
answers both with a subquery in the `WHERE` clause.

## What you'll learn

- The semi-join: `WHERE Id IN (SELECT ... )`
- The anti-join: `WHERE Id NOT IN (SELECT ... )`
- The rules on what the subquery may select

## The semi-join: records that have a match

```sql
SELECT Id, Name
FROM Account
WHERE Id IN (SELECT AccountId
             FROM Opportunity
             WHERE StageName = 'Closed Won')
```

The inner query finds the `AccountId` of every Closed Won Opportunity. The outer query
returns only the Accounts whose `Id` is in that list. Accounts appear once each, no matter
how many Closed Won Opportunities they have, and none of the Opportunity fields come back.
That is why it is called a semi-join: the second object filters the first but contributes no
columns to the result.

If you know T-SQL, this is an `IN` subquery or a `WHERE EXISTS`. Both are common in T-SQL,
but SOQL has no `EXISTS`. The `IN` form is the one you use.

## The anti-join: records with no match

Flip it with `NOT IN` and you get the other half:

```sql
SELECT Id, Name
FROM Account
WHERE Id NOT IN (SELECT AccountId FROM Opportunity)
```

This returns every Account that has no Opportunity at all, a very common data-hygiene
question ("which Accounts have never been worked?"). Doing the same with a child-to-parent
or parent-to-child query would mean pulling everything back and checking for empty lists
yourself. The anti-join lets the platform do the filtering.

## Either direction works

The outer field does not have to be `Id`. It only has to be a field of the same kind as the
one the subquery selects. Here a lookup field on the outer object is matched against `Id`
values from the subquery:

```sql
SELECT Id, LastName
FROM Contact
WHERE AccountId IN (SELECT Id FROM Account WHERE Industry = 'Technology')
```

That returns Contacts whose Account is in Technology. You could get the same rows with the
dot-notation query `WHERE Account.Industry = 'Technology'`, and that is the simpler choice
here. Semi-joins earn their keep when the filtering condition lives on a *child* (as in the
first example), where dot notation cannot reach.

## The rules

Semi-joins and anti-joins are more restricted than a full T-SQL subquery:

- The subquery must select a single field, and that field must be an `Id` or a lookup
  (reference) field. You cannot select `Name` or `Amount` and compare it to an `Id`.
- The subquery is independent of the outer query. It cannot refer back to the outer record,
  so there are no correlated subqueries.
- The subquery cannot use `ORDER BY` or `LIMIT`.

If you hit an error, check the selected field first. It is by far the most common cause.

## Key terms

| Term | Meaning |
|---|---|
| Semi-join | `WHERE field IN (subquery)`: keep records that have a match in the subquery |
| Anti-join | `WHERE field NOT IN (subquery)`: keep records that have no match |
| Subquery field rule | The subquery must select an `Id` or lookup field |
| Correlated subquery | A subquery that refers to the outer row; not supported in SOQL |

## Check yourself

Write a query that returns every Account with at least one Closed Won Opportunity. Then
write the anti-join that returns Accounts with no Opportunities at all. Why would
`SELECT Name FROM Opportunity` fail as the subquery?
