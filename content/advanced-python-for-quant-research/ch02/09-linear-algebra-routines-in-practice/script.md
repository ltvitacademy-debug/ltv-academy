# Script — Linear Algebra Routines in Practice

## Segment 1 (title)

Portfolio construction, risk decomposition, and PCA all reduce to a handful of linear algebra operations: solving A x equals b, decomposing a matrix into eigenvalues and eigenvectors, and the singular value decomposition that generalizes that to non-square matrices. This lesson works through each with a quant portfolio example, plus matrix conditioning.

## Segment 2 (code)

Given A x equals b, it's tempting to compute A's inverse and multiply. Don't. solve is both faster and more numerically stable, because computing an explicit inverse does unnecessary extra work and amplifies rounding error along the way — same mathematical answer, meaningfully more error on larger systems.

## Segment 3 (code)

A covariance matrix is square and symmetric, which guarantees real eigenvalues and orthogonal eigenvectors. eigh, specialized for symmetric matrices, decomposes it into eigenvalues and eigenvectors — the eigenvector for the largest eigenvalue is your dominant direction of uncorrelated risk. Use eigh instead of the general eig whenever you know the matrix is symmetric; it's faster and more reliable.

## Segment 4 (code)

The singular value decomposition generalizes eigendecomposition to any matrix, square or not. For a mean-centered data matrix, the right singular vectors are exactly the principal component directions, and running PCA this way — SVD on the data directly — is more numerically stable than first forming the covariance matrix and eigendecomposing that.

## Segment 5 (code)

A matrix's condition number measures how much it amplifies a small input error when solving a system. Near one is well-conditioned; a huge condition number means the system is sensitive to tiny perturbations, including ordinary floating-point rounding error. A near-singular covariance matrix — common with correlated assets — is exactly this situation, and a large condition number is a signal to regularize rather than trust the raw solve.

## Segment 6 (outro)

Solve instead of inverting, use eigh for symmetric covariance matrices, and SVD on centered data is the stable path to PCA. Next up, lesson ten: numerical integration and root-finding, with bond yield-to-maturity and implied volatility as the running examples.
