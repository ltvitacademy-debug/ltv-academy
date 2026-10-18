# Phase Gates: S & T

X flips bits. Z flips a sign. S and T are finer-grained still: they rotate the |1⟩ amplitude through a specific angle in the complex plane without ever moving it off the |1⟩ axis. They're called phase gates for a reason — and that name is the whole lesson.

## What you'll learn

- The explicit matrices for S and T, and the phase angle each applies
- Why S and T have no effect on measurement probabilities when applied to a basis state alone
- Direct computation showing S|1⟩ = i|1⟩ with probability 1 preserved
- The algebraic relationships S² = Z, T² = S, T⁴ = Z, T⁸ = I, each verified by matrix multiplication
- Why T is called an "eighth turn," and why that makes it important for universal gate sets later in the course

## The S and T matrices

Both gates are diagonal — they leave |0⟩ completely alone and multiply |1⟩'s amplitude by a complex number of magnitude 1:

```
S = [ 1   0 ]        T = [ 1        0       ]
    [ 0   i ]            [ 0   e^(iπ/4)      ]
```

S applies a 90° (π/2 radian) phase rotation to |1⟩; T applies a 45° (π/4 radian) phase rotation. Both are special cases of the general phase gate diag(1, e^(iφ)) — S is φ = π/2, T is φ = π/4 — and Z itself is the φ = π case of the same family, which is the first hint that these gates are all related.

## Phase gates don't change probabilities on a basis state — until you combine them

Representing e^(iπ/4) as the pair [cos(π/4), sin(π/4)] ≈ [0.7071, 0.7071] and running the matrix-vector multiplication for S|1⟩ in `node -e` gives exactly [0, 1] — that is, **S|1⟩ = i|1⟩**. Squaring |i|² gives 1, so the measurement probability for outcome 1 is still exactly 1, computed directly, same as before S was applied. S moved the amplitude around the unit circle in the complex plane; it did not change its distance from the origin, and measurement only cares about that distance squared.

This is the pattern for both S and T, and it's why the name "phase gate" is precise rather than generic: applied alone to a basis state, neither gate does anything a measurement could detect. Their effect only becomes visible once the qubit is first put into superposition — typically by H — because a superposition's measurement probabilities depend on how its two amplitudes interfere, and a phase gate changes exactly the relative angle between those two amplitudes. Apply H, then S, then H again, and the output measurement probabilities genuinely shift (you'll compute this exact sequence in the next lesson's lab). Phase gates are therefore never used in isolation in a real circuit; they're always set up to interact with a later interference step.

## S and T are powers of each other

The algebra connecting S, T, and Z is worth having cold, because it's the reason T shows up constantly in gate-set discussions. Multiplying the matrices directly (complex 2×2 matrix multiplication, computed in `node -e`, not assumed):

- **S² = Z** — multiplying the S matrix by itself gives [[1,0],[0,−1]] exactly, which is the Z matrix.
- **T² = S** — multiplying the T matrix by itself gives [[1,0],[0,i]] exactly, which is the S matrix.
- **T⁴ = Z** — squaring T² = S again gives [[1,0],[0,−1]], confirming T⁴ = (T²)² = S² = Z.
- **T⁸ = I** — squaring T⁴ = Z again gives the identity matrix [[1,0],[0,1]] (to floating-point precision), confirming T⁸ = I.

That chain is exactly why T is often introduced as an "eighth-turn" gate: eight applications of T bring |1⟩'s phase all the way around the unit circle back to where it started (0° → 45° → 90° → 135° → 180° → 225° → 270° → 315° → 360°), while S is a "quarter-turn" (four applications return to identity) and Z is a "half-turn" (two applications return to identity). T is the finest-grained phase step of the three, which is precisely what makes it useful: a gate set built only from H and T (plus CNOT for multi-qubit circuits) can approximate *any* single-qubit rotation to arbitrary precision, because repeated T rotations can land arbitrarily close to any angle. Chapter 4's discussion of universal gate sets depends on exactly this property.

## Key terms

| Term | Meaning |
|---|---|
| S gate | diag(1, i); applies a 90°/π-2 phase rotation to the |1⟩ amplitude, no change to |0⟩ |
| T gate | diag(1, e^(iπ/4)); applies a 45°/π-4 phase rotation to the |1⟩ amplitude |
| Phase gate | Any diagonal unitary of the form diag(1, e^(iφ)); changes relative phase, never measurement probability on a basis state alone |
| S = T² | S is exactly two applications of T; verified by direct complex matrix multiplication |
| Eighth-turn | Informal name for T, since T⁸ = I — eight applications return a qubit's phase to its starting point |

## Check yourself

If you apply T six times in a row to the state |1⟩, what resulting phase angle (in degrees, measured from T's 45° step) does the |1⟩ amplitude end up at, and which of the gates introduced in this chapter so far (X, Y, Z, H, S, T) — if any — produces that exact same phase angle in a single application? Explain your reasoning using the eighth-turn relationships above.
