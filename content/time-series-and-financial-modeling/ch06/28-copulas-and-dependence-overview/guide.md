# Copulas & Dependence Overview

Lesson 27 modeled a single series switching between distinct regimes. This closing lesson of Chapter 6 asks a related question about *multiple* series at once: when two assets crash together, is that captured by the correlation number everyone already computes, or is something important missing from it? The answer motivates copulas — a more general way to describe how variables depend on each other, beyond a single correlation coefficient.

## What you'll learn

- Why linear correlation alone fully describes dependence only for jointly elliptical (e.g. multivariate normal) distributions
- Tail dependence: why two assets can look mildly correlated in normal times but crash together anyway
- What a copula is, conceptually, and the informal idea behind Sklar's theorem
- Gaussian copula vs. Student-t copula, and why only the latter has tail dependence
- A worked comparison of joint tail co-exceedance under both constructions, at the same linear correlation

## The limits of linear correlation

Pearson correlation measures the strength of a *linear* relationship between two variables, and for jointly normal (or more generally, elliptical) data, correlation really does fully summarize the dependence structure — once you know the correlation, you know everything about how the two variables move together, in every part of the distribution. Real asset returns, though, are usually **not** jointly normal: they often show **tail dependence** — a tendency for extreme moves in one asset to coincide with extreme moves in another *far more often than a multivariate normal with the same overall correlation would predict*. Two assets might show only middling correlation across ordinary trading days, yet crash together during a crisis almost every time one of them craters — a pattern a single correlation number, computed mostly from the "normal" days that dominate any historical sample, can completely miss.

## What a copula is

A **copula** is, informally, a function that captures the pure dependence structure between variables, completely separated from their individual (marginal) distributions. **Sklar's theorem** (stated informally, with no need for the proof) says that any joint distribution can be split into two independent pieces: each variable's own marginal distribution, and a copula describing how the variables' percentile ranks move together. This separation is powerful in practice: you can keep whatever realistic marginal distribution fits each asset individually (fat-tailed, skewed, whatever fits best) while swapping in different *dependence* structures to see how the joint behavior — especially the joint tail risk — changes.

## Gaussian copula vs. Student-t copula

- The **Gaussian copula** is built from a multivariate normal distribution: generate correlated standard normals, then apply the normal CDF to get correlated uniform ("percentile rank") variables — the copula itself. Because it's built from a multivariate normal, it inherits the normal's property of **zero tail dependence**: as you move further into the joint tail, the chance of a joint extreme event relative to each variable's own marginal tail probability actually shrinks toward zero.
- The **Student-t copula** is built the same way but from a multivariate Student-t distribution instead. Because the multivariate t has heavier joint tails than the normal (all variables share a common random scaling factor, which can make everything move together violently at once), the t-copula has **positive tail dependence** even after matching the same linear correlation — exactly the pattern real markets tend to show.

## Worked example: comparing joint tail behavior at the same correlation

```python
import numpy as np
from scipy import stats

rng = np.random.default_rng(99)
n = 200_000
rho = 0.5
corr = np.array([[1.0, rho], [rho, 1.0]])

# Gaussian copula: correlate standard normals, map through norm.cdf to get the copula,
# then apply arbitrary (here, Student-t) marginals on top
z = rng.multivariate_normal([0, 0], corr, size=n)
u_gauss = stats.norm.cdf(z)
x1_gauss = stats.t(df=5).ppf(u_gauss[:, 0])
x2_gauss = stats.t(df=5).ppf(u_gauss[:, 1])

# Student-t copula, same linear correlation, via a multivariate-t construction
df_t = 4
g = rng.multivariate_normal([0, 0], corr, size=n)
chi2 = rng.chisquare(df_t, size=n)
t_draws = g / np.sqrt(chi2 / df_t)[:, None]
u_t = stats.t(df=df_t).cdf(t_draws)
x1_t = stats.t(df=5).ppf(u_t[:, 0])
x2_t = stats.t(df=5).ppf(u_t[:, 1])

def tail_coexceedance(x1, x2, q):
    thresh1, thresh2 = np.quantile(x1, q), np.quantile(x2, q)
    return ((x1 <= thresh1) & (x2 <= thresh2)).mean()

for q in [0.05, 0.01]:
    p_gauss = tail_coexceedance(x1_gauss, x2_gauss, q)
    p_t = tail_coexceedance(x1_t, x2_t, q)
    print("q=%.2f -> independent benchmark=%.5f | Gaussian copula=%.5f | t-copula=%.5f" % (
        q, q*q, p_gauss, p_t))
```

With both constructions built from the *same* linear correlation (`rho=0.5`), the results were:

```
Pearson corr -- Gaussian copula pair: 0.490, t-copula pair: 0.500 (target rho=0.50)

q=0.05 -> independent benchmark=0.00250 | Gaussian copula=0.01212 | t-copula=0.01711
q=0.01 -> independent benchmark=0.00010 | Gaussian copula=0.00133 | t-copula=0.00278

Direct bivariate normal joint tail prob -- q=0.05: 0.01192, q=0.01: 0.00130
```

A few things stand out. First, both constructions share essentially the same linear correlation (0.49-0.50), so a correlation matrix alone cannot distinguish them. Second, the Gaussian copula's joint tail probability (0.01212 at the 5% tail, 0.00133 at the 1% tail) closely matches a directly simulated bivariate normal at the same rho (0.01192 and 0.00130) — a good consistency check that the copula construction is doing exactly what a multivariate normal would do. Third, and most importantly, the **Student-t copula** produces a noticeably higher joint tail probability at both thresholds — 0.01711 versus 0.01212 at the 5% tail (about 40% higher), and 0.00278 versus 0.00133 at the 1% tail (more than double). That gap is tail dependence made concrete: at the *same* linear correlation, the t-copula puts meaningfully more probability on both assets being extreme at once, which is exactly the behavior a risk model built only around a correlation matrix and normal assumptions would miss.

## Key terms

| Term | Meaning |
|---|---|
| Tail dependence | Tendency for joint extreme events to occur more (or less) often than a correlation-matched normal would predict |
| Copula | A function capturing pure dependence structure, separated from each variable's own marginal distribution |
| Sklar's theorem | Informally: any joint distribution splits into marginals plus a copula |
| Gaussian copula | Copula built from a multivariate normal; has zero tail dependence |
| Student-t copula | Copula built from a multivariate Student-t; has positive tail dependence at the same correlation |

## Recap

Linear correlation fully describes dependence only for elliptical distributions like the multivariate normal, and real markets often show tail dependence that a correlation matrix alone misses; copulas separate marginal distributions from dependence structure, and the worked comparison showed the Student-t copula producing meaningfully more joint tail risk than the Gaussian copula at the exact same linear correlation. That closes Chapter 6's tour of state-space models, regime switching, and dependence structure. Chapter 7 turns to a very different area of practice — technical indicators and their pitfalls, starting with Lesson 29.
