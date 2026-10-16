# Model Card Template (Code-Fillable)

Used throughout this course's Applied Projects chapter and capstone (Lessons 24-27). Save the
block below as `MODEL_CARD_TEMPLATE.md` and fill it with `template.format(**facts)`, where
`facts` is a dictionary built from your actual run -- never typed by hand. If your template
needs a literal brace, double it (`{{`).

```markdown
# Model card: {name}

Date: {date} | Owner: <name> | Status: draft

## Purpose
{purpose}

## Data
- Source: {data_source}
- Rows: {rows}
- Target: {target} ({positive_rate_or_range})
- Features: {features}
- Data fingerprint: {fingerprint}

## Method
- Preprocessing: {preprocessing}
- Model: {model}
- Split: {n_train} train / {n_test} test, seed {seed}

## Results (test set, used once)
| Metric | Value |
|---|---|
| {metric_1_name} | {metric_1_value} |
| {metric_2_name} | {metric_2_value} |
| {metric_3_name} | {metric_3_value} |

By segment: {segment_breakdown}

## Limitations
{limitations}

## Environment
Python {python}, scikit-learn {sklearn}, pandas {pandas}, numpy {numpy}
```

## Worked example: filled from the Cascade Beverage demand model

This is the actual, rendered card from the Shipping a Demand Model for Cascade Beverage Co.
worked example in this course's Worked Example Library -- reproduced here so you have a real,
completed card to compare your own against, not just an empty skeleton.

```markdown
# Model card: cascade-demand-histgb-log-v1

Date: 2026-10-12 | Owner: <name> | Status: draft

## Purpose
Predict next week's case-order volume per retail account, so Cascade's planning team can
replace a rolling-average guess with a model-backed forecast. Not for individual delivery
routing or credit decisions.

## Data
- Source: illustrative account-week table, 4,500 account-weeks (synthetic)
- Rows: 4,500
- Target: next_week_cases (continuous, right-skewed: small accounts order tens of cases,
  key accounts order over a thousand)
- Features: account_age_months, active_sku_count, avg_weekly_cases_90d, account_tier, region
- Data fingerprint: (computed per run with hashlib.sha256)

## Method
- Preprocessing: StandardScaler (numeric), OneHotEncoder (categorical) inside a ColumnTransformer
- Model: HistGradientBoostingRegressor wrapped in TransformedTargetRegressor (log1p / expm1)
- Split: 3,600 train / 900 test, seed 42

## Results (test set, used once)
| Metric | Value |
|---|---|
| MAE (overall) | reported in cases |
| MAE, small accounts | reported separately -- smallest absolute error |
| MAE, key accounts | reported separately -- largest absolute error, smallest % error |

By segment: small/mid/key account tiers scored separately, because one blended MAE hides
exactly the accounts the planning team cares most about.

## Limitations
- Synthetic data; never validated against Cascade's real order history.
- The log-target transform was tested, not assumed -- it helped boosting but not ridge on
  this data, so do not assume it generalizes to other targets.
- A single week's forecast; no seasonality or promotional-calendar signal included yet.

## Environment
Python 3.11, scikit-learn 1.3+, pandas 2.x, numpy 1.26+
```
