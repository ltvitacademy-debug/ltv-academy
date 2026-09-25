# Capstone: Extract & Clean a Dataset

In the kickoff you met Summit Ridge Outfitters and sized its three data problems. Now you
get to work. This lesson is steps one and two of the plan: **extract** the data with real
SOQL, then **clean** it in a working copy, producing exactly the lists of changes you'll
load in the next lesson. Nothing in this lesson changes a single record in Salesforce.

## What you'll learn

- The baseline aggregate queries that prove how big each problem is
- How to find duplicate Leads with `GROUP BY` and `HAVING`, then extract the records themselves
- A rule for deciding which duplicate survives, and how to standardize `LeadSource`
- How to match orphan Contacts to their Accounts, and predict every number in advance

## Which tool for which query

Aggregate queries (`COUNT`, `GROUP BY`) are for exploring, so run those in Workbench or
the Developer Console. Record-level extracts, the ones that produce a CSV you'll clean and
reload, are Data Loader's job. Every query below runs against the sandbox.

## Step 1: The baseline

```sql
SELECT COUNT() FROM Lead

SELECT LeadSource, COUNT(Id) n
FROM Lead
GROUP BY LeadSource
ORDER BY COUNT(Id) DESC

SELECT COUNT() FROM Contact WHERE AccountId = null
```

Save these results. They confirm the kickoff numbers: 41,860 Leads, 14 distinct
`LeadSource` values (plus 4,210 with a null value), and 1,240 Contacts with no Account.
Later, they're what you compare against.

## Step 2: Find the duplicate Leads

```sql
SELECT Email, COUNT(Id) n
FROM Lead
WHERE Email != null
GROUP BY Email
HAVING COUNT(Id) > 1
```

This returns 2,760 rows, one per duplicated email address. It's the same
`GROUP BY`/`HAVING` pattern you learned earlier. But an aggregate query returns groups,
not the individual records, so it can't tell you *which* Lead to keep. For that, extract
the records themselves with Data Loader:

```sql
SELECT Id, Email, FirstName, LastName, Company, LeadSource,
       Status, IsConverted, CreatedDate, LastModifiedDate
FROM Lead
WHERE Email != null
ORDER BY Email, CreatedDate
```

Save the result as `leads_backup.csv` and don't edit it. Copy it to
`leads_working.csv`, count the rows in each email group with a spreadsheet formula, and
keep only the groups with two or more rows: 6,530 rows.

## Step 3: Choose the survivor

Every duplicate group needs exactly one survivor. Summit Ridge uses this rule, applied in
order:

1. A **converted** Lead always survives, because its conversion created (or linked to) an
   Account, Contact, and possibly an Opportunity.
2. Otherwise, the Lead with the most recent `LastModifiedDate` survives.
3. On a tie, the oldest `CreatedDate` survives.
4. A group with **two or more** converted Leads is not decided by rule. Send it to manual
   review.

Applying this to 2,760 groups leaves 2,760 survivors and **3,770 surplus Leads** to
remove. Write those 3,770 `Id` values to `leads_to_delete.csv`.

## Step 4: Standardize LeadSource

From the aggregate query, list all 14 distinct values and build a small mapping table
that sends each to a standard value. The six spellings of Trade Show (`Trade Show`,
`tradeshow`, `Trade-Show`, `TradeShow`, `Trade Show 2021`, `Trade show - Denver`) all map
to `Trade Show`. The other eight already match the org's standard list.

Across the six spellings, 15,340 Leads carry a Trade Show variant. 9,870 already say
exactly `Trade Show`, so 5,470 are wrong. But 1,930 of those 5,470 are surplus duplicates
you're already deleting, so there's no reason to update them. That leaves **3,540 Leads to
update**: write their `Id` and corrected `LeadSource` to `leads_source_fix.csv`.

The 4,210 Leads with a blank `LeadSource` stay blank. You have no evidence for what the
right value is, and inventing one would be worse than leaving the gap visible.

## Step 5: Match the orphan Contacts

```sql
SELECT Id, FirstName, LastName, Email, Legacy_Id__c, OwnerId
FROM Contact
WHERE AccountId = null
```

```sql
SELECT Id, Name, Legacy_Id__c
FROM Account
WHERE Legacy_Id__c != null
```

Export both. Then use a lookup in your working copy to join the 1,240 orphans, through
the ERP export's customer number, to `Account.Legacy_Id__c`. The result: 1,015 orphans
match an existing Account, and 225 match nothing. Those 225 belong to 61 distinct
companies, so `accounts_to_create.csv` has 61 rows, and `contacts_relink.csv` has all
1,240 Contacts with their parent's `Legacy_Id__c`.

## Predict before you load

Before leaving this lesson, write down the expected result of every change:

| Change | Rows | Expected effect |
|---|---|---|
| Delete surplus Leads | 3,770 | Lead count 41,860 down to 38,090 |
| Update LeadSource | 3,540 | Zero Trade Show variants left |
| Create Accounts | 61 | New Accounts with `Legacy_Id__c` set |
| Relink Contacts | 1,240 | Contacts with `AccountId` null drops from 1,240 to 0 |

## Key terms

| Term | Meaning |
|---|---|
| Aggregate query | A SOQL query using `COUNT`, `SUM`, and so on, usually with `GROUP BY`, that returns summary rows rather than records |
| HAVING | Filters groups after `GROUP BY`, for example `HAVING COUNT(Id) > 1` |
| Survivor | The one record in a duplicate group that you keep |
| Working copy | A copy of an export you clean, so the original backup stays untouched |
| Prediction | The exact count you expect after a change, written down before running it |

## Check yourself

A `GROUP BY Email HAVING COUNT(Id) > 1` query shows 2,760 duplicated addresses. Why can't
you delete duplicates using only that result, and what do you extract next?
