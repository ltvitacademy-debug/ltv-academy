# Capstone: Model a Metric Layer

The dashboard from Lesson 47 works, but it has a quiet risk. "Win rate" is defined inside one tile's query. Someone building a Tableau Next dashboard next month will define it again, slightly differently, and the CRO will hear two win rates in one meeting. In this lesson you'll fix that by defining Cobalt Ridge's headline metrics once, centrally, in a semantic model, with owners and written definitions. This applies Chapter 6: semantic layers, central metrics, governance, and drift. All numbers are illustrative.

## What you'll learn

- How to plan a semantic model for the capstone's data
- How to write a metric definition precise enough that two analysts get the same answer
- How to assign ownership and certify a metric
- How to test that the dashboard and the metric layer agree

## Step 1: plan the semantic model

A semantic model has two parts: the data model (which objects, and how they relate) and the business definitions on top (friendly names, aggregations, calculations). For Cobalt Ridge, the model contains three objects: **Opportunity**, **Account**, and **Product Usage** (which arrives in Lesson 49). Opportunity relates to Account by account ID, and usage relates to Account the same way. Get the relationships right first, since every metric inherits them.

Where this lives depends on your org and release. Metrics are built on semantic models in Tableau Next, and semantic modeling is tied to Data Cloud (Data 360). Check current Salesforce documentation for the exact build path in your org rather than relying on the menu names shown in any one screenshot.

## Step 2: write five metric definitions

For every metric, write down the same fields. If a definition can't be written this precisely, it isn't ready.

| Metric | Definition (illustrative) | Example |
|---|---|---|
| Net New Bookings | Sum of Amount, Closed Won, type New Business or Expansion (not Renewal), by Close Date | $5.2M this quarter |
| Pipeline Coverage | Open pipeline closing in the period, divided by (target minus Net New Bookings) | about 2.1x |
| Win Rate | Closed Won count divided by all closed count, closed in the trailing four quarters, excluding renewals | 27% |
| Sales Cycle Days | Median days from creation to close on won deals | 74 days |
| Seat Activation | Users active in the last 90 days divided by licensed seats, per account | 64% portfolio average |

Notice how each definition names its filter, its time basis, and its exclusions. "Win rate" without "by count, trailing four quarters, excluding renewals" is a number without a meaning.

## Step 3: ownership and certification

Every metric gets a named business owner, usually the team that lives with the number: Revenue Operations for bookings and coverage, Sales Leadership for win rate, Customer Success for seat activation. The owner approves the definition, and only approved metrics are marked certified for use in executive dashboards. Keep a short change log: what changed, when, who approved, and why. This is the discipline from the metric governance lesson, and it prevents "who changed the number?" conversations.

## Step 4: test for parity

Here is the honest part. Your CRM Analytics dashboard from Lesson 47 computes its own tiles from its own dataset, while the metric layer defines the same numbers in the semantic model. Unless your org connects them directly (check current documentation, as supported paths change), two definitions exist, and they can drift. So test parity:

1. Pick a period, for example the current fiscal quarter.
2. Read Net New Bookings from the dashboard tile and from the metric. Both should say $5.2M.
3. Repeat for coverage, win rate, and any metric you use in both places.
4. Record the result and the date in the change log.

When the values differ, the fix is almost always a filter or exclusion that one side is missing, such as forgetting to exclude renewals from win rate.

## Recap

A metric layer is written definitions, clear ownership, certification, and a parity test that proves the dashboard and the model agree. Next lesson: connect Data Cloud so Seat Activation has real usage data behind it.

## Check yourself

Why does a written definition need to state its time basis and exclusions, and what would happen to two teams' win rates if one included renewals and the other did not?
