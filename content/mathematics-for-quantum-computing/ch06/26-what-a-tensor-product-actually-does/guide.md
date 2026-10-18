# What a Tensor Product Actually Does

Every lesson so far has lived inside a single vector space: one qubit's two-dimensional state, one operator acting on it. Real quantum computers have many qubits working together, and the tool that stitches their individual spaces into one combined space is the tensor product — the single most important piece of machinery in this chapter, because it's the mathematical reason multi-qubit systems behave the way they do.

## What you'll learn

- Why combining two independent systems multiplies their dimensions instead of adding them
- The informal idea of a tensor product before touching the formula
- Why a 2-qubit system needs a 4-dimensional space, not a 2+2 = 4-dimensional "double vector"
- How to tell a tensor-product space from an ordinary sum of spaces
- Why this one fact is the seed of everything "weird" about multi-qubit quantum mechanics

## The wrong intuition: just stack them

If you have two separate classical bits, describing "both of them together" feels like you just list bit one's value next to bit two's value: `(0, 1)`. Two bits, two numbers, no real combining going on. It's tempting to guess that two qubits work the same way — glue two 2-dimensional vectors into one 4-dimensional vector by sticking them end to end, the way you'd concatenate two arrays.

That guess is wrong, and the reason it's wrong is the whole point of this lesson. A single qubit isn't just "a 0 or a 1" — it's a vector in a 2-dimensional space, and it can be a *superposition* of both basis states at once. When you combine two such qubits, you don't just need to describe "qubit 1's superposition" and "qubit 2's superposition" separately — you need to describe every possible correlation between them: what if qubit 1 being 0 always implies qubit 2 is also 0, but qubit 1 being 1 implies qubit 2 is 1 with some different amplitude? Capturing that requires one amplitude for every *combination* of the two qubits' basis states, not one amplitude per qubit.

## The right intuition: every combination needs its own slot

Qubit 1 has 2 basis states: `|0⟩` and `|1⟩`. Qubit 2 also has 2 basis states: `|0⟩` and `|1⟩`. The combined system's basis states are every *pairing* of one basis state from each: `|0⟩|0⟩`, `|0⟩|1⟩`, `|1⟩|0⟩`, `|1⟩|1⟩` — written more compactly as `|00⟩`, `|01⟩`, `|10⟩`, `|11⟩`. That's 2 × 2 = 4 basis states, so the combined space is 4-dimensional, and the general 2-qubit state needs 4 independent amplitudes (one per combination), not 2 + 2 = 4 split across two separate 2-dimensional descriptions.

This is exactly the counting principle you already know from combinatorics: if system A has `m` independent configurations and system B has `n` independent configurations, the number of configurations of "A and B together, allowed to correlate in any way" is `m × n`, not `m + n`. The tensor product, written `⊗`, is the linear-algebra operation that builds this `m × n`-dimensional combined space — and the combined vector that lives in it — out of the two smaller spaces and vectors.

**Three qubits:** the same logic gives 2 × 2 × 2 = 8 basis states (`|000⟩` through `|111⟩`), so an 8-dimensional space. Each additional qubit doesn't add 2 more dimensions — it multiplies the existing dimension by 2. Lesson 28 works through exactly why this multiplicative growth is the reason simulating many qubits on a classical computer gets hard so fast.

## Tensor product vs. direct sum: the comparison that makes it click

Linear algebra also has an operation that genuinely *adds* dimensions: the direct sum, written `A ⊕ B`, which just stacks two spaces side by side without creating any cross-terms between them — a 2-dimensional space direct-summed with another 2-dimensional space gives a 4-dimensional space, coincidentally the same dimension count as the tensor product in this one case, but for a completely different reason and with totally different structure (no combination terms, no entanglement possible). The direct sum is what you'd use to describe "either system A or system B is active, never both" — think of two separate qubits that never interact and that you only ever look at one at a time. The tensor product is what you use when both systems exist *simultaneously* and you need to track every possible correlation between them. Multi-qubit quantum states are built with tensor products, never direct sums, precisely because two qubits in a quantum computer coexist and can become correlated (entangled) with each other.

## Notation you'll see everywhere

`|ψ⟩ ⊗ |φ⟩` denotes the tensor product of two state vectors, often shortened to `|ψ⟩|φ⟩` or even `|ψφ⟩` when it's unambiguous which pieces came from which system. `|0⟩ ⊗ |1⟩` and `|01⟩` refer to the exact same 4-dimensional vector — lesson 27 computes exactly what that vector's entries are.

## Common mistake

Don't read `|01⟩` as "the number 01 in binary" the way you might read a classical 2-bit register. It's shorthand for "qubit 1 in state `|0⟩`, tensor, qubit 2 in state `|1⟩`" — a single basis vector of the 4-dimensional combined space. The binary-counting resemblance is intentional and useful (it tells you there are 2ⁿ basis states for n qubits), but the underlying object is a tensor product, not a number.

## Key terms

| Term | Meaning |
|---|---|
| Tensor product (⊗) | The operation that combines two vector spaces (or vectors) of dimension m and n into one combined space (or vector) of dimension m × n, preserving every possible correlation between the two original systems |
| Combined/composite system | Two or more subsystems (e.g., qubits) treated as one system whose state space is the tensor product of the subsystems' individual state spaces |
| Direct sum (⊕) | A different combination operation that adds dimensions (m + n) rather than multiplying them; used for "either/or" systems, not simultaneously-existing ones |
| Basis state of a composite system | A tensor product of one basis state from each subsystem, e.g. `|0⟩ ⊗ |1⟩` = `|01⟩`; n qubits have 2ⁿ such basis states |

## Check yourself

A single qubit's state space is 2-dimensional. If you combine 4 qubits using the tensor product, what is the dimension of the resulting combined space, and why is it not simply 4 × 2 = 8 in the sense of "4 separate 2-dimensional descriptions stacked together"?
