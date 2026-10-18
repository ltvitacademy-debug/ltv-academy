# Matrix Operations

Chapter 1 gave you vectors — columns of numbers representing quantum states. A matrix is the object that *acts on* those vectors, and in quantum computing every gate you will ever apply is a matrix. Before you can understand what a gate does, you need to be fluent with the three basic operations on matrices themselves: addition, scalar multiplication, and — the one that will matter most — matrix multiplication.

## What you'll learn

- How to add matrices and multiply a matrix by a scalar
- How matrix multiplication actually works, step by step, on real numbers
- Why matrix multiplication is **not commutative** — and why that single fact is the reason gate order matters in a quantum circuit
- How a matrix multiplies a column vector to produce a new vector
- Common indexing mistakes that break multiplication

## Adding matrices and scalar multiplication

Matrix addition and scalar multiplication work entry-by-entry, exactly like with vectors. Take

$$A = \begin{pmatrix} 2 & 3 \\ 1 & -1 \end{pmatrix}, \quad B = \begin{pmatrix} 1 & 0 \\ 4 & 2 \end{pmatrix}$$

To add them, add corresponding entries:

$$A + B = \begin{pmatrix} 2+1 & 3+0 \\ 1+4 & -1+2 \end{pmatrix} = \begin{pmatrix} 3 & 3 \\ 5 & 1 \end{pmatrix}$$

To scale a matrix, multiply every entry by the scalar. For $3A$:

$$3A = \begin{pmatrix} 3\cdot 2 & 3\cdot 3 \\ 3\cdot 1 & 3\cdot(-1) \end{pmatrix} = \begin{pmatrix} 6 & 9 \\ 3 & -3 \end{pmatrix}$$

Both operations only make sense between matrices of the same size, and both are commutative ($A+B = B+A$). Matrix multiplication is where everything changes.

## Matrix multiplication, step by step

To multiply $AB$, each entry of the result is the **dot product of a row of $A$ with a column of $B$**. Using the same $A$ and $B$ from above:

$$AB = \begin{pmatrix} 2 & 3 \\ 1 & -1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 4 & 2 \end{pmatrix}$$

Top-left entry: row 1 of $A$ dotted with column 1 of $B$: $(2)(1) + (3)(4) = 2 + 12 = 14$.
Top-right entry: row 1 of $A$ dotted with column 2 of $B$: $(2)(0) + (3)(2) = 0 + 6 = 6$.
Bottom-left entry: row 2 of $A$ dotted with column 1 of $B$: $(1)(1) + (-1)(4) = 1 - 4 = -3$.
Bottom-right entry: row 2 of $A$ dotted with column 2 of $B$: $(1)(0) + (-1)(2) = 0 - 2 = -2$.

$$AB = \begin{pmatrix} 14 & 6 \\ -3 & -2 \end{pmatrix}$$

## Matrix multiplication is NOT commutative

Now compute $BA$ with the same two matrices, in the opposite order:

$$BA = \begin{pmatrix} 1 & 0 \\ 4 & 2 \end{pmatrix}\begin{pmatrix} 2 & 3 \\ 1 & -1 \end{pmatrix} = \begin{pmatrix} 2 & 3 \\ 10 & 10 \end{pmatrix}$$

$AB \ne BA$. This is not a special case — it is the general rule. Order matters.

This is the single most important fact about matrices for quantum computing. A quantum circuit is a sequence of gates applied to a qubit, and each gate is a matrix. If gate $A$ is applied first and then gate $B$, the combined operation is the matrix $BA$ (matrices act right-to-left on the state they're applied to), **not** $AB$. Swap the order of two gates in a circuit and you generally get a physically different result — a different final state, a different measurement outcome. This is why circuit diagrams are drawn left-to-right with gates in a specific sequence, and why "does this gate commute with that gate" is a real, load-bearing question in quantum algorithm design, not a pedantic detail.

## Multiplying a matrix by a vector

A vector is just a matrix with one column, so the same row-times-column rule applies. Take

$$M = \begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}, \quad v = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$$

$$Mv = \begin{pmatrix} (2)(4) + (1)(5) \\ (0)(4) + (3)(5) \end{pmatrix} = \begin{pmatrix} 8+5 \\ 0+15 \end{pmatrix} = \begin{pmatrix} 13 \\ 15 \end{pmatrix}$$

This is the operation you will do constantly from here on: a gate (matrix) acting on a qubit state (vector) to produce a new state (vector). Lesson 7 makes this connection explicit.

## Common mistakes

- **Mismatched dimensions.** $AB$ only exists if the number of columns in $A$ equals the number of rows in $B$. For the square matrices in this lesson that's automatic, but it won't always be.
- **Multiplying entry-by-entry instead of row-by-column.** Matrix multiplication is not "multiply the matching entries" — that's a different, less useful operation. Always think rows of the left matrix dotted with columns of the right matrix.
- **Assuming $AB = BA$.** Checked and disproven above. Never assume it without checking.

## Key terms

| Term | Meaning |
|---|---|
| Matrix addition | Adding two same-size matrices entry-by-entry |
| Scalar multiplication | Multiplying every entry of a matrix by a single number |
| Matrix multiplication | Combining a matrix's rows with another matrix's columns via dot products to produce a new matrix |
| Commutative | An operation where order doesn't matter ($AB = BA$); matrix multiplication is generally **not** commutative |
| Gate order | In a quantum circuit, the sequence in which gate-matrices are applied, which changes the result because matrix multiplication isn't commutative |

## Check yourself

Using $A = \begin{pmatrix} 2 & 3 \\ 1 & -1 \end{pmatrix}$ and $B = \begin{pmatrix} 1 & 0 \\ 4 & 2 \end{pmatrix}$ from this lesson, explain in your own words why a quantum circuit that applies gate $A$ then gate $B$ produces a different result than applying $B$ then $A$ — and connect it directly to the fact that $AB \ne BA$.
