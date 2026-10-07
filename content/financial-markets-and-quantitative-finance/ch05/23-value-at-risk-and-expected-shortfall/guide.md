# Value at Risk & Expected Shortfall

Welcome to Chapter 5, Risk Management. The first four chapters were about understanding markets, pricing instruments, and building portfolios. This chapter is about a different question: once you hold a position, how much can it lose — and how do you put a number on that? Lesson 23 covers the two most widely used tail-risk numbers in finance: Value at Risk (VaR) and Expected Shortfall (ES).

## What you'll learn

- What a VaR statement actually means, and the confidence level and horizon it depends on
- Three ways to estimate VaR: parametric (variance-covariance), historical simulation, and Monte Carlo
- Why VaR has two real blind spots: it says nothing about tail severity, and it isn't always sub-additive
- Expected Shortfall as a coherent fix, and why regulators moved trading-book capital rules toward it

## What VaR actually measures

Value at Risk at confidence level α, over a given horizon, is the loss level that is not expected to be exceeded with probability α. A "1-day 99% VaR of $1 million" means: on no more than 1% of trading days, this portfolio is expected to lose more than $1 million. It does **not** mean the portfolio can never lose more than $1 million — it means that outcome is supposed to be rare, specifically a 1-in-100-day event. Both the confidence level (95%, 99%, and so on) and the horizon (1-day, 10-day) have to be stated for a VaR number to mean anything; "VaR is $1 million" by itself is incomplete.

## Three ways to estimate VaR

- **Parametric (variance-covariance)** — assumes portfolio returns are normally distributed, then uses the mean (μ) and standard deviation (σ) of returns directly: VaR = −(μ − zα·σ), where zα is the standard normal quantile for the chosen confidence level (roughly 1.65 for 95%, 2.33 for 99%). Fast to compute, but only as good as the normality assumption — real returns have fatter tails than a normal distribution predicts.
- **Historical simulation** — takes the portfolio's actual composition today and replays it against real historical return scenarios (e.g. the last 500 trading days), then reads the VaR off the resulting distribution of simulated P&L. No normality assumption, but it assumes the past is representative of future risk.
- **Monte Carlo simulation** — simulates thousands of random future scenarios from an assumed statistical model (which can be far richer than a simple normal distribution, including fat tails and correlated factors), then reads VaR off the simulated outcomes. The most flexible method, and the most computationally expensive.

## Where VaR breaks down

VaR has two well-known limitations that matter for how it's used in practice:

- **Tail-blindness** — VaR tells you the threshold a loss is unlikely to cross, but nothing about how bad things get if it does cross. Two portfolios can have an identical 99% VaR while one loses only slightly more than the VaR threshold in its worst 1% of days, and the other loses catastrophically more.
- **Non-sub-additivity** — a risk measure is "sub-additive" if combining two positions can never increase total risk beyond the sum of their individual risks (diversification should help, not hurt). VaR does not guarantee this in general: it's possible for the VaR of a combined portfolio to exceed the sum of the VaRs of its two pieces, which makes VaR an unreliable basis for some risk-aggregation and capital-allocation decisions.

## Expected Shortfall: a coherent fix

Expected Shortfall (ES), also called Conditional VaR (CVaR), answers a different question: **given** that the loss exceeds the VaR threshold, what is the average loss? Where VaR reports a single cutoff point, ES reports the average severity of the scenarios beyond that cutoff — directly addressing VaR's tail-blindness. ES is also a "coherent" risk measure in the technical sense that includes sub-additivity, which VaR lacks. This is a major reason the Basel Committee's Fundamental Review of the Trading Book (FRTB) moved minimum trading-book capital requirements from VaR to a 97.5% Expected Shortfall measure.

## Key terms

| Term | Meaning |
|---|---|
| Value at Risk (VaR) | The loss level not expected to be exceeded with a given confidence over a given horizon |
| Expected Shortfall (ES / CVaR) | The average loss, given that the loss exceeds the VaR threshold |
| Parametric VaR | VaR estimated from an assumed return distribution (usually normal), using mean and standard deviation |
| Historical simulation | VaR estimated by replaying today's portfolio against actual historical return scenarios |
| Coherent risk measure | A risk measure satisfying sub-additivity (and other technical properties) that VaR does not guarantee |

## Recap

VaR gives a one-number answer to "how bad can it get, with X% confidence" — but it's silent on how bad "worse than that" actually is, and it can understate the risk of combining positions. Expected Shortfall fixes both problems by averaging the losses in the tail rather than just marking where the tail begins. Next up, Lesson 24: stress testing and scenario analysis — the tools used alongside VaR and ES to probe risks that historical statistics alone can miss.
