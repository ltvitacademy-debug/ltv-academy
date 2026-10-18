# Multi-Qubit State Spaces

You now know how to build a tensor product and compute one by hand. This lesson zooms out to what those tensor products build, collectively: the full state space a real multi-qubit quantum computer lives in — and why its size is the single biggest reason quantum computers are hard to simulate classically.

## What you'll learn

- The full basis of the 2-qubit state space and where each basis vector comes from
- Why the 2-qubit space is exactly 4-dimensional, with a dimension count you can verify by hand
- The general rule: n qubits give a 2ⁿ-dimensional space
- Why 2ⁿ growth is "exponential," concretely, with real numbers
- Why this is the core reason classical computers struggle to simulate quantum systems

## The 2-qubit basis, built from tensor products

A single qubit's state space has basis `{|0⟩, |1⟩}` — 2 basis vectors, so it's 2-dimensional. Two qubits combine via the tensor product (lessons 26–27), and the combined space's basis is every tensor product of one single-qubit basis state from each qubit:

```
|0⟩ ⊗ |0⟩ = |00⟩ = [1, 0, 0, 0]
|0⟩ ⊗ |1⟩ = |01⟩ = [0, 1, 0, 0]
|1⟩ ⊗ |0⟩ = |10⟩ = [0, 0, 1, 0]
|1⟩ ⊗ |1⟩ = |11⟩ = [0, 0, 0, 1]
```

(The first two rows were computed by hand in lesson 27; the pattern continues the same way for the other two.) That's 4 basis vectors, so the 2-qubit space is 4-dimensional — matching 2² = 4 exactly, and matching the "every combination needs its own slot" counting argument from lesson 26.

A general 2-qubit state is any linear combination of these 4 basis vectors: `α|00⟩ + β|01⟩ + γ|10⟩ + δ|11⟩`, with `|α|² + |β|² + |γ|² + |δ|² = 1` (the normalization condition, same idea as single-qubit normalization, just with 4 terms instead of 2). Every one of those 4 amplitudes is independently adjustable — that's what "4-dimensional" buys you: 4 genuinely independent numbers describing the system's state, not 2 numbers reused twice.

## The general rule: n qubits, 2ⁿ dimensions

Each additional qubit tensors in another factor of 2, because each qubit contributes a 2-dimensional basis. The pattern:

| Qubits (n) | Dimension (2ⁿ) |
|---|---|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |
| 10 | 1,024 |
| 20 | 1,048,576 |
| 50 | 1,125,899,906,842,624 |

Each row simply doubles the one above it — 1, 2, 3 qubits give 2, 4, 8 dimensions; by 50 qubits the dimension count is already over a quadrillion. This is exactly what "exponential growth" means in concrete terms: the dimension isn't growing by a fixed amount per qubit (that would be linear, like 2n), it's *doubling* per qubit, which overtakes any linear or even polynomial growth rate almost immediately.

## Why this is the reason quantum computers are hard to simulate classically

A classical computer simulating a quantum state has to store every one of its amplitudes in memory — one complex number per basis-state dimension. For 50 qubits, that's roughly 2⁵⁰ ≈ 1.1 × 10¹⁵ complex numbers, which at even a few bytes each is already past what any current supercomputer's memory can hold, and the number only doubles again for every single additional qubit. This is not a software-engineering problem that faster chips or cleverer code eventually fixes — it's a direct consequence of the tensor-product dimension-counting rule from this lesson: the state space's size is fundamentally exponential in the qubit count, so the resources needed to classically track an arbitrary quantum state are exponential too. (It's also, from the other direction, the entire reason quantum computers are potentially powerful: a real quantum device doesn't need to separately store 2ⁿ numbers in a classical memory bank to manipulate a state that lives in a 2ⁿ-dimensional space — it exploits that space directly. Lesson 29 shows the piece of this story that makes that space genuinely strange: entanglement.)

## Common mistake

Don't confuse "the number of qubits" with "the number of bits of information you need to fully describe the quantum state." A classical n-bit register needs only n bits to describe fully. An n-qubit quantum register's general state needs 2ⁿ complex amplitudes. These grow at completely different rates (linear vs. exponential), and conflating them is one of the most common sources of confusion when first learning this material.

## Key terms

| Term | Meaning |
|---|---|
| State space dimension | The number of independent amplitudes needed to fully describe a quantum system's general state; for n qubits, this is 2ⁿ |
| Exponential growth | Growth where the quantity multiplies by a fixed factor (here, 2) for each unit increase in n, rather than adding a fixed amount — 2ⁿ, not 2n |
| Computational basis | The standard basis for an n-qubit space, consisting of all 2ⁿ tensor products of single-qubit |0⟩/|1⟩ states, e.g. |00…0⟩ through |11…1⟩ |
| Classical simulation cost | The memory/computation needed to track a quantum state on a classical computer, which scales as 2ⁿ because that many amplitudes must be stored |

## Check yourself

A classical 8-bit register needs 8 bits to describe any of its states exactly. An 8-qubit quantum register's general state needs how many complex amplitudes to describe exactly, and what does the gap between "8" and that number tell you about why classical simulation of quantum systems becomes intractable as qubit count grows?
