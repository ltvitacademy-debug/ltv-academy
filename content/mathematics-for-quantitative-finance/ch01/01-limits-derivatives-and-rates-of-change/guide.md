# Limits, Derivatives & Rates of Change

Welcome to Mathematics for Quantitative Finance. Every model you will build in this program — option pricing, risk measures, portfolio optimization — rests on calculus and linear algebra, and this course builds that foundation properly rather than assuming it. This lesson starts at the beginning: the limit, the derivative it defines, and why "rate of change" is the single idea that connects a stock's price path to the Greeks that hedge it.

## What you'll learn

- What a limit means formally, and why it is the right tool for instantaneous (not average) change
- The derivative as a limit of a difference quotient, and the mechanical rules (power, product, quotient, chain) used to compute it
- Why a derivative is a *rate of change*, and how that reads directly as delta, a sensitivity used throughout finance
- How to compute derivatives numerically in Python and check them against the closed form

## The limit: making "approaches" precise

A limit asks what a function does *near* a point, not necessarily *at* it. Formally, $\lim_{x \to a} f(x) = L$ means: for every $\varepsilon > 0$, there exists a $\delta > 0$ such that whenever $0 < |x - a| < \delta$, we have $|f(x) - L| < \varepsilon$. In plain language, you can force $f(x)$ as close to $L$ as you like by keeping $x$ close enough to $a$. Limits let us talk about behavior at a single instant even when a direct substitution would divide by zero — exactly the situation we face in the next section.

## The derivative as a limit

The **average rate of change** of $f$ over an interval $[a, a+h]$ is the familiar slope of a secant line:

$$\frac{f(a+h) - f(a)}{h}$$

The **derivative** is what this ratio approaches as the interval shrinks to a point:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

This is the slope of the *tangent* line at $a$ — the instantaneous rate of change. If $f(t)$ is a stock price at time $t$, $f'(t)$ is the instantaneous velocity of that price. If $V(S)$ is the value of an option as a function of the underlying price $S$, $V'(S)$ is exactly the Greek called **delta**: how much the option's value moves per one-dollar move in the stock.

## Differentiation rules you will use constantly

- **Power rule**: $\frac{d}{dx} x^n = n x^{n-1}$
- **Product rule**: $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$
- **Quotient rule**: $\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{g(x)^2}$
- **Chain rule**: $\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)$

The chain rule is the one you will reach for most in quant work, because so many finance quantities are compositions: log-returns are $\ln(S_t)$, a function of a function; Black-Scholes delta is a composition through the normal CDF $N(d_1)$, where $d_1$ itself depends on $S$, $K$, $\sigma$, $r$, and $t$.

**Worked example.** Let $f(S) = \ln(S)$, the log-price. Then $f'(S) = \frac{1}{S}$. This says the log-price's instantaneous rate of change per dollar move shrinks as $S$ grows — exactly why returns, not raw price changes, are the natural unit of "how much did it move" in finance: a $1 move means much more for a $10 stock than a $1,000 stock.

**Second worked example (chain rule).** Suppose a bond's price is $P(y) = 100 e^{-yT}$, where $y$ is yield and $T$ is maturity (continuous discounting). Then

$$P'(y) = 100 \cdot (-T) e^{-yT} = -T \cdot P(y)$$

The quantity $-P'(y)/P(y) = T$ is (for this simple case) the bond's **duration** — the sensitivity of price to yield, expressed as a derivative.

## Checking derivatives numerically

A finite-difference approximation of $f'(a)$ replaces the limit with a small but nonzero $h$:

```python
import numpy as np

def f(S):
    return np.log(S)

def numerical_derivative(f, a, h=1e-5):
    return (f(a + h) - f(a - h)) / (2 * h)  # central difference

a = 100.0
approx = numerical_derivative(f, a)
exact = 1.0 / a
print(f"numerical: {approx:.8f}   exact: {exact:.8f}")
# numerical: 0.01000000   exact:  0.01000000
```

The **central difference** formula above is more accurate than the one-sided version in the limit definition, because its error shrinks like $h^2$ rather than $h$ — useful to know when you later compute Greeks by bumping a pricing model instead of deriving a closed form.

## Key terms

| Term | Meaning |
|---|---|
| Limit | The value a function approaches near a point, written $\lim_{x\to a} f(x)$ |
| Derivative | The instantaneous rate of change, $f'(a) = \lim_{h\to 0} \frac{f(a+h)-f(a)}{h}$ |
| Chain rule | Differentiates a composition $f(g(x))$ as $f'(g(x))\, g'(x)$ |
| Delta | Finance term for $\frac{dV}{dS}$, an option's sensitivity to the underlying price |
| Finite difference | A numerical approximation to a derivative using a small step $h$ |

## Recap

A limit makes "instantaneous" precise, and the derivative is the limit of the average rate of change as the interval shrinks to zero — the same slope that finance calls delta or duration depending on context. The power, product, quotient, and chain rules let you compute derivatives of any composition you will meet, and a central finite difference lets you check your work numerically. Next up, Lesson 2: Multivariable Calculus & Gradients, where we extend all of this to functions of several variables at once.
