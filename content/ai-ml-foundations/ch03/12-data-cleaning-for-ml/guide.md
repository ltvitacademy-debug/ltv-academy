# Lesson 12 — Data Cleaning for ML

**Chapter 3 · Working With Data for ML · Lesson 12 of 30**

## What you'll learn

- Why real data is never training-ready on arrival
- The specific problems a cleaning pass looks for
- A worked before/after example on a small, honest dataset
- Why cleaning decisions should happen before the train/test split, not after

## Models are only as honest as the data you feed them

Every lesson so far has assumed a clean table of features and labels. Real data never starts that way — it comes from spreadsheets with typos, systems with inconsistent formats, sensors that occasionally fail, and humans who sometimes leave fields blank or enter "N/A" as if it were a normal string. Data cleaning is the unglamorous work of turning that mess into something a model can actually learn from, and it routinely matters more to final model quality than which algorithm you pick.

## A worked example: before and after

Here's a small, honest slice of a customer table exactly as it might arrive from a real export, next to the same rows after a cleaning pass:

```
BEFORE
id | signup_date | plan      | monthly_spend | age
1  | 2024-01-15  | Standard  | 49.99         | 34
2  | 01/22/2024  | standard  | N/A           | 29
3  | 2024-01-15  | Standard  |  49.99        | 200
4  | 2024-02-03  | STANDARD  | -10.00        | 41
5  |             | premium   | 89.50         |

AFTER
id | signup_date | plan     | monthly_spend | age
1  | 2024-01-15  | standard | 49.99         | 34
2  | 2024-01-22  | standard | NaN           | 29
4  | 2024-02-03  | standard | NaN           | 41
5  | NaN         | premium  | 89.50         | NaN
```

Notice everything that changed: row 3 was removed as an exact duplicate of row 1. Date formats were made consistent (`01/22/2024` became `2024-01-22`). Plan names were lowercased so `"Standard"`, `"standard"`, and `"STANDARD"` are no longer treated as three different categories. A stray leading space in `monthly_spend` was stripped. An impossible age (200) and a negative spend (-10.00) were replaced with a proper missing-value marker (`NaN`) rather than silently kept as real numbers — a model has no way to know 200 is biologically implausible; it'll just treat it as data. And the literal string `"N/A"` was converted to an actual missing value the library recognizes, instead of being accidentally treated as a category or crashing a numeric calculation.

## The checklist cleaning actually runs through

- **Duplicates** — exact or near-exact repeated rows, usually from export glitches or double submissions.
- **Inconsistent formatting** — mixed date formats, inconsistent capitalization, stray whitespace, inconsistent units (some rows in dollars, some in cents).
- **Impossible or out-of-range values** — a negative age, a percentage over 100, a price below zero — values that are numerically valid but physically or logically impossible.
- **Disguised missing values** — `"N/A"`, `"unknown"`, `"-"`, `999`, or an empty string that isn't recognized as missing by default and needs to be explicitly told it is one.
- **Type mismatches** — a numeric column that got read in as text because one row had a stray character in it.

## Why order matters: clean before you split

It's tempting to clean the whole dataset first and split into train/test afterward, but some cleaning decisions — like "what's the average monthly_spend used to fill a missing value?" — must be *learned from the training set only* and then applied to the test set, never the reverse. Computing that average from the full dataset (including test rows) leaks test information into training, which is exactly the data leakage problem covered later in this chapter. The safe habit: do the easy structural fixes (duplicates, formatting, impossible values) before splitting, but learn any statistic used to fill values strictly from the training split.

## Recap

Data cleaning finds and fixes duplicates, inconsistent formatting, impossible values, and disguised missing values before any of it reaches a model — and it's often the highest-leverage work in a whole ML project. Structural fixes can happen before splitting, but any statistic learned from the data (like a fill value) must be learned from the training set alone. Next, we look at the step that often matters even more than cleaning: building new features from the ones you already have.
