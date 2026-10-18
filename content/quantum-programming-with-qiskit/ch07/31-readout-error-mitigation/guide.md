# Readout Error Mitigation

Gate error corrupts the quantum state before you ever measure it — once that's happened, the damage is baked in. Readout error is different: the state itself might be fine, but the classical measurement hardware misreports it some fraction of the time. Because that misreporting follows a known statistical pattern, it can actually be corrected after the fact.

## What you'll learn

- Why readout error is correctable in a way gate error is not
- How a calibration matrix captures a device's measurement confusion pattern
- The exact linear-algebra mechanism behind readout error correction: inverting the calibration matrix
- Why hand-built calibration matrices don't scale, and what real tools replace them

## The calibration matrix

Suppose you characterize a qubit's readout behavior by preparing it in a known state and seeing what gets measured. You can summarize the result as a confusion matrix M, where M[i][j] = P(measured i | prepared j):

```
M = [[0.98, 0.03],
     [0.02, 0.97]]
```

Read this column by column: when the qubit is truly prepared in state 0, you measure 0 98% of the time and 1 2% of the time (column 0: `[0.98, 0.02]`). When truly prepared in state 1, you measure 1 97% of the time and 0 3% of the time (column 1: `[0.03, 0.97]`). This matrix is a complete statistical description of how the readout hardware distorts a true distribution into an observed one.

## From true probabilities to observed probabilities

If the circuit you're actually running — say, a Hadamard gate putting the qubit into an equal superposition — produces true underlying probabilities P(0) = 0.5 and P(1) = 0.5, the noisy readout doesn't report those numbers directly. It reports M applied to the truth vector:

```
observed = M · truth
         = [[0.98, 0.03],   [0.5]   [0.505]
            [0.02, 0.97]] · [0.5] = [0.495]
```

So instead of the true 50/50 split, you'd observe P(0) = 0.505 and P(1) = 0.495 — a small but real distortion purely from imperfect measurement, even though the quantum state itself was exactly what you intended.

## Correcting it: multiply by the inverse

Here's the key insight that makes readout error mitigation possible: because the distortion is a known, fixed linear transformation, you can undo it by applying the inverse matrix to whatever you observe. For the M above, det(M) = 0.95, and the exact inverse is:

```
M⁻¹ = [[ 1.021053, -0.031579],
       [-0.021053,  1.031579]]
```

Applying M⁻¹ to the observed vector `[0.505, 0.495]` recovers `[0.5, 0.5]` exactly (within floating-point rounding) — the true distribution, fully restored. This is the real mechanism behind readout error mitigation in one line: `corrected = M⁻¹ · observed`. It works because readout error, unlike gate error, happens *after* the quantum computation is complete — it's a classical post-processing distortion on data you already have, and classical distortions with known statistics can be inverted.

## A more realistic picture: shot noise complicates it

In practice you never observe the exact probabilities above — you observe sampled counts. A seeded simulated draw of that same noisy distribution at 4096 shots gives `{'0': 2041, '1': 2055}`, which as fractions is about 0.498/0.502 rather than exactly 0.505/0.495 — additional shot noise layered on top of the readout bias. Applying M⁻¹ to these sampled fractions gives a corrected estimate of roughly [0.4929, 0.5071] — close to the true [0.5, 0.5], but not exact.

This is an important, honest caveat: readout mitigation corrects the *systematic bias* introduced by the known confusion matrix, but it does not eliminate the *statistical* shot noise from a finite number of measurements — and because matrix inversion can amplify small input variations, the correction step can even make the statistical noise component slightly larger than it was in the raw observed data. Mitigation improves your estimate; it doesn't produce a noise-free answer.

## Why this doesn't scale by hand — and what does

A single qubit needs only a 2×2 calibration matrix. But the matrix grows as 2ⁿ × 2ⁿ for n qubits, so by even a handful of qubits, building and inverting it by hand is impractical. Real workflows don't do this manually. The `qiskit-experiments` package provides characterization experiments — `LocalReadoutError` and `CorrelatedReadoutError` — that measure and build these calibration matrices for you. For larger qubit counts on real IBM hardware, the dedicated `mthree` (Matrix-free Measurement Mitigation) package is the widely used production tool, designed specifically to make readout correction tractable at scale without ever forming the full exponential-size matrix explicitly.

## Key terms

| Term | Meaning |
|---|---|
| Calibration/confusion matrix | A matrix M where M[i][j] = P(measured i \| prepared j), summarizing a device's readout error pattern |
| `corrected = M⁻¹ · observed` | The core linear-algebra operation behind readout error mitigation |
| Systematic bias | The known, correctable distortion introduced by imperfect readout |
| Shot noise | Statistical sampling variation from a finite number of shots, which mitigation does not eliminate and can slightly amplify |
| `LocalReadoutError` / `CorrelatedReadoutError` | `qiskit-experiments` characterization experiments that build real calibration matrices |
| `mthree` | Matrix-free Measurement Mitigation package used in production to scale readout correction past a few qubits |

## Check yourself

Readout error mitigation uses `corrected = M⁻¹ · observed` to recover the true distribution exactly when you apply it to the exact observed probabilities, but only approximately when you apply it to sampled shot counts. Why does that gap appear, and what does it tell you about what readout mitigation can and can't fix?
