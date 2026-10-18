# Optimal Iteration Count — and Why More Isn't Better

This is the lesson where Grover's algorithm stops being "free lunch" and becomes something you have to use correctly. Running extra iterations "to be safe" isn't harmless the way it would be for most algorithms — past a specific point, every additional iteration makes your answer *more* likely to be wrong, not less.

## What you'll learn

- The optimal iteration formula t\* = ⌊(π/4)√N⌋, and why it's a specific number, not a range
- The full N=8 probability trajectory across 5 iterations, showing a rise and then a collapse
- Why the behavior is non-monotonic: a fixed rotation angle per iteration means periodicity, not steady improvement
- The practical consequence: you must compute t\* in advance, you cannot "run more to be safer"
- How t\* scales with N across several concrete sizes

## The formula

From Lesson 16's geometry: each Grover iteration rotates the state by a fixed angle 2α toward the marked state, where sin(α) = 1/√N. Since the rotation per step is fixed, there's a specific number of steps that gets you closest to the marked state — rotate too little and you haven't gotten there yet; rotate too much and you've swung past it. That optimal number is:

**t\* = ⌊π/(4α)⌋ ≈ ⌊(π/4)√N⌋** (the approximation holds well for large N, where α ≈ 1/√N)

This is not a "do at least this many" floor — it is the single iteration count that maximizes P(marked). Doing fewer undershoots; doing more overshoots.

## The N=8 trajectory — watch it rise, then collapse

N=8 (3 qubits), one marked item at index 5. Here is the full verified probability-of-success trajectory, iteration by iteration:

| Iterations | Unmarked amplitude (each) | Marked amplitude | P(marked) |
|---|---|---|---|
| 0 | 0.3536 | 0.3536 | 0.1250 |
| 1 | 0.1768 | 0.8839 | 0.7812 |
| **2** | −0.0884 | 0.9723 | **0.9453 ← peak** |
| 3 | −0.3094 | 0.5745 | 0.3301 |
| 4 | −0.3757 | −0.1105 | 0.0122 |

The formula predicts t\* = ⌊(π/4)√8⌋ = ⌊2.2214⌋ = **2** — and the table confirms it exactly: iteration 2 is where P(marked) peaks, at 94.53%.

Now look at what happens on either side of that peak. Iteration 1 (78.12%) is *worse* than iteration 2, which makes sense — you haven't rotated far enough yet. But iteration 3 (33.01%) is *also worse than iteration 1* — you've rotated past the peak and are now swinging back down, overshooting the target. And iteration 4 is the sharpest warning in this whole chapter: **P(marked) = 1.22%**, which is worse than doing **zero iterations at all** (12.5% — just the base rate of guessing blind among 8 items). Running the algorithm for two extra "safety margin" iterations past the optimum doesn't just waste work — it actively destroys your result, leaving you *worse off than never running the algorithm in the first place*.

## Why this happens: fixed rotation, not diminishing returns

Compare this to algorithms you may be used to, like gradient descent or iterative refinement, where doing "a few extra iterations" is typically harmless or merely wasteful — those algorithms approach a fixed point and tend to stay near it once they arrive. Grover's algorithm is different because the rotation angle 2α per iteration is **constant**, not shrinking. The state vector doesn't converge to the marked state and sit there; it keeps rotating past it, around, and eventually back toward where it started — the probability trajectory is *periodic* in the iteration count, not monotonically improving. There is exactly one point in that cycle (well, two, by symmetry — but only the first is reachable going forward with t\* iterations) where the probability is maximized, and the formula tells you exactly where that point is.

## The practical consequence

Because the behavior is periodic and the per-iteration rotation is fixed, you cannot run Grover's algorithm the way you might run a classical heuristic — "just do more work and the answer only gets better." You must compute t\* = ⌊(π/4)√N⌋ **in advance**, based on the known (or estimated, via iteration-count-estimation techniques when N is unknown ahead of time) size of the search space, and stop exactly there. There is no "safety margin" available by running a few more iterations — a few more iterations might land you near 0% success instead of near 95%.

## How t\* scales with N

The same floor formula applied across several sizes:

| N | t\* = ⌊(π/4)√N⌋ |
|---|---|
| 4 | 1 |
| 8 | 2 |
| 16 | 3 |
| 1,000,000 | 785 |

The pattern is the √N scaling that gives Grover its quadratic speedup: a million-fold larger search space needs only roughly 785 iterations, not a million. But that number, 785, is exact in the same sense as "2" was exact for N=8 — overshoot it by running extra iterations "to be safe" and you risk the same collapse in success probability you just saw in the N=8 table.

## Key terms

| Term | Meaning |
|---|---|
| Optimal iteration count t\* | ⌊π/(4α)⌋ ≈ ⌊(π/4)√N⌋; the specific number of iterations that maximizes P(marked) |
| Overshoot | Running more than t\* iterations, causing the state to rotate past the marked state and P(marked) to fall |
| Non-monotonic / periodic trajectory | P(marked) rises to a peak at t\* then falls, rather than improving steadily with more iterations |
| Fixed rotation angle | The constant 2α rotation applied per iteration, which is what makes the trajectory periodic rather than convergent |

## Check yourself

Using the N=8 table above, explain in your own words why iteration 4 (P(marked) = 1.22%) is a worse outcome than simply not running Grover's algorithm at all (P(marked) = 12.5% at iteration 0) — and what this implies about the risk of "just running extra iterations to be safe."
