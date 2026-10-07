# Script — Vectors, Matrices & Linear Maps

## Segment 1 (title)

Chapter one built the calculus of change. Chapter two builds the algebra of structure: vectors to represent portfolios and risk factors, matrices to represent the linear relationships between them. Nearly everything coming up, covariance, PCA, regression, is linear algebra wearing a finance costume.

## Segment 2 (steps)

A vector is just an ordered list of numbers. You add two vectors entry by entry, you scale a vector by multiplying every entry by the same number, and the dot product multiplies entries together and adds up the results into a single number, which is exactly how you'd compute a portfolio's return from weights and asset returns.

## Segment 3 (code)

The key idea to internalize about a matrix is that it's a function on vectors. Multiplying a matrix by a vector produces a new vector, computed row by row as a dot product between that row and the input vector.

## Segment 4 (steps)

Multiplying two matrices together composes two of those functions into one. The inner dimensions have to match, and each entry of the result is a dot product of a row from the first matrix and a column from the second. One thing that trips people up: matrix multiplication is not commutative, so order matters.

## Segment 5 (code)

Here's why this isn't abstract. A factor model says asset returns equal a loading matrix times factor returns. Multiply that loading matrix by the day's factor moves and you get every asset's return, then a dot product with portfolio weights gives the whole portfolio's return in two lines of code.

## Segment 6 (outro)

A vector is a list with componentwise algebra, and a matrix is a linear map you apply with matrix-vector multiplication or compose with matrix-matrix multiplication. Up next, lesson seven: systems of equations and matrix decompositions, where we actually solve for unknowns.
