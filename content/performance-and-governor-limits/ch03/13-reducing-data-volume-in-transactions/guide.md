# Lesson 13 — Reducing Data Volume in Transactions

**Chapter 3 · Fixing Performance · Lesson 13 of 16**

## What you'll learn

- Why "fewer governor-limit operations" and "less data per operation" are two separate optimization axes
- How field and relationship selection in SOQL directly affects heap usage
- Why processing in smaller, deliberate chunks can help even when a single limit isn't yet being crossed
- A before/after example focused specifically on data volume, not query count

## Two separate axes: how many operations, and how much data per operation

Chapters 1 and 3 so far have mostly focused on reducing the *number* of governor-limit-consuming operations — one query instead of many, one DML statement instead of many. This lesson is about the other axis: reducing *how much data* moves through each of those operations. A perfectly bulkified transaction that issues exactly one SOQL query can still be unhealthy if that one query selects far more fields, or far more rows, than the transaction actually needs — the operation count is fine, but the data volume per operation is not.

## Selecting only what a transaction actually uses

```apex
// Selects every field on the object and every related Contact field,
// even though this method only ever reads two fields from each
List<Account> accounts = [
    SELECT Id, Name, Industry, AnnualRevenue, BillingStreet, BillingCity,
           BillingState, BillingPostalCode, BillingCountry, Phone, Fax,
           Website, Description, NumberOfEmployees, Ownership, TickerSymbol,
           (SELECT Id, Name, Email, Phone, Title, Department, MailingCity
            FROM Contacts)
    FROM Account
    WHERE Id IN :accountIds
];
for (Account a : accounts) {
    System.debug(a.Name + ' - ' + a.AnnualRevenue);
}

// Selects exactly what this method reads, nothing more
List<Account> accounts2 = [
    SELECT Id, Name, AnnualRevenue
    FROM Account
    WHERE Id IN :accountIds
];
for (Account a : accounts2) {
    System.debug(a.Name + ' - ' + a.AnnualRevenue);
}
```

Both versions issue exactly one query, so Lesson 3's bulkification goal is already met in both — but the first version pulls a large number of unused fields and an entire related Contacts subquery into heap (against the 6 MB/12 MB ceiling from Lesson 2) for data the method never reads. Trimming the SELECT clause to only what's actually used reduces real memory pressure without changing the operation count at all.

## Chunking large volumes deliberately

Even bulkified, selective code can still be working against a single transaction's limits if it tries to process an unusually large number of records in one pass — for example, a nightly cleanup job touching every record in a large object at once. Rather than forcing all of it through one transaction, Batch Apex (covered in depth in a dedicated asynchronous Apex course) exists specifically to process records in smaller, controlled chunks, each chunk running as its own transaction with its own fresh governor limit budget:

```apex
public class LargeCleanupBatch implements Database.Batchable<SObject> {
    public Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Status__c FROM Large_Object__c WHERE Status__c = 'Stale'
        ]);
    }

    public void execute(Database.BatchableContext bc, List<Large_Object__c> scope) {
        // Each call to execute() gets its own transaction and its own fresh
        // governor limit allotment — scope is typically a manageable chunk
        // (up to 2,000 records per chunk by default), not the entire result set at once.
        for (Large_Object__c rec : scope) {
            rec.Status__c = 'Archived';
        }
        update scope;
    }

    public void finish(Database.BatchableContext bc) {}
}
```

The key idea, independent of Batch Apex's full mechanics: deliberately processing a large volume of data in smaller pieces, each with its own transaction boundary, is a direct answer to "this needs to touch more records than one transaction's limits comfortably allow."

## Key terms

| Term | Meaning |
|---|---|
| Operation count | How many governor-limit-consuming operations (queries, DML statements) a transaction issues |
| Data volume per operation | How much data (fields, rows, related records) each individual operation actually moves |
| Field selection | Naming only the fields and relationships a SOQL query's consuming code actually reads |
| Chunking | Deliberately splitting a large volume of work across multiple smaller transactions, each with its own fresh limit budget |

## Lab

Take a SOQL query from an earlier lesson in this course (or write a short hypothetical one) that selects 10 or more fields and a child relationship subquery. Identify, by actually reading the surrounding code's logic, which fields are genuinely used versus which are selected but never referenced. Rewrite the query to include only the fields actually used, and write one sentence explaining why this change reduces heap usage without changing the query count at all.

## Check yourself

Can you explain, in your own words, the difference between "how many operations" and "how much data per operation" as two separate things to optimize? Can you describe why a bulkified, single-query transaction can still have a data volume problem? Can you explain, at a conceptual level, why chunking a large job into multiple transactions helps with governor limits even when each individual chunk's code is unchanged?
