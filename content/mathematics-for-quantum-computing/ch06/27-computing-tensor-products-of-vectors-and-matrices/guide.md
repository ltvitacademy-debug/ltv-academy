# Computing Tensor Products of Vectors & Matrices

Lesson 26 gave you the idea — combining systems multiplies dimensions. Now you'll compute the actual numbers: the Kronecker product formula that turns two small vectors or matrices into one larger one, applied to the exact kind of states and gates you'll use for the rest of this course.

## What you'll learn

- The Kronecker product formula for combining two vectors
- The Kronecker product formula for combining two matrices
- A full step-by-step computation of `|0⟩ ⊗ |1⟩`
- A full step-by-step computation of `X ⊗ I` as a 4×4 matrix
- How to read block structure in a tensor-product matrix at a glance

## The vector formula

Given a vector `A` with entries `a₁, a₂, …, aₘ` and a vector `B` with entries `b₁, b₂, …, bₙ`, the tensor product `A ⊗ B` is the length-`m×n` vector built by taking *every* entry of `A` and multiplying it by the *entire* vector `B`, then stacking those results:

```
A ⊗ B = [ a₁·B ]
        [ a₂·B ]
        [  ⋮   ]
        [ aₘ·B ]
```

Each `aᵢ·B` is itself a block of `n` numbers (`aᵢ·b₁, aᵢ·b₂, …, aᵢ·bₙ`), so the whole result has `m·n` entries total — exactly the dimension count from lesson 26.

## Worked example: |0⟩ ⊗ |1⟩

Qubit basis states are column vectors: `|0⟩ = [1, 0]` and `|1⟩ = [0, 1]`. Apply the formula with `A = |0⟩ = [1, 0]` and `B = |1⟩ = [0, 1]`:

```
|0⟩ ⊗ |1⟩ = [ 1·|1⟩ ]   = [ 1·0 ]   [0]
            [ 0·|1⟩ ]     [ 1·1 ]   [1]
                           [ 0·0 ] = [0]
                           [ 0·1 ]   [0]
```

Working through each block: the first entry of `|0⟩` is `1`, so the first block is `1 · [0, 1] = [0, 1]`. The second entry of `|0⟩` is `0`, so the second block is `0 · [0, 1] = [0, 0]`. Stacking the two blocks gives `[0, 1, 0, 0]`.

**Verified by direct computation (implementing the formula in code and running it):** `|0⟩ ⊗ |1⟩ = [0, 1, 0, 0]`. This matches the basis-state labeling from lesson 26 exactly: the 4 basis vectors of the 2-qubit space are `|00⟩ = [1,0,0,0]`, `|01⟩ = [0,1,0,0]`, `|10⟩ = [0,0,1,0]`, `|11⟩ = [0,0,0,1]` — so `|0⟩⊗|1⟩` landing on `[0,1,0,0]` confirms it really is the basis vector `|01⟩`, the second slot, as the naming promised. (As a contrast, `|1⟩ ⊗ |0⟩` works out to `[0, 0, 1, 0]` — the third slot, `|10⟩` — a genuinely different vector, which is the algebraic reason qubit order matters.)

## The matrix formula

Matrices tensor the same way, but each "entry" of the first matrix is now multiplied by the *entire second matrix* as a block. For an `m×m` matrix `A` and an `n×n` matrix `B`, the result `A ⊗ B` is an `(mn)×(mn)` matrix made of `m×m` blocks, where block `(i,j)` is `Aᵢⱼ · B`:

```
A ⊗ B = [ A₁₁·B   A₁₂·B  ]
        [ A₂₁·B   A₂₂·B  ]     (shown for 2x2 A; each block is itself n x n)
```

## Worked example: X ⊗ I

The Pauli-X gate is `X = [[0,1],[1,0]]` (the quantum NOT gate) and `I` is the 2×2 identity `[[1,0],[0,1]]`. `X ⊗ I` describes the operation "flip qubit 1 with X, leave qubit 2 completely alone" acting on the combined 2-qubit space. Build it block by block using `Xᵢⱼ · I`:

- Block (1,1) = `X₁₁ · I = 0 · I = [[0,0],[0,0]]`
- Block (1,2) = `X₁₂ · I = 1 · I = [[1,0],[0,1]]`
- Block (2,1) = `X₂₁ · I = 1 · I = [[1,0],[0,1]]`
- Block (2,2) = `X₂₂ · I = 0 · I = [[0,0],[0,0]]`

Assembled into one 4×4 matrix:

```
X ⊗ I = [ 0  0  1  0 ]
        [ 0  0  0  1 ]
        [ 1  0  0  0 ]
        [ 0  1  0  0 ]
```

**Verified by direct computation:** building this matrix with the block formula above gives exactly `[[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]]`. Sanity-check it against what it should *do*: multiplying this matrix by the basis vector `|00⟩ = [1,0,0,0]` should give `|10⟩ = [0,0,1,0]` (flip qubit 1 from 0 to 1, leave qubit 2's 0 alone) — and indeed, reading off column 1 of the matrix gives exactly `[0,0,1,0]`. The structure matches the intended physical action.

## Order matters, and so does which qubit is "first"

`X ⊗ I` (flip qubit 1, leave qubit 2 alone) and `I ⊗ X` (leave qubit 1 alone, flip qubit 2) are genuinely different 4×4 matrices — swapping the order of a tensor product is not generally the same operation, exactly the same way `|0⟩⊗|1⟩` and `|1⟩⊗|0⟩` are different vectors. Always keep track of which operand corresponds to which qubit.

## Common mistake

Don't try to compute a tensor product by adding entries, or by multiplying the two matrices together with ordinary matrix multiplication — `A ⊗ B` has different dimensions from both `A·B` (undefined unless the sizes happen to match) and `A+B`. The Kronecker product is its own distinct operation with its own block-construction rule, and for an `m×m` matrix tensored with an `n×n` matrix, the result is always `(mn)×(mn)`, never `m×m` or `n×n`.

## Key terms

| Term | Meaning |
|---|---|
| Kronecker product | The concrete computational rule for a tensor product of vectors or matrices: multiply every entry of the first object by the entire second object, arranged in blocks |
| Block structure | The way a tensor-product matrix is organized into sub-matrices (blocks), where block (i,j) equals entry Aᵢⱼ of the first matrix times the entire second matrix B |
| Operand order | Which vector/matrix is written first (left) vs. second (right) in a tensor product; A⊗B and B⊗A are generally different objects of the same dimension |

## Check yourself

Using the Kronecker product formula, compute `|1⟩ ⊗ |0⟩` by hand, block by block, and explain why it comes out different from `|0⟩ ⊗ |1⟩` even though both results live in the same 4-dimensional space.
