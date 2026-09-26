# Data Preparation With Data Wrangler

Real data is messy: missing values, duplicate rows, outliers, and, as we saw in Lesson 4, columns that quietly contain the answer. Amazon SageMaker Data Wrangler is AWS's visual tool for import, cleaning, feature engineering and analysis with little or no code. In this lesson we learn its concepts and, because a visual tool is only as good as your understanding of what it does, we rebuild the same checks in pandas so you can see exactly what they mean.

Two honest notes. First, Data Wrangler is a point-and-click tool, and no AWS account is used in this course text, so we do not show its screens; the description follows the current AWS documentation as of this writing. Second, the pandas code is only an **analogue** of the ideas; it is not Data Wrangler's own algorithm, and I ran it on a synthetic table.

## What you'll learn

- Where Data Wrangler lives now
- Its core pieces: flow, transforms, insights, analysis, export
- What a data quality and leakage check actually looks for
- How a flow becomes reusable code

## Where it lives

The AWS documentation says Data Wrangler has been **integrated into Amazon SageMaker Canvas**. If you use the newer Studio experience, you open Data Wrangler through Canvas, and the docs note that moving from Studio Classic may require extra permissions to create a Canvas application. The older description of Data Wrangler as a feature of **Studio Classic** still appears in the docs. Names and menus change often, so check which one your domain uses.

## The core pieces

Per the docs, Data Wrangler provides:

- **Import** from Amazon S3, Athena, Redshift, Snowflake and Databricks (the list in the Studio Classic guide).
- **Data flow**: a series of preparation steps, which can combine datasets from different sources.
- **Transform**: standard formatting tools, plus featurization such as categorical encoding and date/time embedding. You can also add your own Python transformations.
- **Data insights**: a Data Quality and Insights Report that verifies quality and detects abnormalities.
- **Analyze**: scatter plots, histograms, **target leakage analysis** and quick modeling.
- **Export** to an S3 bucket, SageMaker Feature Store, SageMaker Pipelines, or a Python script.

## What a quality report looks for

I made a synthetic 20,000-customer table messy on purpose: 5 percent of `monthly_spend` blank, 400 duplicated rows added, and a column `exit_survey_sent` that is always 1 for customers who churned (and only rarely 1 otherwise), because it is recorded after the decision. A pandas analogue of a quality report found:

```
missing monthly_spend : 5.0 %
duplicate rows        : 390
monthly_spend outliers (1.5 x IQR): 452
```

(390 rather than 400 because the leaky column is filled randomly for non-churners, so a few copies differed.) Then a leakage screen: score each numeric column by how well it alone separates churners, using single-feature AUC. `exit_survey_sent` scored **0.989**, while `tenure_months` scored 0.617 and `support_tickets` 0.527. A feature that predicts nearly perfectly on its own deserves suspicion, not celebration.

## The flow as code

The preparation steps, in order:

```python
d = df.drop_duplicates()
d = d.drop(columns=["customer_id"])
d["spend_missing"] = d.monthly_spend.isna().astype(int)
d["monthly_spend"] = d.monthly_spend.fillna(
    d.monthly_spend.median())
d = d.drop(columns=["exit_survey_sent"])
d = pd.get_dummies(d, columns=["region", "plan"])
```

That left 20,010 rows and 12 columns. I trained logistic regression on a stratified split (`random_state=42`) with and without the leaky column: test AUC **0.991** with it and **0.632** without. The honest number is the lower one.

## Why export matters

A flow you clicked together once is a liability if nobody can reproduce it. Exporting to a Python script, a Pipelines step or Feature Store turns the flow into code that runs the same way every time, on new data. Chapter 3 returns to Pipelines and Feature Store.

When to choose Data Wrangler: fast, visual exploration and prototyping, especially with teammates who prefer a UI. When to choose code: complex logic, tests and version control. Many teams do both, exporting the flow and then reviewing the generated script in Git.

## Recap

- Data Wrangler is now accessed through SageMaker Canvas in the newer Studio; older docs describe it in Studio Classic.
- Its pieces are import, flow, transform, insights, analysis and export.
- Check quality and target leakage before modeling; a too-good feature is a warning.
- Export flows to code so they are repeatable.

Next, Lesson 9 covers Training Jobs.
