# Script — Autocorrelation & Partial Autocorrelation

## Segment 1 (title)

Once a series is stationary, the next question is how exactly it depends on its own past. The autocorrelation function and partial autocorrelation function are the two standard tools for answering that, and their combined shape is the classical way to identify what kind of model might fit a series.

## Segment 2 (steps)

The ACF at lag k is the total correlation between today's value and the value k steps back, including correlation transmitted indirectly through everything in between. The PACF at lag k strips that indirect part out — it's the direct relationship at exactly lag k, after removing the linear effect of every intermediate lag. That distinction, total versus direct, is the whole point.

## Segment 3 (steps)

Here's why it matters. A pure AR process has an ACF that decays gradually but a PACF that cuts off sharply right after its order — there's no direct dependence left once you've conditioned on the lags in between. A pure MA process is the mirror image: its ACF cuts off sharply, but its PACF decays gradually. So if the ACF cuts off, think MA; if the PACF cuts off, think AR; if both decay gradually, you're probably looking at a mixed ARMA process.

## Segment 4 (code)

In statsmodels, acf and pacf compute the values directly, and plot_acf and plot_pacf draw them with a shaded confidence band around zero. A bar poking outside that band at some lag is statistically significant — real evidence of dependence, not sampling noise. For the PACF, the Yule-Walker method with the ywm option is a common, well-behaved choice.

## Segment 5 (outro)

This isn't only for identifying ARMA orders — run the same ACF on squared returns instead of raw returns, and you'll see the strong, slowly decaying autocorrelation behind volatility clustering, which chapter four's GARCH models exist to capture. Next lesson looks closely at the two simplest, most important benchmark processes: white noise and the random walk.
