# Matrix Inverses & Determinants

Every quantum gate must be reversible — if you know the output state, you must be able to recover the input state, because quantum evolution (outside of measurement) never destroys information. The mathematical machinery behind "can I undo this transformation?" is the matrix inverse, and whether an inverse exists at all is answered by a single number: the determinant. This lesson builds both from scratch with real numbers.

## What you'll learn

- The determinant formula for a 2x2 matrix, and what the number tells you
- The 2x2 inverse formula, derived from the determinant
- A full worked example: computing a determinant and an inverse, then verifying $AA^{-1} = I$ by actual multiplication
- Why a matrix with determinant zero has no inverse
- Why every quantum gate matrix must be invertible — the mathematical face of reversibility

## The determinant of a 2x2 matrix

For a general 2x2 matrix

$$A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$$

the determinant is defined as

$$\det(A) = ad - bc$$

It's a single number computed from the matrix's four entries. Geometrically, $|\det(A)|$ is the factor by which $A$ scales area when it transforms the plane; its sign tells you whether the transformation flips orientation. For our purposes, the critical fact is simpler: **$A$ has an inverse if and only if $\det(A) \ne 0$.**

## The 2x2 inverse formula

When $\det(A) \ne 0$, the inverse of $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ is

$$A^{-1} = \frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$$

Notice the pattern: swap $a$ and $d$, negate $b$ and $c$, then divide every entry by the determinant.

## Worked example

Take

$$A = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$$

**Step 1: the determinant.**

$$\det(A) = (2)(1) - (1)(1) = 2 - 1 = 1$$

Since $\det(A) = 1 \ne 0$, $A$ is invertible.

**Step 2: the inverse.** Swap the diagonal entries, negate the off-diagonal entries, divide by $\det(A) = 1$:

$$A^{-1} = \frac{1}{1}\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$$

**Step 3: verify by multiplying $AA^{-1}$.**

$$AA^{-1} = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$$

Top-left: $(2)(1) + (1)(-1) = 2 - 1 = 1$.
Top-right: $(2)(-1) + (1)(2) = -2 + 2 = 0$.
Bottom-left: $(1)(1) + (1)(-1) = 1 - 1 = 0$.
Bottom-right: $(1)(-1) + (1)(2) = -1 + 2 = 1$.

$$AA^{-1} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I$$

Multiplying in the other order, $A^{-1}A$, gives the same identity matrix — for square matrices with an inverse, it works both ways. The computation confirms exactly what the inverse is supposed to do: undo $A$'s transformation completely, landing back at the identity.

## Why determinant zero means no inverse

If $\det(A) = ad - bc = 0$, the inverse formula would require dividing by zero — undefined. Geometrically, a determinant of zero means $A$ collapses the plane onto a line (or a point), squashing area to nothing. Once two different input vectors get squashed to the exact same output, there is no way to reverse the process and recover which input you started from — the information is genuinely gone, not just hard to compute. That's the algebraic fact behind "no inverse exists."

## Why this matters for quantum gates

Quantum computation (apart from measurement) is **reversible**: no information is ever thrown away, which means every gate matrix must have an inverse — equivalently, every gate's determinant must be nonzero. In fact, physical quantum gates satisfy an even stronger condition than merely being invertible (they're unitary, a topic later in this course), but invertibility is the baseline requirement you now have the tools to check: given any candidate gate matrix, compute its determinant, and if it's zero, that matrix cannot represent a physically valid quantum gate, because there would be no way to undo it.

## Common mistakes

- **Reversing the sign pattern.** It's $\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ — negate the off-diagonal entries, not the diagonal ones.
- **Forgetting to divide by the determinant.** The swapped/negated matrix alone is not the inverse; it must be scaled by $1/\det(A)$.
- **Trying to invert a matrix with determinant zero.** Always compute the determinant first — if it's zero, stop, the inverse doesn't exist.

## Key terms

| Term | Meaning |
|---|---|
| Determinant | For $\begin{pmatrix}a&b\\c&d\end{pmatrix}$, the number $ad-bc$; nonzero exactly when the matrix is invertible |
| Inverse matrix ($A^{-1}$) | The matrix such that $AA^{-1} = A^{-1}A = I$; it exactly undoes $A$'s transformation |
| Invertible | A matrix that has an inverse, equivalent to having a nonzero determinant |
| Reversibility | The physical requirement that quantum computation never destroys information, which is why every valid quantum gate matrix must be invertible |

## Check yourself

For $A = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$, this lesson found $\det(A) = 1$ and $A^{-1} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$. Explain, in terms of reversibility, why a matrix with determinant zero could never be used to represent a quantum gate — connect the "can't divide by zero" algebra to the "information is lost" physical picture.
