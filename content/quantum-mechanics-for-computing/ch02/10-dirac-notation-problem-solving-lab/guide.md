# Dirac Notation Problem-Solving Lab

Time to put Chapter 2 to work on a handful of fully worked problems. Each one is solved completely in the text below — work through the reasoning before jumping to the answer.

## What you'll learn

- How to check normalization quickly and confidently
- How to compute an inner product and interpret the result as a probability amplitude
- How to move between the computational basis and the X-basis
- How to catch the difference between a genuine error and a harmless global phase

## Problem 1: Is this state normalized?

**Problem:** Is ψ = √0.2|0⟩ + √0.8|1⟩ a valid quantum state?

**Solution:** Check |a|²+|b|² = (√0.2)² + (√0.8)² = 0.2 + 0.8 = 1. Yes, normalized — valid. (This is elementary arithmetic on the given numbers, no deeper computation required.) Note the probabilities: P(0)=0.2, P(1)=0.8 — this qubit, measured many times, comes up 1 four times as often as 0.

## Problem 2: Compute an inner product and interpret it

**Problem:** Compute ⟨+|0⟩ for |+⟩=(|0⟩+|1⟩)/√2, and say what the squared magnitude of your answer means physically.

**Solution:** ⟨+| = [1/√2, 1/√2] (real amplitudes, so the bra's entries equal the ket's — conjugation doesn't change anything here). ⟨+|0⟩ = (1/√2)(1) + (1/√2)(0) = 1/√2. Squaring: |1/√2|² = 0.5 (verified). This is the probability of measuring |0⟩ as outcome "+" if you measured it in the X-basis — consistent with the already-verified fact from Chapter 3 that measuring |0⟩ in the X-basis gives P(+)=P(−)=0.5.

## Problem 3: Apply Hadamard twice and explain why it's not classical randomness

**Problem:** H|0⟩=|+⟩ and H|+⟩=|0⟩ (verified: applying the Hadamard matrix twice to |0⟩ returns exactly |0⟩, since H·H=I). Why does this prove |+⟩ isn't simply "secretly 0 or 1 with 50/50 odds"?

**Solution:** If |+⟩ really were a classical 50/50 mixture of a hidden 0 or a hidden 1, applying any fixed operation twice couldn't reliably reconstruct |0⟩ with certainty — you'd just get another 50/50 mixture, since a classical operation applied to "secretly 0 or secretly 1" stays a mixture. Instead, H|+⟩ returns *exactly* |0⟩, deterministically, every single time. That only works because the two amplitudes in |+⟩ interfere constructively/destructively under H in a way a classical probabilistic mixture structurally cannot reproduce — proof that superposition is a different kind of thing than "unknown classical value."

## Problem 4: Convert between bases

**Problem:** Express |1⟩ in terms of |+⟩ and |−⟩.

**Solution:** From the basis-conversion relations in Lesson 8: |1⟩ = (|+⟩−|−⟩)/√2. This is the same physical state as the familiar [0,1]ᵗ computational-basis vector, just written in X-basis coordinates — a change of basis, not a change of state.

## Problem 5: Spot the normalization error

**Problem:** A colleague claims the state 0.5|0⟩+0.5|1⟩ is a valid qubit state because "the amplitudes are both 0.5 and that seems balanced." Is the colleague right?

**Solution:** No. Check: 0.5²+0.5² = 0.25+0.25 = 0.5 ≠ 1. This fails normalization — it is NOT a valid state (this is simple arithmetic on the stated amplitudes). The correctly normalized "balanced" state is |+⟩=(1/√2)|0⟩+(1/√2)|1⟩ ≈ 0.707|0⟩+0.707|1⟩, not 0.5 and 0.5. "Looks balanced" and "is normalized" are not the same check.

## Key terms

| Term | Meaning |
|---|---|
| Normalization check | Verifying \|a\|²+\|b\|²=1 for a candidate state's amplitudes before treating it as physically valid |
| Basis conversion | Rewriting the same physical state's amplitudes relative to a different orthonormal basis |
| Constructive/destructive interference | How amplitudes combine under an operation like Hadamard, producing deterministic outcomes that a classical probabilistic mixture cannot reproduce |

## Check yourself

A colleague proposes the state ψ = 0.7|0⟩ + 0.7|1⟩ as a "nice round" qubit state. Is it valid? If not, find the correct amplitude that should replace 0.7 on both terms to make it a valid, equally-weighted normalized state.
