# Automated EDA Tools

Everything in this chapter so far has been hand-built: `info()`, histograms, group-bys, heatmaps. That is the right way to learn, and often the right way to think. But for a first pass on a new table, some libraries will generate a whole exploration report in a few lines. This lesson looks at two popular ones, **ydata-profiling** (formerly published as pandas-profiling) and **Sweetviz**, and, more importantly, how to use them without letting them do your thinking. The data is the same seeded, illustrative customer table (`customers.csv`, 500 made-up rows).

## What you'll learn

- What automated profiling reports contain
- How to generate a report with ydata-profiling and Sweetviz
- What the tool caught in our practice data, and what it did not name
- When automation helps and when it does not

## Installing

Both are third-party packages, not part of pandas:

```
pip install ydata-profiling sweetviz
```

Version compatibility matters. When I tried them for this lesson, ydata-profiling 4.6.4 and Sweetviz 2.3.3 both ran on the practice file, but I needed to line up my package versions (numpy, pandas, numba) to get there, and a newer ydata-profiling release refused to run on my older pandas. If an import or run fails, check the library's current documentation and release notes for supported pandas and numpy versions, and prefer a fresh virtual environment.

## ydata-profiling

```python
import pandas as pd
from ydata_profiling import ProfileReport

customers = pd.read_csv("customers.csv")
profile = ProfileReport(customers, title="Customer profile")
profile.to_file("customer_profile.html")
```

That writes a self-contained HTML report. For a 500-row, 7-column table it took only a few seconds. Open the file in a browser and you get an overview (rows, columns, missing cells, duplicates), one section per variable (statistics, histogram, common values), correlations, a missing-values view, sample rows, and a list of **alerts**. For large tables, the constructor accepts `minimal=True` to skip the most expensive computations.

You can also read the alerts in code:

```python
description = profile.get_description()
for alert in description.alerts:
    print(alert)
```

On the practice data this printed:

```
[orders] is highly overall correlated with [total_spend]
[total_spend] is highly overall correlated with [orders]
[age] 20 (4.0%) missing values
[orders] has 19 (3.8%) zeros
[total_spend] has 19 (3.8%) zeros
```

The overview reported 500 rows, 7 variables, 20 missing cells, and 0 duplicate rows, all matching what we found by hand in the first lesson.

## Sweetviz

Sweetviz produces a different style of report, with a strong focus on comparing two datasets or on a target column:

```python
import sweetviz as sv

report = sv.analyze(customers)
report.show_html("sweetviz_report.html", open_browser=False)

train = customers[:350]
test = customers[350:]
compare = sv.compare([train, "Train"], [test, "Test"],
                     target_feat="churned")
compare.show_html("sweetviz_compare.html", open_browser=False)
```

`sv.compare` puts two dataframes side by side, for example a training set and a test set, so you can check that they look alike. `target_feat` shows how each variable relates to the target. Both reports generated successfully for me.

## What automation caught, and what it didn't name

The tool did well on housekeeping: it counted the 20 missing ages, found no duplicates, noticed that `orders` and `total_spend` move together, and pointed out 19 customers with zero orders and zero spend. That last finding is a genuine question to ask the data owner: are those newly signed-up customers, or accounts that never purchased?

What the alert list did **not** name in my run were the two suspicious spend values of 7,400 and 9,800. The maximum is visible in the report's statistics for `total_spend`, but nothing in the alerts told me to be worried. Deciding that 2,450 per order is implausible needed the spend-per-order reasoning from the previous lesson, which needs context about what a customer normally does.

## Using these tools well

- **Use them for a first pass**, then follow up by hand on whatever looks interesting.
- **Read every section.** A report is easy to generate and easy to ignore.
- **Compare against what you know.** The tool does not know that a spend of 9,800 is unusual for your business.
- **Watch the cost.** Reports on very wide or very long tables can be slow; sample the data or use the lighter options.
- **Do not paste a report to stakeholders as the analysis.** It is a set of observations, not a story.

## Recap

- ydata-profiling and Sweetviz generate HTML exploration reports from a DataFrame in a few lines.
- They quickly catch missing values, duplicates, zeros, and strongly correlated columns.
- They can miss context-dependent problems such as implausible values, so hand-built EDA still matters.
- Check current documentation for versions and options, since these libraries change often.

Next: Power BI for data scientists, starting with connecting Power BI to Python and SQL data.
