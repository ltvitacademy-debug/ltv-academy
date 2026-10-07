# Capstone Kickoff: Price and Hedge a Derivatives Portfolio

This is it — the capstone, and the final chapter of Financial Markets & Quantitative Finance. The next three lessons pull together the Black-Scholes model and the Greeks from Chapter 3, and the hedging ideas from Chapter 5, into one connected project: build a small options portfolio, price it, measure its risk, and hedge it. This lesson sets up the project. Lesson 32 does the actual math and code. Lesson 33 reviews the results and frames how to present the finished project.

## What you'll learn

- The capstone's goal and its four concrete deliverables
- The fictional underlying and the three options that make up the portfolio
- The market inputs that will feed the Black-Scholes calculations in Lesson 32
- Why "flatten portfolio delta" is the specific hedge goal for this project

## The project, in one sentence

Build a small options portfolio on a single underlying stock, price each option with the Black-Scholes model, compute each option's Greeks, aggregate those Greeks to the portfolio level, and size a hedge trade in the underlying that brings the portfolio's overall delta to zero.

## The underlying and the position

To keep the numbers concrete, this capstone uses a fictional mid-cap stock, **ZQX Inc.**, currently trading at a spot price of **S = $100**, with a risk-free rate of **r = 3%** annually used throughout. The portfolio holds three options on ZQX, a deliberate mix of calls and puts, strikes, and maturities:

| | Type | Strike (K) | Time to expiry (T) | Implied vol (σ) | Position |
|---|---|---|---|---|---|
| Option A | Call | $100 (at-the-money) | 0.5 years | 25% | Long 10 contracts |
| Option B | Call | $110 (out-of-the-money) | 0.25 years | 30% | Long 5 contracts |
| Option C | Put | $95 (out-of-the-money) | 0.5 years | 25% | Short 8 contracts |

Each contract follows the standard convention of covering 100 shares of the underlying. Option C is a **short** position — the portfolio has written (sold) those puts rather than bought them, which is a realistic detail: real options books hold long and short positions in the same portfolio, not just long ones.

## What Lesson 32 will actually compute

Lesson 32 walks through the Black-Scholes pricing and Greeks calculation for each of these three options using real, runnable Python and NumPy code, then aggregates the results. The concrete deliverables:

1. A Black-Scholes **price** for each of the three options, using the S, K, r, σ, and T values above.
2. **Delta, gamma, and vega** for each option.
3. **Portfolio-level** delta, gamma, and vega — the sum of each option's Greek, scaled by its position size and contract multiplier, with short positions contributing with a flipped sign.
4. A **hedge trade**: the number of shares of ZQX to buy or sell so that the portfolio's net delta comes out to zero.

## Why the hedge goal is "flatten delta"

Chapter 5's lesson on hedging strategies introduced delta-hedging an option position by holding an offsetting position in the underlying, since a share of stock has a delta of exactly 1. The same idea scales up to a whole portfolio: once you know the portfolio's net delta, you know exactly how many shares to buy or sell to bring that net exposure to zero. Delta-hedging doesn't make the portfolio risk-free — gamma and vega exposure remain even after delta is flattened, which Lesson 33 comes back to directly — but it removes the portfolio's first-order sensitivity to a small move in ZQX's price, which is usually the largest single risk in an options book.

## Key terms

| Term | Meaning |
|---|---|
| Spot price (S) | The underlying's current market price |
| Strike price (K) | The price at which an option can be exercised |
| Implied volatility (σ) | The volatility input used to price the option |
| Contract multiplier | The number of underlying shares one option contract covers (100, by convention) |
| Portfolio Greeks | An option Greek aggregated across every position in a portfolio |

## Recap

The setup is in place: ZQX Inc. at $100, three options with different strikes and maturities, a mix of long and short positions, and a clear goal — price it, measure it, and flatten its delta. Next up, Lesson 32: Capstone — Build It, where these numbers actually get run through the Black-Scholes formula and the Greeks in code.
