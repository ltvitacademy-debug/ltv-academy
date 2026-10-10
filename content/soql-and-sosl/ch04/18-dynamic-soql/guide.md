# Lesson 18 — Dynamic SOQL

**Chapter 4 · Advanced Queries and Optimization · Lesson 18 of 23**

## What you'll learn

- The difference between static (inline) SOQL and dynamic SOQL, and when you actually need the latter
- Database.query, Database.getQueryLocator, and Database.countQuery
- The accessLevel parameter and what "user mode" versus "system mode" actually changes
- Why dynamic SOQL is the lesson that sets up Lesson 19's security topic

## Static SOQL's limitation

Every query you've written so far in this course has been **static (inline) SOQL** — the query text is fixed at compile time, even though bind variables (covered properly in Lesson 19) let specific *values* vary at runtime:

```apex
String industry = 'Technology';
List<Account> accts = [SELECT Id, Name FROM Account WHERE Industry = :industry];
```

That works fine when the values change but the query's *shape* doesn't. It breaks down the moment the actual object, fields, or filter structure needs to be decided at runtime — a generic search screen that lets a user pick which object and which fields to filter on, for instance, can't be written as one fixed static query.

## Dynamic SOQL: building the query as a string

Dynamic SOQL builds the query text itself as a string at runtime, then executes it with `Database.query`:

```apex
String objectName = 'Account';
String fieldName = 'Industry';
String filterValue = 'Technology';
String queryStr = 'SELECT Id, Name FROM ' + objectName + ' WHERE ' + fieldName + ' = \'' + filterValue + '\'';
List<SObject> results = Database.query(queryStr);
```

Assigning the result to a single sObject variable versus a `List<SObject>` signals whether you expect exactly one record or several. Notice the return type is the generic `SObject`/`List<SObject>` — Apex doesn't know at compile time which concrete object type a dynamically-built query targets, so you work with the generic type (or cast it, once you know what it actually is at that point in the code).

## getQueryLocator and countQuery

Two sibling methods solve different problems:

- **`Database.getQueryLocator(queryStr)`** builds a `QueryLocator`, meant specifically for Batch Apex or Visualforce controllers that need to process a potentially huge result set in manageable chunks — not for pulling records directly into memory the way `Database.query` does.
- **`Database.countQuery(queryStr)`** returns just the count of records a dynamic query would match, without actually fetching them — useful when you need "how many" without paying the cost of retrieving the records themselves.

Each has a `...WithBinds` sibling (`Database.queryWithBinds`, `Database.getQueryLocatorWithBinds`, `Database.countQueryWithBinds`) that takes a map of bind variable names to values instead of splicing values into the string directly — the safer construction pattern, which Lesson 19 covers in depth.

## accessLevel: user mode vs. system mode

As of API version 55.0, `Database.query` and its siblings accept an `AccessLevel` parameter controlling whether the query runs in user mode or system mode:

```apex
List<Account> accts = Database.query(queryStr, AccessLevel.USER_MODE);
```

In user mode, the running user's object permissions, field-level security, and sharing rules are all enforced on the query — the same as a query run through the UI. In system mode (the historical default for inline SOQL before this parameter existed), the query sees everything regardless of the running user's actual access. Explicitly choosing `AccessLevel.USER_MODE` is the current recommended default unless you have a specific, deliberate reason for system-mode access — which is exactly the kind of decision an architect needs to make consciously rather than inherit by accident.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic SOQL | A query built as a string at runtime and executed with Database.query, instead of fixed at compile time |
| Database.getQueryLocator | Builds a QueryLocator for Batch Apex/Visualforce to process large result sets in chunks, not for direct in-memory retrieval |
| AccessLevel | A parameter (user mode / system mode) controlling whether a dynamic query enforces the running user's permissions and sharing |

## Lab

Write an Apex method that accepts an object API name and a field name as strings, builds a dynamic SOQL query selecting `Id` and that field from that object, and returns the results using `Database.query` with `AccessLevel.USER_MODE` explicitly set. Test it against two different standard objects to confirm the same method works generically.

## Check yourself

Why does Database.query return a generic SObject/List<SObject> rather than a specific type like List<Account>? What's the practical difference between running a dynamic query in user mode versus system mode?
