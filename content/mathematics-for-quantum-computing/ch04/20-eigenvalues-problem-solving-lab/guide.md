# Eigenvalues Problem-Solving Lab

No new theory in this lesson — just four fully worked problems that put Lessons 16–19's tools to work on fresh matrices, end to end: find the eigenvalues, find the eigenvectors, diagonalize, and verify every step numerically.

## What you'll learn

- How to run the full eigenvalue/eigenvector/diagonalization workflow on a matrix you haven't seen before
- How to apply the same workflow to the Pauli-X gate and connect it to the $|+\rangle$/$|-\rangle$ states
- How to catch your own arithmetic mistakes using the verification habits from Lessons 16–18
- Extra practice distinguishing a correctly-solved eigenvector from a plausible-looking wrong one

## Problem 1: find the eigenvalues and eigenvectors of $A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}$

**Characteristic equation.** $\det(A - \lambda I) = (4-\lambda)(3-\lambda) - (2)(1) = 0$. Expand: $(4-\lambda)(3-\lambda) = 12 - 7\lambda + \lambda^2$, so the equation is $\lambda^2 - 7\lambda + 12 - 2 = \lambda^2 - 7\lambda + 10 = 0$. Factor: $(\lambda - 5)(\lambda - 2) = 0$, so $\lambda = 5$ or $\lambda = 2$.

**Eigenvector for $\lambda=5$:** $(A - 5I) = \begin{pmatrix} -1 & 2 \\ 1 & -2 \end{pmatrix}$. Row 1: $-v_1 + 2v_2 = 0 \Rightarrow v_1 = 2v_2$. Pick $v_2=1$: $v = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.

**Eigenvector for $\lambda=2$:** $(A - 2I) = \begin{pmatrix} 2 & 2 \\ 1 & 1 \end{pmatrix}$. Row 1: $2v_1 + 2v_2 = 0 \Rightarrow v_1 = -v_2$. Pick $v_2=-1$: $v = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$.

**Verify both:**

$$A\begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} (4)(2)+(2)(1) \\ (1)(2)+(3)(1) \end{pmatrix} = \begin{pmatrix} 10 \\ 5 \end{pmatrix} = 5\begin{pmatrix} 2 \\ 1 \end{pmatrix} \checkmark$$

$$A\begin{pmatrix} 1 \\ -1 \end{pmatrix} = \begin{pmatrix} (4)(1)+(2)(-1) \\ (1)(1)+(3)(-1) \end{pmatrix} = \begin{pmatrix} 2 \\ -2 \end{pmatrix} = 2\begin{pmatrix} 1 \\ -1 \end{pmatrix} \checkmark$$

Both confirmed.

## Problem 2: diagonalize $A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}$

Using Problem 1's results:

$$P = \begin{pmatrix} 2 & 1 \\ 1 & -1 \end{pmatrix}, \qquad D = \begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix}$$

**Invert $P$:** $\det(P) = (2)(-1)-(1)(1) = -3$. So $P^{-1} = \frac{1}{-3}\begin{pmatrix} -1 & -1 \\ -1 & 2 \end{pmatrix} = \begin{pmatrix} 1/3 & 1/3 \\ 1/3 & -2/3 \end{pmatrix}$.

**Reconstruct and verify.** $PD = \begin{pmatrix} 2 & 1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} 5 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 10 & 2 \\ 5 & -2 \end{pmatrix}$. Then:

$$PDP^{-1} = \begin{pmatrix} 10 & 2 \\ 5 & -2 \end{pmatrix}\begin{pmatrix} 1/3 & 1/3 \\ 1/3 & -2/3 \end{pmatrix} = \begin{pmatrix} 10/3+2/3 & 10/3-4/3 \\ 5/3-2/3 & 5/3+4/3 \end{pmatrix} = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix} = A \checkmark$$

Exact reconstruction — the diagonalization is correct.

## Problem 3: find the eigenvalues and eigenvectors of the Pauli-X gate

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

