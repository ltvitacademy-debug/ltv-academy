# Mental Math & Estimation

Chapter 7's final lesson is the most practical one in the entire course: quant interviews (and trading desks, under time pressure) reward *fast, good-enough* arithmetic far more often than exact answers computed slowly. This lesson collects the handful of tricks — algebraic shortcuts, linear and Taylor approximations from Chapter 1, the Central Limit Theorem from Chapter 3 — that turn "do this calculation in your head in ten seconds" from a parlor trick into a repeatable method.

## What you'll learn

- The difference-of-squares trick for multiplying two nearby numbers
- Linear (first-order Taylor) approximation for square roots, reusing Lesson 4's machinery
- The Rule of 72 (and its more exact sibling, the Rule of 69.3) for compounding and doubling times
- Using the Central Limit Theorem from Lesson 15 to estimate binomial tail probabilities without a calculator
- Why every mental-math trick here is secretly a Chapter 1–3 concept in disguise

## Difference of squares: multiplying nearby numbers

To multiply two numbers close to a round number, write them as $(m-d)(m+d) = m^2 - d^2$ around their midpoint $m$.

**Worked example.** $17 \times 23$: the midpoint is $m=20$, half-difference $d=3$, so $17 \times 23 = 20^2 - 3^2 = 400 - 9 = 391$.

```python
m, d = 20, 3
mental = m**2 - d**2
actual = 17 * 23
print(f"mental: {mental}   actual: {actual}")
# mental: 391   actual: 391
```

This works any time the two numbers are equidistant from a convenient midpoint, and it's strictly easier than long multiplication because squaring a round number and a small number is much faster than multiplying two arbitrary two-digit numbers.

## Square roots via linear approximation

Lesson 4 (Taylor Series & Approximation) established that near a known point $a$, $f(a+h) \approx f(a) + f'(a)h$ for small $h$. Apply this to $f(x)=\sqrt{x}$, with $f'(x) = \frac{1}{2\sqrt{x}}$:

$$\sqrt{a+h} \approx \sqrt{a} + \frac{h}{2\sqrt{a}}$$

**Worked example.** Estimate $\sqrt{50}$ using the nearby perfect square $a=49$ ($\sqrt{49}=7$), $h=1$:

$$\sqrt{50} \approx 7 + \frac{1}{2 \times 7} = 7 + \frac{1}{14} \approx 7.0714$$

```python
from math import sqrt

approx = 7 + 1/14
actual = sqrt(50)
print(f"linear approx: {approx:.4f}   actual: {actual:.4f}")
# linear approx: 7.0714   actual: 7.0711
```

The error is about $0.0004$ — far more precision than mental math needs, and it generalizes to any square root by picking the nearest perfect square as the anchor point $a$. A second, equally useful variant is **Newton's method** (also built on the same linear-approximation idea, iterated once): starting from a guess $x_0$, refine with $x_1 = \frac{1}{2}\left(x_0 + \frac{a}{x_0}\right)$.

```python
x0 = 1.5
x1 = 0.5 * (x0 + 2/x0)
print(f"one Newton step from x0={x0}: {x1:.4f}   actual sqrt(2): {sqrt(2):.4f}")
# one Newton step from x0=1.5: 1.4167   actual sqrt(2): 1.4142
```

One iteration from a rough initial guess already lands within $0.003$ — useful when there's no nearby perfect square to anchor the linear approximation on.

## The Rule of 72: estimating compounding in your head

To estimate how many years it takes an investment to double at an annual growth rate $r\%$, the **Rule of 72** says: years $\approx 72/r$. It comes from the exact doubling-time formula $t = \ln(2)/\ln(1+r)$, approximated for small $r$ using $\ln(1+r) \approx r$ (another linear approximation, Lesson 4 again) — and $72$ is chosen over the more "exact" constant $100\ln 2 \approx 69.3$ because $72$ has far more small integer divisors (1, 2, 3, 4, 6, 8, 9, 12...), making the mental division easier at the cost of a small amount of accuracy.

```python
from math import log

r = 0.08   # 8% annual growth
rule_of_72 = 72 / (r * 100)
exact = log(2) / log(1 + r)
print(f"Rule of 72 estimate: {rule_of_72:.2f} years   exact: {exact:.2f} years")
# Rule of 72 estimate: 9.00 years   exact: 9.01 years
```

For continuously compounded rates specifically, the exact constant is $\ln(2) \approx 0.693$, i.e., the **Rule of 69.3**: doubling time $= 0.693/r$. At $r=8\%$ continuous, that gives $0.693/0.08 \approx 8.66$ years — close to, but not identical to, the discrete 9.01-year answer above, because discrete annual compounding at 8% and continuous compounding at 8% aren't quite the same growth process.

## Estimating tail probabilities with the CLT

Lesson 15 showed that a sum (or average) of many independent random variables is approximately normal. This gives a fast mental shortcut for binomial tail probabilities: flip a fair coin $n=100$ times; roughly estimate $P(\text{at least 60 heads})$.

The binomial has mean $\mu = np = 50$ and standard deviation $\sigma = \sqrt{np(1-p)} = \sqrt{100 \times 0.5 \times 0.5} = 5$. "At least 60" is $(60-50)/5 = 2$ standard deviations above the mean, and a mental-math rule of thumb worth memorizing is that $P(Z \geq 2) \approx 2.5\%$ (from the standard normal — roughly half of the "about 5% beyond 2 standard deviations in either direction" heuristic from Lesson 15's discussion of the 68-95-99.7 rule).

```python
from scipy.stats import norm, binom

n, p = 100, 0.5
mu, sigma = n * p, (n * p * (1 - p)) ** 0.5
z = (59.5 - mu) / sigma            # continuity correction
normal_approx = 1 - norm.cdf(z)
exact = 1 - binom.cdf(59, n, p)
print(f"normal approx: {normal_approx:.4f}   exact binomial: {exact:.4f}")
# normal approx: 0.0287   exact binomial: 0.0284
```

The quick mental estimate ("2 standard deviations out, so about 2.5%") and the careful normal-approximation calculation both land close to the true binomial probability of about 2.8% — plenty accurate for a verbal interview answer, and dramatically faster than trying to sum binomial terms by hand.

## Key terms

| Term | Meaning |
|---|---|
| Difference of squares | $(m-d)(m+d)=m^2-d^2$, a fast way to multiply two numbers equidistant from a midpoint |
| Linear (first-order Taylor) approximation | $f(a+h)\approx f(a)+f'(a)h$, the basis for mental square-root and compounding estimates |
| Rule of 72 / Rule of 69.3 | Years to double $\approx 72/r\%$ (discrete) or $0.693/r$ (continuous) |
| Newton's method | Iteratively refining a root guess via $x_1 = \tfrac{1}{2}(x_0 + a/x_0)$ |
| CLT-based tail estimate | Approximating binomial tail probabilities using the normal distribution's standard deviations |

## Recap

Every trick in this lesson is a Chapter 1–3 concept compressed into a ten-second shortcut: difference of squares is just algebra, square-root and compounding estimates are linear Taylor approximations, and tail-probability estimates lean on the Central Limit Theorem. This closes Chapter 7's quant-interview toolkit; Chapter 8 now puts the *entire* course to work in one project — Lesson 39 kicks off the capstone, building a real mathematical model of asset prices from the calculus, probability, and stochastic-process material you've spent 38 lessons assembling.
