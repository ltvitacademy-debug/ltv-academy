# Classical Optimizers Driving Quantum Circuits

The optimizer is the piece of classical code that makes a variational loop (Lesson 2) actually converge to a useful answer instead of wandering randomly. Choosing and configuring it correctly is one of the highest-leverage engineering decisions in a hybrid project, because it directly controls how many expensive QPU calls the loop makes.

## What you'll learn

- Why optimizers for quantum cost functions have different constraints than typical classical ML optimizers
- The difference between gradient-based and gradient-free optimization in this context, with real evaluation counts
- How measurement noise ("shot noise") affects which optimizer is appropriate
- How to configure an optimizer's stopping conditions to control QPU spend directly
- A worked comparison of two optimizers on the same circuit, with cost attached

## Why this isn't the same problem as optimizing a classical neural network

A classical loss function evaluation is cheap (microseconds to milliseconds, free beyond compute you already own) and exact (no measurement noise). A quantum cost-function evaluation is slow (seconds, due to queueing — covered in Chapter 3), expensive (real money per shot, covered in Chapter 4), and **noisy** — each evaluation is a statistical estimate from a finite number of shots, not an exact value. Any optimizer choice has to account for all three differences, which rules out or deprioritizes several standard choices (e.g., optimizers that assume exact, cheap function evaluations and need many of them, like a dense grid search).

## Gradient-based: parameter-shift rule

Covered in Lesson 2: estimating the gradient with respect to each parameter via the parameter-shift rule costs 2 circuit evaluations per parameter per iteration. For a circuit with `p` parameters, one gradient estimate costs `2p` evaluations, plus 1 more for the cost value itself: `2p + 1` per iteration. This gives an exact (up to shot noise) gradient direction, which usually means fewer iterations to converge — valuable when evaluations are this expensive, provided `p` is small enough that `2p + 1` per iteration doesn't dominate the budget.

## Gradient-free: SPSA

Simultaneous Perturbation Stochastic Approximation estimates a gradient direction using just **2 evaluations total per iteration**, regardless of how many parameters the circuit has, by perturbing all parameters simultaneously in a random direction and comparing two cost evaluations. The gradient estimate is noisier (it's a stochastic approximation, not exact), which usually means more iterations are needed to converge to the same precision — but each iteration is far cheaper for circuits with many parameters.

## Worked comparison: 20-parameter circuit, 100-iteration budget

```
Parameter-shift: evalsPerIter = 2(20) + 1 = 41
                 totalEvals (100 iters) = 4,100

SPSA:            evalsPerIter = 2
                 totalEvals (100 iters) = 200
```

At 1,000 shots/eval on Rigetti Ankaa-3 ($0.30/task + $0.0009/shot):

```
Parameter-shift cost = 4,100 x $0.30 + 4,100 x 1,000 x $0.0009 = $1,230 + $3,690 = $4,920
SPSA cost            =   200 x $0.30 +   200 x 1,000 x $0.0009 =    $60 +   $180 =   $240
```

SPSA costs roughly 20x less for the same iteration budget here — but if SPSA needs, say, 3x more iterations than parameter-shift to reach the same accuracy because its gradient estimates are noisier, the real comparison is `$240 x 3 = $720` against parameter-shift's `$4,920`, still a clear win for SPSA at this parameter count. This crossover point — where gradient-free methods win on total cost despite needing more iterations — is exactly why SPSA (or other gradient-free methods like COBYLA) dominates in practice for circuits with more than a handful of parameters.

## Configuring stopping conditions as a cost control, not just a convergence detail

Every optimizer needs two independent stopping conditions, both of which are classical-code decisions with direct cost consequences: a **maximum iteration count** (hard ceiling on total evaluations) and a **tolerance-based convergence check** (stop early once the cost value stops improving by more than some threshold between iterations). Setting the tolerance too tight wastes evaluations chasing noise that will never resolve below the shot-noise floor (Chapter 4 covers the floor itself); setting it too loose stops before the real optimum is found. A reasonable starting tolerance is set relative to the expected shot noise standard error, not an arbitrarily small number.

## Key terms

| Term | Meaning |
|---|---|
| Parameter-shift rule | Exact-gradient estimation costing 2 evaluations per parameter per iteration |
| SPSA | Gradient-free stochastic optimizer costing 2 evaluations per iteration regardless of parameter count |
| Shot noise | The statistical uncertainty in a quantum cost-function evaluation from using a finite number of shots |
| Convergence tolerance | The threshold below which improvement between iterations is treated as "converged," stopping the loop |
| Crossover point | The parameter count or iteration budget above which a gradient-free optimizer's lower per-iteration cost outweighs its need for more iterations |

## Check yourself

A 30-parameter circuit is optimized with 80 iterations of parameter-shift versus an estimated 240 iterations of SPSA (3x more, accounting for its noisier gradient estimate) to reach comparable accuracy. At 500 shots/eval on a backend charging $0.30/task + $0.01/shot, compute the total cost for each approach and state which one you'd recommend and why.
