# The Binomial Model

Put-call parity tells you how a call and put price relate to each other, but it doesn't tell you what either one is worth on its own. The binomial model is the first framework in this course that actually prices an option from scratch. It does it with a surprisingly simple trick: chop time into small steps, assume the stock can only go up or down at each step, and work backward from expiration using no-arbitrage logic at every single node.

## What you'll learn

- How the binomial tree represents possible stock price paths
- The risk-neutral probability, and why it isn't the "real" probability of the stock going up
- Backward induction: pricing an option by working from expiration back to today
- Why the binomial model converges to Black-Scholes as the number of steps grows

## Building the tree

Split the option's life into N small time steps of length Δt. At each step, the stock can move up by a factor u or down by a factor d:

```
S_up   = S * u
S_down = S * d
```

Common choices (the Cox-Ross-Rubinstein parameterization) tie u and d to volatility: u = e^(σ√Δt), d = 1/u. Starting from today's price S, repeatedly applying u and d for N steps builds out every possible price path, forming a tree (technically a recombining lattice, since an up-then-down move lands on the same price as down-then-up).

## The risk-neutral probability

Here's the trick that makes no-arbitrage pricing work on the tree: instead of using the real-world probability that the stock goes up, you use a **risk-neutral probability** p, defined so that the stock's expected return over one step, under p, exactly equals the risk-free rate:

```
p = (e^(r*dt) - d) / (u - d)
```

This p is not a forecast of what will actually happen — it's a pricing device. It's the probability that would apply if every investor were indifferent to risk. The entire point of using it is that under p, you can discount expected payoffs at the risk-free rate and get an arbitrage-free price, without ever needing to know real-world probabilities or investors' risk preferences. This is the same no-arbitrage logic from Lesson 12, just applied step-by-step instead of once.

## Backward induction

Pricing proceeds from the end of the tree backward to today:

1. At expiration (the final layer of nodes), compute the option's payoff directly: max(S−K, 0) for a call, max(K−S, 0) for a put, at every possible final stock price.
2. At every earlier node, the option's value is the discounted, risk-neutral expected value of its two possible successor nodes:

```
V = e^(-r*dt) * (p * V_up + (1 - p) * V_down)
```

3. Repeat step 2 moving backward one layer at a time until you reach the single node at today, which gives the option's current fair price.

Because each step only ever looks one node ahead, this same backward-induction machinery handles American options almost for free: at each node you simply compare the computed "hold" value against the immediate exercise value (the payoff if exercised right then) and take whichever is larger. European options, by contrast, only allow exercise at the final layer.

## Worked example: two-step binomial call

Let S = 100, K = 100, u = 1.1, d = 0.9, r = 5% per step (continuously compounded), and 2 steps.

```python
import math
S, K, u, d, r = 100, 100, 1.1, 0.9, 0.05
p = (math.exp(r) - d) / (u - d)        # (1.0513 - 0.9) / 0.2 = 0.7564

# final stock prices after 2 steps: uu, ud, dd
S_uu, S_ud, S_dd = S*u*u, S*u*d, S*d*d   # 121, 99, 81
V_uu, V_ud, V_dd = max(S_uu-K,0), max(S_ud-K,0), max(S_dd-K,0)  # 21, 0, 0

disc = math.exp(-r)
V_u = disc * (p*V_uu + (1-p)*V_ud)       # step back to the "up" node
V_d = disc * (p*V_ud + (1-p)*V_dd)       # step back to the "down" node
V_0 = disc * (p*V_u + (1-p)*V_d)         # step back to today
```

Working through the numbers: p ≈ 0.7564, V_u ≈ 15.11, V_d ≈ 0, and the call's price today comes out to **V_0 ≈ 10.87**. Every number in this calculation came from no-arbitrage logic and the risk-free rate — never from a guess about which way the stock is more likely to move.

## Convergence to Black-Scholes

As you increase the number of steps N while shrinking Δt proportionally, the binomial tree's price converges to the Black-Scholes price (Lesson 14) for a European option. The binomial model is, in a precise sense, a discrete-time approximation of the same continuous-time, no-arbitrage logic that Black-Scholes applies in closed form. Practitioners favor the tree specifically when they need early-exercise features, discrete dividends, or other complications that don't have a clean closed-form solution — situations you'll meet again in Lesson 17.

## Key terms

| Term | Meaning |
|---|---|
| Binomial tree / lattice | A discrete set of possible stock price paths built from up/down moves per step |
| Up/down factors (u, d) | Multipliers applied to the stock price at each step |
| Risk-neutral probability (p) | The probability under which discounted expected payoffs give an arbitrage-free price |
| Backward induction | Computing option value layer by layer from expiration back to today |

## Recap

The binomial model prices options by building a tree of possible stock paths, computing payoffs at expiration, and working backward using a risk-neutral probability that makes discounted expected payoffs arbitrage-free. It handles American-style early exercise naturally and converges to Black-Scholes as the number of steps grows. Next up, Lesson 14: the Black-Scholes model, the continuous-time closed-form version of this same idea.
