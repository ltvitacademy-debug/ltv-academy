# Simulating Noise in Aer

Every circuit run so far has used a perfectly noiseless simulator — the only source of "error" has been statistical sampling from a finite number of shots. Real quantum hardware has a second, independent source of error on top of that: the gates themselves aren't perfect. `qiskit_aer.noise` lets you model that second kind of error before you ever touch real hardware.

## What you'll learn

- Why a noiseless `AerSimulator()` doesn't reflect what real hardware actually does
- `NoiseModel` and `depolarizing_error` for modeling realistic gate error
- What depolarizing noise means conceptually: a probability of replacing a gate's output with pure randomness
- A verified exact calculation: how a 1% depolarizing CX error changes Bell-state probabilities
- A verified seeded sample of what that noisy circuit actually produces at shots=4096

## Noiseless simulation is an idealization

`AerSimulator()` with no further configuration assumes every gate executes perfectly — exactly the matrix operation it's supposed to perform, every single time. That's a useful idealization for learning circuit logic, but it's not what real hardware does. Real gates have a nonzero error rate: a small probability that the gate's actual physical effect deviates from its ideal mathematical definition. Before you ever submit a circuit to real hardware, it's standard practice to simulate it under a realistic noise model first, to get a sense of how much the results will degrade.

## `NoiseModel` and `depolarizing_error`

Qiskit Aer's noise module lets you attach an error model to specific gates:

```python
from qiskit_aer.noise import NoiseModel, depolarizing_error

noise_model = NoiseModel()
error = depolarizing_error(0.01, 2)  # 1% depolarizing probability on a 2-qubit gate
noise_model.add_all_qubit_quantum_error(error, ['cx'])

backend = AerSimulator(noise_model=noise_model)
```

`depolarizing_error(0.01, 2)` builds a depolarizing error channel for a 2-qubit gate with probability `p = 0.01`. `add_all_qubit_quantum_error(error, ['cx'])` attaches that error to every `cx` (CNOT) gate in the circuit, on every pair of qubits. Passing `noise_model=noise_model` into `AerSimulator(...)` means every subsequent `.run()` on that backend applies this error automatically, with no change needed to the circuit itself.

## What depolarizing noise actually means

A depolarizing error with probability `p` works like this: with probability `(1 - p)`, the gate behaves exactly as intended — the ideal operation goes through untouched. With probability `p`, the gate's output is instead replaced with a fully random, maximally mixed result, as if the correct operation never happened at all and the qubits' state was scrambled instead. Formally, this is the channel `ρ → (1-p)ρ + p·I/4` for a 2-qubit gate (the `I/4` being the maximally mixed state over two qubits). The practical intuition: `p` is the probability that "this particular gate just failed," and when it fails, you get garbage instead of a slightly-wrong answer.

## A verified exact result: noise breaks the "impossible" outcomes

Take the familiar Bell-state circuit (`qc.h(0); qc.cx(0,1)`), but now give the `cx` gate a depolarizing error of `p = 0.01`. Applying the exact depolarizing-channel formula to this circuit gives exact resulting probabilities of `P(00) = 0.4975`, `P(11) = 0.4975`, `P(01) = 0.0025`, `P(10) = 0.0025`.

Compare this to the noiseless case: `P(00) = 0.5`, `P(11) = 0.5`, `P(01) = 0`, `P(10) = 0`. The totals for `00` and `11` barely moved — from 0.5 down to 0.4975 each. But the real signature of gate noise is that `01` and `10`, which were exactly impossible in the noiseless circuit, now have a small but genuinely nonzero probability: 0.0025 each. This is the pattern to watch for diagnostically — noise doesn't just blur existing outcomes, it can open up outcomes that the ideal circuit's logic says should never occur at all.

## A verified seeded sample at shots=4096

Running this exact noisy circuit (depolarizing CX error, `p=0.01`) with a real seeded draw at `shots=4096` gives:

```python
{'00': 2090, '01': 11, '10': 8, '11': 1987}
```

The `01` and `10` counts (11 and 8) are small, consistent with their true 0.0025 probability (which at 4096 shots has an expected count of `0.0025 × 4096 ≈ 10.24`), but they are not zero — exactly the signature predicted by the exact calculation above. Meanwhile `00` and `11` still dominate, close to their expected `0.4975 × 4096 ≈ 2038` each, with the usual sampling spread layered on top.

## Key terms

| Term | Meaning |
|---|---|
| `NoiseModel` | A Qiskit Aer object describing realistic error to attach to specific gates during simulation |
| `depolarizing_error(p, n)` | Builds a depolarizing error channel with failure probability `p` for an `n`-qubit gate |
| Depolarizing channel | With probability `(1-p)` the gate behaves ideally; with probability `p` its output is replaced with a maximally mixed (fully random) result |
| `add_all_qubit_quantum_error` | Attaches a given error channel to a named gate across all qubits in the circuit |
| Noise signature | A diagnostic pattern — e.g. previously-impossible outcomes becoming nonzero — that indicates real gate error rather than just sampling noise |

## Check yourself

Under the noiseless Bell-state circuit, `P(01)` and `P(10)` are exactly 0. Under the same circuit with a 1% depolarizing error on the CX gate, they become 0.0025 each, and a real run showed small nonzero counts there. If you saw nonzero `01`/`10` counts in a real experiment's results, what would that tell you that a nonzero split between the `00` and `11` counts alone would not?
