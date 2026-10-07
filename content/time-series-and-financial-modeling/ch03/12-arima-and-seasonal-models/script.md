# Script — ARIMA & Seasonal Models

## Segment 1 (title)

Lesson eleven covered ARMA, which assumes the series is already stationary. Most raw price and economic series aren't — they trend or drift. ARIMA and its seasonal cousin, SARIMA, handle that by differencing the series first and fitting ARMA to what's left.

## Segment 2 (steps)

Differencing replaces each value with its change from the period before. If the series has a unit root, differencing once is usually enough to make it stationary, and d equals one is extremely common for log prices. ARIMA with p, d, q simply means difference d times, then fit an ARMA p, q model to the result — when d is zero, that's exactly plain ARMA again. Differencing too many times leaves its own signature, usually a strong negative MA term, so the order is chosen carefully rather than guessed.

## Segment 3 (code)

In statsmodels, the same ARIMA class handles all of this. You pass order as p, d, q — here, one, one, one on log prices — call fit, and then get_forecast to produce a forecast with a confidence interval.

## Segment 4 (code)

Many series repeat a pattern every s periods — monthly data with yearly seasonality uses s equals twelve, quarterly data uses s equals four. SARIMAX layers a second seasonal AR, I, MA structure at lag multiples of s on top of the regular one. You pass seasonal_order as P, D, Q, s alongside the regular order, and statsmodels enforces stationarity and invertibility on both pieces by default, which is a useful safety net when fitting many series at once.

## Segment 5 (outro)

ARIMA extends ARMA to non-stationary series through differencing; SARIMA extends it again to handle repeating seasonal cycles. Next, lesson thirteen covers actually choosing these orders and checking that the fitted residuals look like white noise.
