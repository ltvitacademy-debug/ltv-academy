# Cross Filters

A standard filter asks a question about the records in your report: "Is this opportunity's amount over 50,000?" A **cross filter** asks about *related* records: "Does this account have any opportunities?" or, just as usefully, "Does this account have **no** activity at all?" Cross filters are how you find the gaps and overlaps between objects without writing a subquery.

## What you'll learn

- How to add a cross filter in the Report Builder
- The difference between WITH and WITHOUT
- How sub-filters narrow the related records
- How cross filters map to SOQL semi-joins and anti-joins

## Adding a cross filter

On the **Filters** tab, open the menu beside **Add filter...** and choose **Add Cross Filter**. (The same menu holds **Add Filter Logic**, covered in Lesson 9, and a row limit option, which is available only in certain formats.)

A dialog appears that reads like a sentence:

> **Show Me** *Accounts* **with** *Opportunities*

The first object is your report's primary object. The second is the **Secondary Object**, a related object chosen from a dropdown. The choices depend on the report type, since the type defines which relationships exist. If you do not see the related object you need, the report type is the usual reason.

## WITH and WITHOUT

- **With** keeps only parent records that have at least one related child record. *Accounts with Opportunities* excludes every account that has never had one.
- **Without** keeps only parent records that have **no** related child records. *Accounts without Opportunities* is a list of accounts nobody has worked. Analysts use this constantly for cleanup lists: contacts without a recent activity, cases without a resolution, leads without a campaign.

## Sub-filters

You can narrow the related records with **sub-filters**. For example: *Accounts with Opportunities where Amount is greater than 100,000 and Stage equals Closed Won*. The account only qualifies if it has at least one opportunity matching those conditions. Without sub-filters, any related record counts.

Be careful with WITHOUT plus sub-filters. *Accounts without Opportunities where Stage = Closed Won* returns accounts with no closed-won opportunities. Those accounts may still have open opportunities. Read the dialog aloud as a sentence to check that it says what you mean.

## The SOQL equivalent

If you finished the SOQL course, you have seen this shape:

```sql
-- Accounts WITH Opportunities (semi-join)
SELECT Id, Name FROM Account
WHERE Id IN (SELECT AccountId FROM Opportunity)

-- Accounts WITHOUT Opportunities (anti-join)
SELECT Id, Name FROM Account
WHERE Id NOT IN (SELECT AccountId FROM Opportunity)
```

A cross filter produces the same result with clicks. It is also worth remembering that this is the same idea as `EXISTS` and `NOT EXISTS` in T-SQL.

## Limits and habits

- In most orgs a report can have up to three cross filters, and each can have several sub-filters. Check your release for exact numbers.
- Cross filters change **which parent records appear**. They do not add child columns. If you want to see the opportunities themselves, use a report type that includes them, such as Accounts with Opportunities.
- Combine with a Show Me scope for tight lists, for example *My accounts without Opportunities*.
- After adding a cross filter, look at Total Records. If it is zero or unexpectedly large, re-read the sentence.

## Recap

- A cross filter filters parent records by the existence of related records.
- WITH keeps parents that have matches; WITHOUT keeps parents with none.
- Sub-filters add conditions on the related records.
- Under the hood it behaves like a SOQL semi-join or anti-join.

## Check yourself

Your manager wants a call list of accounts that have never had a case logged. Describe the cross filter you would set up, including the Show Me object, the secondary object, and whether you would use with or without.
