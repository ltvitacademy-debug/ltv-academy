# Pipeline & Conversion Analysis

This lesson answers Project 1's first, second, and fifth questions: which lead sources convert, whether open pipeline covers the gap to quota, and which deals have gone quiet. All numbers are illustrative Alder & Vale figures, and every one comes from a report or query you can build in your own org.

## What you'll learn

- How to measure lead conversion by source, with a row-level and a summary formula
- How to report open pipeline by stage and calculate coverage
- Why a healthy-looking coverage ratio can still fall short
- How to find stalled deals

## Lead conversion by source

Question: which lead sources produce leads that convert?

**Report:** Leads report type. Filter Created Date to the last 90 days, group by Lead Source, and add a row-level formula that flags conversion, such as `IF(Converted, 1, 0)`, named for example ConvFlag. Then add a summary formula that divides the total flags by the record count. The syntax is illustrative, so use the formula editor's field picker to write the exact field names:

```
ConvFlag:SUM / RowCount
```

If you prefer, a matrix with Lead Source down the side and Converted across the top shows the same counts without a formula. As a SOQL check:

```sql
SELECT LeadSource, IsConverted, COUNT(Id) n
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:90
GROUP BY LeadSource, IsConverted
```

Illustrative result for the last 90 days:

| Lead Source | Leads | Converted | Rate |
|---|---|---|---|
| Web | 480 | 48 | 10% |
| Partner Referral | 120 | 30 | 25% |
| Phone Inquiry | 160 | 32 | 20% |
| Purchased List | 240 | 12 | 5% |
| **Total** | **1,000** | **122** | **12.2%** |

Finding: Partner Referral converts at five times the rate of Purchased List, and Purchased List supplies a quarter of all leads. That is a resource-allocation insight, not just a statistic. Caveat for your write-up: conversion rate says nothing about deal *value*, and 90 days is a short window. Recent leads may not have had time to convert.

## Pipeline by stage

Question: how much open pipeline do we have, and where is it?

**Report:** Opportunities report type. Filter Closed = False, group by Stage, and show record count and sum of Amount. A funnel chart is a natural fit. The equivalent SOQL:

```sql
SELECT StageName, COUNT(Id) deals, SUM(Amount) total
FROM Opportunity
WHERE IsClosed = false
GROUP BY StageName
```

| Stage | Deals | Amount |
|---|---|---|
| Prospecting | 30 | $1.20M |
| Qualification | 26 | $1.25M |
| Proposal/Price Quote | 24 | $1.35M |
| Negotiation/Review | 16 | $1.00M |
| **Total open** | **96** | **$4.80M** |

Stage names here follow common Salesforce defaults; your org's sales process may differ, which is why Lesson 5 stressed checking real values. Stage-to-stage conversion (what share of deals advance) needs history, so it requires a report type that tracks stage changes, such as Opportunity History.

## Coverage, and why it can mislead

Add a second Opportunities report: Closed = False, Close Date = Current FQ. Suppose it shows **$1.35M** closing this quarter. The quarter's gap is **$540K** (quota $2.25M minus $1.71M won). So:

```
Coverage = 1,350,000 / 540,000 = 2.5x
```

A common rule of thumb is to want roughly three times coverage, though the right multiple depends on your win rate. Now apply the trailing win rate. **35% of $1.35M is about $473K, which is short of the $540K gap by roughly $67K.** Coverage looked healthy; expected value says otherwise. Hedge this correctly in your write-up: win rate by count is a blunt tool, and late-stage deals close more often than early ones.

## Win rate

**Report:** Opportunities report type, Closed = True, Close Date across the last four completed quarters, using a custom date range. Add a row-level formula WonFlag (1 for Closed Won, 0 for Lost) and a summary formula `WonFlag:SUM / RowCount`. Illustrative result: 140 won of 400 closed, or **35%**.

## Stalled deals

Question: which open deals have gone quiet?

**Report:** Opportunities, Closed = False, Last Activity older than 30 days (or blank). As a query:

```sql
SELECT Name, Amount, Owner.Name, LastActivityDate
FROM Opportunity
WHERE IsClosed = false
AND (LastActivityDate < LAST_N_DAYS:30
     OR LastActivityDate = null)
```

Illustrative result: **21 deals worth $0.9M**, about a fifth of the open pipeline. Keep this as a tabular report on the dashboard so managers can act on it.

## Recap

Convert by source with a row-level flag and a summary formula. Report open pipeline by stage. Calculate coverage, then test it against the win rate. Surface stalled deals as an action list.

## Check yourself

Your coverage is 2.5x and your win rate is 35%. Without doing the arithmetic, explain why that is likely not enough to close the gap.
