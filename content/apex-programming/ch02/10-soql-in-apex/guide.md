# Lesson 10 — SOQL in Apex

**Chapter 2 · Working with Data in Apex · Lesson 10 of 43**

## What you'll learn

- How to embed a SOQL query directly in Apex using square brackets
- Why inline SOQL evaluates to a `List` of sObjects (or a single sObject, or an `Integer` for a count query)
- How to reference Apex variables inside a query with the `:` bind syntax
- Using a SOQL `for` loop to iterate over query results efficiently
- The difference between assigning a query to a `List` versus a single sObject variable

## Writing SOQL inline

Apex lets you write a SOQL statement directly in your code by wrapping it in
square brackets. The query runs against the org's data, and the result is
assigned to a variable just like any other expression:

```apex
List<Account> accts = [SELECT Id, Name, Industry FROM Account WHERE Industry = 'Technology'];
System.debug('Found ' + accts.size() + ' accounts');
```

This is called **inline SOQL**. Because a query can return zero, one, or many
rows, the normal pattern is to assign it to a `List<SObjectType>`. If you
assign it to a single sObject variable instead (a "singleton" assignment),
the query must return exactly one row — zero or multiple rows throws a
`System.QueryException` at runtime.

## Bind variables

You can reference any Apex variable, method return value, or expression
inside a query by prefixing it with a colon (`:`). This is how you keep SOQL
dynamic without concatenating strings:

```apex
String targetIndustry = 'Technology';
Integer minEmployees = 50;

List<Account> accts = [
    SELECT Id, Name
    FROM Account
    WHERE Industry = :targetIndustry
      AND NumberOfEmployees >= :minEmployees
];
```

Bind variables also work with collections — a `List<Id>` bound after `IN`
filters on a set of record IDs, which is the standard way to re-query records
you already have:

```apex
Set<Id> accountIds = new Set<Id>{ '001000000000001', '001000000000002' };
List<Account> refreshed = [SELECT Id, Name, AnnualRevenue FROM Account WHERE Id IN :accountIds];
```

## Count queries

A query built with `COUNT()` instead of a field list returns an `Integer`
directly, with no `List` wrapper:

```apex
Integer openOppCount = [SELECT COUNT() FROM Opportunity WHERE StageName != 'Closed Won' AND StageName != 'Closed Lost'];
```

## SOQL `for` loops

When you only need to walk through query results once — without holding the
whole list in a separate variable — a SOQL `for` loop is the idiomatic Apex
pattern. It can iterate one record at a time, or in batches of up to 200
records at a time (useful for working within governor limits, covered in
Chapter 4):

```apex
for (Contact c : [SELECT Id, LastName, Email FROM Contact WHERE Email = null]) {
    System.debug('Missing email: ' + c.LastName);
}
```

Apex transparently retrieves the records in chunks of up to 200 behind the
scenes, so this form is also more memory-efficient for larger result sets
than materializing the full list first.

## Checking before you use a result

Because a `List`-typed query can legitimately come back empty, always check
`isEmpty()` (or `size()`) before assuming a record exists:

```apex
List<Account> matches = [SELECT Id FROM Account WHERE Name = 'Acme'];
if (!matches.isEmpty()) {
    Account acme = matches[0];
}
```

## Key terms

| Term | Meaning |
|---|---|
| Inline SOQL | A SOQL statement written directly in Apex, wrapped in `[ ]` |
| Bind variable | An Apex variable referenced in SOQL with a leading `:` |
| Singleton assignment | Assigning a query directly to one sObject variable (must return exactly one row) |
| `QueryException` | Thrown when a singleton assignment gets zero or more than one row |
| SOQL `for` loop | A `for` loop whose source is an inline query, fetched in batches of up to 200 |

## Lab

In a Developer Edition org's Developer Console, open **Debug > Open Execute
Anonymous Window** and run:

```apex
String industryFilter = 'Technology';
List<Account> techAccounts = [SELECT Id, Name, NumberOfEmployees FROM Account WHERE Industry = :industryFilter];
System.debug('Technology accounts found: ' + techAccounts.size());

for (Contact con : [SELECT Id, FirstName, LastName FROM Contact WHERE AccountId IN :new Map<Id, Account>(techAccounts).keySet()]) {
    System.debug('Contact at a tech account: ' + con.FirstName + ' ' + con.LastName);
}
```

Check the debug log: confirm the account count logged matches what you expect
for your org's sample data, and that each contact logged really does belong
to one of those accounts.

## Check yourself

What happens if you assign `[SELECT Id FROM Account WHERE Name = 'NoSuchAccount']`
directly to a single `Account` variable instead of a `List<Account>`? Why
does a SOQL `for` loop avoid the governor-limit concerns a very large
`List<SObjectType>` assignment could raise?
