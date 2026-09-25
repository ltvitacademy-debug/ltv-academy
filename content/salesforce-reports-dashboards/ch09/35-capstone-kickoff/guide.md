# Capstone Kickoff

Every earlier lesson in this course taught one skill on a small example. This capstone is
one continuous project: you'll build two real dashboards, a sales dashboard and a service
dashboard, for one company, then present them the way you would to a VP. It applies report
types, filters, formulas, charts, dashboard filters, and the sales and service analytics
from earlier chapters. Nothing new is taught here; the point is to use it all together.
This lesson sets up the company, the requests, and the plan. The next three lessons
execute them.

## What you'll learn

- The fictional company and the two dashboard requests
- The exact business questions each dashboard must answer
- A baseline of example numbers you can use to check your own work
- The repeatable plan you'll follow for both dashboards

## The scenario: Harborline Supply Company

**Harborline Supply Company** is a fictional distributor of industrial supplies, with about
180 employees. It uses Sales Cloud and Service Cloud in a single Salesforce org. You've
just joined as its Salesforce Data Analyst, reporting to the VP of Revenue Operations. Her
request, in her own words: "One dashboard I can open in Monday's sales meeting, and one for
the support review on Thursday. Numbers I can trust, and nothing I have to explain."

**Important:** every figure in this capstone is an illustrative example chosen so the four
lessons stay consistent. Your own org, whether a free Developer Edition org or a sandbox
with sample data, will show different numbers. What matters is that your method produces
the right *kind* of answer and that you can explain how each number was built.

## Dashboard 1: sales, five questions

Assume it is late in the fiscal quarter and the team quota is **$6.0M**.

1. Are we on track against quota this quarter?
2. How much open pipeline could close this quarter, and does it cover the gap?
3. How does closed revenue split across the West, Central, and East regions?
4. What is our win rate and average deal size?
5. Which open deals have gone quiet?

## Dashboard 2: service, five questions

Assume the current calendar month and a team of 12 support agents.

1. How many cases were opened and closed this month?
2. Is the open backlog growing or shrinking?
3. How many high-priority cases are old or escalated?
4. Where do cases come from (email, phone, web, chat)?
5. How is the workload spread across agents?

## The example baseline

Use these to sanity-check your finished dashboards. They are illustrative examples.

| Sales (this quarter) | Service (this month) |
|---|---|
| Closed Won: $3.9M from 81 deals (65% of quota) | 1,840 cases opened |
| Average deal size: about $48K | 1,725 cases closed |
| West $1.6M, Central $1.3M, East $1.0M | Open backlog: 412 (up 115 this month) |
| Open pipeline closing this quarter: $4.2M | 38 high-priority cases open over 5 days, 9 escalated |
| Remaining gap $2.1M, so 2.0x coverage | Average age of closed cases: 2.8 days |
| Win rate, trailing four quarters: 31% | Origin: 46% email, 31% phone, 18% web, 5% chat |
| 23 open deals with no activity in 30+ days, worth $1.1M | |

## The plan: the same five steps, twice

1. **Write the question.** Each report answers exactly one question.
2. **Choose the report type.** Match the question to the standard report type that
   already has the fields.
3. **Build the report.** Add filters, grouping, and any formula the question needs.
4. **Choose the chart.** Pick the chart type that fits the comparison, then format it.
5. **Assemble the dashboard.** Add components, dashboard filters, and a sensible running
   user, then check every number against the source report.

Then, in the final lesson, you'll write a short presentation and a portfolio summary.

## Before you begin

You need an org where you can create reports and dashboards (a Developer Edition org works),
sample Opportunity and Case data, and a folder for your work. Name everything clearly, for
example "Harborline Sales" as the folder, since naming is part of being trustworthy.

## Recap

Two dashboards, ten questions, one repeatable plan, and a baseline to check against. Next
lesson: build the sales dashboard.

## Check yourself

Why does the plan insist that each report answers exactly one question, and what would go
wrong on the dashboard if a single report tried to answer three?