**Characteristic equation:** $\det(X-\lambda I) = (-\lambda)(-\lambda) - (1)(1) = \lambda^2 - 1 = 0$, so $\lambda = 1$ or $\lambda = -1$ — same eigenvalues as Pauli-Z, but (as you're about to see) completely different eigenvectors.

**For $\lambda = 1$:** $(X - I) = \begin{pmatrix} -1 & 1 \\ 1 & -1 \end{pmatrix}$. Row 1: $-v_1+v_2=0 \Rightarrow v_1=v_2$. Pick $v=\begin{pmatrix}1\\1\end{pmatrix}$.

**For $\lambda = -1$:** $(X+I) = \begin{pmatrix} 1 & 1 \\ 1 & 1 \end{pmatrix}$. Row 1: $v_1+v_2=0 \Rightarrow v_1=-v_2$. Pick $v=\begin{pmatrix}1\\-1\end{pmatrix}$.

**Verify both:**

$$X\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}(0)(1)+(1)(1)\\(1)(1)+(0)(1)\end{pmatrix} = \begin{pmatrix}1\\1\end{pmatrix} = (+1)\begin{pmatrix}1\\1\end{pmatrix} \checkmark$$

$$X\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}(0)(1)+(1)(-1)\\(1)(1)+(0)(-1)\end{pmatrix} = \begin{pmatrix}-1\\1\end{pmatrix} = (-1)\begin{pmatrix}1\\-1\end{pmatrix} \checkmark$$

Both confirmed. These (un-normalized) eigenvectors $\begin{pmatrix}1\\1\end{pmatrix}$ and $\begin{pmatrix}1\\-1\end{pmatrix}$ are exactly proportional to the states $|+\rangle$ and $|-\rangle$ you'll meet when superposition states are named explicitly — Pauli-X's eigenvectors are the "diagonal" basis, in contrast to Pauli-Z's eigenvectors $|0\rangle$ and $|1\rangle$. Measuring Pauli-X on a qubit, by the same postulate from Lesson 19, can only return $+1$ or $-1$ and collapses the state to whichever of these two directions matches.

## Problem 4: diagonalize the Pauli-X gate

Using Problem 3's results:

$$P_X = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \qquad D_X = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

$\det(P_X) = (1)(-1)-(1)(1) = -2$, so $P_X^{-1} = \frac{1}{-2}\begin{pmatrix} -1 & -1 \\ -1 & 1 \end{pmatrix} = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix}$.

$P_X D_X = \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}$. Then:

$$P_X D_X P_X^{-1} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}\begin{pmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{pmatrix} = \begin{pmatrix} 1/2-1/2 & 1/2+1/2 \\ 1/2+1/2 & 1/2-1/2 \end{pmatrix} = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} = X \checkmark$$

Exact reconstruction again. Notice the pattern across all four problems: every single claimed eigenvalue, eigenvector, and diagonalization got checked by multiplying back out and comparing to the original — that habit, not the algebra itself, is what actually prevents wrong answers from quietly surviving into later work.

## Key terms

| Term | Meaning |
|---|---|
| Characteristic equation | $\det(A-\lambda I)=0$; solved first to get a matrix's eigenvalues |
| Eigenvector verification | Plugging a computed $(\lambda, v)$ pair back into $Av=\lambda v$ to confirm it's correct |
| Diagonalization verification | Multiplying $PDP^{-1}$ back out and confirming it equals the original matrix $A$ |
| Pauli-X | The matrix $\begin{pmatrix}0&1\\1&0\end{pmatrix}$, eigenvalues $\pm1$, eigenvectors proportional to $|+\rangle$ and $|-\rangle$ |

## Check yourself

Find the eigenvalues and eigenvectors of $B = \begin{pmatrix} 5 & 0 \\ 2 & 3 \end{pmatrix}$, then verify each pair by direct multiplication. (Hint: because $B$ is lower-triangular, you can read one of the eigenvalues straight off the diagonal before doing any algebra at all — then use the characteristic equation to confirm it and find the other.)
