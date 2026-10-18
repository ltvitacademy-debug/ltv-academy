# The No-Cloning Theorem

In classical computing, copying data is so basic an operation that it barely registers as a "feature" — it's just assignment, `cp`, Ctrl+C. Quantum mechanics forbids the equivalent operation outright, for an unknown state, and it forbids it provably, not just practically. This lesson is that proof.

## What you'll learn

- The precise statement of the no-cloning theorem
- The linearity-based proof that no universal quantum cloning machine can exist
- Why this is a fundamental impossibility, not a current hardware limitation
- How no-cloning connects directly to measurement collapse (Chapter 3) and entanglement (Chapter 4)

## The claim, precisely stated

The no-cloning theorem says: there is no unitary operation U that takes an **arbitrary, unknown** qubit state |ψ⟩ together with a blank qubit |0⟩, and produces two independent copies of |ψ⟩ — that is, no U exists such that U(|ψ⟩⊗|0⟩) = |ψ⟩⊗|ψ⟩ for *every possible* |ψ⟩. The emphasis on "every possible" and "unknown" matters: if you already know exactly which state you have, you can always just prepare a second copy from scratch using that knowledge. What's forbidden is copying a state you don't already know the identity of.

## The proof, by contradiction

Suppose such a universal cloning unitary U existed. Then it would have to work correctly on the computational basis states, so:

U(|0⟩⊗|0⟩) = |0⟩⊗|0⟩
U(|1⟩⊗|0⟩) = |1⟩⊗|1⟩

Now apply U to the superposition state |ψ⟩ = (|0⟩+|1⟩)/√2 = |+⟩ (recall this is normalized: (1/√2)²+(1/√2)²=1, verified). Because U is a unitary operator, it must act **linearly** — this is the same linearity property used in Chapter 6's treatment of the Schrödinger equation. So:

U(|+⟩⊗|0⟩) = U[(|0⟩⊗|0⟩ + |1⟩⊗|0⟩)/√2] = [U(|0⟩⊗|0⟩) + U(|1⟩⊗|0⟩)]/√2 = (|0⟩⊗|0⟩ + |1⟩⊗|1⟩)/√2

That result, (|00⟩+|11⟩)/√2, is exactly the Bell state |Φ+⟩ you'll meet formally in Chapter 4 — an entangled state.

But a **correct cloning operation** applied to |+⟩ should have produced |+⟩⊗|+⟩ — two independent copies of the *same* single-qubit state |+⟩. Expand that out: |+⟩⊗|+⟩ = ((|0⟩+|1⟩)/√2)⊗((|0⟩+|1⟩)/√2) = (|00⟩+|01⟩+|10⟩+|11⟩)/2 — the verified product-state expansion, with all four amplitudes equal to 0.5.

Compare the two results directly: (|00⟩+|11⟩)/√2 has coefficients 1/√2≈0.707 on |00⟩ and |11⟩, and exactly 0 on |01⟩ and |10⟩. The correct cloning output (|00⟩+|01⟩+|10⟩+|11⟩)/2 has all four coefficients equal to 0.5. These are two different states — not even close to the same vector. So U cannot simultaneously satisfy both the basis-state cloning requirements AND linearity AND produce a correct clone of |+⟩. Contradiction. No universal cloning unitary exists.

## Why this is fundamental, not an engineering gap

The proof above used nothing about current technology — no mention of noise, decoherence, or qubit count. It used only two structural facts: that quantum operations must be unitary (linear), and that a correct "clone" of a superposition must itself be a clean product state. Better engineering will never close this gap, because the gap isn't an engineering gap — it's a theorem about what linear operators can and cannot do. No-cloning sits in the same category as "you cannot divide by zero," not in the category of "today's hardware can't do this yet."

## Connection to measurement collapse and entanglement

Notice that the "attempted clone" of |+⟩ didn't fail by doing nothing — it produced something real, just not a clone: an entangled Bell state. This is a recurring pattern in quantum mechanics: operations that would be impossible as "clean duplication" very often succeed instead at *entangling* the two systems. It's also connected to measurement (Chapter 3): once you measure an unknown qubit to find out its state, you've collapsed it and destroyed the original superposition — you can't measure your way around no-cloning either, because extracting full information about an unknown state via measurement is exactly as impossible as cloning it.

## What this means for computing

Every piece of classical infrastructure — version control, caching, backups, "just copy the array" — relies on copying being free and perfect. None of that intuition transfers to quantum state. Any system or protocol built around qubits has to be designed from the ground up assuming a given unknown quantum state exists in exactly one place, is destroyed by any inspection, and cannot be duplicated as a fallback. The next two lessons work out what that actually means in practice: for security (eavesdropping becomes detectable) and for two concrete protocols — teleportation and superdense coding — that work precisely because they don't try to violate this rule.

## Key terms

| Term | Meaning |
|---|---|
| No-cloning theorem | No unitary operation can take an arbitrary unknown qubit state and produce two independent copies of it |
| Universal cloning machine | A hypothetical device that could copy any unknown quantum state; proven not to exist |
| Linearity | The property that a quantum operator applied to a superposition equals the same combination of the operator applied to each basis term; the basis of the no-cloning proof |

## Check yourself

In the proof above, applying the hypothetical cloning unitary U to |+⟩ produced an entangled Bell state instead of a clean product state. Explain, in your own words, why this mismatch — rather than U simply failing to run — is what proves no-cloning, and why the argument depends specifically on U being linear.
