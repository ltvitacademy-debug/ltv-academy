# What Eigenvalues & Eigenvectors Actually Mean

Every matrix you've multiplied so far has rotated, stretched, or sheared vectors into new directions. This lesson introduces the special vectors that a matrix does *not* turn — it only stretches or shrinks them — and that single idea turns out to be the mathematical backbone of what a quantum measurement actually is.

## What you'll learn

- The core equation $Av = \lambda v$ and what it says in plain English
- The difference between an eigenvector (only scaled) and a regular vector (rotated and scaled)
- How to verify, by direct multiplication, whether a given vector is an eigenvector of a matrix
- Why eigenvectors define special directions that are built into a matrix itself
- Why this will turn out to matter for quantum measurement (previewed here, built out in Lesson 19)

## The core idea: a vector that only gets scaled

For almost any vector $v$ and matrix $A$, the product $Av$ points in a *different* direction than $v$ — the matrix rotates it as well as scaling it. An **eigenvector** is the exception: a nonzero vector $v$ such that

$$Av = \lambda v$$

for some scalar $\lambda$ (lambda), called the **eigenvalue**. Multiplying $v$ by the matrix $A$ gives back the *same vector*, just scaled by $\lambda$ — same direction (or exactly reversed, if $\lambda$ is negative), no rotation. $\lambda$ can be any real or complex number, including zero.

That's the whole idea. A matrix acting on an eigenvector behaves like a single number acting on it. The hard part most people stumble on is believing this is special — most vectors do *not* behave this way, as the next section shows directly.

## A worked example: one eigenvector, one impostor

Take the matrix

$$A = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$$

**Candidate 1:** $v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$

$$Av = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} (3)(1)+(1)(0) \\ (0)(1)+(2)(0) \end{pmatrix} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}$$

Compare that to $v$ itself: $\begin{pmatrix} 3 \\ 0 \end{pmatrix} = 3\begin{pmatrix} 1 \\ 0 \end{pmatrix} = 3v$. The output is exactly $v$ scaled by 3, with no rotation — $v$ is an eigenvector of $A$ with eigenvalue $\lambda = 3$.

**Candidate 2:** $v = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$

$$Av = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} (3)(1)+(1)(1) \\ (0)(1)+(2)(1) \end{pmatrix} = \begin{pmatrix} 4 \\ 2 \end{pmatrix}$$

Is $\begin{pmatrix} 4 \\ 2 \end{pmatrix}$ some scalar times $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$? If it were, both entries would need the *same* scaling factor: $4/1 = 4$ but $2/1 = 2$ — two different ratios. There is no single $\lambda$ that works, so $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ is **not** an eigenvector of $A$. Geometrically, $A$ rotated this vector into a new direction as well as changing its length — exactly what an eigenvector is defined to avoid.

Side by side: $(1,0)$ came back as $(3,0)$ — same direction, just longer. $(1,1)$ came back as $(4,2)$ — a genuinely different direction (its slope changed from $1$ to $1/2$). That contrast *is* the definition of an eigenvector, made concrete.

## Why "only scaled, never rotated" is worth caring about

A matrix generally has only a handful of these special directions (for an $n \times n$ matrix, at most $n$ of them, counting repeats). Along those directions, and only those directions, the matrix's complicated action collapses down to "multiply by a single number." That number — the eigenvalue — is a property of the matrix itself, not of any particular vector you chose; it falls out of the matrix's own structure (Lesson 17 shows exactly how to find it). In quantum computing, the operators that represent measurable physical quantities have their own special set of these directions, and the eigenvalues attached to them are *literally* the only numbers a measurement can ever return — there is no quantum magic in that fact, just this same linear-algebra idea applied to the matrices quantum mechanics happens to use.

## Common mistakes

- **Checking only one entry of the ratio.** $(4,2)$ "looks kind of like" $(1,1)$ scaled if you only glance at it — always check that *every* entry scales by the *same* $\lambda$.
- **Forgetting the eigenvector must be nonzero.** The zero vector trivially satisfies $A\mathbf{0} = \lambda\mathbf{0}$ for any $\lambda$, but it's excluded by definition — it carries no direction information.
- **Assuming eigenvalues are always positive or real.** $\lambda$ can be negative (direction reversed), zero, or even complex; nothing in the definition $Av = \lambda v$ restricts it.

## Key terms

| Term | Meaning |
|---|---|
| Eigenvector | A nonzero vector $v$ that a matrix $A$ only scales, never rotates: $Av = \lambda v$ |
| Eigenvalue | The scalar $\lambda$ by which $A$ scales its eigenvector $v$ |
| $Av = \lambda v$ | The defining equation of an eigenvector/eigenvalue pair |
| Scaled vs. rotated | An eigenvector keeps its direction (or flips exactly 180°) under $A$; any other vector generally changes direction too |

## Check yourself

Using $A = \begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix}$ from this lesson, is $v = \begin{pmatrix} 2 \\ -2 \end{pmatrix}$ an eigenvector of $A$? Compute $Av$ directly and compare it to $v$ to decide — and if it is one, state its eigenvalue.
