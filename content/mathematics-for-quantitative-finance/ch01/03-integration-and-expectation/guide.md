# Integration & Expectation

Derivatives measure instantaneous change; integrals undo that and measure accumulation. In quantitative finance, the integral you will use constantly is not "area under a curve" in the abstract — it is the **expected value** of a random payoff, which is an integral against a probability density. This lesson connects the two, then shows how simulation (Monte Carlo) approximates integrals that have no closed form.

## What you'll learn

- The definite integral as a limit of sums (Riemann sums), and the Fundamental Theorem of Calculus
- How expectation $E[X] = \int x \, f(x)\, dx$ is itself an integral, weighted by a probability density
- Why an option's fair price is an expectation (a discounted integral) of its payoff
- How Monte Carlo simulation approximates expectations numerically when no closed form exists

## The definite integral as accumulated area

The definite integral $\int_a^b f(x)\, dx$ is defined as the limit of a **Riemann sum**: partition $[a,b]$ into $n$ strips of width $\Delta x = (b-a)/n$, and sum the areas of thin rectangles:

$$\int_a^b f(x)\, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \, \Delta x$$

The **Fundamental Theorem of Calculus** ties this back to derivatives: if $F'(x) = f(x)$, then

$$\int_a^b f(x)\, dx = F(b) - F(a)$$

Integration and differentiation are inverse operations — exactly why, given a derivative (a Greek, a rate), you can sometimes integrate back to recover the original quantity (a price, a cumulative payoff).

## Expectation is an integral

For a continuous random variable $X$ with probability density function (PDF) $f(x)$, the **expected value** is

$$E[X] = \int_{-\infty}^{\infty} x \, f(x) \, dx$$

This is the integral of $x$ weighted by how likely each value is. The same idea generalizes to any function $g$ of $X$:

$$E[g(X)] = \int_{-\infty}^{\infty} g(x)\, f(x)\, dx$$

**This is the single most important integral in quantitative finance.** A European call option with strike $K$ pays $\max(S_T - K, 0)$ at maturity $T$, where $S_T$ is the (random) stock price at maturity. Under risk-neutral pricing, the option's fair value today is the discounted expectation of that payoff:

$$C_0 = e^{-rT} \, E^{\mathbb{Q}}\big[\max(S_T - K, 0)\big] = e^{-rT} \int_0^\infty \max(s - K, 0) \, f_{S_T}(s) \, ds$$

where $f_{S_T}$ is the risk-neutral density of $S_T$ and $r$ is the risk-free rate. The Black-Scholes formula is nothing more than this integral evaluated in closed form, assuming $S_T$ is lognormally distributed.

## Normal distribution example

If $X \sim N(\mu, \sigma^2)$ with density $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-(x-\mu)^2/(2\sigma^2)}$, the defining integral property is that $f$ integrates to 1 over the real line:

$$\int_{-\infty}^{\infty} f(x)\, dx = 1$$

and, as expected, $E[X] = \int x f(x)\, dx = \mu$. Log-returns of stock prices are often modeled as approximately normal; option-pricing densities, by contrast, are lognormal, because the price itself (not its log) must stay positive.

## Monte Carlo: integrating by simulation

When the integral defining $E[g(X)]$ has no closed form (true for most exotic payoffs), you approximate it by the **law of large numbers**: draw $n$ samples $x_1, \dots, x_n$ from the distribution of $X$, and estimate

$$E[g(X)] \approx \frac{1}{n} \sum_{i=1}^n g(x_i)$$

```python
import numpy as np

rng = np.random.default_rng(42)
S0, K, r, sigma, T = 100.0, 105.0, 0.03, 0.2, 1.0
n = 1_000_000

Z = rng.standard_normal(n)
ST = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)  # lognormal S_T
payoff = np.maximum(ST - K, 0.0)
price = np.exp(-r * T) * payoff.mean()

print(f"Monte Carlo call price: {price:.4f}")
# Monte Carlo call price: 7.1320  (Black-Scholes closed form: 7.1281)
```

The simulated price lands within a few cents of the Black-Scholes closed form, which is expected: both are computing the same integral, one analytically and one by sampling. The accuracy of the Monte Carlo estimate improves at a rate of $1/\sqrt{n}$ — quadrupling the number of samples only halves the error, which is why variance-reduction techniques matter in practice.

## Key terms

| Term | Meaning |
|---|---|
| Riemann sum | Sum of thin rectangle areas approximating a definite integral |
| Fundamental Theorem of Calculus | Links integration and differentiation: $\int_a^b f = F(b)-F(a)$ when $F'=f$ |
| Expectation $E[X]$ | $\int x f(x)\,dx$, the probability-weighted average of a random variable |
| Risk-neutral pricing | Pricing a derivative as the discounted expectation of its payoff |
| Monte Carlo simulation | Approximating an expectation by averaging many random samples |

## Recap

A definite integral is the limit of a sum of thin slices, and the Fundamental Theorem of Calculus ties it back to derivatives; expectation is simply that same integral weighted by a probability density, which is exactly what sits underneath every derivative's fair price. When the integral has no closed form, Monte Carlo simulation approximates it by averaging random draws, converging at a $1/\sqrt{n}$ rate. Next up, Lesson 4: Taylor Series & Approximation, where we learn to approximate complicated functions with polynomials.
