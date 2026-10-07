# Script — Project Plan & Success Criteria

## Segment 1 (title)

With the research question and hypothesis stated, the last thing to settle before touching the data is the plan: what order you'll do the work in, what tools you'll use, and what counts as success. That last part has to be decided now, before any results exist, or it stops meaning anything.

## Segment 2 (steps)

The capstone runs in four phases. Phase one, data and statistical analysis: clean the Stooq data and test the hypothesis before building anything. Phase two, features, model, and signal: engineer features, train and validate a model, turn it into a tradable signal. Phase three, backtest and risk: realistic costs, drawdown, stress tests. Phase four, report and presentation: write it up and defend it.

## Segment 3 (steps)

The tooling stack: Python 3.11 with pandas, NumPy, scikit-learn, statsmodels, and matplotlib for research. A C++17 performance core called sr5_fast, exposed to Python through pybind11, for the parts Python alone is too slow for. Jupyter for notebooks, Parquet for storing results, and a final report written in Markdown and compiled to PDF, plus a slide deck for the presentation.

## Segment 4 (code)

That C++ core is where the heavy lifting happens: the rolling cross-sectional z-scores and the purged walk-forward retraining loop, both computed in C++ for speed and called from Python through a pybind11 module.

## Segment 5 (steps)

Success criteria get defined now, before any results exist — that's preregistration discipline, so nobody can quietly move the goalposts later. Success means a statistically significant effect, a positive out-of-sample walk-forward Sharpe ratio net of realistic costs, drawdown that stays within the risk budget, and survival through real historical stress windows like the COVID crash and the 2022 bear market.

## Segment 6 (outro)

The plan, the tools, and the bar for success are all set. Chapter two starts the real work: cleaning and exploring the market data.
