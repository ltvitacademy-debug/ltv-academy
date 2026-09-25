# Formatting for Readability

A correct report that is hard to read gets ignored. Everything you built in the last
three chapters, the grouping, the formulas and the charts, only pays off if the person
opening the report can find the answer in a few seconds. This lesson closes out the
charts and visualization chapter by covering the formatting choices that separate an
analyst's working draft from something a sales manager will actually use.

You already know your way around the data. The skill here is editorial: deciding what to
show, what to hide, and what to emphasize.

## What you'll learn

- Which report-level settings make a summary report easier to scan
- How to configure a report chart so it states its takeaway
- How conditional highlighting draws the eye to what matters
- A short checklist to run before you share any report

## Start with the report, not the chart

Open any grouped report and ask what a busy reader needs. In the Lightning Report Builder
you can reorder columns, remove ones nobody reads, and, in most orgs, rename a column
heading so it matches the language your team uses instead of the raw field label. You can
also turn **detail rows**, **subtotals**, and the **grand total** on or off. A summary
report with details collapsed reads like a scorecard; the same report with details shown
is an audit trail. Choose deliberately.

Sort order matters too. A report grouped by stage should usually follow the sales
process, not the alphabet, and a "top accounts" report should sort by the value column,
descending. Groupings inherit the sort direction you set on the grouping itself.

## Make the chart state its takeaway

The chart properties panel controls the chart type, title, value, and how groups are
sliced. Treat each setting as an editing decision:

- **Title** the chart with the point, not the field name. "Open pipeline by stage" beats
  "Sum of Amount".
- **Show values** so nobody has to hover to read a number.
- **Combine small groups into "Others"** instead of drawing a dozen slivers.
- **Choose the type by question**: bars to compare, lines for trends over time, a donut
  only for a small number of parts of a whole.
- **Use display units**, such as shortened numbers, so axes read $4.7M rather than
  4,700,000.

## Conditional highlighting

Summary and matrix reports in Lightning let you apply conditional highlighting to a
summary field. You define a small number of ranges, commonly up to three, and assign a
color to each. A win-rate column that turns red below 20 percent and green above 50
percent lets a manager scan a hundred rows in seconds. Use it sparingly: if everything
is colored, nothing stands out, and color alone should never be the only signal for
readers with color-vision differences.

## A pre-share checklist

1. **Trim**: remove columns and groupings that do not serve the question.
2. **Order**: sort so the most important rows come first.
3. **Label**: rename titles and headings in plain language, and add a description.
4. **Highlight**: emphasize one or two thresholds, not everything.

## Recap

Formatting is part of the analysis. Trim what does not matter, order what does, label
things in the reader's language, and highlight only the thresholds that drive a
decision. Charts should carry their own headline. Next chapter you take these same
report charts onto dashboards, starting with what a dashboard component actually is.
