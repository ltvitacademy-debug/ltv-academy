# Lesson 16 — Query Practice: Sales Data

**Chapter 3 · Search and SOSL · Lesson 16 of 23**

## What you'll learn

- Combining filtering, relationships, sorting, and aggregation into one realistic sales report query
- Reading a business question and translating it into the right combination of clauses
- Recognizing which earlier lessons' techniques a given requirement actually needs
- Where a semi-join is the cleaner choice over a relationship subquery for a sales question

## This lesson is a practice lesson, not new syntax

Every clause and pattern you need for this lesson was covered in Lessons 1–12. The goal here is building fluency: given a plain-English sales question, translate it correctly into SOQL without a sheet reminding you which clause does what. Three worked examples follow, each modeling a question a real sales-operations analyst would actually ask.

## Question 1: "Which accounts have an open opportunity over $50,000?"

This is a semi-join (Lesson 11) — you want `Account` rows, filtered by something that lives on a related `Opportunity`, without needing any `Opportunity` fields back:

```sql
SELECT Id, Name, Industry
FROM Account
WHERE Id IN (
    SELECT AccountId FROM Opportunity
    WHERE IsClosed = false AND Amount > 50000
)
ORDER BY Name
```

## Question 2: "For each account, list every open opportunity with its stage and amount."

This time you *do* need the `Opportunity` fields, nested under each account — a parent-to-child subquery (Lesson 8), not a semi-join:

```sql
SELECT Name, (
    SELECT Name, StageName, Amount
    FROM Opportunities
    WHERE IsClosed = false
    ORDER BY Amount DESC
)
FROM Account
WHERE Industry = 'Technology'
```

Notice the subquery itself has its own `ORDER BY` — each account's nested opportunities come back biggest-deal-first, independent of how the outer accounts are ordered (which, here, isn't sorted at all — you'd add an outer `ORDER BY Name` if that mattered too).

## Question 3: "What's the total pipeline value and average deal size, by stage, for deals created this quarter, but only for stages with more than 3 deals?"

This needs `GROUP BY` and `HAVING` together (Lesson 10), plus a date literal (Lesson 5):

```sql
SELECT StageName, COUNT(Id) dealCount, SUM(Amount) totalPipeline, AVG(Amount) avgDealSize
FROM Opportunity
WHERE CreatedDate = THIS_QUARTER
GROUP BY StageName
HAVING COUNT(Id) > 3
ORDER BY totalPipeline DESC
```

## The real skill: picking the right shape before you write a line

Notice the pattern across all three: the first decision isn't which keyword to type first, it's **what shape of answer the question actually wants.** "Which accounts..." wants account rows filtered by a related fact → semi-join. "List every opportunity under each account..." wants nested data → parent-to-child subquery. "Totals grouped by a category, with a floor on group size..." wants `GROUP BY` plus `HAVING`. Misreading that shape up front is the single most common mistake once you're past pure syntax — getting the syntax of a parent-to-child subquery perfect doesn't help if a semi-join was actually what the question called for.

## Key terms

| Term | Meaning |
|---|---|
| Semi-join vs. subquery | Semi-join for "filter by a related fact, don't need related fields back"; parent-to-child subquery for "I need the related records themselves" |
| Question shape | The structural type of answer a business question wants, which determines which SOQL pattern applies, before any syntax is written |

## Lab

Using a Developer Edition org's sample data (or your own test `Account`/`Opportunity`/`Contact` records), answer these three questions with real SOQL, run in the Query Editor: (1) Which accounts have zero opportunities at all? (2) For each account, list its contacts alongside the account's industry. (3) What is the largest open opportunity amount per `LeadSource`, for sources with at least 2 open opportunities?

## Check yourself

For the question "which accounts have never had a closed-lost opportunity," is the right tool a semi-join or an anti-join, and why? Before writing any SOQL for a new business question, what's the first thing you should decide?
