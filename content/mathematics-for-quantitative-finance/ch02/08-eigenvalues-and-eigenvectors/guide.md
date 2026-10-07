# Eigenvalues & Eigenvectors

Most directions a matrix transforms get rotated and stretched in some mixed-up way. A matrix's **eigenvectors** are the special directions it merely stretches, without rotating — and the **eigenvalue** is exactly how much. This single idea underlies principal component analysis, the stability of dynamic systems, and the risk decomposition of a covariance matrix, all of which this course builds toward.

## What you'll learn

- The eigenvalue equation $A\mathbf{v} = \lambda\mathbf{v}$, and what it means geometrically
- How to find eigenvalues from the characteristic polynomial $\det(A-\lambda I)=0$, and eigenvectors from the resulting null space
- Why a real symmetric matrix (like a covariance matrix) always has real eigenvalues and orthogonal eigenvectors
- How to compute eigenvalues and eigenvectors in NumPy, and verify the eigenvalue equation numerically

## The eigenvalue equation

For a square matrix $A$, a nonzero vector $\mathbf{v}$ is an **eigenvector** with **eigenvalue** $\lambda$ if:

$$A\mathbf{v} = \lambda \mathbf{v}$$

Applying $A$ to $\mathbf{v}$ produces a vector pointing in the *same* (or exactly opposite, if $\lambda<0$) direction as $\mathbf{v}$ — just scaled by $\lambda$. Every other vector not aligned with an eigenvector gets rotated as well as scaled when you apply $A$; eigenvectors are the directions where that rotation vanishes.

## Finding eigenvalues: the characteristic polynomial

Rewriting the eigenvalue equation as $(A - \lambda I)\mathbf{v} = \mathbf{0}$, a nonzero solution $\mathbf{v}$ exists only when $A-\lambda I$ is **singular** (non-invertible), i.e.

$$\det(A - \lambda I) = 0$$

This is the **characteristic equation**; it is a degree-$n$ polynomial in $\lambda$ (the characteristic polynomial) for an $n\times n$ matrix, so an $n\times n$ matrix has exactly $n$ eigenvalues (counted with multiplicity, possibly complex).

**Worked example.** Let $A = \begin{pmatrix}2 & 1\\1 & 2\end{pmatrix}$. Then:

$$\det(A-\lambda I) = \det\begin{pmatrix}2-\lambda & 1\\1 & 2-\lambda\end{pmatrix} = (2-\lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda-1)(\lambda-3)$$

So $\lambda_1 = 1$, $\lambda_2 = 3$. For $\lambda_2=3$: solve $(A-3I)\mathbf{v}=\mathbf{0}$, i.e. $\begin{pmatrix}-1&1\\1&-1\end{pmatrix}\mathbf{v}=\mathbf{0}$, giving $v_1=v_2$, so $\mathbf{v}_2 \propto (1,1)$. For $\lambda_1=1$: $\begin{pmatrix}1&1\\1&1\end{pmatrix}\mathbf{v}=\mathbf{0}$ gives $v_1=-v_2$, so $\mathbf{v}_1 \propto (1,-1)$. Normalizing: $\mathbf{v}_2 = \frac{1}{\sqrt{2}}(1,1)$, $\mathbf{v}_1 = \frac{1}{\sqrt{2}}(-1,1)$ (sign/orientation is arbitrary — any nonzero scalar multiple is still an eigenvector).

## Symmetric matrices: the case that matters most in finance

When $A$ is **real and symmetric** ($A=A^T$) — exactly the case for a covariance matrix — two powerful facts hold:

1. **All eigenvalues are real** (never complex), and for a covariance matrix they are additionally never negative (positive semi-definite).
2. **Eigenvectors for distinct eigenvalues are orthogonal**, and $A$ can be fully diagonalized as $A = Q\Lambda Q^T$ with $Q$ an orthogonal matrix of eigenvectors and $\Lambda$ a diagonal matrix of eigenvalues.

This **spectral decomposition** is the engine behind Principal Component Analysis (Lesson 10): the eigenvectors of a covariance matrix are the orthogonal directions of independent risk, and the eigenvalues are how much variance sits along each one.

## Eigenvalues and stability

If $\mathbf{x}_{t+1} = A\mathbf{x}_t$ describes some discrete-time linear dynamic (a simplified autoregressive risk-factor model, for instance), the system is **stable** (converges to zero rather than exploding) exactly when every eigenvalue of $A$ has magnitude $|\lambda| < 1$. This is why eigenvalues show up not just in PCA but in diagnosing whether a model's dynamics are well-behaved.

## Computing eigenvalues and eigenvectors in NumPy

```python
import numpy as np

A = np.array([[2.0, 1.0], [1.0, 2.0]])
eigenvalues, eigenvectors = np.linalg.eig(A)

print("eigenvalues:", eigenvalues)
# eigenvalues: [3. 1.]

print("eigenvectors (columns):\n", eigenvectors)
# [[ 0.70710678 -0.70710678]
#  [ 0.70710678  0.70710678]]

# Verify A @ v = lambda * v for the first eigenvector/eigenvalue pair
v0, lam0 = eigenvectors[:, 0], eigenvalues[0]
print(np.allclose(A @ v0, lam0 * v0))   # True
```

NumPy returns eigenvalues in no guaranteed order and eigenvectors as the *columns* of the returned matrix — always check `A @ eigenvectors[:, i]` against `eigenvalues[i] * eigenvectors[:, i]` when in doubt, exactly as the verification line above does.

## Key terms

| Term | Meaning |
|---|---|
| Eigenvector | A nonzero vector $\mathbf{v}$ with $A\mathbf{v}=\lambda\mathbf{v}$: a direction $A$ only scales |
| Eigenvalue | The scale factor $\lambda$ for a given eigenvector |
| Characteristic polynomial | $\det(A-\lambda I)$, whose roots are the eigenvalues |
| Spectral decomposition | $A=Q\Lambda Q^T$ for a symmetric $A$, with orthogonal eigenvectors |
| Stability | For $\mathbf{x}_{t+1}=A\mathbf{x}_t$, stable iff every $|\lambda|<1$ |

## Recap

An eigenvector is a direction a matrix only stretches, never rotates, and its eigenvalue is exactly that stretch factor; eigenvalues come from the roots of the characteristic polynomial $\det(A-\lambda I)=0$. Symmetric matrices — covariance matrices chief among them — always have real eigenvalues and orthogonal eigenvectors, which is exactly the structure Principal Component Analysis exploits. Next up, Lesson 9: Singular Value Decomposition, the generalization of this idea to matrices that aren't square at all.
