# Classical Parameter Optimization in QAOA

A QAOA circuit with badly chosen angles is nearly useless — Lesson 6 already showed the same circuit swing from a perfect expected cost of 1.0 down to roughly half that from angle choice alone. This lesson is about the classical algorithm sitting outside the quantum computer whose entire job is to find good angles, and about being honest that this subproblem is harder than it first looks.

## What you'll learn

- The hybrid loop: how a classical optimizer and a quantum circuit trade information
- Why gradient-free optimizers (not gradient descent) are the default choice here
- A concrete, directly-computed comparison of poor vs. optimized angles
- What a "barren plateau" is and why it's an honest, documented limitation at scale
- How the search for good (γ, β) connects forward to depth and approximation quality (Lesson 9)

## The hybrid loop, concretely

Each iteration of QAOA parameter optimization looks like this:

1. The classical optimizer proposes a candidate (γ, β) — or (γ_1,...,γ_p, β_1,...,β_p) for depth p.
2. The quantum circuit (real hardware or simulator) is run many times with those angles, and the measured bitstrings are used to estimate ⟨H_C⟩, the expected cost.
3. The classical optimizer looks at that single number (and, for some methods, nearby estimates) and proposes an improved candidate.
4. Repeat until the optimizer converges or a budget of circuit evaluations runs out.

The quantum computer never sees the full picture — it only ever answers "what's the expected cost at this one (γ,β)?" All the actual *searching* happens classically.

## Why gradient-free optimizers

You might expect gradient descent, given how central it is to classical machine learning. But computing a gradient of ⟨H_C⟩ with respect to γ or β exactly would require evaluating the circuit at carefully shifted parameter values (a method called the "parameter-shift rule"), doubling the number of quantum circuit evaluations per parameter, per iteration. For a modest p=5 circuit (10 parameters), that's 20 extra circuit evaluations just for one gradient step. Combined with the fact that real quantum hardware measurements are noisy (so a "gradient" estimated from noisy single-shot statistics is itself noisy), many practical QAOA implementations instead use **gradient-free classical optimizers** — COBYLA, Nelder-Mead, or SPSA (Simultaneous Perturbation Stochastic Approximation) are the most common — which only need the raw expected-cost value, not its derivative, and tend to be more robust to measurement noise.

## A concrete before/after comparison

Return to the single-edge Max-Cut circuit from Lesson 6. At the poorly chosen starting point γ = 0.1, β = 0.1, direct simulation gives an expected cost of **≈0.519** — barely better than the problem's average cost over all four basis states (which is 0.5, since two of the four give cost 1 and two give cost 0). A classical optimizer starting there has a lot of room to improve. Scanning the full (γ, β) landscape directly (the same exhaustive search used in Lesson 6) finds the true optimum at γ = π/2 ≈ 1.571, β = π/8 ≈ 0.393, giving expected cost exactly **1.0** — the maximum possible. That's the entire job of the classical optimizer: start somewhere mediocre like (0.1, 0.1) and iteratively climb to somewhere like (1.571, 0.393), using only expected-cost measurements as its guide, with no access to the underlying quantum state itself.

For the larger 4-cycle Max-Cut problem (Lesson 9 covers this in depth), the same style of search — a coarse grid followed by local coordinate-wise refinement — found a depth-2 (p=2) optimum of expected cost ≈3.9998 out of a true maximum of 4, at parameters (γ_1≈1.563, β_1≈0.397, γ_2≈0.793, β_2≈0.782), starting from a much rougher grid estimate of ≈3.932. That refinement step — going from "good" to "very close to optimal" — is exactly the kind of local polishing a classical optimizer contributes on top of a rough initial scan.

## Barren plateaus: an honest limitation

As problem size (qubit count) and circuit depth grow, a well-documented phenomenon called a **barren plateau** can appear: the landscape of ⟨H_C⟩ as a function of the parameters becomes exponentially flat almost everywhere, except in small regions near good solutions. When this happens, gradient-based and even many gradient-free optimizers struggle to find any improving direction at all — most random starting points look equally (and uninformatively) mediocre, because the signal that would guide the optimizer toward better parameters is swamped by this flatness. This isn't a solved problem; it's an active research area, and it's one of the concrete, honest reasons (alongside the ones in Chapter 5) that scaling QAOA to large, industrially-sized problems remains unproven rather than a matter of "just add more qubits."

## Key terms

| Term | Meaning |
|---|---|
| Hybrid loop | The cycle of a classical optimizer proposing parameters and a quantum circuit evaluating expected cost at those parameters |
| Gradient-free optimizer | An optimization method (COBYLA, Nelder-Mead, SPSA) that only needs function values, not derivatives, often more robust to measurement noise |
| Parameter-shift rule | A method for computing exact gradients of a quantum circuit's output by evaluating the circuit at shifted parameter values |
| Barren plateau | A region (or landscape) where the cost function's gradient becomes exponentially small almost everywhere, making optimization extremely difficult at scale |
| Expected cost ⟨H_C⟩ | The quantity a classical optimizer is trying to extremize, estimated from repeated measurements of the quantum circuit |

## Check yourself

The lesson showed that scanning the single-edge circuit's full (γ, β) landscape exhaustively found the true optimum. For a real depth-5 (p=5) QAOA circuit with 10 parameters, explain why this same "exhaustively scan every combination" strategy becomes impractical, and why that impracticality is exactly the reason classical optimizers (rather than brute-force grid search) are used in practice.
