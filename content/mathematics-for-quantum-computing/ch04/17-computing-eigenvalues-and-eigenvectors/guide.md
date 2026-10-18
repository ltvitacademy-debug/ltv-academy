# Computing Eigenvalues & Eigenvectors

Lesson 16 showed you how to *check* whether a given vector is an eigenvector. This lesson shows you how to *find* the eigenvalues and eigenvectors of a matrix from scratch, using the single most important gate matrix in quantum computing as the worked example — Pauli-Z.

## What you'll learn

- How to build the characteristic equation $\det(A - \lambda I) = 0$
- How to solve that equation for a $2\times 2$ matrix's eigenvalues
- How to solve for the matching eigenvector once you know an eigenvalue
- A full worked example using the Pauli-Z matrix, verified by direct multiplication
- Why Pauli-Z's eigenvectors turn out to be exactly $|0\rangle$ and $|1\rangle$

## Step 1: the characteristic equation

Rearrange $Av = \lambda v$ as $Av - \lambda v = 0$, then write $\lambda v$ as $\lambda I v$ (where $I$ is the identity matrix) so both terms are matrix-times-vector:

$$(A - \lambda I)v = 0$$

For a nonzero $v$ to solve this, $(A - \lambda I)$ must be a **singular** matrix — one that collapses some nonzero vector to zero. A matrix is singular exactly when its determinant is zero, which gives the **characteristic equation**:

$$\det(A - \lambda I) = 0$$

This is a polynomial in $\lambda$ (the **characteristic polynomial**); its roots are the eigenvalues of $A$.

## Step 2: solve it for the Pauli-Z matrix

The Pauli-Z matrix is

$$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

Subtract $\lambda I$:

$$Z - \lambda I = \begin{pmatrix} 1-\lambda & 0 \\ 0 & -1-\lambda \end{pmatrix}$$

For a $2\times 2$ matrix $\begin{pmatrix} a & b \\ c & d \end{pmatrix}$, the determinant is $ad - bc$:

$$\det(Z - \lambda I) = (1-\lambda)(-1-\lambda) - (0)(0) = (1-\lambda)(-1-\lambda)$$

Expanding: $(1-\lambda)(-1-\lambda) = -1 - \lambda + \lambda + \lambda^2 = \lambda^2 - 1$. Setting this to zero:

$$\lambda^2 - 1 = 0 \implies \lambda = 1 \text{ or } \lambda = -1$$

Pauli-Z has exactly two eigenvalues: $+1$ and $-1$.

## Step 3: solve for each eigenvector

**For $\lambda = 1$:** plug back into $(Z - \lambda I)v = 0$:

$$\begin{pmatrix} 1-1 & 0 \\ 0 & -1-1 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 & 0 \\ 0 & -2 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

The first row says $0 = 0$ (no constraint). The second row says $-2v_2 = 0$, so $v_2 = 0$. $v_1$ is free — pick $v_1 = 1$. Eigenvector: $v = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$.

**For $\lambda = -1$:**

$$\begin{pmatrix} 1-(-1) & 0 \\ 0 & -1-(-1) \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 2 & 0 \\ 0 & 0 \end{pmatrix}\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

The first row says $2v_1 = 0$, so $v_1 = 0$. $v_2$ is free — pick $v_2 = 1$. Eigenvector: $v = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

## Step 4: verify both, numerically

Don't skip this — plug each pair back into $Av = \lambda v$ directly:

$$Z\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} (1)(1)+(0)(0) \\ (0)(1)+(-1)(0) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = (+1)\begin{pmatrix} 1 \\ 0 \end{pmatrix} \checkmark$$

$$Z\begin{pmatrix} 0 \\ 1 \end{pmatrix} = \begin{pmatrix} (1)(0)+(0)(1) \\ (0)(0)+(-1)(1) \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \end{pmatrix} = (-1)\begin{pmatrix} 0 \\ 1 \end{pmatrix} \checkmark$$

Both check out exactly.

## Why this result is the headline of the whole chapter

$\begin{pmatrix} 1 \\ 0 \end{pmatrix}$ is exactly the qubit basis state $|0\rangle$, and $\begin{pmatrix} 0 \\ 1 \end{pmatrix}$ is exactly $|1\rangle$. So Pauli-Z's eigenvectors *are* the computational basis states, and its eigenvalues are $+1$ (for $|0\rangle$) and $-1$ (for $|1\rangle$). This isn't a coincidence engineered for the example — it's precisely why Pauli-Z is used to represent a measurement in the computational basis, and it's the concrete fact Lesson 19 builds the whole measurement story on.

## Common mistakes

- **Forgetting the $I$ in $A - \lambda I$.** $\lambda$ must be subtracted only from the diagonal entries, not from every entry of $A$.
- **Stopping after finding eigenvalues.** An eigenvalue alone isn't useful in quantum computing — you need the eigenvector it pairs with, found by solving $(A-\lambda I)v=0$ for that specific $\lambda$.
- **Skipping the final numeric check.** It costs one extra multiplication and it's the only way to catch an arithmetic slip from the earlier steps.

## Key terms

| Term | Meaning |
|---|---|
| Characteristic equation | $\det(A - \lambda I) = 0$; the equation whose roots are $A$'s eigenvalues |
| Characteristic polynomial | The polynomial in $\lambda$ produced by expanding $\det(A - \lambda I)$ |
| Singular matrix | A matrix with determinant zero; $(A - \lambda I)$ must be singular for a nonzero eigenvector to exist |
| Pauli-Z | The matrix $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$, with eigenvalues $\pm 1$ and eigenvectors $|0\rangle$, $|1\rangle$ |

## Check yourself

Set up and solve the characteristic equation for $A = \begin{pmatrix} 2 & 0 \\ 0 & 5 \end{pmatrix}$. What are its eigenvalues, and — without doing any further algebra — what must its eigenvectors be, given that $A$ is already diagonal?
