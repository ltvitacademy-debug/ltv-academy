# Script — Systems of Equations & Matrix Decompositions

## Segment 1 (title)

A system of linear equations is the same object as a matrix equation, A x equals b, and solving it shows up everywhere in quant finance: calibrating a model, computing hedge ratios, replicating a liability stream with bonds. This lesson covers how solving actually works, and the two decompositions that make it fast.

## Segment 2 (code)

Write the equations as rows of a matrix and a right-hand-side vector, and a unique solution exists exactly when that matrix is invertible. A bond immunization problem, finding holdings that replicate a target cash flow, is literally this equation.

## Segment 3 (steps)

Gaussian elimination solves it with row operations: swap rows, scale a row, add a multiple of one row to another, none of which change the solution. Keep going until you reach echelon form, with zeros below the diagonal, then solve from the bottom row upward.

## Segment 4 (code)

That elimination process is secretly a factorization, A equals L times U, a lower triangular and an upper triangular matrix. Once you have those, solving against a new right-hand side is just two cheap triangular solves instead of redoing elimination from scratch, which matters when you're repricing a book against many scenarios.

## Segment 5 (code)

When the matrix is symmetric and positive definite, there's an even cheaper factorization, Cholesky, writing A as L times L transpose. A covariance matrix is exactly this kind of object, which is why Cholesky is the standard tool for simulating correlated asset returns.

## Segment 6 (outro)

A linear system is a matrix equation solved by elimination, which factors into L and U for cheap repeat solves, and Cholesky gives an even faster path when the matrix is a covariance matrix. Up next, lesson eight: eigenvalues and eigenvectors, the decomposition that reveals a matrix's own natural directions.
