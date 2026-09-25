# Capstone Kickoff

Every earlier lesson in this course taught one skill on a focused example. This capstone is one continuous project. You'll build a CRM Analytics app, define a central metric layer, connect Data Cloud, and lock it all down with proper security, then present it to an executive the way you would in a real job. Nothing here re-teaches a concept. It applies datasets, recipes, dashboards, SAQL, semantic modeling, Data Cloud, and row-level security from the earlier chapters, together. This lesson sets up the company, the questions, the numbers, and the plan. The next four lessons execute it.

## What you'll learn

- The fictional company and what its Chief Revenue Officer asked for
- The business questions the finished app must answer
- A baseline of example numbers to check your own work against
- The four build stages and how they fit together

## The scenario: Cobalt Ridge Software

**Cobalt Ridge Software** is a fictional B2B software company with about 1,200 employees. It sells a project-planning platform to 3,200 customer accounts across three sales regions: the Americas, EMEA, and APAC. It runs Sales Cloud in one Salesforce org, and its product records usage data in its own systems. You've just joined as its Senior Salesforce Data Analyst. The Chief Revenue Officer's request: "One place where I, my regional VPs, and every rep can see the same revenue numbers, and I can trust that they match. Also tell me which renewals are at risk, before the renewal call."

**Important:** every figure in this capstone is an illustrative example chosen so the six lessons stay consistent. Your own org will show different numbers. What matters is that your method produces the right kind of answer and that you can explain how each number was built.

## The five business questions

1. Are we on track against this quarter's $8.0M new-business target?
2. Does the open pipeline cover the remaining gap, and how healthy is that coverage?
3. How do bookings split across the Americas, EMEA, and APAC?
4. Which open deals have gone quiet?
5. Which upcoming renewals show weak product adoption?

## The example baseline

Use these figures to sanity-check your finished work. They are illustrative.

| Sales (this quarter) | Adoption and renewals |
|---|---|
| Closed Won: $5.2M from 64 deals (65% of $8.0M) | 3,200 customer accounts sending usage data |
| Americas $2.9M, EMEA $1.5M, APAC $0.8M | Renewals in the next 90 days: $12.4M across 96 accounts |
| Open pipeline closing this quarter: $6.0M | 17 of those accounts under 40% seat activation |
| Remaining gap $2.8M, so about 2.1x coverage | Those 17 accounts hold $2.3M of ARR at risk |
| Win rate, trailing four quarters: 27% | |
| 31 open deals with no activity in 30+ days, worth $1.9M | |

## The four build stages

1. **Build the app.** Recipes turn Salesforce data into a clean dataset, and a dashboard answers the sales questions (Lesson 47).
2. **Model the metric layer.** Define the five headline metrics once, centrally, with owners and definitions (Lesson 48).
3. **Connect Data Cloud.** Bring product usage in, compute seat activation, and surface renewal risk next to the pipeline (Lesson 49).
4. **Secure it.** Row-level security, app sharing, and a test plan so each viewer sees only what they should (Lesson 50).

Lesson 51 turns the result into an executive presentation and a portfolio write-up.

## A note on product names

Salesforce renames things often. Data Cloud was rebranded Data 360 in late 2025, and this course keeps the familiar "Data Cloud" name with that note attached. Menu labels, setup paths, and feature availability also shift between releases and editions, so where a step depends on your org, use the pickers your org shows you and check current Salesforce documentation rather than trusting memory or a screenshot.

## Before you begin

You need a Developer Edition org or sandbox where you can use CRM Analytics, sample Opportunity and Account data, and, for Lesson 49, access to Data Cloud. If you don't have Data Cloud access, you can still follow along conceptually. Name everything clearly, for example an app called "Cobalt Ridge Revenue," because naming is part of being trustworthy.

## Recap

One company, five questions, one baseline, and four build stages that end in a presentation. Next lesson: build the CRM Analytics app.

## Check yourself

Why does the capstone insist on a fixed baseline of example numbers, and what would you check first if your finished dashboard showed a different Closed Won total?
