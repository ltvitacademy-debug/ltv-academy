# Lesson 21 — Choosing the Right Visualization

**Chapter 3 · Visualization Fundamentals · Lesson 21 of 95**

## What you'll learn

- Tableau's own framework for chart selection: matching a chart type to
  the *analytical question* you're asking, not the other way around
- How to sort every chart type from this chapter into the question it
  actually answers best
- Why the same dataset can call for entirely different charts depending
  on what you're trying to find out
- A repeatable process for choosing a chart type before you open Show Me

## Form follows function

Tableau's own documentation puts it plainly: **form follows function**.
The visualization you build should depend on the question you're
asking, the properties of your data, and how you want to communicate
the answer — not on which chart type looks the most impressive, or
which one you happen to reach for out of habit. Tableau's help site
organizes chart selection around a set of common analytical questions,
each pointing to specific chart types:

![A small illustrated header graphic showing a bar chart with bars of varying heights, representing the Magnitude analytical category.](/courses/tableau/ch03/21-choosing-the-right-visualization/magnitude-chart-type.png)
*Magnitude — comparing the relative size of discrete items. "Which region has the highest sales?"*
Source: [Tableau Help — Choose the Right Chart Type for Your Data](https://help.tableau.com/current/pro/desktop/en-us/what_chart_example.htm)

![A small illustrated header graphic showing a scatter plot with a trend line running through a cluster of points, representing the Correlation analytical category.](/courses/tableau/ch03/21-choosing-the-right-visualization/correlation-chart-type.png)
*Correlation — looking for a relationship between two measures. "Are these two measures related, and how strongly?"*
Source: [Tableau Help — Choose the Right Chart Type for Your Data](https://help.tableau.com/current/pro/desktop/en-us/what_chart_example.htm)

## The full framework, mapped to this chapter

Every chart type you've built in Chapter 3 falls under one of Tableau's
own analytical categories. Matching the category to your actual
question is the whole exercise:

| Question you're asking | Category | Chart types from this chapter |
|---|---|---|
| "How has this changed over time?" | Change over time | Line charts, area charts (Lesson 15) |
| "Are these two measures related?" | Correlation | Scatter plots (Lesson 18) |
| "Which item is biggest? How do these compare?" | Magnitude | Bar charts (Lesson 14) |
| "How far does this stray from a baseline?" | Deviation | Bar charts, highlight tables with a diverging palette (Lesson 17) |
| "What's the spread or shape of this measure?" | Distribution | Histograms (Lesson 19), box plots (Lesson 20) |
| "What's the relative rank of every member?" | Ranking | Bar charts, sorted (Lesson 14) |
| "How much does each part contribute to the whole?" | Part-to-whole | Pie charts, donut charts, treemaps, stacked area/bar (Lessons 14-16) |
| "Where, geographically, is this happening?" | Spatial | Maps (Chapter 9, later in this course) |

Notice that several chart types show up in more than one row — a bar
chart, for instance, can answer a magnitude question, a deviation
question, or a ranking question, depending entirely on what's on the
axis and how it's sorted. The chart type alone never tells you the
question; **your framing does.**

## A process, not a guess

Before opening Show Me, ask yourself these three questions, in order:

1. **What question am I actually trying to answer?** Not "what does my
   data look like," but the specific thing a viewer needs to walk away
   knowing.
2. **Which category from the table above does that question fall
   under?** Change over time, correlation, magnitude, deviation,
   distribution, ranking, part-to-whole, or spatial.
3. **Of the chart types in that category, which one fits the number of
   dimensions and measures I actually have?** A pie chart works for
   three categories; it falls apart at fifteen. A scatter plot needs
   two genuine measures; if you only have one, you need a histogram or
   box plot instead.

Show Me is still useful here — but only *after* you've answered these
three questions. Used before, it just shows you what's technically
possible with your current fields; used after, it helps you build the
specific chart type you already decided was right.

## Key terms

| Term | Meaning |
|---|---|
| Form follows function | Tableau's own framing: the visualization should be driven by the analytical question, not chosen first and the question fit to it afterward |
| Analytical category | One of Tableau's eight+ question types (change over time, correlation, magnitude, deviation, distribution, ranking, part-to-whole, spatial) that a chart type is built to answer |

## Lab

1. Pick three questions about the Sample Superstore dataset — one about
   change over time, one about part-to-whole, one about distribution.
   For each, name the chart type from this chapter you'd build, before
   opening Tableau.
2. Build all three in Tableau and confirm each answers its question
   directly, without needing to explain the chart to a viewer first.
3. Take one bar chart you've already built in this chapter and describe
   which of the eight categories it's answering — magnitude, deviation,
   or ranking — and how you'd know from looking at it.

## Check yourself

You're ready for Chapter 4 when you can look at an unfamiliar dataset,
name the specific question you want answered, and pick a chart type
from this chapter's toolkit — before opening Show Me — that answers it
directly.
