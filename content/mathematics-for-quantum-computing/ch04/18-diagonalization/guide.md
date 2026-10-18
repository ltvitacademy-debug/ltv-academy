# Diagonalization

You now know how to find a matrix's eigenvalues and eigenvectors. Diagonalization is where that effort pays off: it repackages a matrix into a form — $A = PDP^{-1}$ — where $D$ is diagonal and all the complexity of $A$ is pushed into two simple building blocks: a matrix of eigenvectors and a diagonal matrix of eigenvalues.

## What you'll learn

- What the factorization $A = PDP^{-1}$ means and what $P$ and $D$ actually contain
- How to build $P$ and $D$ directly from a matrix's eigenvectors and eigenvalues
- How to compute $P^{-1}$ for a $2\times 2$ matrix
- A full worked example, verified by multiplying $PDP^{-1}$ back out and confirming it reconstructs $A$
- Why this factorization is exactly what lets you compute "powers" of a quantum operation cheaply

## The idea: separate the eigenvectors from the eigenvalues

If an $n\times n$ matrix $A$ has $n$ independent eigenvectors, you can build:

- $P$ — a matrix whose **columns are the eigenvectors** of $A$
- $D$ — a **diagonal** matrix whose diagonal entries are the matching eigenvalues, in the same column order as $P$

and it will always be true that

$$A = PDP^{-1}$$

Why this works, intuitively: $P^{-1}$ first converts an ordinary vector into "eigenvector coordinates." $D$ then does the easy part — multiplying each eigenvector-coordinate by its own eigenvalue, since in that coordinate system the matrix's action really is just scaling (that's the whole point of Lesson 16). $P$ then converts back to ordinary coordinates. Three simple steps that, combined, do exactly what $A$ does directly.

## Worked example: diagonalizing $A = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$

Lesson 16 and 17's methods already found this matrix's eigenvalues and eigenvectors:

- $\lambda_1 = 3$, eigenvector $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$
- $\lambda_2 = 2$, eigenvector $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$

**Build $P$** (eigenvectors as columns, in the chosen order) and $D$ (matching eigenvalues on the diagonal, same order):

$$P = \begin{pmatrix} 1 & 1 \\ 0 & -1 \end{pmatrix}, \qquad D = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}$$

**Compute $P^{-1}$.** For a $2\times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the inverse is $\frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$. Here $a=1, b=1, c=0, d=-1$, so $ad - bc = (1)(-1) - (1)(0) = -1$:

$$P^{-1} = \frac{1}{-1}\begin{pmatrix} -1 & -1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 0 & -1 \end{pmatrix}$$

(It happens that $P^{-1} = P$ for this particular matrix — not a general rule, just how this example worked out.)

**Multiply it back out to verify.** First $PD$:

$$PD = \begin{pmatrix} 1 & 1 \\ 0 & -1 \end{pmatrix}\begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} (1)(3)+(1)(0) & (1)(0)+(1)(2) \\ (0)(3)+(-1)(0) & (0)(0)+(-1)(2) \end{pmatrix} = \begin{pmatrix} 3 & 2 \\ 0 & -2 \end{pmatrix}$$

Then $(PD)P^{-1}$:

$$\begin{pmatrix} 3 & 2 \\ 0 & -2 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} (3)(1)+(2)(0) & (3)(1)+(2)(-1) \\ (0)(1)+(-2)(0) & (0)(1)+(-2)(-1) \end{pmatrix} = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$$

$$PDP^{-1} = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} = A \checkmark$$

It reconstructs $A$ exactly. The factorization checks out.

## Why bother: powers become cheap

One of diagonalization's biggest payoffs is computing $A^k$ for some large power $k$. Multiplying $A$ by itself 50 times directly is 49 matrix multiplications. But $A^k = PDP^{-1}PDP^{-1}\cdots = PD^kP^{-1}$ — every middle $P^{-1}P$ pair cancels to the identity, leaving only $P$, $D^k$, and $P^{-1}$. And $D^k$ is trivial: just raise each diagonal entry to the $k$-th power, since a diagonal matrix's powers are entry-wise. This exact pattern — repeated application of an operation becoming cheap once diagonalized — is why diagonalization matters for analyzing what happens when a quantum operation is applied repeatedly.

## Common mistakes

- **Mismatching the column order between $P$ and $D$.** The eigenvalue in $D$'s first diagonal slot must correspond to the eigenvector in $P$'s first column — swap one without the other and the factorization breaks.
- **Assuming every matrix is diagonalizable.** This requires $n$ *independent* eigenvectors for an $n\times n$ matrix. A matrix with a repeated eigenvalue but not enough independent eigenvectors to go with it cannot be diagonalized this way.
- **Skipping the reconstruction check.** Always multiply $PDP^{-1}$ back out, as above — it's the only way to catch a sign error in $P^{-1}$ or a transcription slip in $D$.

## Key terms

| Term | Meaning |
|---|---|
| Diagonalization | Factoring a matrix as $A = PDP^{-1}$, where $D$ is diagonal |
| $P$ | The matrix whose columns are $A$'s eigenvectors |
| $D$ | The diagonal matrix of $A$'s eigenvalues, ordered to match $P$'s columns |
| $P^{-1}$ | The inverse of $P$; converts back from "eigenvector coordinates" to ordinary coordinates |
| Diagonalizable | A matrix that has enough independent eigenvectors to be written as $PDP^{-1}$ |

## Check yourself

Using the $P$, $D$, and $P^{-1}$ from this lesson's worked example, what is $D^2$, and what would you expect $PD^2P^{-1}$ to equal without multiplying it out? (Hint: think about what $A^2$ should be.)
