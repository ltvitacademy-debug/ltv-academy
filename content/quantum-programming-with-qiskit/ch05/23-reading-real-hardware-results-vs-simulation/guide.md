# Reading Real-Hardware Results vs. Simulation

A quick honesty note before anything else: this environment can't execute a real IBM Quantum job, so this lesson illustrates what a noisy real-hardware-style result looks like using a simulated noise model applied to a known circuit — not a literal result pulled from an actual backend. The point isn't the specific numbers; it's learning to recognize the real signature of hardware noise when you see it.

## What you'll learn

- Why real hardware results differ systematically from ideal simulation, not just randomly
- How to compute what a depolarizing-noise approximation predicts for a simple circuit
- The real diagnostic signature of hardware error: nonzero counts on "impossible" outcomes
- Why this is exactly the problem error mitigation (Chapter 7) exists to address

## The baseline: ideal Bell-state probabilities

Start from the same Bell-state circuit used earlier in this course:

```python
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])
```

On a noiseless simulator, the only two possible outcomes are `00` and `11`, each with exact probability 0.5. `01` and `10` have exact probability 0 — there is no path through this ideal circuit that produces a mismatched pair.

## Modeling what noisy hardware does: depolarizing error

Real hardware doesn't implement gates perfectly. A common way to approximate this is a depolarizing noise model applied to the entangling gate: with some probability `p`, the two-qubit interaction effectively gets corrupted toward a fully mixed state instead of doing exactly what you asked. Using `p = 0.05` on the entangling gate — a more pronounced noise level than the lighter noise example used earlier in this course, representative of a real but somewhat noisy device — the exact probabilities computed from the depolarizing-channel formula are:

```
P(00) = 0.4875
P(11) = 0.4875
P(01) = 0.0125
P(10) = 0.0125
```

Notice what changed and what didn't: `00` and `11` are still by far the dominant outcomes, each losing a small amount of probability. But `01` and `10` — which were exactly 0 in the ideal case — now each pick up a small, nonzero share. That shift is the entire signature of the noise.

## What an actual run looks like at finite shots

A real seeded simulated draw from these exact probabilities at `shots=4096` gives:

```python
{'00': 2005, '11': 2003, '01': 35, '10': 53}
```

Compare this to the clean simulator result pattern from earlier in the course, where `01` and `10` always came back at exactly 0. Here they don't — `35` and `53` counts respectively, out of 4096 shots. That's roughly in line with the 0.0125 probability each was assigned (0.0125 × 4096 ≈ 51), allowing for ordinary shot-to-shot sampling variation on top of the noise itself.

## The real diagnostic skill: expect the "impossible" outcomes

This is the practical takeaway that matters far more than any specific number: **on real hardware, you should expect to see nonzero counts on outcomes that your circuit's ideal math says are impossible.** If you ran this Bell-state circuit on an actual IBM backend and saw a few dozen `01`/`10` counts out of several thousand shots, that is not evidence your circuit is wrong, not evidence of a bug in your code, and not something to "fix" by rewriting the circuit. It's the expected fingerprint of genuine gate error and measurement (readout) error accumulating on physical qubits.

The question to ask when you see this isn't "what did I do wrong" — it's "is this noise level consistent with what I'd expect from this backend, and is it small enough that my results are still usable, or do I need error mitigation to clean it up." That question is exactly what Chapter 7 is about.

## Key terms

| Term | Meaning |
|---|---|
| Depolarizing noise model | A noise model where a gate is corrupted toward a fully mixed state with some probability `p`, used here to approximate real hardware error |
| "Impossible" outcome | A measurement result with exact probability 0 under ideal, noiseless math (here, `01`/`10` for a Bell state) |
| Noise signature | The pattern of nonzero counts appearing on outcomes that ideal simulation says should never occur |
| Readout error | Measurement-stage error on real hardware, one contributor (along with gate error) to the noise signature described above |
| Error mitigation | Techniques (Chapter 7) for reducing the impact of exactly this kind of real-hardware noise on your results |

## Check yourself

You run the Bell-state circuit on real hardware and get back `{'00': 2005, '11': 2003, '01': 35, '10': 53}` out of 4096 shots. A teammate says this proves there's a bug in the circuit because `01` and `10` should never appear. Using what you learned about depolarizing noise and the real diagnostic signature of hardware error, explain whether your teammate is right, and what you'd actually want to check instead.
