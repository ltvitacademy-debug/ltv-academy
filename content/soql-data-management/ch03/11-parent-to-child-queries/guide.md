# Parent-to-Child Queries

So far every query in this course has pulled from one object at a time. Real Salesforce
work rarely stops there — you want an Account and the Contacts that belong to it, or an
Opportunity and its line items, in a single result. SOQL does this with **relationship
queries**, and the parent-to-child direction looks like nothing in T-SQL.

## What you'll learn

- SOQL's parent-to-child subquery syntax — a nested `SELECT` inside the parent's `SELECT` list
- Why it uses the child **relationship name**, not the child object's API name
- How to filter and order the nested child records

## The syntax: a subquery inside the SELECT list

```sql
SELECT Name, (SELECT LastName FROM Contacts)
FROM Account
```

Read that carefully — the inner `(SELECT LastName FROM Contacts)` isn't a join, and it isn't
a separate statement. It's a full subquery sitting *inside* the outer query's field list.
Each Account record comes back with its own `Name`, plus a nested list of that Account's
Contact records. There's no T-SQL equivalent to write this in one query; you'd normally run
a query against the parent, a separate query against the child filtered by foreign key, or a
`JOIN` that flattens everything into repeated rows. SOQL keeps the parent and its children as
a genuinely nested structure in the result itself.

## The inner FROM is a relationship name, not an object name

This is the detail that catches people who've just learned `FROM Account` and `FROM
Contact`. The child object is `Contact`, but the subquery says `FROM Contacts` — plural,
and that's not a typo. It's the **child relationship name**: the label Salesforce gives to
the "many" side of a lookup or master-detail relationship, visible on the field's setup page.
For standard relationships it's usually just the plural of the object (`Contacts`,
`Opportunities`, `Cases`). For a custom relationship, the relationship name always ends in
`__r` (e.g. `Invoices__r`), never `__c` — `__c` is reserved for custom *fields* and *objects*,
`__r` specifically marks a traversable relationship.

## Filtering and ordering the child subquery

The nested subquery isn't limited to picking fields — it can carry its own `WHERE` and
`ORDER BY`, independent of the outer query:

```sql
SELECT Name,
  (SELECT LastName, Title
   FROM Contacts
   WHERE Title = 'CEO'
   ORDER BY LastName)
FROM Account
WHERE BillingState = 'GA'
```

This returns Georgia Accounts, each with only its CEO-titled Contacts, sorted by last name.
The outer `WHERE` filters which Accounts come back; the inner `WHERE` filters which Contacts
come back *within* each Account. They're independent filters operating at two different
levels of the same query.

## Key terms

| Term | Meaning |
|---|---|
| Parent-to-child query | A SOQL query nesting a child subquery inside the parent's SELECT list |
| Relationship name | The plural (standard) or `__r`-suffixed (custom) name used in the subquery's FROM |
| Child relationship | The "many" side of a lookup or master-detail relationship |

## Check yourself

Why does `SELECT Name, (SELECT LastName FROM Contact) FROM Account` fail, and what's the
one-word fix?
