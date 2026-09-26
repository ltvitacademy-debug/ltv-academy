# Capstone Kickoff: Explore and Present a Real Dataset

This capstone pulls the whole course together. You will take one dataset from a raw table to a short, honest presentation: frame a question, clean the data, explore it with the workflow from Chapter 3, chart it with the principles from Chapters 1 and 2, and communicate it with Chapter 5. It runs across three lessons: this kickoff, the build, and the wrap-up.

A note on the word "real". To keep every number reproducible and every claim checkable, the walkthrough uses an illustrative dataset that we generate with a fixed random seed. It behaves like a small subscription business's customer table. The workflow is what matters and it transfers directly: when you build your portfolio version, swap in a real dataset you care about (a public dataset, your own data, or data from a past project) and follow the same steps.

## What you'll learn

- How to frame a business question before touching the data
- How to generate and reproduce the capstone dataset
- How to take a disciplined first look
- The plan we will follow in the build lesson

## Frame the question first

Data exploration without a question becomes a tour of every column. Write the question and the decision it supports in plain words:

- **Business question:** Which customers are most likely to leave, and what is one action the team could test to reduce churn?
- **Decision it informs:** Whether to run a small retention pilot, and for whom.
- **Out of scope:** Building a prediction model. That comes in the next course. Here we explore and explain.

Notice what makes this a good question: it is specific, it ends in a decision, and the data can plausibly speak to it.

## Generate the dataset

Here is the full script. It creates 800 customers with a plan, a region, a tenure, a monthly spend, a count of support tickets, and whether they churned. It also blanks out 12 spend values to give us a realistic missing-data problem.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 800
plan = rng.choice(["Basic", "Plus", "Premium"], size=n, p=[0.5, 0.3, 0.2])
region = rng.choice(["North", "South", "East", "West"], size=n)
tenure = rng.integers(1, 61, size=n)
base = {"Basic": 25, "Plus": 45, "Premium": 80}
monthly = np.array([base[p] for p in plan]) + rng.normal(0, 6, size=n)
tickets = rng.poisson(1.2, size=n)
logit = -1.0 - 0.04 * tenure + 0.45 * tickets - 0.01 * (monthly - 45)
p_churn = 1 / (1 + np.exp(-logit))
churned = (rng.random(n) < p_churn).astype(int)
df = pd.DataFrame({
    "customer_id": np.arange(1001, 1001 + n),
    "plan": plan, "region": region, "tenure_months": tenure,
    "monthly_spend": monthly.round(2), "support_tickets": tickets,
    "churned": churned,
})
df.loc[rng.choice(n, 12, replace=False), "monthly_spend"] = np.nan
```

One honest warning: this script is an answer key. Real data comes with no recipe, so try the analysis first and only compare with the recipe at the end. Every number in these lessons comes from running this exact script.

## The data dictionary

Write down what each column means before analyzing it:

| Column | Meaning |
| --- | --- |
| customer_id | Unique ID, 1001 to 1800 |
| plan | Basic, Plus, or Premium |
| region | North, South, East, or West |
| tenure_months | How long the customer has been with us, 1 to 60 |
| monthly_spend | Monthly bill in dollars (illustrative), 12 values missing |
| support_tickets | Support contacts, 0 to 6 |
| churned | 1 if the customer left, otherwise 0 |

## Take a first look

Before any charts, check the basics: how big, what types, what is missing, and how common is the outcome.

```python
print(df.shape)
print(df.head(3).to_string())
print(df.isna().sum().to_dict())
print(df.churned.value_counts().to_dict())
```

Here is what we saw:

```text
(800, 7)
   customer_id     plan region  tenure_months  monthly_spend  support_tickets  churned
0         1001     Plus  South              1          42.65                2        0
1         1002    Basic   East             34          25.84                1        0
2         1003  Premium   West             45          75.10                0        0
{'customer_id': 0, 'plan': 0, 'region': 0, 'tenure_months': 0, 'monthly_spend': 12, 'support_tickets': 0, 'churned': 0}
{0: 643, 1: 157}
```

800 rows and 7 columns, 12 missing spend values, and 157 of 800 customers churned. That is a baseline churn rate of about 19.6%, or roughly one customer in five. Any pattern we find has to be compared against that baseline.

## The plan for the build lesson

1. Check data quality and decide what to do about the missing spend.
2. Look at each variable on its own.
3. Compare churn across each variable, one at a time.
4. Combine two variables, and test whether patterns hold up.
5. Save one clear figure, then write the findings.

## Recap

- Start with a specific question tied to a decision.
- Use a seeded script so results reproduce; treat the recipe as an answer key.
- Write a data dictionary, then take a disciplined first look.
- Establish the baseline (19.6% churn) before hunting for patterns.
