# Tensor Products & Entanglement: the Math View

"Entanglement" gets described with a lot of mystical language — spooky action, instant correlation across any distance. Underneath all of that, entanglement has an exact, checkable mathematical definition, and it's built directly from the tensor product you just learned to compute: an entangled state is simply a vector in the combined space that cannot be written as a tensor product of two smaller vectors. This lesson proves that for a real example.

## What you'll learn

- The exact definition of a "product state" vs. an "entangled state"
- The Bell state, written out as a concrete 4-dimensional vector
- A full algebraic proof that the Bell state cannot be factored into a tensor product
- Why that non-factorization *is* entanglement, mathematically — not a side effect of it
- How to recognize the pattern (zero cross-terms, nonzero diagonal terms) that signals entanglement

## Product states: the "boring" case

A 2-qubit state is called a **product state** if it can be written as `|ψ⟩ = (a|0⟩ + b|1⟩) ⊗ (c|0⟩ + d|1⟩)` for some numbers `a, b, c, d` — i.e., it's really just "qubit 1 is in its own independent state, qubit 2 is in its own independent state, and the combined state is just their tensor product." Using the Kronecker formula from lesson 27, expanding this out gives:

```
(a|0⟩ + b|1⟩) ⊗ (c|0⟩ + d|1⟩) = ac|00⟩ + ad|01⟩ + bc|10⟩ + bd|11⟩
```

So a product state's 4 amplitudes always have the special structure `[ac, ad, bc, bd]` — they factor into an "a,b part" times a "c,d part." For example, lesson 27's `|0⟩⊗|1⟩ = [0,1,0,0]` fits this with `a=1,b=0,c=0,d=1`.

## The Bell state: a specific 4-dimensional vector

One of the most important 2-qubit states in all of quantum computing is the Bell state:

```
|Φ⁺⟩ = (|00⟩ + |11⟩) / √2
```

Written as a plain vector using the basis order `{|00⟩, |01⟩, |10⟩, |11⟩}`, this is `[1/√2, 0, 0, 1/√2] ≈ [0.7071, 0, 0, 0.7071]`. It's a perfectly normal, correctly normalized 2-qubit state — check the normalization: `(1/√2)² + 0² + 0² + (1/√2)² = 0.5 + 0.5 = 1`. Nothing about the vector itself looks unusual.

## Trying (and failing) to factor it

The question is: does the Bell state fit the product-state pattern `[ac, ad, bc, bd]` for *some* choice of `a, b, c, d`? Matching entry by entry against `[1/√2, 0, 0, 1/√2]`:

```
ac = 1/√2      (must be nonzero)
ad = 0
bc = 0
bd = 1/√2      (must be nonzero)
```

Look at the second equation: `ad = 0` means **either `a = 0` or `d = 0`** (a product of two numbers is zero only if at least one of them is zero).

- **If `a = 0`:** then the first equation becomes `ac = 0 · c = 0`. But the first equation requires `ac = 1/√2`, a nonzero number. `0 = 1/√2` is false. Contradiction.
- **If `d = 0`:** then the fourth equation becomes `bd = b · 0 = 0`. But the fourth equation requires `bd = 1/√2`, a nonzero number. `0 = 1/√2` is false. Contradiction.

Every possible way of satisfying `ad = 0` leads to a contradiction with one of the other three equations. **Verified directly:** working through both branches confirms there is no choice of `a, b, c, d` — real or complex — that reproduces `[1/√2, 0, 0, 1/√2]` as `[ac, ad, bc, bd]`. The system of equations is genuinely unsolvable, not just hard to solve.

## This unsolvability *is* entanglement

That's the whole definition. The Bell state cannot be written as "qubit 1's state tensor qubit 2's state," for any choice of individual qubit states — there is no way to describe qubit 1 "on its own" and qubit 2 "on its own" and have their tensor product reproduce this vector. The two qubits' fates are locked together in the vector itself, algebraically, not because of any mysterious extra force. A state that factors (lesson 27's `|0⟩⊗|1⟩`, or any `[ac,ad,bc,bd]` pattern) is called a **product state** or **separable state**. A state that provably does not factor — like the Bell state — is called **entangled**.

## The tell-tale sign

Notice *why* the Bell state resists factoring: it has nonzero amplitudes on `|00⟩` and `|11⟩` (the "matching" outcomes) but exactly zero amplitude on `|01⟩` and `|10⟩` (the "mismatched" outcomes). Any product state's cross-terms `ad` and `bc` can independently be zero or nonzero — but forcing *both* cross-terms to zero while keeping *both* diagonal terms (`ac` and `bd`) nonzero is exactly the condition that breaks factorization, as the proof above shows. This pattern — zero off-diagonal, nonzero on-diagonal, in the `{|00⟩,|01⟩,|10⟩,|11⟩}` ordering — is the signature to watch for.

## Common mistake

Don't think entanglement means "the two qubits are physically touching or exchanging a signal." The Bell-state proof above never mentions distance, time, or signaling at all — it's a pure statement about whether one specific vector can be decomposed as a tensor product of two smaller vectors. Entanglement is a property of the mathematical state, full stop; the "spooky" popular-science framing describes a real physical consequence of this math (measurement correlations), not the definition itself.

## Key terms

| Term | Meaning |
|---|---|
| Product state (separable state) | A multi-qubit state that can be written as a tensor product of individual single-qubit states, i.e. its amplitudes fit the pattern [ac, ad, bc, bd] for some a, b, c, d |
| Entangled state | A multi-qubit state that cannot be written as any tensor product of individual qubit states — provably, not just "hard to find" |
| Bell state | The specific entangled 2-qubit state (|00⟩ + |11⟩)/√2, one of four maximally entangled 2-qubit states central to quantum computing |
| Cross-term / diagonal term | In the [ac, ad, bc, bd] product-state pattern, ad and bc are cross-terms (mixed a-with-d, b-with-c) and ac, bd are diagonal terms; forcing both cross-terms to 0 while both diagonal terms stay nonzero makes factorization impossible |

## Check yourself

The state (|01⟩ + |10⟩)/√2 has amplitudes [0, 1/√2, 1/√2, 0] in the {|00⟩,|01⟩,|10⟩,|11⟩} basis. Using the same ac/ad/bc/bd matching method as above, show algebraically whether this state is a product state or entangled.
