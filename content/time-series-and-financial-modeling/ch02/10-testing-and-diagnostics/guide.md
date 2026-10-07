# Testing & Diagnostics

This lesson closes Chapter 2 by pulling the toolkit together: stationarity testing (Lesson 6), ACF/PACF (Lesson 7), white noise/random walk theory (Lesson 8), and cointegration testing (Lesson 9). The point here isn't new theory — it's a disciplined workflow for applying these tests correctly, plus the specific pitfalls that catch people who apply them mechanically without understanding what each test actually assumes.

## What you'll learn

- A standard pre-modeling diagnostic workflow, start to finish
- ADF test pitfalls: trend specification, low power, and structural breaks
- Ljung-Box as a complement to the ACF plot for testing "no autocorrelation up to lag k" jointly
- Why passing every diagnostic test still doesn't guarantee a good model
- Putting it all together on a real return series

## A standard diagnostic workflow

1. **Visualize first.** Plot the raw series. Look for obvious trend, variance changes, or structural breaks before running any test.
2. **Test for stationarity.** Run ADF (Lesson 6) on the series. If it's non-stationary, difference it (or take log returns, if it's a price series) and re-test.
3. **Examine ACF/PACF.** Once stationary, look at the ACF and PACF (Lesson 7) to get a sense of what order of dependence is present.
4. **Test residual/return independence.** After any model is fit (Chapter 3 onward), check whether the residuals still show structure — if they do, the model hasn't captured everything.
5. **For pairs, test cointegration.** If working with two series together, run the Engle-Granger test (Lesson 9) rather than relying on correlation alone.

## ADF pitfalls

- **Trend specification matters.** `adfuller` has a `regression` argument (`"c"`, `"ct"`, `"n"`, `"ctt"`) controlling whether a constant and/or trend term is included in the test regression. Testing a series with an obvious deterministic trend using the no-trend specification (`"n"`) can produce misleading results — the test may fail to reject a unit root not because the series truly has one, but because the model doesn't account for the trend that's actually there.
- **Low power against near-unit-root alternatives.** The ADF test has relatively low statistical power to distinguish a true unit root from a stationary process with a root *very close to* 1 (e.g., `φ = 0.98`). With limited data, you may fail to reject the unit-root null even for a series that's technically stationary but slowly mean-reverting.
- **Structural breaks look like unit roots.** A series that's actually stationary around two different means (e.g., a shift after a regime change) but tested as one continuous series can spuriously fail to reject the unit-root null — the break, not a true unit root, is driving the result. Always revisit step 1 (visualize) if this is suspected.

## The Ljung-Box test: a complement to the ACF plot

The ACF plot checks each lag individually. The **Ljung-Box test** asks a related but distinct question: are the autocorrelations **up to lag k jointly** statistically different from zero, as a single test? It's especially useful for checking whether model residuals still contain structure (if they do, the model is misspecified) and for formally confirming what an ACF plot suggests visually.

```python
from statsmodels.stats.diagnostic import acorr_ljungbox

lb_result = acorr_ljungbox(residuals, lags=[10, 20], return_df=True)
print(lb_result)
# low p-value at a given lag => reject "no autocorrelation up to that lag"
#                              => residuals still have structure
```

## Passing every test is necessary, not sufficient

A series that's stationary, with a clean ACF/PACF, and residuals that pass Ljung-Box, can still be a poor economic model — these are statistical diagnostics, not guarantees of forecasting skill or economic sense. Always pair statistical diagnostics with out-of-sample validation (Lesson 4's data-snooping discussion applies here directly) and basic sanity checks against domain knowledge.

## Putting it together

```python
import numpy as np
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.stats.diagnostic import acorr_ljungbox

log_returns = np.log(prices).diff().dropna()

adf_p = adfuller(log_returns, regression="c")[1]
print("ADF p-value:", adf_p)             # expect low -> stationary

plot_acf(log_returns, lags=20)
plot_pacf(log_returns, lags=20, method="ywm")

lb = acorr_ljungbox(log_returns, lags=[10], return_df=True)
print(lb)                                 # check for leftover structure
```

## Key terms

| Term | Meaning |
|---|---|
| `regression` argument (adfuller) | Controls whether a constant/trend is included in the ADF test regression ("c", "ct", "n", "ctt") |
| Low power (ADF) | The test's reduced ability to distinguish a true unit root from a near-unit-root stationary process |
| Structural break | A shift in a series' mean/behavior that can be mistaken for a unit root if untested for |
| Ljung-Box test | Jointly tests whether autocorrelations up to lag k are statistically zero |

## Recap

A disciplined diagnostic workflow — visualize, test stationarity with the right trend specification, inspect ACF/PACF, test residuals jointly with Ljung-Box, and watch for structural breaks and low ADF power — closes the gap between knowing these tests exist and using them correctly. This closes Chapter 2's foundations. Chapter 3 builds directly on top of all of it: AR, MA, and ARMA models, chosen using exactly the ACF/PACF signatures from Lesson 7 and validated with exactly the residual diagnostics from this lesson.
