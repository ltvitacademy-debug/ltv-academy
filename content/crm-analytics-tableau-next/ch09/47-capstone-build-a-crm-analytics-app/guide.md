# Capstone: Build a CRM Analytics App

Now you build. In this lesson you'll turn the sales questions from the kickoff into a CRM Analytics app for Cobalt Ridge Software: a recipe that prepares the data, a dataset that holds it, and one executive dashboard. All figures are illustrative examples. Menu labels and click-paths vary with your org and Salesforce release, so use the pickers your org shows you rather than typing names from memory.

## What you'll learn

- How to design the app, recipe, dataset, and dashboard as one pipeline
- How to choose a dataset grain and shape the fields the dashboard needs
- How to write a simple SAQL query and where it fits
- How to reconcile dashboard numbers against a source you can trust

## Step 1: the app and its assets

Create a CRM Analytics app named **Cobalt Ridge Revenue**. The app is the container: it holds the datasets, recipe, and dashboards, and it is also the first layer of sharing, which Lesson 50 tightens. Plan two dashboards but build one now: **Pipeline & Bookings** for executives. A second, rep-level **Stalled Deals** view can reuse the same dataset later.

## Step 2: the recipe and the dataset grain

Build a recipe with the Opportunity object as its main input. Because each dataset row will be one opportunity, the **grain** is one row per opportunity. Everything else joins to that grain:

- **Account** supplies the Region field (a custom field in our example) and the customer name.
- **User** supplies the opportunity owner's name.
- A small **Targets** table supplies the quarterly target by region, loaded as its own dataset.

Notice that the target lives in data, not in a formula. That is a deliberate improvement over the native-report approach, where a quota often gets hard-coded. Add a computed field for **days since last activity** using the Opportunity's last-activity date, and a **stalled flag** for open deals idle 30 days or more. Run the recipe, then schedule it to refresh nightly so the dashboard starts each day current.

## Step 3: the dashboard components

Five components answer the five questions:

| Component | Answers | Example result |
|---|---|---|
| Number tile: Closed Won | On track vs. target? | $5.2M, 65% of $8.0M |
| Number tile: Coverage | Pipeline covers the gap? | $6.0M vs. $2.8M gap, about 2.1x |
| Number tile: Win rate | How healthy is conversion? | 27% |
| Bar chart by region | Regional split? | Americas $2.9M, EMEA $1.5M, APAC $0.8M |
| Table: stalled deals | Which deals went quiet? | 31 deals, $1.9M |

Add a global filter for fiscal quarter, and let a click on a region bar filter the stalled-deals table using the dashboard interactions you learned in Chapter 3. Keep the first page lean. Every extra widget is another query, and Chapter 3's performance guidance still applies.

## Step 4: a simple SAQL check

The chart's query, whether the dashboard builder writes it or you do, follows the same shape as any SAQL query: load, filter, group, generate. Illustrative example:

```
q = load "Opps";
q = filter q by 'IsWon' == "true";
q = group q by 'Region';
q = foreach q generate
  'Region' as 'Region',
  sum('Amount') as 'Won';
```

Dataset and field names are illustrative; use the names in your own dataset, and add a filter for the current fiscal quarter. Reading the query yourself is how you confirm what a tile really computes.

## Step 5: reconcile before you share

Before anyone sees the dashboard, check it:

1. The three regions must sum to the Closed Won tile ($2.9M + $1.5M + $0.8M = $5.2M).
2. Compare the Closed Won total against a native Salesforce report using the same filters.
3. Confirm the coverage tile uses the remaining gap ($8.0M minus $5.2M), not the full target.
4. Check the dashboard's last refresh time, and put it on the page.

If anything disagrees, fix the recipe, not the tile. A number patched at the chart level will drift again.

## Recap

An app, a recipe with a clear grain, a target stored as data, five components, and a reconciliation before sharing. Next lesson: model the metric layer so these numbers are defined once for everyone.

## Check yourself

Why is it better for the quarterly target to live in its own dataset than to be typed into a tile or formula, and what does the coverage tile show if someone forgets to update it?
