# Lesson 7 — Relationship Queries: Child to Parent

**Chapter 2 · Relationships and Aggregates · Lesson 7 of 23**

## What you'll learn

- How to reach up from a child record to its parent's fields using dot notation
- How this works for standard lookups versus custom lookup/master-detail fields
- How many levels deep you can traverse, and where to find a custom field's relationship name
- Why this is the most common relationship pattern you'll write

## Dot notation, going up

A child-to-parent relationship query reaches from a child object up to a related parent object's fields, directly in the `SELECT`, `WHERE`, or `ORDER BY` clause, using a dot:

```sql
SELECT Id, Name, Account.Name, Account.Industry
FROM Contact
WHERE Account.Industry = 'Technology'
```

Read `Account.Name` as "the Name field on this Contact's related Account." The query returns one row per `Contact`, with the parent `Account`'s fields flattened onto that same row — there's no separate nested result for the parent the way a parent-to-child subquery works (that's next lesson).

This is the single most common relationship pattern you'll write in production SOQL, because it answers an extremely common question shape: "give me child records, but let me filter or display them by something that lives on their parent."

## Standard objects

For standard lookup and master-detail relationships, the relationship name is simply the parent object's name, as shown above: `Account.Name` on `Contact`, `Contact.Email` on `Case`, and so on. You can chain this more than one level in some cases — a query on `Contact` could reach `Account.Owner.Name` to get the name of the user who owns the related account, traversing two relationship hops in a single dot-notation path.

## Custom fields and the __r suffix

Custom lookup and master-detail fields follow a different naming pattern. A custom field's API name always ends in `__c` — but when you traverse it as a relationship in SOQL, you don't use the field's own API name. You use its **relationship name**, which replaces `__c` with `__r`:

```sql
SELECT Id, Name, Project__r.Name, Project__r.Status__c
FROM Task__c
WHERE Project__r.Status__c = 'Active'
```

Here, `Project__c` is the lookup field's API name, but `Project__r` is what you write in SOQL to traverse it. If a query like this fails with an "invalid relationship" error, the fix is almost always to go check the field's definition in Setup — the relationship name is configurable at the time the lookup or master-detail field is created, and it doesn't always default to exactly what you'd guess.

## How deep can you go

Salesforce documents a limit on how many levels of relationships a single query can traverse (for parent-to-child subqueries this is explicitly five levels as of API version 58.0 and later), and child-to-parent dot-notation paths are similarly bounded. In practice, needing to go more than two or three levels deep in a single query is a signal worth pausing on — it often means either the data model has more indirection than it needs, or the query would be clearer (and more maintainable) split into two queries joined in Apex.

## Key terms

| Term | Meaning |
|---|---|
| Child-to-parent query | A query that reaches from a child object up to a related parent's fields using dot notation |
| Relationship name | The name used to traverse a relationship in SOQL; for custom fields, `__c` becomes `__r` |
| Dot notation | The `Parent.Field` syntax used to reference a related parent's field directly |

## Lab

In a Developer Edition org, create (or use an existing) custom object with a lookup field to `Account`, confirm its relationship name in Setup under the field's definition, and write a SOQL query from the custom object that filters on one of `Account`'s standard fields using that relationship name. Then write a standard-object query from `Contact` that reaches two levels up to `Account.Owner.Name`.

## Check yourself

Why does a custom lookup field named `Project__c` get traversed in SOQL as `Project__r`, not `Project__c`? What's a practical reason to be cautious about a query that needs to traverse three or more relationship levels deep?
