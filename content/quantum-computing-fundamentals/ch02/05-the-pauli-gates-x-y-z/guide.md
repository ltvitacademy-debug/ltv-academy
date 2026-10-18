# The Pauli Gates: X, Y, Z

Every quantum algorithm you'll ever build is a sequence of matrices multiplying a state vector, and the three Pauli gates are the simplest, most fundamental matrices in that toolbox. Get comfortable with X, Y, and Z here, because every gate in the rest of this course is either built from them or compared against them.

## What you'll learn

- The explicit 2×2 matrices for X, Y, and Z
- Why X is called the "quantum NOT," verified by direct matrix-vector computation
- How Y combines a bit flip with an imaginary phase, and how to represent that with [real, imag] number pairs
- Why Z leaves measurement probabilities unchanged even though it changes the state vector
- Why that invisible phase flip matters for later chapters on interference

## Three fixed gates, three fixed matrices

A gate is a matrix. Unlike the rotation gates you'll meet later in this chapter, the three Pauli gates — named for physicist Wolfgang Pauli — have no adjustable parameter. Each is a fixed 2×2 unitary matrix that multiplies a qubit's state vector [α, β]ᵀ:

```
X = [ 0  1 ]        Y = [ 0  -i ]        Z = [ 1   0 ]
    [ 1  0 ]            [ i   0 ]            [ 0  -1 ]
```

All three are Hermitian and unitary, and all three square to the identity matrix (X² = Y² = Z² = I), meaning each one undoes itself if you apply it twice. That's a useful fact to carry forward: these are the simplest possible reversible one-qubit operations.

## X — the quantum NOT

X swaps the amplitudes of |0⟩ and |1⟩, which is exactly what a classical NOT gate does to a bit. Multiplying the matrix out by hand:

```
X|0⟩ = [0 1][1] = [0]  =  |1⟩
       [1 0][0]   [1]

X|1⟩ = [0 1][0] = [1]  =  |0⟩
       [1 0][1]   [0]
```

Running this as plain matrix-vector multiplication in `node -e` confirms it exactly: `X|0⟩ = [0, 1]` and `X|1⟩ = [1, 0]`. There's no ambiguity and no complex arithmetic involved — X just relabels which basis state you're in. This is the one Pauli gate whose effect you could predict without ever opening a quantum mechanics textbook, which is exactly why it's the first one introduced.

## Y — a bit flip with a phase twist

Y looks like X with imaginary entries, and it behaves like a bit flip bundled with a 90° phase rotation. To compute it rigorously, represent each complex number as a [real, imag] pair (so i is [0, 1] and −i is [0, −1]), then carry out the same matrix-vector multiplication rule, now with complex multiplication: (a+bi)(c+di) = (ac−bd) + (ad+bc)i.

Doing that in `node -e` for Y|0⟩ gives output amplitudes [0, 0] on the |0⟩ component and [0, 1] on the |1⟩ component — that is, amplitude 0 on |0⟩ and amplitude i on |1⟩, so **Y|0⟩ = i|1⟩**. Running the same multiplication for Y|1⟩ gives [0, −1] on the |0⟩ component and [0, 0] on the |1⟩ component, so **Y|1⟩ = −i|0⟩**. Y flips the basis state exactly like X does, but it also attaches a phase factor of +i or −i depending on which direction the flip runs. Since |i|² = |−i|² = 1, the measurement probabilities are unaffected — a photon or electron prepared this way still reads out as definitely 0 or definitely 1 if you started in a basis state. What's different is the phase sitting on top of that outcome, and phase is exactly the ingredient that interference-based algorithms (starting in Chapter 3) are built from.

## Z — the phase flip

Z is the odd one out among the three: it does not change which basis state you're in at all. It leaves |0⟩ completely untouched and multiplies |1⟩ by −1:

```
Z|1⟩ = [1  0][0] = [ 0]  =  −|1⟩
       [0 -1][1]   [-1]
```

Confirmed directly via `node -e` matrix-vector multiplication: Z applied to [0, 1] returns [0, −1], i.e. −|1⟩. No bit got flipped — only a sign appeared in front of the amplitude.

Now apply Z to a superposition. Starting from (1/√2)|0⟩ + (1/√2)|1⟩ — numerically [0.7071, 0.7071] — multiplying by the Z matrix in `node -e` produces [0.7071, −0.7071], i.e. the state becomes (1/√2)|0⟩ − (1/√2)|1⟩. Squaring the magnitude of each amplitude gives measurement probabilities [0.5, 0.5] both before and after — computed directly, not assumed. The state vector changed (the sign on the second term flipped), but a direct measurement in the computational basis cannot tell the "before" state from the "after" state, because measurement only ever sees |amplitude|², and a sign disappears when you square it.

This is the central idea to carry out of this lesson: **relative phase is invisible to a lone measurement, but it is not nothing.** It becomes observable the moment that qubit is combined with another gate that can turn phase differences into amplitude differences — which is precisely what the Hadamard gate in the next lesson does, and why Z is almost always paired with H in real circuits rather than used on its own.

## Key terms

| Term | Meaning |
|---|---|
| Pauli gate | One of three fixed, parameter-free 2×2 unitary matrices — X, Y, Z — each satisfying G² = I |
| X gate | The "quantum NOT": swaps the |0⟩ and |1⟩ amplitudes with no phase change |
| Y gate | Swaps the |0⟩ and |1⟩ amplitudes and attaches a ±i phase factor to the result |
| Z gate | Leaves |0⟩ unchanged, multiplies |1⟩'s amplitude by −1; a pure phase flip, no bit flip |
| Relative phase | A sign or complex factor on one amplitude relative to another; invisible to direct measurement alone, but detectable once combined with interference |

## Check yourself

Start from the state (3/5)|0⟩ + (4/5)|1⟩ (a valid normalized state since 0.6² + 0.8² = 1). If you apply Z to it, what are the two amplitudes of the resulting state, and what are the measurement probabilities for 0 and 1 before and after the Z gate? Explain why an experimenter who could only measure, never compare state vectors directly, would be unable to tell whether Z had been applied at all.
