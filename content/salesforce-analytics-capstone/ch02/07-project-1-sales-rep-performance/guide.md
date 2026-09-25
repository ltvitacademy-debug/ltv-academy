# Sales Rep Performance Analysis

Question three from the kickoff: how is each rep pacing against their quarterly quota, and who is at risk? This is the analysis a sales manager will read most closely, and the one where a careless number does the most harm, so this lesson covers both the build and how to present it responsibly. All figures are illustrative Alder & Vale numbers.

## What you'll learn

- How to build a rep-level attainment report with a summary formula
- How to add each rep's remaining gap and open pipeline
- How to read the results without over-claiming
- How to present rep data fairly

## The setup

Alder & Vale's quarterly quota is **$375K per rep** ($2.25M for the team). Assume it is the end of week 10 of a 13-week quarter, so about 77% of the quarter has passed. A straight-line pace target is therefore roughly **$289K per rep** ($375K x 10/13).

## Report 1: attainment by rep

**Report:** Opportunities report type. Filters: Close Date = Current FQ, and Closed Won (the Won checkbox is true). Group by Opportunity Owner, and show Sum of Amount and Record Count. Add a summary formula for attainment, illustrative syntax:

```
AMOUNT:SUM / 375000
```

Format it as a percent. The quota is hard-coded because every rep here has the same one. If quotas differ by rep, do not hard-code them; use a bucket column that maps each owner to their quota, or compare against Salesforce's forecast quotas if your org uses Collaborative Forecasts.

The equivalent SOQL check:

```sql
SELECT Owner.Name, SUM(Amount) won, COUNT(Id) deals
FROM Opportunity
WHERE IsWon = true AND CloseDate = THIS_QUARTER
GROUP BY Owner.Name
```

Illustrative result:

| Rep | Closed Won | Deals | Avg deal | Attainment |
|---|---|---|---|---|
| Maya Ortiz | $420K | 9 | $46.7K | 112% |
| Dev Patel | $360K | 8 | $45.0K | 96% |
| Lena Fischer | $330K | 7 | $47.1K | 88% |
| Marcus Reid | $240K | 6 | $40.0K | 64% |
| Priya Nair | $210K | 5 | $42.0K | 56% |
| Tomas Silva | $150K | 3 | $50.0K | 40% |
| **Team** | **$1.71M** | **38** | **$45.0K** | **76%** |

## Report 2: remaining gap and open pipeline

Attainment alone looks backward. Add a second report of open opportunities closing this quarter (Closed = False, Close Date = Current FQ), grouped by owner. Place both in one **joined report**, one block for Closed Won and one for open pipeline, so you can see them side by side. Joined reports also support cross-block summary formulas, which you can use to divide pipeline by gap.

| Rep | Gap to quota | Open pipeline (this quarter) | Coverage |
|---|---|---|---|
| Maya Ortiz | none (over) | $180K | n/a |
| Dev Patel | $15K | $210K | 14x |
| Lena Fischer | $45K | $240K | 5.3x |
| Marcus Reid | $135K | $250K | 1.9x |
| Priya Nair | $165K | $230K | 1.4x |
| Tomas Silva | $225K | $240K | 1.1x |

The team gap of $540K is net of Maya's $45K overage; the six individual gaps sum to $585K.

## What the numbers say

Three reps (Maya, Dev, Lena) are ahead of the $289K pace. Three (Marcus, Priya, Tomas) are behind, and Tomas has only 1.1x coverage of his gap. A commonly cited rule of thumb wants around 3x coverage, so Tomas and Priya are the clearest at-risk cases. Also notice **why**: Tomas has the largest average deal ($50K) but the fewest deals (3), which points toward pipeline volume or conversion of early-stage deals, not deal size.

## Reading it responsibly

- **Attainment is not skill.** Territory quality, deal timing, and ramp time all affect it. One quarter is a small sample.
- **Concentration matters.** Maya closed about 25% of team revenue; losing one strong quarter from her would swing the team result.
- **Frame as coaching.** Present rep data as "where should managers help," not a leaderboard of blame.
- **Mind visibility.** Sharing settings and the dashboard's running user decide who can see per-rep numbers. Confirm with the VP of Sales who should.

## Recap

Report Closed Won by owner with an attainment formula, add open pipeline and gap in a joined report, and interpret with context. Three reps are ahead of pace, three are behind, and Tomas and Priya have thin coverage.

## Check yourself

Marcus, Priya, and Tomas are all behind pace. Using the tables, explain how you would tell the VP that their situations are different from each other.
