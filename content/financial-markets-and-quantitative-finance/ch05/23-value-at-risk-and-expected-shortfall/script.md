# Script — Value at Risk & Expected Shortfall

## Segment 1 (title)

Welcome to Chapter 5, Risk Management. The first four chapters were about understanding markets, pricing instruments, and building portfolios. This chapter asks a different question: once you hold a position, how much can it lose, and how do you put a number on that? We're starting with the two most widely used tail-risk numbers in finance: Value at Risk, and Expected Shortfall.

## Segment 2 (code)

Here's parametric VaR worked through with real numbers. Value at Risk at a given confidence level is the loss not expected to be exceeded that often. For a ninety-nine percent confidence level, the z-score is two-point-three-three. If this portfolio's one-day standard deviation is two million dollars, multiplying gives a VaR of about four-point-six-six million dollars — a loss bigger than that is expected on no more than one percent of trading days. Notice both the confidence level and the horizon have to be stated; VaR alone isn't a complete number.

## Segment 3 (steps)

There are three common ways to estimate VaR. Parametric assumes normally distributed returns and computes VaR from the mean and standard deviation — fast, but only as good as that assumption, and real markets have fatter tails than a normal curve predicts. Historical simulation replays today's portfolio against real past return scenarios, with no normality assumption, but it assumes the past is a fair preview of the future. Monte Carlo simulation generates thousands of random scenarios from a richer model — the most flexible approach, and the most computationally expensive.

## Segment 4 (steps)

VaR has two well-known blind spots. First, it's tail-blind: it marks a threshold but says nothing about how bad things get once you cross it. Two portfolios can share the same VaR while one has a mild worst case beyond that line and the other has a catastrophic one. Second, VaR isn't always sub-additive — combining positions can sometimes produce a VaR bigger than the sum of their individual VaRs. Expected Shortfall fixes both problems by averaging the losses inside the tail instead of just marking where it begins.

## Segment 5 (outro)

Hold onto that distinction — VaR marks a threshold, Expected Shortfall measures what happens past it, and that's part of why regulators moved capital rules toward Expected Shortfall. Up next, Lesson 24: stress testing and scenario analysis.
