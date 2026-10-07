# Capstone: Wrap-Up & Portfolio Presentation

Lesson 32 computed everything: three option prices, their Greeks, a portfolio delta near +979, a gamma near +17.7, a vega near +$163 per vol point, and a hedge trade of selling about 979 shares of ZQX. This final lesson of the course asks two closing questions: did the hedge actually work, and how should this project be presented to someone else — an interviewer, a hiring manager, or anyone evaluating the work?

## What you'll learn

- Why flattening delta worked, and what "worked" actually means here
- Why gamma and vega exposure remain after the delta-hedge, and what that implies
- Why a delta-hedge needs periodic rebalancing rather than being set once and left alone
- How to present this project well, tying it back to what Chapter 6 said quant employers value

## Did the hedge work?

Yes, in the specific and limited sense it was designed for: after selling roughly 979 shares of ZQX against the options position, the combined portfolio's net delta is close to zero. For a small move in ZQX's price, the gain or loss on the option positions should be roughly offset by the opposite move in the short-stock hedge. That's exactly what delta-hedging promises — no more, no less.

## What's still exposed

The hedge flattened delta, but it did nothing about gamma or vega, and both are still sitting in the portfolio at roughly +17.7 and +$163 per vol point:

- **Gamma (+17.7)** means the portfolio's delta itself will drift as ZQX's price moves. A rally or a selloff in ZQX changes each option's delta — and since the stock hedge itself has a constant delta of 1 per share, the combined position's net delta won't stay at zero once the price actually moves.
- **Vega (+$163 per vol point)** means the portfolio still has a view on implied volatility. If implied vol rises by one percentage point with everything else unchanged, the portfolio gains roughly $163; if vol falls, it loses roughly that much. Nothing in the hedge trade (buying or selling shares) touches this exposure at all, because a share of stock has zero vega.

## Why the hedge needs rebalancing

This is exactly the static-versus-dynamic hedging distinction from the Hedging Strategies lesson earlier in this course: because this portfolio has nonzero gamma, the delta-hedge that's correct today will not be correct tomorrow. If ZQX moves from $100 to, say, $105, every option's delta shifts, and the portfolio's net delta moves away from zero again — at which point the hedge has to be recalculated and the stock position adjusted. A real trading desk running this kind of book rebalances delta-hedges regularly (daily, or even more often for active books), precisely because gamma guarantees the hedge keeps drifting out of date.

## Presenting this as a portfolio project

Chapter 6 covered what quant researcher, developer, and trader roles actually value: correct math, clean code, and the ability to explain both clearly. When presenting this project — in a portfolio, in an interview, or in a write-up — a strong version includes:

- **The pricing code** — the Black-Scholes and Greeks function, clean and correct.
- **A results table** — price and Greeks for each option, plus the aggregated portfolio Greeks.
- **The hedge calculation and its result** — the share quantity and what it accomplishes (and doesn't).
- **A short written summary of limitations** — explicitly naming the residual gamma and vega exposure, and the need for rebalancing, rather than overstating what a delta-hedge achieves.

Be ready to explain, if asked: the assumptions behind Black-Scholes (constant volatility, no transaction costs, continuous trading, lognormal returns — simplifications a real desk works around), and why a static hedge isn't enough once gamma is nonzero. Being able to say clearly what a result *doesn't* show, not just what it does, is exactly the kind of precision Chapter 6 described quant researcher, developer, and trader roles all needing in their own way.

## Key terms

| Term | Meaning |
|---|---|
| Delta-hedge effectiveness | A delta-hedge offsets small directional moves; it does not address gamma or vega |
| Gamma drift | The way a flattened delta moves away from zero again as the underlying price changes |
| Rebalancing | Periodically recalculating and adjusting a dynamic hedge as the portfolio's Greeks shift |
| Black-Scholes assumptions | Constant volatility, no transaction costs, continuous trading, lognormal returns |

## Recap

The hedge did exactly what a delta-hedge is supposed to do — flatten directional exposure — while leaving gamma and vega exposed, which is why it would need to be rebalanced on a real desk rather than set once and forgotten. That closes the capstone, Chapter 7, and Financial Markets & Quantitative Finance as a whole. This course took you from the basic mechanics of markets through derivatives pricing, portfolio theory, and risk management, and finished with a concrete project connecting all of it. The next step on the Quantitative Developer / Researcher path builds on exactly this foundation.
