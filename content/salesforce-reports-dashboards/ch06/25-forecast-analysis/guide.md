# Forecast Analysis

Lesson 24 built the pipeline view: what is open, at which stage, owned by whom. Forecasting adds a promise on top of that pipeline: how much of it will actually close this period, and how confident are we? In this lesson you will learn which native Salesforce tools answer forecast questions, and where reports and the Forecasts page each do the job better.

## What you'll learn

- The difference between the Forecasts page and a forecast report
- How Forecast Category turns your stages into a commit, best case and pipeline view
- How to measure pipeline coverage against a target
- Why forecast accuracy is hard to see natively, and what to do about it

## Two tools, two jobs

Most orgs that use Sales Cloud have a **Forecasts** page (Collaborative Forecasts, in Lightning). It rolls opportunity amounts up your role or territory hierarchy, shows each manager's team total, and lets managers adjust a number with a note. The exact columns, forecast types and adjustment options depend on your edition and setup, so treat the screenshot in the video as one example of what it can look like.

A **report** answers different questions. The Forecasts page is optimised for the weekly call: what is my number? A report is better for slicing: which deals sit in Commit, which product lines drive Best Case, which lead sources feed the quarter?

## Forecast Category is the key field

Every opportunity has a **Forecast Category**, and in most orgs it is set automatically from the Stage. The standard categories are Omitted, Pipeline, Best Case, Commit and Closed. A useful first forecast report:

- Report type: Opportunities
- Filter: Close Date = THIS QUARTER, plus any Opportunity Owner scope you need
- Group rows by Forecast Category
- Summarize Amount (sum) and Record Count

Read it as a ladder. Closed is the floor, Closed plus Commit is your call, and Closed plus Commit plus Best Case is the stretch. Some orgs also let reps override the category by hand, so check whether the field follows the stage or is edited directly before you trust it.

## Pipeline coverage

Coverage answers a simple question: is there enough open pipeline to hit the target? The formula is open pipeline divided by the remaining target. A common rule of thumb is around three times coverage, but the right ratio depends on your win rate, which you will measure in lesson 28.

The awkward part is the target. Quota lives with the forecasting feature, not as a field on Opportunity, so a standard opportunity report cannot divide by it. In practice analysts either store a target on a custom field, or show open pipeline in a dashboard gauge whose goal is typed in by the dashboard builder.

## Forecast accuracy is the hard one

Accuracy compares what you predicted at the start of a period with what actually closed. Native reports show today's data, not last month's opinion. Depending on edition, historical trend reporting on Opportunity can capture amount and forecast category over time. Otherwise many teams use a reporting snapshot or simply record the commit number at the start of each period in a custom object. Be honest about this limit; it comes back in lesson 33.

## Watch for these traps

- Close dates that were never updated, which quietly inflate the current quarter
- Reps whose Commit deals never close, which shows up in accuracy by owner
- Comparing Amount to a quota measured in a different currency or forecast type

## Recap

Use the Forecasts page for the weekly roll-up and reports for slicing. Group by Forecast Category to build the ladder, measure coverage against a target you have to source deliberately, and plan ahead for accuracy, because the data to measure it needs to be captured before you need it.
