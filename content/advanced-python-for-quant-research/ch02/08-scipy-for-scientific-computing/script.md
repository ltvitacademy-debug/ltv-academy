# Script — SciPy for Scientific Computing

## Segment 1 (title)

NumPy gives you arrays and basic math. SciPy builds a large, well-tested library of numerical algorithms on top of that — statistics, optimization, signal processing, sparse linear algebra — so you're not reimplementing a root finder from scratch. This lesson tours the modules you'll actually reach for in quant work.

## Segment 2 (code)

scipy dot stats gives you dozens of probability distributions behind one consistent interface: pdf, cdf, ppf for the inverse CDF, and fit for parameter estimation. Fit a normal distribution to simulated daily returns, and ppf at the fifth percentile gives you a parametric one-day ninety-five percent Value at Risk. Shapiro tests whether the sample is actually consistent with being normal in the first place.

## Segment 3 (code)

scipy dot optimize handles both root-finding and minimization — lessons nine and ten go deep on each. The shape of the API: minimize takes a function and a starting point, and the result carries dot x for the solution, dot fun for the value there, and dot success, which you should always check rather than assuming convergence happened.

## Segment 4 (code)

scipy dot signal has filtering tools built originally for signal processing that turn out to help with noisy financial time series too. A Savitzky-Golay filter smooths data while preserving trend shape better than a plain moving average, controlled by a window length and a polynomial order.

## Segment 5 (code)

Plenty of quant structures — a factor exposure matrix across a huge universe — are mostly zeros. scipy dot sparse stores only the non-zero entries, which saves enormous memory. csr_matrix, compressed sparse row, is the go-to format for arithmetic; converting a genuinely sparse structure back to a dense array defeats the whole point.

## Segment 6 (outro)

Reach for SciPy when you need a named algorithm with real complexity behind it, not basic array math NumPy already covers. Next up, lesson nine: linear algebra routines in practice, including the eigendecomposition and SVD underneath a portfolio covariance matrix.
