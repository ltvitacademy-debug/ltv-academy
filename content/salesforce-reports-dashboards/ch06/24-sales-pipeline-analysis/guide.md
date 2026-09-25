# Sales Pipeline Analysis

Pipeline is the first question every sales leader asks and the one analysts get asked
most: how much potential revenue is in play, where is it sitting, and is it moving? You
already know the Opportunity object from Salesforce Fundamentals and how to query it in
SOQL. This lesson shows how the same pipeline questions are answered with native reports
and dashboards, and where the built-in tools run out.

## What you'll learn

- How to define "pipeline" as a report filter
- The core pipeline reports: by stage, by close date, and by owner
- Which metrics belong on a pipeline dashboard
- Where native pipeline reporting has limits

## Defining pipeline

Pipeline usually means **open opportunities**, meaning records that have not yet been
closed won or closed lost. In a report on the Opportunities report type, that is a
filter, such as **Show Me: All opportunities** plus a stage or **Closed** condition that
excludes closed stages, and a **Close Date** range such as the current fiscal quarter.

If you think in SOQL, this is the same as:

```sql
SELECT StageName, SUM(Amount)
FROM Opportunity
WHERE IsClosed = false
GROUP BY StageName
```

The report builder produces the same thing without typing it: filter on open, group by
stage, and summarize **Amount**. Agree on the definition with your sales leaders first.
Some teams count only opportunities past a certain stage, or weight them by probability.

## The three core pipeline views

1. **Pipeline by stage.** A summary report grouped by Stage, with a sum of Amount and a
   record count. On a dashboard this becomes a **funnel** widget, so the drop-off
   between stages is visible. The dashboard in this lesson's screenshot shows amount by
   stage as a funnel.
2. **Pipeline by close date.** Group by Close Date, by month or fiscal quarter, to show
   when the pipeline is expected to convert. A column or line chart works well. This is
   also where you spot a pipeline that is all bunched in the last week of the quarter.
3. **Pipeline by owner.** Group by Opportunity Owner, sorted by amount, to see who
   carries the pipeline and who is thin. A bar chart or Lightning table works here.

A matrix report can combine these, for example Stage down the side and Close Month
across the top.

## Metrics worth putting on the dashboard

- **Total open pipeline** as a metric widget
- **Weighted pipeline**, using the standard **Expected Amount** field, which multiplies
  amount by the stage's probability
- **Average deal size** and **opportunity count** by stage
- **New pipeline created** this period, using Created Date, so you can see whether the
  top of the funnel is being refilled
- **Pipeline age**, using the Age field, to spot deals that have sat too long

Pair these with a dashboard filter on Owner, Region, or Close Date so each manager can
narrow the same dashboard to their own team.

## Limits of native pipeline reporting

- A report shows the pipeline **as it is now**. Answering "what did the pipeline look
  like at the start of the quarter?" needs historical trend reporting or opportunity
  history reports, which depend on how your org is set up and its edition.
- **Coverage** metrics, such as pipeline as a multiple of quota, need quota data that
  lives in a different place from opportunities, and are awkward to build natively.
- Reports are limited to what the report type joins; cross-object analysis needs
  custom report types.

## Recap

Pipeline analysis is open opportunities, grouped by stage, close date, and owner, with
amount and count summarized. The funnel widget, the metric widget, and a dashboard filter
cover most needs. Know where the native tools stop: history and coverage. Next up:
forecast analysis.
