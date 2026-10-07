# Script — Introduction to Stochastic Calculus & Itô's Lemma

## Segment 1 (title)

Brownian motion's quadratic variation equals elapsed time, not zero, and that single fact breaks the ordinary chain rule from regular calculus. This lesson derives its replacement, Itô's lemma, and uses it to derive geometric Brownian motion, the standard model behind a stock price.

## Segment 2 (steps)

Stochastic calculus runs on a short list of multiplication rules. The square of a Brownian increment behaves like dt, not like zero, which is the one rule you can never drop. A time increment times a Brownian increment vanishes, and a time increment squared vanishes too, since both shrink faster than the leading order terms.

## Segment 3 (code)

Expanding a function of a diffusion process to second order and applying those multiplication rules gives Itô's lemma. It looks exactly like the ordinary chain rule, drift times the first derivative, plus the usual diffusion term, but with one extra piece: one half sigma squared times the second derivative. That extra term exists purely because the squared Brownian increment doesn't vanish.

## Segment 4 (steps)

Apply that directly to the log of a geometric Brownian motion price. The first derivative of log S is one over S, and the second derivative is minus one over S squared. Plugging those into Itô's lemma, the S terms cancel beautifully, leaving a process with constant drift, mu minus one half sigma squared, and constant volatility sigma, which integrates immediately into the exact solution for S of t.

## Segment 5 (code)

You can see that minus one half sigma squared term directly in simulation. Generating the exact GBM solution and averaging the log return across two hundred thousand simulated paths lands on mu minus one half sigma squared, times the time horizon, not on the naive guess of just mu times the horizon that ignoring Itô's correction would produce.

## Segment 6 (outro)

That minus one half sigma squared adjustment is a real, derivable consequence of Itô's lemma, not a notational quirk. Up next, lesson thirty four uses this exact GBM solution to price a European option directly, by Monte Carlo simulation.
