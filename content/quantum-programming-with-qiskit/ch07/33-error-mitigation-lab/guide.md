# Error Mitigation Lab

You've now seen three pieces of the error mitigation picture separately: noise models that simulate imperfection, readout correction that undoes measurement bias, and zero-noise extrapolation that estimates an unreachable ideal value. This lab puts them to work together on the same numbers, so the connections between them stop being abstract.

## What you'll learn

- How to reason about whether an observed error looks like gate error or readout error — and why you often can't tell from counts alone
- How to re-apply the exact readout-correction arithmetic from the previous lesson to a fresh observed distribution
- How to re-run the ZNE linear-extrapolation arithmetic and state clearly what it did and didn't recover
- Why every technique in this chapter improves an estimate after the fact, rather than removing the underlying hardware noise

## Part 1: Can you tell gate error from readout error by looking at the counts?

Recall the noisy measurement from the noise-models lesson: a qubit prepared in `|0⟩`, with a 2% bit-flip-style error injected immediately before measurement, gave a seeded 1024-shot result of `{'0': 1000, '1': 24}` — an observed error rate of about 2.34% against a true injected rate of 2%.

Here's the question worth sitting with: that error was injected as a *gate-level* X-error right before measurement. But if you only had the counts `{'0': 1000, '1': 24}` in front of you, with no notes about how the noise model was constructed, could you tell that it came from a gate error rather than from the measurement hardware itself misreporting a perfectly prepared `|0⟩`? For a single qubit measured once per shot, the answer is no — a gate error applied immediately before measurement and a pure readout error produce statistically indistinguishable count distributions. This is a genuinely important practical point, not just a technicality: distinguishing the two requires a separate characterization experiment (like the `LocalReadoutError` experiments from the readout-mitigation lesson) that isolates the measurement step from the rest of the circuit. You cannot reliably diagnose *where* an error came from using only the final counts of a single circuit.

## Part 2: Re-applying the readout correction matrix

Take the calibration matrix from the readout-mitigation lesson:

```
M = [[0.98, 0.03],
     [0.02, 0.97]]

M⁻¹ = [[ 1.021053, -0.031579],
       [-0.021053,  1.031579]]
```

Pick a fresh observed vector of your own choosing — it doesn't need to come from a real run; the point of this exercise is the arithmetic. For example, try observed = [0.60, 0.40]:

```
corrected = M⁻¹ · observed
          = [1.021053·0.60 + (−0.031579)·0.40,  −0.021053·0.60 + 1.031579·0.40]
          = [0.612632 − 0.012632,  −0.012632 + 0.412632]
          = [0.600000, 0.400000]
```

Work through the multiplication yourself with a vector you pick, and confirm two things: the two corrected values still sum to 1 (as any valid probability distribution must), and the correction shifts your observed numbers in a sensible direction relative to what the calibration matrix says about the device's bias. If your corrected values don't sum to 1 or move in a nonsensical direction, that's a sign of an arithmetic slip, not a sign the method is broken.

## Part 3: Re-running the ZNE extrapolation

From the ZNE lesson, the deliberately linear teaching model gave:

- λ=1: E = 0.72
- λ=2: E = 0.64

Extrapolating: E(0) = 2·E(1) − E(2) = 2(0.72) − 0.64 = 0.80, exactly recovering the ideal value in this constructed example. Walk through the same computation using λ=1 and λ=3 (E(3) = 0.56) instead: E(0) = (3·E(1) − E(3)) / 2 = (3(0.72) − 0.56) / 2 = (2.16 − 0.56) / 2 = 0.80. Same answer, different pair of points — which is exactly what you'd expect from data that's exactly linear by construction.

## The point of the exercise: mitigation improves, it doesn't eliminate

Step back and notice what each technique actually did. Readout correction didn't make the hardware's measurement stop misreporting outcomes — it used a known bias pattern to recover a better estimate of the truth from biased data, and that recovery degrades once real shot noise is layered on top (as the readout-mitigation lesson showed with the 4096-shot example landing near, but not exactly at, [0.5, 0.5]). ZNE didn't make the real circuit run with less noise — it ran the circuit at *more* noise, deliberately, and used the resulting trend to estimate a point it never actually touched. In both cases, you're squeezing a better answer out of multiple imperfect measurements after the fact. The underlying hardware noise is still there on every real run; what changes is how much of it survives into your final reported number.

## Key terms

| Term | Meaning |
|---|---|
| Observational indistinguishability | When two different underlying causes (here, gate error vs. readout error) produce statistically identical counts |
| Characterization experiment | A dedicated experiment (e.g. `LocalReadoutError`) designed to isolate and measure one specific error source |
| `corrected = M⁻¹ · observed` | The readout-correction arithmetic reapplied to a fresh observed distribution |
| Linear ZNE extrapolation | `E(0) = 2·E(1) − E(2)`, consistent across different point pairs when the underlying data is exactly linear |
| Mitigation (vs. correction of hardware) | Improving a reported estimate using known error structure, without changing or removing the actual physical noise on the device |

## Check yourself

Using only the final measurement counts from a single circuit, you cannot tell whether an observed error came from a gate acting right before measurement or from the readout hardware itself. Given that, what would you actually need to run — beyond this one circuit — to determine which source is responsible, and why does that extra step work when the counts alone don't?
