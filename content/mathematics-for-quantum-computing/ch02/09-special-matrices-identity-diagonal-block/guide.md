# Special Matrices: Identity, Diagonal & Block

Not every matrix is equally hard to work with. Three particular shapes — identity, diagonal, and block-diagonal — show up constantly in quantum computing precisely because they're easy to compute with, and because they map onto real physical structure: "doing nothing," "scaling each basis state independently," and "multiple qubits evolving independently of each other." Recognizing these shapes saves real computation and, in the block-diagonal case, previews one of the most important ideas in multi-qubit quantum computing.

## What you'll learn

- The defining property of the identity matrix, and why it represents "no transformation at all"
- Diagonal matrices and the multiplication shortcut they allow, with a worked example
- What a block-diagonal matrix looks like and how to apply it to a vector
- Why block-diagonal structure matters for systems of multiple qubits, previewing tensor products

## The identity matrix

The $n \times n$ identity matrix $I$ has 1's down the main diagonal and 0's everywhere else. In 2x2 form:

$$I = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}$$

Its defining property: for any matrix $M$ (of compatible size), $IM = MI = M$. Multiplying by $I$ changes nothing — you verified exactly this in Lesson 8, when $AA^{-1}$ worked out to $I$. As a transformation, $I$ is the "do nothing" gate: it leaves every vector exactly as it was.

## Diagonal matrices and the multiplication shortcut

A **diagonal matrix** has nonzero entries only on the main diagonal; every off-diagonal entry is zero. For example:

$$D = \begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}$$

Multiplying a diagonal matrix by another matrix is much cheaper than a general matrix multiplication — each row of the result is just that row's diagonal entry times the corresponding row of the other matrix. Verify this with

$$M = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$$

$$DM = \begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix}\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} = \begin{pmatrix} 3\cdot 1 & 3\cdot 2 \\ -2\cdot 3 & -2\cdot 4 \end{pmatrix} = \begin{pmatrix} 3 & 6 \\ -6 & -8 \end{pmatrix}$$

Row 1 of $M$ (which is $(1,2)$) just got scaled by 3, the first diagonal entry; row 2 of $M$ (which is $(3,4)$) got scaled by $-2$, the second diagonal entry. No dot products needed — just scale each row by its matching diagonal entry. Multiplying in the other order, $MD$, scales *columns* instead of rows:

$$MD = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\begin{pmatrix} 3 & 0 \\ 0 & -2 \end{pmatrix} = \begin{pmatrix} 1\cdot 3 & 2\cdot(-2) \\ 3\cdot 3 & 4\cdot(-2) \end{pmatrix} = \begin{pmatrix} 3 & -4 \\ 9 & -8 \end{pmatrix}$$

Note $DM \ne MD$ here too — diagonal matrices get this shortcut, but they still don't generally commute with other matrices (though, as you'll see in a later lesson, two diagonal matrices *do* commute with each other).

## Block-diagonal matrices

A **block-diagonal matrix** is built from smaller square matrices ("blocks") placed along the diagonal, with zeros everywhere else. Take two 2x2 blocks,

$$B_1 = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}, \quad B_2 = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$

(that second block is the Pauli-X gate from Lesson 7). Arranged block-diagonally into one 4x4 matrix:

$$\mathcal{B} = \begin{pmatrix} 1 & 2 & 0 & 0 \\ 3 & 4 & 0 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$

Apply $\mathcal{B}$ to the vector $v = (1,1,1,0)$:

$$\mathcal{B}v = \begin{pmatrix} 1\cdot1+2\cdot1+0\cdot1+0\cdot0 \\ 3\cdot1+4\cdot1+0\cdot1+0\cdot0 \\ 0\cdot1+0\cdot1+0\cdot1+1\cdot0 \\ 0\cdot1+0\cdot1+1\cdot1+0\cdot0 \end{pmatrix} = \begin{pmatrix} 3 \\ 7 \\ 0 \\ 1 \end{pmatrix}$$

Notice what happened: the top two entries of the result, $(3,7)$, came *only* from $B_1$ acting on the top two entries of $v$, $(1,1)$ — exactly the matrix-vector product $B_1(1,1)$. The bottom two entries, $(0,1)$, came *only* from $B_2$ acting on the bottom two entries of $v$, $(1,0)$ — exactly $B_2(1,0)$. The two blocks never mix; each one acts entirely within its own slice of the vector, independent of the other.

## Why this matters for multi-qubit systems

This independence is exactly the structure you need when multiple qubits are involved. If you have two qubits and apply a gate to qubit 1 while doing nothing (or something else entirely) to qubit 2, the combined operation on the full multi-qubit state has this block-like independent-action structure — each subsystem transforms on its own, without the blocks bleeding into each other. This lesson is a deliberate preview: the actual tool used to combine separate qubits' matrices into one big matrix for the whole system is the **tensor product**, which Chapter 6 covers in full. For now, the key intuition to carry forward is this: block structure is what "acting on one part of a system without disturbing the rest" looks like, numerically.

## Common mistakes

- **Assuming all diagonal matrices commute with everything.** They don't commute with general matrices — only the shortcut for computing the product is special, not the commutativity.
- **Treating "block-diagonal" as if the blocks interact.** They don't. Each block only ever touches its own slice of the vector; zero entries elsewhere guarantee no mixing.
- **Forgetting the row vs. column distinction for diagonal multiplication.** $DM$ scales rows of $M$; $MD$ scales columns of $M$. They are generally different results.

## Key terms

| Term | Meaning |
|---|---|
| Identity matrix ($I$) | The matrix with 1's on the diagonal and 0's elsewhere; $IM = MI = M$ for any compatible $M$ — the "do nothing" transformation |
| Diagonal matrix | A matrix with nonzero entries only on the main diagonal; multiplying by one scales rows (if on the left) or columns (if on the right) of the other matrix |
| Block-diagonal matrix | A matrix built from smaller square blocks placed along the diagonal, with zeros elsewhere, so each block acts independently on its own slice of a vector |
| Tensor product | The operation (covered in Chapter 6) used to combine separate qubits' matrices into one larger matrix for a joint multi-qubit system; block structure is a preview of its independent-action behavior |

## Check yourself

For the block-diagonal matrix $\mathcal{B}$ built from $B_1 = \begin{pmatrix}1&2\\3&4\end{pmatrix}$ and $B_2 = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ in this lesson, explain why $\mathcal{B}v$ can be computed by applying $B_1$ and $B_2$ *separately* to the two halves of $v$, instead of doing one full 4x4 matrix-vector multiplication — and why that property is exactly what you'd want when two qubits are being acted on independently.
