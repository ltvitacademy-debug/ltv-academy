# Building a GitHub Portfolio

Your resume makes a claim; your GitHub is where a reviewer can check it. Most hiring managers will not read your code line by line, but many will spend two minutes on the README of your best project. This lesson shows how to make those two minutes count, and how to avoid the mistakes that quietly sink a portfolio, such as leaked credentials or unclear data licensing.

## What you'll learn

- What reviewers actually look at in a data science repository
- A README template you can copy for the Harvest Table churn project
- A suggested repository layout
- A pre-publish checklist covering secrets, data rights and synthetic-data disclosure

## What reviewers look at

Reviewers are busy. Commonly, they skim in this order: the pinned repositories on your profile, the README, the repo layout, and then maybe a notebook or a script. So a portfolio of three well-documented projects usually reads better than twenty half-finished ones. Pin your best three or four. From this path, good candidates are the capstone churn model, the statistics A/B analysis, and one of the deployment or MLOps projects.

## A README template

The README should answer, in this order: what is the problem, what did you do, what did you find, and how can I run it. Here is a skeleton to adapt:

```markdown
# Harvest Table: Predicting 30-60 Day Cancellations

**Data:** Fictional dataset provided for a training capstone.
No real customers. See "Data" below.

## Problem
Harvest Table (a fictional meal-kit company) wants to
identify customers likely to cancel in the next 30-60
days so retention can act early.

## Approach
SQL feature table -> cleaning -> EDA -> baseline ->
gradient boosting -> evaluation -> deployment plan.

## Results
| Model | Recall at top 30% | Notes |
|---|---|---|
| Baseline | (your number) | Simple rule |
| Final    | (your number) | Tuned, validated |

## Limits and next steps
What the model cannot tell you; what you would test next.

## How to run
1. Create the environment: pip install -r requirements.txt
2. Run the SQL and notebooks in order (see /notebooks)

## Repo layout, license, author
```

Put a one-paragraph business summary and your headline result at the top, since that is what a skimmer reads. Include one or two charts, saved as images, so the README works without running anything.

## A suggested repository layout

```text
harvest-table-churn/
  README.md
  requirements.txt
  .gitignore
  data/        sample or synthetic data only
  sql/         feature extraction queries
  notebooks/   numbered: 01_eda, 02_model, ...
  src/         reusable functions
  reports/     figures and the presentation
```

Use numbered notebooks and clear commit messages. Reproducibility matters: pin your library versions in `requirements.txt` and set random seeds so a reader can rerun your results.

## Pre-publish checklist

Before you make a repository public, check every item:

- **No secrets.** No passwords, API keys, tokens, connection strings or cloud credentials in code, notebooks or history. Add a `.gitignore` entry for `.env` files and keep keys in environment variables. If you ever committed a secret, deleting it in a later commit is not enough because it stays in history. Revoke or rotate the key, and treat it as compromised.
- **Data rights.** Only publish data you are allowed to share. Check the license of any public dataset and cite the source. Never upload data from a current or former employer, or anything containing personal information.
- **Synthetic-data disclosure.** If data is fictional or generated, say so in the README, and do not present results as if they came from a real business.
- **Notebook outputs.** Clear or review output cells, which can contain file paths, usernames or sample rows.
- **Large files.** Do not commit big datasets or model files; link to them or provide a small sample.
- **A license.** Add a license file if you want others to reuse your code, and note that the data may have different terms.

## Recap

A small set of clear, honest projects beats a large pile. Lead each README with the problem and the result, show how to run it, name the limits, and disclose that the capstone data is fictional. Run the checklist before going public, especially for secrets. Next, we look at the interview process these projects will lead into.
