# Lesson 8 — Relationship Queries: Parent to Child

**Chapter 2 · Relationships and Aggregates · Lesson 8 of 23**

## What you'll learn

- How to pull a parent record together with all of its related child records in one query
- The subquery syntax this requires, and how it differs from child-to-parent dot notation
- Naming the child relationship for standard versus custom objects
- How deep parent-to-child nesting can go, and how to work with the nested result in Apex

## The subquery shape

Where child-to-parent queries flatten a parent's fields onto a child row, parent-to-child queries do the opposite: they return a parent record together with a nested list of its related children, using a subquery written in parentheses inside the outer `SELECT`:

```sql
SELECT Name, (SELECT FirstName, LastName FROM Contacts)
FROM Account
```

This returns one row per `Account`, and each of those rows carries a nested sub-list of that account's related `Contact` records. The subquery's `FROM` isn't the object name you'd use in a top-level query — it's the **child relationship name**, which for standard objects is the plural name of the child object: `Contacts` (plural), not `Contact`.

## Filtering inside the subquery

The subquery can have its own `WHERE`, independent of the outer query's filters:

```sql
SELECT Name, (SELECT FirstName, LastName FROM Contacts WHERE Email != null)
FROM Account
WHERE Industry = 'Technology'
```

This returns Technology-industry accounts, each with only the contacts that have an email on file nested underneath. An account with zero matching contacts still comes back — it just carries an empty nested list, not a missing row — which matters when you're iterating the results in Apex and need to handle the zero-children case explicitly.

## Custom objects and __r again

The same `__c` → `__r` rule from Lesson 7 applies to parent-to-child subqueries on custom child objects — but here the relationship name you use is the **child relationship name** set on the lookup/master-detail field, which Salesforce auto-generates as the plural of the child object's name with `__r`:

```sql
SELECT Name, (SELECT Name, Amount__c FROM Line_Items__r)
FROM Project__c
```

If `Line_Items__r` doesn't work, check the lookup field's Child Relationship Name in Setup — it's editable at creation time and doesn't always match what you'd assume from the object's plural label.

## How deep, and working with results in Apex

As of API version 58.0, a SOQL query can nest up to five levels of parent-to-child relationships. In Apex, the nested result comes back as a child list property on each parent `sObject`, accessed by the relationship name:

```apex
List<Account> accts = [
    SELECT Name, (SELECT FirstName, LastName FROM Contacts)
    FROM Account
];
for (Account a : accts) {
    for (Contact c : a.Contacts) {
        System.debug(c.FirstName + ' ' + c.LastName);
    }
}
```

That nested loop — parent records on the outside, their children accessed through the relationship name — is the idiomatic way to work with a parent-to-child query's results, and it's worth being fluent with it since it shows up constantly in trigger and batch Apex that needs to process related records together.

## Key terms

| Term | Meaning |
|---|---|
| Parent-to-child query | A subquery, in parentheses inside SELECT, that nests a parent's related child records |
| Child relationship name | The name used as the subquery's FROM target; plural object name for standard objects, configurable `__r` name for custom |
| Nested result | The child records returned as a list property on each parent sObject, accessed by relationship name in Apex |

## Lab

In a Developer Edition org, write a query against `Account` that nests a nested subquery for `Contacts`, filtered to contacts with a non-null `Email`. Run it in the Query Editor and confirm accounts with zero matching contacts still appear with an empty nested list. Then write the equivalent query in Apex and loop over the nested `Contacts` list for each account.

## Check yourself

Why is the subquery's FROM target the plural `Contacts`, not `Contact`, for a standard parent-to-child query? If an account has no contacts matching the subquery's WHERE clause, does the account itself get excluded from the results — and why or why not?
