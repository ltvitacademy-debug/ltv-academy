# Script — Risk, Return & Diversification

## Segment 1 (title)

Chapter three was about pricing a single instrument. Chapter four steps up a level: how should you combine multiple assets into a portfolio? The starting point is the same two numbers investors have always cared about — expected return and risk — plus one surprising fact: a portfolio's risk is almost never just the average of its pieces.

## Segment 2 (code)

A two-asset portfolio's variance has three terms, not two. Each asset contributes its own weighted variance, but there's also a cross term involving correlation — how the two assets move together, scaled to a range of negative one to positive one. That cross term is where diversification actually happens. When correlation is less than one, the cross term is smaller than it would be if the assets moved in lockstep, and the combined portfolio ends up less risky than the weighted average of its parts.

## Segment 3 (code)

Here's a concrete example. Two assets with twenty and thirty percent volatility, correlated at 0.3, held in equal weights. Working through the formula, the portfolio variance comes out to about 0.0415, so the portfolio's standard deviation is roughly 20.4 percent. Compare that to the simple weighted average of the two individual volatilities, which is 25 percent. That nearly five-point gap is pure diversification benefit, generated entirely by the fact the two assets aren't perfectly correlated.

## Segment 4 (steps)

But diversification has a real limit. Risk splits into two kinds. Unsystematic risk is specific to one company — a lawsuit, a bad quarter — and because those events are largely uncorrelated across companies, holding many assets makes much of it average out. Systematic risk is market-wide — a recession, a broad shock — and it hits every asset together, so no amount of adding more assets makes it disappear. That's exactly the risk the capital asset pricing model, two lessons from now, compensates investors for bearing.

## Segment 5 (outro)

Combine imperfectly correlated assets and the portfolio gets less risky than its parts — but only unsystematic risk goes away. Up next, lesson nineteen: mean-variance optimization, the formal framework for choosing portfolio weights on purpose.
