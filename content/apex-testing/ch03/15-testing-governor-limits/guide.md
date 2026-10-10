# Lesson 15 — Testing Governor Limits

**Chapter 3 · Test Strategy · Lesson 15 of 18**

## What you'll learn

- The real, documented synchronous Apex governor limits worth knowing by heart
- How to use the `Limits` class to check consumption *during* a test, not just react to a failure after the fact
- Why `Test.startTest()` giving a fresh limit context matters when writing a limits-focused test
- How to deliberately write a test that proves code stays within limits at a realistic bulk size

## The limits that matter most

Salesforce's Apex Developer Guide documents exact per-transaction governor limits on the Execution Governors and Limits page. The ones that come up constantly in real test-writing:

| Limit | Synchronous | Asynchronous |
|---|---|---|
| Total SOQL queries issued | 100 | 200 |
| Total DML statements issued | 150 | 150 |
| Records retrieved by SOQL queries | 50,000 | 50,000 |
| Records processed by DML statements | 10,000 | 10,000 |
| Total callouts (HTTP requests or web service calls) | 100 | 100 |
| Maximum cumulative callout timeout | 120 seconds | 120 seconds |
| Maximum execution time per Apex transaction | 10 minutes | 10 minutes |
| Maximum CPU time | 10,000 ms | 60,000 ms |

These numbers are exactly why Lesson 8's bulk-safety testing matters: code that issues one SOQL query per record (SOQL-in-a-loop) stays well under 100 queries with a handful of test records, and then fails this exact limit the first time a real bulk operation sends 150+ records through in one transaction.

## The Limits class — checking consumption from inside a test

The `Limits` class gives you methods to read how much of each governor limit has been consumed *so far* in the current transaction, and what the maximum actually is — useful both in production code (to proactively chunk work before hitting a wall) and in tests, to directly prove a method stays under a limit rather than just hoping it does:

```apex
@isTest
static void bulkUpdateStaysUnderSoqlLimit() {
    List<Account> accounts = new List<Account>();
    for (Integer i = 0; i < 200; i++) {
        accounts.add(new Account(Name = 'Bulk ' + i));
    }
    insert accounts;

    Test.startTest();
    Integer queriesBefore = Limits.getQueries();

    AccountService.bulkProcess(accounts);

    Integer queriesUsed = Limits.getQueries() - queriesBefore;
    Test.stopTest();

    Assert.isTrue(
        queriesUsed <= 3,
        'Processing 200 Accounts should take a small, constant number of queries, not one per record: used ' + queriesUsed
    );
}
```

`Limits.getQueries()` returns the number of SOQL queries issued so far; `Limits.getLimitQueries()` returns the maximum allowed. Equivalent pairs exist for DML statements (`getDmlStatements()` / `getLimitDmlStatements()`), callouts, CPU time, and most of the other governor limits — letting a test assert directly on *how efficiently* code uses its budget, not only on whether it technically stayed under the wall.

## Why startTest() matters here specifically

Calling `Limits.getQueries()` immediately after `Test.startTest()` (rather than before it) matters because, as Lesson 1 and Lesson 11 covered, `startTest()` gives the code that follows a fresh governor-limit context. Measuring "queries used" across the `startTest()`/`stopTest()` boundary isolates the count to just the method under test, rather than including whatever setup queries ran earlier in the test method.

## Writing a limits-focused test deliberately

A test proving limit-safety should pick a record count that's actually representative of a real bulk scenario — not just "more than one," but close to what a real data load, mass update, or batch chunk could realistically send through. Testing with exactly 200 records (a commonly cited default batch size for many bulk DML contexts) and asserting the query count stays small and roughly constant — rather than scaling up with record count — is the single most valuable test you can add to code that's ever handled by a trigger.

## Key terms

| Term | Meaning |
|---|---|
| Governor limit | A platform-enforced per-transaction cap on a specific resource (SOQL queries, DML rows, CPU time, etc.) |
| `Limits` class | Apex class exposing methods to read current consumption and the maximum allowed for each governor limit |
| `Limits.getQueries()` / `Limits.getLimitQueries()` | Returns SOQL queries issued so far, and the maximum allowed, respectively |
| Constant-time query pattern | Code structured so its SOQL/DML usage stays roughly flat regardless of how many records are processed |

## Lab

Take the bulk-safe trigger handler from Lesson 8's lab. Write a test that inserts 200 records, wraps the call in `Test.startTest()`/`Test.stopTest()`, and asserts via `Limits.getQueries()` that the number of SOQL queries used stays under a small, fixed number (e.g. 3) regardless of the 200-record batch size. Then temporarily reintroduce a SOQL-in-a-loop bug and confirm the same assertion now fails, proving the test actually catches the regression.

## Check yourself

Can you state, from memory, the synchronous governor limits for SOQL queries, DML statements, and callouts per transaction? Can you explain how `Limits.getQueries()` and `Limits.getLimitQueries()` let a test prove efficiency directly, rather than just not crashing?
