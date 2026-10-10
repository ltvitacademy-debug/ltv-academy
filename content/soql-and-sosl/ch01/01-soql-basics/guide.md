# Lesson 1 — SOQL Basics

**Chapter 1 · Querying Salesforce · Lesson 1 of 23**

## What you'll learn

- What SOQL is and where you actually use it (Developer Console, Apex, APIs, report/list-view filters under the hood)
- The two clauses every SOQL query must have, and what SOQL can't do that SQL can
- How to write and run your first query against a standard object
- What a query actually returns, and why that shape matters once you write Apex against it

## What SOQL is

SOQL — the Salesforce Object Query Language — is how you ask the Salesforce database for records. It looks like SQL on purpose, because it borrows SQL's `SELECT`/`FROM`/`WHERE` vocabulary, but it is a narrower, read-only language built specifically around Salesforce's object model: standard objects like `Account` and `Contact`, custom objects, and the relationships between them. You run SOQL in the Developer Console's Query Editor, in Apex code, through the REST and SOAP APIs, and (less visibly) underneath reports, list views, and related lists.

The official reference puts it simply: a SOQL query consists of a required `SELECT` statement followed by a set of optional clauses — `WHERE`, `ORDER BY`, `GROUP BY`, `LIMIT`, and others you'll meet over this course. `SELECT` and `FROM` are the only two pieces that are never optional.

## Your first query

```sql
SELECT Id, Name, Industry
FROM Account
```

Read this left to right: "give me the `Id`, `Name`, and `Industry` fields, from the `Account` object." That's it — no semicolon required in the Query Editor, though Apex inline SOQL does end statements with one.

A few things that are true of every SOQL query, and that trip up people coming from T-SQL or MySQL:

- **There is no `SELECT *`.** SOQL has no wildcard for "every field." You must name every field you want back, including `Id` if you need it (and you almost always do).
- **The field list controls the output order.** Fields come back in exactly the order you listed them, not the object's internal field order.
- **Every query needs read access.** You only ever see fields and records the running user (or, in Apex running in system mode, the object itself) has permission to read. A query doesn't bypass field-level security or sharing rules unless you deliberately run it in a mode that does.
- **It's read-only.** SOQL retrieves records; it never inserts, updates, or deletes. Apex's DML statements (`insert`, `update`, `delete`, `upsert`) are a separate part of the language entirely.

## What a query returns

In Apex, a SOQL query returns a list of `sObject` records — the generic Salesforce wrapper type that every standard and custom object inherits from. Assigning a query to a `List<Account>` gives you an ordinary Apex list you can loop over, index into, and pass to other methods:

```apex
List<Account> accts = [SELECT Id, Name, Industry FROM Account];
for (Account a : accts) {
    System.debug(a.Name + ' — ' + a.Industry);
}
```

Only fields you actually named in the `SELECT` list are populated on each returned record — referencing a field you didn't query for throws a runtime error, not a silent null. That's a deliberate design choice: it keeps queries predictable and keeps you from accidentally depending on a field you forgot to ask for.

You can also ask SOQL to just count matching rows without returning any field data at all, using `SELECT COUNT() FROM Account` — a pattern you'll use constantly once you reach aggregate queries in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| SOQL | Salesforce Object Query Language — the read-only query language for retrieving Salesforce records |
| sObject | The generic base type every standard and custom Salesforce object record is represented as in Apex |
| Field list | The comma-separated fields named after `SELECT`; the only fields populated on the returned records |
| Developer Console Query Editor | The built-in UI for running ad-hoc SOQL/SOSL and inspecting results without writing Apex |

## Lab

In a free Developer Edition org (or any sandbox you have access to), open Setup → Developer Console → Query Editor. Run:

```sql
SELECT Id, Name, Industry, AnnualRevenue
FROM Account
```

Note how many rows come back and in what field order. Then remove `Id` from the list and rerun it — confirm it still runs fine (you don't strictly need `Id` in the Query Editor, only when you plan to reference it from Apex). Finally, try `SELECT * FROM Account` and read the error it produces, so you've seen first-hand that SOQL has no wildcard.

## Check yourself

What are the only two clauses a SOQL query must have? Why does querying a field you didn't include in the `SELECT` list fail at runtime instead of just returning null?
