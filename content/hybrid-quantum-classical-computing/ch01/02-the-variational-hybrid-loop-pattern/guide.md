# The Variational Hybrid Loop Pattern

Almost every near-term quantum algorithm you'll deploy — VQE for chemistry, QAOA for optimization, variational quantum classifiers — is the same loop with different labels on the boxes. Learn this one pattern well and you can read, debug, and build the engineering around any of them.

## What you'll learn

- The exact sequence of steps in the variational hybrid loop, and which steps are classical vs. quantum
- Why the loop needs a classical optimizer at all, and what it's optimizing
- How to compute the number of QPU calls a loop will make before you run it
- Why this pattern is simulated on a classical computer during development, and only run on real hardware late
- How convergence criteria stop the loop without wasting QPU budget

## The loop, step by step

![A real parameterized circuit from IBM Quantum](/courses/hybrid-quantum-classical-computing/ch01/02-the-variational-hybrid-loop-pattern/ibm-bell-circuit.svg)
*The circuit gets rebuilt with new parameters θ every iteration — only this one step touches a QPU.*

```
 1. Classical: initialize parameters θ (e.g., random or from a prior run)
 2. Classical: build circuit(θ) and submit to the quantum backend
 3. Quantum:   execute circuit(θ) for N shots, return measurement counts
 4. Classical: compute cost function value C(θ) from the counts
                (e.g., the expectation value of a Hamiltonian)
 5. Classical: optimizer proposes new parameters θ' based on C(θ)
 6. Classical: check convergence (|C(θ) - C(θ_prev)| < tolerance, or max
                iterations reached) -- if not converged, θ = θ', go to step 2
 7. Classical: return final θ and C(θ) as the result
```

Steps 1, 2, 4, 5, 6, 7 are classical. Only step 3 touches the QPU. This is the concrete version of the previous lesson's claim: the "quantum part" of a variational algorithm is one line in a loop that is otherwise ordinary classical control flow and numerical optimization.

![Real expectation-value output from IBM Quantum](/courses/hybrid-quantum-classical-computing/ch01/02-the-variational-hybrid-loop-pattern/ibm-expectation-values-plot.svg)
*Real output of step 4's cost computation — the number the optimizer actually receives back.*

## What the classical optimizer is actually doing

The optimizer (COBYLA, SPSA, Nelder-Mead, or a gradient-based method using the parameter-shift rule) treats `C(θ)` as a black-box function it can query — it has no access to the quantum state, only the number that comes back from step 4. Its job is the same as optimizing any noisy, expensive-to-evaluate function: propose a new `θ'` that's likely to lower `C`, using as few evaluations as possible, because every evaluation costs money and queue time on real hardware.

This is why the choice of optimizer matters more in hybrid quantum workflows than it typically does in classical ML: a gradient-based method using the parameter-shift rule needs **2 circuit evaluations per parameter per iteration** (one shifted up, one shifted down) just to estimate one gradient component, on top of the 1 evaluation for the cost itself. A gradient-free method like SPSA needs only 2 evaluations total per iteration regardless of parameter count, at the cost of noisier gradient estimates and often more iterations to converge.

## Counting QPU calls before you run anything

For an 8-parameter circuit using parameter-shift gradients, each iteration needs:

```
evalsPerIteration = (params x shiftsPerParam) + 1   // +1 for the cost itself
                   = (8 x 2) + 1 = 17
```

Over 150 iterations: `150 x 17 = 2,550` circuit evaluations. At 1,000 shots per evaluation on IonQ Aria (AWS Braket pricing: $0.30/task + $0.03/shot), the full run would cost:

```
totalShots = 2,550 x 1,000 = 2,550,000
cost = 2,550 x $0.30 + 2,550,000 x $0.03 = $765 + $76,500 = $77,265
```

That number is the whole reason classical simulators exist in this workflow: nobody runs 2,550 evaluations against real hardware to develop and debug a VQE loop. You run the identical loop against a local or cloud-hosted **classical simulator** (free or near-free, no queue) until the optimizer, cost function, and convergence logic are all verified correct — and only then point the same code at real hardware, usually for a much smaller number of final, confirmatory evaluations.

![Amazon Braket Hybrid Jobs wizard](/courses/hybrid-quantum-classical-computing/ch01/02-the-variational-hybrid-loop-pattern/aws-hybrid-job-wizard.webp)
*Braket's own Hybrid Jobs feature runs exactly this loop — classical optimizer plus circuit — as one managed job.*

## Convergence criteria save money, not just time

A loop with no convergence check runs for a fixed iteration count regardless of whether it stopped improving at iteration 40 or iteration 150. A convergence check — comparing successive cost values against a tolerance, or tracking a moving average and stopping when improvement flattens — directly caps QPU spend. If the example above converges at iteration 60 instead of running all 150, the cost drops proportionally: `60/150 x $77,265 ≈ $30,906`. Convergence logic is classical code with a direct dollar impact, which is why it belongs in Chapter 4's cost-management discussion as much as it belongs here.

## Key terms

| Term | Meaning |
|---|---|
| Variational loop | The classical-optimizer-drives-quantum-circuit pattern underlying VQE, QAOA, and variational classifiers |
| Cost function C(θ) | The scalar value (e.g., a Hamiltonian expectation value) the optimizer is trying to minimize or maximize |
| Parameter-shift rule | A gradient-estimation technique requiring 2 circuit evaluations per parameter per iteration |
| SPSA | Simultaneous Perturbation Stochastic Approximation — a gradient-free optimizer needing only 2 evaluations per iteration regardless of parameter count |
| Convergence criterion | The classical check (tolerance or max-iteration based) that stops the loop once further iterations aren't worth their cost |

## Check yourself

A variational circuit has 12 parameters. Using the parameter-shift rule, how many circuit evaluations does one iteration require? If you ran 100 iterations at 500 shots each on a backend charging $0.30/task + $0.01/shot, what is the total cost? Show your arithmetic, then explain one concrete way you'd reduce that cost without changing the final accuracy requirement.
