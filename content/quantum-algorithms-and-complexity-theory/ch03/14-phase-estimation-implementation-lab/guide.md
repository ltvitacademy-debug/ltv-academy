# Phase Estimation Implementation Lab

Time to work both chapter examples by hand, start to finish, with no new numbers introduced — just the ones already verified in Lessons 11 and 12, traced through carefully enough that you could reproduce them yourself.

## What you'll learn

- How to re-derive the exact-phase result (θ = 1/4, n = 2) from the circuit structure, not just quote it
- How to read the full 8-outcome probability table for the non-exact case (θ = 0.3, n = 3) and explain every feature of it
- Why reporting the single most probable outcome is the right move even when it isn't "the" true θ
- How to reason qualitatively about what more counting qubits would do, without inventing new simulated numbers

## Trace 1: the exact case, θ = 1/4, n = 2

Set up the circuit from Lesson 11: 2 counting qubits, target register in eigenstate |ψ⟩ with U|ψ⟩ = e^(2πi/4)|ψ⟩. Step through it:

1. **Hadamards** put the 2 counting qubits into a uniform superposition of all 4 basis states |00⟩, |01⟩, |10⟩, |11⟩.
2. **Controlled-U^(2^k)**: qubit 0 controls U¹, qubit 1 controls U². Phase kickback (Lesson 11's algebra) writes θ·2^k into each qubit's own phase, building the joint state (1/2)Σ_{x=0}^{3} e^(2πi·x/4)|x⟩.
3. **Inverse QFT** decodes that phase-encoded state.
4. **Measurement** gives the result.

Because θ = 1/4 = 0.01 in binary — exactly 2 bits — this state decodes with zero leftover interference. The verified measurement probabilities are:

**P(k=0) = 0.000000, P(k=1) = 1.000000, P(k=2) = 0.000000, P(k=3) = 0.000000**

Outcome k = 1 (estimate 1/4) is certain. There is nothing probabilistic to report here — this is the deterministic limit of the algorithm, and it's deterministic *because* θ sits exactly on the n = 2 grid {0, 1/4, 1/2, 3/4}.

## Trace 2: the non-exact case, θ = 0.3, n = 3

Now the realistic case. θ = 0.3 cannot be written exactly in any finite number of binary digits, so no setting of n makes this circuit deterministic. With n = 3, N = 8 possible outcomes, the verified full probability table is:

| k | Estimate (k/8) | Probability |
|---|---|---|
| 0 | 0.000 | 0.021593 |
| 1 | 0.125 | 0.051768 |
| 2 | 0.250 | 0.577521 |
| 3 | 0.375 | 0.259336 |
| 4 | 0.500 | 0.040907 |
| 5 | 0.625 | 0.019440 |
| 6 | 0.750 | 0.014487 |
| 7 | 0.875 | 0.014948 |

Check that this is a valid probability distribution: the eight values sum to 1 (as they must, since measurement must produce exactly one of the 8 outcomes). Read the shape of the table: probability is concentrated near θ = 0.3, peaking at k = 2 (estimate 0.25, the nearest grid point, distance 0.05) at 57.75%, with a secondary peak at the next-nearest grid point k = 3 (estimate 0.375, distance 0.075) at 25.93%, and the remaining ~16.5% spread thinly across the other six outcomes, roughly falling off with distance from θ.

**Why k = 2 is still the right answer to report:** with only 8 discrete estimates available at n = 3, "the nearest representable value to θ" is the best any single measurement outcome can be. k = 2 is the single most likely outcome by a wide margin (more than double the next-most-likely), and it is also the value closest to the true θ = 0.3. Reporting it isn't claiming θ is exactly 0.25 — it's reporting the best n = 3-bit estimate, honestly, with the caveat (carried from Lesson 12) that any individual run has real odds of returning a neighboring outcome instead.

## Exercise: what if you wanted >90% confidence?

Suppose you have θ = 0.3 and want the probability of measuring the single nearest outcome to exceed 90%, rather than the 57.75% seen at n = 3. Reasoning only from Lesson 12's tradeoff (don't invent a new simulated number here — none was verified for this question): increasing n sharpens the distribution around the nearest grid point, for two compounding reasons. First, a larger n puts a finer grid point closer to the true θ = 0.3 to begin with, shrinking the "miss distance" that causes leakage in the first place. Second, Lesson 12's formula n = m + ⌈log₂(2 + 1/(2ε))⌉ makes the relationship exact: to push ε (the failure probability) down toward 10% or lower, you need to add a handful of extra counting qubits beyond your target precision m — and each extra qubit roughly doubles the largest controlled-U power required, which is exactly the resource cost Lesson 12 flagged as the price of that higher confidence. The qualitative takeaway: more counting qubits is the only lever available, it reliably sharpens the peak, and it comes at the exponential-in-n cost already established — there is no way to get that confidence boost for free.

## Key terms

| Term | Meaning |
|---|---|
| Deterministic outcome | A measurement result with probability exactly 1, occurring when θ lands exactly on the n-bit grid |
| Probability table | The full list of P(k) for all 2^n possible measurement outcomes, which must sum to 1 |
| Miss distance | How far the true θ is from the nearest representable grid point k/2^n |
| Nearest-outcome probability | The probability assigned to the single grid point closest to the true θ; what more counting qubits sharpens |

## Check yourself

Using only the θ = 0.3, n = 3 probability table above, explain why P(k=3) = 0.259336 is so much larger than P(k=4) through P(k=7) combined, even though k = 3 is not the nearest grid point to θ = 0.3. What does this tell you about how probability falls off with distance from the true phase in this circuit?
