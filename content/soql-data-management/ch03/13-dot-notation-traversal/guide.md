# Dot-Notation Traversal

Child-to-parent queries gave you one hop: `Contact.Account.Name`. But Salesforce data is a
web of lookups, and the field you want is often several records away. Dot notation chains,
and this lesson is about how far it can go.

## What you'll learn

- How to chain relationships to reach a field several records away
- The real limit: five levels of child-to-parent traversal
- What comes back when a link in the chain is empty

## Chaining hops

Each dot moves you one relationship further up. Say you're querying Opportunities and want
the name of the person who owns the Opportunity's Account:

```sql
SELECT Name, Amount, Account.Name, Account.Owner.Name
FROM Opportunity
```

`Account` is the relationship from Opportunity to its parent Account. `Owner` is the
relationship from Account to the User who owns it. `Name` is finally a field on that User.
Three names, two dots, and a single flat query. In T-SQL this would be two joins — Opportunity
to Account, Account to User — and here the relationship fields do that work for you.

The same chain works in `WHERE` and `ORDER BY`, not just in the `SELECT` list:

```sql
SELECT Name, Amount
FROM Opportunity
WHERE Account.Owner.Name = 'Jordan Lee'
ORDER BY Account.Name
```

## The relationship name is not the field name

Each step in the chain uses a **relationship name**. For a standard lookup field the
relationship name is the field name without the trailing `Id`: `AccountId` becomes `Account`,
`OwnerId` becomes `Owner`, `CreatedById` becomes `CreatedBy`. For a custom lookup field the
`__c` suffix becomes `__r`. Chains can freely mix both kinds:

```sql
SELECT Name, Account__r.Owner.Name, Account__r.Parent.Name
FROM Invoice__c
```

That reads: from a custom Invoice, up the custom `Account__r` relationship to the Account,
then on to that Account's Owner, or to its `Parent` Account. Standard and custom
relationships can appear anywhere in the same chain.

## The limit: five levels

SOQL lets you traverse **up to five levels** of child-to-parent relationships in a single
query. A chain like `Contact.Account.Owner.Manager.Name` is three relationship levels
(Account, Owner, Manager) before the final field, comfortably inside the limit. A chain
with six relationship hops is rejected outright with a query error.

This is a platform limit, not a bug you can configure around. Every hop is a lookup the
platform must resolve on shared, multi-tenant infrastructure, and Salesforce caps that work
to keep queries predictable. If you find yourself needing more than five hops, that is
usually a signal to restructure: query an intermediate object directly, or run two queries
and join the results yourself.

## When a link in the chain is empty

Lookup fields can be blank. If an Opportunity has no Account, or an Account has no Parent,
the query does not fail. The field at the end of the chain simply comes back as null for
that record. This mirrors a T-SQL `LEFT JOIN`, and it means a chained query will not
silently drop records that are missing a link.

## Key terms

| Term | Meaning |
|---|---|
| Dot-notation traversal | Chaining relationship names with dots to reach fields on records several hops up |
| Relationship name | The name used to traverse a lookup: the field name without `Id`, or `__r` for custom fields |
| Five-level limit | SOQL allows at most five levels of child-to-parent relationships in one query |
| Null result | What a chained field returns when an intermediate lookup is empty |

## Check yourself

You need `Opportunity.Account.Owner.Name` for a report. Name each relationship in that chain
and say what T-SQL would need to do the same. Then: what happens if your chain needs six
levels of child-to-parent hops?
