# ARIMA & Seasonal Models

Lesson 11 covered ARMA, which assumes the series is already stationary. Most raw price and macroeconomic series are not — they trend, drift, or carry seasonal patterns. ARIMA and its seasonal extension, SARIMA, handle that by differencing the series first and then fitting an ARMA model to what's left. This lesson covers both, plus how to implement them in `statsmodels`.

## What you'll learn

- What the "I" (integrated) in ARIMA means, and how differencing order d is chosen
- The full ARIMA(p,d,q) notation and how it reduces to ARMA when d=0
- Seasonal ARIMA notation, SARIMA(p,d,q)(P,D,Q)_s, and what the seasonal period s represents
- How to fit both with `statsmodels`

## Differencing: the "I" in ARIMA

Differencing replaces x_t with its change, delta_x_t = x_t - x_(t-1). If the original series has a unit root (recall Lesson 6's ADF test), differencing once often makes it stationary — d=1 is extremely common for log prices and many economic series. Occasionally a series needs differencing twice (d=2) if it has a trend in its trend, but over-differencing introduces its own artifacts (notably a strong negative MA(1) signature), so d is chosen carefully, usually with an ADF/KPSS test on each differenced version rather than guessed.

## ARIMA(p,d,q)

ARIMA(p,d,q) is simply: difference the series d times, then fit an ARMA(p,q) model to the result. When d=0, ARIMA collapses exactly to ARMA — this is why `statsmodels` uses one `ARIMA` class for both, as you saw in Lesson 11. The full specification (p,d,q) is read directly as "AR order, differencing order, MA order."

```python
from statsmodels.tsa.arima.model import ARIMA

# log_prices: a non-stationary series (e.g., log of daily close)
model = ARIMA(log_prices, order=(1, 1, 1))  # ARIMA(1,1,1)
fit = model.fit()
print(fit.summary())

forecast = fit.get_forecast(steps=10)
print(forecast.predicted_mean)
print(forecast.conf_int())
```

## Seasonal ARIMA: SARIMA(p,d,q)(P,D,Q)_s

Many series — retail sales, energy demand, some commodity prices — repeat a pattern every s periods (s=12 for monthly data with yearly seasonality, s=4 for quarterly, s=5 for a trading week in daily financial data). SARIMA adds a second, seasonal ARMA structure on top of the regular one:

- `(p,d,q)` — the ordinary, non-seasonal part, exactly as in ARIMA
- `(P,D,Q)_s` — the seasonal part: P seasonal AR terms, D seasonal differences (x_t - x_(t-s)), Q seasonal MA terms, all operating at lag multiples of s

A SARIMA(1,1,1)(1,1,1)_12 model, for instance, combines monthly short-term dynamics with a year-over-year seasonal structure.

## Fitting SARIMA with statsmodels

`statsmodels` implements SARIMA through `SARIMAX` (the "X" is for optional exogenous regressors, which you can simply omit):

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    sales,
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 12),
    enforce_stationarity=True,
    enforce_invertibility=True,
)
fit = model.fit(disp=False)
print(fit.summary())
```

`enforce_stationarity` and `enforce_invertibility` apply the Lesson 11 conditions to both the regular and seasonal polynomials during estimation, and are on by default — a useful safety net when fitting many series in a loop.

## Key terms

| Term | Meaning |
|---|---|
| Differencing order d | Number of times the series is differenced to induce stationarity |
| ARIMA(p,d,q) | ARMA(p,q) fit to the d-th difference of the series |
| Seasonal period s | Number of periods per seasonal cycle (12 for monthly/yearly, 4 for quarterly) |
| SARIMA(p,d,q)(P,D,Q)_s | ARIMA with an added seasonal AR/I/MA structure at lag multiples of s |
| SARIMAX | The statsmodels class implementing SARIMA (plus optional exogenous regressors) |

## Recap

ARIMA extends ARMA to non-stationary series by differencing first; SARIMA extends ARIMA again to handle repeating seasonal cycles, using the same AR/MA logic at both the regular and seasonal lag structure. Next, Lesson 13 covers how to actually choose p, d, q (and their seasonal counterparts) and verify the fitted model's residuals look like white noise.
