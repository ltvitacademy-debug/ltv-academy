# Script — Eigenvalues & Eigenvectors

## Segment 1 (title)

Most directions a matrix transforms get rotated and stretched in some mixed-up way. A matrix's eigenvectors are the special directions it merely stretches, without rotating, and the eigenvalue is exactly how much. This single idea underlies principal component analysis and the risk decomposition of a covariance matrix.

## Segment 2 (code)

The eigenvalue equation says applying the matrix to an eigenvector just scales it by the eigenvalue, lambda. The direction doesn't change. Every other vector, one that isn't an eigenvector, also gets rotated when you apply the matrix. Eigenvectors are the directions where that rotation disappears.

## Segment 3 (steps)

You find eigenvalues from the characteristic equation, the determinant of A minus lambda times the identity set to zero. For an n by n matrix that's a degree n polynomial, so it has n roots, the eigenvalues. Plug each one back in and solve for the eigenvector that goes with it.

## Segment 4 (code)

Work through a simple two by two example and the characteristic polynomial factors into lambda minus one, times lambda minus three. The eigenvectors that come out, one proportional to one, negative one, and the other to one, one, turn out to be perpendicular to each other.

## Segment 5 (steps)

That's not a coincidence, it's because the matrix is symmetric. Symmetric matrices always have real eigenvalues and orthogonal eigenvectors, and a covariance matrix is always symmetric. That orthogonal structure is exactly what principal component analysis exploits.

## Segment 6 (outro)

An eigenvector is a direction a matrix only scales, and its eigenvalue is the scale factor, found as a root of the characteristic polynomial. Up next, lesson nine: singular value decomposition, the same idea generalized to matrices that aren't even square.
