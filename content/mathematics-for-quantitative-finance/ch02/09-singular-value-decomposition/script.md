# Script — Singular Value Decomposition

## Segment 1 (title)

Eigenvalues and eigenvectors only exist for square matrices, but real data rarely comes square, a returns dataset might have a thousand trading days and fifty assets. The singular value decomposition generalizes the eigen idea to any matrix at all, and it underlies PCA, compression, and regression.

## Segment 2 (code)

Any matrix factors into U, sigma, V transpose, where U and V are orthogonal and sigma is diagonal with non-negative entries called singular values. Unlike eigendecomposition, this always exists, no matter the shape of the matrix.

## Segment 3 (steps)

Here's the connection: A transpose A is always symmetric, no matter what A looks like. The columns of V turn out to be exactly the eigenvectors of that matrix, and the singular values are the square roots of its eigenvalues. That's why singular values are always real and never negative.

## Segment 4 (code)

Run this on a tiny matrix of centered daily returns for two assets and you get two singular values, and multiplying U, sigma, and V transpose back together reconstructs the original matrix exactly. The first right singular vector is the direction carrying the most variance across those days.

## Segment 5 (code)

Keep only the largest singular value and its vectors, and you get the best possible rank-one approximation of the original matrix, a result called the Eckart-Young theorem. In this example that one term already captures most of the structure, since the first singular value is nearly three times the second.

## Segment 6 (outro)

The SVD factors any matrix using orthogonal directions and non-negative singular values that come straight from the eigenvalues of A transpose A. Up next, lesson ten: covariance matrices and principal components, turning this decomposition directly into PCA on asset returns.
