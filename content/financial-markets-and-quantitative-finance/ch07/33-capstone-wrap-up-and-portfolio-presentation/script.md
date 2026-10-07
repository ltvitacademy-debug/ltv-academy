# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

Lesson 32 computed everything: three option prices, their Greeks, a portfolio delta near plus nine hundred seventy-nine, a gamma near plus seventeen-point-seven, a vega near plus a hundred sixty-three dollars per vol point, and a hedge trade of selling about nine hundred seventy-nine shares of ZQX. This final lesson asks two closing questions: did the hedge actually work, and how should this project be presented to someone else?

## Segment 2 (code)

Here's the honest before-and-after. Before the hedge, the portfolio had a delta of plus nine hundred seventy-nine, a gamma of plus seventeen-point-seven, and a vega of plus a hundred sixty-three dollars per vol point. After selling those nine hundred seventy-nine shares, delta sits close to zero — but gamma and vega are completely unchanged, because a share of stock has zero gamma and zero vega. The hedge did exactly one job, and only one job.

## Segment 3 (steps)

That remaining gamma means the hedge won't stay correct on its own. If ZQX's price actually moves, every option's delta shifts with it, and because the stock hedge's own delta never changes, the portfolio's net delta drifts away from zero again. At that point the hedge has to be recalculated and the stock position adjusted — which is exactly the static-versus-dynamic distinction from the hedging lesson earlier in this course, and exactly why a real trading desk rebalances a book like this regularly rather than setting it once.

## Segment 4 (steps)

Chapter 6 covered what quant researcher, developer, and trader roles actually value, and it applies directly to presenting this project. A strong version shows the pricing code itself, clean and correct. It shows a results table with price and Greeks for each option and the aggregated portfolio numbers. And it shows the hedge calculation alongside a short, honest summary of its limits — naming the residual gamma and vega exposure rather than overstating what a delta-hedge accomplishes. Being able to say clearly what a result doesn't show, not just what it does, is exactly the kind of precision those roles need.

## Segment 5 (outro)

The hedge flattened delta and left gamma and vega exposed, which is why it needs rebalancing rather than being set once and forgotten. That closes the capstone, Chapter 7, and this course as a whole — from market basics through derivatives, portfolios, risk, and careers, finished with one complete, defensible project. Congratulations on completing Financial Markets & Quantitative Finance.
