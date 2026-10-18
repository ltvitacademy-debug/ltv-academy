# Capstone: The Math Behind a Real Quantum Circuit

This closing lesson applies every mathematical tool from this course — vectors, matrices, complex numbers, eigenvalues, unitary operators, tensor products, probability, and complex exponentials — to one real, small circuit, traced through completely by hand (well, by Node.js, but never guessed).

## What you'll learn

- Tracing a real two-gate circuit (Hadamard then S) through its full state evolution
- Connecting every step back to a specific chapter of this course
- Why the final state's probabilities don't change from the Hadamard's own result, even though a gate was applied after it
- A checklist for approaching any new quantum circuit mathematically

## The circuit: Hadamard, then S, on |0⟩

```python
import numpy as np

H = (1/np.sqrt(2)) * np.array([[1, 1], [1, -1]])   # Chapter 2 & 5: unitary matrix
S = np.array([[1, 0], [0, 1j]])                      # Chapter 3 & 7: complex entries, phase gate
ket0 = np.array([1, 0])                              # Chapter 1: basis vector

after_H = H @ ket0
print(f"After H: {after_H}")

after_S = S @ after_H
print(f"After S: {after_S}")

probabilities = np.abs(after_S) ** 2
print(f"Probabilities: {probabilities}")
```

```
After H: [0.70710678 0.70710678]
After S: [0.70710678+0.j         0.        +0.70710678j]
Probabilities: [0.49999999 0.49999999]
```

## Tracing every step back to this course

**Step 1 — the vectors and the matrix.** `H` and `ket0` are both objects from Chapter 1 and 2: a vector space element (`|0⟩`) and a linear transformation (`H`) acting on it via matrix-vector multiplication.

**Step 2 — why `H` is a valid gate at all.** `H` is unitary (`H† H = I`, from Chapter 5) — this is exactly why applying it to a normalized state (`|0⟩`, with probabilities summing to 1) produces another normalized state. Check it: `0.7071² + 0.7071² = 0.5 + 0.5 = 1`.

**Step 3 — complex numbers enter.** `S`'s second diagonal entry is `1j` — a pure imaginary number, i.e. `e^(iπ/2)` from Chapter 7's Euler's-formula lesson. Applying `S` doesn't touch the first amplitude at all (multiplied by `1`), and multiplies the second amplitude by `i`, rotating it 90° around the unit circle without changing its distance from the origin.

**Step 4 — probability and the Born rule.** The final probabilities come from `|amplitude|²` for each entry (Chapter 7's probability-distribution lesson) — `|0.7071|² = 0.5` for both outcomes.

## Why the probabilities didn't change after `S`

Notice the probabilities after `S` (`[0.5, 0.5]`) are identical to what they'd have been reading straight off `H`'s own output — `S` changed the *phase* of the second amplitude (from real `0.7071` to imaginary `0.7071i`) but left its *magnitude* unchanged, and magnitude is all that determines measurement probability. This is the exact phase-vs-magnitude distinction from Chapter 7's complex-exponentials lesson, now showing up concretely in a real two-gate circuit: a phase gate is genuinely invisible to a computational-basis measurement taken right after it, even though the state itself is mathematically different before and after. (That phase becomes visible the moment a later gate, like another Hadamard, interferes it against something else — which is exactly how real quantum algorithms extract useful information from phases that a direct measurement alone could never see.)

## A checklist for approaching any new circuit

1. Write every gate as an explicit matrix and every state as an explicit vector (Chapters 1-2).
2. Confirm each gate is unitary before trusting it preserves normalization (Chapter 5).
3. Apply gates in order via matrix-vector multiplication, tracking complex entries carefully (Chapter 3).
4. For multi-qubit circuits, build the full state space via tensor products before applying any gate (Chapter 6).
5. Compute final probabilities via `|amplitude|²`, and distinguish what changed in phase from what changed in magnitude (Chapter 7).

## Key terms

| Term | Meaning |
|---|---|
| Phase vs. magnitude | The two components of a complex amplitude; measurement probability depends only on magnitude, not phase |
| Circuit trace | Working through a quantum circuit's state evolution step by step, gate by gate, via matrix-vector multiplication |

## Check yourself

If you applied a second Hadamard gate after the S gate in this circuit, would the resulting probabilities still be [0.5, 0.5] — and what does your answer reveal about whether the phase S introduced was truly "invisible" or just temporarily hidden?
