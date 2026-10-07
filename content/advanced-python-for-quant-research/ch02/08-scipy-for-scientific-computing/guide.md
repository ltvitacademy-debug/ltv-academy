# SciPy for Scientific Computing

NumPy gives you arrays and basic math. SciPy builds a large, well-tested library of numerical algorithms on top of that foundation — statistics, optimization, signal processing, sparse linear algebra, and more — so you're not re-implementing a root finder or a probability distribution from scratch. This lesson is a tour of the modules you'll actually reach for in quant work, and a sense of when SciPy is the right level to work at versus plain NumPy.

## What you'll learn

- `scipy.stats`: distributions, fitting, and hypothesis tests
- `scipy.optimize`: minimization and root-finding at a glance (detailed in Lessons 9-10)
- `scipy.signal`: filtering and smoothing time series
- `scipy.sparse`: matrices that are mostly zeros
- A rule of thumb for "NumPy or SciPy?"

## scipy.stats: distributions and tests

`scipy.stats` provides dozens of probability distributions with a consistent interface: `.pdf`, `.cdf`, `.ppf` (inverse CDF), `.rvs` (random samples), and `.fit` (parameter estimation from data).

```python
from scipy import stats
import numpy as np

returns = np.random.normal(0.0005, 0.012, 2000)   # simulated daily returns

mu, sigma = stats.norm.fit(returns)
print(f"fitted mean={mu:.5f}, std={sigma:.5f}")

var_95 = stats.norm.ppf(0.05, mu, sigma)   # 5th percentile = 1-day 95% VaR
print(f"1-day 95% VaR: {var_95:.4f}")

# Is this return series plausibly normal?
stat, p = stats.shapiro(returns)
print(f"Shapiro-Wilk p-value: {p:.4f}")
```

`stats.norm.ppf` is the standard way to get a parametric Value-at-Risk number once you've fit a distribution. `stats.shapiro` (and `stats.jarque_bera`, `stats.kstest`) test whether a sample is consistent with a given distribution — useful for checking the normality assumption that sits underneath many simpler risk models.

## scipy.optimize: a preview

`scipy.optimize` handles both "find where a function equals zero" (root-finding) and "find where a function is smallest" (minimization). You'll go deep on both in Lessons 9 and 10; the shape of the API:

```python
from scipy import optimize

# Minimize a simple function
result = optimize.minimize(lambda x: (x[0] - 3) ** 2 + (x[1] + 1) ** 2, x0=[0, 0])
print(result.x, result.fun)   # [3. -1.], ~0.0
```

`result` carries the solution (`.x`), the function value there (`.fun`), and whether it actually converged (`.success`) — always check `.success` rather than assuming the optimizer found a real answer.

## scipy.signal: filtering a time series

`scipy.signal` provides filtering and smoothing tools originally built for signal processing, which turn out to be useful for noisy financial time series too. A Savitzky-Golay filter smooths data while preserving trend shape better than a plain moving average:

```python
from scipy.signal import savgol_filter

prices = np.cumsum(np.random.normal(0, 1, 300)) + 100
smoothed = savgol_filter(prices, window_length=21, polyorder=2)
```

`window_length` (must be odd) and `polyorder` control the smoothing strength; a higher `polyorder` relative to `window_length` preserves more local curvature at the cost of less noise reduction.

## scipy.sparse: matrices that are mostly zeros

A covariance matrix across thousands of assets is dense, but many quant structures — a factor-exposure matrix across a huge universe, or an adjacency matrix for a correlation network — are mostly zeros. `scipy.sparse` stores only the non-zero entries, which saves enormous memory and speeds up the specific operations it supports:

```python
from scipy import sparse

row = [0, 1, 2, 2]
col = [1, 2, 0, 1]
data = [4.0, 5.0, 6.0, 7.0]
m = sparse.csr_matrix((data, (row, col)), shape=(3, 3))
print(m.toarray())
# [[0. 4. 0.]
#  [0. 0. 5.]
#  [6. 7. 0.]]
```

`csr_matrix` (compressed sparse row) is the go-to format for arithmetic and matrix-vector products; `csc_matrix` (compressed sparse column) is better for column-slicing. Converting a genuinely sparse structure to a dense NumPy array defeats the purpose — the memory savings only exist as long as it stays sparse.

## NumPy or SciPy?

A rough rule of thumb: if the operation is basic array math (arithmetic, broadcasting, simple linear algebra like `np.dot` or a determinant), NumPy already has it and adding SciPy as a dependency buys nothing. Reach for SciPy when you need a named algorithm with real complexity behind it — a probability distribution's CDF, a constrained optimizer, a specific filter design, a sparse matrix format — rather than reimplementing it yourself on top of plain arrays. SciPy itself depends on NumPy and uses NumPy arrays as its primary data structure throughout, so there's no friction moving between the two.

## Key terms

| Term | Meaning |
|---|---|
| `scipy.stats` | Probability distributions and statistical tests, with a consistent `.pdf`/`.cdf`/`.ppf`/`.fit` interface |
| `scipy.optimize` | Root-finding and minimization routines |
| `scipy.signal` | Filtering and smoothing tools, originally for signal processing |
| `scipy.sparse` | Storage formats for matrices that are mostly zero entries |
| `.success` | Field on an optimizer's result confirming whether it actually converged |

## Recap

SciPy is where you reach for a named, well-tested numerical algorithm instead of reimplementing one on top of raw NumPy arrays — distributions and tests in `scipy.stats`, optimization and root-finding in `scipy.optimize`, filtering in `scipy.signal`, and memory-efficient sparse formats in `scipy.sparse`. Next lesson: linear algebra routines in practice, including the eigendecomposition and SVD that sit underneath a portfolio covariance matrix and PCA.
