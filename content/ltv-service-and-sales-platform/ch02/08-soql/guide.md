# Lesson 8 — SOQL

**Chapter 2 · Build: Automation and Code · Lesson 8 of 25**

## What you'll learn

- SOQL syntax for querying Solstice's data model, including relationship queries in both directions
- Aggregate SOQL for the kind of reporting-style questions Lesson 16's reports will also answer
- SOSL versus SOQL, and when each one is the right tool
- Why selectivity — not just correctness — matters for every query you write on this platform

## SOQL basics against this data model

**SOQL** (Salesforce Object Query Language) is how Apex (and Flow's Get Records, and reports) reads Salesforce data. A basic query against this platform's objects:

```sql
SELECT Id, Status__c, Scheduled_Date__c, Technician__c
FROM Installation_Job__c
WHERE Status__c = 'Scheduled'
  AND Scheduled_Date__c = TODAY
```

That returns today's scheduled jobs — exactly what the Lesson 12 technician job board will query.

## Relationship queries: child-to-parent and parent-to-child

SOQL lets you traverse relationships in one query instead of running several. **Child-to-parent**, walking up via dot notation:

```sql
SELECT Id, Status__c, Case__r.Subject, Case__r.AccountId, Asset__r.SerialNumber
FROM Installation_Job__c
WHERE Technician__c = :UserInfo.getUserId()
```

This pulls each job's parent Case subject and the appliance's serial number in the same query, which is exactly what keeps the job board's Apex controller from needing a second round trip.

**Parent-to-child**, using a subquery against the child relationship name:

```sql
SELECT Id, Name, (SELECT Id, Status__c FROM Installation_Jobs__r)
FROM Case
WHERE AssetId != null
```

`Installation_Jobs__r` here is the **child relationship name** for `Installation_Job__c`'s lookup to Case — Salesforce generates this name from the lookup field automatically (defaulting to the object's plural API name), and getting it right is one of the most common real-world SOQL mistakes, since it's different from the object's own name.

## Aggregate SOQL

For reporting-style questions — "how many warranty claims are open per manufacturer status" — SOQL supports aggregate functions directly:

```sql
SELECT Claim_Status__c, COUNT(Id) claimCount, SUM(Claim_Amount__c) totalClaimed
FROM Warranty_Claim__c
GROUP BY Claim_Status__c
```

This single query is the backbone of the warranty-claim dashboard component you'll query from Apex in a later lesson, rather than pulling every `Warranty_Claim__c` record into Apex and summing it in a loop — which would also risk the 50,000-row SOQL limit from Lesson 7 on a large data set.

## SOSL: when you need text search, not filtering

**SOSL** (Salesforce Object Search Language) is a separate query language for full-text search across multiple objects at once — useful when a Service Agent types a customer's name or a partial serial number into a global search box and you don't know in advance whether the match is on an Account, a Contact, or an Asset:

```sql
FIND 'GE-RF-88231*' IN ALL FIELDS
RETURNING Asset(Id, Name, SerialNumber), Account(Id, Name)
```

The rule of thumb: if you know which field to filter on and which object you're querying, use SOQL; if you're searching loosely across text fields and possibly multiple objects, use SOSL.

## Selectivity: why "correct" isn't the whole job

A query can return the right rows and still be a problem at scale if it isn't **selective** — meaning it doesn't rely on an indexed field to narrow the result set before Salesforce has to scan records. Standard indexed fields include the record Id, Name, OwnerId, CreatedDate, and any field marked External ID or Unique; custom lookup and master-detail fields are indexed automatically. A query filtering only on a non-indexed custom text field, against an object with hundreds of thousands of rows, can be rejected by Salesforce as non-selective in certain contexts (like batch Apex query locators) or simply run slowly enough to hurt a user-facing page. This is why `Technician__c` and `Asset__c` — both lookup fields, both indexed by default — are the filters this lesson's queries lead with, rather than filtering first on a picklist like `Status__c`.

## Key terms

| Term | Meaning |
|---|---|
| SOQL | Salesforce Object Query Language, for filtered queries against known objects and fields |
| Child relationship name | The name used to query a child object from its parent in a subquery, generated from the lookup field |
| Aggregate function | A SOQL function (COUNT, SUM, AVG, etc.) used with GROUP BY to summarize rows |
| SOSL | Salesforce Object Search Language, for full-text search across one or more objects |
| Selectivity | Whether a query's filters can use an index to narrow results efficiently |

## Lab

Write three SOQL queries against this platform's data model: one child-to-parent query pulling a Warranty_Claim__c's Asset serial number and Case subject in a single query, one parent-to-child query pulling a Service_Contract__c's Account name along with its related Warranty_Claim__c records, and one aggregate query counting Installation_Job__c records by Status__c. Run all three in Developer Console's Query Editor against your scratch org's test data.

## Check yourself

- What's the difference between a child-to-parent and a parent-to-child SOQL relationship query?
- When would you reach for SOSL instead of SOQL?
- Why does this lesson recommend filtering on `Technician__c` or `Asset__c` rather than `Status__c` first?
