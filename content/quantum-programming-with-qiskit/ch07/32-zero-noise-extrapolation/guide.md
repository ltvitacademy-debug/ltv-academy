# Zero-Noise Extrapolation

Readout error mitigation corrects a known distortion in the measurement step. But what about error that accumulates during the circuit itself, from imperfect gates? You can't run a circuit with "zero noise" on real hardware to see what the ideal answer would have been — but you can estimate it, using a technique called zero-noise extrapolation.

## What you'll learn

- The core idea behind Zero-Noise Extrapolation (ZNE): deliberately amplify noise, then extrapolate back
- How gate folding artificially scales noise without changing the circuit's ideal computation
- The exact linear extrapolation arithmetic, worked through with real numbers
- Why real hardware noise scaling is usually only approximately linear, and what tools handle this in production

## The core idea: measure at amplified noise, extrapolate to zero

You can never run your circuit at literally zero noise on real hardware — the noise is a physical property of the device, not a dial you can turn down past its current setting. But you *can* deliberately run the same circuit with *more* noise than normal, in a controlled, repeatable way. If you measure your result at a few different noise levels and the pattern is predictable, you can fit a curve through those noisy data points and extrapolate backward to what the result would have been at zero noise — a point you never actually visited.

The noise-scale factor is usually called λ: λ = 1 means the circuit's normal, unamplified noise level; λ = 2 means twice the effective noise; λ = 3 means triple, and so on.

## Gate folding: how you actually amplify noise

The standard way to scale up noise without changing what the circuit ideally computes is gate folding: take a gate G and replace it with G followed by its inverse G⁻¹ followed by G again. Mathematically, G·G⁻¹·G is exactly equivalent to G — the extra pair cancels out perfectly in the ideal, noiseless case. But on real hardware, each of those three gate executions carries its own real error, so the effective error accumulated over the folded sequence is roughly triple what a single G would have contributed. Folding every gate once this way triples the effective noise (λ = 3) while leaving the ideal, intended computation completely unchanged.

## Working the extrapolation by hand

To see exactly how the extrapolation step works, consider a deliberately simple teaching model where the noisy expectation value scales exactly linearly with λ: E(λ) = E_ideal + slope·λ, with E_ideal = 0.80 and slope = −0.08. This gives:

- λ=1: E = 0.72
- λ=2: E = 0.64
- λ=3: E = 0.56

You run the circuit at λ=1 and λ=2 (normal, and gate-folded to double noise) and get those two noisy measurements. A straight line through those two points, extrapolated back to λ=0, is computed as:

```
E(0) = 2·E(1) − E(2) = 2(0.72) − 0.64 = 0.80
```

That recovers the true ideal value exactly — 0.80. It's worth checking that this isn't a coincidence of which two points you pick: using λ=1 and λ=3 instead gives the same linear extrapolation back to exactly 0.80. Because this teaching example was constructed to be exactly linear, the hand arithmetic recovers the ideal value precisely, with no residual error from the fit itself.

## The honest caveat: real hardware usually isn't exactly linear

This linear relationship was built into the example on purpose, specifically so the arithmetic above is fully checkable by hand. Real hardware noise scaling is often only *approximately* linear, and for larger λ the real decay frequently looks closer to exponential. In practice, a linear fit is a reasonable first approximation at small λ, but production tools more often use a Richardson extrapolation or an exponential fit, chosen based on how the measured data actually behaves across the noise-scale factors you tested.

## What production tooling actually does this

You don't typically hand-roll gate folding and curve fitting. The `mitiq` library is a dedicated error-mitigation toolkit built to work directly with Qiskit circuits, implementing ZNE (and other mitigation techniques) with a choice of folding strategies and extrapolation fits. On real IBM hardware specifically, `qiskit-ibm-runtime`'s `EstimatorV2` primitive exposes a `resilience_level` option that can apply ZNE automatically as part of running your circuit, without you managing the folding and fitting steps by hand.

## Key terms

| Term | Meaning |
|---|---|
| Zero-Noise Extrapolation (ZNE) | Technique that measures a result at several artificially amplified noise levels and extrapolates back to the unreachable zero-noise point |
| Noise-scale factor (λ) | A multiplier on effective noise; λ=1 is normal, λ=2 is doubled, λ=3 is tripled |
| Gate folding | Replacing gate G with G·G⁻¹·G to triple effective hardware error while leaving the ideal computation unchanged |
| Linear extrapolation | `E(0) = 2·E(1) − E(2)`, used here as a deliberately simple, hand-checkable teaching model |
| Richardson extrapolation | A more general extrapolation approach used in practice when noise scaling isn't cleanly linear |
| `resilience_level` | `EstimatorV2` option on `qiskit-ibm-runtime` that can apply ZNE automatically on real hardware |

## Check yourself

The linear extrapolation in this lesson recovers the true ideal value of 0.80 exactly from measurements taken at λ=1 and λ=2. Why was the underlying noise model deliberately built to be exactly linear for this lesson, and what would you expect to happen to the accuracy of a linear extrapolation if the real hardware's noise scaling were closer to exponential instead?
