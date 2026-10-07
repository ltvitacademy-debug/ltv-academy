# Script — Ordinary Differential Equations Basics

## Segment 1 (title)

An ordinary differential equation describes how a quantity changes by relating it to its own derivative, instead of giving you a direct formula. That sounds abstract, but it's exactly how continuous compounding and interest rate models are written down. This lesson covers the first-order linear case you can solve by hand, plus a numerical fallback.

## Segment 2 (code)

The simplest and most important example is y prime equals k times y. Separate the variables, integrate both sides, and you get y of t equals y-zero times e to the k t. That's continuous compounding, derived from first principles instead of memorized.

## Segment 3 (steps)

The general first-order linear equation adds a function of t on both the derivative term and the right side. The trick is multiplying by an integrating factor, built so the left side collapses into the derivative of a product, which you can then integrate directly.

## Segment 4 (code)

Apply that to the Vasicek interest rate model and the rate's deterministic drift solves to b plus the gap from the starting rate, shrinking exponentially over time. In other words, it mean reverts toward the long run level b, at a speed controlled by a.

## Segment 5 (code)

When an equation has no closed form, Euler's method steps forward numerically, just rearranging the derivative's own definition into a small forward step. Run it with a thousand small steps on the Vasicek equation and it lands within four thousandths of a percent of the exact answer.

## Segment 6 (outro)

y prime equals ky is continuous compounding, and the integrating factor solves the broader linear case, revealing mean reversion underneath Vasicek. That closes chapter one on calculus. Up next, chapter two begins with lesson six: vectors, matrices, and linear maps.
