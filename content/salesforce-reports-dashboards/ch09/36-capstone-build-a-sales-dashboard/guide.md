# Capstone: Build a Sales Dashboard

Now you build. In this lesson you'll turn the five sales questions from the kickoff into
five reports and assemble them into one Monday-ready dashboard for Harborline Supply
Company. All figures are illustrative examples; your org's numbers will differ, and the
click-paths and field names may vary slightly with your org's setup and Salesforce release,
so use the pickers your org shows you rather than typing names from memory.

## What you'll learn

- How to map each business question to one report, filters, and a chart
- How to build a coverage measure and a win rate with formulas
- How to assemble components, dashboard filters, and a running user
- How to reconcile dashboard numbers against their source reports

## Step 1: five reports, one per question

All five use the standard **Opportunities** report type. That is deliberate: dashboard
filters can only apply cleanly when the underlying reports share fields, and Opportunities
has everything this dashboard needs. Put them in a folder named "Harborline Sales."

| Report | Answers | Component |
|---|---|---|
| Won This Quarter | On track vs. the $6.0M quota? | Gauge |
| Won by Region | Split across West, Central, East? | Bar chart |
| Open Pipeline by Stage | Does pipeline cover the gap? | Funnel + metric |
| Win Rate and Deal Size | Win rate and average deal size? | Metrics |
| Stalled Deals | Which open deals went quiet? | Table |

## Step 2: the won reports

For **Won This Quarter**, filter Close Date to *This Fiscal Quarter* and the stage to
*Closed Won*, then summarize the sum of Amount. Example result: **$3.9M** from **81 deals**.

For **Won by Region**, keep the same filters and group by the opportunity owner's role (or a
region field, if your org has one). Example result: West $1.6M, Central $1.3M, East $1.0M.
A horizontal bar chart fits, since you're comparing three categories.

## Step 3: pipeline and coverage

For **Open Pipeline by Stage**, filter to open opportunities with a Close Date in this
fiscal quarter and group by Stage. Example total: **$4.2M**. A funnel chart shows how much
sits in early versus late stages.

Coverage compares pipeline to the *remaining* gap: $6.0M quota minus $3.9M won equals
$2.1M. A summary formula, dividing the sum of Amount by 2,100,000, returns **2.0x**. Notice
the honest weakness: the quota lives outside the report, so the gap is hard-coded. Update it
weekly and note it on the dashboard. This is exactly the kind of native limit Chapter 8
described, and being upfront about it builds trust.

## Step 4: win rate and deal size

Filter to closed opportunities over the trailing twelve months. Add a **row-level formula**
that returns 1 for Closed Won rows and 0 for Closed Lost. Then a **summary formula**
dividing the sum of that flag by the record count gives the win rate, **31%** in our
example. Average of Amount on the won deals gives the deal size, about **$48K**.

## Step 5: stalled deals

A tabular or summary report of open opportunities closing this fiscal quarter whose last
activity was more than 30 days ago (a relative date filter on the Last Activity field).
Example result: **23 deals worth $1.1M**. Sort by Amount and show owner, stage, and close
date. Display it as a table, since the reader needs names to act on.

## Step 6: assemble the dashboard

In the dashboard builder, add a component for each report. Follow the layout rule from
earlier: headline numbers top (gauge, pipeline total, win rate), charts in the middle, the
action table at the bottom. Title each component with the point, such as "Won: 65% of
quota," rather than the report name.

Add two **dashboard filters**: region (owner role) and opportunity type. Dashboard filters
allow only a small number of filters per dashboard, so choose the ones people actually use.

Choose the **running user** deliberately. A specified user with broad visibility suits a
Monday meeting, but every viewer sees what that user sees. Dynamic dashboards, if your org
has them enabled, show each viewer their own data instead.

## Step 7: reconcile before you share

- West + Central + East = 1.6 + 1.3 + 1.0 = $3.9M, matching the gauge
- 81 deals at about $48K is roughly $3.9M
- Coverage: 4.2 / 2.1 = 2.0x
- Open each source report from its component and confirm the totals agree

## Recap

Five questions became five reports and one dashboard: map question to report type, filter
the date range, add a formula where the report can't compute the answer, pick a chart that
fits, and reconcile every number.

## Check yourself

Why is the $2.1M gap hard-coded in the coverage formula a weakness, and what are two ways
you could reduce the risk it causes?
