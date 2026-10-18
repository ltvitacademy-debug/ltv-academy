# Performance Lab

Hands-on lab: profile a small hybrid VQE loop on a simulator, use that data to estimate the resource requirements for scaling it up, and decide — with calculated numbers, not a guess — whether a planned real-hardware run is actually affordable within a given shot budget.

## What you'll learn

- Running and interpreting a profiled VQE loop end to end
- Using measured simulator data to project real-hardware shot and time budgets
- Making a go/no-go call on a real-hardware submission using calculated numbers
- A worked example that reduces an infeasible plan to a feasible one by changing a concrete parameter
- A combined profiling + estimation checklist to close out the chapter

## Step 1: run and profile a small VQE loop

Using Lesson 18's `ProfileAccumulator` pattern on a 2-qubit, `p=2`-layer QAOA toy problem, 10 optimizer iterations, 1024 shots/circuit, on `AerSimulator`:

```python
acc = ProfileAccumulator()
for _ in range(10):
    run_vqe_iteration(current_params, backend=LocalSimulatorBackend(seed=42), acc=acc)

print(f"Classical time: {acc.classical_time:.3f}s")
print(f"Quantum (simulator) time: {acc.quantum_time:.3f}s")
print(f"Iterations: {acc.n_iterations}")
```

Suppose this reports: classical time 0.08s, simulator time 0.42s, across 10 iterations — confirming (Lesson 18) that for this small toy circuit on a simulator, quantum execution time dominates even the classical overhead, which is itself a useful, measured finding worth recording rather than assuming.

## Step 2: estimate the real shot budget for the full planned run

The real target isn't 10 toy iterations — it's `p=4` layers (`2p=8` parameters), 150 optimizer iterations, intended for real hardware at 4096 shots per evaluation. Apply Lesson 19's method:

```
evals_per_gradient = 8 * 2 = 16
total_executions = 16 * 150 = 2400
total_shots = 2400 * 4096 = 9,830,400
```

(Verify this arithmetic yourself with `node -e` before trusting it, exactly as this course has done throughout — never state a resource number without checking it.) Close to 9.8 million total shots is the real number a hardware-queue budget would need to absorb, not "4096 shots, one circuit."

## Step 3: the go/no-go call

Suppose the team's real-hardware allocation for this project is a budget of 2,000,000 shots total. 9.8 million shots is roughly 5x over budget — a go/no-go call needs a concrete adjustment, not a vague "let's try to be efficient." Candidate adjustments, each with its own calculable effect:

- **Fewer optimizer iterations** (150 → 30): cuts total shots by 5x proportionally, reaching budget, but risks the optimizer not converging — a real trade-off, not a free win.
- **Fewer shots per evaluation** (4096 → 2048): halves total shots, but per Lesson 7, also roughly doubles the standard error on each gradient evaluation, which can make the optimizer's gradient estimates noisier and potentially slow or destabilize convergence — another real trade-off, not a free win.
- **Switch most iterations to simulator, reserve hardware for final validation only**: run the full 150-iteration optimization on a local simulator (Lesson 18 showed this is fast and cheap), and only submit the final converged parameters to real hardware for a validation run at modest shots — this is usually the actual right answer, and it's the one that doesn't trade away either convergence quality or statistical precision.

## Step 4: recompute after the adjustment

Choosing the third option — simulator for training, hardware only for final validation at, say, 4096 shots for one final circuit evaluation — brings the real-hardware shot cost down to 4,096 shots total, comfortably within the 2,000,000-shot budget by several orders of magnitude, while the simulator-side training run costs no hardware-queue budget at all.

## Combined checklist for closing out a performance review

- [ ] Profiled a representative smaller run and recorded classical vs. quantum time split (Lesson 18)
- [ ] Projected total shot budget for the full planned run using the measured per-iteration cost (Lesson 19)
- [ ] Compared the projected budget against the actual allocated resource budget
- [ ] If over budget, evaluated at least two concrete adjustments with their calculated trade-offs, not just "try to use fewer shots"
- [ ] Chose an adjustment and recomputed the final projected cost to confirm it's actually within budget

## Key terms

| Term | Meaning |
|---|---|
| Go/no-go call | A decision about whether to proceed with a planned run, made using calculated resource projections against an actual budget |
| Shot-budget projection | Estimating the total shots a full planned run will require, based on measured per-iteration cost from a smaller profiled run |
| Train-on-simulator, validate-on-hardware | A common cost-saving pattern: run the full iterative optimization on a free/cheap simulator, reserving limited real-hardware budget for a final validation run only |

## Check yourself

Using this lab's numbers, if the team instead kept 150 iterations and 4096 shots but switched to `p=2` layers (4 parameters) instead of `p=4`, compute the new total shot budget and state whether it fits the 2,000,000-shot budget.
