# Script — Limits, Derivatives & Rates of Change

## Segment 1 (title)

Welcome to Mathematics for Quantitative Finance. Every model you'll build in this program, from option pricing to portfolio risk, rests on calculus and linear algebra. This lesson starts at the beginning: the limit, the derivative it defines, and why rate of change is the one idea connecting a stock's price path to the Greeks that hedge it.

## Segment 2 (steps)

A limit asks what a function does near a point, not necessarily at it. The average rate of change over an interval is just a secant line's slope. A derivative is what that slope approaches as the interval shrinks to a single point, the slope of the tangent line, the instantaneous rate of change.

## Segment 3 (code)

You can check a derivative numerically with a central finite difference: nudge the input up and down by a tiny amount, and divide the change in output by twice that amount. For the log of a stock price, that numerical estimate lands right on the exact answer, one over the price.

## Segment 4 (steps)

Four rules get you through almost everything: the power rule for simple powers, the product and quotient rules for combining two functions, and the chain rule for compositions. The chain rule is the one you'll use constantly, because so much of finance is one function wrapped around another.

## Segment 5 (code)

Here's why this matters: an option's delta is literally the derivative of its value with respect to the stock price. A bond's duration falls out the same way, as the derivative of price with respect to yield. Different names in finance, same calculus underneath.

## Segment 6 (outro)

Limits make instantaneous precise, and derivatives are the slope that falls out of that limit. Up next, lesson two: multivariable calculus and gradients, extending all of this to functions of several variables at once.
