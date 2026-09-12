# Lesson 24 — Choosing the Right Chart

**Chapter 7 · Charts & Data Analysis · Lesson 24 of 25**

## What you'll learn

- Why "which chart type looks best" is the wrong question to start with
- The five questions a chart actually answers, and which chart type fits
  each one
- Where Excel's own Recommended Charts feature lives, and why it's a
  starting point, not a verdict
- How to sanity-check a chart against the question you're actually
  trying to answer

## Start with the question, not the chart

The most common charting mistake isn't picking an ugly chart — it's
picking a chart type that can't actually answer the question behind it.
A perfectly formatted pie chart still fails if the real question was
"how did this trend over the year," because a pie chart has no concept
of time at all. Before opening the Insert tab, name the question in one
sentence. The chart type follows from that sentence, not the other way
around.

## Where Excel's Recommended Charts lives

Select your data and Excel's Insert tab has a shortcut aimed at exactly
this problem:

![Screenshot of the Charts group on the Excel Insert ribbon, showing Recommended Charts, PivotChart, and several individual chart type buttons.](/courses/excel/ch07/24-choosing-the-right-chart/o15-xl-insert-charts-1.jpg)
*Insert > Recommended Charts, in the Charts group.*
Source: [Microsoft Support — Create a chart with recommended charts](https://support.microsoft.com/en-us/excel/create-a-chart-with-recommended-charts-cd131b77-79c7-4537-a438-8db20cea84c0)

Clicking it opens a dialog that scans your selected data's shape and
proposes a few chart types that fit it:

![Screenshot of the Insert Chart dialog's Recommended Charts tab, showing a list of suggested chart thumbnails on the left and a larger preview of a selected stacked column chart on the right, with a caption explaining what the chart is used for.](/courses/excel/ch07/24-choosing-the-right-chart/o15-xl-insertchartdb-1.jpg)
*Excel even explains its reasoning under the preview — here, "A stacked column chart is used to compare parts of a whole."*
Source: [Microsoft Support — Create a chart with recommended charts](https://support.microsoft.com/en-us/excel/create-a-chart-with-recommended-charts-cd131b77-79c7-4537-a438-8db20cea84c0)

Treat this as a well-informed first guess, not the final answer — Excel
is reasoning purely from your data's shape (how many columns, how many
categories), not from the actual business question you're trying to
answer with it. Always check its suggestion against the question below.

## Five questions, five chart families

Most charting decisions collapse into one of these five questions:

**Comparison** — how do a handful of categories stack up against each
other right now? Bar and column charts are built for exactly this;
length is the easiest visual quantity for a person to compare
accurately.

**Trend over time** — is a value going up, down, or holding steady
across a period? Line charts exist specifically to show change over a
continuous axis — never use a pie chart for this, since a pie has no
sense of order or time at all.

**Composition of a whole** — what share does each part contribute to a
total? Stacked bar/column charts, or a 100% stacked variant, handle this
— a pie chart can work too, but only with a small handful of slices;
past five or six, a pie becomes unreadable.

**Relationship between two variables** — does one variable move with
another? Scatter charts plot two numeric measures against each other so
a correlation (or the lack of one) becomes visible at a glance — this is
the one job a bar or line chart can't do.

**Distribution of values** — how are individual values spread out across
a range? A histogram groups continuous values into bins and shows how
many observations fall into each one — useful for spotting outliers,
skew, or clusters that a simple average would hide entirely.

## Key terms

| Term | Meaning |
|---|---|
| Recommended Charts | Excel's Insert-tab feature that suggests chart types based on your selected data's shape |
| Comparison chart | Bar/column — compares discrete categories against each other |
| Trend chart | Line chart — shows change over a continuous time axis |
| Composition chart | Stacked bar/column or pie — shows how parts contribute to a whole |
| Scatter chart | Plots two numeric variables against each other to reveal relationships |
| Histogram | Bins continuous values to show how they're distributed across a range |

## Lab

1. Pick any dataset you've worked with in this course and write down, in
   one sentence, the actual question you'd want a chart to answer from
   it.
2. Select the data and open **Insert > Recommended Charts** — does
   Excel's top suggestion actually answer your one-sentence question, or
   just fit the data's shape?
3. If it doesn't match, manually pick the chart family (from the five
   above) that does, and build that chart instead.

## Check yourself

You're ready for Lesson 25 when you can look at any chart request and
name which of the five questions — comparison, trend, composition,
relationship, or distribution — it's really asking, before you touch
the Insert tab.
