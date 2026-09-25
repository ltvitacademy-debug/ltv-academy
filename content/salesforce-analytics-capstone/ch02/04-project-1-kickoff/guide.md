# Project 1 Kickoff: The Business Questions

Chapter 1 explained what your portfolio has to prove. Now you start building it. Project 1 is a guided sales pipeline analysis: I will tell you the business question, show the approach, and you will reproduce it in your own org. Projects 2 and 3 hand you progressively less structure. This first one is deliberately a walkthrough, so the habits you build here (define first, check everything, write it up) carry into the ones where you work alone.

Nothing new is taught in this project. Every technique comes from an earlier course: the Salesforce data model, SOQL, report types, filters, formulas, charts, and dashboards. The skill being tested is applying them together to answer real questions.

## What you'll learn

- The fictional company and the sales team you are analyzing
- The five business questions Project 1 must answer
- The exact definitions of pipeline, win rate, coverage, attainment, and sales cycle
- An illustrative baseline you can check your own work against
- The plan for the next five lessons

## The scenario: Alder & Vale Systems

**Alder & Vale Systems** is a fictional mid-market B2B software company that runs Sales Cloud and Service Cloud in one Salesforce org. Its fiscal year is the calendar year. The sales team has six reps: Maya Ortiz, Dev Patel, Lena Fischer, Marcus Reid, Priya Nair, and Tomas Silva. The annual team quota is **$9.0M**, which is **$1.5M per rep**, or **$2.25M per quarter for the team ($375K per rep)**.

You have just joined as the company's Salesforce Data Analyst. The VP of Sales has asked for a pipeline analysis before the team's next planning meeting, and the instruction is short: "Tell me where we stand, and tell me what I should do about it."

**Important:** every number in this project is an illustrative example, chosen so the lessons stay consistent. Your org will show different values. What matters is that your method is sound and that you can explain how each number was built.

## The five business questions

1. **Lead sources.** Which lead sources produce leads that actually convert?
2. **Pipeline health.** How much open pipeline could close this quarter, and does it cover the remaining gap to quota?
3. **Rep performance.** How is each rep pacing against their quarterly quota, and who is at risk?
4. **Deal size and cycle.** What is our typical deal size and sales cycle, and do bigger deals behave differently?
5. **Stalled deals.** Which open opportunities have gone quiet and need attention?

Each question becomes one or more reports. Each report answers exactly one question, which keeps the dashboard honest.

## Definitions come first

Half of analytics disagreements are really definition disagreements. Write these down before you build anything:

- **Open pipeline:** opportunities where Closed is false.
- **Win rate:** Closed Won divided by all closed (won plus lost), by count, over the last four completed quarters.
- **Coverage:** open pipeline closing this quarter divided by the remaining gap to quota.
- **Quota attainment:** Closed Won amount this quarter divided by the quarterly quota.
- **Sales cycle:** days from an opportunity's created date to its close date, on Closed Won deals only.

## Setting up your data

Use a free Developer Edition org or a sandbox. Following the data-management techniques from the SOQL course, load sample records that roughly match the baseline: six users as opportunity owners, about 1,000 recent leads with a mix of lead sources, and about 500 opportunities across the last year with a realistic spread of stages, amounts, and dates. Generate them in Excel or with SQL; the exact records do not matter, but the structure does.

## The illustrative baseline

| Metric | Value |
|---|---|
| Q3 team quota | $2.25M |
| Q3 Closed Won | $1.71M from 38 deals (76%) |
| Remaining gap | $540K |
| Open pipeline closing this quarter | $1.35M (2.5x coverage) |
| Total open pipeline | $4.8M across 96 opportunities |
| Leads created, last 90 days | 1,000, of which 122 converted (12.2%) |
| Win rate, trailing four quarters | 35% (140 won, 260 lost) |
| Average won deal, trailing four quarters | $45K |
| Average sales cycle on won deals | about 57 days |
| Stalled open deals (no activity in 30+ days) | 21 deals, $0.9M |

## The plan

Lesson 5 connects Leads, Accounts, Contacts, and Opportunities. Lesson 6 covers pipeline and conversion. Lesson 7 covers rep performance. Lesson 8 covers deal size and sales cycle. Lesson 9 assembles the dashboard and the presentation.

## Recap

You have a company, five questions, five definitions, a baseline, and a plan. The discipline for the whole project: define, build one report per question, and reconcile every number before you show it to anyone.

## Check yourself

Why does the project define win rate by count over the last four completed quarters, instead of just using the current quarter? What could go wrong with a single-quarter win rate late in the quarter?
