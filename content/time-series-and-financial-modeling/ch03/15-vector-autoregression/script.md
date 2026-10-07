# Script — Vector Autoregression

## Segment 1 (title)

Every model so far in this chapter has analyzed one series at a time. But markets are full of series that move together — stocks and bonds, exchange rates and interest rates. Vector autoregression extends the AR idea to several series at once, modeling each one as a function of lagged values of all the series in the system.

## Segment 2 (steps)

A VAR of order p stacks k series into a vector and lets each series depend on lagged values of every series, not just its own past. That's what makes it genuinely multivariate — stock returns depend on lagged stock returns and lagged bond returns, and vice versa, rather than several separate AR models bolted together. As with ARIMA, the inputs need to be stationary first, or you difference them, or reach for a cointegration-aware variant when the series share a long-run equilibrium.

## Segment 3 (code)

In statsmodels, you build a VAR model from a dataframe of stationary series, use select_order to suggest a lag length by AIC, fit at that lag, and then forecast forward using the most recent observations.

## Segment 4 (steps)

Granger causality asks whether one series' past values help predict another, beyond what that series' own past already predicts — a statistical claim about predictive content, not causation in the physical sense. You test it directly in statsmodels. Impulse response functions go further, tracing how a one-time shock to one variable propagates through the whole system over the following periods — a question a single-equation AR model can't even ask.

## Segment 5 (outro)

VAR extends the single-series AR idea to a full system, unlocking Granger causality tests and impulse responses that single-equation models can't offer. That closes out the linear models chapter. Chapter four turns from modeling a series' level to modeling its volatility, starting with realized and historical volatility.
