# Script — Hierarchical Risk Parity

## Segment 1 (title)

Mean-variance optimization asks for the weight vector that maximizes return for a given risk, and to do that it needs to invert the covariance matrix. Hierarchical risk parity, from Marcos Lopez de Prado, sidesteps that inversion entirely by using the clustering structure of the correlation matrix itself to allocate weight.

## Segment 2 (steps)

Here's why the inversion is such a problem. Markowitz's optimal weights come from a formula that needs the inverse of the covariance matrix. When assets are highly correlated, which is normal in equity markets, that matrix sits close to singular, and its inverse becomes extremely sensitive to small errors in the estimated correlations — exactly where real covariance estimates are weakest. The practical result is notorious: these portfolios load up heavily on one or two assets whose estimated covariance happened to look slightly favorable, and the weights can flip wildly with a tiny change in the input data.

## Segment 3 (steps)

HRP replaces all of that with three steps. First, tree clustering: build a hierarchical clustering tree from the correlation distance matrix. Second, quasi-diagonalization: reorder the assets by that tree's leaf order, so similar assets sit next to each other — no values change, just the ordering. Third, recursive bisection: starting from that ordered list, split each group in half and give more weight to whichever half has lower variance, then recurse all the way down to single assets.

## Segment 4 (code)

The recursive bisection code makes the "no inversion" claim concrete. At every level, it only ever computes the variance of one sub-cluster and compares it to its sibling's variance, then splits weight between them inversely to that ratio. That's the entire allocation rule, repeated down the tree. There is no step anywhere that inverts a matrix.

## Segment 5 (outro)

Because HRP only ever compares one group's variance to another's, a noisy estimate in one corner of the matrix doesn't blow up the whole allocation the way an unstable inverse can — which is why HRP portfolios tend to hold up better out of sample even when they don't win on in-sample Sharpe ratio. That closes out chapter three. Next, lesson fourteen opens chapter four with walk-forward validation — the single most important topic in this course.
