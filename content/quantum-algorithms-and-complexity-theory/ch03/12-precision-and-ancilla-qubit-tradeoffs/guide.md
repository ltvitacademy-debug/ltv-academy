# Precision & Ancilla-Qubit Tradeoffs

Lesson 11's worked example was the easy case — θ landed exactly on the grid. Real phases almost never do. This lesson is the honest version: what phase estimation actually returns when θ doesn't fit neatly into n bits, and what it costs to fix that.

## What you'll learn

- Why n counting qubits give θ to resolution 1/2ⁿ, and what that resolution actually means
- Why going from n to n+1 bits of precision doubles the *largest* power of U you must apply, not just adds one more use of U
- The non-exact worked example: θ = 0.3, n = 3, with the full 8-outcome probability spread
- The standard formula for how many extra counting qubits guarantee a given success probability
- Why that extra-qubit padding is exactly what tames the spread seen in the worked example

## The core tradeoff

With n counting qubits, phase estimation's measurement outcomes are the N = 2ⁿ values k/N for k = 0, …, N−1 — an evenly spaced grid on [0, 1) with spacing 1/2ⁿ. That spacing is the circuit's **resolution**: it is structurally impossible to report an estimate finer than 1/2ⁿ, no matter how the measurement comes out, because there are only 2ⁿ possible outcomes to begin with.

Getting more resolution costs more than one extra qubit's worth of circuitry. Recall from Lesson 11 that counting qubit k controls U^(2^k). Going from n to n+1 counting qubits means the new top qubit (index n) must control U^(2ⁿ) — the **largest power of U required doubles** every time you add one bit of precision. Ten bits of precision needs U^512 as your largest controlled operation; eleven bits needs U^1024. This is the central resource cost of phase estimation: precision is cheap to *ask for*, but exponentially expensive to *buy*, because applying U many times in sequence (to realize U^(2^k) as repeated single applications, when no shortcut exists) scales exponentially in the number of precision bits.

## Worked example: θ = 0.3, n = 3 counting qubits

θ = 0.3 is not exactly representable in binary with any finite number of bits — it's an infinitely repeating binary fraction. With n = 3 counting qubits, N = 2³ = 8 possible outcomes, corresponding to estimates k/8 for k = 0..7. Running the exact measurement-probability calculation for this circuit gives:

| k | Estimate (k/8) | Probability |
|---|---|---|
| 0 | 0.000 | 0.021593 |
| 1 | 0.125 | 0.051768 |
| 2 | 0.250 | **0.577521** |
| 3 | 0.375 | 0.259336 |
| 4 | 0.500 | 0.040907 |
| 5 | 0.625 | 0.019440 |
| 6 | 0.750 | 0.014487 |
| 7 | 0.875 | 0.014948 |

θ = 0.3 sits between the grid points k=2 (0.25, distance 0.05) and k=3 (0.375, distance 0.075) — closer to k=2. And indeed, k=2 is the single most likely outcome, at 57.75%. But it is nowhere close to certain: k=3, the second-nearest grid point, still gets 25.93% of the probability, and the remaining six outcomes soak up the rest. This spread is the honest signature of imprecision: whenever θ doesn't land exactly on the 1/2ⁿ grid, phase estimation becomes genuinely probabilistic, concentrating most — but not all — of its probability on the nearest representable value. Compare this directly to Lesson 11's θ = 1/4 example, where landing exactly on the grid gave a single outcome with probability 1.0 and zero everywhere else; that was the special case, not the norm.

## Taming the spread: the standard error bound

Quantum algorithms textbooks (this result is standard — see Nielsen & Chuang's treatment of phase estimation) give a precise way to control this spread. To guarantee an estimate correct to **m bits** of precision with success probability at least **1 − ε**, you don't use exactly m counting qubits — you pad with extra qubits:

**n = m + ⌈log₂(2 + 1/(2ε))⌉**

The extra qubits beyond m don't add precision you report — they absorb exactly the kind of probability leakage shown in the θ = 0.3 example above, pushing it down into outcomes you discard, so that the m bits you *do* report are correct with the probability you asked for. This is the formal version of the intuition the worked example already demonstrated by hand: more counting qubits sharpen the peak around the nearest grid point and shrink the leakage into neighboring outcomes like k=3's 25.93%.

## Key terms

| Term | Meaning |
|---|---|
| Resolution | The spacing 1/2ⁿ between adjacent representable estimates with n counting qubits |
| Probability leakage | Measurement probability landing on outcomes other than the nearest grid point to θ, caused by θ not being exactly representable |
| Ancilla (counting) qubits | Qubits used to store the phase estimate, separate from the eigenvector register |
| Success probability bound | The guarantee 1 − ε that the reported m-bit estimate is correct, achieved by using n = m + ⌈log₂(2 + 1/(2ε))⌉ counting qubits |

## Check yourself

In the θ = 0.3, n = 3 example, k = 2 (estimate 0.25) is the single most likely outcome at 57.75%, even though θ = 0.3 is not that close to 0.25 in absolute terms. Explain why this is still the "correct" value for the algorithm to be most likely to report, given that only 8 discrete estimates are possible at this precision — and what adding more counting qubits would do to that 57.75% figure.
