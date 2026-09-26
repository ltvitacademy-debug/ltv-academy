# Building Exploratory Reports

In Chapter 3 you explored data in Python: one chart at a time, one cell at a time. Power BI gives you a different way to explore. You build a page of linked visuals, then click on one and watch the others respond. This lesson is deliberately light. If you have taken a full Power BI course, you already know the mechanics. Here we focus on how a data scientist uses the tool: to ask questions quickly, and to find out where to look next.

## What you'll learn

- How to structure an exploratory report so it answers questions, not just displays numbers
- How cross-filtering, slicers, and the Filters pane help you explore
- How a Python visual can add a chart Power BI does not ship with, and what it requires
- Why an ID column matters in a Python visual

## Start with a question, then give each page a job

An exploratory report is not a dashboard for executives. It is a workbench for you. A useful skeleton, using the illustrative churn dataset from this course (800 customers, columns such as plan, region, tenure and support tickets), looks like this:

1. **Overview page:** a card with the overall churn rate, plus a count of customers.
2. **Distribution page:** how tenure, spend and tickets are spread out. This is your univariate view.
3. **Relationships page:** churn broken down by plan, region, tenure band, and ticket count. This is your bivariate view.

One page, one job. If you cannot say in a sentence what a page is for, split it.

## Let the visuals talk to each other

In Power BI Desktop, selecting an element in one visual (a bar, a slice) usually filters or highlights the other visuals on the page. That is cross-filtering, and it is the fastest way to ask "what does this segment look like?" Select the East region and watch every other chart update.

The **Edit interactions** button on the Format tab lets you control how one visual affects another, so you can stop a visual from being filtered when that would mislead.

Two other tools help:

- **Slicers** put a filter directly on the page: pick a plan, restrict tenure.
- **The Filters pane** applies filters at the visual, page, or report level. Selecting the funnel icon on a visual shows which filters and slicers are affecting it, which is a good habit for checking your own work.

## Add a Python visual when you need one

Sometimes you want a chart Power BI does not have, or a plot you already trust in matplotlib. Power BI Desktop has a Python visual for this. Hedges apply: it needs a local Python installation with pandas and matplotlib, Python scripting must be enabled in Desktop, and setup details change, so check the current Microsoft documentation. Docs also note that Python visuals require a Pro or Premium Per User license to render in the service.

You drag fields into the visual's Values area. Power BI hands your script a pandas DataFrame named `dataset`, and your script plots to the default display:

```python
import matplotlib.pyplot as plt

rate = dataset.groupby("support_tickets")["churned"].mean()
rate.plot(kind="bar")
plt.ylabel("Churn rate")
plt.show()
```

We ran this code on the course dataset outside Power BI, assigning `dataset` ourselves. It gives churn rates of 0.113 for customers with zero tickets, 0.149 for one, 0.260 for two, and 0.413 for three.

## The duplicate-row trap

Per the Microsoft docs, a Python visual groups its fields like a table visual does, and duplicate rows appear only once. That silently breaks any analysis that counts rows. On our data, the columns `support_tickets` and `churned` alone contain only 13 distinct combinations, so 800 customers would collapse to 13 rows. The fix, which the docs also suggest, is to add a unique field such as `customer_id` to the visual so every row stays distinct. In our check, with `customer_id` included, all 800 rows survived.

## Know the limits

From the documentation as of this writing: a Python visual plots at most 150,000 rows, the script times out after five minutes, and the image is static. You cannot click a bar in it to cross-filter other visuals, although it responds to filtering and highlighting from elsewhere.

## Recap

- Build pages with one job each: overview, distributions, relationships.
- Use cross-filtering and slicers to ask quick "what about this segment?" questions.
- A Python visual brings matplotlib into Power BI, but it needs local Python and has limits.
- Always include an ID column, or duplicate rows collapse.
