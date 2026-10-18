# Training a Quantum Neural Network

Training a multi-layer QNN uses the exact same ingredients as training the single-parameter circuit from the Chapter 2 lab — it's the same loop, just with more parameters to track simultaneously. This lesson works through what changes (and what doesn't) when you scale the training loop up.

## What you'll learn

- Why training a QNN is "the same loop, more parameters," not a different algorithm
- How the parameter-shift rule extends to multi-parameter circuits, with a worked 2-parameter example
- What a full-batch vs. mini-batch training distinction means for a QNN, and why shot noise adds a QML-specific wrinkle
- How to track a multi-parameter training run using a loss curve, and what warning signs in that curve mean

## Same loop, more parameters

Lesson 9's lab trained one parameter, θ, using: evaluate circuit → compute loss → compute gradient via parameter-shift → update θ. A QNN with k trainable parameters (θ₁, θ₂, ..., θₖ) follows the identical loop — the only change is that step 3 now needs k separate parameter-shift evaluations (as noted in Lesson 7: 2k total circuit evaluations for one full gradient), and step 4 updates every parameter simultaneously using its own piece of the gradient.

## Multi-parameter parameter-shift, worked example

Take a 2-parameter circuit where the cost function happens to separate cleanly as f(θ₁, θ₂) = cos(θ₁) + sin(θ₂) (a simplified illustrative case — in a real entangled circuit the parameters wouldn't separate this cleanly, but the shift-rule mechanics per parameter are identical regardless).

**Gradient w.r.t. θ₁** (holding θ₂ fixed, shifting only θ₁ by ±π/2): at θ₁ = π/4, this is exactly Lesson 7's calculation pattern — [cos(π/4 + π/2) − cos(π/4 − π/2)] / 2. Using cos(π/4) ≈ 0.7071: cos(3π/4) ≈ −0.7071 and cos(−π/4) ≈ 0.7071, so the gradient ≈ (−0.7071 − 0.7071)/2 = **−0.7071**, matching the calculus derivative −sin(π/4) ≈ −0.7071.

**Gradient w.r.t. θ₂** (holding θ₁ fixed, shifting only θ₂): at θ₂ = π/4, using the shift rule on sin(θ₂): [sin(π/4 + π/2) − sin(π/4 − π/2)]/2. sin(3π/4) ≈ 0.7071, sin(−π/4) ≈ −0.7071, so gradient ≈ (0.7071 − (−0.7071))/2 = **0.7071**, matching the calculus derivative cos(π/4) ≈ 0.7071.

**Update both parameters simultaneously** with learning rate η = 0.3: θ₁_new = π/4 − 0.3×(−0.7071) ≈ 0.7854 + 0.2121 = **0.9975**; θ₂_new = π/4 − 0.3×(0.7071) ≈ 0.7854 − 0.2121 = **0.5733**. Both parameters move in their own gradient-determined direction, independently, in the same update step.

## Full-batch vs. mini-batch, and the shot-noise wrinkle

Classical ML commonly trains on mini-batches (a random subset of training data per step) for computational efficiency and to add helpful stochasticity. QNN training can do the same — compute the loss and gradient using only a handful of training samples per step rather than the whole dataset. But there's a QML-specific added complication: even for a *single* data sample, the expectation value ⟨Z⟩ measured on real hardware (or a shot-based simulator) is itself a statistical estimate from a finite number of circuit repetitions ("shots"), not an exact number. More shots per evaluation reduce this measurement noise but cost more time/money; fewer shots are cheaper but add noise directly into the already-approximate parameter-shift gradient. This is an additional noise source that classical ML training simply doesn't have, stacking on top of (and sometimes compounding) the barren-plateau gradient-vanishing problem from Lesson 8 — a near-zero true gradient is especially hard to detect reliably when it's also buried in shot noise.

## Reading a loss curve

A healthy multi-parameter training run shows a loss curve that decreases over iterations, generally with some noise (especially if using shot-based or mini-batch estimates) but a clear downward trend. Warning signs to watch for:

- **Flat from the very first iteration**: likely a barren plateau (Lesson 8) — the gradient was never informative, not that training "finished early."
- **Noisy with no downward trend at all**: shot noise or learning rate may be overwhelming a genuinely weak but nonzero signal — worth trying more shots per evaluation or a smaller learning rate before concluding it's a true plateau.
- **Decreasing then suddenly diverging (loss spikes upward)**: often a learning rate that's too large for the local curvature of the loss landscape.

## Key terms

| Term | Meaning |
|---|---|
| Shot noise | Statistical noise in an expectation-value measurement arising from a finite number of circuit repetitions |
| Mini-batch training | Computing loss/gradient on a random subset of training data per step rather than the full dataset |
| Loss curve | A plot of the loss value across training iterations, used to diagnose whether training is converging, stalled, or diverging |

## Check yourself

A QNN's loss curve is flat and near-constant from iteration 1, using only 50 shots per circuit evaluation. Name two different, genuinely distinct explanations consistent with this observation, and describe one concrete experiment that would help distinguish between them.
