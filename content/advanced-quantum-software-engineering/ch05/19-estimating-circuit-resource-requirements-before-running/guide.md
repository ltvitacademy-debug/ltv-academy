# Estimating Circuit Resource Requirements Before Running

Submitting a circuit to real hardware costs queue time and, often, money. Estimating qubit count, circuit depth, and total shot budget *before* submission lets you catch an infeasible or needlessly expensive job while it's still cheap to fix.

## What you'll learn

- Estimating the number of oracle calls Grover's search needs for a given search-space size, with a verified worked example
- Estimating total shot budget for a variational algorithm's full training run, with a verified worked example
- How circuit depth and qubit count together determine whether a circuit is even feasible on a given backend
- A simple resource-estimation checklist to run before any real-hardware submission
- Where estimation and profiling (Lesson 18) meet: using Lesson 18's past data to calibrate future estimates

## Worked example 1: Grover's search iteration count

Grover's search on `N = 2^n` items needs approximately `(π/4)·sqrt(N)` oracle calls (iterations) to find a single marked item with high probability. For `n = 10` qubits (`N = 1024` items):

```
iterations = (π/4) * sqrt(1024) = (π/4) * 32 ≈ 25.13
```

Verified directly: `Math.PI/4 * Math.sqrt(1024)` evaluates to `25.1327...`, so you'd plan for **25 oracle calls** (rounding to the nearest integer iteration count). This single number has real consequences before you ever submit anything: if each oracle call itself requires, say, 40 two-qubit gates, the full circuit depth is roughly `25 × 40 = 1000` two-qubit-gate-equivalents before even counting the diffuser — a number worth checking against your target backend's realistic noise-tolerant depth *before* submission, not after a failed run.

## Worked example 2: shot budget for a variational training run

A QAOA circuit with `p = 3` layers has `2p = 6` variational parameters (one `gamma` and one `beta` per layer). Using the parameter-shift rule to compute a gradient, each parameter needs 2 circuit evaluations (one shifted `+`, one shifted `-`):

```
evals_per_gradient = 6 parameters * 2 evaluations = 12 circuit executions per gradient step
```

Over 100 optimizer iterations, at 2000 shots per circuit evaluation:

```
total_circuit_executions = 12 * 100 = 1,200
total_shots = 1,200 * 2,000 = 2,400,000
```

These numbers were verified by direct computation, not estimated loosely. 2.4 million total shots is the number that actually determines queue cost and runtime on real hardware — not "one circuit, 2000 shots," which wildly understates what a full training run actually requires. This is exactly the kind of number that should be calculated *before* committing to run a full training loop on a queued real-hardware backend, since discovering it only after burning through a fraction of the queue budget is a far more expensive way to learn it.

## Depth and qubit count: feasibility, not just cost

Resource estimation isn't only about shot budget — depth and qubit count determine whether a circuit is even *feasible* before accounting for noise. A circuit's depth relative to a backend's typical coherence time (how long qubits maintain their state before decohering) gives a rough feasibility signal: a circuit whose depth would take meaningfully longer to execute than the backend's coherence time is likely to produce results dominated by noise rather than signal, regardless of how many shots you throw at it. Checking qubit count against a backend's actual qubit count is the more basic check — a 12-qubit circuit targeted at a 7-qubit backend fails trivially, and should be caught by a resource-estimation step long before submission, not discovered from an error message after.

## A resource-estimation checklist

Before submitting any circuit to a real backend (especially a queued, possibly metered one):

- [ ] Qubit count required ≤ backend's qubit count
- [ ] Estimated circuit depth checked against the backend's realistic noise-tolerant depth, not just "does it compile"
- [ ] Total shot budget calculated for the *entire* run (all iterations, all parameter evaluations), not just one circuit evaluation
- [ ] If the algorithm is iterative (VQE/QAOA), the gradient-evaluation multiplier (like the ×12 above) is included in the shot-budget estimate
- [ ] The estimate has been sanity-checked against Lesson 18's profiling data from a smaller prior run, if one exists

## Calibrating estimates with profiling data

If Lesson 18's profiling of a smaller prior VQE run recorded "20 iterations took 2000 total shots at 1024 shots/circuit, with classical time negligible on hardware," that's real, measured data for calibrating a resource estimate for a larger run of the same algorithm — far more trustworthy than a theoretical estimate alone, since it's grounded in what your specific circuit and backend combination actually required, including anything a purely theoretical formula might miss.

## Key terms

| Term | Meaning |
|---|---|
| Grover iteration count | Approximately `(π/4)·sqrt(N)` oracle calls needed for Grover's search over N items to find a marked item with high probability |
| Parameter-shift rule | A method for computing a quantum circuit's gradient using 2 circuit evaluations (shifted +/-) per parameter |
| Shot budget | The total number of circuit executions (shots), summed across every evaluation in an entire run, not just one circuit call |
| Coherence time | How long qubits maintain their quantum state before decohering; a rough feasibility ceiling for circuit depth on real hardware |

## Check yourself

A QAOA circuit has `p = 5` layers (so `2p = 10` parameters) and will be optimized for 50 iterations at 1500 shots per circuit evaluation, using the parameter-shift rule. Compute the total shot budget for the full run, showing each step, the same way Worked Example 2 did.
