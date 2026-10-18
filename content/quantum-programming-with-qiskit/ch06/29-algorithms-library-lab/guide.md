# Algorithms Library Lab

This lab is where you stop reading verified numbers and start producing them yourself. You'll run the exact Grover circuit from Lesson 26 and confirm its predicted result, then hand-evaluate the toy VQE cost function from Lesson 28 at points of your own choosing — building real intuition for how an optimizer "feels its way" toward a minimum using nothing but point evaluations.

## What you'll learn

- How to run the Lesson 26 Grover circuit and confirm it reproduces probability 1.0 on `|11>`
- How to hand-evaluate the toy VQE cost function ⟨H⟩(θ) = 0.5·cos(θ) + 0.3·sin(θ) at θ values you pick yourself
- Why comparing a handful of point evaluations, with no gradient, is exactly what a real optimizer does during VQE
- How to connect both halves of this lab back to the general hybrid-loop and amplitude-amplification patterns from this chapter

## Part 1: confirm the Grover result

Run the exact circuit from Lesson 26:

```python
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h([0, 1])
qc.cz(0, 1)
qc.h([0, 1]); qc.x([0, 1]); qc.cz(0, 1); qc.x([0, 1]); qc.h([0, 1])
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
result = sim.run(qc, shots=1000).result()
counts = result.get_counts()
print(counts)
```

The verified prediction from Lesson 26 is exact and deterministic: all 1000 shots should come back as `11`, with no other outcome appearing at all. If your `counts` dictionary shows anything other than `{'11': 1000}`, something in the circuit was altered from the original — double-check the oracle (`cz(0, 1)`) and the five-gate diffuser block against Lesson 26 before assuming the underlying math is wrong. This circuit is the N=4, M=1 special case where one iteration gives probability exactly 1.0, so there is no statistical spread to account for the way there would be with a non-exact case.

## Part 2: hand-evaluate the toy VQE landscape

Lesson 28 gave you the closed-form expectation value for the toy Hamiltonian H = 0.5·Z + 0.3·X with ansatz RY(θ)|0>:

**⟨H⟩(θ) = 0.5·cos(θ) + 0.3·sin(θ)**

and a table of verified values at θ = 0, π/4, π/2, 0.6π, and π, plus the true minimum of **-0.583095** at θ ≈ 3.6826 rad.

Now pick three or four θ values of your own — ones not already in the Lesson 28 table — and compute ⟨H⟩(θ) by hand using the formula above. Good candidates to try: θ = π/3, θ = 3π/4, θ = 2π, θ = 3.5 rad (close to the true minimum), θ = 4 rad (just past it). For each one:

1. Compute cos(θ) and sin(θ) (radians).
2. Plug into 0.5·cos(θ) + 0.3·sin(θ).
3. Compare your result to the nearest value in the Lesson 28 table and to the known minimum of -0.583095 — is your point closer to or farther from the minimum?

## Part 3: think like COBYLA

This is the real point of the exercise. A gradient-free optimizer like COBYLA, running inside a real VQE loop, never sees the formula 0.5·cos(θ) + 0.3·sin(θ) — it only sees the numeric result of evaluating ⟨H⟩ at whatever θ it chooses to try, exactly like what you just did by hand. It has to decide where to try next using only the pattern of numbers it has seen so far, with no derivative handed to it for free.

Take the set of (θ, ⟨H⟩(θ)) pairs you just computed, plus the ones given in Lesson 28, and order them by θ. Without using the formula, just by looking at how ⟨H⟩ rises and falls across your points: which direction would you try next if you were trying to get below -0.5? Does your reasoning lead you generally toward θ≈3.68 rad, the known true minimum?

This is exactly why real hardware VQE runs need many evaluations and a sensible optimizer — the quantum processor is only ever the thing answering "what's ⟨H⟩ at this θ," never the thing deciding which θ to try next.

## Why no gradient

It's worth being explicit about why this lab deliberately avoids computing or estimating a derivative. On real hardware, every ⟨H⟩ measurement already costs real quantum shots and takes real queue time; estimating a derivative numerically would mean paying for additional nearby measurements for every single optimizer step, on top of whatever noise already sits in each individual measurement. Point-evaluation-only optimizers like COBYLA exist specifically because this trade-off — more evaluations, no derivative needed — is usually worth it on hardware where every quantum measurement has a real cost attached.

## Key terms

| Term | Meaning |
|---|---|
| Deterministic result | A quantum circuit outcome with probability exactly 1.0 on one outcome and 0 on all others, as in this lab's Grover circuit |
| Point evaluation | Computing a function's value at one specific input, with no information about its slope or derivative there |
| Hybrid loop (applied) | The repeated cycle of evaluating ⟨H⟩(θ) at chosen points and deciding the next point to try, without a formula or gradient |
| True minimum | For this lab's toy Hamiltonian, the verified value -0.583095 at θ≈3.6826 rad, which no classical formula is handed to the optimizer directly |

## Check yourself

You computed ⟨H⟩(θ) at a few θ values of your own choosing in Part 2. Using only those numeric results (not the formula), describe the rule you would use to decide your next θ to try if your goal were to get as close as possible to -0.583095 — and explain why this is a fair model of what COBYLA does inside a real VQE run on hardware.
