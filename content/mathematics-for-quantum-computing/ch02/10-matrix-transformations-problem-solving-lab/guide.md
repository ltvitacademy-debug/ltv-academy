# Matrix Transformations Problem-Solving Lab

No new theory in this lesson — just four fully worked problems that put Lessons 6 through 9 to work on fresh numbers. Work through each one with pencil and paper before reading the solution; the goal is for matrix multiplication, inverses, determinants, and diagonal/identity shortcuts to stop feeling like separate topics and start feeling like one connected toolkit.

## What you'll learn

- How to apply the non-commutativity check from Lesson 6 to a new pair of matrices
- How to find a determinant and inverse from scratch and verify the result
- How to apply the Pauli-Z gate to two different qubit states and interpret what happens
- How a diagonal matrix acts on a vector using the row-scaling shortcut

## Problem 1: does order matter here too?

Given

$$P = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}, \quad Q = \begin{pmatrix} 1 & 0 \\ 3 & 1 \end{pmatrix}$$

compute $PQ$ and $QP$, and compare them.

**Solution.** For $PQ$: top-left $= (1)(1)+(2)(3) = 7$; top-right $= (1)(0)+(2)(1) = 2$; bottom-left $= (0)(1)+(1)(3) = 3$; bottom-right $= (0)(0)+(1)(1) = 1$.

$$PQ = \begin{pmatrix} 7 & 2 \\ 3 & 1 \end{pmatrix}$$

For $QP$: top-left $= (1)(1)+(0)(0) = 1$; top-right $= (1)(2)+(0)(1) = 2$; bottom-left $= (3)(1)+(1)(0) = 3$; bottom-right $= (3)(2)+(1)(1) = 7$.

$$QP = \begin{pmatrix} 1 & 2 \\ 3 & 7 \end{pmatrix}$$

$PQ \ne QP$ — once again, confirming Lesson 6's central lesson: if $P$ and $Q$ were two gates in a circuit, applying them in opposite orders would physically produce different results.

## Problem 2: find the inverse and verify it

Given

$$N = \begin{pmatrix} 3 & 2 \\ 1 & 4 \end{pmatrix}$$

find $N^{-1}$ and verify $NN^{-1} = I$.

**Solution.** First, the determinant: $\det(N) = (3)(4) - (2)(1) = 12 - 2 = 10$. Nonzero, so $N$ is invertible.

Applying the inverse formula — swap the diagonal, negate the off-diagonal, divide by $\det(N) = 10$:

$$N^{-1} = \frac{1}{10}\begin{pmatrix} 4 & -2 \\ -1 & 3 \end{pmatrix} = \begin{pmatrix} 0.4 & -0.2 \\ -0.1 & 0.3 \end{pmatrix}$$

Verify by multiplying: top-left $= (3)(0.4) + (2)(-0.1) = 1.2 - 0.2 = 1$. Top-right $= (3)(-0.2) + (2)(0.3) = -0.6 + 0.6 = 0$. Bottom-left $= (1)(0.4) + (4)(-0.1) = 0.4 - 0.4 = 0$. Bottom-right $= (1)(-0.2) + (4)(0.3) = -0.2 + 1.2 = 1$.

$$NN^{-1} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I$$

Exactly as the inverse is supposed to do, confirmed by real multiplication rather than assumed.

## Problem 3: the Pauli-Z gate on two different states

The **Pauli-Z matrix** is

$$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

Apply it to $|1\rangle = \begin{pmatrix}0\\1\end{pmatrix}$, and then to $|0\rangle = \begin{pmatrix}1\\0\end{pmatrix}$.

**Solution.** $Z|1\rangle$: top entry $= (1)(0)+(0)(1) = 0$; bottom entry $= (0)(0)+(-1)(1) = -1$.

$$Z|1\rangle = \begin{pmatrix} 0 \\ -1 \end{pmatrix} = -|1\rangle$$

$Z|0\rangle$: top entry $= (1)(1)+(0)(0) = 1$; bottom entry $= (0)(1)+(-1)(0) = 0$.

$$Z|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = |0\rangle$$

Two very different outcomes from the same matrix: $|0\rangle$ passes through completely unchanged, while $|1\rangle$ comes out flipped in sign to $-|1\rangle$. Z doesn't swap basis states the way X did in Lesson 7 — instead it leaves $|0\rangle$ alone and attaches a $-1$ to $|1\rangle$. (This is why $Z$ is called a "phase flip" gate rather than a bit flip: the *location* of the 1 in the vector never moves, only its sign does. $|0\rangle$ and $|1\rangle$ are, in fact, Z's eigenvectors — a concept this course returns to directly in a later chapter.)

## Problem 4: a diagonal matrix on a vector, by shortcut

Given $D = \begin{pmatrix} 5 & 0 \\ 0 & -1 \end{pmatrix}$ and $v = \begin{pmatrix}2\\3\end{pmatrix}$, find $Dv$ using the diagonal shortcut from Lesson 9 — no dot products needed.

**Solution.** Each entry of $v$ just gets scaled by the matching diagonal entry of $D$: the first entry of $v$ (which is 2) scales by $D$'s first diagonal entry (5), giving $10$; the second entry of $v$ (which is 3) scales by $D$'s second diagonal entry ($-1$), giving $-3$.

$$Dv = \begin{pmatrix} 10 \\ -3 \end{pmatrix}$$

Check it the slow way if you want certainty: top entry $= (5)(2)+(0)(3) = 10$; bottom entry $= (0)(2)+(-1)(3) = -3$. Same answer — the shortcut is just a faster route to the identical row-times-column result.

## Key terms

| Term | Meaning |
|---|---|
| Pauli-Z gate | The matrix $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$; leaves $\lvert 0\rangle$ unchanged and flips the sign of $\lvert 1\rangle$ (a phase flip, not a bit flip) |
| Phase flip | A transformation that changes the sign (phase) of a state without moving which basis state it corresponds to |
| Verification by multiplication | Confirming a claimed inverse, product, or transformation result by carrying out the actual row-times-column arithmetic, rather than assuming it |

## Check yourself

Problem 1 showed $PQ \ne QP$ for $P = \begin{pmatrix}1&2\\0&1\end{pmatrix}$ and $Q = \begin{pmatrix}1&0\\3&1\end{pmatrix}$, and Problem 3 showed $Z|0\rangle = |0\rangle$ while $Z|1\rangle = -|1\rangle$. Pick one of these two results and explain, using the actual numbers from the worked solution, what would go wrong physically if someone assumed the opposite were true.
