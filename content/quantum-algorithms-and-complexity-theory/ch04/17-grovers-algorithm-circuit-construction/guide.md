# Grover's Algorithm: Circuit Construction

The oracle and diffusion operators from the previous lesson aren't abstract math you take on faith — they're built from ordinary gates: Hadamards and a multi-controlled phase flip. This lesson lays out the actual circuit, gate by gate, and shows why sandwiching a simple "flip about |0⟩" operation between two layers of Hadamards is exactly how you get "flip about |s⟩" for free.

## What you'll learn

- The full circuit skeleton: superposition, t repetitions of oracle+diffusion, measurement
- How the oracle is implemented at the gate level (multi-controlled phase flip on the marked pattern)
- The gate-level construction of the diffusion operator: D = H^⊗n (2|0⟩⟨0| − I) H^⊗n
- Why sandwiching the "reflect about |0⟩" operator between Hadamard layers gives "reflect about |s⟩"
- The formal query-complexity result: O(√N) oracle calls vs. O(N) classically

## The circuit skeleton

At the top level, Grover's algorithm on n qubits (N = 2ⁿ basis states) is:

1. Start with n qubits in |0⟩^⊗n.
2. Apply a Hadamard gate to every qubit: H^⊗n. This produces the uniform superposition |s⟩ = (1/√N)Σ|x⟩ — every basis state has equal amplitude 1/√N, which is exactly the starting condition the previous lesson's derivation assumed.
3. Repeat **t** times: apply the oracle circuit, then apply the diffusion circuit.
4. Measure all n qubits. With the right choice of t, you read out the marked state with high probability.

Everything interesting is in step 3, repeated t times, where t is the number from Lesson 18's formula.

## The oracle circuit

The oracle needs to implement O|x⟩ = (−1)^f(x)|x⟩ — flip the sign on exactly the one basis state matching the marked bit pattern, leave everything else alone. The standard construction is a **multi-controlled Z gate** (or equivalently a multi-controlled phase flip) conditioned on the marked bit pattern: if you're searching for the pattern "101", you build a gate that applies a −1 phase precisely when the qubits read |101⟩, and does nothing otherwise. Concretely, this is typically built by first applying X gates to flip any qubits that should read 0 in the marked pattern (so the target pattern becomes all-1s), applying a multi-controlled-Z (phase flip when all control qubits are |1⟩), then undoing the X gates. The oracle is a single black-box call in the complexity analysis, but internally it's built from ordinary reversible gates — no measurement, no collapse, just a phase.

## The diffusion circuit

The diffusion operator D = 2|s⟩⟨s| − I needs to reflect about |s⟩, the *uniform superposition* — but reflecting directly about an equal-superposition state isn't a convenient primitive gate. The trick is to build a much simpler operator, D₀ = 2|0⟩⟨0| − I, which reflects about the basis state |0...0⟩ (easy: it's a multi-controlled phase flip conditioned on *all qubits reading 0*, structurally identical to the oracle but with a fixed target pattern instead of the search pattern), and then change basis with Hadamards:

**D = H^⊗n (2|0⟩⟨0| − I) H^⊗n**

Why does this work? Hadamard is its own inverse (H² = I) and it maps |0...0⟩ exactly to |s⟩ (that's literally what Hadamards do to produce the uniform superposition in step 2 of the circuit). Conjugating an operator by a change-of-basis transformation carries its geometric action along with it: "reflect about |0⟩," viewed through the H^⊗n change of basis, becomes "reflect about H^⊗n|0⟩" — and H^⊗n|0⟩ is exactly |s⟩. So the sandwich H^⊗n (...) H^⊗n takes an easy-to-build reflection about |0⟩ and turns it into the reflection about |s⟩ that the algorithm actually needs, using only Hadamards and the same multi-controlled-phase-flip primitive the oracle already uses.

## Putting the gate list together

One full Grover iteration, gate by gate:

1. Oracle: (X gates to align pattern) → multi-controlled-Z → (X gates to undo)
2. Diffusion: H^⊗n → (X gates, all qubits) → multi-controlled-Z → (X gates to undo) → H^⊗n

That's it — one iteration is entirely Hadamards, X gates, and multi-controlled-Z gates. No other gate types are required for the core algorithm.

## Query complexity, formally

Each full iteration costs exactly **one oracle call** (the diffusion step doesn't call the oracle — it only uses the known, fixed |0⟩-target phase flip). Running t* = ⌊(π/4)√N⌋ iterations therefore costs **t\* oracle calls total**, each oracle call corresponding to one execution of the oracle circuit within the overall circuit. Since t* scales as √N, Grover's algorithm achieves:

**O(√N) oracle queries, versus O(N) classically.**

That's the formal statement of the quadratic speedup. The next lesson puts real numbers behind t* and — critically — shows why running *more* than t* iterations is not a safety margin but actively makes things worse.

## Key terms

| Term | Meaning |
|---|---|
| Multi-controlled-Z | A gate that flips the sign of exactly the one basis state where all target qubits read 1 (used, with X-gate adjustments, to build both the oracle and D₀) |
| D₀ = 2\|0⟩⟨0\| − I | The "reflect about \|0...0⟩" operator — the easy-to-build primitive diffusion is constructed from |
| Basis change via Hadamard | H^⊗n maps \|0...0⟩ to the uniform superposition \|s⟩, which is what lets D₀ sandwiched in Hadamards become D |
| Oracle call / query | One execution of the oracle circuit within the larger Grover circuit; the unit that query complexity (t\* total) counts |
| Query complexity | The number of oracle calls an algorithm needs; O(√N) for Grover vs. O(N) classically |

## Check yourself

Explain, in your own words, why D = H^⊗n (2|0⟩⟨0| − I) H^⊗n actually reflects about the uniform superposition |s⟩ rather than about |0...0⟩ — what specific property of the Hadamard transform makes that substitution valid?
