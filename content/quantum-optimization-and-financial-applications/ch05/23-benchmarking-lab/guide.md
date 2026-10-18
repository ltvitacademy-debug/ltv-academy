# Benchmarking Lab

This lab runs an actual fair benchmark, end to end, across four methods — brute force, greedy local search, simulated annealing, and simulated QAOA — on the two graphs you've used throughout this course. The goal isn't just to collect numbers; it's to apply Lesson 21's fairness checklist to your own results and see exactly where a careless comparison could mislead you.

## What you'll learn

- How to assemble a single comparison table across four different optimization methods
- Why QAOA's *expected* cost and its *best-of-many-shots* result can tell different stories
- How to apply Lesson 21's fairness checklist to a concrete result set, not just a hypothetical
- Why the same method can look great on one problem instance and merely adequate on another
- A template benchmarking workflow you can reuse on any new combinatorial problem

## The two problem instances

**Instance A: the 4-cycle graph** (Lesson 4, Chapter 1) — 4 nodes, edges {(0,1),(1,2),(2,3),(3,0)}, true optimum cut = 4.

**Instance B: the 5-node graph** (Lesson 5, Chapter 1) — 5 nodes, edges {(0,1),(0,2),(1,2),(1,3),(2,4),(3,4)}, true optimum cut = 5.

## Running all four methods

**Brute force** (exhaustive check of every possible assignment): confirms the true optimum directly — 4 for Instance A, 5 for Instance B. This is the ground truth every other method is compared against, feasible here only because both instances are small.

**Greedy local search**: on Instance A, starting from x=(0,0,0,0), greedy reaches the true optimum of 4 in 2 steps. On Instance B, greedy's behavior depends heavily on starting point — from Lesson 20, 24 of 32 starting points reach the true optimum of 5, but 8 of 32 (including x=(0,1,0,0,0)) get stuck at only 4.

**Simulated annealing**: on Instance B, starting from the exact same stuck point where greedy failed, SA reliably reaches the true optimum of 5 across 5 different random seeds (Lesson 20).

**Simulated QAOA (depth 1)**, on Instance A: at the depth-1-optimal angles (γ≈2.346, β≈1.183), the circuit's *expected* cost is ≈2.9996 (ratio ≈0.75) — but sampling from its actual measurement distribution tells a more encouraging story. Running simulated "shots" (sampling bitstrings according to the circuit's true measurement probabilities) and tracking the best cut value *actually observed*:

| Shots taken | Best cut observed |
|---|---|
| 10 | **4** (true optimum) |
| 100 | **4** |
| 1,000 | **4** |

Even though the *expected* cost across the full distribution is only ≈3.0, the true optimum (cost 4) carries substantial probability on its own (the two optimal bitstrings together account for about 53% of the full distribution: 0.2655 + 0.2655), so it shows up within the first 10 simulated shots every time. This is the real-world "best-of-many-shots" readout strategy from Lesson 10 paying off in practice.

## The combined comparison table

| Method | Instance A (true opt. = 4) | Instance B (true opt. = 5) |
|---|---|---|
| Brute force | 4 (ground truth) | 5 (ground truth) |
| Greedy (worst-case start) | 4 | 4 (stuck, 25% of starts) |
| Simulated annealing | — (not needed; no entrapment on A) | 5 (reliable across seeds) |
| QAOA p=1, expected cost | 2.9996 (ratio 0.75) | — (not simulated on B in this lab) |
| QAOA p=1, best-of-10-shots | 4 (true optimum) | — |

## Applying the fairness checklist to this exact table

Walking through Lesson 21's four checks against this specific result set:

1. **Strongest baseline?** Greedy from a worst-case start is a weak baseline on Instance B (stuck at 4) — if this table only showed "QAOA beats greedy," that would already be Lesson 21's first failure mode. Including SA's reliable result of 5 is what makes this comparison fair: SA, the stronger classical method, matches the true optimum just as well as QAOA's best-of-shots approach does on Instance A.
2. **Metric clearly specified?** Notice the table reports *two different QAOA numbers* — expected cost (2.9996) and best-of-shots (4) — because reporting only the expected cost would understate QAOA's practical usefulness here, while reporting only the best-of-shots number would overstate how *reliably* a single shot lands on the optimum (recall from Lesson 10's full probability table: a meaningful fraction of shots still land on suboptimal bitstrings).
3. **Representative problem size?** Both instances here are tiny (4 and 5 nodes) specifically for teaching purposes — this table says nothing, by itself, about behavior at hundreds or thousands of nodes, and presenting it as evidence of scale would be exactly Lesson 21's third failure mode.
4. **Full pipeline accounted for?** This lab's QAOA numbers don't include the classical angle-optimization cost (Lesson 8) that would be needed to *find* good angles in the first place on a new, unseen problem — this table assumes the good angles are already known, which is a real limitation of this specific comparison, not a hidden strength being claimed for QAOA.

## The takeaway

None of the four methods "wins" outright across both instances and both metrics — and that's the honest, correct conclusion, not a cop-out. Simulated annealing reliably solved the one case where greedy failed; QAOA's best-of-shots result matched the true optimum on the one instance tested, but only because its expected-value performance (ratio 0.75) was propped up by concentrating a majority of its probability on the two optimal bitstrings, which won't be true of every problem instance. This is precisely the kind of nuanced, multi-metric comparison Chapter 5 has been building toward, and precisely the standard the Chapter 6 capstone will hold you to on a problem you choose yourself.

## Key terms

| Term | Meaning |
|---|---|
| Best-of-many-shots result | The best bitstring actually observed across repeated QAOA measurements, as distinct from the circuit's expected cost average |
| Ground truth (brute force) | The true optimal solution, found by exhaustively checking every possible assignment, used to validate all other methods |
| Worst-case start | A starting point chosen specifically because it's known to trap a given method (e.g., greedy), used to stress-test reliability |
| Fairness checklist application | Walking through Lesson 21's four benchmark-fairness questions against a specific, concrete result table rather than treating them abstractly |

## Check yourself

The lab's comparison table deliberately does not run simulated annealing on Instance A or QAOA on Instance B. Explain why presenting this table as "QAOA beats greedy and matches SA" would still be an incomplete and potentially misleading summary, even though every individual number in the table is accurate — referencing at least two of Lesson 21's four fairness checks in your answer.
